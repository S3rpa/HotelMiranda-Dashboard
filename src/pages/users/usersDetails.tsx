import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import profilepic from '../../assets/profilepic.jpg'
import { RootState } from '../../../app/store'
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
  ShortDescription,
  Status,
  Carousel,
  FixedWidthImage,
  CarouselButton,
} from '../../styles/users/userDetailStyles'
import { User } from '../../interfaces/userInterfaces'

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const users = useSelector((state: RootState) => state.users.data)
  const user = users.find((user: User) => user.id === parseInt(id || ''))
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!user) {
    return <p>No user found with the provided ID.</p>
  }

  const statusColor = user.state === 'ACTIVE' ? '#4caf50' : '#f44336'
  const userImages = [profilepic]

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === userImages.length - 1 ? 0 : prevIndex + 1))
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? userImages.length - 1 : prevIndex - 1))
  }

  const shortDescription = user.description
    ? user.description.length > 100
      ? user.description.substring(0, 100) + '...'
      : user.description
    : 'No description available.'

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
            <FixedWidthImage src={userImages[currentImageIndex]} alt="User" />
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
  )
}

export default UserDetail
