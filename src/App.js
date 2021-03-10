import Nav from "./components/Nav";
import "./css/app.css";
import Article from "./components/article"
import {BrowserRouter as Router,} from "react-router-dom";

function App() {

  return <div className="App">
      <Router>
        <Nav/>
        <Article />
      </Router>
    </div>;
}

export default App;
