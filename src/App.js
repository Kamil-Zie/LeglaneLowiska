import './App.css';
import React, { useState, useEffect, useMemo } from 'react';
import SignIn from './components/SignComponent/SignIn';
import SignUp from './components/SignComponent/SignUp';
import WebPage from './components/WebPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Mapy from './components/WebPage/Mapy';
import MojeLowiska from './components/WebPage/Mojelowiska';
import Profil from './components/WebPage/Profil'; 
import Portal from './components/WebPage/Portal';
import KupLicencje from './components/WebPage/KupLicencje';
import Friends from './components/WebPage/Friends';
import Ranking from './components/WebPage/Ranking';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from '@mui/material/styles';
import { getTheme } from './theme';
import axios from './api/axios';
import AdminPanel from './components/AdminPanel';

export const ThemeContext = React.createContext();

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
}

const fetchLowiska = async () => {
  try {
    await axios.get(`/lowiska`, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    }).then(response => {
      localStorage.setItem('lowiska', JSON.stringify(response.data.lowiska));
    });
  } catch (error) {
    console.error("Error fetching lowiska:", error);
  }
};

const fetchOkregi = async () => {
  try {
    await axios.get(`/okregi`, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    }).then(response => {
      localStorage.setItem('okregi', JSON.stringify(response.data.okregi));
    });
  } catch (error) {
    console.error("Error fetching okregi:", error);
  }
};

function App() {
  const [mode, setMode] = useState(localStorage.getItem('themeMode') || 'light');
  const theme = useMemo(() => getTheme(mode), [mode]);

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode]);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    fetchLowiska();
    fetchOkregi();
  }, []);

  return (
    <ThemeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<SignIn/>} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/webpage" element={<ProtectedRoute><WebPage/></ProtectedRoute>} />
              <Route path="/mapy" element={<ProtectedRoute><Mapy /></ProtectedRoute>} />
              <Route path="/profil" element={<ProtectedRoute><Profil /></ProtectedRoute>} />
              <Route path="/profil/:id" element={<ProtectedRoute><Profil /></ProtectedRoute>} />
              <Route path="/mojelowiska" element={<ProtectedRoute><MojeLowiska /></ProtectedRoute>} />
              <Route path="/portal" element={<ProtectedRoute><Portal /></ProtectedRoute>} />
              <Route path="/kup-licencje" element={<ProtectedRoute><KupLicencje /></ProtectedRoute>} />
              <Route path="/znajomi" element={<ProtectedRoute><Friends /></ProtectedRoute>} />
              <Route path="/ranking" element={<ProtectedRoute><Ranking /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute><AdminPanel/></ProtectedRoute>} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
