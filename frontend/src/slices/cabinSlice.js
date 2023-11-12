import { CABINS_URL, UPLOADS_URL } from '../utils/constants.js';
import { apiSlice } from './apiSlice.js';

export const cabinSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCabins: builder.query({
            query: () => ({
                url: CABINS_URL,
            }),
            keepUnusedDataFor: 5,
        }),
        getCabinDetails: builder.query({
            query: (cabinId) => ({
                url: `${CABINS_URL}/${cabinId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        deleteCabin: builder.mutation({
            query: (cabinId) => ({
                url: `${CABINS_URL}/${cabinId}`,
                method: 'DELETE',
            }),
            providesTags: ['Cabin'],
        }),
        createCabin: builder.mutation({
            query: () => ({
                url: `${CABINS_URL}`,
                method: 'POST',
            }),
            invalidatesTags: ['Cabin'],
        }),
        updateCabin: builder.mutation({
            query: (data) => ({
                url: `${CABINS_URL}/${data.editId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Cabin'], //From getCabins()
        }),
        uploadCabinImage: builder.mutation({
            query: (data) => ({
                url: UPLOADS_URL,
                method: 'POST',
                body: data,
            }),
        }),
        getTopCabins: builder.query({
            query: () => `${CABINS_URL}/top`,
            keepUnusedDataFor: 5,
        }),
        searchCabins: builder.query({
            query: ({ name }) => `${CABINS_URL}/search/${name}`,
            providesTags: ['Cabin'],
        }),

    }),
});

//useGetCabinsQuery bản chất nó là getCabins
export const { useGetCabinsQuery, useGetCabinDetailsQuery, useDeleteCabinMutation, useCreateCabinMutation, useUpdateCabinMutation, useUploadCabinImageMutation, useGetTopCabinsQuery, useSearchCabinsQuery } = cabinSlice;
