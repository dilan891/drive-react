import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "../css/card.css";
import Options from "./options"
import { Archive } from "react-bootstrap-icons"
import {DataFetch} from "./api/fetchApi"

let content: {name:string,_id:string,}[]  = [{ name: "carpet1", _id: "60454742f4a5194e0c511965" }, { name: "carpet2", _id: "2" }]

interface props{
    update: number,
    setID: (id:string) => void
}

const Carpetas:React.FC<props> = (props) => {
    const [carpets, setcarpet] = useState<{name:string,_id:string,}[] >([]);
    const [refresh,setrefresh] = useState(0)

    const refresPage = () => setrefresh(refresh + 1)

    useEffect(() => {
        props.setID("none");
        const data = async()=>{
            const info = await DataFetch();
            (info==null)?setcarpet(content):setcarpet(info);
        }
        data();
        
    }, [props.update])// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <div className="card-content">
                {carpets.map((c:any) => {
                    return (
                        <div className="card img" key={c._id}>
                            <Link className="view-img" to={"/menu/carpeta/" + c._id}>
                                <div className="carpert-card">
                                    <Archive size={50} className="carpet-icon" />
                                    <h2>{c.name}</h2>
                                </div>
                            </Link>
                            <div className="descript">
                                <div className="title-name"></div>
                                <Options refresh={refresPage} id={c._id} name={c.name} type={"carpet"} />
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default Carpetas;
