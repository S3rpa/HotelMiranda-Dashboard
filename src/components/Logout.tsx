import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LogoutButton } from './LogoutStyles'

interface LogoutProps {
  setAuth: React.Dispatch<React.SetStateAction<boolean>>
}

const Logout: React.FC<LogoutProps> = ({ setAuth }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('auth')
    setAuth(false)
    navigate('/')
  }

  return <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
}

export default Logout
