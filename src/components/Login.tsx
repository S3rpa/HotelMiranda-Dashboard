import React, { useState, useContext, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './authContext';
import { FaHotel } from 'react-icons/fa';
import { LoginContainer, LoginForm, Title, Input, Button, RegisterLink } from './LoginStyles';

const Login: React.FC = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
      }

      // Guardar el token en localStorage
      localStorage.setItem('token', data.token);

      // Actualizar el contexto de autenticación si es necesario
      dispatch({
        type: 'LOGIN',
        payload: data.user,
      });

      // Navegar al dashboard
      navigate('/dashboard');
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleLogin}>
        <Title>
          <FaHotel />
        </Title>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Iniciar Sesión</Button>
        <RegisterLink href="/register">¿No tienes una cuenta? Regístrate</RegisterLink>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;