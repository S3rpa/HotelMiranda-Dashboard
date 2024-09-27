import { createAsyncThunk } from '@reduxjs/toolkit';
import { Room } from '../../src/interfaces/roomInterfaces';
import { apiService } from '../../src/utils/apiService';

export const GetRooms = createAsyncThunk<Room[], void, { rejectValue: string }>(
  'rooms/getRooms',
  async (_, { rejectWithValue }) => {
    const response = await apiService<Room[]>('/api/rooms');

    if (response.error) {
      return rejectWithValue(response.error);
    }

    return response.data!;
  }
);

export const CreateRoom = createAsyncThunk<Room, Omit<Room, 'id'>, { rejectValue: string }>(
  'rooms/createRoom',
  async (newRoom, { rejectWithValue }) => {
    const response = await apiService<Room>('/api/rooms', 'POST', newRoom);

    if (response.error) {
      return rejectWithValue(response.error);
    }

    return response.data!;
  }
);

export const EditRoom = createAsyncThunk<Room, Room, { rejectValue: string }>(
  'rooms/editRoom',
  async (updatedRoom, { rejectWithValue }) => {
    const response = await apiService<Room>(`/api/rooms/${updatedRoom.id}`, 'PUT', updatedRoom);

    if (response.error) {
      return rejectWithValue(response.error);
    }

    return response.data!;
  }
);

export const DeleteRoom = createAsyncThunk<number, number, { rejectValue: string }>(
  'rooms/deleteRoom',
  async (roomId, { rejectWithValue }) => {
    const response = await apiService<{ message: string }>(`/api/rooms/${roomId}`, 'DELETE');

    if (response.error) {
      return rejectWithValue(response.error);
    }

    return roomId;
  }
);