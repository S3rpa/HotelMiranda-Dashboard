import React, { useState, useContext, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './authContext';
import { FaHotel } from 'react-icons/fa';
import { LoginContainer, LoginForm, Title, Input, Button } from './LoginStyles';
import { toast } from 'react-toastify';
import { apiService } from '../utils/apiService';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp: number;
  userId: string;
  name: string;
  email: string;
}

const Login: React.FC = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
  
    const loginData = { email, password };
    setLoading(true);

    const { data, error } = await apiService<{ accessToken: string; user: { id: string; email: string; name: string; } }>('/api/login', 'POST', loginData);

    if (error) {
      toast.error(error);
      setLoading(false);
      return;
    }

    // Si el login es exitoso y recibes un token
    if (data?.accessToken) {
      // Guardar el token en localStorage
      localStorage.setItem('token', data.accessToken);

      // Decodificar el token para obtener los datos del usuario
      const decodedToken: DecodedToken = jwtDecode<DecodedToken>(data.accessToken);

      // Despachar la acción con el usuario decodificado
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user: decodedToken } });

      // Mostrar mensaje de éxito y redirigir al dashboard
      toast.success('Inicio de sesión exitoso');
      navigate('/dashboard'); // Redirección al dashboard
    }

    setLoading(false);
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