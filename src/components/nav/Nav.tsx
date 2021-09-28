import 'bootstrap/dist/css/bootstrap.min.css';
import "../../css/nav.css";
import { Link } from "react-router-dom";
import SelectVar from "./SelectVar"
import React from 'react';

const Nav: React.FC = () => {  //barra de navegacion de la pagina 

    const singOut = () =>{
        localStorage.removeItem("jwtToken");
    }

    return (
        <nav>
            <div className="user"><h1>Dilan891</h1></div>
            <button type="button" className="sing out" onClick={singOut}>cerrar seccion</button>
            <div className="navegation">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <Link to="/menu/Todos"
                            id="todo"
                            className="nav-link"
                            style={{ color: "black" }}
                            onClick={() => tab("todo")}>
                            Todos</Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/menu/carpetas"
                            id="prueba"
                            className="nav-link"
                            style={{ color: "black" }}
                            onClick={() => tab("prueba")}>
                            Carpetas</Link>
                    </li>
                </ul>
                <SelectVar />
            </div>
        </nav>
    );
}

function tab(name: string) {
    let tablinks
    tablinks = document.getElementsByClassName("nav-link");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(name)!.classList.add("active");
}

export default Nav;
