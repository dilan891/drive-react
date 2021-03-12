import {useEffect,useState,createRef} from 'react'
import {Switch,Route} from "react-router-dom"
import Carpeta from "./Carpeta";
import Todos from "./Todos";
import Carpetas from './Carpetas';
import {Modal,ModalHeader,ModalBody,ModalFooter} from "reactstrap"

const Article = () => {
    const [name,setName] = useState("")
    const [update,setupdate] = useState("") 
    const [id,setid] = useState("")
    const [modalOpen,setModalOpen] = useState(false)


    const open = ()=> setModalOpen(!modalOpen) //abre el modal de upload

    const handleChange = (event)=>{
        setName(event.target.value)
        };
    
    const setID = (idC)=> setid(idC)
    
    const caller = (e,nameC = name)=>{
        let idC = id
        console.log(id)
        createCarpet(idC,nameC);
        setName("");
    }

    const createCarpet = (idC,nameC)=>{
        let newCarpet;
        newCarpet = {name: nameC,_id: "none",carpet: idC};
        fetch("http://192.168.20.203:4000/api/carpets",{
            method: "POST",
            body: JSON.stringify(newCarpet),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(data => data.json())
        .then(data => console.log(data))
        .then(o => setupdate(name))
        .then(o => setName(""))
        
    }

    const handleSubmit = (e)=>{   //al darle submit al formulario
        console.log(fileApi.current.files[0].name)
        let formData = new FormData();
        formData.append("archivo",fileApi.current.files[0])
        formData.append("id",id)
        fetch("http://192.168.20.203:4000/api/fileUpload",{
            method: "POST",
            body: formData
        }).then(data => data.json())
        .then(data => console.log(data))
        e.preventDefault();
    }

    const fileApi = createRef(); //maneja el archivo subido

    const varMenu = (<div className="menu">  {/*crea el menu var qeu se uliza para añadir archivos o carpetas*/ }
                        <input className="addCarpet" 
                        placeholder="Añadir carpeta..." 
                        type="text" value={name}
                        onChange={handleChange} 
                        name="name" />
                        <button className="boton-green" onClick={caller}>+</button> 
                        <button className="upload-button" onClick={open}>upload</button>
                    </div>)
    const modal = (
        <div>
            <Modal size="lg" isOpen={modalOpen}>
                <ModalHeader>
                    encabezado
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit}>
                        <div class="input-group mb-3">
                            <input type="file" name="archivo" ref={fileApi} className="form-control" />
                            <button type="submit" className="input-group-text">Upload</button>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <button onClick={open} className="upload-button">cancelar</button>
                </ModalFooter>
            </Modal>
        </div>
    )

    useEffect(()=>{
      },[])

    return (
        <div>
            <Switch>
                <Route path="/Todos">
                    <Todos update={update} modal={modal} var={varMenu} setID={setID.bind(this)} />
                </Route>
                <Route path="/Carpetas">
                    <Carpetas var={varMenu} modal={modal} setID={setID.bind(this)}/>
                </Route>
                <Route path="/carpeta/:id">
                    <Carpeta var={varMenu} modal={modal} setID={setID.bind(this)} />
                </Route>
            </Switch>
        </div>
    )
}

export default Article;
