import Nav from "./components/nav/Nav";
import "./css/app.css";
import React from "react"
import Article from "./components/article"
import { BrowserRouter as Router,Switch,Route, Redirect } from "react-router-dom";
import { UseMenuSelect } from "./context/useMenuSelect";
import { UseToast } from "./context/useToast"
import AuthentificationHud from "./components/authentificacion/Session";

const App: React.FC = () => {

  const isLoggin= ():boolean  => {
    if(localStorage.getItem("jwtToken")){
      console.log("exite")
      return true
    }
    else{
      console.log("no existe")
      return false
    }
  }

  return(
      <div className="App" >
        <Router>
          <Switch>
            <Route exact path="/">
              {isLoggin() ? <Redirect to="/menu/Todos" /> : <Redirect to="/login" />}
            </Route>
            <Route path="/menu">
              <UseMenuSelect>
              <UseToast>
                <Nav />
                <Article />
              </UseToast>
              </UseMenuSelect>
            </Route>
            <Route path="/login">
              {isLoggin() ? <Redirect to="/menu/Todos" /> : console.log('init')}
              <AuthentificationHud />
            </Route>
          </Switch>
        </Router>
      </div>

  )
     
}

export default App;
