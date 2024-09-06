import { styled } from 'styled-components'

export const Container = styled.div`
  display: flex;
  padding: 5%;
  background-color: #f7f7f7;
  min-height: 94.7vh;
`;

export const LeftSection = styled.div`
  width: 40%;
  background-color: white;
  border-radius: 0.75em;
  padding: 2%;
  box-shadow: 0 0.25em 0.375em rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 74.5vh;
`;

export const RightSection = styled.div`
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

export const GuestInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const GuestName = styled.h1`
  font-size: 1.5em;
  color: #333;
`;

export const BookingId = styled.p`
  font-size: 1em;
  color: #888;
`;

export const CheckInOut = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5em 0;
`;

export const InfoLabel = styled.p`
  font-size: 1em;
  font-weight: bold;
  color: #333;
`;

export const InfoValue = styled.p`
  font-size: 1em;
  color: #555;
`;

export const RoomInfo = styled.div`
  margin: 0.5em 0;
`;

export const Price = styled.p`
  font-size: 1.5em;
  font-weight: bold;
  color: #333;
`;

export const Description = styled.p`
  font-size: 1em;
  color: #666;
  margin: 0.5em 0;
  flex-grow: 1;
  overflow-y: auto;
`;

export const ShortDescription = styled.p`
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

export const Amenities = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  margin: 0.5em 0;
`;

export const Amenity = styled.span`
  background-color: #eaf4f3;
  color: #135846;
  padding: 0.5em 1em;
  border-radius: 0.5em;
  font-size: 0.9em;
`;

export const Status = styled.div<{ color: string }>`
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

export const Carousel = styled.div`
  background-color: #e0e0e0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.75em;
  position: relative;
  overflow: hidden;
`;

export const CarouselImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.75em;
`;

export const FixedWidthImage = styled(CarouselImage)`
  width: 1000px;
  height: 100%;
  object-fit: cover; 
`;

export const CarouselButton = styled.button<{ $position: 'left' | 'right' }>`
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
