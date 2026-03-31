import React, { useState, useEffect } from 'react';
import Navbar from '../NavBar';
import './mojelowiska.css';
import { useAuth } from '../../../context/AuthContext';
import LowiskoCard from '../LowiskoCard';
import { Box, Container, Typography, Grid } from '@mui/material';

const MojeLowiska = () => {
  const { user } = useAuth();
  const [favoriteLowiska, setFavoriteLowiska] = useState([]);
  const [okregi, setOkregi] = useState([]);

  useEffect(() => {
    const allLowiska = JSON.parse(localStorage.getItem('lowiska')) || [];
    const allOkregi = JSON.parse(localStorage.getItem('okregi')) || [];
    setOkregi(allOkregi);

    if (user?.ulubioneLowiska) {
      const filtered = allLowiska.filter(lowisko => user.ulubioneLowiska.includes(lowisko._id));
      setFavoriteLowiska(filtered);
    }
  }, [user]);

  return (
    <Box sx={{ backgroundColor: '#f0f2f5', minHeight: '100vh', pb: 4 }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#1a5275', textAlign: 'center' }}>
          Moje ulubione łowiska
        </Typography>
        
        {favoriteLowiska.length === 0 ? (
          <Box sx={{ py: 10, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              Nie masz jeszcze żadnych ulubionych łowisk.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={4} justifyContent="center">
            {favoriteLowiska.map((lowisko) => (
              <Grid item key={lowisko._id} xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ width: '100%', maxWidth: '400px', display: 'flex' }}>
                  <LowiskoCard lowisko={lowisko} okregiList={okregi} />
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default MojeLowiska;