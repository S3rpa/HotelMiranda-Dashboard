import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../src/interfaces/userInterfaces';
import { apiService } from '../../src/utils/apiService';

export const GetUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
  'users/getUsers',
  async (_, { rejectWithValue }) => {
    const response = await apiService<User[]>('/api/users');

    if (response.error) {
      return rejectWithValue(response.error);
    }

    return response.data!;
  }
);

export const CreateUser = createAsyncThunk<User, Omit<User, 'id'>, { rejectValue: string }>(
  'users/createUser',
  async (newUser, { rejectWithValue }) => {
    const response = await apiService<User>('/api/users', 'POST', newUser);

    if (response.error) {
      return rejectWithValue(response.error);
    }

    return response.data!;
  }
);

export const EditUser = createAsyncThunk<User, User, { rejectValue: string }>(
  'users/editUser',
  async (updatedUser, { rejectWithValue }) => {
    const response = await apiService<User>(`/api/users/${updatedUser.id}`, 'PUT', updatedUser);

    if (response.error) {
      return rejectWithValue(response.error);
    }

    return response.data!;
  }
);

export const DeleteUser = createAsyncThunk<number, number, { rejectValue: string }>(
  'users/deleteUser',
  async (userId, { rejectWithValue }) => {
    const response = await apiService<{ message: string }>(`/api/users/${userId}`, 'DELETE');

    if (response.error) {
      return rejectWithValue(response.error);
    }

    return userId;
  }
);