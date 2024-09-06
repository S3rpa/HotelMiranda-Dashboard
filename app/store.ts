import { configureStore } from '@reduxjs/toolkit';
import contactReducer from '../features/contacts/contactSlice';
import usersReducer from '../features/users/usersSlice';

export const store = configureStore({
  reducer: {
    contacts: contactReducer,
    users: usersReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
