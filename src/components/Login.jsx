import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from './authContext';
import { FaHotel } from "react-icons/fa";
import users from '../../src/data/users';

const colors = {
  primary: '#135846',
  secondary: '#008489',
  background: '#F7F7F7',
  text: '#333333',
  inputBackground: '#FFFFFF',
  borderColor: '#E6E6E6',
};

const LoginContainer = styled.div`
  height: 100vh;
  background-color: ${colors.background};
  display: grid;
  place-items: center;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: ${colors.inputBackground};
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: ${colors.primary};
  margin-bottom: 1rem;
  text-align: center;
`;

const Input = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid ${colors.borderColor};
  border-radius: 0.25rem;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem;
  background-color: ${colors.primary};
  color: white;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: ${colors.secondary};
  }
`;

const RegisterLink = styled.a`
  margin-top: 1rem;
  color: ${colors.secondary};
  text-align: center;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
  
    const user = users.find(user => user.email === email && user.password === password);
  
    if (user) {
      dispatch({
        type: 'LOGIN',
        payload: user,
      });
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/index');
    } else {
      alert('Invalid credentials');
    }
  };
  
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
  );
};

export default Login;