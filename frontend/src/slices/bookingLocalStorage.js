// import { addDecimals } from '../utils/addDecimals';
import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('booking')
    ? JSON.parse(localStorage.getItem('booking'))
    : { serviceItems: [], cabin: {}, infomation: {}, paymentMethod: 'Paypal' };

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
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            localStorage.setItem('cart', JSON.stringify(state));
        },

    },
});

export const { addToCabin, addToInfomation, savePaymentMethod } = bookingSlice.actions;

export default bookingSlice.reducer;
