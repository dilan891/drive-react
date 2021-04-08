import Nav from "./components/Nav";
import "./css/app.css";
import Article from "./components/article"
import { BrowserRouter as Router, } from "react-router-dom";
import { UseMenuSelect } from "./context/useMenuSelect";
import { UseToast } from "./context/useToast"

function App() {

  return <div className="App">
    <Router>
      <UseMenuSelect>
        <UseToast>
          <Nav />
          <Article />
        </UseToast>
      </UseMenuSelect>
    </Router>
  </div>;
}

export default App;
