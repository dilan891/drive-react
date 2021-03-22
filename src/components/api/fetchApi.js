
export default function DataFetch() { 
    let carpet,archive
    //peticion al servidor para obtener las carpetas no asignadas    
    fetch("http://192.168.20.203:4000/api/carpets")
        .then(e => e.json())
        .then(e => {
            carpet = e
        })
        .catch(e => {
            console.log(e)
            carpet = [{ name: "Juan", _id: "60454742f4a5194e0c511965" }, { name: "carpet2", _id: 2 }]
        })
    // peticion de los archivos sin una carpeta asignada
    fetch("http://192.168.20.203:4000/api/archives", {
        method: "POST",
        body: JSON.stringify({ id: "none" }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(data => data.json())
        .then(data => {
            archive = data
        })
        .catch(e => {
            console.log(e)
            archive = [{ name: "imagenE1", id: 45 }, { name: "imagenE2", id: 64 }]
        })
    return {
        carpet,archive
    }

}