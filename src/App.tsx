import Nav from "./components/nav/Nav";
import "./css/app.css";
import React, { useContext } from "react"
import Article from "./components/article"
import { BrowserRouter as Router,Switch,Route, Redirect } from "react-router-dom";
import { UseMenuSelect } from "./context/useMenuSelect";
import { UseToast } from "./context/useToast"
import IsLoggin from "./LoginVerification";
import AuthentificationHud from "./components/authentificacion/Session";
import { UserContext } from "./context/useUser";

const App: React.FC = () => {

  const {username, newLogin} = useContext(UserContext);

  let isLoginNow:any = IsLoggin(username,newLogin);

  console.log("el is none es: " + isLoginNow)
 
  return(
      <div className="App" >
          <Router>
              {isLoginNow? <Redirect to="/menu/Todos" /> : <Redirect to="/login" />}
          <Switch>
            <Route exact path="/">
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
              <AuthentificationHud />
            </Route>
          </Switch>
        </Router> 
      </div>

  )
     
}

export default App;
