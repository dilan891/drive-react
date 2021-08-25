import { isUserVerification } from "../api/fetchApi";

interface formData{
    username: string,
    password: string,
    email: string,
    number: string,
    nombre: string,
}

export class Validation {

    datos: formData;
    password2: string;
    errores: number[];

    constructor(datos: formData,password2: string){
        this.datos = datos;
        this.password2 = password2;
        this.errores = []
    }

    validarAll = async ():Promise<boolean> => {
        this.comparePassword()
        this.passwordVerification()
        await this.userVerification()
        console.log(this.emailVerification())
        this.numberVerification()
        this.nameVerification()
        if(this.errores.length > 0){
            return false
        }
        else{
            return true
        }
    } 

    comparePassword = ():boolean =>{
        if(this.datos.password === this.password2) return true;
        else {
            this.errores.push(1)
            return false
        };
    }

    passwordVerification = () =>{
        if(this.datos.password.indexOf(" ") !== -1|| this.datos.password === ""){
            this.errores.push(2)
            return false;
        }
        else{
            return true;
        }
    }

    userVerification = async():Promise<boolean> => {
        const user =  await isUserVerification(this.datos.username);
        !user?this.errores.push(3):console.log("");
        return user;
    }

    emailVerification = ()=>{
        const re = /^([\da-z_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/;
        const email2: string = this.datos.email;
        const verificacion = re.exec(email2);
        (!verificacion)?this.errores.push(4):console.log("");
    	return verificacion;
    }

    numberVerification = () =>{
        if( !(/^\d{11}$/.test(this.datos.number))){
            this.errores.push(5)
            return false
        }
        else{
            return true;
        }
    }
    //colocar verificacion de simbolos especiales
    nameVerification = () =>{
        const name = this.datos.nombre;
        if(name === ""){
            this.errores.push(6)
            return false
        }
        else{
            return true;
        }
    }
    

    viewError = () =>{
    /*
        error 1 contraseñas no coinciden
        error 2 contraseña no puede contener caracteres como " "
        error 3 usuario ya registrado
        error 4 email no valido
        error 5 numero no valido
        error 6 el nombre no puede contenet letras o caracteres especiales
    */ 
        return this.errores;
    }

    //devuelve la descripcion del error que pase
    errorName = (errorCode: number):string=>{
        switch(errorCode){
            case 1: 
                return "contraseña no coincide"
            case 2: 
                return "contraseña no puede contener caracteres como espacios en blanco"
            case 3: 
                return "usuario ya registrado"
            case 4: 
                return "email no valido"
            case 5: 
                return "numero no valido"
            case 6: 
                return "el nombre no puede contenet letras o caracteres especiales ni estar en blanco"
            default: 
                return "codigo no valido"
        }
    }
}
