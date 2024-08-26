import React, { createContext, useReducer, useEffect } from 'react';

const initialState = {
    isAuthenticated: false,
    user: null,
};

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };
        case 'LOGOUT':
            localStorage.removeItem('user');
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };
        case 'UPDATE_USER':
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        
        if (storedUser) {
            dispatch({ type: 'LOGIN', payload: storedUser });
        }
    }, []);

    useEffect(() => {
        if (state.isAuthenticated) {
            localStorage.setItem('user', JSON.stringify(state.user));
        }
    }, [state.user]);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};