import React, { useState, useContext, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './authContext';
import { FaHotel } from 'react-icons/fa';
import { LoginContainer, LoginForm, Title, Input, Button } from './LoginStyles';
import { toast } from 'react-toastify';
import { apiService } from '../utils/apiService';

// No necesitas definir ImportMeta, Vite ya lo maneja automáticamente
// const ImportMeta = { env: { VITE_API_URL: string } }; // Esto no es necesario

const Login: React.FC = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
  
    setLoading(true);
    console.log('Enviando solicitud de login:', { email, password });
    try {
      const apiUrl = (import.meta as any).env.VITE_API_URL || '';  
  
      // Hacer una solicitud POST a la API de login
      const response = await fetch(`${apiUrl}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      console.log('Respuesta del backend:', data);
  
      if (!response.ok) {
        console.error('Error en el inicio de sesión:', data.message || 'Error en la autenticación');
        throw new Error(data.message || 'Error en la autenticación');
      }
  
      // Guardar el token en el localStorage
      console.log('Guardando el token en localStorage:', data.accessToken);
      localStorage.setItem('token', data.accessToken);
  
      // Actualizar el estado de autenticación con dispatch
      dispatch({
        type: 'LOGIN',
        payload: { user: data.user },
      });
  
      // Mostrar mensaje de éxito
      toast.success('Inicio de sesión exitoso');
  
      // Redirigir al dashboard
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Error al iniciar sesión:', error);
      toast.error(error.message || 'Error de red o servidor');
    } finally {
      setLoading(false);
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
          placeholder="Correo electrónico"
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
        <Button type="submit" disabled={loading}>
          {loading ? 'Cargando...' : 'Iniciar Sesión'}
        </Button>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;