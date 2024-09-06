import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const LogoutButton = styled.button`
  padding: 0.75rem
  background-color: #FF385C
  color: white
  border: none
  border-radius: 0.25rem
  font-size: 1rem
  cursor: pointer

  &:hover {
    background-color: #008489
  }
`

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
