import {useEffect,useState} from 'react'
import {Switch,Route} from "react-router-dom"
import Carpeta from "./Carpeta";
import Todos from "./Todos";
import Carpetas from './Carpetas';

const Article = () => {
    const [name,setName] = useState("")
    const [update,setupdate] = useState("") 
    const [id,setid] = useState("");

    const updater = (id,nameCarpet)=>{
        setName(nameCarpet)
        setid(id)
    }

  useEffect(()=>{
        const createCarpet = ()=>{
        if (name !== ""){
            let newCarpet;
            newCarpet = {name: name,_id: "none",carpet: id};
            fetch("http://localhost:4000/carpets",{
                method: "POST",
                body: JSON.stringify(newCarpet),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(data => data.json())
            .then(data => console.log(data))
            .then(o => setupdate(name))
            .then(o => setName(""))
        }
        
    }
      createCarpet()
  },[name,id])

    return (
        <div>
            <Switch>
                <Route path="/Todos">
                    <Todos update={update} createCarpet={updater.bind(this)} />
                </Route>
                <Route path="/Carpetas">
                    <Carpetas/>
                </Route>
                <Route path="/carpeta/:id">
                    <Carpeta createCarpet={updater.bind(this)} />
                </Route>
            </Switch>
        </div>
    )
}

export default Article;
