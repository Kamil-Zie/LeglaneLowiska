import './App.css';
import SignIn from './components/SignComponent/SignIn';
import SignUp from './components/SignComponent/SignUp';
import WebPage from './components/WebPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Mapy from './components/WebPage/Mapy/mapy';
import MojeLowiska from './components/WebPage/Mojelowiska/mojelowiska';
import Profil from './components/WebPage/Profil/Profil';  
import Navbar from './components/WebPage/compoweb/navbar';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WebPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/webpage" element={<WebPage/>} />
        <Route path="/mapy" element={<Mapy />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/mojelowiska" element={<MojeLowiska />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
