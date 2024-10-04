import { createAsyncThunk } from '@reduxjs/toolkit';
import { Booking } from '../../src/interfaces/bookingInterfaces';
import { apiService } from '../../src/utils/apiService';

// Obtener todas las reservas (GET /api/bookings)
export const GetBookings = createAsyncThunk<Booking[], void, { rejectValue: string }>(
  'bookings/getBookings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService<Booking[]>('/api/bookings', 'GET');
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response.data!;
    } catch (error) {
      console.error('Error inesperado al obtener reservas:', error);
      return rejectWithValue('Error inesperado al obtener reservas');
    }
  }
);

// Crear una nueva reserva (POST /api/bookings)
export const CreateBooking = createAsyncThunk<Booking, Omit<Booking, 'id'>, { rejectValue: string }>(
  'bookings/createBooking',
  async (newBooking, { rejectWithValue }) => {
    try {
      const response = await apiService<Booking>('/api/bookings', 'POST', newBooking);
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response.data!;
    } catch (error) {
      console.error('Error inesperado al crear la reserva:', error);
      return rejectWithValue('Error inesperado al crear la reserva');
    }
  }
);

// Actualizar una reserva por ID (PUT /api/bookings/:id)
export const EditBooking = createAsyncThunk<Booking, Booking, { rejectValue: string }>(
  'bookings/editBooking',
  async (updatedBooking, { rejectWithValue }) => {
    try {
      const response = await apiService<Booking>(`/api/bookings/${updatedBooking._id}`, 'PUT', updatedBooking);
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response.data!;
    } catch (error) {
      console.error('Error inesperado al actualizar la reserva:', error);
      return rejectWithValue('Error inesperado al actualizar la reserva');
    }
  }
);

// Eliminar una reserva por _id (DELETE /api/bookings/:_id)
export const DeleteBooking = createAsyncThunk<string, string, { rejectValue: string }>(
  'bookings/deleteBooking',
  async (_id, { rejectWithValue }) => {
    try {
      const response = await apiService<{ message: string }>(`/api/bookings/${_id}`, 'DELETE');
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return _id;
    } catch (error) {
      console.error('Error inesperado al eliminar la reserva:', error);
      return rejectWithValue('Error al eliminar la reserva');
    }
  }
);