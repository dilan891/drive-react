import Nav from "./components/Nav";
import "./css/app.css";
import Article from "./components/article"
import {BrowserRouter as Router,} from "react-router-dom";
import { UseMenuSelect } from "./context/useMenuSelect";

function App() {

  return <div className="App">
      <Router>
        <UseMenuSelect>
          <Nav/>
          <Article />
        </UseMenuSelect>
      </Router>
    </div>;
}

export default App;
