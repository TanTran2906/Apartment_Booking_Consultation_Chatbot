import { CABINS_URL } from '../utils/constants.js';
import { apiSlice } from './apiSlice';

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
            query: (data) => ({
                url: `${CABINS_URL}`,
                method: 'POST',
                body: { ...data },
            }),
            invalidatesTags: ['Cabin'],
        }),


    }),
});

//useGetCabinsQuery bản chất nó là getCabins
export const { useGetCabinsQuery, useGetCabinDetailsQuery, useDeleteCabinMutation, useCreateCabinMutation } = cabinSlice;
