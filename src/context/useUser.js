import {useReducer,createContext} from "react";

const User =  {
    userName: "none"
}

export const UserContext = createContext();

const UseUser = (props) => {
    const reducer  = (state, action)=>{
        switch(action.type){
            case "login":
                return{
                    ...state,
                    userName: action.payload.username
                }
            case "close":
                return User
            default:
                throw new Error();
        }
    } 

    const [state, dispatch] = useReducer(reducer,User);

    const newLogin = (userData) =>{
        dispatch({
            type: "login",
            payload: userData
        })
    }

    const close = () =>{
        dispatch({
            type: "close"
        })
    }

    const values = {
        username: state.userName, 
        newLogin,
        close
    }

    return (
        <div className="all">
            <UserContext.Provider value={values}>
                {props.children}
            </UserContext.Provider>
        </div>
    )

}

export { UseUser }
