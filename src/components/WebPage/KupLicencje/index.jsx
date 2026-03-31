import React, { useState, useEffect } from 'react';
import Navbar from '../NavBar';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Divider,
  Stack,
  Skeleton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import axios from '../../../api/axios';
import { useAuth } from '../../../context/AuthContext';

const LicencjaSkeleton = () => (
  <Card sx={{ width: '100%', borderRadius: 3, height: '100%' }}>
    <CardContent sx={{ flexGrow: 1 }}>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rounded" width={80} height={24} />
      </Stack>
      <Skeleton variant="text" width="60%" height={32} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="90%" height={20} />
      <Skeleton variant="text" width="80%" height={20} sx={{ mb: 2 }} />
      <Divider sx={{ my: 1.5 }} />
      <Skeleton variant="text" width="40%" height={40} />
    </CardContent>
    <CardActions sx={{ p: 2, pt: 0 }}>
      <Skeleton variant="rounded" width="100%" height={36} />
    </CardActions>
  </Card>
);

const KupLicencje = () => {
  const { user } = useAuth();
  const [licencje, setLicencje] = useState([]);
  const [okregi, setOkregi] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchQuery] = useState('');
  const [filterOkreg, setFilterOkreg] = useState('all');

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
  }, []);

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
    alert(`Dziękujemy za zakup! Funkcjonalność płatności zostanie dodana wkrótce.`);
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
                <Grid item key={lic._id} xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
                  <Card sx={{ 
                    width: '100%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    borderRadius: 3,
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 }
                  }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
                        <AssignmentIcon color="primary" sx={{ fontSize: 40 }} />
                        <Chip 
                          label={lic.czyCzlonekPZW ? "Członek PZW" : "Niezrzeszony"} 
                          color={lic.czyCzlonekPZW ? "success" : "default"}
                          size="small"
                        />
                      </Stack>
                      
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {okreg?.nazwa || "Okręg PZW"}
                      </Typography>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 40 }}>
                        {lic.opis || "Zezwolenie na amatorski połów ryb wędką."}
                      </Typography>
                      
                      <Divider sx={{ my: 1.5 }} />
                      
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="h5" color="primary.main" fontWeight="bold">
                          {lic.cena} PLN
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          / {lic.czasTrwania} dni
                        </Typography>
                      </Stack>
                    </CardContent>
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <Button 
                        fullWidth 
                        variant="contained" 
                        startIcon={<ShoppingCartIcon />}
                        onClick={() => handleBuy(lic._id)}
                        sx={{ borderRadius: 2, fontWeight: 'bold' }}
                      >
                        Kupuję
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
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
    </Box>
  );
};

export default KupLicencje;