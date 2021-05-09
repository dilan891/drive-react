import React from "react";

interface Props{
    type: string
}

const Preview:React.FC<Props> = (Props)=>{
    switch (Props.type){
        case  "img":
            return (
                <div>
                    <img src="./iconPreview/icon-img.png" alt="icono de imagen" />
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