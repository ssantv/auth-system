import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  const logout = () => {
    dispatch({ type: "logout" });
  };

  return (
    <div className="container mt-5">

      {!store.token ? (
        <div style={{ padding: "2rem" }}>
          <h2 className="display-6">Página principal</h2>
          <p className="fs-5">No hay nadie con sesión iniciada.</p>

          <Link to="/login">
            <button type="button" className="btn btn-secondary p-2 m-2">Iniciar sesión</button>
          </Link>

          <Link to="/signup">
            <button type="button" className="btn btn-secondary p-2 m-2">
              Crear cuenta
            </button>
          </Link>
          <Link to="/private">
            <button type="button" className="btn btn-secondary p-2 m-2">
              Zona super secreta
            </button>
          </Link>
        </div>
      ) : (
        
        <div style={{ padding: "2rem" }}>
          <h2 className="display-6">Inicio de sesión</h2>
          <p className="fs-5">
            Sesión iniciada. Bienvenide de vuelta, {store.username}
          </p>

          <button type="button" className="btn btn-secondary p-2 m-2"
            onClick={logout}
          >
            Cerrar sesión
          </button>

          <Link to="/signup">
            <button type="button" className="btn btn-secondary p-2 m-2">
              Crear otra cuenta
            </button>
          </Link>
          <Link to="/private">
            <button type="button" className="btn btn-secondary p-2 m-2">Zona secreta</button>
          </Link>
        </div>
      )}

    </div>
  );
};