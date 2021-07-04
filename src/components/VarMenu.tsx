import React, { useState } from "react"
import PreviusButton from './nav/backButton';
import { ArrowBarUp } from "react-bootstrap-icons"

interface Props {
    open: () => void,
    caller: (e: any, name: string) => void
}

const VarMenu: React.FC<Props> = (props) => {
    const [name, setName] = useState("")

    const handleChange = (event: any) => {
        setName(event.target.value)
    };

    const caller = (e: any) => {
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

export default VarMenu;
