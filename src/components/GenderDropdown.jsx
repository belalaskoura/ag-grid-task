import { useState } from "react";
// Custom dropdown component for gender selection in the ag-grid
export function GenderDropdown(props){
    const[value,setValue] = useState(props.value)
    // Function to handle changes in the dropdown selection
    function handleChange(e){
        setValue(e.target.value)
        props.node.setDataValue(props.colDef.field, e.target.value) // Update the grid data with the new value
    }
    return(
        <select value={value} onChange={handleChange}>
            <option value={"Male"}>Male</option>
            <option value={"Female"}>Female</option>
        </select>
    )
}

