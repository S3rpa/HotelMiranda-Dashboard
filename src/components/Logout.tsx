import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoutButton } from './LogoutStyles';
import { AuthContext } from './authContext';

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem('token');

    dispatch({ type: 'LOGOUT' });

    navigate('/login');
  };

  return <LogoutButton onClick={handleLogout}>Cerrar Sesión</LogoutButton>;
};

export default Logout;