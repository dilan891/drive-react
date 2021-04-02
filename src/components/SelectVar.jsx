import React, { useContext } from 'react'
import { Menu } from "../context/useMenuSelect";

const SelectVar = () => {
    const select = useContext(Menu);

    const closeVar = () => {
        select.desactivateSelect();
    }

    console.log(select.visible);

    return (
        <div className="select-var" style={{ visibility: select.visible, position: select.position }}>
            <div>
                seleccionaste <strong>{select.name}</strong> {"moverlo a " + select.nameToMove}
            </div>
            <button type="button" className="btn btn-info" id="b-dis">Mover aqui</button>
            <button type="button" className="btn btn-info" onClick={closeVar}>X</button>

        </div>
    )
}

export default SelectVar;
