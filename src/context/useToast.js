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
    previus: null,  // guarda el id de la carpeta anterior
    failtoastOpen: false,
    newCarpetToast: false,
    moveToast: false
}

export const ToastsContext = createContext();

const UseToast = (props) =>{
    //Reducer setttings
    const reducer = (state, action) => {
        switch (action.type) {
            case "fail":
                return {
                    previus: null,
                    newCarpetToast: false,
                    failtoastOpen: true,
                    moveToast: false
                }
            case "carpetToast":
                return {
                    previus: null,
                    newCarpetToast: true,
                    failtoastOpen: false,
                    moveToast: false
                }
            case "moveToastActive":
                return {
                    previus: null,
                    failtoastOpen: false,
                    newCarpetToast: false,
                    moveToast: true
                }
            case "desactiveAll":
                return state = toasts
            case "setPreviusId":
                return {
                    previus: action.payLoad.id,
                    failtoastOpen: false,
                    newCarpetToast: false,
                    moveToast: false
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

    const values = {
        failToastOpen: state.failtoastOpen,
        moveToast: state.moveToast,
        newCarpetToast: state.newCarpetToast,
        previus: state.previus,
        previusId,
        failToast,
        carpetToast,
        moveToastActive
    }

    return (
        <div>
            <ToastsContext.Provider value={values}>
                {props.children}
            </ToastsContext.Provider>
        </div>
    )
}

export { UseToast }
