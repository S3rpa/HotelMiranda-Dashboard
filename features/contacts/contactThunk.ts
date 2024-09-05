import { createAsyncThunk } from '@reduxjs/toolkit'
import { Contact }  from '../../src/interfaces/contactInterfaces'
import contactData from '../../src/data/contactData'



export const fetchContacts = createAsyncThunk<Contact[], void>(
  'contacts/fetchContacts',
  async () => {

    return contactData.comments
  }
)
