/*
    Este componente muestra el contenido de cada carpeta asiganda
*/
import { useParams, Link } from "react-router-dom"
import React, { useContext, useEffect, useState } from "react"
import "../css/card.css"
import Options from "./options"
import { Archive } from "react-bootstrap-icons"
import { Menu } from "../context/useMenuSelect";
import { ToastsContext } from "../context/useToast"
import { carpertaActual, DataFetchArchives, SubcarpetFecth } from "./api/fetchApi"
import Preview from "./previewArchive"

interface Props {
    update: number,
    setID: (id: any) => void
}

let contents: { name: string, _id: string, elements: boolean }[] = [{ name: "error", _id: "45", elements: false }] //eliminar

const Carpeta: React.FC<Props> = (Props) => {

    const [content, setconten] = useState<{ name: string, _id: string, elements: boolean }[]>([]);
    const [archives, setArchives] = useState([]);
    const [refresh, setrefresh] = useState(0);
    const { previusId, updateToast } = useContext(ToastsContext)
    const { setId } = useContext(Menu)
    const { id } = useParams<any>();

    const refresPage = () => {
        previusId(id);
        setrefresh(refresh + 1)
    }

    useEffect(() => {
        Props.setID(id);
        const fetchCarpet = async () => {
            /*
            fetch("http://192.168.20.203:4000/api/carpertid/" + id)
                .then(data => data.json())
                .then(data => setId(id, data[0].name)) //pasa el nombre y el id de la carpeta abierta para la funcion de seleccion
                .catch(e => { console.log(e) });*/
            const dataNow = await carpertaActual(id);
            setId(id, dataNow);
            //si no hay carpetas el estado queda vacio
            // si elemnenst igual a true no hay contenido en la carpeta seleccionada
            const subCarpetData = await SubcarpetFecth(id);
            (subCarpetData === null) ? setconten(contents) : setconten(subCarpetData);
            const dataArchive = await DataFetchArchives(id);
            (dataArchive.length === 0) ? setArchives([]) : setArchives(dataArchive);
        }
        fetchCarpet()
    }, [refresh, Props.update, updateToast]) // eslint-disable-line react-hooks/exhaustive-deps
    if (content.length === 0 && archives.length === 0) {
        return (
            <div>
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
                    {archives.map((a: any) => {
                        return (
                            <div key={a._id} className="card img">
                                <div className="view-img">
                                    <Preview type={a.type} nombre={a.name} ></Preview>
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

export default Carpeta;
