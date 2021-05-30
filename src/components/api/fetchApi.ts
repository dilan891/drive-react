const ip:string = "http://192.168.20.203:4000"

export const createCarpetFetch = (idC: string, nameC: string): Promise<JSON> => {
    let newCarpet;
    newCarpet = { name: nameC, _id: "none", carpet: idC };
    return fetch(ip+"/api/carpets", {
        method: "POST",
        body: JSON.stringify(newCarpet),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(data => data.json())
        .then(data => { return newCarpet = data })
        .catch(e => { return newCarpet = null })
}

export const handleSubmitFetch = (file: any, id: string): Promise<boolean> => {   //al darle submit al formulario
    let formData = new FormData();
    formData.append("archivo", file)
    formData.append("id", id)
    return fetch(ip+"/api/fileUpload", {
        method: "POST",
        body: formData
    }).then(data => data.json())
        .then(data => {
            return true
        })
        .catch(e => {
            console.log(e)
            return false
        })
}

export const DataFetch = () => {  //recoge los datos de todas las carpetas guardadas
    return fetch(ip+"/api/carpets")
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
    return fetch(ip+"/api/archives", {
        method: "POST",
        body: JSON.stringify({ id: id }),
        headers: {
            "Content-Type": "application/json"
        }
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
    return fetch(ip+"/api/move", {
        method: "PUT",
        body: JSON.stringify(datos),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(data => data.json())
        .then(data => true)
        .catch(e => {
            console.log(e)
            return false
        });
}


export const SubcarpetFecth = (id: string) => {
    return fetch(ip+"/api/subcarpet/" + id)
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

export const Descargas = () =>{
    return fetch(ip+"/api/descargas")
        .then(data => data.blob())
        .then(data => {  //descarga el elemento enviado
            let file = URL.createObjectURL(data);
            let a = document.createElement("a");
            a.href  = file;
            a.download = "bod.png"
            document.body.appendChild(a);
            a.click()
            a.remove()
            //window.location.assign(file);
        })
}
