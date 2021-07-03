import React from "react";

const AuthentificationHud: React.FC = () => {

    return (
        <div className="form-content">
            <form className="Data ">
                <h2>Drive</h2>
                <label className="title-Seccion">Inicia Seccion</label>
                <label className="user-title">Usuario:</label>
                <div className="barra">
                    <div className="icon-form">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-file-person svg-user" viewBox="0 0 16 16">
                            <path d="M12 1a1 1 0 0 1 1 1v10.755S12 11 8 11s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z"/>
                            <path d="M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                        </svg>
                    </div>
                    <input type="text" placeholder="Usuario" className="input-form" /> 
                </div>
                <label className="user-title">Contraseña:</label>
                <div className="barra">
                    <div className="icon-form">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-unlock-fill svg-user" viewBox="0 0 16 16">
                            <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2z"/>
                        </svg>
                    </div>
                    <input type="password" placeholder="Contraseña" className="input-form" />
                </div> 
                <button type="button" className="button-user">Iniciar session</button>
            </form>
        </div>
    )
}

export default AuthentificationHud;
