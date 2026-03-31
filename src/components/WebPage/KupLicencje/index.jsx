import React, { useState, useEffect } from 'react';
import Navbar from '../NavBar';
import {
  Snackbar,
  Alert,
} from '@mui/material';
import axios from '../../../api/axios';
import { useLocation } from 'react-router-dom';

// Sub-components
import LicencjaCard from './LicencjaCard';
import LicencjaSkeleton from './LicencjaSkeleton';

const KupLicencje = () => {
  const [licencje, setLicencje] = useState([]);
  const [okregi, setOkregi] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchQuery] = useState('');
  const [filterOkreg, setFilterOkreg] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const location = useLocation();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info'
  });

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [licRes, okregiRes] = await Promise.all([
          axios.get('/licencje'),
          axios.get('/okregi')
        ]);
        setLicencje(licRes.data.licencje);
        setOkregi(okregiRes.data.okregi);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();

    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get('status') === 'success') {
      setSnackbar({
        open: true,
        message: 'Płatność zakończona pomyślnie! Twoja licencja zostanie wkrótce aktywowana.',
        severity: 'success'
      });
    }
  }, [location]);

  const filteredLicencje = licencje.filter(lic => {
    const licOkregId = lic.idOkregu || lic.idOkreguPZW;
    const okreg = okregi.find(o => o._id === licOkregId);
    
    const okregNazwa = okreg?.nazwa?.toLowerCase() || '';
    const licOpis = lic.opis?.toLowerCase() || '';
    const searchLower = searchTerm.toLowerCase();

    const matchesSearch = okregNazwa.includes(searchLower) || licOpis.includes(searchLower);
    const matchesOkreg = filterOkreg === 'all' || licOkregId === filterOkreg;
    const matchesType = filterType === 'all' 
      ? true 
      : filterType === 'pzw' ? lic.czyCzlonekPZW === true : lic.czyCzlonekPZW === false;
    
    return matchesSearch && matchesOkreg && matchesType;
  });

  const handleBuy = async (licencjaId) => {
    try {
      setSnackbar({ open: true, message: 'Inicjowanie płatności PayU...', severity: 'info' });
      const response = await axios.post('/payments/create', { licencjaId });
      
      if (response.data.redirectUrl) {
        window.location.href = response.data.redirectUrl;
      } else {
        throw new Error("Brak adresu przekierowania.");
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Błąd płatności. Spróbuj ponownie.',
        severity: 'error'
      });
    }
  };

  return (
    <div className="bg-surface dark:bg-slate-950 text-on-surface font-body min-h-screen flex flex-col transition-colors duration-300">
      <Navbar />
      
      <main className="flex-grow">
        {/* Search & Filter Header */}
        <section className="bg-surface-container-low dark:bg-slate-900 transition-colors py-16 px-6">
          <div className="max-w-screen-2xl mx-auto">
            <div className="max-w-4xl">
              <h1 className="text-5xl font-black text-primary dark:text-sky-400 mb-6 tracking-tighter m-0 uppercase">Kup Licencję</h1>
              <p className="text-on-surface-variant dark:text-slate-400 text-lg mb-10 max-w-2xl font-medium leading-relaxed">Zdobądź pozwolenie na połów w kilka minut. Wybierz swoje ulubione łowisko i ciesz się spokojem nad wodą.</p>
              
              {/* Search Bar Cluster */}
              <div className="bg-white dark:bg-slate-800 p-3 rounded-3xl shadow-2xl border border-solid border-outline-variant dark:border-slate-700 flex flex-col md:flex-row gap-3 transition-colors">
                <div className="flex-grow flex items-center px-6 gap-4 bg-surface-container dark:bg-slate-900/50 rounded-2xl group transition-all focus-within:ring-2 focus:ring-primary/20">
                  <span className="material-symbols-outlined text-outline dark:text-slate-500">search</span>
                  <input 
                    className="w-full bg-transparent border-none focus:ring-0 py-5 text-on-surface dark:text-slate-200 placeholder:text-outline dark:placeholder:text-slate-600 font-bold outline-none" 
                    placeholder="Wyszukaj okręg lub opis..." 
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative group">
                    <select 
                      className="appearance-none bg-surface-container dark:bg-slate-900/50 border-none rounded-2xl px-6 py-5 pr-12 text-on-surface dark:text-slate-200 font-black text-xs uppercase tracking-widest focus:ring-2 focus:ring-primary/20 min-w-[200px] cursor-pointer outline-none transition-all hover:bg-surface-container-high dark:hover:bg-slate-800"
                      value={filterOkreg}
                      onChange={(e) => setFilterOkreg(e.target.value)}
                    >
                      <option value="all">Wszystkie Okręgi</option>
                      {okregi.map(o => (
                        <option key={o._id} value={o._id}>{o.nazwa}</option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-outline dark:text-slate-500">expand_more</span>
                  </div>
                  <div className="relative group">
                    <select 
                      className="appearance-none bg-surface-container dark:bg-slate-900/50 border-none rounded-2xl px-6 py-5 pr-12 text-on-surface dark:text-slate-200 font-black text-xs uppercase tracking-widest focus:ring-2 focus:ring-primary/20 min-w-[180px] cursor-pointer outline-none transition-all hover:bg-surface-container-high dark:hover:bg-slate-800"
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                    >
                      <option value="all">Członkostwo</option>
                      <option value="pzw">Członek PZW</option>
                      <option value="non">Niezrzeszony</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-outline dark:text-slate-500">expand_more</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Licenses Grid */}
        <section className="max-w-screen-2xl mx-auto px-6 py-20">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-black text-on-surface dark:text-slate-100 m-0 tracking-tight">Dostępne Licencje</h2>
              <p className="text-outline dark:text-slate-500 m-0 mt-2 font-bold uppercase tracking-widest text-[10px]">Znaleziono {filteredLicencje.length} pozycji</p>
            </div>
            <div className="flex gap-3">
              <button className="w-12 h-12 flex items-center justify-center border border-solid border-outline-variant dark:border-slate-800 rounded-xl hover:bg-surface-container dark:hover:bg-slate-800 transition-colors bg-transparent cursor-pointer">
                <span className="material-symbols-outlined text-primary dark:text-sky-400" style={{ fontVariationSettings: "'FILL' 1" }}>grid_view</span>
              </button>
              <button className="w-12 h-12 flex items-center justify-center border border-solid border-outline-variant dark:border-slate-800 rounded-xl hover:bg-surface-container dark:hover:bg-slate-800 transition-colors bg-transparent cursor-pointer">
                <span className="material-symbols-outlined text-slate-400">reorder</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {isLoading ? (
              Array.from({ length: 8 }).map((_, i) => <LicencjaSkeleton key={i} />)
            ) : filteredLicencje.length > 0 ? (
              filteredLicencje.map((lic) => {
                const licOkregId = lic.idOkregu || lic.idOkreguPZW;
                const okreg = okregi.find(o => o._id === licOkregId);
                return (
                  <LicencjaCard 
                    key={lic._id} 
                    lic={lic} 
                    okreg={okreg} 
                    onBuy={handleBuy} 
                  />
                );
              })
            ) : (
              <div className="col-span-full py-32 text-center bg-white dark:bg-slate-900 rounded-[3rem] border border-solid border-outline-variant dark:border-slate-800 shadow-sm transition-colors">
                <span className="material-symbols-outlined text-8xl text-slate-200 dark:text-slate-800 mb-6">search_off</span>
                <h3 className="text-2xl font-black text-on-surface-variant dark:text-slate-500 m-0 uppercase tracking-tighter">Brak wyników</h3>
                <p className="text-outline dark:text-slate-600 font-bold mt-2">Zmień parametry wyszukiwania, aby znaleźć licencję.</p>
              </div>
            )}
          </div>
        </section>

        {/* Trust Section */}
        <section className="bg-primary-fixed dark:bg-slate-900 transition-colors py-20 px-6 border-0 border-t border-solid border-outline-variant dark:border-slate-800">
          <div className="max-w-screen-2xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-black text-on-primary-fixed dark:text-sky-400 mb-6 tracking-tight uppercase">Bezpieczeństwo i pewność</h2>
              <p className="text-on-primary-fixed-variant dark:text-slate-400 text-lg m-0 font-medium leading-relaxed">Wszystkie licencje generowane przez Wędkarz Portal są oficjalnymi dokumentami akceptowanymi przez Straż Rybacką i PZW.</p>
            </div>
            <div className="flex flex-wrap gap-8 justify-center md:justify-end">
              <div className="flex items-center gap-6 bg-white/40 dark:bg-slate-800/50 p-8 rounded-3xl backdrop-blur-xl border border-solid border-white/50 dark:border-slate-700 shadow-xl transition-colors">
                <span className="material-symbols-outlined text-5xl text-primary dark:text-sky-400">verified</span>
                <div>
                  <p className="font-black text-on-primary-fixed dark:text-slate-100 m-0 uppercase tracking-widest text-sm">100% Legalne</p>
                  <p className="text-xs font-bold text-on-primary-fixed-variant dark:text-slate-500 m-0 mt-1">Oficjalne dokumenty</p>
                </div>
              </div>
              <div className="flex items-center gap-6 bg-white/40 dark:bg-slate-800/50 p-8 rounded-3xl backdrop-blur-xl border border-solid border-white/50 dark:border-slate-700 shadow-xl transition-colors">
                <span className="material-symbols-outlined text-5xl text-primary dark:text-sky-400">electric_bolt</span>
                <div>
                  <p className="font-black text-on-primary-fixed dark:text-slate-100 m-0 uppercase tracking-widest text-sm">Natychmiastowo</p>
                  <p className="text-xs font-bold text-on-primary-fixed-variant dark:text-slate-500 m-0 mt-1">PDF na e-mail</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} className="rounded-2xl font-bold shadow-2xl">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default KupLicencje;
