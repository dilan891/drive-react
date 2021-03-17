import "../css/card.css"
import {Link} from "react-router-dom"
import {useState,useEffect} from "react";
import Options from "./options"
import {Archive} from "react-bootstrap-icons"

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
            <div className="card-content">
            {carpets.map(c=>{ 
                return(
                <div className="card img" key={c._id}>
                    <Link className="view-img"  to={"/carpeta/"+c._id}>
                        <div className="carpert-card">
                            <Archive size={50} className="carpet-icon"/>
                            <h2>{c.name}</h2>   
                        </div>
                    </Link>
                        <div className="descript">
                            <div className="title-name"></div>
                            <Options id={c._id} name={c.name} type={"carpet"} />  
                        </div>
                     </div>
                )
            })}
            {archives.map(i=>{
                return(
               <div key={i._id} className="card img">
                    <div  className="view-img">
                        <img src="" className="card-img-top" height="160px" alt="no se ve :("></img>
                        <p>sadsacevavcsvarvjnoergnbasvnavnsjkdbnnfjsnojnckjbfdfdvfgnsjgnfagbtfesbngsfhsdgbjfahgjkdfsaglhgfdnsgbidiubsvihgsfuighdsfugh</p>
                    </div>
                    <div className="descript">
                        <div className="title-name">{i.name}</div>
                        <Options id={i._id} name={i.name} type={"archive"} /> 
                    </div>
                </div> 
            )})}
        </div>    
        </div>
    )
}
