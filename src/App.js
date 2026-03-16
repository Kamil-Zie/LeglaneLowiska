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

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
}

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
  return (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<WebPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/webpage" element={<WebPage/>} />
        <Route path="/mapy" element={<Mapy />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/mojelowiska" element={<MojeLowiska />} />
        
      </Routes>
      </AuthProvider>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
