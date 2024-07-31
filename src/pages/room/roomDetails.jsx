import React from 'react';
import { useParams } from 'react-router-dom';

const RoomDetail = () => {
  const { id } = useParams();
  return <h1>Room Detail Page for ID: {id}</h1>;
};

export default RoomDetail;
