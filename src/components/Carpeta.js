import {useParams} from "react-router-dom"
import {useEffect,useState} from "react"
import "../css/card.css"
export default function Carpeta(){

    const [content,setconten] = useState([]); 

    let {id} = useParams();

    useEffect(()=>{
        fetch("http://localhost:4000/subcarpet/"+id)
        .then(data => data.json())
        .then(info => {
            setconten(info);
        })
        .catch(e => console.log(e))
    },[])

    return(
        <div>
            {content.map(detail=>{
                return(
                <div className="card">
                    <h2>{detail.name}</h2>
                </div>
                )
            })}
        </div>
    )
};