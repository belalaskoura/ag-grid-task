import {http, HttpResponse} from 'msw'
import {setupServer} from 'msw/node'

export const mockResponse =[
    {
        id: 1,
        name: "Rick Sanchez",
        status: 'Alive',
        species: 'Human',
        gender: 'Male',
        location:{name: 'Citadel of Ricks'}

    },
    {
        id: 2,
        name: "Summer Smith",
        status: "Alive",
        species: 'Human',
        gender: 'Female',
        location: {name: 'Earth (Replacement Dimension)'}
    }
]
export const apiHandler = [
    http.get('https://rickandmortyapi.com/api/character', () => {
        return HttpResponse.json({
            results: mockResponse,
            info: {count: 1, pages: 1, next: null, prev: null}
        })
    })
]

export const server = setupServer(...apiHandler)

