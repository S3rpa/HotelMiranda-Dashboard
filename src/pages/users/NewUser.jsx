import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CreateUser } from '../../../features/users/usersThunk';
import { unwrapResult } from '@reduxjs/toolkit';

const Container = styled.div`
  padding: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin: 0.5rem 0;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #135846;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0a3c29;
  }
`;

const NewUser = () => {
    const [name, setName] = useState('');
    const [work, setWork] = useState('');
    const [schedule, setSchedule] = useState('');
    const [telephone, setTelephone] = useState('');
    const [state, setState] = useState('ACTIVE');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !work || !schedule || !telephone || !state) {
            alert('All fields are required');
            return;
        }

        const newUser = {
            name,
            work,
            schedule,
            telephone,
            state,
        };
        dispatch(CreateUser(newUser))
            .then(unwrapResult)
            .then((response) => {
                alert('User added successfully!');
                navigate('/users');
            })
            .catch((error) => {
                console.error('Error creating user:', error);
                alert(`Failed to add user: ${error.message}`);
            });
    };

    return (
        <Container>
            <h2>Create New User</h2>
            <Form onSubmit={handleSubmit}>
                <Label>User Name</Label>
                <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <Label>Job Desk</Label>
                <Input
                    type="text"
                    value={work}
                    onChange={(e) => setWork(e.target.value)}
                    required
                />
                <Label>Schedule</Label>
                <Input
                    type="text"
                    value={schedule}
                    onChange={(e) => setSchedule(e.target.value)}
                    required
                />
                <Label>Contact Number</Label>
                <Input
                    type="tel"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    required
                />

                <Label>Status</Label>
                <Select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                >
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                </Select>
                <Button type="submit">Add User</Button>
            </Form>
        </Container>
    );
};

export default NewUser;
