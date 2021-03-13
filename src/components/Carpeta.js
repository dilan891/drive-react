import {useParams,Link} from "react-router-dom"
import {useEffect,useState} from "react"
import "../css/card.css"

export default function Carpeta(props){

    const [content,setconten] = useState([]); 
    const [archives,setArchives] = useState([]);
    const [refresh,setrefresh] = useState(0);
    const {id} = useParams();

    const refresPage = ()=> setrefresh(refresh+1)

    useEffect(()=>{
        props.setID(id);
        const fetchCarpet = ()=>{
            fetch("http://192.168.20.203:4000/api/subcarpet/"+id)
            .then(data => data.json())
            .then(info => {
                setconten(info);
            })
            .catch(e => setconten([{name: "error",_id: 45,elements: false}]));// si elemnenst igual a true no hay contenido en la carpeta seleccionada
            fetch("http://192.168.20.203:4000/api/archives",{
                method: "POST",
                body: JSON.stringify({id: id}),
                headers:{
                    "Content-Type": "application/json"
                }
            }).then(data => data.json())
            .then(data => setArchives(data))
            .catch(e => console.log(e))
        }
        fetchCarpet()
    },[refresh,props.update] ) // eslint-disable-line react-hooks/exhaustive-deps
    return(
            <div>
                {props.modal}
                <div className="card-content">
                    {content.map(detail=>{
                          return(
                            <Link key={detail._id} onClick={refresPage} to={"/carpeta/"+detail._id}>
                                <div className="card">
                                    <h2>{detail.name}</h2>
                                </div>
                            </Link>
                            )  
                    })}
                    {archives.map((a)=>{
                        return(
                            <div key={a._id} className="card img">
                                <h1>{a.name}</h1>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    /*
        return (
        <div>
            {props.modal}
            <div className="vacio">
                <div className="vacio-text">
                    Esta carpeta esta vacia  
                </div> 
            </div>
        </div>)*/
    
};