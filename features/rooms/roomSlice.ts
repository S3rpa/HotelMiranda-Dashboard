import { createSlice } from '@reduxjs/toolkit'
import { GetRooms, EditRoom, DeleteRoom, CreateRoom } from './roomThunk'
import { RoomState } from '../../src/interfaces/roomInterfaces'

const initialState: RoomState = {
    data: [],
    status: 'idle',
    error: null,
}

const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetRooms.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(GetRooms.fulfilled, (state, action) => {
                state.status = 'fulfilled'
                state.data = action.payload
            })
            .addCase(GetRooms.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.error.message || 'Failed to fetch rooms'
            })
            .addCase(DeleteRoom.fulfilled, (state, action) => {
                state.data = state.data.filter(room => room.id !== action.payload)
            })
            .addCase(EditRoom.fulfilled, (state, action) => {
                state.data = state.data.map(room =>
                    room.id === action.payload.id ? action.payload : room
                )
            })
            .addCase(CreateRoom.fulfilled, (state, action) => {
                state.data.push(action.payload)
            })
    },
})

export default roomsSlice.reducer
