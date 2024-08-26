import { configureStore } from '@reduxjs/toolkit';
import bookingsReducer from '../features/bookings/bookingsSlice';
import usersReducer from '../features/users/usersSlice';

export const store = configureStore({
    reducer: {
        bookings: bookingsReducer,
        users: usersReducer
    },
});

export default store;
