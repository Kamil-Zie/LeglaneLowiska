import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';
import axios from '../../../api/axios';
import KupLicencjeDesktop from './desktop';
import KupLicencjeMobile from './mobile';

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
        <KupLicencjeDesktop 
        searchTerm={searchTerm} 
        setSearchQuery={setSearchQuery} 
        filterOkreg={filterOkreg} 
        setFilterOkreg={setFilterOkreg} 
        okregi={okregi} 
        isLoading={isLoading} 
        filtered={filtered} 
        handleBuy={handleBuy} />
      </div>

      {/* --- MOBILE LAYOUT --- */}
      <div className="md:hidden flex flex-col min-h-screen pb-24 text-left">
        <KupLicencjeMobile 
        searchTerm={searchTerm} 
        setSearchQuery={setSearchQuery} 
        setFilterType={setFilterType}
        filterType={filterType}
        okregi={okregi} 
        isLoading={isLoading} 
        filtered={filtered} 
        handleBuy={handleBuy} />
      </div>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}><Alert onClose={handleCloseSnackbar} severity={snackbar.severity} className="rounded-2xl font-bold shadow-2xl">{snackbar.message}</Alert></Snackbar>
    </div>
  );
};

export default KupLicencje;
