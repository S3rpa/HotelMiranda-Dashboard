import { createAsyncThunk } from '@reduxjs/toolkit';
import { Contact } from '../../src/interfaces/contactInterfaces';
import { apiService } from '../../src/utils/apiService';

export const fetchContacts = createAsyncThunk<Contact[], void, { rejectValue: string }>(
  'contacts/fetchContacts',
  async (_, { rejectWithValue }) => {
    const response = await apiService<Contact[]>('/api/contacts');

    if (response.error) {
      return rejectWithValue(response.error);
    }

    return response.data!;
  }
);

export const publishComment = createAsyncThunk<Contact, number, { rejectValue: string }>(
  'contacts/publishComment',
  async (contactId, { rejectWithValue }) => {
    const response = await apiService<Contact>(`/api/contacts/${contactId}/publish`, 'POST');

    if (response.error) {
      return rejectWithValue(response.error);
    }

    return response.data!;
  }
);

export const archiveComment = createAsyncThunk<Contact, number, { rejectValue: string }>(
  'contacts/archiveComment',
  async (contactId, { rejectWithValue }) => {
    const response = await apiService<Contact>(`/api/contacts/${contactId}/archive`, 'POST');

    if (response.error) {
      return rejectWithValue(response.error);
    }

    return response.data!;
  }
);