import './App.css';
import SignIn from './components/SignComponent/SignIn';
import SignUp from './components/SignComponent/SignUp';
import WebPage from './components/WebPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Mapy from './components/WebPage/Mapy/mapy';
import MojeLowiska from './components/WebPage/Mojelowiska/mojelowiska';
<<<<<<< HEAD
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
      <AuthProvider>
        <Routes>
        <Route path="/" element={<SignIn />} />
=======
import Profil from './components/WebPage/Profil/Profil';  
import Navbar from './components/WebPage/compoweb/navbar';
function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<WebPage />} />
>>>>>>> 08303b0cd6cb5aaa79ff888b84eb65810e04bd12
        <Route path="/signup" element={<SignUp />} />
        <Route path="/webpage" element={<WebPage/>} />
        <Route path="/mapy" element={<Mapy />} />
        <Route path="/webpage" element={<WebPage />} />
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
