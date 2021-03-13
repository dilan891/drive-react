import "../css/card.css"
import {Link} from "react-router-dom"
import {useState,useEffect} from "react";

export default function Todos(props){
    const [carpets,setcarpet] =  useState([]);//guarda un objeto con los detalles de cada carpeta
    const [archives,setarchives] = useState([])//guarda un objeto con los detalles de cada archivo
    
    function dataFech(){    //peticion al servidor para obtener las carpetas 
        fetch("http://192.168.20.203:4000/api/carpets")
        .then(e => e.json())
        .then(e => {
            setcarpet(e)
        })
        .catch(e => {
            console.log(e)
            setcarpet([{name: "carpet1",_id: "60454742f4a5194e0c511965"},{name: "carpet2", _id: 2}]);
        })
        // peticion de los archivos sin una carpeta asignada
        fetch("http://192.168.20.203:4000/api/archives",{
            method: "POST",
            body: JSON.stringify({id: "none"}),
            headers:{
                "Content-Type": "application/json"
            }
        })
        .then(data => data.json())
        .then(data =>{
            setarchives(data)
        })
        .catch(e => {
            console.log(e)
            setarchives([{name: "imagenE1",id: 45},{name: "imagenE2",id: 64}])
        })
        
    }

    useEffect(()=>{ 
        props.setID("none");
        dataFech() //matriz vacia para que no se ejecute un loop
    },[props.update])// eslint-disable-line react-hooks/exhaustive-deps

    return(
        <div>
            {props.modal}
            <div className="card-content">
            {carpets.map(c=>{ 
                return(
                    <Link  to={"/carpeta/"+c._id}>
                        <div key={c._id} className="card">
                            <h2>{c.name}</h2>
                        </div>
                    </Link>
                )
            })}
            {archives.map(i=>{
                return(
               <div className="card img">
                    <div key={i.id} className="view-img">
                        <img src="" height="160px" alt="no se ve :("></img>
                        <p>sadsacevavcsvarvjnoergnbasvnavnsjkdbnnfjsnojnckjbfdfdvfgnsjgnfagbtfesbngsfhsdgbjfahgjkdfsaglhgfdnsgbidiubsvihgsfuighdsfugh</p>
                    </div>
                    <div className="title-name">{i.name}</div>
                </div> 
            )})}
        </div>    
        </div>
    )
}
