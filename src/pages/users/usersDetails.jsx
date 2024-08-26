// usersDetails.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GetUser } from '../../../features/users/usersThunk';

const UsersDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.selectedUser);
    const status = useSelector((state) => state.users.status);

    useEffect(() => {
        if (id) {
            dispatch(GetUser(id));
        }
    }, [dispatch, id]);

    if (status === 'loading') {
        return <div>Loading user...</div>;
    }

    if (status === 'failed') {
        return <div>Error loading user.</div>;
    }

    return (
        <div>
            <h1>User Details</h1>
            {user ? (
                <div>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Telephone: {user.telephone}</p>
                </div>
            ) : (
                <p>No user found.</p>
            )}
        </div>
    );
};

export default UsersDetail;
