import "./card.css"
import {useState,useEffect} from "react";

export default function Todos(){
    const [carpets,setcarpet] =  useState([]);
    
    function peticion(){    //peticion al servidor para obtener las carpetas 
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
    }
    
    useEffect(()=>{
        peticion()
    },[])  //matriz vacia para que no se ejecute un loop

    const imagenes = ["imagen1","imagen2","imagen3","imagen4","iamgen5","imagen6"]
    return(
        <div className="card-content">
            {carpets.map(c=>{ 
                return(
                    <div key={c} className="card">
                        {c.name}
                    </div>
                )
            })}
            {imagenes.map(i=>{
                return(
               <div key={i} className="card">
                       <h1>{i}</h1>
                </div> 
            )})}
            
        </div>
    )
}