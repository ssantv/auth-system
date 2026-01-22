# Secret Manager — Full-Stack with Flask, React, and JWT
Full-stack application that allows users to register, log in, and store personal secrets in a private area protected by authentication with JSON Web Tokens (JWT).
The backend is developed with Flask and SQLAlchemy, and the frontend with React using Context + Reducer for global state.
Each user can only access their own data.
---
## Technologies used
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
### Database
- Relational tables
---
## Main features
- User registration
- Login with JWT
- Protected routes
- User relationship with their secrets
- Creation of private secrets
- Shared global state in React
- REST API
---
## Project architecture
### Backend
- Models: User, Secret
- JWT authentication
- REST endpoints
### Frontend
- Global store with reducer
- Controlled forms
- Private view protection
---
## Data models
### User
- id
- username (unique)
- email (unique)
- password
- One-to-many relationship with Secret
### Secret
- id
- text
- user_id (ForeignKey)
A user can have multiple secrets.
Each secret belongs to only one user.
---
## Features
### Signup
- Creates a new user
- Validates required fields
- Prevents duplicate usernames and emails
- Redirects to login after successful creation

### Login
- Verify email and password
- Generate JWT token
- Save token and username in global state
- Allow access to protected routes

### Private area
- Access only with valid token
- Obtain secrets of authenticated user
- Display personal list
- Allow adding new secrets

### Add secret
- Text form
- Authenticated POST request
- Save the secret in the database
- Update global state
- Redirect automatically
---
## Global state (React)
The store manages:
- token
- username
- secrets
- backend URL
Available actions:
- login
- logout
- set_secrets
---
## Backend endpoints
### POST /signup
Creates a new user.
Body:
```json
{
  “email”: “user@email.com”,
  “username”: “user”,
  ‘password’: “1234”
}
```
### POST /login
Returns a JWT token.
Response:
```json
{
  “token”: “jwt_token”,
  ‘username’: “user”
}
```
### GET /private
Requires authentication.
Headers:
```
Authorization: Bearer <token>
```
Response:
```json
{
  “logged_in_as”: “user”,
  “secrets”: [“secret 1”, “secret 2”]
}
```
### POST /secrets
Requires authentication.
Body:
```json
{
  ‘text’: “my secret”
}
```
---
## Security
Currently includes:
- JWT authentication
- Protected routes
- Separation of data by user
---
## Possible future improvements
- Hide token generation in .env
- Edit and delete secrets
- Search and filter secrets
- Pagination
- Visual interface improvements
