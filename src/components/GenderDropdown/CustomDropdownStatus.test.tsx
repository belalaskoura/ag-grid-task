import React, { use } from "react";
import {render, screen} from '@testing-library/react'
import { CustomDropdown } from "./CustomDropdown";
import {describe, it, expect, vi} from 'vitest'
import "@testing-library/jest-dom/vitest";
import userEvent from '@testing-library/user-event'

describe("CustomDropdown", () => {
    const statusProps = {
        value: "Alive",
        values: ["Alive","Dead","Unknown"],
        colDef: {field: 'status'},
        node: {setDataValue: vi.fn()}

    }
    it("Renders all given options ", ()=>{
        render(<CustomDropdown {...statusProps}/>)
        expect(screen.getByRole('option', {name: 'Alive'})).toBeInTheDocument()
        expect(screen.getByRole('option', {name: 'Dead'})).toBeInTheDocument()
        expect(screen.getByRole('option', {name: 'Unknown'})).toBeInTheDocument()

    });

    it("Shows initial value as selected",()=> {
        render(<CustomDropdown {...statusProps}/>)
        expect(screen.getByRole('combobox')).toHaveValue('Alive')
    })

    it("Changes value from Alive to Dead when prompted", async ()=> {
        const user = userEvent.setup();
        render(<CustomDropdown {...statusProps}/>)
        expect(screen.getByRole('combobox')).toHaveValue('Alive')
        await user.selectOptions(screen.getByRole('combobox'),'Dead')
        expect(screen.getByRole('combobox')).toHaveValue('Dead')
        expect(statusProps.node.setDataValue).toHaveBeenCalledWith('status','Dead')

    })

    
})