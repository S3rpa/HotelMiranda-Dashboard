import { createAsyncThunk } from '@reduxjs/toolkit';

const baseURL = 'https://my-json-server.typicode.com/S3rpa/HotelMiranda-Dashboard';

export const GetUsers = createAsyncThunk('users/getUsers', async () => {
    const response = await fetch(`${baseURL}/users`);
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error('Failed to fetch users');
    }
});


export const GetUser = createAsyncThunk('users/getUser', async (id) => {
    const response = await fetch(`${baseURL}/users/${id}`);
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error(`Failed to fetch user with id ${id}`);
    }
});

export const EditUser = createAsyncThunk(
    'users/editUser',
    async (updatedUser) => {
        const response = await fetch(`${baseURL}/users/${updatedUser.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            dataType: 'json',
            body: JSON.stringify(updatedUser),
        })
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error('Could not reach server: ' + response.status);
                }
                return response.json();
            })
            .catch((error) => {
                throw new Error(error);
            });
        return response;
    }
);

export const DeleteUser = createAsyncThunk(
    'users/deleteUser',
    async (userId) => {
        const response = await fetch(`${baseURL}/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            dataType: 'json',
        })
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error('Could not reach server: ' + response.status);
                }
                return userId;
            })
            .catch((error) => {
                throw new Error(error);
            });
        return response;
    }
);

export const CreateUser = createAsyncThunk(
    'users/createUser',
    async (newUser) => {
        const response = await fetch(`${baseURL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            dataType: 'json',
            body: JSON.stringify(newUser),
        });

        if (response.status >= 400) {
            throw new Error('Could not reach server: ' + response.status);
        }

        const createdUser = await response.json();
        return createdUser;
    }
);