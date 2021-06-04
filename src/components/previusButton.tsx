import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { ToastsContext } from '../context/useToast'

const PreviusButton: React.FC = () => {
    const { previus, updater, previusDelete } = useContext(ToastsContext)

    const updateDAta = () => {
        updater();
        previusDelete();
    }

    const redirect: any = () => { //redirige a el menu todos en caso de ser necesario
        if (previus[previus.length - 1] === "none") {
            return "/Todos"
        }
        else {
            return "/carpeta/" + previus[previus.length - 1]
        }
    }

    if (previus.length === 0) {
        return <div></div>
    }

    else {
        return <div className="previus-button">
            <Link onClick={updateDAta} to={redirect} >
                <button>
                    {"<-----"}
                </button>
            </Link>
        </div>
    }

}

export default PreviusButton;
