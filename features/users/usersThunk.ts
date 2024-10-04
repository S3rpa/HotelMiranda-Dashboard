import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../src/interfaces/userInterfaces';
import { apiService } from '../../src/utils/apiService';

// Obtener todos los usuarios (GET /api/users)
export const GetUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
  'users/getUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService<User[]>('/api/users', 'GET');
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response.data!;
    } catch (error: any) {
      console.error('Error inesperado al obtener usuarios:', error);
      return rejectWithValue('Error inesperado al obtener usuarios');
    }
  }
);

// Crear un nuevo usuario (POST /api/users)
export const CreateUser = createAsyncThunk<User, Omit<User, '_id'>, { rejectValue: string }>(
  'users/createUser',
  async (newUser, { rejectWithValue }) => {
    try {
      const response = await apiService<User>('/api/users', 'POST', newUser);
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response.data!;
    } catch (error: any) {
      console.error('Error inesperado al crear el usuario:', error);
      return rejectWithValue('Error inesperado al crear el usuario');
    }
  }
);

// Actualizar un usuario por ID (PUT /api/users/:id)
export const EditUser = createAsyncThunk<User, User, { rejectValue: string }>(
  'users/editUser',
  async (updatedUser, { rejectWithValue }) => {
    try {
      const response = await apiService<User>(`/api/users/${updatedUser._id}`, 'PUT', updatedUser);
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response.data!;
    } catch (error: any) {
      console.error('Error inesperado al actualizar el usuario:', error);
      return rejectWithValue('Error inesperado al actualizar el usuario');
    }
  }
);

// Eliminar un usuario por ID (DELETE /api/users/:id)
export const DeleteUser = createAsyncThunk<string, string, { rejectValue: string }>(
  'users/deleteUser',
  async (_id, { rejectWithValue }) => {
    try {
      const response = await apiService<{ message: string }>(`/api/users/${_id}`, 'DELETE');

      if (response.error) {
        return rejectWithValue(response.error);
      }

      return _id;
    } catch (error: any) {
      return rejectWithValue('Error al eliminar el usuario');
    }
  }
);