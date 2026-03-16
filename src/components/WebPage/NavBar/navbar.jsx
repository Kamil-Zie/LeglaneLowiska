import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import {useNavigate} from 'react-router-dom';
import { Button } from '@mui/material';
import './navbar.css';
import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

const NavBar = () => {
  
  const { signOut } = useAuth();
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