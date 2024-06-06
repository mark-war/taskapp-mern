import React, { createContext, useState, useEffect } from 'react';
import api from '../utils/api'; // Import the configured axios instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);

        // If token exists, fetch user data from the server and set it as the current user
        if (token) {
            fetchUserData(token);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUserData = async () => {
        try {
            // Fetch user data from the server using the token
            const response = await api.get('/user/me');
            if (response.status === 200) {
                setCurrentUser(response.data); // Set the fetched user data as the current user                
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false); // Set loading to false once data is fetched or on error
        }
    };

    const login = async (token) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
        setLoading(true);
        await fetchUserData();
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, currentUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
