import React from "react";
import Nav from "../Nav"
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import {screen,render} from "@testing-library/react"

beforeEach(()=>render(<Router><Nav /></Router> ))  //componente a renderizar
describe("todosPage", ()=> {//priemro el nombre de la prueba y luego las pruebas
    it("display todos page",()=>{
        expect(screen.queryByText(/Todos/i)).toBeInTheDocument()
    })
    it("display title",()=>{
        expect(screen.queryByText(/Dilan891/i)).toBeInTheDocument()
    })
})  

