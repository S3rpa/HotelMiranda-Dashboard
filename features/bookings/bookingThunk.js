import { createAsyncThunk } from "@reduxjs/toolkit";
import guest from '../../src/data/guest';

export const GetBookings = createAsyncThunk(
    "bookings/getBookings",
    async () => {
        return [...guest];
    }
);

export const EditBooking = createAsyncThunk(
    "bookings/editBooking",
    async (updatedBooking, { rejectWithValue }) => {
        try {
            const index = guest.findIndex(booking => booking.id === updatedBooking.id);
            if (index !== -1) {
                const updatedGuests = [...guest];
                updatedGuests[index] = updatedBooking;
                return updatedBooking;
            } else {
                throw new Error(`Failed to update booking with id ${updatedBooking.id}`);
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const DeleteBooking = createAsyncThunk(
    "bookings/deleteBooking",
    async (bookingId, { rejectWithValue }) => {
        try {
            const index = guest.findIndex(booking => booking.id === bookingId);
            if (index !== -1) {
                const updatedGuests = guest.filter(booking => booking.id !== bookingId);
                return bookingId; 
            } else {
                throw new Error(`Failed to delete booking with id ${bookingId}`);
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const CreateBooking = createAsyncThunk(
    "bookings/createBooking",
    async (newBooking, { rejectWithValue }) => {
        try {
            const newId = guest.length ? guest[guest.length - 1].id + 1 : 1;
            const bookingToAdd = { ...newBooking, id: newId };

            const updatedGuests = [...guest, bookingToAdd];
            return bookingToAdd;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
