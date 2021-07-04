import Nav from "./components/nav/Nav";
import "./css/app.css";
import React from "react"
import Article from "./components/article"
import { BrowserRouter as Router, } from "react-router-dom";
import { UseMenuSelect } from "./context/useMenuSelect";
import { UseToast } from "./context/useToast"


const App: React.FC = () => {

  return (
    <div className="App" >
      <Router>
        <UseMenuSelect>
          <UseToast>
            <Nav />
            < Article />
          </UseToast>
        </UseMenuSelect>
      </Router>
    </div>
  )
}

export default App;
