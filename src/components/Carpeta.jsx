/*
    Este componente muestra el contenido de cada carpeta asiganda
*/
import { useParams, Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import "../css/card.css"
import Options from "./options"
import { Archive } from "react-bootstrap-icons"
import { Menu } from "../context/useMenuSelect";

export default function Carpeta(props) {

    const [content, setconten] = useState([]);
    const [archives, setArchives] = useState([]);
    const [refresh, setrefresh] = useState(0);
    const {setId} = useContext(Menu)
    const { id } = useParams();

    const refresPage = () => setrefresh(refresh + 1)

    useEffect(() => {
        props.setID(id);
        setId(id,id)
        const fetchCarpet = () => {
            fetch("http://192.168.20.203:4000/api/subcarpet/" + id)
                .then(data => data.json())
                .then(info => {(info.length === 0)? setconten([]):setconten(info);  }) //si no hay carpetas el estado queda vacio
                .catch(e => setconten([{ name: "error", _id: 45, elements: false }])); // si elemnenst igual a true no hay contenido en la carpeta seleccionada
            fetch("http://192.168.20.203:4000/api/archives", {
                method: "POST",
                body: JSON.stringify({ id: id }),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(data => data.json())
                .then(data => {
                    if(data.length === 0){ //si no hay archivos el estado queda vacio
                        setArchives([])
                    }
                    else setArchives(data)               
                })
                .catch(e => console.log(e))    
        }
        fetchCarpet()
    }, [refresh, props.update]) // eslint-disable-line react-hooks/exhaustive-deps
    if (content.length === 0 && archives.length === 0) {
        return (
        <div>
            {props.modal}
            <div className="vacio">
                <div className="vacio-text">
                    Esta carpeta esta vacia
            </div>
            </div>
        </div>)
    }
    else {
        return (
            <div>
                <div className="card-content">
                    {content.map(detail => {
                        return (
                            <div className="card img" key={detail._id}>
                                <Link onClick={refresPage} className="view-img" to={"/carpeta/" + detail._id}>
                                    <div className="carpert-card">
                                        <Archive size={50} className="carpet-icon" />
                                        <h2>{detail.name}</h2>
                                    </div>
                                </Link>
                                <div className="descript">
                                    <div className="title-name"></div>
                                    <Options refresh={refresPage} id={detail._id} name={detail.name} type={"carpet"} />
                                </div>
                            </div>
                        )
                    })}
                    {archives.map((a) => {
                        return (
                            <div key={a._id} className="card img">
                                <div className="view-img">
                                    <img src="" className="card-img-top" height="160px" alt="no se ve :("></img>
                                    <p>sadsacevavcsvarvjnoergnbasvnavnsjkdbnnfjsnojnckjbfdfdvfgnsjgnfagbtfesbngsfhsdgbjfahgjkdfsaglhgfdnsgbidiubsvihgsfuighdsfugh</p>
                                </div>
                                <div className="descript">
                                    <div className="title-name">{a.name}</div>
                                    <Options refresh={refresPage} id={a._id} name={a.name} type={"archive"} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
};
