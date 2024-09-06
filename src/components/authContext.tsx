import { createContext, useReducer, useEffect, useState, ReactNode } from 'react'

interface AuthState {
    isAuthenticated: boolean
    user: any
}

interface AuthAction {
    type: 'LOGIN' | 'LOGOUT'
    payload?: any
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
}

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            }
        case 'LOGOUT':
            localStorage.removeItem('user')
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            }
        default:
            return state
    }
}

export const AuthContext = createContext<{
    state: AuthState
    dispatch: React.Dispatch<AuthAction>
}>({
    state: initialState,
    dispatch: () => null,
})

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user') || 'null')

        if (storedUser) {
            dispatch({ type: 'LOGIN', payload: storedUser })
        }
        setLoading(false)
    }, [])

    if (loading) {
        return null
    }

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}
