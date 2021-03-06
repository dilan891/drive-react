import "../css/card.css"
import {useState,useEffect} from "react";

export default function Todos(){
    const [carpets,setcarpet] =  useState([]);
    const [archives,setarchives] = useState([])
    
    function dataFech(){    //peticion al servidor para obtener las carpetas 
        fetch("http://localhost:4000/carpets")
        .then(e => e.json())
        .then(e => {
            console.log(e)
            setcarpet(e)
        })
        .catch(e => {
            console.log(e)
            setcarpet([{name: "carpet1"},{name: "carpet2"}]);
        })
        // peticion de los archivos sin una carpeta asignada
        fetch("http://localhost:4000/archives")
        .then(data => data.json())
        .then(data =>{
            console.log(data)
            setarchives(data)
        })
        .catch(e => {
            console.log(e)
            setarchives([{archive: "imagenE1"},{archive: "imagenE2"}])
        })
    }
    
    useEffect(()=>{
        dataFech()
    },[])  //matriz vacia para que no se ejecute un loop

    return(
        <div className="card-content">
            {carpets.map(c=>{ 
                return(
                    <div key={c} className="card">
                        {c.name}
                    </div>
                )
            })}
            {archives.map(i=>{
                return(
               <div key={i} className="card">
                       <h1>{i.archive}</h1>
                </div> 
            )})}
            
        </div>
    )
}
