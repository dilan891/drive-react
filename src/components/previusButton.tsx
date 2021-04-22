import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { ToastsContext } from '../context/useToast'

const PreviusButton: React.FC = () => {
    const { previus } = useContext(ToastsContext)

    if (previus === null) {
        return <div>nothing</div>
    }

    else {
        console.log(previus);
        return <div className="previus-button">
            <Link to={"/carpeta/" + previus} >
                <button>
                    {"<-----"}
                </button>
            </Link>
        </div>
    }

}

export default PreviusButton;
