import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
        name: string;
        url: string;
    };
    location: {
        name: string;
        url: string;
    };
}
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'https://rickandmortyapi.com/api/'}),
    endpoints: (builder) => ({
        getAllCharacters: builder.query<Character[], void>({
            query: () => 'character',
        })
    })
});

export const {useGetAllCharactersQuery} = apiSlice;
