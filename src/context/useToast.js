/*
    cambia los booleanos toast a true para mostrar mensajes
*/
import React, { useReducer, createContext } from 'react'

/*
interface objetos{
    previus: boolean | null,  // guarda el id de la carpeta anterior
    failtoastOpen: boolean,
    newCarpetToast: boolean,
    moveToast: boolean
}*/

const toasts = {
    update: 1,
    previus: null,  // guarda el id de la carpeta anterior
    failtoastOpen: false,
    newCarpetToast: false,
    moveToast: false
}

export const ToastsContext = createContext();

const UseToast = (props) => {
    //Reducer setttings
    const reducer = (state, action) => {
        switch (action.type) {
            case "fail":
                return {
                    ...state,
                    failtoastOpen: true,
                }
            case "carpetToast":
                return {
                    ...state,
                    update: state.update + 1,
                    newCarpetToast: true,
                }
            case "moveToastActive":
                return {
                    ...state,
                    moveToast: true
                }
            case "desactiveAll":
                return {
                    ...state,
                    failtoastOpen: false,
                    newCarpetToast: false,
                    moveToast: false
                }
            case "setPreviusId":
                return {
                    ...state,
                    previus: action.payLoad.id
                }
            case "update":
                return {
                    ...state,
                    update: state.update + 1
                }
            default:
                throw new Error();
        }
    }

    //Reducer
    const [state, dispatch] = useReducer(reducer, toasts)

    //funciones    
    const failToast = () => {
        dispatch({
            type: "fail"
        });
        setTimeout(() => dispatch({ type: "desactiveAll" }), 4000);
    }

    const carpetToast = () => {
        dispatch({
            type: "carpetToast"
        })
        setTimeout(() => dispatch({ type: "desactiveAll" }), 3000);
    }

    const moveToastActive = () => {
        dispatch({
            type: "moveToastActive"
        })
        setTimeout(() => dispatch({ type: "desactiveAll" }), 3000);
    }

    //id anterior
    const previusId = (id) => {
        dispatch({
            payLoad: { id },
            type: "setPreviusId"
        })
    }

    const updater = () => {
        dispatch({
            type : "update"
        })
    }

    const values = {
        failToastOpen: state.failtoastOpen,
        moveToast: state.moveToast,
        newCarpetToast: state.newCarpetToast,
        previus: state.previus,
        updateToast: state.update,
        previusId,
        failToast,
        carpetToast,
        moveToastActive,
        updater
    }

    return (
        <div className="all">
            <ToastsContext.Provider value={values}>
                {props.children}
            </ToastsContext.Provider>
        </div>
    )
}

export { UseToast }
