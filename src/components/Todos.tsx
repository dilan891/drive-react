/*
    Este componente muestra todas las carpetas y archivos no asignados a ninguna carpeta
*/
import "../css/card.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import Options from "./options";
import { Archive } from "react-bootstrap-icons";
import { DataFetch, DataFetchArchives } from "./api/fetchApi"
import { ToastsContext } from "../context/useToast"
import Preview from "./previewArchive";

interface props {
    setID: (id: string) => void
}

let content: { name: string, _id: string, }[] = [{ name: "Juan", _id: "60454742f4a5194e0c511965" }, { name: "carpet2", _id: "2" }];
let archiver: { name: string, _id: string, type: string }[] = [{ name: "imagenE1", _id: "45", type: "img" }, { name: "imagenE2", _id: "64", type: "img" }]

const Todos: React.FC<props> = (props) => {
    const { previusId, updateToast } = useContext(ToastsContext);
    const [carpets, setcarpet] = useState<{ name: string, _id: string, }[]>([]);//guarda un objeto con los detalles de cada carpeta
    const [archives, setarchives] = useState<{ name: string, _id: string, type: string }[]>([])//guarda un objeto con los detalles de cada archivo
    const [refresh, setrefresh] = useState(0)

    const refreshData = () => {  //refresca la pagina por cada actualizacion de datos
        setrefresh(refresh + 1)
    }

    async function dataFech() {
        //peticion al servidor para obtener las carpetas no asignadas   
        const carpetData = await DataFetch();
        (carpetData == null) ? setcarpet(content) : setcarpet(carpetData);
        // peticion de los archivos sin una carpeta asignada
        const archiveData = await DataFetchArchives();
        (archiveData == null) ? setarchives(archiver) : setarchives(archiveData);
    }

    const idPreview = () => {
        previusId("none");
    }

    useEffect(() => {
        props.setID("none");//pasa el id none a el componente padre
        dataFech() //matriz vacia para que no se ejecute un loop
        return () => {
            setarchives([])
        }
    }, [refresh, updateToast])// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <div className="card-content">
                {carpets.map(c => {
                    return (
                        <div key={c._id} className="card img" >
                            <Link onClick={idPreview} className="view-img" to={"/carpeta/" + c._id}>
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
                    console.log(i)
                    return (
                        <div key={i._id} className="card img">
                            <div className="view-img">
                                <Preview type={i.type} ></Preview>
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
