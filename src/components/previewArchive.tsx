import React from "react";

interface Props {
    type: string,
    nombre: string
}

const Preview: React.FC<Props> = (Props) => {

    const AbrirVentana = () => {
        window.open("http://localhost:4000/archivosUser")
    }

    switch (Props.type) {
        case "img":
            return (
                <div onClick={AbrirVentana}>
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