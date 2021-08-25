import React from "react";
import { Archive } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import Options from "../options";

interface props {
    name:string
    _id:string
    idPreview: () => void
    refresh: () => void
}

const CardFolder: React.FC<props> = (props) => {

    return (
        <div className="card img" >
            <Link onClick={props.idPreview} className="view-img" to={"/menu/carpeta/" + props._id}>
                <div className="carpert-card">
                    <Archive size={50} className="carpet-icon" />
                    <h2>{props.name}</h2>
                </div>
            </Link>
            <div className="descript">
                <div className="title-name"></div>
                <Options refresh={props.refresh} id={props._id} name={props.name} type={"carpet"} />
            </div>
        </div>
    )

}

export default CardFolder
