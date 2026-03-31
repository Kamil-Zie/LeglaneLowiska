import './WebPage.css';
import Navbar from './NavBar';
import { Button, TextField, Typography, Box, Container, InputAdornment, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from '../../context/AuthContext';
import { useState, useEffect } from 'react';
import LowiskoCard from './LowiskoCard';

const WebPage = () => {
  const { user } = useAuth();
  const [suggestedLowiska, setSuggestedLowiska] = useState([]);
  const [okregi, setOkregi] = useState([]);

  useEffect(() => {
    const allLowiska = JSON.parse(localStorage.getItem('lowiska')) || [];
    const allOkregi = JSON.parse(localStorage.getItem('okregi')) || [];
    setOkregi(allOkregi);

    if (allLowiska.length > 0) {
      // Filter out favorites
      const nonFavorites = allLowiska.filter(l => !user?.ulubioneLowiska?.includes(l._id));
      
      // Shuffle and pick 9
      const shuffled = [...nonFavorites].sort(() => 0.5 - Math.random());
      setSuggestedLowiska(shuffled.slice(0, 8));
    }
  }, [user]);

  return (
    <Box className="web-page-container">
      <Navbar />

      {/* Hero Section */}
      <Box
        component="header"
        className="hero-section"
        sx={{ color: 'white', textAlign: 'center', py: '70px', px: '30px' }}
      >
        <Typography variant="h4" component="h2" gutterBottom>
          Znajdź legalne miejsce na ryby w Twojej okolicy
        </Typography>
        <Typography variant="body1" gutterBottom>
          Ogarnij sobie szybko zgodę aby łowić bez końca
        </Typography>
        <Box
          className="search-container"
          sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 1 }}
        >
          <TextField
            variant="outlined"
            placeholder="Wpisz miasto"
            size="small"
            sx={{
              backgroundColor: 'white',
              borderRadius: 1,
              width: 350,
              '& .MuiOutlinedInput-root': { borderRadius: '25px 0 0 25px' },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ borderRadius: '0 25px 25px 0', px: 3, fontWeight: 'bold' }}
          >
            Szukaj
          </Button>
        </Box>
      </Box>

      {/* Lowiska list */}
      <Container component="main" sx={{ py: 5 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#1a5275', mb: 3 }}>
          Sugerowane łowiska:
        <Grid container spacing={4} alignItems="stretch" justifyContent="center">
          {suggestedLowiska.map((lowisko) => (
            <Grid item key={lowisko._id} xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ width: '100%', maxWidth: '400px', display: 'flex' }}>
                <LowiskoCard lowisko={lowisko} okregiList={okregi} />
              </Box>
            </Grid>
          ))}
        </Grid>
          {suggestedLowiska.length === 0 && (
            <Grid item xs={12}>
              <Typography variant="body1" color="text.secondary" align="center">
                Brak nowych sugestii w tej chwili.
              </Typography>
            </Grid>
          )}
        </Typography>
      </Container>
    </Box>
  );
};

export default WebPage;
