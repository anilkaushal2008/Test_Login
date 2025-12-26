// src/services/auth.ts
import axios from 'axios';
import { AuthResponse } from '../types';

const API_URL = 'http://localhost:5000/api';

export const login = async (username: string, password: string): Promise<AuthResponse> => {
    try {
        const response = await axios.post(`${API_URL}/login`, { username, password });
        return response.data;
    } catch (error) {
        throw new Error('Login failed.');
    }
};

// --- THIS PART IS CRITICAL FOR REGISTRATION ---
export const register = async (username: string, password: string, email: string): Promise<void> => {
    try {
        await axios.post(`${API_URL}/register`, { username, password, email });
    } catch (error) {
        throw new Error('Registration failed.');
    }
};