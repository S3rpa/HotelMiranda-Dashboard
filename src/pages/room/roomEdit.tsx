import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { EditRoom } from '../../../features/rooms/roomThunk';
import { RootState, AppDispatch } from '../../../app/store';
import { Room } from '../../interfaces/roomInterfaces';
import { Container, Form, Label, Input, Select, Button } from '../../styles/room/roomsEditStyles';

const RoomEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [room, setRoom] = useState<Room | null>(null);
  const rooms = useSelector((state: RootState) => state.rooms.data);

  useEffect(() => {
    const foundRoom = rooms.find((r) => r.id === parseInt(id!));
    if (foundRoom) {
      setRoom({ ...foundRoom });
    }
  }, [id, rooms]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRoom((prevRoom) => (prevRoom ? { ...prevRoom, [name]: value } : null));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!room) return;
    try {
      const resultAction = await dispatch(EditRoom(room));
      unwrapResult(resultAction);
      alert('Room updated successfully!');
      navigate('/rooms');
    } catch (error) {
      console.error('Failed to update room:', error);
      alert('Failed to update room.');
    }
  };

  if (!room && id) return <p>Loading...</p>;

  return (
    <Container>
      <h1>Update Room</h1>
      <Form onSubmit={handleSubmit}>
        <Label>Room Name</Label>
        <Input
          type="text"
          name="room_name"
          value={room?.room_name || ''}
          onChange={handleChange}
          required
        />
        <Label>Amenities</Label>
        <Input
          type="text"
          name="amenities"
          value={room?.amenities || ''}
          onChange={handleChange}
          required
        />
        <Label>Price</Label>
        <Input
          type="number"
          name="price"
          value={room?.price || ''}
          onChange={handleChange}
          required
        />
        <Label>Offer</Label>
        <Input
          type="text"
          name="offer"
          value={room?.offer || ''}
          onChange={handleChange}
        />
        <Label>Status</Label>
        <Select name="status" value={room?.status || 'Available'} onChange={handleChange} required>
          <option value="Available">Available</option>
          <option value="Booked">Booked</option>
          <option value="Under Maintenance">Under Maintenance</option>
        </Select>
        <Button type="submit">Update Room</Button>
      </Form>
    </Container>
  );
};

export default RoomEdit;