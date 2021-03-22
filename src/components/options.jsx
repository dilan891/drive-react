import React, { useState, useContext } from 'react';
import {
  DropdownToggle, DropdownMenu, DropdownItem, Dropdown,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import {Gear} from "react-bootstrap-icons"
import {Menu} from "../context/useMenuSelect";

export default function Options(props) {
  const [dropdownOpen, setOpen] = useState(false);
  const [nameChange, setNameChange] = useState(false)
  const [handleName, setHandle] = useState(props.name)
  const {activeteSelect} = useContext(Menu)

  const handlechange = (e) => {
    setHandle(e.target.value)
  }

  const handlemove = ()=>{
    activeteSelect(props.id,props.name)
  }

  const submitChangeName = (e) => {
    fetch("http://192.168.20.203:4000/api/putarchive", {
      method: "PUT",
      body: JSON.stringify({ id: props.id, newName: handleName, type: props.type }),
      headers: {
        "Content-type": "application/json"
      }
    }).then(data => data.json())
      .then(data => console.log(data))
    setNameChange(!nameChange)
    props.refresh()
    e.preventDefault()
  }

  const toggle = () => setOpen(!dropdownOpen);

  const deleteA = () => {
    const id = props.id
    const name = props.name
    fetch("http://192.168.20.203:4000/api/archivedel", {
      method: "DELETE",
      body: JSON.stringify({ id: id, name: name, type: props.type }),
      headers: {
        "Content-type": "application/json"
      }
    }).then(data => data.json())
    .then(()=>props.refresh())
    
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
                    maxHeight: '100px',
                  },
                };
              },
            },
          }}
        >
          <DropdownItem onClick={deleteA}>Eliminar</DropdownItem>
          <DropdownItem onClick={updateName}>Cambiar nombre</DropdownItem>
          <DropdownItem onClick={handlemove}>mover</DropdownItem>
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