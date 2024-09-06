import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { EditBooking } from '../../../features/bookings/bookingThunk'
import { Booking } from '../../interfaces/bookingInterfaces'
import { RootState, AppDispatch } from '../../../app/store'
import {
  Container,
  Form,
  Input,
  Select,
  Button,
} from '../../styles/booking/updateStyles'

const UpdateBooking: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [booking, setBooking] = useState<Booking | null>(null)
  const guests = useSelector((state: RootState) => state.bookings.data) as Booking[]

  useEffect(() => {
    const foundBooking = guests.find((g) => g.id === parseInt(id || '', 10))
    if (foundBooking) {
      setBooking(foundBooking)
    }
  }, [id, guests])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (booking) {
      setBooking({ ...booking, [name]: value })
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (booking) {
      try {
        const resultAction = await dispatch(EditBooking(booking))
        const result = unwrapResult(resultAction)
        alert('¡Reserva actualizada exitosamente!')
        navigate('/bookings')
      } catch (error) {
        console.error('Error al actualizar la reserva:', error)
        alert('No se pudo actualizar la reserva.')
      }
    }
  }

  if (!booking) return <p>Cargando...</p>

  return (
    <Container>
      <h1>Actualizar Reserva</h1>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          value={booking.name}
          onChange={handleChange}
          placeholder="Nombre del huésped"
        />
        <Input
          type="text"
          name="roomType"
          value={booking.roomType}
          onChange={handleChange}
          placeholder="Tipo de habitación"
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
          <option value="Booked">Reservado</option>
          <option value="Pending">Pendiente</option>
          <option value="Cancelled">Cancelado</option>
          <option value="Refund">Reembolsado</option>
        </Select>
        <Input
          type="text"
          name="specialRequest"
          value={booking.specialRequest || ''}
          onChange={handleChange}
          placeholder="Solicitud especial"
        />
        <Button type="submit">Actualizar Reserva</Button>
      </Form>
    </Container>
  )
}

export default UpdateBooking
