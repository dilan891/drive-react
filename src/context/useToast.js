import React, { useReducer, createContext } from 'react'

const toasts = {
    failtoastOpen: false
}

export const ToastsContext = createContext();

function UseToast(props) {
    //Reducer setttings
    const reducer = (state, action) => {
        switch (action.type) {
            case "fail":
                return {
                    failtoast: true
                }
            case "desactiveAll":
                return state = toasts
            default:
                throw new Error();
        }
    }

    //Reducer
    const [state, dispatch] = useReducer(reducer, toasts)

    const failToast = () => {
        dispatch({
            type: "fail"
        });
        setTimeout(() => dispatch({ type: "desactiveAll" }), 3000);

    }

    const value = {
        failToastOpen: state.failtoastOpen,
        failToast
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
