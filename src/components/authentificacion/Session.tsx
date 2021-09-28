import React, { useState } from "react";
//import backImg from "../assets/img/nube.png";
import { loginRequest, registerNewUser } from "../api/fetchApi";
import { Redirect } from "react-router-dom"
import { Validation } from "./formvalidation"
import { Modal, ModalBody } from "reactstrap"
import 'bootstrap/dist/css/bootstrap.min.css';


// componente login 
const AuthentificationHud: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState<any>("hidden");
    const [modal, setModal] = useState(false)

    //estados de registro de usuario
    const [passwordRegister2, setPasswordRegister2] = useState("")
    const [registerForm, setRegisterForm] = useState({ username: "", password: "", email: "", number: "", nombre: "" })

    const HandlerChangeUser = (e: any): void => {
        setUsername(e.target.value);
    }

    const HandlerPassword = (e: any): void => {
        setPassword(e.target.value);
    }

    const toggle = () => setModal(!modal);

    const registerSubmit = (e: any) => {
        e.preventDefault();
        registrar();
    }

    const handlerRegister = (e: any): void => {
        if (e.target.name === "number" && isNaN(e.target.value)) {
            console.log("none")
        } else {
            setRegisterForm({
                ...registerForm,
                [e.target.name]: e.target.value
            })
        }
    }

    const handlerPassword2 = (e: any): void => {
        setPasswordRegister2(e.target.value)
    }

    const loginSubmit = async (e: any) => {
        e.preventDefault();
        let isLogin = await loginRequest(username, password);
        (isLogin === true) ? <Redirect to="/menu/Todos" /> : setPasswordError("visible");
    }

    const registrar = async () => {
        const validation = new Validation(registerForm, passwordRegister2)
        const validateAll = await validation.validarAll()
        if (validateAll === true) {
            //fetch datos
            registerNewUser(registerForm);
        }
        else {
            //mostrar error
            const lists: any = document.querySelector(".error-list")
            const errores = validation.viewError()
            const errorTable: any = document.querySelector(".error-mesage-register");
            lists.innerHTML = ""
            errorTable.classList.add("visible")
            const inputs: any = document.querySelectorAll(".error-form-register")
            if (inputs !== null) {
                inputs.forEach((a: { classList: { add: (arg0: string) => void; remove: (arg0: string) => void; }; }) => {
                    a.classList.add("input-register")
                    a.classList.remove("error-form-register")
                })
            }
            errores.forEach(e => {
                const input: any = document.querySelector(".error" + e)
                input.classList.remove("input-register")
                input.classList.add("error-form-register")
                const contentList = document.createElement("li");
                contentList.innerHTML = validation.errorName(e)
                lists.appendChild(contentList)
            })
        }
    }

    return (
        <div className="form-content" >
            <Modal isOpen={modal} toggle={toggle} >
                <form className="form-register" onSubmit={registerSubmit}>
                    <ModalBody style={{ display: 'flex', flexDirection: 'column' }}>
                        <div>
                            <h1>Registrate</h1>
                            <div className="error-mesage-register">
                                <h3 className="error-title">Error en los siguientes campos</h3>
                                <ul className="error-list">
                                    
                                </ul>
                            </div>
                        </div>
                        <div className="inputs-regsiter">
                            <div>
                                <div className="input-name">
                                    Usuario:
                                </div>
                                <div className="input-deck">
                                    <input type="text" className="error3 input-register" name="username" value={registerForm.username} onChange={handlerRegister} />
                                    <div></div>
                                </div>
                            </div>
                            <div>
                                <div className="input-name">
                                    Nombre:
                                </div>
                                <div className="input-deck">
                                    <input type="text" className="error6 input-register" name="nombre" value={registerForm.nombre} onChange={handlerRegister} />
                                    <div></div>
                                </div>
                            </div>
                            <div>
                                <div className="input-name">
                                    Contraseña:
                                </div>
                                <div className="input-deck">
                                    <input type="text" className="error2 input-register" name="password" value={registerForm.password} onChange={handlerRegister} />
                                </div>
                            </div>
                            <div>
                                <div className="input-name">
                                    Repita contraseña:
                                </div>
                                <div className="input-deck">
                                    <input type="text" className="error1 input-register" value={passwordRegister2} onChange={handlerPassword2} />
                                </div>
                            </div>
                            <div>
                                <div className="input-name">
                                    Email:
                                </div>
                                <div className="input-deck">
                                    <input type="text" className="error4 input-register" name="email" value={registerForm.email} onChange={handlerRegister} />
                                </div>
                            </div>
                            <div>
                                <div className="input-name">
                                    Numero de telefono:
                                </div>
                                <div className="input-deck">
                                    <input type="text" className="error5 input-register" name="number" value={registerForm.number} onChange={handlerRegister} />
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="button-register-form register-button" >Registrarse</button>
                        <button type="button" className="button-register-form " onClick={toggle}>Cancelar</button>
                    </ModalBody>
                </form>
            </Modal>
            <img className="img-background" alt="background" />
            <form className="Data" onSubmit={loginSubmit} >
                <h2 className="title-login">Drive</h2>
                <label className="title-Seccion">Inicia Seccion</label>
                <div className="error-login" style={{ visibility: passwordError, color: "red" }}>usuario o contraseña incorrecta</div>
                <label className="user-title">Usuario:</label>
                <div className="barra">
                    <div className="icon-form">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-file-person svg-user" viewBox="0 0 16 16">
                            <path d="M12 1a1 1 0 0 1 1 1v10.755S12 11 8 11s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z" />
                            <path d="M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        </svg>
                    </div>
                    <input type="text" placeholder="Usuario" onChange={HandlerChangeUser} value={username} className="input-form" />
                </div>
                <label className="user-title">Contraseña:</label>
                <div className="barra">
                    <div className="icon-form">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-unlock-fill svg-user" viewBox="0 0 16 16">
                            <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2z" />
                        </svg>
                    </div>
                    <input type="password" onChange={HandlerPassword} value={password} placeholder="Contraseña" className="input-form" />
                </div>
                <button type="submit" className="button-user">Iniciar session</button>
                <button type="button" className="button-user" onClick={toggle}>Registrarse</button>
            </form>
        </div>
    )
}

export default AuthentificationHud;
