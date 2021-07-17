// ip del servidor que contiene el backend
const ip: string = "http://192.168.20.203:4000";
let token:any = localStorage.getItem("jwtToken")

const getHeaderAuth = () =>{
    token = localStorage.getItem("jwtToken")
    let headers = { 
        "content-type": "application/json",
        "Authorization": token
    }
    return headers
}



export const createCarpetFetch = (idC: string, nameC: string): Promise<JSON> => {
    let newCarpet;
    newCarpet = { name: nameC, _id: "none", carpet: idC };
    return fetch(ip + "/api/carpets", {
        method: "POST",
        body: JSON.stringify(newCarpet),
        headers: getHeaderAuth()
    }).then(data => data.json())
        .then(data => { return newCarpet = data })
        .catch(e => { return newCarpet = null })
}

export const handleSubmitFetch = (file: any, id: string): Promise<boolean> => {   //al darle submit al formulario
    let formData = new FormData();
    formData.append("archivo", file)
    formData.append("id", id)
    return fetch(ip + "/api/fileUpload", {
        method: "POST",
        body: formData,
        headers: getHeaderAuth()
    }).then(data => data.json())
        .then(data => {
            return true
        })
        .catch(e => {
            console.log(e)
            return false
        })
}

export const DataFetch = (): Promise<any> => {  //recoge los datos de todas las carpetas guardadas
    return fetch(ip + "/api/carpets",{
        headers: getHeaderAuth()
    })
        .then(data => data.json())
        .then(data => {
            return data
        })
        .catch(e => {
            console.log(e)
            return null
        })
}

export const DataFetchArchives = (id: string = "none"): Promise<any> => {
    return fetch(ip + "/api/archives", {
        method: "POST",
        body: JSON.stringify({ id: id }),
        headers: getHeaderAuth()
    })
        .then(data => data.json())
        .then(data => {
            return data
        })
        .catch(e => {
            console.log(e)
            return null
        })
}

export const moveFetch = (datos: object): Promise<boolean> => {
    return fetch(ip + "/api/move", {
        method: "PUT",
        body: JSON.stringify(datos),
        headers: getHeaderAuth()
    }).then(data => data.json())
        .then(data => true)
        .catch(e => {
            console.log(e)
            return false
        });
}

export const SubcarpetFecth = (id: string): Promise<any> => {
    return fetch(ip + "/api/subcarpet/" + id,{
        headers: getHeaderAuth()
    })
        .then(data => data.json())
        .then(info => {
            if (info.length === 0) {
                return [];
            }
            else {
                return info;
            }
        }) //si no hay carpetas el estado queda vacio
        .catch(e => { return null })
}

export const deleteArchive = (id: string, name: string, type: any) => {
    return fetch(ip + "/api/archivedel", {
        method: "DELETE",
        body: JSON.stringify({ id: id, name: name, type: type }),
        headers: getHeaderAuth()
    }).then(data => data.json())
        .then(() => { return true })
        .catch(e => {
            console.log(e);
            return false;
        })
}

export const Descargas = (id: string, name: string): Promise<void> => {
    return fetch(ip + "/api/descargas" + id,{
        headers: getHeaderAuth()
    })
        .then(data => data.blob())
        .then(data => {  //descarga el elemento enviado
            let file = URL.createObjectURL(data);
            let a = document.createElement("a");
            a.href = file;
            a.download = name;
            document.body.appendChild(a);
            a.click();
            a.remove();
            //window.location.assign(file);
        })
}

export const carpertaActual = (id: string): Promise<string> => {
    return fetch(ip + "/api/carpertid/" + id,{
        headers: getHeaderAuth()
    })
        .then(data => data.json())
        .then(data => { return data[0].name }) //pasa el nombre y el id de la carpeta abierta para la funcion de seleccion
        .catch(e => { console.log(e) });
}

export const loginRequest = (user: string,password: string) => {
    return fetch(ip + "/api/login",{
        method: "POST",
        mode: "cors",
        credentials: "include",// Don't forget to specify this if you need cookies
        body: JSON.stringify({username: user,password: password}),
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(data => data.json())
    .then(data => {
       if (data.login){
           console.log("inciio")
           token = data.token
           console.log(data.token)
           localStorage.setItem("jwtToken", token)
           return true
       }
       else{
           console.log("contraseña incorrecta")
           return false
       }      
    })
    .catch(e => {
        console.log("error")
        console.log(e)
    })
}

export const prueba = ()=>{ 
    fetch(ip + "/api/test",{
        method: "GET",
        headers: getHeaderAuth()
    })
    .then(data => data.json())
    .then(data => console.log(data))
    .catch(e => console.log(e))
}

export const isUserVerification = (user: string) =>{
    return fetch(ip + "/api/users/" + user,{
        method: "GET"
    })
    .then(data => data.json())
    .then(data => { 
        return data.isUser
    })
    .catch(e => {
        console.log(e)
        return false;
    })
}

interface formData{
    username: string,
    password: string,
    email: string,
    number: string,
    nombre: string,
}

export const registerNewUser = (data: formData) => {
    return fetch(ip + "/api/register",{
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "content-type": "application/json"
        }
    }).then(data => data.json())
    .then(data => { 
        console.log("exito: " + data.exito)
    })
    .catch(e => {
        console.log(e)
    })
}   
