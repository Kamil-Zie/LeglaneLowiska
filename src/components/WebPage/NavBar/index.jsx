import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { Badge } from '@mui/material';
import { useContext } from 'react';
import { ThemeContext } from '../../../App';
import './navbar.css';

const NavBar = () => {
  const { user, signOut } = useAuth();
  const { mode, toggleColorMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: 'Strona Główna', path: '/webpage' },
    { name: 'Społeczność', path: '/portal' },
    { name: 'Mapa', path: '/mapy' },
    { name: 'Kup Licencje', path: '/kup-licencje' },
    { name: 'Moje łowiska', path: '/mojelowiska' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md font-sans text-base font-semibold tracking-tight sticky top-0 border-0 border-b border-solid border-slate-200 dark:border-slate-800 shadow-sm z-50">
      <div className="flex justify-between items-center w-full px-6 py-4 max-w-screen-2xl mx-auto">
        {/* Logo and Brand */}
        <Link to="/webpage" className="flex items-center gap-2 no-underline">
          <img src="logo.svg" alt="Logo" className="w-10 h-10" />
          <div className="text-2xl font-black text-sky-800 dark:text-sky-300 tracking-tighter">Legalne Łowiska</div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`no-underline transition-all duration-200 cursor-pointer active:scale-95 ${
                isActive(link.path)
                  ? 'text-sky-700 dark:text-sky-400 border-0 border-b-2 border-solid border-sky-700 dark:border-sky-400 pb-1'
                  : 'text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-300'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleColorMode}
            className="material-symbols-outlined p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200 rounded-full border-none bg-transparent cursor-pointer"
          >
            {mode === 'dark' ? 'light_mode' : 'dark_mode'}
          </button>

          <Link to="/znajomi" className="text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-300 transition-colors no-underline flex items-center">
            <Badge badgeContent={user?.friendRequests?.length} color="error" overlap="circular">
              <span className="material-symbols-outlined p-2 hover:bg-slate-50 transition-colors duration-200 rounded-full">
                group
              </span>
            </Badge>
          </Link>
          
          <Link to="/profil" className="text-slate-600 hover:text-sky-600 transition-colors no-underline">
            <span className="material-symbols-outlined p-2 hover:bg-slate-50 transition-colors duration-200 rounded-full">
              account_circle
            </span>
          </Link>

          <button
            onClick={async () => {
              await signOut();
              navigate('/');
            }}
            className="bg-primary text-on-primary px-5 py-2 rounded-lg font-bold hover:bg-primary-container transition-all active:scale-95 border-none cursor-pointer"
          >
            Wyloguj
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
