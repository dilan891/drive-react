import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { ToastsContext } from '../context/useToast'

export default function PreviusButton() {
    const { previus } = useContext(ToastsContext)

    if (previus === null) {
        return <div>nothing</div>
    }

    else {
        return <div className="previus-button">
            <Link to={"/carpeta/" + previus} >
                <button>
                    {"<-----"}
                </button>
            </Link>
        </div>
    }

}
