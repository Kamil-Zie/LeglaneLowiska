import './App.css';
import SignIn from './components/SignComponent/SignIn';
import SignUp from './components/SignComponent/SignUp';
import WebPage from './components/WebPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Mapy from './components/WebPage/Mapy/mapy';
import MojeLowiska from './components/WebPage/Mojelowiska/mojelowiska';
import Profil from './components/WebPage/Profil/Profil'; 
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import { Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { useEffect } from 'react';
import axios from './api/axios';

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
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }).then(response => {
          localStorage.setItem('lowiska', JSON.stringify(response.data.lowiska));
          console.log("Lowiska fetched and stored in localStorage.");
        });
      } catch (error) {
        console.error("Error fetching lowiska:", error);
      }
    };
const fetchOkregi = async () => {
      try {
        await axios.get(`/okregi`, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }).then(response => {
          localStorage.setItem('okregi', JSON.stringify(response.data.okregi));
          console.log("Okregi fetched and stored in localStorage.");
        }
        );
      } catch (error) {
        console.error("Error fetching okregi:", error);
      }
    };

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a5275',
    },
    secondary: {
      main: '#102f42',
    },
    third: {
      main: '#8d9faa',
    },
  },
});

function App() {
  useEffect(()=>{
    fetchLowiska();
    fetchOkregi();
  },[])
  return (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/webpage" element={<ProtectedRoute><WebPage/></ProtectedRoute>} />
        <Route path="/mapy" element={<ProtectedRoute><Mapy /></ProtectedRoute>} />
        <Route path="/profil" element={<ProtectedRoute><Profil /></ProtectedRoute>} />
        <Route path="/mojelowiska" element={<ProtectedRoute><MojeLowiska /></ProtectedRoute>} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
