import Nav from "./components/Nav";
import "./css/app.css";
//import {useEffect} from "react";
import Todos from "./components/Todos";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Carpetas from './components/Carpetas';

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
          <Route path="/Carpetas">
            <Carpetas/>
          </Route>
        </Switch>
      </Router>
    </div>;
}

export default App;
