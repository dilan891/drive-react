import "../css/card.css"
import {Link} from "react-router-dom"
import {useState,useEffect} from "react";

export default function Todos(props){
    const [carpets,setcarpet] =  useState([]);//guarda un objeto con los detalles de cada carpeta
    const [archives,setarchives] = useState([])//guarda un objeto con los detalles de cada archivo
    
    function dataFech(){    //peticion al servidor para obtener las carpetas 
        fetch("http://localhost:4000/carpets")
        .then(e => e.json())
        .then(e => {
            setcarpet(e)
        })
        .catch(e => {
            console.log(e)
            setcarpet([{name: "carpet1",_id: "60454742f4a5194e0c511965"},{name: "carpet2", _id: 2}]);
        })
        // peticion de los archivos sin una carpeta asignada
        fetch("http://localhost:4000/archives")
        .then(data => data.json())
        .then(data =>{
            setarchives(data)
        })
        .catch(e => {
            console.log(e)
            setarchives([{archive: "imagenE1",id: 45},{archive: "imagenE2",id: 64}])
        })
        
    }
    console.log(props.update)
    useEffect(()=>{
        dataFech()
    },[props.update])  //matriz vacia para que no se ejecute un loop

    return(
        <div>
            {props.var}
            <div className="card-content">
            {carpets.map(c=>{ 
                return(
                    <Link key={c._id} to={"/carpeta/"+c._id}>
                        <div className="card">
                            <h2>{c.name}</h2>
                        </div>
                    </Link>
                )
            })}
            {archives.map(i=>{
                return(
               <div key={i.id} className="card img">
                       <h1>{i.archive}</h1>
                </div> 
            )})}
        </div>    
        </div>
    )
}
