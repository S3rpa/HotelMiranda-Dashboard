import React from 'react';
import styled from 'styled-components';
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

const TopBar = ({ setAuth, toggleSidebar }) => {
  const handleLogout = () => {
    localStorage.removeItem('auth');
    setAuth(false);
  };

  return (
    <TopBarContainer>
      <IconButton onClick={toggleSidebar}>
        <HiMenuAlt2 />
      </IconButton>
      <IconButton onClick={handleLogout}>
        <IoLogOutOutline />
      </IconButton>
    </TopBarContainer>
  );
};

export default TopBar;
