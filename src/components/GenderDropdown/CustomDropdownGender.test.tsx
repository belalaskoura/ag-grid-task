import {render, screen} from '@testing-library/react'
import { CustomDropdown } from "./CustomDropdown";
import {describe, it, expect, vi} from 'vitest'
import "@testing-library/jest-dom/vitest";
import userEvent from '@testing-library/user-event'

describe("CustomDropdown", () => {
    const genderProps = {
        value: "Male",
        values: ["Male","Female"],
        colDef: {field: 'gender'},
        node: {setDataValue: vi.fn()}

    }
    it("Renders all given options ", ()=>{
        render(<CustomDropdown {...genderProps}/>)
        expect(screen.getByRole('option', {name: 'Male'})).toBeInTheDocument()
        expect(screen.getByRole('option', {name: 'Female'})).toBeInTheDocument()
    });

    it("Shows initial value as selected",()=> {
        render(<CustomDropdown {...genderProps}/>)
        expect(screen.getByRole('combobox')).toHaveValue('Male')
    })

    it("Changes value from male to female when prompted", async ()=> {
        const user = userEvent.setup();
        render(<CustomDropdown {...genderProps}/>)
        expect(screen.getByRole('combobox')).toHaveValue('Male')
        await user.selectOptions(screen.getByRole('combobox'),'Female')
        expect(screen.getByRole('combobox')).toHaveValue('Female')
        expect(genderProps.node.setDataValue).toHaveBeenCalledWith('gender','Female')

    })
})