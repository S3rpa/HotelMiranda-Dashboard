import styled from 'styled-components';
import { useLocation, useNavigate, matchPath } from 'react-router-dom';
import { HiMenuAlt2 } from "react-icons/hi";
import { IoLogOutOutline, IoArrowBack } from "react-icons/io5";

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

const PageTitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
`;

const PageTitle = styled.div`
  font-size: 1.2rem;
  color: #333;
  margin-left: 0.5rem; /* Espacio entre la flecha y el título */
`;

const TopBar = ({ setAuth, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const pageTitles = {
    '/index': 'Dashboard',
    '/rooms': 'Rooms',
    '/bookings': 'Bookings',
    '/contact': 'Contact',
    '/users': 'Users',
  };

  const getPageTitle = () => {
    if (matchPath('/bookings/:id', location.pathname)) {
      return 'Booking Details';
    } else if (matchPath('/users/edit/:id', location.pathname)) {
      return 'Edit User';
    } else {
      return pageTitles[location.pathname] || 'Unknown Page';
    }
  };

  const shouldShowBackButton = () => {
    return matchPath('/bookings/:id', location.pathname) || 
           matchPath('/users/edit/:id', location.pathname);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth');
    setAuth(false);
  };

  const handleBackClick = () => {
    navigate(-1); 
  };

  return (
    <TopBarContainer>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={toggleSidebar}>
          <HiMenuAlt2 />
        </IconButton>
        <PageTitleContainer>
          {shouldShowBackButton() && (
            <IconButton onClick={handleBackClick}>
              <IoArrowBack />
            </IconButton>
          )}
          <PageTitle>{getPageTitle()}</PageTitle>
        </PageTitleContainer>
      </div>
      <IconButton onClick={handleLogout}>
        <IoLogOutOutline />
      </IconButton>
    </TopBarContainer>
  );
};

export default TopBar;
