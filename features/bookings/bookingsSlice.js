// features/bookings/bookingsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { GetBookings, EditBooking, DeleteBooking, CreateBooking } from './bookingThunk';

const bookingsSlice = createSlice({
    name: 'bookings',
    initialState: {
        data: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetBookings.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(GetBookings.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(GetBookings.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(EditBooking.fulfilled, (state, action) => {
                state.data = state.data.map(booking =>
                    booking.id === action.payload.id ? action.payload : booking
                );
            })
            .addCase(DeleteBooking.fulfilled, (state, action) => {
                state.data = state.data.filter(booking => booking.id !== action.payload);
            })
            .addCase(CreateBooking.fulfilled, (state, action) => {
                state.data.push(action.payload);
            });
    },
});

export default bookingsSlice.reducer;
