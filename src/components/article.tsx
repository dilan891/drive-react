import React, { useState, createRef, Suspense, useContext } from 'react'
import { Switch, Route } from "react-router-dom"
import Carpeta from "./Carpeta";
import Todos from "./Todos";
import Carpetas from './Carpetas';
import ToastNoti from "./NotiToast"
import { ToastsContext } from "../context/useToast"
import { createCarpetFetch, handleSubmitFetch } from "./api/fetchApi"
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap"
import VarMenu from "./VarMenu"

//import DataFetch from "./api/fetchApi";

const Article: React.FC = () => {
    const [update, setupdate] = useState<number>(0)
    const [id, setid] = useState<string>("");
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [toast, settoast] = useState<boolean>(false);

    const { carpetToast, failToast, updater } = useContext(ToastsContext);

    const open = () => setModalOpen(!modalOpen) //abre el modal de upload

    //const response = DataFetch()

    const setID = (idC: string) => setid(idC)

    const caller = (e: React.FormEvent<HTMLFormElement>, nameC: string) => { //llama a createCarpet
        let idC = id
        createCarpet(idC, nameC);
    }

    const createCarpet = async (idC: string, nameC: string) => {  //crea una carpeta y alualiza los componentes 
        const data = await createCarpetFetch(idC, nameC);      //llamada a la api fetch
        (data === null) ? failToast() : carpetToast() && setupdate(update + 1);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); //sube un archivo al servidor
        const data = await handleSubmitFetch(fileApi.current.files[0], id);
        if (data) {
            setModalOpen(false)
            settoast(true)
            setTimeout(() => { settoast(false) }, 2000)
            updater();
        }
        else {
            failToast();
        }

    }

    const fileApi: any = createRef(); //maneja el archivo subido

    return (
        <div className="all">
            <div>
                <Modal size="lg" isOpen={modalOpen}>
                    <ModalHeader>
                        Sube un archivo
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
            <Switch>
                <Route path="/Todos">
                    <VarMenu caller={caller.bind(this)} open={open} />
                    <Suspense fallback={<h1>cargando...</h1>}>
                        <Todos setID={setID.bind(this)} />
                    </Suspense>
                </Route>
                <Route path="/Carpetas">
                    <VarMenu caller={caller.bind(this)} open={open} />
                    <Carpetas update={update} setID={setID.bind(this)} />
                </Route>
                <Route path="/carpeta/:id">
                    <VarMenu caller={caller.bind(this)} open={open} />
                    <Carpeta update={update} setID={setID.bind(this)} />
                </Route>
            </Switch>
            <div className="position-fixed bottom-0 end-0 p-3">
                <ToastNoti uploadToast={toast}></ToastNoti>
            </div>
        </div>
    )
}

export default Article;
