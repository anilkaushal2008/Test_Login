// src/hooks/useAuth.ts
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { login as loginService } from '../services/auth'; 

const useAuth = () => {
    const { user, setUser, logout: contextLogout } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // FIX: We explicitly define 2 arguments here to match your Login Form
    const login = async (username: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            // We pass those 2 arguments to the service
            const response = await loginService(username, password);
            setUser(response.user);
        } catch (err: any) {
            setError(err.message || 'Login failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        contextLogout();
        setUser(null);
    };

    return { user, login, logout, loading, error };
};

export default useAuth;