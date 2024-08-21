import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { LuLayoutDashboard } from "react-icons/lu";
import { BiKey } from "react-icons/bi";
import { LuCalendarCheck2 } from "react-icons/lu";
import { IoPersonOutline } from "react-icons/io5";
import { PiPuzzlePiece } from "react-icons/pi";
import { PiBuildingFill } from "react-icons/pi";
import profilePic from '../assets/profilepic.jpg';

const SidebarContainer = styled.div`
  width: ${(props) => (props.$isopen ? '20.625rem' : '0')};
  height: 109vh;
  background-color: #FFFFFF;
  box-shadow: ${(props) => (props.$isopen ? '0.125rem 0 0.3125rem rgba(0, 0, 0, 0.1)' : 'none')}; 
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${(props) => (props.$isopen ? '2.85rem 0' : '0')}; 
  overflow: hidden;
  transition: width 0.3s, padding 0.3s;
`;

const Logo = styled.div`
  display: ${(props) => (props.$isopen ? 'flex' : 'none')};
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
  padding-left: 5rem;
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
  border-radius: 0.25rem;
  transition: background-color 0.3s;
  position: relative;

  &.active {
    color: #E23428;

    ${MenuIcon} {
      color: #E23428;
    }

    &::before {
      content: '';
      position: absolute;
      left: -2.5rem;
      top: 0;
      height: 100%;
      width: 0.3125rem;
      background-color: #E23428;
      border-radius: 0 0.25rem 0.25rem 0;
    }
  }

  &:hover {
    ${MenuIcon} {
      color: #E23428;
    }
  }
`;

const ProfileSection = styled.div`
  top: 36.8125rem; 
  left: 3.5rem; 
  width: 12.5rem; 
  height: 13.8125rem; 
  margin-top: auto;
  display: ${(props) => (props.$isopen ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: #FFFFFF;
  border-radius: 1rem;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.14) 0px 1.25rem 1.88rem; 
`;

const ProfileImage = styled.img`
  top: 36.8125rem; 
  left: 8.625rem; 
  width: 4.375rem;
  height: 4.375rem; 
  border-radius: 0.5rem; 
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
  border-radius: 0.5rem;
  opacity: 1;
  top: 46.1875rem; 
  left: 6rem;
  width: 9.875rem; 
  height: 2.9375rem; 
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

const Sidebar = ({ isopen, toggleSidebar }) => {
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
          <StyledNavLink to="/index">
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
      <ProfileSection $isopen={isopen}>
        <ProfileImage src={profilePic} />
        <ProfileName>William Johanson</ProfileName>
        <ProfileEmail>williamjohn@mail.com</ProfileEmail>
        <ContactButton>Edit</ContactButton>
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
