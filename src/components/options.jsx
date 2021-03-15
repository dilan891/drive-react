import React, { useState } from 'react';
import { DropdownToggle, DropdownMenu, DropdownItem,Dropdown } from 'reactstrap';
import {Gear} from "react-bootstrap-icons" 


export default function Options(props){
    const [dropdownOpen, setOpen] = useState(false);

    const toggle = () => setOpen(!dropdownOpen);

    const deleteA = ()=>{
      const id = props.id
      const name = props.name
      fetch("http://localhost:4000/api/archivedel",{
        method: "DELETE",
        body: JSON.stringify({id: id,name: name}),
        headers: {
          "Content-type": "application/json"
        }
      }).then(data => data.json())
    }

    return(
        <div className="dropdown">
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle className="button-down">
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
              </DropdownMenu>
            </Dropdown>
        </div>
    )
}