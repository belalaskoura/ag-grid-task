// Necessary imports for ag-grid
import {AgGridProvider, AgGridReact} from 'ag-grid-react';
import { AllCommunityModule } from 'ag-grid-community';
import { themeBalham } from 'ag-grid-community';
import { useEffect, useState } from 'react';
import {GenderDropdown} from './components/GenderDropdown'
import './App.css'

const modules = [AllCommunityModule];
// Editable column logic
let editableGender = "Male";
function isEditable(params){
  return params.data.gender === editableGender;
}

function App(){
  // State to hold the row data fetched from the API
  const [rowData, setRowData] = useState([]);
  // Grid options including column definitions and types
  const gridOptions = {
  colData:[
    {field: 'id', headerName:'ID',sortable: true}, // Column for ID with sorting enabled
    {field: 'name', headerName:'Name',filter:true, editable: true}, // Column for Name with filtering and editing enabled
    {field: 'status', headerName:'Status',editable: true, cellEditor: 'agSelectCellEditor', cellEditorParams: {values: ['Dead','Alive','Unknown']}}, // Column for Status with editing enabled and a dropdown editor
    {field: 'species', headerName:'Species'}, // Column for Species
    {field: 'gender', headerName:'Gender', editable: true, cellEditor: GenderDropdown }, // Column for Gender with editing enabled
    {field: 'origin.name', headerName:'Origin'}, // Column for Origin
    {field: 'location.name', headerName:'Current Location',type: "editableColumn"} // Column for Current Location with custom editable logic
    ],
    // Custom column types to handle editable logic and styling
    columnTypes:{
      editableColumn:{
        editable: (params) => {
          return isEditable(params) // Check if the cell is editable based on the gender
        },
        cellStyle: (params) => {
          if(!isEditable(params)){
            return {backgroundColor: '#000000', color: '#ffffff'} // Style for non-editable cells
          }
        }
      }
    }

  }
  // Fetching data from the Rick and Morty API and setting it to the rowData state
  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
    .then(res => res.json())
    .then(data => {
      console.log(data)
      return setRowData(data.results)})
  }, [])

  return(
    <AgGridProvider modules={modules}>
      <div style={{height: 500}}>
        <AgGridReact 
          theme = {themeBalham}
          rowData = {rowData}
          columnDefs = {gridOptions.colData}
          columnTypes={gridOptions.columnTypes}>
        </AgGridReact>
      </div>
    </AgGridProvider>
  )
}

export default App;