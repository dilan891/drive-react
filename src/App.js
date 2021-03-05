import Nav from "./Nav";
import "./app.css";
//import {useEffect} from "react";
import Todos from "./Todos";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Prueba from './prueba';

function App() {
  /*useEffect(()=>{
    const pedro= " 3" 
  });*/

  return <div className="App">
      <Router>
        <Nav/>
        <Switch>
          <Route path="/Todos">
            <div className=""><Todos/></div>
          </Route>
          <Route path="/denegado">
            <Prueba/>
          </Route>
        </Switch>
      </Router>
    </div>;
}

export default App;
