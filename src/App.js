import {AgGridProvider, AgGridReact} from 'ag-grid-react';
import { AllCommunityModule } from 'ag-grid-community';
import { themeBalham } from 'ag-grid-community';
import { useEffect, useState } from 'react';
import {GenderDropdown} from './components/GenderDropdown'
import './App.css'
// Tagroba kda
const modules = [AllCommunityModule];

let editableGender = "Male";
function isEditable(params){
  return params.data.gender == editableGender;
}

function App(){
  const [rowData, setRowData] = useState([]);
  
  const gridOptions = {
  colData:
    [
    {field: 'id', headerName:'ID',sortable: true},
    {field: 'name', headerName:'Name',filter:true, editable: true},
    {field: 'status', headerName:'Status',editable: true, cellEditor: 'agSelectCellEditor', cellEditorParams: {values: ['Dead','Alive','Unknown']}},
    {field: 'species', headerName:'Species'},
    {field: 'gender', headerName:'Gender', editable: true, cellEditor: GenderDropdown },
    {field: 'origin.name', headerName:'Origin'},
    {field: 'location.name', headerName:'Current Location',type: "editableColumn"}
    ],

    columnTypes:{
      editableColumn:{
        editable: (params) => {
          return isEditable(params)
        },
        cellStyle: (params) => {
          if(!isEditable(params)){
            return {backgroundColor: '#000000', color: '#ffffff'}
          }
        }
      }
    }

  }

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
    .then(res => res.json())
    .then(data => {
      console.log(data)
      return setRowData(data.results)})
  }, [])
    console.log("Ana el asad aho" + rowData);
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