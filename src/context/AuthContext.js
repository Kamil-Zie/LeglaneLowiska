import React, { createContext, useState, useContext } from 'react';
import axios from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const signIn = async (email, password) => {
        try {
            // Zakładając, że endpoint readUser jest podpięty pod /readUser lub /users
            const response = await axios.post('/users/signin', { email, password });
            setUser(response.data.user);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const signUp = async (email, password) => {
        try {
            // Zakładając, że endpoint createUser jest podpięty pod /createUser lub /users
            const response = await axios.post('/users/signup', { email, password });
            setUser(response.data.user);
            return response.data;
        } catch (error) {
            throw error;
        }
    };


    const signOut = async () => {
        try {
            await axios.post('/users/signout');
            setUser(null);
            localStorage.removeItem('LegalneLowiskaToken');
        } catch (error) {
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);