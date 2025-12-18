import React, { useState } from 'react';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Call the authentication service to validate credentials
        const isValid = await validateCredentials(username, password);
        if (!isValid) {
            setError('Invalid username or password');
        } else {
            // Handle successful login (e.g., redirect or update state)
        }
    };

    const validateCredentials = async (username: string, password: string) => {
        // Placeholder for actual authentication logic
        // This should call the auth service to validate the credentials
        return username === 'test' && password === 'password'; // Example validation
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;