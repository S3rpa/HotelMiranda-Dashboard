import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import profilepic from '../../assets/profilepic.jpg';

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

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.h1`
  font-size: 1.5em;
  color: #333;
`;

const UserId = styled.p`
  font-size: 1em;
  color: #888;
`;

const JobDesk = styled.div`
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

const ContactInfo = styled.div`
  margin: 0.5em 0;
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

const UserDetail = () => {
  const { id } = useParams();
  const users = useSelector((state) => state.users.data);
  const user = users.find((user) => user.id === parseInt(id));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!user) {
    return <p>No user found with the provided ID.</p>;
  }

  const statusColor =
    user.state === 'ACTIVE' ? '#4caf50' : '#f44336';

  const userImages = [profilepic];

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === userImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? userImages.length - 1 : prevIndex - 1
    );
  };

  const shortDescription = user.description
    ? user.description.length > 100
      ? user.description.substring(0, 100) + '...'
      : user.description
    : 'No description available.';

  return (
    <Container>
      <LeftSection>
        <UserInfo>
          <UserName>{user.name}</UserName>
          <UserId>ID {user.id}</UserId>
          <JobDesk>
            <div>
              <InfoLabel>Job</InfoLabel>
              <InfoValue>{user.work}</InfoValue>
            </div>
            <div>
              <InfoLabel>Joined on</InfoLabel>
              <InfoValue>{new Date(user.start_date).toLocaleDateString()}</InfoValue>
            </div>
          </JobDesk>
          <ContactInfo>
            <InfoLabel>Contact Number</InfoLabel>
            <InfoValue>{user.telephone}</InfoValue>
          </ContactInfo>
          <Description>{user.description}</Description>
        </UserInfo>
      </LeftSection>
      <RightSection>
        <Status color={statusColor}>{user.state.toUpperCase()}</Status>
        <Carousel>
          <ShortDescription>{shortDescription}</ShortDescription>
          {userImages.length > 0 ? (
            <FixedWidthImage
              src={userImages[currentImageIndex]}
              alt="User"
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

export default UserDetail;
