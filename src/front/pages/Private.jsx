import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import storeReducer from "../store";
import { Link } from "react-router-dom";

export const Private = () => {
    const { store, dispatch } = useGlobalReducer();
    const [msg, setMsg] = useState(null);

    if (store.token == null) {
        return (
            <div className="container mt-5">
                <div style={{ padding: "2rem" }}>
                    <h2 class="display-6">Sección de secretos</h2>
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
            </div>
        )
    }

    return (

        <div style={{ padding: "2rem" }}>
            <>
                <p>
                    Aquí tenemos muchos secretos guardados, {store.username}:
                </p>

                <ol>
                    <li>El asesinato de Martin Luther King (1968): Dudas sobre la culpabilidad única de James Earl Ray y la posible implicación de agencias gubernamentales.</li>
                    <li>El atentado de Oklahoma City (1995): Sospechas de que hubo más cómplices o conocimiento previo del gobierno sobre el ataque de Timothy McVeigh.</li>
                    <li>El oro nazi: Especulaciones sobre el destino de las enormes riquezas confiscadas por los nazis y su uso posterior por potencias occidentales.</li>
                    <li>El desastre del Hindenburg (1937): Teorías de sabotaje en la destrucción del dirigible alemán.</li>
                    <li>El 11-M (Madrid, 2004): Dudas sobre la autoría y los motivaciones oficiales de los atentados terroristas en España.</li>
                    <li>La Conspiración de Marte: La teoría de que la NASA oculta pruebas de vida o estructuras artificiales en Marte. </li>
                    <li>Aterrizaje en la Luna Falsificado (1969): La afirmación de que el hombre nunca llegó a la Luna.</li>
                    <li>La Tierra Plana: La creencia de que la tierra es plana y las fotos espaciales son falsas.</li>
                    <li>Reptilianos/Élite Global: La teoría de que seres alienígenas o sociedades secretas (Illuminati) gobiernan el mundo.</li>
                    <li>Chemtrails: La creencia de que los rastros de los aviones son químicos tóxicos rociados intencionalmente.</li>
                    <li>Teorías COVID-19/5G: Teorías vinculando el virus con microchips o la tecnología 5G. </li>
                </ol>
            </>
        </div >
    );
};