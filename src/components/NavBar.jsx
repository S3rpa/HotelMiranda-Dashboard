import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { HiMenuAlt2 } from "react-icons/hi";
import { IoLogOutOutline } from "react-icons/io5";

const TopBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const IconButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;

  &:hover {
    color: #FF385C;
  }
`;

const PageTitle = styled.div`
  font-size: 1.2rem;
  color: #333;
  margin-left: 1rem;
`;

const TopBar = ({ setAuth, toggleSidebar }) => {
  const location = useLocation(); // Obtiene la ubicación actual

  const pageTitles = {
    '/index': 'Dashboard',
    '/rooms': 'Room',
    '/bookings': 'Bookings',
    '/guests': 'Guest',
    '/concierge': 'Concierge',
   
  };

  const handleLogout = () => {
    localStorage.removeItem('auth');
    setAuth(false);
  };

  return (
    <TopBarContainer>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={toggleSidebar}>
          <HiMenuAlt2 />
        </IconButton>
        <PageTitle>{pageTitles[location.pathname]}</PageTitle>
      </div>
      <IconButton onClick={handleLogout}>
        <IoLogOutOutline />
      </IconButton>
    </TopBarContainer>
  );
};

export default TopBar;
