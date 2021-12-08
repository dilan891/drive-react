import { dataUser } from "./components/api/fetchApi";

const IsLoggin = async (username:string,newLogin:(data:any)=>void):Promise<boolean> =>{
    
    //const { newLogin } = useContext(UserContext);
    
    //const { username } = useContext(UserContext);
    
    let localStorageNow = localStorage.getItem("jwtToken")
    
    if(localStorageNow && username !== "none"){
        console.log("exite token y usuario registrado")
        return true
      }
    else if(localStorageNow && username === "none"){
        const data = await dataUser()
        newLogin(data);
        console.log(data)
        return true
    }
    else if(localStorageNow === undefined){
        console.log("no existe token")
        return false
    }
    else{
        return false
    }
       
}



export default IsLoggin
