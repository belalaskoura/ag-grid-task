import { AgGridProvider, AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, CellValueChangedEvent, ValidationModule, CellMouseOverEvent, CellMouseOutEvent } from 'ag-grid-community';
import { SetFilterModule } from 'ag-grid-enterprise';
import { AllEnterpriseModule } from 'ag-grid-enterprise';
import { themeBalham } from 'ag-grid-community';
import { useEffect, useRef, useState } from 'react';
import { useGetAllCharactersQuery, Character } from '../../features/apiSlice';
import { isEditable, useColumnDefs } from '../../hooks/useColumnDefs';

const modules = [AllCommunityModule, ValidationModule, SetFilterModule, AllEnterpriseModule];

// Function to handle cell value changes, specifically for the 'gender' field
export function onCellValueChanged(params: CellValueChangedEvent<Character>) {
  if (params.colDef.field === 'gender') {
    params.api.refreshCells(
        { 
            rowNodes: [params.node], 
            columns: ['location.name'], 
            force: true });
  }
}

export function CharacterGrid() {
  const ref = useRef<AgGridReact<Character>>(null);
  const { colData, columnTypes, defaultColDef } = useColumnDefs();
  const [gridReady, setGridReady] = useState(false);
  const [warningVisible, setWarningVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { data, isError, isLoading } = useGetAllCharactersQuery();

  useEffect(() => {
    if (data && gridReady && ref.current?.api) {
      ref.current.api.setGridOption('rowData', structuredClone(data));
    }
  }, [data, gridReady]);

  // Continuously tracks mouse movements to make the tooltip fluidly follow the cursor
  useEffect(() => {
    if (!warningVisible) return;

    function handleMouseMove(e: MouseEvent) {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [warningVisible]);

  // Triggers when mouse cursor moves onto a cell
  function onCellMouseOver(params: CellMouseOverEvent<Character>) {
    if (params.colDef.field === 'location.name' && !isEditable({ data: params.data as Character })) {
      const mouseEvent = params.event as MouseEvent;
      setMousePosition({ x: mouseEvent.clientX, y: mouseEvent.clientY });
      setWarningVisible(true);
    }
  }

  // Triggers when mouse cursor exits a cell
  function onCellMouseOut(params: CellMouseOutEvent<Character>) {
    if (params.colDef.field === 'location.name') {
      setWarningVisible(false);
    }
  }

  return (
    <AgGridProvider modules={modules}>
      <div style={{ height: 500, position: 'relative' }}>
        {isLoading && <p>Loading Characters....</p>}
        {isError && <p role="alert">Failed to Load Characters</p>}
        
        {warningVisible && (
          <div className="warning"
            style={{
              top: mousePosition.y - 35, 
              left: mousePosition.x + 15, 
              position: 'fixed',
              pointerEvents: 'none',
              zIndex: 1, 
              backgroundColor: '#303234',
              fontWeight: 'bold',
              fontFamily: 'Arial, sans-serif',
              color: '#ffffff',
              padding: '6px 10px',
              borderRadius: '4px',
              fontSize: '12px'
            }}>
            Location cannot be edited for Female characters
          </div>
        )}

        <AgGridReact<Character>
          ref={ref}
          onGridReady={() => setGridReady(true)}
          theme={themeBalham}
          columnDefs={colData}
          columnTypes={columnTypes}
          defaultColDef={defaultColDef}
          onCellValueChanged={onCellValueChanged}
          onCellMouseOver={onCellMouseOver}
          onCellMouseOut={onCellMouseOut}
        />
      </div>
    </AgGridProvider>
  );
}

export default CharacterGrid;
