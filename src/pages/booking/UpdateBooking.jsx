import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import guestsData from '../../data/guest';

const Container = styled.div`
  padding: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: white;
  background-color: #135846;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0a3c29;
  }
`;

const UpdateBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const foundBooking = guestsData.find((guest) => guest.id === parseInt(id));
    if (foundBooking) {
      setBooking(foundBooking);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const index = guestsData.findIndex((guest) => guest.id === parseInt(id));
    if (index !== -1) {
      guestsData[index] = booking;
      alert('Booking updated successfully!');
      navigate('/bookings');
    }
  };

  if (!booking) return <p>Loading...</p>;

  return (
    <Container>
      <h1>Update Booking</h1>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          value={booking.name}
          onChange={handleChange}
          placeholder="Guest Name"
        />
        <Input
          type="text"
          name="roomType"
          value={booking.roomType}
          onChange={handleChange}
          placeholder="Room Type"
        />
        <Input
          type="datetime-local"
          name="checkIn"
          value={new Date(booking.checkIn).toISOString().slice(0, 16)}
          onChange={handleChange}
        />
        <Input
          type="datetime-local"
          name="checkOut"
          value={new Date(booking.checkOut).toISOString().slice(0, 16)}
          onChange={handleChange}
        />
        <Select name="status" value={booking.status} onChange={handleChange}>
          <option value="Booked">Booked</option>
          <option value="Pending">Pending</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Refund">Refund</option>
        </Select>
        <Input
          type="text"
          name="specialRequest"
          value={booking.specialRequest || ''}
          onChange={handleChange}
          placeholder="Special Request"
        />
        <Button type="submit">Update Booking</Button>
      </Form>
    </Container>
  );
};

export default UpdateBooking;
