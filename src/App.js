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

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
}

function App() {
  return (
    <BrowserRouter>
<<<<<<< HEAD
=======
      <AuthProvider>
>>>>>>> c5a21862b32b0d887ec4fa1f0f01d8b5765793c6
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/webpage" element={<WebPage/>} />
        <Route path="/mapy" element={
            <ProtectedRoute>
              <Mapy />
            </ProtectedRoute>
          } />
        <Route path="/webpage" element={
            <ProtectedRoute>
              <WebPage />
            </ProtectedRoute>
        } />
        <Route path="/profil" element={
            <ProtectedRoute>
              <Profil />
            </ProtectedRoute>
          } />
        <Route path="/mojelowiska" element={
            <ProtectedRoute>
              <MojeLowiska />
            </ProtectedRoute>
          } />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
