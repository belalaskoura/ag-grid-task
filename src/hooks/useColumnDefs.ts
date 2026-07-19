import { Character } from "../features/apiSlice";
import {ColDef} from "ag-grid-community"
import { GenderDropdown } from "../components/GenderDropdown/GenderDropdown";

// Editable column logic
const editableGender = "Male";
function isEditable(params: {data: Character}){
  return params.data.gender === editableGender;
}

export function useColumnDefs(){

  // Grid options including column definitions and types  
  const colData: ColDef<Character>[] = [
    {field: 'id', headerName:'ID',sortable: true},
    {field: 'name', headerName:'Name', editable: true},
    {field: 'status', headerName:'Status',filter: 'agSetColumnFilter',editable: true, cellEditor: 'agSelectCellEditor', cellEditorParams: {values: ['Dead','Alive','Unknown']},filterParams:{values : ['Dead' , 'Alive', 'unknown']}}, 
    {field: 'species', headerName:'Species'}, 
    {field: 'gender', headerName:'Gender', editable: true, cellEditor: GenderDropdown, filter: 'agSetColumnFilter', filterParams: {values: ['Male','Female']}, cellClass: 'gender-dropdown' }, 
    {field: 'location.name', headerName:'Current Location',type: "specialColumn"} 
    ]

    // Custom column types to handle editable logic and styling
    const columnTypes: any = {
      specialColumn:{
        editable: (params: {data: Character}) => {
          return isEditable(params) 
        },
        cellStyle: (params: {data: Character}) => {
          if(!isEditable(params)){
            return {backgroundColor: '#000000', color: '#ffffff'} // Style for non-editable cells
          }
        }
      }
    }

    const defaultColDef: ColDef<Character> = {
        filter: true,
    }
  return {colData, columnTypes, defaultColDef};
}