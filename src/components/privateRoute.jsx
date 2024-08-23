import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './authContext';

const PrivateRoute = ({ children }) => {
  const { state } = useContext(AuthContext);

  if (!state.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
