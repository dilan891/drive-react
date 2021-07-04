import React, { useContext } from 'react'
import { Menu } from "../../context/useMenuSelect";
import {moveFetch} from "../api/fetchApi"
import { ToastsContext } from '../../context/useToast';

const SelectVar: React.FC = () => {
    const select = useContext(Menu);
    const { failToast, moveToastActive } = useContext(ToastsContext);

    const closeVar = () => {
        select.desactivateSelect();
    }

    const moveHere = async() => {
        const datos = { idObject: select.id, idToMove: select.idToMove };
        const move =  await moveFetch(datos);
        (move)?moveToastActive():failToast();
        select.desactivateSelect();
    }

    return (
        <div className="select-var" style={{ visibility: select.visible, position: select.position }}>
            <div>
                seleccionaste <strong>{select.name}</strong> {"moverlo a " + select.nameToMove}
            </div>
            <button type="button" className="btn btn-info" id="b-dis" onClick={moveHere} >Mover aqui</button>
            <button type="button" className="btn btn-info" onClick={closeVar}>X</button>

        </div>
    )
}

export default SelectVar;
