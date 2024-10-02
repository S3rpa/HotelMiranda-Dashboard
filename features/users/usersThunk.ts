import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../src/interfaces/userInterfaces';
import { apiService } from '../../src/utils/apiService';

export const GetUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
  'users/getUsers',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Intentando obtener usuarios...');
      const response = await apiService<User[]>('/users', 'GET');

      if (response.error) {
        console.error('Error al obtener usuarios:', response.error);
        return rejectWithValue(response.error);
      }

      return response.data!;

    } catch (error: any) {
      console.error('Error inesperado al obtener usuarios:', error);
      return rejectWithValue('Error inesperado al obtener usuarios');
    }
  }
);

export const CreateUser = createAsyncThunk<User, Omit<User, 'id'>, { rejectValue: string }>(
  'users/createUser',
  async (newUser, { rejectWithValue }) => {
    try {
      const response = await apiService<User>('/users', 'POST', newUser);

      if (response.error) {
        console.error('Error al crear el usuario:', response.error);
        return rejectWithValue(response.error);
      }

      return response.data!;
    } catch (error: any) {
      console.error('Error inesperado al crear el usuario:', error);
      return rejectWithValue('Error al crear el usuario');
    }
  }
);

export const EditUser = createAsyncThunk<User, User, { rejectValue: string }>(
  'users/editUser',
  async (updatedUser, { rejectWithValue }) => {
    try {
      const response = await apiService<User>(`/users/${updatedUser.id}`, 'PUT', updatedUser);
      if (response.error) {
        console.error('Error al actualizar el usuario:', response.error);
        return rejectWithValue(response.error);
      }

      return response.data!;
    } catch (error: any) {
      console.error('Error inesperado al actualizar el usuario:', error);
      return rejectWithValue('Error al actualizar el usuario');
    }
  }
);

export const DeleteUser = createAsyncThunk<number, number, { rejectValue: string }>(
  'users/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await apiService<{ message: string }>(`/users/${userId}`, 'DELETE');
      if (response.error) {
        console.error('Error al eliminar el usuario:', response.error);
        return rejectWithValue(response.error);
      }

      return userId;
    } catch (error: any) {
      console.error('Error inesperado al eliminar el usuario:', error);
      return rejectWithValue('Error al eliminar el usuario');
    }
  }
);