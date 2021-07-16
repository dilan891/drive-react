//import Nav from "./components/Nav";
import "./css/app.css";
import React from "react"
//import Article from "./components/article"
//import { BrowserRouter as Router, } from "react-router-dom";
//import { UseMenuSelect } from "./context/useMenuSelect";
//import { UseToast } from "./context/useToast"
import AuthentificationHud from "./components/authentificacion/Session";

const App: React.FC = () => {

  return (
    <div className="App" >
      <AuthentificationHud> 

      </AuthentificationHud>
    </div>
  )
}

export default App;
