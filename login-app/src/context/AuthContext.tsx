// src/context/AuthContext.tsx
import React, { createContext, useState, ReactNode } from 'react';
import { User } from '../types';

// 1. FIX: Add 'logout' to the interface definition
interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    logout: () => void; 
}

// 2. Add 'logout' to the default empty context
export const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => {},
    logout: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    // 3. Define the actual logout function
    const logout = () => {
        setUser(null);
    };

    return (
        // 4. Pass 'logout' to the Provider value
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};