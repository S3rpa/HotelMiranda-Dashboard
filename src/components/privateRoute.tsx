import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from './authContext'

interface PrivateRouteProps {
  children: React.ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { state } = useContext(AuthContext)

    return state.isAuthenticated ? <>{children}</> : <Navigate to="/" />
}

export default PrivateRoute
