import { createContext, useReducer, useEffect, useState, ReactNode } from 'react';
import * as jwt_decode from 'jwt-decode';

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
    type: 'LOGIN' | 'LOGOUT';
    payload?: { user: DecodedToken };
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN':
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

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {

            try {
                const decodedToken: DecodedToken = (jwt_decode as any).default(token);
                const currentTime = Date.now() / 1000;
                if (decodedToken.exp < currentTime) {
                    // El token ha expirado
                    localStorage.removeItem('token');
                    setLoading(false);
                } else {
                    dispatch({ type: 'LOGIN', payload: { user: decodedToken } });
                    setLoading(false);
                }
            } catch (error) {
                // Si hay un error al decodificar el token
                localStorage.removeItem('token');
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
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