// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Import your pages
import LoginForm from './components/LoginForm';
import RegisterPage from './pages/RegisterPage'; // <--- Ensure this is imported
import DashboardPage from './pages/Dashboard';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            {/* 1. Login Page (Home) */}
            <Route path="/" element={<LoginForm />} />
            
            {/* 2. Registration Page (The missing link) */}
            <Route path="/register" element={<RegisterPage />} />
            
            {/* 3. Dashboard (Protected) */}
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;