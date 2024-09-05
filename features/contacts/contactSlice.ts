import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchContacts } from './contactThunk'
import { Contact, ContactState } from '../../src/interfaces/contactInterfaces'

const initialState: ContactState = {
  data: [],
  status: 'idle',
  error: null,
}

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    publishComment: (state, action: PayloadAction<number>) => {
      const contact = state.data.find((item) => item.Contact_id === action.payload)
      if (contact) {
        contact.status = 'published'
      }
    },
    archiveComment: (state, action: PayloadAction<number>) => {
      const contact = state.data.find((item) => item.Contact_id === action.payload)
      if (contact) {
        contact.status = 'archived'
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(fetchContacts.fulfilled, (state, action: PayloadAction<Contact[]>) => {
        state.status = 'fulfilled'
        state.data = action.payload
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.error.message ?? 'Failed to fetch contacts'
      })
  },
})

export const { publishComment, archiveComment } = contactSlice.actions
export default contactSlice.reducer
