import {useParams,Link} from "react-router-dom"
import {useEffect,useState} from "react"
import "../css/card.css"

export default function Carpeta(props){

    const [content,setconten] = useState([]); 

    const {id} = useParams();

    const [name,setName] = useState("")

    const handleChange = (event)=>{
    setName(event.target.value)
    };

    const caller = (e)=>{
        props.createCarpet(id,name)
        setName("")
    };

    useEffect(()=>{
        console.log(props)
        const fetchCarpet = ()=>{
            fetch("http://localhost:4000/subcarpet/"+id)
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
            <div className="menu">
                <input type="text" value={name} onChange={handleChange} name="name" />
                <button onClick={caller}>+</button> 
            </div>
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