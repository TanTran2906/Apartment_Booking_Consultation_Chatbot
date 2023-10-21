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
        getBookingDetails: builder.query({
            query: (bookingId) => ({
                url: `${BOOKINGS_URL}/${bookingId}`,
            }),
            invalidatesTags: ['Booking'],
        }),
    }),
})

export const { useGetBookingsQuery, useGetBookingDetailsQuery } = bookingSlice