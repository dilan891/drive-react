import React from "react";
import Todos from "../Todos";
import { BrowserRouter as Router } from 'react-router-dom';
import {screen,render, waitFor} from "@testing-library/react";
import renderer from "react-test-renderer";
import { UseMenuSelect } from "../../context/useMenuSelect";


beforeEach(()=>render(<Router><UseMenuSelect><Todos setID={((e)=>{console.log(e)}).bind(this)} /></UseMenuSelect></Router> ))
describe("todos menu",()=>{
    it("fetch carpeta",async()=>{ 
        await waitFor(()=>{screen.getByRole("heading")})
        expect(screen.getByRole("heading")).toHaveTextContent("juan")
    });
    it("fecth archivos",async()=>{
        await waitFor(()=> screen.getByText(/archivo1/i))
        expect(screen.getByText(/archivo1/i)).toBeInTheDocument()
    });
    it("render img",async()=>{
        await waitFor(()=>{screen.getByRole("img")})
        expect(screen.getByRole("img")).toBeInTheDocument()
    });
    it("snapshot 1",async()=>{        
        const Component = renderer.create(<Router><Todos setID={((e)=>{console.log(e)}).bind(this)} /></Router> ) 
        let tree = Component.toJSON();
        
        expect(tree).toMatchSnapshot();
    });
})
