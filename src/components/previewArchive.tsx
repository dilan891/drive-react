import React from "react";
import { openFile } from "./api/fetchApi";

import  imgs  from "../assets/img/icon-img.png"

interface Props {
    type: string,
    nombre: string,
    Id: string
}

const Preview: React.FC<Props> = (Props) => {

    const openFiles: any = ( ) =>{
        openFile(Props.Id,Props.nombre);
    }
    
    switch (Props.type) {
        case "img":
            return (
                <div onClick={openFiles}>
                    <img src={imgs} alt="icono de imagen" width={"200px"} height={"160px"} />
                </div>
            )
        case "document":
            return (
                <div onClick={openFiles}>
                    <img src="./iconPreview/icon-document.png" alt="icono de documento" width={"200px"} height={"160px"} />
                </div>
            )
        case "exe":
            return (
                <div onClick={openFiles}>
                    <img src="./iconPreview/icon-exe.png" alt="icono de documento" width={"200px"} height={"160px"} />
                </div>
            )
        default:
            return (
                <div onClick={openFiles}>
                    <img src="" alt="icono de archivo" />
                </div>
            )
    }

}

export default Preview;