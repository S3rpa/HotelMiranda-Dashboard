import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CreateRoom } from '../../../features/rooms/roomThunk';
import { unwrapResult } from '@reduxjs/toolkit';
import { AppDispatch } from '../../../app/store';
import { Container, Form, Label, Input, Select, Button } from '../../styles/room/NewRoomStyles';  // You can create this in a similar structure to user styles
import { Room } from '../../interfaces/roomInterfaces';

const NewRoom: React.FC = () => {
    const [roomName, setRoomName] = useState('');
    const [amenities, setAmenities] = useState('');
    const [price, setPrice] = useState('');
    const [offer, setOffer] = useState('');
    const [status, setStatus] = useState<'Available' | 'Booked' | 'Under Maintenance'>('Available');

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!roomName || !amenities || !price || !offer) {
            alert('All fields are required');
            return;
        }

        const newRoom: Omit<Room, '_id'> = {
            room_name: roomName,
            amenities: amenities.split(',').map(item => item.trim()),
            price: parseFloat(price),
            offer,
            status,
        };

        try {
            const resultAction = await dispatch(CreateRoom(newRoom));
            unwrapResult(resultAction);
            alert('Room added successfully!');
            navigate('/rooms');
        } catch (error) {
            console.error('Error creating room:', error);
            alert(`Failed to add room: ${error}`);
        }
    };

    return (
        <Container>
            <h2>Create New Room</h2>
            <Form onSubmit={handleSubmit}>
                <Label>Room Name</Label>
                <Input
                    type="text"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    required
                />
                <Label>Amenities</Label>
                <Input
                    type="text"
                    value={amenities}
                    onChange={(e) => setAmenities(e.target.value)}
                    placeholder="Comma-separated amenities"
                    required
                />
                <Label>Price</Label>
                <Input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <Label>Offer</Label>
                <Input
                    type="text"
                    value={offer}
                    onChange={(e) => setOffer(e.target.value)}
                    required
                />
                <Label>Status</Label>
                <Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as 'Available' | 'Booked' | 'Under Maintenance')}
                    required
                >
                    <option value="Available">Available</option>
                    <option value="Booked">Booked</option>
                    <option value="Under Maintenance">Under Maintenance</option>
                </Select>
                <Button type="submit">Add Room</Button>
            </Form>
        </Container>
    );
};

export default NewRoom;