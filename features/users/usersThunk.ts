import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../src/interfaces/userInterfaces';
import users from '../../src/data/users';

export const GetUsers = createAsyncThunk("users/getUsers", async () => {
    return users;
});

export const DeleteUser = createAsyncThunk('users/deleteUser', async (userId: number) => {
    const index = users.findIndex(user => user.id === userId);
    if (index !== -1) {
        users.splice(index, 1);
        return userId;
    } else {
        throw new Error(`Failed to delete user with id ${userId}`);
    }
});

export const GetUser = createAsyncThunk('users/getUser', async (id: number) => {
    const user = users.find(user => user.id === id);
    if (user) {
        return user;
    } else {
        throw new Error(`User with id ${id} not found`);
    }
});

export const EditUser = createAsyncThunk("users/editUser", async (updatedUser: User) => {
    const usersCopy = [...users];
    const index = usersCopy.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
        usersCopy[index] = { ...usersCopy[index], ...updatedUser };
        return usersCopy[index];
    } else {
        throw new Error(`Failed to update user with id ${updatedUser.id}`);
    }
});

export const CreateUser = createAsyncThunk('users/createUser', async (newUser: User) => {
    const newId = users.length ? users[users.length - 1].id + 1 : 1;
    const userToAdd = { ...newUser, id: newId };
    users.push(userToAdd);
    return userToAdd;
});
