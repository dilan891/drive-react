import React from "react";

const AuthentificationHud: React.FC = () => {

    return (
        <div className="form-content">
            <form className="Data">
                <label className="title-Seccion">Inicia Seccion</label>
                <input type="text" placeholder="Usuario" className="input-form" />
                <input type="password" placeholder="Contraseña" className="input-form" />
            </form>
        </div>
    )

}

export default AuthentificationHud;
