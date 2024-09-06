import { createSlice } from '@reduxjs/toolkit'
import { GetUsers, EditUser, DeleteUser, CreateUser } from './usersThunk'
import { UsersState } from '../../src/interfaces/userInterfaces'

const initialState: UsersState = {
    data: [],
    status: 'idle',
    error: null,
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetUsers.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(GetUsers.fulfilled, (state, action) => {
                state.status = 'fulfilled'
                state.data = action.payload
            })
            .addCase(GetUsers.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.error.message || 'Failed to fetch users'
            })
            .addCase(EditUser.fulfilled, (state, action) => {
                state.data = state.data.map(user =>
                    user.id === action.payload.id ? action.payload : user
                )
            })
            .addCase(DeleteUser.fulfilled, (state, action) => {
                state.data = state.data.filter(user => user.id !== action.payload)
            })
            .addCase(CreateUser.fulfilled, (state, action) => {
                state.data.push(action.payload)
            })
    },
})

export default usersSlice.reducer