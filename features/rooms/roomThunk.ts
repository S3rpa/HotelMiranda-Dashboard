import { createAsyncThunk } from '@reduxjs/toolkit';
import { Room } from '../../src/interfaces/roomInterfaces';
import { apiService } from '../../src/utils/apiService';

// Obtener todas las habitaciones (GET /api/rooms)
export const GetRooms = createAsyncThunk<Room[], void, { rejectValue: string }>(
  'rooms/getRooms',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService<Room[]>('/api/rooms', 'GET');
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response.data!;
    } catch (error) {
      console.error('Error al obtener habitaciones:', error);
      return rejectWithValue('Error inesperado al obtener habitaciones');
    }
  }
);

// Crear una nueva habitación (POST /api/rooms)
export const CreateRoom = createAsyncThunk<Room, Omit<Room, '_id'>, { rejectValue: string }>(
  'rooms/createRoom',
  async (newRoom, { rejectWithValue }) => {
    try {
      const response = await apiService<Room>('/api/rooms', 'POST', newRoom);
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response.data!;
    } catch (error) {
      console.error('Error al crear la habitación:', error);
      return rejectWithValue('Error inesperado al crear la habitación');
    }
  }
);

// Actualizar una habitación por ID (PUT /api/rooms/:id)
export const EditRoom = createAsyncThunk<Room, Room, { rejectValue: string }>(
  'rooms/editRoom',
  async (updatedRoom, { rejectWithValue }) => {
    try {
      const response = await apiService<Room>(`/api/rooms/${updatedRoom._id}`, 'PUT', updatedRoom);
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response.data!;
    } catch (error) {
      console.error('Error al actualizar la habitación:', error);
      return rejectWithValue('Error inesperado al actualizar la habitación');
    }
  }
);

// Eliminar una habitación por ID (DELETE /api/rooms/:id)
export const DeleteRoom = createAsyncThunk<string, string, { rejectValue: string }>(
  'rooms/deleteRoom',
  async (_id, { rejectWithValue }) => {
    try {
      const response = await apiService<{ message: string }>(`/api/rooms/${_id}`, 'DELETE');
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return _id;
    } catch (error) {
      console.error('Error al eliminar la habitación:', error);
      return rejectWithValue('Error inesperado al eliminar la habitación');
    }
  }
);