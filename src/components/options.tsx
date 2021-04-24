import React, { useState, useContext } from 'react';
import {
  DropdownToggle, DropdownMenu, DropdownItem, Dropdown,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import { Gear } from "react-bootstrap-icons"
import { Menu } from "../context/useMenuSelect";
import { ToastsContext } from '../context/useToast';

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

  const submitChangeName = (e:any) => {
    fetch("http://192.168.20.203:4000/api/putarchive", {
      method: "PUT",
      body: JSON.stringify({ id: Props.id, newName: handleName, type: Props.type }),
      headers: {
        "Content-type": "application/json"
      }
    }).then(data => data.json())
      .then(data => console.log(data))
    setNameChange(!nameChange)
    Props.refresh()
    e.preventDefault()
  }

  const toggle = () => setOpen(!dropdownOpen);

  const deleteA = () => {
    const id = Props.id
    const name = Props.name
    fetch("http://192.168.20.203:4000/api/archivedel", {
      method: "DELETE",
      body: JSON.stringify({ id: id, name: name, type: Props.type }),
      headers: {
        "Content-type": "application/json"
      }
    }).then(data => data.json())
      .then(() => Props.refresh())
      .catch(e => {
        console.log(e);
        failToast();
      })

  }

  const updateName = () => {
    setNameChange(!nameChange);
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
          <DropdownItem onClick={updateName}>Cambiar nombre</DropdownItem>
          <DropdownItem onClick={handlemove}>Mover a otra carpeta</DropdownItem>
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
            <button type="button" className="cancel" onClick={updateName}>Cancelar</button>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  )
}

export default Options;
