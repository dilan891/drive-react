import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./nav.css";
import {
    Link
  } from "react-router-dom";

function Nav(){
    return (
        <nav>
            <div className="user"><h2>Dilan891</h2></div>
            <div>
              <ul className="nav nav-tabs">
                  <li className="nav-item">
                      <Link to="/Todos" 
                      id="todo" 
                      className="nav-link active" 
                      style={{color:"black"}} 
                      onClick={()=> tab("todo")}>
                          Todos</Link>
                  </li>
                  <li className="nav-item">
                      <Link 
                      to="/denegado" 
                      id="prueba"
                       className="nav-link" 
                        style={{color:"black"}}
                        onClick={()=> tab("prueba")}>
                            prueba</Link>
                  </li>
              </ul>
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