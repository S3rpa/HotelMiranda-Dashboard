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
      // GetBookings
      .addCase(GetBookings.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(GetBookings.fulfilled, (state, action: PayloadAction<Booking[]>) => {
        state.status = 'fulfilled';
        state.data = action.payload;
      })
      .addCase(GetBookings.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || 'Failed to fetch bookings';
      })
      // CreateBooking
      .addCase(CreateBooking.fulfilled, (state, action: PayloadAction<Booking>) => {
        state.data.push(action.payload);
      })
      .addCase(CreateBooking.rejected, (state, action) => {
        state.error = action.payload || 'Failed to create booking';
      })
      // EditBooking
      .addCase(EditBooking.fulfilled, (state, action: PayloadAction<Booking>) => {
        state.data = state.data.map(booking =>
          booking.id === action.payload.id ? action.payload : booking
        );
      })
      .addCase(EditBooking.rejected, (state, action) => {
        state.error = action.payload || 'Failed to edit booking';
      })
      // DeleteBooking
      .addCase(DeleteBooking.fulfilled, (state, action: PayloadAction<number>) => {
        state.data = state.data.filter(booking => booking.id !== action.payload);
      })
      .addCase(DeleteBooking.rejected, (state, action) => {
        state.error = action.payload || 'Failed to delete booking';
      });
  },
});

export default bookingsSlice.reducer;