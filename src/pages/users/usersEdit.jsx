import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../components/authContext';
import { users } from '../../../db.json';

const Container = styled.div`
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 0.75rem;
  background-color: #135846;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0a3c29;
  }
`;

const UsersEdit = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (id) {
        const foundUser = users.find((u) => u.id === parseInt(id));
        if (foundUser) {
            setUser(foundUser);
        } else {
            console.error("User not found with ID:", id);
        }
    } else {
        console.error("No ID provided in URL");
    }
}, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      users[user.id - 1] = user;
      dispatch({ type: 'UPDATE_USER', payload: user });
      alert('Perfil actualizado!');
      navigate('/index');
    }
  };

  if (!user) {
    return <p>Cargando datos del usuario...</p>;
  }

  return (
    <Container>
      <Title>Edit User</Title>
      <Form onSubmit={handleSubmit}>
        <Label>Nombre:</Label>
        <Input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
        />
        <Label>Email:</Label>
        <Input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
        <Label>Teléfono:</Label>
        <Input
          type="tel"
          name="phone"
          value={user.phone}
          onChange={handleChange}
        />
        <Button type="submit">Actualizar Perfil</Button>
      </Form>
    </Container>
  );
};

export default UsersEdit;
