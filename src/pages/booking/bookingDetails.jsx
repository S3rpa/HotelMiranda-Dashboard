import React from 'react';
import { useParams } from 'react-router-dom';

const BookingDetail = () => {
  const { id } = useParams();
  return <h1>Booking Detail Page for ID: {id}</h1>;
};

export default BookingDetail;
