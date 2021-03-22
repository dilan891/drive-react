import React, {useReducer,createContext} from 'react'

//createcontext
const menuVisibility = {
    select:{
        visible: "hidden",
        position: "absolute",
        id: null,
        name: null,
        idToMove: null,
        nameToMove: null
    }}

export const Menu = createContext()

//reducer
const reducer=(state,action) =>{
        switch(action.type){
            case "active":
                return {
                    visible: "visible",
                    position: "relative",
                    id: action.payload.id,
                    name: action.payload.name
                }
            case "setID":
                return {
                    visible: state.visible,
                    position: state.position,
                    id: state.id,
                    name: state.name,
                    idToMove: action.payload.id,
                    nameToMove: action.payload.name
                }
            case "desactive":
                return state=menuVisibility.select
            default:
                throw new Error();
        }
    }

//context options
const UseMenuSelect = (props) => {

    const [state, dispatch] = useReducer(reducer, menuVisibility.select)

    const activeteSelect = (id,name = "error") =>{
        dispatch({
            payload: {id: id,name:name},
            type: "active"
        })
    }

    const setId = (id,name = "error")=>{
        dispatch({
            payload: {id: id,name: name},
            type: "setID"
        })
    }

    const desactivateSelect = () =>{
        dispatch({
            type: "desactive"
        })
    }

    return (
        <div>
            <Menu.Provider value={{
                visible: state.visible,
                position: state.position,
                name: state.name,
                nameToMove: state.nameToMove,
                activeteSelect: activeteSelect,
                desactivateSelect,
                setId
            }}>
                {props.children}
            </Menu.Provider>
        </div>
    )
}

export {UseMenuSelect}
