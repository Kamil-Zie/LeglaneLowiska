import { Link, useLocation } from 'react-router-dom';

const MobileNav = () => {
  const location = useLocation();
  const isActive = (path) => {
    if (path === '/profil') return location.pathname.startsWith('/profil');
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-[0_-1px_3px_0_rgba(0,0,0,0.05)] md:hidden">
      <div className="flex justify-around items-center px-2 py-3 pb-safe max-w-2xl mx-auto">
        <Link 
          to="/webpage" 
          className={`flex flex-col items-center justify-center rounded-xl px-3 py-1 no-underline transition-all duration-200 ${isActive('/webpage') ? 'bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300' : 'text-slate-500'}`}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive('/webpage') ? "'FILL' 1" : "'FILL' 0" }}>home</span>
          <span className="text-[11px] font-semibold tracking-tight">Start</span>
        </Link>
        <Link 
          to="/portal" 
          className={`flex flex-col items-center justify-center rounded-xl px-3 py-1 no-underline transition-all duration-200 ${isActive('/portal') ? 'bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300' : 'text-slate-500'}`}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive('/portal') ? "'FILL' 1" : "'FILL' 0" }}>groups</span>
          <span className="text-[11px] font-semibold tracking-tight">Portal</span>
        </Link>
        <Link 
          to="/mapy" 
          className={`flex flex-col items-center justify-center rounded-xl px-3 py-1 no-underline transition-all duration-200 ${isActive('/mapy') ? 'bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300' : 'text-slate-500'}`}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive('/mapy') ? "'FILL' 1" : "'FILL' 0" }}>map</span>
          <span className="text-[11px] font-semibold tracking-tight">Mapa</span>
        </Link>
        <Link 
          to="/kup-licencje" 
          className={`flex flex-col items-center justify-center rounded-xl px-3 py-1 no-underline transition-all duration-200 ${isActive('/kup-licencje') ? 'bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300' : 'text-slate-500'}`}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive('/kup-licencje') ? "'FILL' 1" : "'FILL' 0" }}>description</span>
          <span className="text-[11px] font-semibold tracking-tight">Licencje</span>
        </Link>
        <Link 
          to="/profil" 
          className={`flex flex-col items-center justify-center rounded-xl px-3 py-1 no-underline transition-all duration-200 ${isActive('/profil') ? 'bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300' : 'text-slate-500'}`}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive('/profil') ? "'FILL' 1" : "'FILL' 0" }}>person</span>
          <span className="text-[11px] font-semibold tracking-tight">Profil</span>
        </Link>
      </div>
    </nav>
  );
};

export default MobileNav;
