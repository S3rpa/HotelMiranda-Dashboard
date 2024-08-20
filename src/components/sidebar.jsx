import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { LuLayoutDashboard } from "react-icons/lu";
import { BiKey } from "react-icons/bi";
import { LuCalendarCheck2 } from "react-icons/lu";
import { IoPersonOutline } from "react-icons/io5";
import { PiPuzzlePiece } from "react-icons/pi";
import { PiBuildingFill } from "react-icons/pi";
import { GiStarsStack } from "react-icons/gi";
import profilePic from '../assets/profilepic.jpg';

const SidebarContainer = styled.div`
  width: ${(props) => (props.isOpen ? '250px' : '0')};
  height: 100vh;
  background-color: #FFFFFF;
  box-shadow: ${(props) => (props.isOpen ? '2px 0 5px rgba(0, 0, 0, 0.1)' : 'none')};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${(props) => (props.isOpen ? '2rem 0rem' : '0')};
  overflow: hidden;
  transition: width 0.3s, padding 0.3s;
`;

const Logo = styled.div`
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  align-items: center;
  margin-bottom: 2rem;
  padding-left: 1.5rem;
`;

const LogoIcon = styled(PiBuildingFill)`
  font-size: 2rem;
  color: #135846;
  margin-right: 0.5rem;
  
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoTitle = styled.h1`
  font-size: 1.5rem;
  color: #333;
  margin: 0;
`;

const LogoSubtitle = styled.h4`
  font-family: 'Poppins';
  font-size: 0.8rem;
  font-weight: 300;
  color: #686868;
  margin: 0;
`;

const Menu = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
`;

const MenuItem = styled.li`
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
`;

const MenuIcon = styled.div`
  font-size: 1.5rem;
  color: #799283;
  margin-right: 1rem;
`;

const MenuText = styled.span`
  font-size: 1rem;
  color: #333;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;

  &.active {
    border-left: #E23428 solid 5px;
    color: #E23428;

    ${MenuIcon} {
      color: #E23428; 
  }

  &:hover {
    ${MenuIcon} {
      color: #E23428;
    }
  }
`;

const ProfileSection = styled.div`
  top: 589px;
  left: 56px;
  width: 200px;
  height: 221px;
  margin-top: auto;
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: #FFFFFF;
  border-radius: 1rem;
  text-align: center;
  box-shadow: 6px 12px 35px 8px rgba(0,0,0,0.26);
`;

const ProfileImage = styled.img`
  top: 589px;
  left: 138px;
  width: 70px;
  height: 70px;
  border-radius: 8px;
  opacity: 1;
  object-fit: cover;
`;

const ProfileName = styled.h2`
  font-size: 1rem;
  color: #333;
`;

const ProfileEmail = styled.p`
  font-size: 0.8rem;
  color: #686868;
`;

const ContactButton = styled.button`
  background: #EBF1EF 0% 0% no-repeat padding-box;
  border-radius: 8px;
  opacity: 1;
  top: 739px;
  left: 96px;
  width: 158px;
  height: 47px;
  color: #135846;
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
`;

const Footer = styled.div`
  text-align: center;
  padding: 1rem;
  font-size: 0.8rem;
  color: #686868;
  margin-top: auto;
`;

const Sidebar = ({ isOpen, toggleSidebar }) => {
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
          <StyledNavLink to="/index">
            <MenuIcon><LuLayoutDashboard /></MenuIcon>
            <MenuText>Dashboard</MenuText>
          </StyledNavLink>
        </MenuItem>
        <MenuItem>
          <StyledNavLink to="/rooms">
            <MenuIcon><BiKey /></MenuIcon>
            <MenuText>Room</MenuText>
          </StyledNavLink>
        </MenuItem>
        <MenuItem>
          <StyledNavLink to="/bookings">
            <MenuIcon><LuCalendarCheck2 /></MenuIcon>
            <MenuText>Bookings</MenuText>
          </StyledNavLink>
        </MenuItem>
        <MenuItem>
          <StyledNavLink to="/guests">
            <MenuIcon><IoPersonOutline /></MenuIcon>
            <MenuText>Guest</MenuText>
          </StyledNavLink>
        </MenuItem>
        <MenuItem>
          <StyledNavLink to="/concierge">
            <MenuIcon><PiPuzzlePiece /></MenuIcon>
            <MenuText>Concierge</MenuText>
          </StyledNavLink>
        </MenuItem>
      </Menu>
      <ProfileSection isOpen={isOpen}>
        <ProfileImage src={profilePic}/>
        <ProfileName>William Johanson</ProfileName>
        <ProfileEmail>williamjohn@mail.com</ProfileEmail>
        <ContactButton>Contact Us</ContactButton>
      </ProfileSection>
      <Footer>
        <p>Travl Hotel Admin Dashboard</p>
        <p>© 2020 All Rights Reserved</p>
        <p>Made with ♥ by Peterdraw</p>
      </Footer>
    </SidebarContainer>
  );
};

export default Sidebar;
