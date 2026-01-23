import { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import storeReducer from "../store";

export const NewSecret = () => {
    const { store, dispatch } = useGlobalReducer();
    const [text, setText] = useState("");
    const [msg, setMsg] = useState(null);
      const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text) return;

        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/secrets`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${store.token}`,
                },
                body: JSON.stringify({ text }),
            });

            const data = await res.json();

            if (res.ok) {
                dispatch({ type: "set_secrets", payload: [...store.secrets, text] });
                setMsg("Tu secreto está a salvo, " + store.username) + ". Redirigiendo";
                setTimeout(() => navigate("/private"), 3000);

            } else {
                setMsg(data.msg || "Error al guardar");
            }
        } catch (err) {
            setMsg("Error de red al guardar secreto");
        }
    };
    if (store.token == null) {
        return (
            <div className="container mt-5">

                    <h2 className="display-6">Sección de secretos</h2>
                    <p>No puedes ver nada aquí sin una sesión iniciada</p>

                    <Link to="/login">
                        <button type="button" className="btn btn-secondary p-2 m-2">Iniciar sesión</button>
                    </Link>

                    <Link to="/signup">
                        <button type="button" className="btn btn-secondary p-2 m-2">
                            Crear cuenta
                        </button>
                    </Link>
                </div>
        )
    }
    return (
        <div className="container mt-5">
            <h3>Añadir un nuevo secreto</h3>
            {msg && <p className="fs-5 text-success">{msg}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3 d-flex m-2 gap-2">
                    <input className="form-control"
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Escribe tu secreto..."
                    />
                </div>
                <button type="submit" className="btn btn-secondary">Guardar</button>
            </form>
        </div>
    );
};