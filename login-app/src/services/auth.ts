import axios from 'axios';
import { AuthResponse } from '../types';

const API_URL = 'https://your-api-url.com/api'; // Replace with your actual API URL

export const login = async (username: string, password: string): Promise<AuthResponse> => {
    try {
        const response = await axios.post(`${API_URL}/login`, { username, password });
        return response.data;
    } catch (error) {
        throw new Error('Login failed. Please check your credentials.');
    }
};

export const logout = async (): Promise<void> => {
    try {
        await axios.post(`${API_URL}/logout`);
    } catch (error) {
        throw new Error('Logout failed. Please try again.');
    }
};