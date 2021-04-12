import { useState } from "react"
import PreviusButton from './previusButton';
import { ArrowBarUp } from "react-bootstrap-icons"

export default function VarMenu(props) {
    const [name, setName] = useState("")

    const handleChange = (event) => {
        setName(event.target.value)
    };

    const caller = (e) => {
        props.caller(e, name)
        setName("")
    }

    return (
        <div className="menu">  {/*crea el menu var qeu se uliza para añadir archivos o carpetas*/}
            <PreviusButton />
            <input className="addCarpet"
                placeholder="Añadir carpeta..."
                type="text" value={name}
                onChange={handleChange}
                name="name" />
            <button className="boton-green munu-buton" onClick={caller}>+</button>
            <button className="upload-button munu-buton" prefix="subir archivo" onClick={props.open}><ArrowBarUp /></button>
            {/*<input type="text" placeholder="Buscar" className="addCarpet" />*/}
        </div>

    )
}; 
