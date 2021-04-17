/*
    muestra los toast dependiendo del useContext que recibe
*/
import { Toast, ToastBody } from 'reactstrap';
import React,{ useContext } from "react";
import { ToastsContext } from '../context/useToast';

interface Props{
    uploadToast: boolean
}

const ToastNoti: React.FC<Props>  = (Props) =>{
    const { failToastOpen, moveToast, newCarpetToast } = useContext(ToastsContext);

    return (
        <div>
            <Toast isOpen={Props.uploadToast} className="bg-primary"  >
                <ToastBody>
                    Archivo subido con exito
                </ToastBody>
            </Toast>
            <Toast isOpen={moveToast} className="bg-primary">
                <ToastBody>
                    El archivo ha sido movido
                </ToastBody>
            </Toast>
            <Toast isOpen={newCarpetToast} className="bg-primary">
                <ToastBody>
                    Carpeta creada con exito
                </ToastBody>
            </Toast>
            <Toast isOpen={failToastOpen} className="bg-danger" >
                <ToastBody>
                    Error de conexion
                </ToastBody>
            </Toast>
        </div>
    )

}

export default ToastNoti;
