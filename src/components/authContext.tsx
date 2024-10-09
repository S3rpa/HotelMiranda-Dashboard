import { createContext, useReducer, useEffect, useState, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface DecodedToken {
    exp: number;
    userId: string;
    name: string;
    email: string; 
}

interface AuthState {
    isAuthenticated: boolean;
    user: DecodedToken | null;
}

interface AuthAction {
    type: 'LOGIN' | 'LOGOUT' | 'LOGIN_SUCCESS';
    payload?: { user: DecodedToken };
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload?.user || null,
            };
        case 'LOGOUT':
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };
        default:
            return state;
    }
};

// Contexto de autenticación
export const AuthContext = createContext<{
    state: AuthState;
    dispatch: React.Dispatch<AuthAction>;
}>({
    state: initialState,
    dispatch: () => null,
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token);
          dispatch({ type: 'LOGIN_SUCCESS', payload: { user: decodedToken } });
        }
        setLoading(false);
      }, []); 

    if (loading) {
        return null;
    }

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};