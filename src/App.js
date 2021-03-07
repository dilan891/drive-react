import Nav from "./components/Nav";
import "./css/app.css";
import Carpeta from "./components/Carpeta";
import Todos from "./components/Todos";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Carpetas from './components/Carpetas';

function App() {
  return <div className="App">
      <Router>
        <Nav/>
        <Switch>
          <Route path="/Todos">
            <Todos/>
          </Route>
          <Route path="/Carpetas">
            <Carpetas/>
          </Route>
          <Route path="/carpeta/:id">
            <Carpeta/>
          </Route>
        </Switch>
      </Router>
    </div>;
}

export default App;
