import {useState,createRef} from 'react'
import {Switch,Route} from "react-router-dom"
import Carpeta from "./Carpeta";
import Todos from "./Todos";
import Carpetas from './Carpetas';
import {Modal,ModalHeader,ModalBody,ModalFooter } from "reactstrap"
import VarMenu from "./VarMenu"

const Article = () => {
    const [update,setupdate] = useState(0) 
    const [id,setid] = useState("")
    const [modalOpen,setModalOpen] = useState(false)

    const open = ()=> setModalOpen(!modalOpen) //abre el modal de upload

    const setID = (idC)=> setid(idC) 
    
    const caller = (e,nameC)=>{ //llama a createCarpet
        let idC = id
        createCarpet(idC,nameC);
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
        .then(o => setupdate(update+1))        
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
        .then(data => setModalOpen(false))
        e.preventDefault();
    }

    const fileApi = createRef(); //maneja el archivo subido
    
    const modal = ( //ventana modal
        <div>
            <Modal size="lg" isOpen={modalOpen}>
                <ModalHeader>
                    encabezado
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group mb-3">
                            <input type="file" name="archivo" ref={fileApi} className="form-control" />
                            <button type="submit" className="input-group-text">Upload</button>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <button onClick={open} className="upload-button munu-buton">cancelar</button>
                </ModalFooter>
            </Modal>
        </div>
    )

    return (
        <div>
            <Switch>
                <Route path="/Todos">
                    <VarMenu caller={caller.bind(this)} open={open} />
                    <Todos update={update} modal={modal} setID={setID.bind(this)} />
                </Route>
                <Route path="/Carpetas">
                    <VarMenu caller={caller.bind(this)} open={open} />
                    <Carpetas update={update} modal={modal} setID={setID.bind(this)}/>
                </Route>
                <Route path="/carpeta/:id">
                    <VarMenu caller={caller.bind(this)} open={open} />
                    <Carpeta update={update} modal={modal} setID={setID.bind(this)} />
                </Route>
            </Switch>
        </div>
    )
}

export default Article;
