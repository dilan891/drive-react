import {useEffect,useState} from 'react'
import {Switch,Route} from "react-router-dom"
import Carpeta from "./Carpeta";
import Todos from "./Todos";
import Carpetas from './Carpetas';

const Article = () => {
    const [name,setName] = useState("")
    const [update,setupdate] = useState("") 

    const handleChange = (event)=>{
        setName(event.target.value)
        };
    
    const caller = (e,nameC = name,idC="none")=>{
        createCarpet(idC,nameC)
        setName("")
    }

    const createCarpet = (idC,nameC)=>{
        let newCarpet;
        newCarpet = {name: nameC,_id: "none",carpet: idC};
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

    const varMenu = (<div className="menu">  {/*crea el menu var qeu se uliza para añadir archivos o carpetas*/ }
                        <input className="addCarpet" 
                        placeholder="Añadir carpeta..." 
                        type="text" value={name}
                        onChange={handleChange} 
                        name="name" />
                        <button className="boton-green" onClick={caller}>+</button> 
                    </div>)

    useEffect(()=>{
      },[])

    return (
        <div>
            <Switch>
                <Route path="/Todos">
                    <Todos update={update} var={varMenu}  />
                </Route>
                <Route path="/Carpetas">
                    <Carpetas var={varMenu} />
                </Route>
                <Route path="/carpeta/:id">
                    <Carpeta createCarpet={caller.bind(this)} />
                </Route>
            </Switch>
        </div>
    )
}

export default Article;
