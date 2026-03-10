import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import {useNavigate} from 'react-router-dom';
import './navbar.css';

const NavBar = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
    return (
        <nav className="navbar">
        <img src="logo.svg" alt="Logo" style={{ width: '60px', height: '60px', marginLeft: '20px',marginBottom:'20px'}} />
        <ul className="nav-links">
          <li>
            <Link to="/mapy" style={{ color: 'inherit', textDecoration: 'none' }}>
              Mapa
            </Link>
            </li>

            <li>
            <Link to="/mojelowiska" style={{ color: 'inherit', textDecoration: 'none' }}>
              Moje łowiska
            </Link>
            </li>

            <li>
            <Link to="/profil" style={{ color: 'inherit', textDecoration: 'none' }}>
              Profil
            </Link>
            </li>

            <li>
            <Link to="/webpage" style={{ color: 'inherit', textDecoration: 'none' }}>
              Strona Główna
            </Link>
          </li>
          <li>
            <Button variant="contained" color="secondary" style={{ marginLeft: '20px' }} onClick={async () => {
              await signOut();
              navigate('/');
            }}>
              Wyloguj się
            </Button>
          </li>
        </ul>
      </nav>
    );
}

export default NavBar;