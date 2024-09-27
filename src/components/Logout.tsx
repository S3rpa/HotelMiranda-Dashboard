import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoutButton } from './LogoutStyles';
import { AuthContext } from './authContext';

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    // Eliminar el token del localStorage
    localStorage.removeItem('token');

    // Actualizar el contexto de autenticación
    dispatch({ type: 'LOGOUT' });

    // Redirigir al usuario a la página de inicio de sesión
    navigate('/login');
  };

  return <LogoutButton onClick={handleLogout}>Cerrar Sesión</LogoutButton>;
};

export default Logout;