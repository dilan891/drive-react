import {
    Toast, ToastBody
} from 'reactstrap';
import { useContext } from "react";
import { ToastsContext } from '../context/useToast';

export default function ToastNoti(props) {
    const { failToastOpen } = useContext(ToastsContext);

    return (
        <div>
            <Toast isOpen={props.uploadToast} className="bg-primary"  >
                <ToastBody>
                    Archivo subido con exito
                </ToastBody>
            </Toast>
            <Toast isOpen={failToastOpen} color="red" >
                <ToastBody>
                    Hay un error
                </ToastBody>
            </Toast>
        </div>
    )

}