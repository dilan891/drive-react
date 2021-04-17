/*
    Este componente muestra todas las carpetas y archivos no asignados a ninguna carpeta
*/
import "../css/card.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Options from "./options";
import { Archive } from "react-bootstrap-icons";

interface props{
    update: number,
    setID: (id:string) => void
}

let content: {name:string,_id:string,}[] = [{ name: "Juan", _id: "60454742f4a5194e0c511965" }, { name: "carpet2", _id: "2" }];
let archiver: {name: string, _id:string}[] = [{ name: "imagenE1", _id: "45" }, { name: "imagenE2", _id: "64" }]

const Todos: React.FC<props> = (props) => {
    const [carpets, setcarpet] = useState<{name:string,_id:string,}[]>([]);//guarda un objeto con los detalles de cada carpeta
    const [archives, setarchives] = useState<{name:string,_id:string,}[]>([])//guarda un objeto con los detalles de cada archivo
    const [refresh, setrefresh] = useState(0)

    const refreshData = () => {  //refresca la pagina por cada actualizacion de datos
        setrefresh(refresh + 1)
    }

    function dataFech() {
        //peticion al servidor para obtener las carpetas no asignadas   
        fetch("http://192.168.20.203:4000/api/carpets")
            .then(e => e.json())
            .then(e => {
                setcarpet(e)
            })
            .catch(e => {
                console.log(e)
                setcarpet(content);
            })
        // peticion de los archivos sin una carpeta asignada
        fetch("http://192.168.20.203:4000/api/archives", {
            method: "POST",
            body: JSON.stringify({ id: "none" }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(data => data.json())
            .then(data => {
                setarchives(data)
            })
            .catch(e => {
                console.log(e)
                setarchives(archiver)
            })

    }

    //const carpet = props.response.carpet

    useEffect(() => {
        props.setID("none");//pasa el id none a el componente padre
        dataFech() //matriz vacia para que no se ejecute un loop
        return () => {
            setarchives([])
        }
    }, [props.update, refresh])// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <div className="card-content">
                {carpets.map(c => {
                    return (
                        <div key={c._id} className="card img" >
                            <Link className="view-img" to={"/carpeta/" + c._id}>
                                <div className="carpert-card">
                                    <Archive size={50} className="carpet-icon" />
                                    <h2>{c.name}</h2>
                                </div>
                            </Link>
                            <div className="descript">
                                <div className="title-name"></div>
                                <Options refresh={refreshData} id={c._id} name={c.name} type={"carpet"} />
                            </div>
                        </div>
                    )
                })}
                {archives.map(i => {
                    return (
                        <div key={i._id} className="card img">
                            <div className="view-img">
                                <img src="" className="card-img-top" height="160px" alt="no se ve :("></img>
                                <p>sadsacevavcsvarvjnoergnbasvnavnsjkdbnnfjsnojnckjbfdfdvfgnsjgnfagbtfesbngsfhsdgbjfahgjkdfsaglhgfdnsgbidiubsvihgsfuighdsfugh</p>
                            </div>
                            <div className="descript">
                                <div className="title-name">{i.name}</div>
                                <Options refresh={refreshData} id={i._id} name={i.name} type={"archive"} />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Todos;
