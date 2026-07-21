import { configureStore } from "@reduxjs/toolkit";
import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import { apiSlice } from "./apiSlice";
import { mockResponse, server } from "./apiHandler";

beforeAll(() => server.listen()); // Turn msw on before each test
afterEach(() => server.resetHandlers()); // Wipe mocks between tests
afterAll(() => server.close()); // Turn msw off after test
// Redux store for RTK query endpoint to work
const store = configureStore({
    reducer: {[apiSlice.reducerPath]: apiSlice.reducer},
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(apiSlice.middleware)
})
// Actual Test
describe('apiSlice', () => {
    it("fetches charcaters correctly", async () => {
        const result =  await store.dispatch(apiSlice.endpoints.getAllCharacters.initiate())
        expect(result.data).toEqual(mockResponse)
    })
})
