import logo from './logo.svg';
import './App.css';
import SignIn from './components/SignComponent/SignIn';
import SignUp from './components/SignComponent/SignUp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
