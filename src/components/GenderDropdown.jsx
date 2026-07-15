import { useState } from "react";

export function GenderDropdown(props){
    const[value,setValue] = useState(props.value)

    function handleChange(e){
        setValue(e.target.value)
        props.node.setDataValue(props.colDef.field, e.target.value)
    }
    return(
        <select value={value} onChange={handleChange}>
            <option value={"Male"}>Male</option>
            <option value={"Female"}>Female</option>
        </select>
    )
}

