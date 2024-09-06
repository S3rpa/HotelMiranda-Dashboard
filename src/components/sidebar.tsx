import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from './authContext'
import { LuLayoutDashboard } from "react-icons/lu"
import { BiKey } from "react-icons/bi"
import { LuCalendarCheck2 } from "react-icons/lu"
import { IoPersonOutline } from "react-icons/io5"
import { PiPuzzlePiece } from "react-icons/pi"
import profilePic from '../assets/profilepic.jpg'
import {
  SidebarContainer,
  Logo,
  LogoIcon,
  LogoText,
  LogoTitle,
  LogoSubtitle,
  Menu,
  MenuItem,
  MenuIcon,
  MenuText,
  StyledNavLink,
  ProfileSection,
  ProfileImage,
  ProfileName,
  ProfileEmail,
  ContactButton,
  Footer
} from './sidebarStyles'

interface SidebarProps {
  isopen: boolean
  toggleSidebar: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isopen, toggleSidebar }) => {
  const { state } = useContext(AuthContext)
  const navigate = useNavigate()

  const userId = state?.user?.id

  const handleEditProfile = () => {
    if (userId && userId !== 0) {
      navigate(`/users/edit/${userId}`)
    } else {
      console.error("User ID is not available or invalid")
    }
  }

  return (
    <SidebarContainer $isopen={isopen}>
      <Logo $isopen={isopen}>
        <LogoIcon />
        <LogoText>
          <LogoTitle>travl</LogoTitle>
          <LogoSubtitle>Hotel Admin Dashboard</LogoSubtitle>
        </LogoText>
      </Logo>
      <Menu>
        <MenuItem>
          <NavLink to="/dashboard">
            <MenuIcon><LuLayoutDashboard /></MenuIcon>
            <MenuText>Dashboard</MenuText>
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/bookings">
            <MenuIcon><LuCalendarCheck2 /></MenuIcon>
            <MenuText>Bookings</MenuText>
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/rooms">
            <MenuIcon><BiKey /></MenuIcon>
            <MenuText>Room</MenuText>
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/contact">
            <MenuIcon><IoPersonOutline /></MenuIcon>
            <MenuText>Contact</MenuText>
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/users">
            <MenuIcon><PiPuzzlePiece /></MenuIcon>
            <MenuText>Users</MenuText>
          </NavLink>
        </MenuItem>
      </Menu>
      {state?.user && (
        <ProfileSection $isopen={isopen}>
          <ProfileImage src={profilePic} />
          <ProfileName>{state.user.name}</ProfileName>
          <ProfileEmail>{state.user.email}</ProfileEmail>
          <ContactButton onClick={handleEditProfile}>Edit</ContactButton>
        </ProfileSection>
      )}
      <Footer>
        <p>Travl Hotel Admin Dashboard</p>
        <p>© 2020 All Rights Reserved</p>
        <p>Made with ♥ by Peterdraw</p>
      </Footer>
    </SidebarContainer>
  )
}

export default Sidebar
