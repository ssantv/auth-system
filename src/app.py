"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, User, Secret
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_jwt_extended import get_jwt_identity
from flask_cors import CORS


# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
# 1. Definir la ruta de la carpeta estática (donde React deja el build)
# Normalmente la plantilla de 4Geeks genera 'public' o 'dist'
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')

# 2. Configurar Flask con esa carpeta
app = Flask(__name__, static_folder=static_file_dir, static_url_path='/')

CORS(
    app,
    resources={r"/*": {"origins": "*"}},
    supports_credentials=True
)

app.url_map.strict_slashes = False

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


# Esto hay que moverlo de sitio, porque si se publica el repo lo ve todo el mundo. ¿A .env?
app.config["JWT_SECRET_KEY"] = "Sup3rUltr4S3cr3t0"
jwt = JWTManager(app)


@app.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # Consulta la base de datos por el nombre de usuario y la contraseña
    user = User.query.filter_by(email=email, password=password).first()

    if user is None:
        # el usuario no se encontró en la base de datos
        return jsonify({"msg": "Usuario o contraseña incorrectos"}), 401

    # Crea un nuevo token con el id de usuario dentro
    access_token = create_access_token(identity=user.username)
    return jsonify({"token": access_token, "username": user.username})


@app.route("/signup", methods=["POST"])
def signup():
    email = request.json.get("email")
    password = request.json.get("password")
    username = request.json.get("username")

    # Validar campos
    if not email or not password or not username:
        return jsonify({"msg": "Faltan datos"}), 400

    # Comprobar si hay usuario o mail
    existing_user = User.query.filter((User.username == username)).first()

    if existing_user:
        return jsonify({"msg": "El usuario ya existe"}), 409

    existing_email = User.query.filter((User.email == email)).first()

    if existing_email:
        return jsonify({"msg": "El email ya está registrado"}), 409

    new_user = User(
        email=email,
        username=username,
        password=password,
    )

    db.session.add(new_user)
    db.session.commit()
    return jsonify({
        "msg": "Usuario creado correctamente"
    }), 201


@app.route('/private')
@jwt_required()
def protected():
    current_user_identity = get_jwt_identity()
    user = User.query.filter_by(username=current_user_identity).first()

    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    secrets = [secret.text for secret in user.secrets]

    return jsonify({
        "logged_in_as": user.username,
        "secrets": secrets
    }), 200


@app.route("/secrets", methods=["POST"])
@jwt_required()
def add_secret():
    current_user_identity = get_jwt_identity()
    user = User.query.filter_by(username=current_user_identity).first()

    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    text = request.json.get("text")
    if not text:
        return jsonify({"msg": "No puede estar vacío"}), 400

    secret = Secret(text=text, user=user)
    db.session.add(secret)
    db.session.commit()

    return jsonify({"msg": "Secreto guardado"}), 201


# this only runs if `$ python src/main.py` is executed

@app.route('/')
def sitemap():
    # En producción (Render), enviamos el index.html de React
    return send_from_directory(static_file_dir, 'index.html')

@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    # Si el archivo existe (como una imagen o js), lo envía. 
    # Si no, envía el index.html para que React maneje la ruta.
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    return send_from_directory(static_file_dir, path)

if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
