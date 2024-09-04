import { createAsyncThunk } from '@reduxjs/toolkit';
import users from '../../src/data/users';

export const GetUsers = createAsyncThunk("users/getUsers", async () => {
    return users;
}
);


export const GetUser = createAsyncThunk('users/getUser', async (id) => {
    const user = users.find(user => user.id === id);
    if (user) {
        return user;
    } else {
        throw new Error(`User with id ${id} not found`);
    }
});

export const EditUser = createAsyncThunk("users/editUser", async (updatedUser) => {
        const usersCopy = [...users];

        const index = usersCopy.findIndex(user => user.id === updatedUser.id);
        if (index !== -1) {
            usersCopy[index] = { ...usersCopy[index], ...updatedUser };
            return usersCopy[index];
        } else {
            throw new Error(`Failed to update user with id ${updatedUser.id}`);
        }
    }
);

export const DeleteUser = createAsyncThunk('users/deleteUser', async (userId) => {
    const index = users.findIndex(user => user.id === userId);
    if (index !== -1) {
        users.splice(index, 1);
        return userId;
    } else {
        throw new Error(`Failed to delete user with id ${userId}`);
    }
});


export const CreateUser = createAsyncThunk('users/createUser', async (newUser) => {

      const newId = users.length ? users[users.length - 1].id + 1 : 1;
      const userToAdd = { ...newUser, id: newId };
      
      users.push(userToAdd); 
      return userToAdd;
    }
  );