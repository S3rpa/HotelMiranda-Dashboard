import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import guests from '../../data/guest';
import room1 from '../../assets/room1.jpg';
import room2 from '../../assets/room2.jpg';
import room3 from '../../assets/room3.jpg';
import room4 from '../../assets/room4.jpg';

const Container = styled.div`
  display: flex;
  padding: 5%;
  background-color: #f7f7f7;
  min-height: 94.7vh;
`;

const LeftSection = styled.div`
  width: 40%;
  background-color: white;
  border-radius: 0.75em;
  padding: 2%;
  box-shadow: 0 0.25em 0.375em rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 74.5vh;
`;

const RightSection = styled.div`
  width: 55%;
  background-color: white;
  border-radius: 0.75em;
  box-shadow: 0 0.25em 0.375em rgba(0, 0, 0, 0.1);
  position: relative;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const GuestInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const GuestName = styled.h1`
  font-size: 1.5em;
  color: #333;
`;

const BookingId = styled.p`
  font-size: 1em;
  color: #888;
`;

const CheckInOut = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5em 0;
`;

const InfoLabel = styled.p`
  font-size: 1em;
  font-weight: bold;
  color: #333;
`;

const InfoValue = styled.p`
  font-size: 1em;
  color: #555;
`;

const RoomInfo = styled.div`
  margin: 0.5em 0;
`;

const Price = styled.p`
  font-size: 1.5em;
  font-weight: bold;
  color: #333;
`;

const Description = styled.p`
  font-size: 1em;
  color: #666;
  margin: 0.5em 0;
  flex-grow: 1;
  overflow-y: auto;
`;

const ShortDescription = styled.p`
  font-size: 1.2em;
  color: rgba(255, 255, 255, 1); 
  position: absolute;
  bottom: 10%; 
  left: 50%;
  transform: translateX(-50%);
  z-index: 100; 
  width: 80%;
  background-color: rgba(0, 0, 0, 0.7); 
  padding: 1em; 
  border-radius: 0.5em; 
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;



const Amenities = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  margin: 0.5em 0;
`;

const Amenity = styled.span`
  background-color: #eaf4f3;
  color: #135846;
  padding: 0.5em 1em;
  border-radius: 0.5em;
  font-size: 0.9em;
`;

const Status = styled.div`
  background-color: ${(props) => props.color};
  color: white;
  padding: 0.5em 1em;
  border-radius: 0.5em;
  font-size: 0.9em;
  text-align: center;
  position: absolute;
  top: 1em;
  right: 1em;
  z-index: 10;
`;

const Carousel = styled.div`
  background-color: #e0e0e0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.75em;
  position: relative;
  overflow: hidden;
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.75em;
`;

const FixedWidthImage = styled(CarouselImage)`
  width: 1000px;
  height: 100%;
  object-fit: cover; 
`;

const CarouselButton = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  font-size: 2em;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $position }) => $position}: 1em;
  z-index: 10;
`;

const BookingDetails = () => {
  const { id } = useParams();
  const guest = guests.find((guest) => guest.id === parseInt(id));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!guest) {
    return <p>No booking found with the provided ID.</p>;
  }

  const statusColor =
    guest.status === 'Booked'
      ? '#4caf50'
      : guest.status === 'Cancelled'
        ? '#f44336'
        : guest.status === 'Pending'
          ? '#ffeb3b'
          : '#ff9800';

  const roomImages = [room1, room2, room3, room4];

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === roomImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? roomImages.length - 1 : prevIndex - 1
    );
  };

  // Usar el campo description y acortarlo a 100 caracteres si es necesario
  const shortDescription = guest.description
    ? guest.description.length > 100
      ? guest.description.substring(0, 100) + '...'
      : guest.description
    : 'No description available.';

  return (
    <Container>
      <LeftSection>
        <GuestInfo>
          <GuestName>{guest.name}</GuestName>
          <BookingId>ID {guest.id}</BookingId>
          <CheckInOut>
            <div>
              <InfoLabel>Check In</InfoLabel>
              <InfoValue>{new Date(guest.checkIn).toLocaleString()}</InfoValue>
            </div>
            <div>
              <InfoLabel>Check Out</InfoLabel>
              <InfoValue>{new Date(guest.checkOut).toLocaleString()}</InfoValue>
            </div>
          </CheckInOut>
          <RoomInfo>
            <InfoLabel>Room Info</InfoLabel>
            <InfoValue>{guest.roomType} - {guest.id}</InfoValue>
          </RoomInfo>
          <Price>{guest.price}</Price>
          <Description>{guest.description}</Description>
          <InfoLabel>Facilities</InfoLabel>
          <Amenities>
            {guest.amenities?.map((amenity, index) => (
              <Amenity key={index}>{amenity.name}</Amenity>
            ))}
          </Amenities>
        </GuestInfo>
      </LeftSection>
      <RightSection>
        <Status color={statusColor}>{guest.status.toUpperCase()}</Status>
        <Carousel>
          <ShortDescription>{shortDescription}</ShortDescription>
          {roomImages.length > 0 ? (
            <FixedWidthImage
              src={roomImages[currentImageIndex]}
              alt="Room"
            />
          ) : (
            <p>No images available</p>
          )}
          <CarouselButton $position="left" onClick={handlePrevImage}>
            {'<'}
          </CarouselButton>
          <CarouselButton $position="right" onClick={handleNextImage}>
            {'>'}
          </CarouselButton>
        </Carousel>
      </RightSection>
    </Container>
  );
};

export default BookingDetails;

