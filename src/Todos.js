import "./card.css"
//import {useState,useEffect} from "react";

export default function Todos(){
    /*useEffect(()=>{
        fetch("/")
        .then(e => console.log(e))
        .catch(e => console.log(e))
    })*/
    const imagenes = ["imagen1","imagen2","imagen3","imagen4","iamgen5","imagen6"]
    const carpet = ["carpet1","carpet2"];
    return(
        <div className="card-content">
            {carpet.map(c=>{
                return(
                    <div key={c} className="card">
                        {c}
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