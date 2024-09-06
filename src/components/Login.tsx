import React, { useState, useContext, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './authContext'
import { FaHotel } from "react-icons/fa"
import users from '../../src/data/users'
import { LoginContainer,LoginForm,Title, Input,Button,RegisterLink} from './LoginStyles'



const Login: React.FC = () => {
  const { dispatch } = useContext(AuthContext)
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleLogin = (e: FormEvent) => {
    e.preventDefault()
  
    const user = users.find(user => user.email === email && user.password === password)
  
    if (user) {
      dispatch({
        type: 'LOGIN',
        payload: user,
      })
      localStorage.setItem('user', JSON.stringify(user))
      navigate('/dashboard')
    } else {
      alert('Invalid credentials')
    }
  }
  
  return (
    <LoginContainer>
      <LoginForm onSubmit={handleLogin}>
        <Title>
          <FaHotel />
        </Title>
        <Input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
        <RegisterLink href="/register">Don't have an account? Register</RegisterLink>
      </LoginForm>
    </LoginContainer>
  )
}

export default Login
