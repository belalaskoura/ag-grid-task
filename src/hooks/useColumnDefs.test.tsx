import { useColumnDefs, isEditable } from './useColumnDefs'
import {describe, it, expect, vi} from 'vitest'
import "@testing-library/jest-dom/vitest";
import { Character } from '../features/apiSlice';


describe('useColumnDefs', () => {
    it("Returns column definitions for all expected fields", () => {
        const {colData} = useColumnDefs()
        const fields = colData.map((col) => col.field);
        expect(fields).toEqual(['id','name','status','species','gender','location.name'])
    })

    it("Sets Filter property by default on all columns", () => {
        const {defaultColDef} = useColumnDefs()
        expect(defaultColDef).toEqual({filter: true})
    } )
})
// Testing special column
describe('Special Column used by Location', () => {
    it("Is editable when gender = Male", () => {
        const {columnTypes} = useColumnDefs();
        const params = {data: {gender: 'Male'}}
        expect(columnTypes.specialColumn.editable(params)).toBe(true);
    })

    it("Is not editable when gender = Female", () => {
        const {columnTypes} = useColumnDefs();
        const params = {data: {gender: 'Female'}}
        expect(columnTypes.specialColumn.editable(params)).toBe(false);
    })

    it("Applies black backgrond styling when it isn't editable", () => {
        const {columnTypes} = useColumnDefs();
        const params = {data: {gender: 'Female'}}
        expect(columnTypes.specialColumn.cellStyle(params)).toEqual({
            backgroundColor: '#000000', color: '#ffffff'
        })
    })

    it("No special styling is applied when editable", ()=> {
        const {columnTypes} = useColumnDefs();
        const params = {data: {gender: 'Male'}};
        expect(columnTypes.specialColumn.cellStyle(params)).toEqual({})
    })
})

// Testing isEditable
describe("isEditable", ()=>{
    it("returns true when gender is Male", () => {
        expect(isEditable({data:  {gender: 'Male'} as Character})).toBe(true)
    });

    it("returns false when gender is Female", () => {
        expect(isEditable({data:  {gender: 'Female'} as Character})).toBe(false)
    });
})