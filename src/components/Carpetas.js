import {useEffect,useState} from "react"
import {Link} from "react-router-dom"
import "../css/card.css";

export default function Carpetas(props){
    const [carpets,setcarpet] =  useState([]);

    useEffect(()=>{
        const data = ()=>{
            fetch("http://localhost:4000/carpets")
            .then(e => e.json())
            .then(e => {
                setcarpet(e)
            })
            .catch(e => {
                console.log(e)
                setcarpet([{name: "carpet1",_id: "60454742f4a5194e0c511965"},{name: "carpet2", _id: 2}]);
            }) 
        } 
        data()
    },[])
    

    return(
        <div>
            {props.var}
            <div className="card-content">
                {carpets.map(c=>{ 
                    return(
                        <Link key={c._id} to={"/carpeta/"+c._id}>
                            <div className="card">
                                <h2>{c.name}</h2>
                            </div>
                        </Link>
                    )
                })}
            </div>
            
        </div>
    )
}
 