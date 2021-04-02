import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/nav.css";
import {Link} from "react-router-dom";
import SelectVar from "./SelectVar"

function Nav(){  //barra de navegacion de la pagina 
    return (
        <nav>
            <div className="user"><h1>Dilan891</h1></div>
            <div className="navegation">
              <ul className="nav nav-tabs">
                  <li className="nav-item">
                      <Link to="/Todos" 
                      id="todo" 
                      className="nav-link" 
                      style={{color:"black"}} 
                      onClick={()=> tab("todo")}>
                          Todos</Link>
                  </li>
                  <li className="nav-item">
                      <Link 
                      to="/carpetas" 
                      id="prueba"
                       className="nav-link" 
                        style={{color:"black"}}
                        onClick={()=> tab("prueba")}>
                            carpetas</Link>
                  </li>
              </ul>
              <SelectVar /> 
            </div>
        </nav>
    );
}

function tab(name){
    let tablinks
    tablinks = document.getElementsByClassName("nav-link");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(name).classList.add("active");
}

export default Nav;
