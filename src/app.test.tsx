import {onCellValueChanged} from './App';
import { CellValueChangedEvent} from 'ag-grid-community';
import {it,describe,expect,vi} from 'vitest';
import { Character } from './features/apiSlice';

// Helper Function that creates fake AG grid event that only returns the paramters used in onCellValueChanged
function functionParams(field: string): CellValueChangedEvent<Character>{
    return{
        colDef: {field},
        node: {id: '1'},
        api: {refreshCells: vi.fn()}
    } as unknown as CellValueChangedEvent<Character>

}

describe("onCellValueChanged", () => {

    it("refreshes location cell when gender changes",() => {
        const params = functionParams('gender')

        onCellValueChanged(params);

        expect(params.api.refreshCells).toHaveBeenCalledWith({
            rowNodes: [params.node],
            columns: ['location.name'],
            force: true
        })

    })

    it("doesn't do anything when other columns change",() => {

        const params = functionParams('id')

        onCellValueChanged(params)

        expect(params.api.refreshCells).not.toHaveBeenCalled()

    })
})
