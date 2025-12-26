import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useTheme } from '../context/ThemeContext';
import ChangePasswordModal from '../components/ChangePasswordModal';

const Dashboard: React.FC = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    
    // UI States
    const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isProjectsOpen, setIsProjectsOpen] = useState(false);
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
    const [loaded, setLoaded] = useState(false);
    
    const profileRef = useRef<HTMLDivElement>(null);
    const notificationRef = useRef<HTMLDivElement>(null);

    // Mock Data
    const notifications = [
        { id: 1, title: 'New User Registered', time: '5m ago', type: 'info' },
        { id: 2, title: 'Server CPU High', time: '15m ago', type: 'warning' },
        { id: 3, title: 'Deployment Successful', time: '1h ago', type: 'success' },
    ];

    const transactions = [
        { id: '#TRX-9871', user: 'Courtney Henry', avatar: 'C', date: 'Oct 15, 2023', amount: '$2,400.00', status: 'Success', color: 'bg-green-100 text-green-800' },
        { id: '#TRX-9872', user: 'Tom Cook', avatar: 'T', date: 'Oct 16, 2023', amount: '$850.00', status: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
        { id: '#TRX-9873', user: 'Whitney Francis', avatar: 'W', date: 'Oct 16, 2023', amount: '$12,500.00', status: 'Success', color: 'bg-green-100 text-green-800' },
        { id: '#TRX-9874', user: 'Leonard Krasner', avatar: 'L', date: 'Oct 17, 2023', amount: '$600.00', status: 'Failed', color: 'bg-red-100 text-red-800' },
    ];

    useEffect(() => { setLoaded(true); }, []);
    useEffect(() => { if (!user) navigate('/'); }, [user, navigate]);

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            setSidebarOpen(window.innerWidth >= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Handle Click Outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setIsNotificationsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (!user) return null;

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 overflow-hidden font-sans relative">
            
            <ChangePasswordModal 
                isOpen={isChangePasswordOpen} 
                onClose={() => setIsChangePasswordOpen(false)} 
            />

            {/* Mobile Backdrop */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden glass"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside 
                className={`
                    fixed md:static inset-y-0 left-0 z-30
                    bg-white dark:bg-gray-800 shadow-xl 
                    transition-all duration-300 ease-in-out
                    flex flex-col
                    ${isSidebarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full md:w-0 md:translate-x-0 md:overflow-hidden'}
                `}
            >
                <div className={`h-20 flex items-center justify-center border-b border-gray-100 dark:border-gray-700 ${!isSidebarOpen && 'hidden'}`}>
                    <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 tracking-tighter whitespace-nowrap">
                        NexusDash
                    </h1>
                </div>
                
                <nav className={`flex-1 px-4 py-6 space-y-1 overflow-y-auto ${!isSidebarOpen && 'hidden'}`}>
                    {[
                        { name: 'Overview', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
                        { name: 'Analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
                        { name: 'Team', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
                        { name: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.006c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.006 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.006 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.006c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.006c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.006-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.006-2.573c-.94-1.543 .826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.006zM15 12a3 3 0 11-6 0 3 3 0 016 0z' }
                    ].map((item, index) => (
                        <div key={index}>
                            <button className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group whitespace-nowrap ${index === 0 ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'}`}>
                                <svg className={`mr-3 h-5 w-5 ${index === 0 ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 group-hover:text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                </svg>
                                {item.name}
                            </button>
                        </div>
                    ))}
                    
                    {/* Projects Submenu */}
                    <div>
                         <button onClick={() => setIsProjectsOpen(!isProjectsOpen)} className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white rounded-xl transition-all duration-200">
                            <div className="flex items-center">
                                <svg className="mr-3 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                                </svg>
                                Projects
                            </div>
                            <svg className={`w-4 h-4 transition-transform duration-200 ${isProjectsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {isProjectsOpen && (
                            <div className="mt-1 space-y-1 pl-12">
                                <a href="#" className="block px-4 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">Project India</a>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">Project USA</a>
                            </div>
                        )}
                    </div>
                </nav>

                <div className={`p-4 border-t border-gray-100 dark:border-gray-700 ${!isSidebarOpen && 'hidden'}`}>
                     <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl p-4 text-white shadow-lg whitespace-nowrap">
                        <p className="text-xs font-medium opacity-80 uppercase mb-1">Pro Plan</p>
                        <h3 className="text-sm font-bold mb-2">Upgrade to Team</h3>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden relative w-full">
                
                {/* Header */}
                <header className="bg-white dark:bg-gray-800 shadow-sm z-10 h-20 flex items-center justify-between px-4 sm:px-8 transition-colors duration-300">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isSidebarOpen ? "M4 6h16M4 12h16M4 18h7" : "M4 6h16M4 12h16M4 18h16"} />
                            </svg>
                        </button>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Dashboard</h2>
                    </div>
                    
                    <div className="flex items-center gap-2 sm:gap-4">
                        {/* Notifications */}
                        <div className="relative" ref={notificationRef}>
                            <button onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 relative">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>
                            </button>
                            {isNotificationsOpen && (
                                <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl py-2 z-50 border border-gray-100 dark:border-gray-700">
                                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700"><h3 className="text-sm font-bold text-gray-900 dark:text-white">Notifications</h3></div>
                                    <div className="max-h-64 overflow-y-auto">
                                        {notifications.map((notif) => (
                                            <div key={notif.id} className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b border-gray-50 dark:border-gray-700/50">
                                                <p className="text-sm font-medium text-gray-900 dark:text-gray-200">{notif.title}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{notif.time}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Theme Toggle */}
                        <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-yellow-300">
                             {theme === 'dark' ? '☀️' : '🌙'}
                        </button>

                        {/* Profile */}
                        <div className="relative" ref={profileRef}>
                            <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-3">
                                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md">
                                    {user.username.charAt(0).toUpperCase()}
                                </div>
                            </button>
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-2xl py-2 z-50 border border-gray-100 dark:border-gray-700">
                                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                                        <p className="text-xs text-gray-500 font-semibold">Signed in as</p>
                                        <p className="text-sm font-bold text-gray-900 dark:text-white">{user.username}</p>
                                    </div>
                                    <button onClick={() => { setIsChangePasswordOpen(true); setIsProfileOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Change Password</button>
                                    <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">Sign out</button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 sm:p-8 transition-colors duration-300">
                    
                    {/* 1. Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                        {[
                            { label: 'Total Revenue', val: '$54,239', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/30' },
                            { label: 'Active Users', val: '2,453', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30' },
                            { label: 'New Clients', val: '45', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/30' },
                            { label: 'Pending Issues', val: '12', color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-900/30' }
                        ].map((stat, i) => (
                            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`${stat.bg} p-3 rounded-lg`}><span className={`text-xl font-bold ${stat.color}`}>$</span></div>
                                </div>
                                <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-1">{stat.val}</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* 2. Revenue Chart Section (Custom SVG) */}
                    <div className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Revenue Analytics</h3>
                            <select className="bg-gray-50 dark:bg-gray-700 border-none rounded-lg text-sm px-3 py-1 text-gray-600 dark:text-gray-300 focus:ring-0 cursor-pointer">
                                <option>Last 7 Days</option>
                                <option>Last Month</option>
                            </select>
                        </div>
                        <div className="relative h-64 w-full overflow-hidden">
                            {/* SVG Chart */}
                            <svg viewBox="0 0 1000 300" preserveAspectRatio="none" className="w-full h-full">
                                <defs>
                                    <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3"></stop>
                                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0"></stop>
                                    </linearGradient>
                                </defs>
                                {/* Grid Lines */}
                                {[50, 125, 200, 275].map(y => (
                                    <line key={y} x1="0" y1={y} x2="1000" y2={y} stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-gray-700" />
                                ))}
                                {/* The Curve */}
                                <path 
                                    fill="url(#gradient)" 
                                    stroke="#6366f1" 
                                    strokeWidth="4" 
                                    d="M0,250 C100,200 200,280 300,150 S500,50 600,100 S800,20 1000,80 V300 H0 Z" 
                                />
                                {/* Data Points */}
                                {[
                                    {x: 300, y: 150}, {x: 600, y: 100}, {x: 1000, y: 80}
                                ].map((p, i) => (
                                    <circle key={i} cx={p.x} cy={p.y} r="6" fill="#4f46e5" stroke="white" strokeWidth="2" />
                                ))}
                            </svg>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                        {/* 3. Recent Transactions Table */}
                        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Transactions</h3>
                                <button className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold hover:underline">View All</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="text-xs text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
                                            <th className="px-6 py-4 font-semibold uppercase">Transaction ID</th>
                                            <th className="px-6 py-4 font-semibold uppercase">User</th>
                                            <th className="px-6 py-4 font-semibold uppercase">Date</th>
                                            <th className="px-6 py-4 font-semibold uppercase">Amount</th>
                                            <th className="px-6 py-4 font-semibold uppercase">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                        {transactions.map((t, i) => (
                                            <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{t.id}</td>
                                                <td className="px-6 py-4 flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-xs font-bold text-indigo-700 dark:text-indigo-300">
                                                        {t.avatar}
                                                    </div>
                                                    <span className="text-sm text-gray-700 dark:text-gray-300">{t.user}</span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{t.date}</td>
                                                <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white">{t.amount}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${t.color}`}>
                                                        {t.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* 4. Project Status (Existing) */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Project Status</h3>
                            <div className="space-y-6">
                                {[
                                    { name: 'Server Migration', progress: 75, color: 'bg-indigo-500' },
                                    { name: 'App Redesign', progress: 45, color: 'bg-pink-500' },
                                    { name: 'Marketing Campaign', progress: 90, color: 'bg-green-500' },
                                    { name: 'Database Opt.', progress: 20, color: 'bg-yellow-500' },
                                ].map((proj, i) => (
                                    <div key={i}>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{proj.name}</span>
                                            <span className="text-sm font-bold text-gray-500 dark:text-gray-400">{proj.progress}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full ${proj.color} rounded-full transition-all duration-1000 ease-out`}
                                                style={{ width: loaded ? `${proj.progress}%` : '0%' }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
