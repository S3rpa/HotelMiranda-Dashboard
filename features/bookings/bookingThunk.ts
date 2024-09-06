import { createAsyncThunk } from "@reduxjs/toolkit";
import { Booking } from '../../src/interfaces/bookingInterfaces';
import guest from '../../src/data/guest';

export const GetBookings = createAsyncThunk<Booking[]>(
    "bookings/getBookings",
    async () => {
        return [...guest];
    }
);

export const EditBooking = createAsyncThunk<Booking, Booking, { rejectValue: string }>(
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
            return rejectWithValue((error as Error).message);
        }
    }
);

export const DeleteBooking = createAsyncThunk<number, number, { rejectValue: string }>(
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
            return rejectWithValue((error as Error).message);
        }
    }
);

export const CreateBooking = createAsyncThunk<Booking, Omit<Booking, 'id'>, { rejectValue: string }>(
    "bookings/createBooking",
    async (newBooking, { rejectWithValue }) => {
        try {
            const newId = guest.length ? guest[guest.length - 1].id + 1 : 1;
            const bookingToAdd: Booking = { ...newBooking, id: newId };

            const updatedGuests = [...guest, bookingToAdd];
            return bookingToAdd;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);
