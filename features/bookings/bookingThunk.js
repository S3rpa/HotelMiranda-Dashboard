import { createAsyncThunk } from "@reduxjs/toolkit";

export const GetBookings = createAsyncThunk(
    "bookings/getBookings",
    async () => {
        try {
            const req = await fetch('http://localhost:3000/guest');

            // Verifica si la solicitud fue exitosa
            if (!req.ok) {
                throw new Error(`Error al obtener las reservas. Estado: ${req.status}`);
            }

            // Revisa el tipo de contenido de la respuesta
            const contentType = req.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error(`Respuesta no es JSON. Tipo de contenido: ${contentType}`);
            }

            // Parsear el JSON
            const json = await req.json();
            return json;
        } catch (error) {
            console.error('Error al obtener las reservas:', error.message);
            throw new Error(`Error al obtener las reservas: ${error.message}`);
        }
    }
);

  


export const EditBooking = createAsyncThunk(
    "bookings/editBooking",
    async (updatedBooking) => {
        try {
            const response = await fetch(`http://localhost:3000/guest/${updatedBooking.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedBooking),
            });

            if (!response.ok) {
                throw new Error('Failed to edit booking.');
            }

            const json = await response.json();
            return json;
        } catch (error) {
            console.error('Error editing booking:', error);
            throw new Error('Failed to edit booking.');
        }
    }
);

export const DeleteBooking = createAsyncThunk(
    "bookings/deleteBooking",
    async (bookingId) => {
        try {
            const response = await fetch(`http://localhost:3000/guest/${bookingId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete booking.');
            }

            return bookingId;
        } catch (error) {
            console.error('Error deleting booking:', error);
            throw new Error('Failed to delete booking.');
        }
    }
);

export const CreateBooking = createAsyncThunk(
    "bookings/createBooking",
    async (newBooking) => {
        try {
            const response = await fetch('http://localhost:3000/guest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newBooking)
            });

            if (!response.ok) {
                throw new Error('Failed to create booking.');
            }

            const json = await response.json();
            return json;
        } catch (error) {
            console.error('Error creating booking:', error);
            throw new Error('Failed to add booking.');
        }
    }
);
