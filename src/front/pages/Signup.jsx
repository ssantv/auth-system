import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Signup = () => {
  const { store } = useGlobalReducer();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();

    setError(null);
    setMsg(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, username, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg);
        return;
      }

      setMsg("Usuario " + username + " creado. Redirigiendo a la página principal");

      // redirigir al login tras 3 segundo
      setTimeout(() => navigate("/login"), 3000);

    } catch (err) {
      setError("Error de conexión");
    }
  };

  return (
    <div className="container mt-5">
      <h2 class="display-6">Crear cuenta</h2>
      <form onSubmit={handleSignup}>
        <div className="mb-3 d-flex m-2 gap-2">
          <input className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

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
        <button type="submit" className="btn btn-secondary">Crear cuenta</button>
      </form>

      {msg && <p className="fs-5 text-success">{msg}</p>}
      {error && <p className="fs-5 text-danger">{error}</p>}
    </div>
  );
};
