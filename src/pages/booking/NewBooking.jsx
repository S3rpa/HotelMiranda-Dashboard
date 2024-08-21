import React, { useState } from 'react';
import styled from 'styled-components';
import guestsData from '../../data/guest';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  padding: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin: 0.5rem 0;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #135846;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0a3c29;
  }
`;

const NewBooking = () => {
  const [name, setName] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [roomType, setRoomType] = useState('');
  const [status, setStatus] = useState('Booked');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBooking = {
      id: guestsData.length + 1,
      name,
      orderDate,
      checkIn,
      checkOut,
      roomType,
      status,
      description,
      price: 'Euro',
      amenities: [] 
    };

    guestsData.push(newBooking);

    alert('Booking added successfully!');

    navigate('/bookings');
  };

  return (
    <Container>
      <h2>Create New Booking</h2>
      <Form onSubmit={handleSubmit}>
        <Label>Guest Name</Label>
        <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <Label>Order Date</Label>
        <Input type="date" value={orderDate} onChange={(e) => setOrderDate(e.target.value)} required />

        <Label>Check In Date</Label>
        <Input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} required />

        <Label>Check Out Date</Label>
        <Input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} required />

        <Label>Room Type</Label>
        <Input type="text" value={roomType} onChange={(e) => setRoomType(e.target.value)} required />

        <Label>Status</Label>
        <Select value={status} onChange={(e) => setStatus(e.target.value)} required>
          <option value="Booked">Booked</option>
          <option value="Pending">Pending</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Refund">Refund</option>
        </Select>

        <Label>Description</Label>
        <Input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />

        <Button type="submit">Add Booking</Button>
      </Form>
    </Container>
  );
};

export default NewBooking;
