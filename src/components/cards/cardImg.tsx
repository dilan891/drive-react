import {useState,useEffect} from "react";
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
    const [name,setName] = useState("");
    const [cambio,setCambio] = useState(false); //si se realiza un cambio de nombre esto cambia true para indicar que se debe utilizar el state de name

    const changeName:any = (nombre:string) =>{
        setName(nombre);
        setCambio(true);
    }
    
    useEffect(() => {
        if(!cambio){
            setName(props.name);
        }
    },[props.name,cambio])

    if (props.name === "none"){
        return (
            <div></div>
        )
    }
    else{
        return (
            <div className="card img">
                <div className="view-img">
                    <Preview type={props.type} nombre={name} Id={props._id} ></Preview>
                </div>
                <div className="descript">
                    <div className="title-name">{name}</div>
                    <Options refresh={props.refreshPages} changeName={(nombre:any):any => { changeName(nombre) } } id={props._id} name={props.name} type={"archive"} />
                </div>
            </div>
        )
    }

}

export default CardImg;
