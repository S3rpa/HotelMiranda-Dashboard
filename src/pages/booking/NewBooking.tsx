import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { CreateBooking } from '../../../features/bookings/bookingThunk'
import { unwrapResult } from '@reduxjs/toolkit'
import { Booking } from '../../interfaces/bookingInterfaces'
import { AppDispatch } from '../../../app/store'
import {
  Container,
  Form,
  Label,
  Input,
  Select,
  Button
} from '../../styles/booking/newBookingStyles'
import { toast } from 'react-toastify';


const NewBooking: React.FC = () => {
  const [name, setName] = useState<string>('')
  const [orderDate, setOrderDate] = useState<string>('')
  const [checkIn, setCheckIn] = useState<string>('')
  const [checkOut, setCheckOut] = useState<string>('')
  const [roomType, setRoomType] = useState<string>('')
  const [status, setStatus] = useState<'Booked' | 'Pending' | 'Cancelled' | 'Refund'>('Booked')
  const [description, setDescription] = useState<string>('')
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newBooking: Omit<Booking, 'id'> = {
      name,
      orderDate,
      checkIn,
      checkOut,
      roomType,
      status,
      description,
      price: 'Euro',
      amenities: [], 
    }

    dispatch(CreateBooking(newBooking))
      .then(unwrapResult)
      .then(() => {
        toast.success('Reserva creada exitosamente');
        navigate('/bookings')
      })
      .catch((error) => {
        toast.error('Error al crear la reserva');
      })
  }

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
        <Select value={status} onChange={(e) => setStatus(e.target.value as 'Booked' | 'Pending' | 'Cancelled' | 'Refund')} required>
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
  )
}

export default NewBooking
