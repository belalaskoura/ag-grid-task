import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
    origin: {
        name: string};
    location: {
        name: string
    };
}
export interface ApiResponse {
    results: Character[];
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    };
}
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'https://rickandmortyapi.com/api/'}),
    endpoints: (builder) => ({
        getAllCharacters: builder.query<Character[], void>({
            query: () => 'character',
            transformResponse: (response: ApiResponse ) => response.results
        }),
    })
});

export const {useGetAllCharactersQuery} = apiSlice;
