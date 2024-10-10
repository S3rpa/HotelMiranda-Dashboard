import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { Booking } from '../../interfaces/bookingInterfaces';
import room1 from '../../assets/room1.jpg';
import room2 from '../../assets/room2.jpg';
import room3 from '../../assets/room3.jpg';
import room4 from '../../assets/room4.jpg';
import { 
  Container, 
  LeftSection, 
  RightSection, 
  GuestInfo, 
  GuestName, 
  BookingId, 
  CheckInOut, 
  InfoLabel, 
  InfoValue, 
  RoomInfo, 
  Price, 
  Description, 
  Status, 
  Carousel, 
  FixedWidthImage, 
  ShortDescription, 
  CarouselButton, 
  Amenities, 
  Amenity 
} from '../../styles/booking/bookingDetailsStyles';

const BookingDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const guests = useSelector((state: RootState) => state.bookings.data);
  const guest = guests.find((g) => g._id === id) as Booking;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!guest) {
    return <p>No se encontró una reserva con el ID proporcionado.</p>;
  }

  const roomImages = [room1, room2, room3, room4];

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === roomImages.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? roomImages.length - 1 : prevIndex - 1));
  };

  return (
    <Container>
      <LeftSection>
        <GuestInfo>
          <GuestName>{guest.user.toString()}</GuestName>
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
            <InfoValue>{guest.roomType} - {guest.room}</InfoValue>
          </RoomInfo>
          <Price>{guest.price}</Price>
          <Description>{guest.description}</Description>
          <InfoLabel>Amenities</InfoLabel>
          <Amenities>
            {guest.amenities?.map((amenity, index) => (
              <Amenity key={index}>{amenity.name}</Amenity>
            ))}
          </Amenities>
        </GuestInfo>
      </LeftSection>
      <RightSection>
        <Status color="#4caf50">{guest.status.toUpperCase()}</Status>
        <Carousel>
          <ShortDescription>{guest.description}</ShortDescription>
          <FixedWidthImage src={roomImages[currentImageIndex]} alt="Room" />
          <CarouselButton $position="left" onClick={handlePrevImage}>{'<'}</CarouselButton>
          <CarouselButton $position="right" onClick={handleNextImage}>{'>'}</CarouselButton>
        </Carousel>
      </RightSection>
    </Container>
  );
};

export default BookingDetails;