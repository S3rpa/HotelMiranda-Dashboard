import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CreateUser } from '../../../features/users/usersThunk';
import { useNavigate } from 'react-router-dom';

const NewUser = () => {
    const [user, setUser] = useState({
        name: '',
        work: '',
        telephone: '',
        schedule: '',
        status: 'INACTIVE',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(CreateUser(user));
        navigate('/users');
    };

    return (
        <div>
            <h2>Create New User</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input type="text" name="name" value={user.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Job Desk</label>
                    <input type="text" name="work" value={user.work} onChange={handleChange} required />
                </div>
                <div>
                    <label>Telephone</label>
                    <input type="tel" name="telephone" value={user.telephone} onChange={handleChange} required />
                </div>
                <div>
                    <label>Schedule</label>
                    <input type="text" name="schedule" value={user.schedule} onChange={handleChange} />
                </div>
                <div>
                    <label>Status</label>
                    <select name="status" value={user.status} onChange={handleChange}>
                        <option value="ACTIVE">Active</option>
                        <option value="INACTIVE">Inactive</option>
                    </select>
                </div>
                <button type="submit">Create User</button>
            </form>
        </div>
    );
};

export default NewUser;
