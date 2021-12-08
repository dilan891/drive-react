import React, { } from "react";
import '@testing-library/jest-dom';
import { render,fireEvent } from "@testing-library/react";
import { UseToast } from "../../context/useToast";
import  VarMenu  from "../VarMenu"
import { UseUser } from "../../context/useUser";

const mockCaller = jest.fn()

describe("Render ", () => {//priemro el nombre de la prueba y luego las pruebas
    let html
    beforeEach(() => {html = render(<UseUser><UseToast><VarMenu caller={mockCaller} open={()=>{}}/></UseToast></UseUser>)})  //componente a renderizar
   
    it("button", () => {

        const button = html.getByText("+")
        fireEvent.click(button)

        expect(mockCaller.mock.calls).toHaveLength(1)

    })

})