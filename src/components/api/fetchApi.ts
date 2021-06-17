const ip: string = "http://192.168.20.203:4000"

export const createCarpetFetch = (idC: string, nameC: string): Promise<JSON> => {
    let newCarpet;
    newCarpet = { name: nameC, _id: "none", carpet: idC };
    return fetch(ip + "/api/carpets", {
        method: "POST",
        body: JSON.stringify(newCarpet),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(data => data.json())
        .then(data => { return newCarpet = data })
        .catch(e => { return newCarpet = null })
}

export const handleSubmitFetch = (file: any, id: string ): Promise<boolean> => {   //al darle submit al formulario
    let formData = new FormData();
    formData.append("archivo", file)
    formData.append("id", id)
    return fetch(ip + "/api/fileUpload", {
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

export const DataFetch = (): Promise<any> => {  //recoge los datos de todas las carpetas guardadas
    return fetch(ip + "/api/carpets")
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
    return fetch(ip + "/api/move", {
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


export const SubcarpetFecth = (id: string): Promise<any> => {
    return fetch(ip + "/api/subcarpet/" + id)
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

export const deleteArchive  = (id:string,name:string,type:any) =>{
    return fetch("http://192.168.20.203:4000/api/archivedel", {
      method: "DELETE",
      body: JSON.stringify({ id: id, name: name, type: type }),
      headers: {
        "Content-type": "application/json"
      }
    }).then(data => data.json())
      .then(() => {return true})
      .catch(e => {
        console.log(e);
        return false;
    })
}

export const Descargas = (id: string , name: string):Promise<void> =>{
    return fetch(ip+"/api/descargas"+id)
        .then(data => data.blob())
        .then(data => {  //descarga el elemento enviado
            let file = URL.createObjectURL(data);
            let a = document.createElement("a");
            a.href  = file;
            a.download = name;
            document.body.appendChild(a);
            a.click();
            a.remove();
            //window.location.assign(file);
        })
}
