# Gestor de Secretos — Full-Stack con Flask, React y JWT

Aplicación full-stack que permite a los usuarios registrarse, iniciar sesión y guardar secretos personales en una zona privada protegida mediante autenticación con JSON Web Tokens (JWT).

El backend está desarrollado con Flask y SQLAlchemy, y el frontend con React usando Context + Reducer para el estado global.

Cada usuario solo puede acceder a sus propios datos.

---

## Tecnologías utilizadas

### Backend
- Flask
- Flask SQLAlchemy
- Flask Migrate
- Flask JWT Extended
- CORS

### Frontend
- React
- React Router
- Context API + Reducer
- Fetch API
- Bootstrap

### Base de datos
- Tablas relacionales

---

## Características principales

- Registro de usuarios
- Inicio de sesión con JWT
- Rutas protegidas
- Relación usuario con sus secretos
- Creación de secretos privados
- Estado global compartido en React
- API REST

---

## Arquitectura del proyecto

### Backend
- Modelos: User, Secret
- Autenticación JWT
- Endpoints REST

### Frontend

- Store global con reducer
- Formularios controlados
- Protección de vistas privadas

---

## Modelos de datos

### User
- id
- username (único)
- email (único)
- password
- relación uno a muchos con Secret

### Secret
- id
- text
- user_id (ForeignKey)

Un usuario puede tener múltiples secretos.  
Cada secreto pertenece únicamente a un usuario.

---

## Funcionalidades

### Registro (Signup)
- Crea un nuevo usuario
- Valida campos obligatorios
- Evita duplicados de username y email
- Redirige al login tras crearse correctamente


### Login
- Verifica email y contraseña
- Genera token JWT
- Guarda token y username en el estado global
- Permite acceder a rutas protegidas


### Zona privada
- Acceso solo con token válido
- Obtiene los secretos del usuario autenticado
- Muestra listado personal
- Permite añadir nuevos secretos


### Añadir secreto
- Formulario con texto
- Petición POST autenticada
- Guarda el secreto en la base de datos
- Actualiza el estado global
- Redirige automáticamente

---

## Estado global (React)

El store gestiona:

- token
- username
- secrets
- url del backend

Acciones disponibles:

- login
- logout
- set_secrets

---

## Endpoints del backend

### POST /signup

Crea un usuario nuevo.

Body:

```json
{
  "email": "user@email.com",
  "username": "usuario",
  "password": "1234"
}
```

### POST /login

Devuelve un token JWT.

Respuesta:

```json
{
  "token": "jwt_token",
  "username": "usuario"
}
```

### GET /private

Requiere autenticación.

Headers:

```
Authorization: Bearer <token>
```

Respuesta:

```json
{
  "logged_in_as": "usuario",
  "secrets": ["secreto 1", "secreto 2"]
}
```

### POST /secrets

Requiere autenticación.

Body:

```json
{
  "text": "mi secreto"
}
```

---

## Seguridad

Actualmente incluye:

- Autenticación JWT
- Rutas protegidas
- Separación de datos por usuario

---

## Posibles mejoras futuras

- Ocultar la generacion del token en .env
- Editar y eliminar secretos
- Búsqueda y filtros de secretos
- Paginación
- Mejoras visuales de interfaz

