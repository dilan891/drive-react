import React from "react";
import Options from "../options";
import Preview from "../previewArchive"

/*  
    diseño y funciones de las trarjetas 
*/ 

interface props{
    type: string
    name: string
    _id: string
    refreshPages: () => void
}

const CardImg: React.FC<props> = (props) => {

    return (
        <div className="card img">
            <div className="view-img">
                <Preview type={props.type} nombre={props.name} Id={props._id} ></Preview>
            </div>
            <div className="descript">
                <div className="title-name">{props.name}</div>
                <Options refresh={props.refreshPages} id={props._id} name={props.name} type={"archive"} />
            </div>
        </div>
    )

}

export default CardImg;
