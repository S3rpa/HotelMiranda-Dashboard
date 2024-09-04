import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { EditUser, CreateUser } from '../../../features/users/usersThunk';

const Container = styled.div`
  padding: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: white;
  background-color: #135846;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0a3c29;
  }
`;

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const users = useSelector((state) => state.users.data);

  useEffect(() => {
    const foundUser = users.find((u) => u.id === parseInt(id));
    if (foundUser) {
      setUser({ ...foundUser }); 
    }
  }, [id, users]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(EditUser(user));
      unwrapResult(resultAction);
      alert('User updated successfully!');
      navigate('/users');
    } catch (error) {
      console.error('Failed to update user:', error);
      alert('Failed to update user.');
    }
  };

  if (!user && id) return <p>Loading...</p>;

  return (
    <Container>
      <h1>{id ? 'Update User' : 'Create User'}</h1>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          placeholder="User Name"
          required
        />
        <Input
          type="text"
          name="work"
          value={user.work}
          onChange={handleChange}
          placeholder="Job Desk"
          required
        />
        <Input
          type="text"
          name="schedule"
          value={user.schedule}
          onChange={handleChange}
          placeholder="Schedule"
          required
        />
        <Input
          type="tel"
          name="telephone"
          value={user.telephone}
          onChange={handleChange}
          placeholder="Contact Number"
          required
        />
        <Input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email Address"
          required
        />
        <Input
          type="date"
          name="start_date"
          value={user.start_date}
          onChange={handleChange}
          placeholder="Start Date"
          required
        />
        <Input
          type="text"
          name="description"
          value={user.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <Input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <Select name="state" value={user.state} onChange={handleChange} required>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </Select>
        <Button type="submit">{id ? 'Update User' : 'Create User'}</Button>
      </Form>
    </Container>
  );
};

export default UserEdit;
