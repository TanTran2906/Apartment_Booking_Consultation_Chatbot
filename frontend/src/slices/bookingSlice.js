import { BOOKINGS_URL } from '../utils/constants.js';
import { apiSlice } from './apiSlice.js';

export const bookingSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBookings: builder.query({
            query: () => ({
                url: BOOKINGS_URL,
            }),
            keepUnusedDataFor: 5,
        }),
    }),
})

export const { useGetBookingsQuery } = bookingSlice