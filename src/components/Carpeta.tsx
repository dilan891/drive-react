/*
    Este componente muestra el contenido de cada carpeta asiganda
*/
import { useParams } from "react-router-dom"
import React, { useContext, useEffect, useState } from "react"
import "../css/card.css"
import CardImg from "./cards/cardImg"
import { Menu } from "../context/useMenuSelect";
import { ToastsContext } from "../context/useToast"
import { carpertaActual, DataFetchArchives, SubcarpetFecth } from "./api/fetchApi"
import CardFolder from "./cards/cardFolder"

interface Props {
    update: number,
    setID: (id: any) => void
}

let contents: { name: string, _id: string, elements: boolean }[] = [{ name: "error", _id: "45", elements: false }] //eliminar
const loading: { name: string, _id: string, elements: boolean }[] = [{ name: "loading", _id: "0", elements: false }] //carga

const Carpeta: React.FC<Props> = (Props) => {

    const [content, setconten] = useState<{ name: string, _id: string, elements: boolean }[]>(loading);
    const [archives, setArchives] = useState([{loading: true}]);
    const [refresh, setrefresh] = useState(0);
    const { previusId, updateToast } = useContext(ToastsContext)
    const { setId } = useContext(Menu)
    const { id } = useParams<any>();

    const refresPage = () => {
        setconten(loading);
        previusId(id);
        setrefresh(refresh + 1)
    }
    
    useEffect(() => {
        Props.setID(id);
        const fetchCarpet = async () => {
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
    console.log(content)
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
    else if(content.length > 0 && content[0]._id === "0"){
        return (
            <div>
                <div className="vacio">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div>
                <div className="card-content">
                    {content.map(detail => {
                        return (
                            <CardFolder key={detail._id} name={detail.name} _id={detail._id} refresh={refresPage} idPreview={refresPage} />
                        )
                    })}
                    {archives.map((a: any) => {
                        return(
                            <CardImg key={a._id} type={a.type} name={a.name} refreshPages={refresPage} _id={a._id} />
                        )                       
                    })}
                </div>
            </div>
        )
    }
};

export default Carpeta;
