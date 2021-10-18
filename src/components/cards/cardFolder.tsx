import {useState,useEffect} from "react"; 
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

    return (
        <div className="card img" >
            <Link onClick={props.idPreview} className="view-img" to={"/menu/carpeta/" + props._id}>
                <div className="carpert-card">
                    <Archive size={50} className="carpet-icon" />
                    <h2>{name}</h2>
                </div>
            </Link> 
            <div className="descript">
                <div className="title-name"></div>
                <Options refresh={props.refresh} changeName={(nombre:any):any => { changeName(nombre) } } id={props._id} name={props.name} type={"carpet"} />
            </div>
        </div>
    )

}

export default CardFolder
