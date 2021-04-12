import React, { } from "react";
import '@testing-library/jest-dom';
import { render,fireEvent } from "@testing-library/react";
import { UseToast } from "../../context/useToast";
import  VarMenu  from "../VarMenu"

const mockCaller = jest.fn()

describe("Render ", () => {//priemro el nombre de la prueba y luego las pruebas
    let html
    beforeEach(() => {html = render(<UseToast><VarMenu caller={mockCaller} open={()=>{}}/></UseToast>)})  //componente a renderizar
   
    it("button", () => {

        const button = html.getByText("+")
        fireEvent.click(button)

        expect(mockCaller.mock.calls).toHaveLength(1)

    })

})