import React, { useState, useEffect } from 'react';
import Navbar from '../NavBar';
import {
  Box,
  Container,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
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

    // Check for success status from PayU redirect
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
    
    return matchesSearch && matchesOkreg;
  });

  const handleBuy = async (licencjaId) => {
    try {
      setSnackbar({ open: true, message: 'Inicjowanie płatności PayU...', severity: 'info' });
      console.log(`Initiating PayU payment for licencja ${licencjaId}`);
      const response = await axios.post('/payments/create', { licencjaId });
      
      if (response.data.redirectUrl) {
        // Redirect user to PayU payment page
        window.location.href = response.data.redirectUrl;
      } else {
        throw new Error("Brak adresu przekierowania.");
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Wystąpił błąd podczas inicjowania płatności. Spróbuj ponownie.',
        severity: 'error'
      });
      console.error("PayU Error:", error);
    }
  };

  return (
    <Box sx={{ backgroundColor: '#f4f6f8', minHeight: '100vh', pb: 8 }}>
      <Navbar />
      
      {/* Header */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 6, mb: 4 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Kup Licencję
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Wybierz zezwolenie i łów legalnie w wybranym okręgu
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Filters */}
        <Paper sx={{ p: 3, mb: 4, borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Szukaj po nazwie okręgu lub opisie..."
                value={searchTerm}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Filtruj po okręgu</InputLabel>
                <Select
                  value={filterOkreg}
                  label="Filtruj po okręgu"
                  onChange={(e) => setFilterOkreg(e.target.value)}
                >
                  <MenuItem value="all">Wszystkie okręgi</MenuItem>
                  {okregi.map(o => (
                    <MenuItem key={o._id} value={o._id}>{o.nazwa}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        {/* List */}
        {isLoading ? (
          <Grid container spacing={3}>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <Grid item key={i} xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
                <LicencjaSkeleton />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={3}>
            {filteredLicencje.map((lic) => {
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
            })}
            {filteredLicencje.length === 0 && (
              <Grid item xs={12}>
                <Box sx={{ textAlign: 'center', py: 10 }}>
                  <Typography variant="h6" color="text.secondary">
                    Nie znaleziono licencji pasujących do filtrów.
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        )}
      </Container>

      {/* Notification Snackbar */}
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default KupLicencje;