import { addDecimals } from '../utils/addDecimals';
import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('booking')
    ? JSON.parse(localStorage.getItem('booking'))
    : { serviceItems: [], cabin: {}, infomation: {}, paymentMethod: 'PayPal' };

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        addToCabin: (state, action) => {
            state.cabin = action.payload;
            // Save to localStorage
            localStorage.setItem('booking', JSON.stringify(state));
        },
        addToInfomation: (state, action) => {
            state.infomation = action.payload;
            // Save to localStorage
            localStorage.setItem('booking', JSON.stringify(state));
        },
        addToServices: (state, action) => {
            // The service to add to the cart
            const service = action.payload;

            // Add new service to serviceItems
            state.serviceItems = [...state.serviceItems, service];

            // Calculate the services price
            state.servicesPrice = addDecimals(
                state.serviceItems.reduce((acc, service) => acc + (service.regularPrice - service.discount), 0)
            );

            // Save to localStorage
            localStorage.setItem('booking', JSON.stringify(state));
        },
        removeService: (state, action) => {
            // Filter out the item to remove from the cart
            state.serviceItems = state.serviceItems.filter((x) => x._id !== action.payload);

            // Calculate the services price
            state.servicesPrice = addDecimals(
                state.serviceItems.reduce((acc, service) => acc + (service.regularPrice - service.discount), 0)
            );


            // Save the cart to localStorage
            localStorage.setItem('booking', JSON.stringify(state));
        },

        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            localStorage.setItem('booking', JSON.stringify(state));
        },

        clearServiceItems: (state, action) => {
            state.serviceItems = [];
            state.servicesPrice = 0;
            localStorage.setItem('booking', JSON.stringify(state));
        },


    },
});

export const { addToCabin, addToInfomation, savePaymentMethod, addToServices, removeService, clearServiceItems } = bookingSlice.actions;

export default bookingSlice.reducer;
