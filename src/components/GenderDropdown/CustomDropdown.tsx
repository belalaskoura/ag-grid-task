import { useState } from "react";
import "./CustomDropdown.css";
// Custom dropdown component for gender selection in the ag-grid
export function CustomDropdown(props: any){
    const[value,setValue] = useState(props.value)
    // Function to handle changes in the dropdown selection
    function handleChange(e: React.ChangeEvent<HTMLSelectElement>){
        setValue(e.target.value)
        props.node.setDataValue(props.colDef.field, e.target.value) // Update the grid data with the new value
    }
    return(
        <select value={value} onChange={handleChange}>
            {props.values.map((item: string) =>(
                <option value={item} key={item}>{item}</option>
            ) )}
        </select>
    )
}

