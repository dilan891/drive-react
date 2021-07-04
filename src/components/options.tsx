import React, { useState, useContext } from 'react';
import {
  DropdownToggle, DropdownMenu, DropdownItem, Dropdown,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import { Gear } from "react-bootstrap-icons"
import { Menu } from "../context/useMenuSelect";
import { ToastsContext } from '../context/useToast';
import { changeNameArchive, deleteArchive, Descargas } from './api/fetchApi';

interface Props{
  name: string,
  id: string,
  type:string,
  refresh: () => void
}

const Options:React.FC<Props> = (Props) => {
  const [dropdownOpen, setOpen] = useState<boolean>(false);
  const [nameChange, setNameChange] = useState<boolean>(false);
  const { failToast } = useContext(ToastsContext);
  const [handleName, setHandle] = useState<string>(Props.name)
  const { activeteSelect } = useContext(Menu)

  const handlechange = (e:any) => {
    setHandle(e.target.value)
  }

  const handlemove = () => {
    activeteSelect(Props.id, Props.name)
  }

  const submitChangeName = async (e:any) => {
    var changeF:boolean = await changeNameArchive(Props.id,handleName,Props.type)
    if(changeF === true) {
      Props.refresh()
    }else {failToast()}
    setNameChange(!nameChange)
    e.preventDefault()
  }

  const toggle = () => setOpen(!dropdownOpen);

  const deleteA = async() => {
    const id:string = Props.id
    const name:string = Props.name
    const info = await deleteArchive(id,name,Props.type);
    (info)?Props.refresh():failToast();
  }

  const updateNameModal = () => {
    setNameChange(!nameChange);
  }

  const download = () =>{
    Descargas(Props.id,Props.name);
  }

  const TypeOptions = () => { //retorna las opciones depediendo de si es una carpeta o archivo
    if(Props.type === "carpet"){
      return (<div></div>)
    }
    else{
      return (
      <div>
        <DropdownItem onClick={download}>Desacargar</DropdownItem>
      </div>
      )
    }
  }

  return (
    <div className="dropdown position-relative" >
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle className="button-down end-0">
          <Gear />
        </DropdownToggle>
        <DropdownMenu
          modifiers={{
            setMaxHeight: {
              enabled: true,
              order: 890,
              fn: (data) => {
                return {
                  ...data,
                  styles: {
                    ...data.styles,
                    overflow: 'auto',
                    maxHeight: 'auto',
                  },
                };
              },
            },
          }}
        >
          <DropdownItem onClick={deleteA}>Eliminar</DropdownItem>
          <DropdownItem onClick={updateNameModal}>Cambiar nombre</DropdownItem>
          <DropdownItem onClick={handlemove}>Mover a otra carpeta</DropdownItem>
          <TypeOptions />
        </DropdownMenu>
      </Dropdown>
      <Modal isOpen={nameChange} centered={true}>
        <ModalHeader>
          Cambia el nombre
                </ModalHeader>
        <form onSubmit={submitChangeName}>
          <ModalBody>
            <input onChange={handlechange} type="text" value={handleName} />
          </ModalBody>
          <ModalFooter>
            <button className="">submit</button>
            <button type="button" className="cancel" onClick={updateNameModal}>Cancelar</button>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  )
}

export default Options;
