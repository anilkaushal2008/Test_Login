import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuth = () => {
    const { setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (credentials) => {
        setLoading(true);
        setError(null);
        try {
            // Call the authentication service to validate credentials
            const response = await authService.login(credentials);
            setUser(response.user);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
    };

    return { login, logout, loading, error };
};

export default useAuth;