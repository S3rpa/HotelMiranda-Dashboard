import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetBookings, EditBooking, DeleteBooking, CreateBooking } from './bookingThunk';
import { Booking, BookingsState } from '../../src/interfaces/bookingInterfaces';

const initialState: BookingsState = {
    data: [],
    status: 'idle',
    error: null,
};

const bookingsSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetBookings.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(GetBookings.fulfilled, (state, action: PayloadAction<Booking[]>) => {
                state.status = 'fulfilled';
                state.data = action.payload;
            })
            .addCase(GetBookings.rejected, (state, action: PayloadAction<any>) => {
                state.status = 'rejected';
                state.error = action.payload || 'Failed to fetch bookings';
            })
            .addCase(EditBooking.fulfilled, (state, action: PayloadAction<Booking>) => {
                state.data = state.data.map(booking =>
                    booking.id === action.payload.id ? { ...action.payload } : { ...booking }
                );
            })
            .addCase(DeleteBooking.fulfilled, (state, action: PayloadAction<number>) => {
                state.data = state.data.filter(booking => booking.id !== action.payload);
            })
            .addCase(CreateBooking.fulfilled, (state, action: PayloadAction<Booking>) => {
                state.data = [...state.data, action.payload];
                console.log('New booking added:', action.payload);
            });
    },
});

export default bookingsSlice.reducer;
