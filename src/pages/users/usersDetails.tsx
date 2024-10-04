import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import profilepic from '../../assets/profilepic.jpg'
import {
  Container,
  LeftSection,
  RightSection,
  UserInfo,
  UserName,
  UserId,
  JobDesk,
  InfoLabel,
  InfoValue,
  ContactInfo,
  Description,
  Status,
  FixedWidthImage,
  CarouselButton,
  Carousel,
  ShortDescription,
} from '../../styles/users/userDetailStyles'
import { User } from '../../interfaces/userInterfaces'

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const users = useSelector((state: RootState) => state.users.data);
  
  // Buscar el usuario por _id
  const user = users.find((user: User) => user._id === id);
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!user) {
    return <p>No user found with the provided ID.</p>;
  }

  const userImages = user.photo && user.photo.length > 0 ? user.photo : [profilepic];

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === userImages.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? userImages.length - 1 : prevIndex - 1));
  };

  const statusColor = user.state === 'ACTIVE' ? '#4caf50' : '#f44336';

  return (
    <Container>
      <LeftSection>
        <UserInfo>
          <UserName>{user.name}</UserName>
          <UserId>ID {user._id}</UserId>
          <JobDesk>
            <InfoLabel>Job</InfoLabel>
            <InfoValue>{user.work}</InfoValue>
            <InfoLabel>Joined on</InfoLabel>
            <InfoValue>{new Date(user.start_date).toLocaleDateString()}</InfoValue>
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
          <ShortDescription>{user.description.substring(0, 100)}...</ShortDescription>
          <FixedWidthImage src={userImages[currentImageIndex]} alt="User" />
          {userImages.length > 1 && (
            <>
              <CarouselButton $position="left" onClick={handlePrevImage}>
                {'<'}
              </CarouselButton>
              <CarouselButton $position="right" onClick={handleNextImage}>
                {'>'}
              </CarouselButton>
            </>
          )}
        </Carousel>
      </RightSection>
    </Container>
  );
};

export default UserDetail;