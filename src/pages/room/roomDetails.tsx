import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { Room } from '../../interfaces/roomInterfaces';
import { DetailContainer, RoomInfo, RoomImageSection, RoomName, RoomDetails, StatusBadge } from '../../styles/room/roomsDetails';

const RoomDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const rooms = useSelector((state: RootState) => state.rooms.data);
  const room = rooms.find((room: Room) => room.id === parseInt(id || '', 10));

  if (!room) {
    return <p>Room not found</p>;
  }

  const statusColor = room.status === 'Available' ? '#4caf50' : room.status === 'Booked' ? '#f44336' : '#ff9800';

  return (
    <DetailContainer>
      <RoomInfo>
        <RoomName>{room.room_name}</RoomName>
        <RoomDetails>Amenities: {Array.isArray(room.amenities) ? room.amenities.join(', ') : room.amenities}</RoomDetails>
        <RoomDetails>Price: ${room.price}</RoomDetails>
        <RoomDetails>Offer: {room.offer}</RoomDetails>
        <RoomDetails>Status: <StatusBadge statusColor={statusColor}>{room.status}</StatusBadge></RoomDetails>
      </RoomInfo>
      <RoomImageSection>
        <p>Image goes here</p>
      </RoomImageSection>
    </DetailContainer>
  );
};

export default RoomDetail;