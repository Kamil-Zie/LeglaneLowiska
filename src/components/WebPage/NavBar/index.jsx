import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import {useNavigate} from 'react-router-dom';
import { Button, Badge } from '@mui/material';
import './navbar.css';

const NavBar = () => {
  
  const { user, signOut } = useAuth();
  const navigate = useNavigate();


    return (
        <nav className="navbar">
        <img src="logo.svg" alt="Logo" style={{ width: '60px', height: '60px', marginLeft: '20px',marginBottom:'20px'}} />
        <ul className="nav-links">
          <li>
            <Link to="/webpage" style={{ color: 'inherit', textDecoration: 'none' }}>
              Strona Główna
            </Link>
          </li>
          
            <li>
            <Link to="/profil" style={{ color: 'inherit', textDecoration: 'none' }}>
              Profil
            </Link>
            </li>

            <li>
            <Link to="/znajomi" style={{ color: 'inherit', textDecoration: 'none' }}>
              <Badge badgeContent={user?.friendRequests?.length} color="error" overlap="circular">
                Znajomi
              </Badge>
            </Link>
            </li>
              <li>
            <Link to="/mapy" style={{ color: 'inherit', textDecoration: 'none' }}>
              Mapa
            </Link>
            </li>

            <li>
            <Link to="/portal" style={{ color: 'inherit', textDecoration: 'none' }}>
              Portal
            </Link>
            </li>

            <li>
            <Link to="/kup-licencje" style={{ color: 'inherit', textDecoration: 'none' }}>
              Kup Licencję
            </Link>
            </li>

            <li>
            <Link to="/mojelowiska" style={{ color: 'inherit', textDecoration: 'none' }}>
              Moje łowiska
            </Link>
            </li>
          <li>
            <Button variant="outlined" color='white' style={{ marginLeft: '0px' }} size="small" onClick={async () => {
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