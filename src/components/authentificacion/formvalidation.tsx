import { isUserVerification } from "../api/fetchApi";

interface formData{
    username: string,
    password: string,
    email: string,
    number: string,
    nombre: string,
}

/*
    error 1 contraseñas no coinciden
    error 2 contraseña no puede contener caracteres como " "
    
*/ 


export const validar = (datos: formData,password2: string):boolean=>{
    let errores = [];
    if(comparePassword(datos.password,password2)){
        errores.push(1)
    }
    passwordVerification(datos.password);
    userVerification(datos.username);
    return true
} 

const comparePassword = (pass1: string,pass2: string):boolean =>{
    if(pass1 === pass2) return true;
    else return false;
}

const passwordVerification = (pass: string) =>{
    if(pass.indexOf(" ") !== -1){
        console.log("no puede contener espacios en blanco")
    }
}

const userVerification = (username: string)=>{
    return isUserVerification(username)
}

