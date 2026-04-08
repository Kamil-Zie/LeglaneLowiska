import { useContext } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { ThemeContext } from '../../../../App';

const MobileHeader = () => {
    const { mode, toggleColorMode } = useContext(ThemeContext);
    const { logout } = useAuth();
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 shadow-sm">
            <div className="flex justify-between items-center px-4 h-16 max-w-2xl mx-auto">
            <div className="flex items-center gap-2"><img src="logo.svg" alt="Logo" className="w-8 h-8" /><h1 className="text-xl font-black text-sky-800 m-0">LegalneŁowiska</h1></div>
            <div className="flex items-center gap-2">
                <button 
                onClick={toggleColorMode}
                className="material-symbols-outlined p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200 rounded-full border-none bg-transparent cursor-pointer"
                >
                {mode === 'dark' ? 'light_mode' : 'dark_mode'}
                </button>
                <button 
                onClick={logout}
                className="material-symbols-outlined p-2 text-error hover:bg-error/10 transition-colors duration-200 rounded-full border-none bg-transparent cursor-pointer"
                >
                logout
                </button>
            </div>
            </div>
        </header>
    )
}

export default MobileHeader;