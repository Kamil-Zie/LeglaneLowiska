import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
        <img src="logo.svg" alt="Logo" style={{ width: '60px', marginBottom: '15px' }} />
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
                      <Link to="/Webpage" style={{ color: 'inherit', textDecoration: 'none' }}>
                       Strona Główna
                      </Link>
                      </li>
        </ul>
      </nav>

    );
}
export default Navbar;