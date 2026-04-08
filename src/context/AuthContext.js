import { createContext, useState, useContext, useEffect } from 'react';
import axios from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const storedUserId = localStorage.getItem('userId') || sessionStorage.getItem('userId');
            if (storedUserId) {
                try {
                    const response = await axios.get(`/users/${storedUserId}`);
                    setUser(response.data.user);
                } catch (error) {
                    console.error("Auto-login failed:", error);
                    localStorage.removeItem('userId');
                    sessionStorage.removeItem('userId');
                }
            }
            setLoading(false);
        };
        checkUser();
    }, []);

    const signIn = async (email, password, rememberMe, turnstileToken) => {
        try {
            const response = await axios.post('/users/signin', { email, password, turnstileToken });
            const loggedInUser = response.data.user;
            setUser(loggedInUser);
            if (rememberMe) {
                localStorage.setItem('userId', loggedInUser._id);
            } else {
                sessionStorage.setItem('userId', loggedInUser._id);
            }

            return response.data;
        } catch (error) {
            console.error("Sign-in error:", error);
            throw error;
        }
    };

    const signUp = async (email, password, rememberMe, turnstileToken) => {
        try {
            const response = await axios.post('/users/signup', { email, password, turnstileToken });
            const loggedInUser = response.data.user;
            setUser(loggedInUser);

            if (rememberMe) {
                localStorage.setItem('userId', loggedInUser._id);
            } else {
                sessionStorage.setItem('userId', loggedInUser._id);
            }

            return response.data;
        } catch (error) {
            console.error("Sign-up error:", error);
            throw error;
        }
    };

    const signOut = async () => {
        try {
            await axios.post('/users/signout');
            setUser(null);
            localStorage.removeItem('userId');
            sessionStorage.removeItem('userId');
        } catch (error) {
            console.error("Sign-out error:", error);
        }
    };

    const updateUser = (updatedUser) => {
        setUser(updatedUser);
    };

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, updateUser }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);