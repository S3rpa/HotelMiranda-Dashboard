import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from './authContext';
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
  ProfileSection,
  ProfileImage,
  ProfileName,
  ProfileEmail,
  ContactButton,
  Footer,
  StyledNavLink
} from './sidebarStyles';
import { LuLayoutDashboard } from 'react-icons/lu';
import { BiKey } from 'react-icons/bi';
import { LuCalendarCheck2 } from 'react-icons/lu';
import { IoPersonOutline } from 'react-icons/io5';
import { PiPuzzlePiece } from 'react-icons/pi';
import profilePic from '../assets/profilepic.jpg';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { state } = useContext(AuthContext);
  const navigate = useNavigate();

  const userId = state?.user?.id;

  const handleEditProfile = () => {
    if (userId && userId !== 0) {
      navigate(`/users/edit/${userId}`);
    } else {
      console.error("User ID is not available or invalid");
    }
  };

  return (
    <SidebarContainer isOpen={isOpen}>
      <Logo isOpen={isOpen}>
        <LogoIcon />
        <LogoText>
          <LogoTitle>travl</LogoTitle>
          <LogoSubtitle>Hotel Admin Dashboard</LogoSubtitle>
        </LogoText>
      </Logo>
      <Menu>
        <MenuItem>
          <StyledNavLink to="/dashboard">
            <MenuIcon><LuLayoutDashboard /></MenuIcon>
            <MenuText>Dashboard</MenuText>
          </StyledNavLink>
        </MenuItem>
        <MenuItem>
          <StyledNavLink to="/bookings">
            <MenuIcon><LuCalendarCheck2 /></MenuIcon>
            <MenuText>Bookings</MenuText>
          </StyledNavLink>
        </MenuItem>
        <MenuItem>
          <StyledNavLink to="/rooms">
            <MenuIcon><BiKey /></MenuIcon>
            <MenuText>Room</MenuText>
          </StyledNavLink>
        </MenuItem>
        <MenuItem>
          <StyledNavLink to="/contact">
            <MenuIcon><IoPersonOutline /></MenuIcon>
            <MenuText>Contact</MenuText>
          </StyledNavLink>
        </MenuItem>
        <MenuItem>
          <StyledNavLink to="/users">
            <MenuIcon><PiPuzzlePiece /></MenuIcon>
            <MenuText>Users</MenuText>
          </StyledNavLink>
        </MenuItem>
      </Menu>
      {state?.user && (
        <ProfileSection isOpen={isOpen}>
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
  );
};

export default Sidebar;
