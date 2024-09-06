// src/features/rooms/roomsThunk.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Room } from '../../src/interfaces/roomInterfaces';
import roomData from '../../src/data/roomData';

// Obtener todas las habitaciones
export const GetRooms = createAsyncThunk('rooms/getRooms', async () => {
    return [...roomData];
});

// Eliminar una habitación
export const DeleteRoom = createAsyncThunk('rooms/deleteRoom', async (roomId: number) => {
    const roomsCopy = [...roomData]; 
    const index = roomsCopy.findIndex(room => room.id === roomId);

    if (index !== -1) {
        roomsCopy.splice(index, 1); 
        return roomId;
    } else {
        throw new Error(`Failed to delete room with id ${roomId}`);
    }
});

// Obtener una sola habitación
export const GetRoom = createAsyncThunk('rooms/getRoom', async (id: number) => {
    const room = roomData.find(room => room.id === id);
    if (room) {
        return room;
    } else {
        throw new Error(`Room with id ${id} not found`);
    }
});

// Editar una habitación existente
export const EditRoom = createAsyncThunk('rooms/editRoom', async (updatedRoom: Room) => {
    const roomsCopy = [...roomData]; 
    const index = roomsCopy.findIndex(room => room.id === updatedRoom.id);

    if (index !== -1) {
        roomsCopy[index] = { ...roomsCopy[index], ...updatedRoom }; 
        return roomsCopy[index];
    } else {
        throw new Error(`Failed to update room with id ${updatedRoom.id}`);
    }
});

// Crear una nueva habitación
export const CreateRoom = createAsyncThunk('rooms/createRoom', async (newRoom: Room) => {
    const roomsCopy = [...roomData];
    const newId = roomsCopy.length ? roomsCopy[roomsCopy.length - 1].id + 1 : 1;
    const roomToAdd = { ...newRoom, id: newId };

    roomsCopy.push(roomToAdd);
    return roomToAdd;
});
