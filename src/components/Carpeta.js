import {useParams,Link} from "react-router-dom"
import {useEffect,useState} from "react"
import "../css/card.css"

export default function Carpeta(props){

    const [content,setconten] = useState([]); 

    const {id} = useParams();

    useEffect(()=>{
        props.setID(id);
        const fetchCarpet = ()=>{
            fetch("http://192.168.20.203:4000/api/subcarpet/"+id)
            .then(data => data.json())
            .then(info => {
                setconten(info);
            })
            .catch(e => setconten([{name: "error",_id: 45}]))
        }
        fetchCarpet()
    },[] ) // eslint-disable-line react-hooks/exhaustive-deps

    return(
        <div>
            {props.var}
            {props.modal}
            <div className="card-content">
                {content.map(detail=>{
                    return(
                    <Link key={detail._id} to={"/carpeta/"+detail._id}>
                        <div className="card">
                            <h2>{detail.name}</h2>
                        </div>
                    </Link>
                    )
                })}
            </div>
        </div>
    )
};