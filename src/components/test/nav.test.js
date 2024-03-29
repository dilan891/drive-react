import React, { } from "react";
import Nav from "../nav/Nav";
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import { UseMenuSelect } from "../../context/useMenuSelect";
import { UseToast } from "../../context/useToast";
import { UseUser } from "../../context/useUser";

const html = (<UseUser><Router><UseMenuSelect><UseToast><Nav /></UseToast></UseMenuSelect></Router></UseUser>)

describe("Render NavPage", () => {//priemro el nombre de la prueba y luego las pruebas
    //beforeEach(() => render(componente))  //componente a renderizar
    it("render componet", () => {

        const componente = render(html);

        expect(componente.container).toHaveTextContent("Todos")
        expect(componente.container).toHaveTextContent("none")
        componente.getByText("Carpetas")
    })

    it("snapshot nav", () => {
        const Component = renderer.create(html)
        let tree = Component.toJSON();
        expect(tree).toMatchSnapshot();
    })
})

