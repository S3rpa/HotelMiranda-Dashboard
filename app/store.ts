import { configureStore } from '@reduxjs/toolkit'
import contactReducer from '../features/contacts/contactSlice'
import usersReducer from '../features/users/usersSlice'
import bookingReducer from '../features/bookings/bookingsSlice'
import roomsReducer from '../features/rooms/roomSlice'

export const store = configureStore({
  reducer: {
    contacts: contactReducer,
    users: usersReducer,
    bookings: bookingReducer,
    rooms: roomsReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
