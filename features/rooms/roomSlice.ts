import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetRooms, EditRoom, DeleteRoom, CreateRoom } from './roomThunk';
import { Room, RoomState } from '../../src/interfaces/roomInterfaces';

const initialState: RoomState = {
  data: [],
  status: 'idle',
  error: null,
};

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GetRooms
      .addCase(GetRooms.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(GetRooms.fulfilled, (state, action: PayloadAction<Room[]>) => {
        state.status = 'fulfilled';
        state.data = action.payload;
      })
      .addCase(GetRooms.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || 'Failed to fetch rooms';
      })
      // CreateRoom
      .addCase(CreateRoom.fulfilled, (state, action: PayloadAction<Room>) => {
        state.data.push(action.payload);
      })
      .addCase(CreateRoom.rejected, (state, action) => {
        state.error = action.payload || 'Failed to create room';
      })
      // EditRoom
      .addCase(EditRoom.fulfilled, (state, action: PayloadAction<Room>) => {
        state.data = state.data.map(room =>
          room.id === action.payload.id ? action.payload : room
        );
      })
      .addCase(EditRoom.rejected, (state, action) => {
        state.error = action.payload || 'Failed to edit room';
      })
      // DeleteRoom
      .addCase(DeleteRoom.fulfilled, (state, action: PayloadAction<number>) => {
        state.data = state.data.filter(room => room.id !== action.payload);
      })
      .addCase(DeleteRoom.rejected, (state, action) => {
        state.error = action.payload || 'Failed to delete room';
      });
  },
});

export default roomsSlice.reducer;