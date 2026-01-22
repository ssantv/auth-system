import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Login = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(`${store.url}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || `Error ${res.status} al iniciar sesión`);
        return;
      }

      if (!data.token) {
        setError("No se recibió token");
        return;
      }

      dispatch({
        type: "login",
        payload: {
          token: data.token,
          username: data.username
        }
      });

      setMsg("Usuario " + data.username + " ha iniciado sesión. Redirigiendo a la página principal");
      setTimeout(() => navigate("/"), 3000);

      // redirigir al login tras 3 segundo

    } catch (err) {
      setError(`Ha habido un error: ${err.message}`);
    }
  };

  return (
    <div className="container mt-5">

      <h2 className="display-6">Inicio de sesión</h2>

      <form onSubmit={handleLogin}>
        <div className="mb-3 d-flex m-2 gap-2">
          <input className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input className="form-control"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-secondary">Aceptar</button>
      </form>

      {msg && <p className="fs-5 text-success">{msg}</p>}
      {error && <p className="fs-5 text-danger">{error}</p>}
    </div>

  );
};