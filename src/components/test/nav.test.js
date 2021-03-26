import React from "react";
import Nav from "../Nav"
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import {screen,render} from "@testing-library/react"
import renderer from "react-test-renderer"
import { UseMenuSelect } from "../../context/useMenuSelect";

beforeEach(()=>render(<Router><UseMenuSelect><Nav /></UseMenuSelect></Router> ))  //componente a renderizar
describe("NavPage", ()=> {//priemro el nombre de la prueba y luego las pruebas
    it("display todos page",()=>{
        expect(screen.queryByText(/Todos/i)).toBeInTheDocument()
    })
    it("display name user",()=>{
        expect(screen.queryByText(/Dilan891/i)).toBeInTheDocument()
    })
    it("snapshot nav",()=>{
        const Component = renderer.create(<Router><Nav /></Router> ) 
        let tree = Component.toJSON();
        
        expect(tree).toMatchSnapshot();
    })
})  

