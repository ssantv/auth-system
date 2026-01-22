import useGlobalReducer from "../hooks/useGlobalReducer";
import storeReducer from "../store";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2'


export const Private = () => {
    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        fetch(`${store.url}/private`, {
            headers: {
                Authorization: `Bearer ${store.token}`
            }
        })
            .then(resp => resp.json())
            .then(data => dispatch({ type: "set_secrets", payload: data.secrets }))
            .catch(err => console.error(err));
    }, []);

    const showSwal = () => {
        Swal.fire({
            icon: "error",
            title: "¡Lo sentimos!",
            text: "Actualmente todos tus secretos nos pertenecen.",
            footer: '<a target="_blank" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Contactar con el servicio técnico</a>'
        });
    }

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
            <p>
                Aquí tenemos muchos secretos guardados, {store.username}:
            </p>

            <ol>
                {store.secrets && store.secrets.length > 0 ? (
                    store.secrets.map((s, index) => <li key={index}>{s}</li>)
                ) : (
                    "No tienes secretos guardados"
                )}
            </ol>
            <Link to="/new_secret">
                <button type="button" className="btn btn-secondary p-2 m-2">
                    Añadir un nuevo secreto
                </button>
            </Link>
            <button type="button" onClick={showSwal} className="btn btn-secondary p-2 m-2">
                Eliminar tus secretos
            </button>
        </div>

    );
};