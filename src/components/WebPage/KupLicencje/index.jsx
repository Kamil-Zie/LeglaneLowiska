import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';
import axios from '../../../api/axios';
import Navbar from '../NavBar';
import MobileNav from '../MobileNav';

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

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [licRes, okregiRes] = await Promise.all([axios.get('/licencje'), axios.get('/okregi')]);
        setLicencje(licRes.data.licencje);
        setOkregi(okregiRes.data.okregi);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    if (new URLSearchParams(location.search).get('status') === 'success') {
      setSnackbar({ open: true, message: 'Płatność pomyślna!', severity: 'success' });
    }
  }, [location]);

  const filtered = licencje.filter(lic => {
    const okreg = okregi.find(o => o._id === (lic.idOkregu || lic.idOkreguPZW));
    const matchesSearch = (okreg?.nazwa || '').toLowerCase().includes(searchTerm.toLowerCase()) || (lic.opis || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesOkreg = filterOkreg === 'all' || (lic.idOkregu || lic.idOkreguPZW) === filterOkreg;
    const matchesType = filterType === 'all' ? true : filterType === 'pzw' ? lic.czyCzlonekPZW : !lic.czyCzlonekPZW;
    return matchesSearch && matchesOkreg && matchesType;
  });

  const handleBuy = async (licencjaId) => {
    try {
      const res = await axios.post('/payments/create', { licencjaId });
      if (res.data.redirectUrl) window.location.href = res.data.redirectUrl;
    } catch (error) {
      setSnackbar({ open: true, message: 'Błąd płatności.', severity: 'error' });
    }
  };

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen transition-colors duration-300">
      <style>{`
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            display: inline-block;
            line-height: 1;
            text-transform: none;
            letter-spacing: normal;
            word-wrap: normal;
            white-space: nowrap;
            direction: ltr;
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* --- DESKTOP LAYOUT --- */}
      <div className="hidden md:flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <section className="bg-surface-container-low dark:bg-slate-900 py-16 px-6">
            <div className="max-w-4xl mx-auto text-left">
              <h1 className="text-5xl font-black text-primary uppercase m-0">Kup Licencję</h1>
              <div className="mt-8 flex gap-3">
                <input className="flex-grow p-4 rounded-xl border-none shadow-lg" placeholder="Szukaj..." value={searchTerm} onChange={e => setSearchQuery(e.target.value)} />
                <select className="p-4 rounded-xl border-none shadow-lg" value={filterOkreg} onChange={e => setFilterOkreg(e.target.value)}>
                  <option value="all">Wszystkie Okręgi</option>
                  {okregi.map(o => <option key={o._id} value={o._id}>{o.nazwa}</option>)}
                </select>
              </div>
            </div>
          </section>
          <section className="max-w-screen-2xl mx-auto px-6 py-20">
            <div className="grid grid-cols-3 gap-8">
              {isLoading ? Array.from({ length: 6 }).map((_, i) => <LicencjaSkeleton key={i} />) : filtered.map(lic => <LicencjaCard key={lic._id} lic={lic} okreg={okregi.find(o => o._id === (lic.idOkregu || lic.idOkreguPZW))} onBuy={handleBuy} />)}
            </div>
          </section>
        </main>
      </div>

      {/* --- MOBILE LAYOUT --- */}
      <div className="md:hidden flex flex-col min-h-screen pb-24 text-left">
        <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 shadow-sm">
          <div className="flex justify-between items-center px-4 h-16 max-w-2xl mx-auto">
            <div className="flex items-center gap-2"><span className="material-symbols-outlined text-sky-700">anchor</span><h1 className="text-xl font-black text-sky-800 m-0">Licencje</h1></div>
          </div>
        </header>
        <main className="flex-grow pt-20 px-4 space-y-8 max-w-2xl mx-auto w-full">
          <div className="flex flex-row">
            <span className="material-symbols-outlined  py-4 text-outline">search</span>
            <input className="w-full bg-white dark:bg-slate-800 py-4 border-2 border-outline-variant rounded-xl   pr-4" placeholder="Wyszukaj..." type="text" value={searchTerm} onChange={e => setSearchQuery(e.target.value)} />
          </div>
          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            <button onClick={() => setFilterType('all')} className={`px-4 py-2 rounded-full font-bold border-none transition-all duration-200 ${filterType === 'all' ? 'bg-primary text-white' : 'bg-slate-100'}`}>Wszystkie</button>
            <button onClick={() => setFilterType('pzw')} className={`px-4 py-2 rounded-full font-bold border-none transition-all duration-200 ${filterType === 'pzw' ? 'bg-primary text-white' : 'bg-slate-100'}`}>PZW</button>
          </div>
          <div className="space-y-6">
            {isLoading ? Array.from({ length: 3 }).map((_, i) => <LicencjaSkeleton key={i} />) : filtered.map(lic => <LicencjaCard key={lic._id} lic={lic} okreg={okregi.find(o => o._id === (lic.idOkregu || lic.idOkreguPZW))} onBuy={handleBuy} />)}
          </div>
        </main>
        <MobileNav />
      </div>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}><Alert onClose={handleCloseSnackbar} severity={snackbar.severity} className="rounded-2xl font-bold shadow-2xl">{snackbar.message}</Alert></Snackbar>
    </div>
  );
};

export default KupLicencje;
