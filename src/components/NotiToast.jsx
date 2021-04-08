/*
    muestra los toast dependiendo del useContext que recibe
*/
import { Toast, ToastBody } from 'reactstrap';
import { useContext } from "react";
import { ToastsContext } from '../context/useToast';

export default function ToastNoti(props) {
    const { failToastOpen, moveToast, newCarpetToast } = useContext(ToastsContext);

    return (
        <div>
            <Toast isOpen={props.uploadToast} className="bg-primary"  >
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