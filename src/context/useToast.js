/*
    cambia los booleanos toast a true para mostrar mensajes
*/
import React, { useReducer, createContext } from 'react'

const toasts = {
    failtoastOpen: false,
    newCarpetToast: false,
    moveToast: false
}

export const ToastsContext = createContext();

function UseToast(props) {
    //Reducer setttings
    const reducer = (state, action) => {
        switch (action.type) {
            case "fail":
                return {
                    newCarpetToast: false,
                    failtoastOpen: true,
                    moveToast: false
                }
            case "desactiveAll":
                return state = toasts
            case "carpetToast":
                return {
                    newCarpetToast: true,
                    failtoastOpen: false,
                    moveToast: false
                }
            case "moveToastActive":
                return {
                    failtoastOpen: false,
                    newCarpetToast: false,
                    moveToast: true
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

    const value = {
        failToastOpen: state.failtoastOpen,
        moveToast: state.moveToast,
        newCarpetToast: state.newCarpetToast,
        failToast,
        carpetToast,
        moveToastActive
    }

    return (
        <div>
            <ToastsContext.Provider value={value}>
                {props.children}
            </ToastsContext.Provider>
        </div>
    )
}

export { UseToast }
