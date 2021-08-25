import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { ToastsContext } from '../../context/useToast'

const PreviusButton: React.FC = () => {
    const { previus, updater, previusDelete } = useContext(ToastsContext)

    const updateDAta = () => {
        updater();
        previusDelete();
    }

    const redirect = (): string => { //redirige a el menu todos en caso de ser necesario
        if (previus[previus.length - 1] === "none") {
            return "/menu/Todos"
        }
        else {
            return "/menu/carpeta/" + previus[previus.length - 1]
        }
    }

    if (previus.length === 0) {
        return <div></div>
    }

    else {
        return <div className="previus-button">
            <Link onClick={updateDAta} to={redirect} >
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z" />
                    </svg>
                </button>
            </Link>
        </div>
    }

}

export default PreviusButton;
