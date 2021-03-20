import React from "react";
import {screen,render, waitFor} from "@testing-library/react"
import Article from "../article"
import { BrowserRouter as Router } from 'react-router-dom';

beforeEach(()=>render(<Router><Article /></Router> ))
describe("article component",()=>{
    it("button cancel",()=>{
        expect(screen.getByText(/cancelar/i)).toHaveClass("upload-button")
    });
});

