import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { ToastsContext } from '../context/useToast'

const PreviusButton: React.FC = () => {
    const { previus,updater } = useContext(ToastsContext)

    const updateDAta = ()=>{
        updater()
    }

    if (previus === null) {
        return <div></div>
    }

    else {
        return <div className="previus-button">
            <Link onClick={updateDAta} to={"/carpeta/" + previus } >
                <button>
                    {"<-----"}
                </button>
            </Link>
        </div>
    }

}

export default PreviusButton;
