import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import useAuth from '../hooks/useAuth';

// Data structure for the Ecosystem
const legacies = [
    { id: 'corporate', name: 'The Corporate Hub', domain: 'thelegacywealthcompany.com', color: 'bg-slate-800', border: 'border-slate-800', text: 'text-slate-800' },
    { id: 'realty', name: 'Real Estate Powerhouse', domain: 'legacyrealtydfw.com', color: 'bg-emerald-600', border: 'border-emerald-600', text: 'text-emerald-600' },
    { id: 'lending', name: 'Mortgage Made Simple', domain: 'legacywealthlending.com', color: 'bg-teal-600', border: 'border-teal-600', text: 'text-teal-600' },
    { id: 'finance', name: 'Financial Services Hub', domain: 'legacywealth.finance', color: 'bg-cyan-700', border: 'border-cyan-700', text: 'text-cyan-700' },
    { id: 'founder', name: "The Founder's Platform", domain: 'suhailsab.com', color: 'bg-yellow-600', border: 'border-yellow-600', text: 'text-yellow-600' },
    { id: 'leaders', name: 'Team Training & Dev', domain: 'legacyleaders.club', color: 'bg-indigo-600', border: 'border-indigo-600', text: 'text-indigo-600' },
    { id: 'portal', name: 'The Customer Portal', domain: 'mylegacyportal.com', color: 'bg-teal-500', border: 'border-teal-500', text: 'text-teal-500' },
    { id: 'office', name: 'The Team Operations Hub', domain: 'mylegacyoffice.com', color: 'bg-slate-600', border: 'border-slate-600', text: 'text-slate-600' },
];

const LoginPage: React.FC = () => {
    // 1. Add Auth Hook and Navigation
    const { user } = useAuth();
    const navigate = useNavigate();
    
    // 2. Default to the first legacy
    const [selectedId, setSelectedId] = useState(legacies[0].id);
    
    // 3. Find the full object based on selection
    const currentLegacy = legacies.find(l => l.id === selectedId) || legacies[0];

    // 4. LISTEN FOR LOGIN SUCCESS (Redirect to Dashboard)
    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-100 to-gray-200 transition-colors duration-500">
            
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                {/* Dynamic Icon */}
                <div className={`mx-auto h-16 w-16 ${currentLegacy.color} rounded-xl flex items-center justify-center shadow-lg transition-colors duration-300`}>
                    <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                </div>
                
                <h2 className={`mt-6 text-center text-3xl font-extrabold ${currentLegacy.text} transition-colors duration-300 font-serif`}>
                    {currentLegacy.name}
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600 font-mono">
                    {currentLegacy.domain}
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className={`bg-white py-8 px-4 shadow-2xl sm:rounded-xl sm:px-10 border-t-4 ${currentLegacy.border} transition-colors duration-300`}>
                    
                    {/* DROPDOWN SECTION (Before Username) */}
                    <div className="mb-6">
                        <label htmlFor="legacy-select" className="block text-sm font-medium text-gray-700 mb-1">
                            Select Portal
                        </label>
                        <div className="relative">
                            <select
                                id="legacy-select"
                                value={selectedId}
                                onChange={(e) => setSelectedId(e.target.value)}
                                className="block w-full pl-3 pr-10 py-2.5 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-gray-50 border transition-shadow shadow-sm hover:shadow-md cursor-pointer appearance-none"
                            >
                                {legacies.map((legacy) => (
                                    <option key={legacy.id} value={legacy.id}>
                                        {legacy.name}
                                    </option>
                                ))}
                            </select>
                            
                            {/* Custom arrow icon for better style */}
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* EXISTING LOGIN FORM (Username & Password) */}
                    <LoginForm />
                    
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
