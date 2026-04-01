import {useState, useEffect} from 'react';
import { IconButton, Snackbar, Alert } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import blur1 from './blur1.jpg';

const SignComponent = ({SignType}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const { signIn, signUp } = useAuth();
    const navigate = useNavigate();

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'error'
    });

    const [turnstileToken, setTurnstileToken] = useState('');

    useEffect(() => {
        if (!document.querySelector('script[src="https://challenges.cloudflare.com/turnstile/v0/api.js"]')) {
            const script = document.createElement('script');
            script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);
        }

        window.onTurnstileSuccess = (token) => {
            setTurnstileToken(token);
        };

        return () => {
            delete window.onTurnstileSuccess;
        };
    }, []);

    const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-surface dark:bg-slate-950 font-body transition-colors duration-500">
        <div 
            className="absolute inset-0 z-0 scale-110"
            style={{
                backgroundImage: `url(${blur1})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(4px) brightness(0.35)',
            }} 
        />

        <div className="relative z-10 w-full max-w-md mx-4">
            <div className="bg-white/10 dark:bg-black/20 backdrop-blur-3xl border border-solid border-white/20 dark:border-white/10 p-10 rounded-[2.5rem] shadow-2xl flex flex-col gap-8 transition-all">
                
                <div className="flex flex-col items-center gap-4">
                    <div className="w-24 h-24 bg-white/10 rounded-3xl p-5 backdrop-blur-md border border-solid border-white/10 flex items-center justify-center shadow-inner">
                        <img src="logo.svg" alt="Logo" className="w-full h-full" />
                    </div>
                    <div className="text-center">
                        <h1 className="text-4xl font-black text-white m-0 tracking-tighter">Legalne Łowiska</h1>
                        <p className="text-sky-300 font-black text-[10px] uppercase tracking-[0.3em] mt-2 m-0">{SignType}</p>
                    </div>
                </div>

                <div className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-sky-200/70 ml-1">Adres Email</label>
                        <input 
                            type="email"
                            placeholder="twoj@email.pl"
                            className="w-full bg-white/5 border border-solid border-white/10 rounded-2xl px-2 py-4 text-sm text-white placeholder:text-white/20 outline-none focus:ring-2 focus:ring-sky-400/50 focus:bg-white/10 transition-all font-bold"
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-sky-200/70 ml-1">Hasło</label>
                        <div className="relative">
                            <input 
                                type={showPassword ? 'text' : 'password'} 
                                placeholder="••••••••"
                                className="w-full bg-white/5 border border-solid border-white/10 rounded-2xl px-2 py-4 text-sm text-white placeholder:text-white/20 outline-none focus:ring-2 focus:ring-sky-400/50 focus:bg-white/10 transition-all font-bold"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button 
                                onClick={handleClickShowPassword}
                                className="absolute right-5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors bg-transparent border-none cursor-pointer p-1"
                            >
                                <span className="material-symbols-outlined text-xl">
                                    {showPassword ? 'visibility_off' : 'visibility'}
                                </span>
                            </button>
                        </div>
                    </div>

                    {SignType === "Rejestracja" && (
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-sky-200/70 ml-1">Potwierdź Hasło</label>
                            <div className="relative">
                                <input 
                                    type={showConfirmPassword ? 'text' : 'password'} 
                                    placeholder="••••••••"
                                    className="w-full bg-white/5 border border-solid border-white/10 rounded-2xl px-2 py-4 text-sm text-white placeholder:text-white/20 outline-none focus:ring-2 focus:ring-sky-400/50 focus:bg-white/10 transition-all font-bold"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <button 
                                    onClick={handleClickShowConfirmPassword}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors bg-transparent border-none cursor-pointer p-1"
                                >
                                    <span className="material-symbols-outlined text-xl">
                                        {showConfirmPassword ? 'visibility_off' : 'visibility'}
                                    </span>
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center justify-between px-1 pt-2">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative flex items-center">
                                <input 
                                    type="checkbox" 
                                    className="peer sr-only"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <div className="w-6 h-6 border-2 border-solid border-white/20 rounded-lg peer-checked:bg-sky-500 peer-checked:border-sky-500 transition-all shadow-inner"></div>
                                <span className="material-symbols-outlined absolute left-0 right-0 text-center text-white text-base scale-0 peer-checked:scale-100 transition-transform pointer-events-none font-black">check</span>
                            </div>
                            <span className="text-xs font-black text-white/50 group-hover:text-white transition-colors uppercase tracking-widest">Zapamiętaj mnie</span>
                        </label>
                        <Link to="#" className="text-xs font-black text-sky-400 hover:text-sky-300 transition-colors no-underline uppercase tracking-widest">Zapomniałeś?</Link>
                    </div>
                </div>

                <div className="flex justify-center bg-white/5 py-4 rounded-2xl border border-solid border-white/10 shadow-inner">
                    <div 
                        className="cf-turnstile scale-90" 
                        data-sitekey={process.env.REACT_APP_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"} 
                        data-callback="onTurnstileSuccess"
                        data-theme="dark"
                    ></div>
                </div>

                <button 
                    onClick={async () => {
                        if (!validateEmail(email)) {
                            setSnackbar({ open: true, message: "Błędny format adresu e-mail.", severity: 'error' });
                            return;
                        }
                        if (!turnstileToken) {
                            setSnackbar({ open: true, message: "Potwierdź, że nie jesteś robotem.", severity: 'error' });
                            return;
                        }

                        if(SignType === "Logowanie" ) {
                            try {
                                await signIn(email, password, rememberMe, turnstileToken);
                                navigate('/webpage');
                            } catch (error) {
                                setSnackbar({ open: true, message: "Błąd logowania. Sprawdź dane.", severity: 'error' });
                            }
                        } else {
                            if(password !== confirmPassword) {
                                setSnackbar({ open: true, message: "Hasła nie są identyczne.", severity: 'error' });
                                return;
                            }
                            try {
                                await signUp(email, password, rememberMe, turnstileToken);
                                navigate('/webpage');
                            } catch (error) {
                                setSnackbar({ open: true, message: "Błąd zakładania konta.", severity: 'error' });
                            }
                        }
                    }}
                    className="w-full py-5 bg-sky-500 text-white font-black rounded-2xl hover:bg-sky-400 active:scale-[0.98] transition-all border-none cursor-pointer shadow-2xl shadow-sky-500/40 uppercase tracking-[0.2em] text-xs"
                >
                    {SignType}
                </button>

                <div className="text-center pt-2">
                    {SignType === "Logowanie" ? (
                        <p className="text-xs font-bold text-white/30 m-0 uppercase tracking-widest">
                            Nie masz konta? <Link to="/signup" className="text-sky-400 font-black no-underline hover:text-white transition-colors ml-2">Dołącz teraz</Link>
                        </p>
                    ) : (
                        <p className="text-xs font-bold text-white/30 m-0 uppercase tracking-widest">
                            Masz już konto? <Link to="/" className="text-sky-400 font-black no-underline hover:text-white transition-colors ml-2">Zaloguj się</Link>
                        </p>
                    )}
                </div>
            </div>
        </div>

        <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} className="rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl">
                {snackbar.message}
            </Alert>
        </Snackbar>
    </div>
  );
}
export default SignComponent;
