import { SERVICES_URL, UPLOADS_URL } from '../utils/constants.js';
import { apiSlice } from './apiSlice.js';

export const serviceSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getServices: builder.query({
            query: () => ({
                url: SERVICES_URL,
            }),
            keepUnusedDataFor: 5,
        }),
        getServiceDetails: builder.query({
            query: (serviceId) => ({
                url: `${SERVICES_URL}/${serviceId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        deleteService: builder.mutation({
            query: (serviceId) => ({
                url: `${SERVICES_URL}/${serviceId}`,
                method: 'DELETE',
            }),
            providesTags: ['Service'],
        }),
        createService: builder.mutation({
            query: () => ({
                url: `${SERVICES_URL}`,
                method: 'POST',
            }),
            invalidatesTags: ['Service'],
        }),
        updateService: builder.mutation({
            query: (data) => ({
                url: `${SERVICES_URL}/${data.editId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Service'],
        }),
        uploadServiceImage: builder.mutation({
            query: (data) => ({
                url: UPLOADS_URL,
                method: 'POST',
                body: data,
            }),
        }),
        searchServices: builder.query({
            query: ({ name }) => `${SERVICES_URL}/search/${name}`,
            providesTags: ['Service'],
        }),

    }),
});

//useGetServicesQuery bản chất nó là getServices
export const { useGetServicesQuery, useGetServiceDetailsQuery, useDeleteServiceMutation, useCreateServiceMutation, useUpdateServiceMutation, useUploadServiceImageMutation, useSearchServicesQuery } = serviceSlice;
