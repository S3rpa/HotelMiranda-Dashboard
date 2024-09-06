import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CreateUser } from '../../../features/users/usersThunk';
import { unwrapResult } from '@reduxjs/toolkit';
import { AppDispatch } from '../../../app/store';
import { Container, Form, Label, Input, Select, Button } from '../../components/newUserStyles';
import { User } from '../../interfaces/userInterfaces';

const NewUser: React.FC = () => {
    const [name, setName] = useState('');
    const [work, setWork] = useState('');
    const [schedule, setSchedule] = useState('');
    const [telephone, setTelephone] = useState('');
    const [state, setState] = useState<'ACTIVE' | 'INACTIVE'>('ACTIVE');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [password, setPassword] = useState('');
    const [startDate, setStartDate] = useState('');

    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name || !work || !schedule || !telephone || !email || !description || !password || !startDate) {
            alert('All fields are required');
            return;
        }

        const newUser: User = {
            id: 0,  // This will be replaced by the backend
            name,
            work,
            schedule,
            photo: [], // Assuming this will be empty for now
            email,
            telephone,
            start_date: startDate,
            description,
            state,
            password,
        };

        try {
            const resultAction = await dispatch(CreateUser(newUser));
            const result = unwrapResult(resultAction); // Handle the result
            alert('User added successfully!');
            navigate('/users');
        } catch (error) {
            console.error('Error creating user:', error);
            alert(`Failed to add user: ${error}`);
        }
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
                <Label>Email</Label>
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Label>Description</Label>
                <Input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <Label>Password</Label>
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Label>Start Date</Label>
                <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                />
                <Label>Status</Label>
                <Select
                    value={state}
                    onChange={(e) => setState(e.target.value as 'ACTIVE' | 'INACTIVE')}
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
