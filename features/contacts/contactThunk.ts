import { createAsyncThunk } from '@reduxjs/toolkit';
import contact from '../../src/data/contactData';

export interface Contact {
  Contact_id: number;
  Date: string;
  Customer: string;
  Comment: string;
  gender: string;
  ip_address: string;
  status?: 'published' | 'archived' | null | undefined;
}

export const fetchContacts = createAsyncThunk<Contact[], void>(
  'contacts/fetchContacts',
  async () => {

    return contact.comments;
  }
);
