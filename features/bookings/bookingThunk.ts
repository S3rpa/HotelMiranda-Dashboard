import { createAsyncThunk } from '@reduxjs/toolkit';
import { Booking } from '../../src/interfaces/bookingInterfaces';
import { apiService } from '../../src/utils/apiService';
import { toast } from 'react-toastify';


export const GetBookings = createAsyncThunk<Booking[], void, { rejectValue: string }>(
  'bookings/getBookings',
  async (_, { rejectWithValue }) => {
    const response = await apiService<Booking[]>('/api/bookings', 'GET');

    if (response.error) {
      return rejectWithValue(response.error);
    }

    return response.data!;
  }
);

export const CreateBooking = createAsyncThunk<Booking, Omit<Booking, 'id'>, { rejectValue: string }>(
  'bookings/createBooking',
  async (newBooking, { rejectWithValue }) => {
    const response = await apiService<Booking>('/api/bookings', 'POST', newBooking);

    if (response.error) {
      toast.error(`Error al crear la reserva: ${response.error}`);
      return rejectWithValue(response.error);
    }
    toast.success('Reserva creada exitosamente');
    return response.data!;
  }
);

export const EditBooking = createAsyncThunk<Booking, Booking, { rejectValue: string }>(
  'bookings/editBooking',
  async (updatedBooking, { rejectWithValue }) => {
    const response = await apiService<Booking>(`/api/bookings/${updatedBooking.id}`, 'PUT', updatedBooking);

    if (response.error) {
      return rejectWithValue(response.error);
    }

    return response.data!;
  }
);

export const DeleteBooking = createAsyncThunk<number, number, { rejectValue: string }>(
  'bookings/deleteBooking',
  async (bookingId, { rejectWithValue }) => {
    const response = await apiService<{ message: string }>(`/api/bookings/${bookingId}`, 'DELETE');

    if (response.error) {
      return rejectWithValue(response.error);
    }

    return bookingId;
  }
);