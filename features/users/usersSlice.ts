import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetUsers, EditUser, DeleteUser, CreateUser } from './usersThunk';
import { User, UsersState } from '../../src/interfaces/userInterfaces';

const initialState: UsersState = {
  data: [],
  status: 'idle',
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GetUsers
      .addCase(GetUsers.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(GetUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = 'fulfilled';
        state.data = action.payload;
      })
      .addCase(GetUsers.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || 'Failed to fetch users';
      })
      // CreateUser
      .addCase(CreateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.data.push(action.payload);
      })
      .addCase(CreateUser.rejected, (state, action) => {
        state.error = action.payload || 'Failed to create user';
      })
      // EditUser
      .addCase(EditUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.data = state.data.map(user =>
          user.id === action.payload.id ? action.payload : user
        );
      })
      .addCase(EditUser.rejected, (state, action) => {
        state.error = action.payload || 'Failed to edit user';
      })
      // DeleteUser
      .addCase(DeleteUser.fulfilled, (state, action: PayloadAction<number>) => {
        state.data = state.data.filter(user => user.id !== action.payload);
      })
      .addCase(DeleteUser.rejected, (state, action) => {
        state.error = action.payload || 'Failed to delete user';
      });
  },
});

export default usersSlice.reducer;