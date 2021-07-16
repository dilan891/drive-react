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
    error 3 usuario ya registrado
    error 4 email no valido
    error 5 numero no valido
    error 6 el nombre no puede contenet letras o caracteres especiales
*/ 

export const validar = (datos: formData,password2: string):boolean=>{
    let errores = [];
    if(!comparePassword(datos.password,password2)){
        errores.push(1)
    }
    if (!passwordVerification(datos.password)){
        errores.push(2)
    }
    if(userVerification(datos.username)){
        errores.push(3)
    }
    if(!emailVerification(datos.email)){
        errores.push(4)
    }
    if(!numberVerification(datos.number)){
        errores.push(5)
    }
    return true
} 

const comparePassword = (pass1: string,pass2: string):boolean =>{
    if(pass1 === pass2) return true;
    else return false;
}

const passwordVerification = (pass: string) =>{
    if(pass.indexOf(" ") === -1){
        console.log("no puede contener espacios en blanco")
        return false;
    }
}

const userVerification = (username: string):Promise<boolean> => {
    return isUserVerification(username)
}

const emailVerification = (email: string)=>{
    const re = /^([\da-z_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/;
	return re.exec(email);
}

const numberVerification = (number: string) =>{
    if(number.length > 15 || isNaN(parseInt(number)) === true){
        return false
    }
    else{
        return true;
    }
}
/*
const nameVerification = (name: string) =>{
    const array = name.split("");
    array.includes("")
}
*/