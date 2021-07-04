import React from "react";
import { openFile } from "./api/fetchApi";

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
                    <img src="./iconPreview/icon-img.png" alt="icono de imagen" width={"200px"} height={"160px"} />
                </div>
            )
        case "document":
            return (
                <div>
                    <img src="./iconPreview/icon-document.png" alt="icono de documento" width={"200px"} height={"160px"} />
                </div>
            )
        case "exe":
            return (
                <div>
                    <img src="./iconPreview/icon-exe.png" alt="icono de documento" width={"200px"} height={"160px"} />
                </div>
            )
        default:
            return (
                <div>
                    <img src="" alt="icono de archivo" />
                </div>
            )
    }

}

export default Preview;