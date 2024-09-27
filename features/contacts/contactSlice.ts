import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchContacts, publishComment, archiveComment } from './contactThunk';
import { Contact, ContactState } from '../../src/interfaces/contactInterfaces';

const initialState: ContactState = {
  data: [],
  status: 'idle',
  error: null,
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchContacts
      .addCase(fetchContacts.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action: PayloadAction<Contact[]>) => {
        state.status = 'fulfilled';
        state.data = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || 'Failed to fetch contacts';
      })
      // publishComment
      .addCase(publishComment.fulfilled, (state, action: PayloadAction<Contact>) => {
        const index = state.data.findIndex(contact => contact.Contact_id === action.payload.Contact_id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(publishComment.rejected, (state, action) => {
        state.error = action.payload || 'Failed to publish comment';
      })
      // archiveComment
      .addCase(archiveComment.fulfilled, (state, action: PayloadAction<Contact>) => {
        const index = state.data.findIndex(contact => contact.Contact_id === action.payload.Contact_id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(archiveComment.rejected, (state, action) => {
        state.error = action.payload || 'Failed to archive comment';
      });
  },
});

export default contactSlice.reducer;