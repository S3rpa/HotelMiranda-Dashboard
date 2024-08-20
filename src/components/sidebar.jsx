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
  width: ${(props) => (props.$isopen ? '18.625rem' : '0')}; /* 250px */
  height: 100vh;
  background-color: #FFFFFF;
  box-shadow: ${(props) => (props.$isopen ? '0.125rem 0 0.3125rem rgba(0, 0, 0, 0.1)' : 'none')}; /* 2px 0 5px */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${(props) => (props.$isopen ? '2.85rem 0' : '0')}; /* Mantener en rem */
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
  border-radius: 0.25rem; /* 4px */
  transition: background-color 0.3s;

  &.active {
    border-left: 0.3125rem solid #E23428; /* 5px */
    color: #E23428;

    ${MenuIcon} {
      color: #E23428; 
    }
  }

  &:hover {
    ${MenuIcon} {
      color: #E23428;
    }
  }
`;

const ProfileSection = styled.div`
  top: 36.8125rem; /* 589px */
  left: 3.5rem; /* 56px */
  width: 12.5rem; /* 200px */
  height: 13.8125rem; /* 221px */
  margin-top: auto;
  display: ${(props) => (props.$isopen ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: #FFFFFF;
  border-radius: 1rem;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.14) 0px 1.25rem 1.88rem; /* 6px 12px 35px 8px */
`;

const ProfileImage = styled.img`
  top: 36.8125rem; /* 589px */
  left: 8.625rem; /* 138px */
  width: 4.375rem; /* 70px */
  height: 4.375rem; /* 70px */
  border-radius: 0.5rem; /* 8px */
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
  border-radius: 0.5rem; /* 8px */
  opacity: 1;
  top: 46.1875rem; /* 739px */
  left: 6rem; /* 96px */
  width: 9.875rem; /* 158px */
  height: 2.9375rem; /* 47px */
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
      <ProfileSection $isopen={isopen}>
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
