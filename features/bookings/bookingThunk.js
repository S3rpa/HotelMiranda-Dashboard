import { createAsyncThunk } from "@reduxjs/toolkit";

const baseURL = 'https://my-json-server.typicode.com/S3rpa/HotelMiranda-Dashboard';

export const GetBookings = createAsyncThunk(
    "bookings/getBookings",
    async () => {
        const response = await fetch(`${baseURL}/guest`)
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error("Could not reach server: " + response.status);
                }
                return response.json();
            })
            .catch((error) => {
                throw new Error(error);
            });
        return response;
    }
);


export const EditBooking = createAsyncThunk(
    "bookings/editBooking",
    async (updatedBooking) => {
        const response = await fetch(`${baseURL}/guest/${updatedBooking.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: "cors",
            dataType: 'json',
            body: JSON.stringify(updatedBooking)
        })
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error("Could not reach server: " + response.status);
                }
                return response.json();
            })
            .catch((error) => {
                throw new Error(error);
            });
        return response;
    }
);

export const DeleteBooking = createAsyncThunk(
    "bookings/deleteBooking",
    async (bookingId) => {
        const response = await fetch(`${baseURL}/guest/${bookingId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: "cors",
            dataType: 'json',
        })
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error("Could not reach server: " + response.status);
                }
                return bookingId;
            })
            .catch((error) => {
                throw new Error(error);
            });
        return response;
    }
);

export const CreateBooking = createAsyncThunk(
    "bookings/createBooking",
    async (newBooking) => {
        const response = await fetch(`${baseURL}/guest`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: "cors",
            dataType: 'json',
            body: JSON.stringify(newBooking)
        });

        if (response.status >= 400) {
            throw new Error("Could not reach server: " + response.status);
        }

        const createdBooking = await response.json();
        return createdBooking;
    }
);

