import Navbar from '../NavBar';
import { useEffect, useState } from 'react';
import '../WebPage.css';
import {
  Button,
  TextField,
  Box,
  Typography,
  Paper,
  InputAdornment,
  Divider,
  Skeleton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './mapy.css';
import Mapbox from './MapContainer';
import LowiskoCard from './LowiskoCard';

const LowiskoCardSkeleton = () => (
  <Box
    sx={{
      borderRadius: 3,
      p: 2,
      border: '1px solid',
      borderColor: 'divider',
    }}
  >
    <Skeleton variant="text" width="70%" height={28} />
    <Skeleton variant="text" width="100%" height={18} sx={{ mt: 0.5 }} />
    <Skeleton variant="text" width="90%" height={18} />
    <Divider sx={{ my: 1 }} />
    <Skeleton variant="text" width="50%" height={18} />
    <Skeleton variant="text" width="40%" height={18} sx={{ mt: 0.5 }} />
    <Skeleton variant="rounded" width={80} height={24} sx={{ mt: 1 }} />
    <Skeleton variant="rounded" width="100%" height={36} sx={{ mt: 1.5, borderRadius: 2 }} />
  </Box>
);

const MapSkeleton = () => (
  <Skeleton
    variant="rounded"
    sx={{ flexGrow: 1, minHeight: '60vh', borderRadius: 3 }}
  />
);

const Mapa = () => {
  const [lowiska, setLowiska] = useState([]);
  const [okregi, setOkregi] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(localStorage.getItem('searchQuery') || '');

  const searchLowiska = () => {
    try {
      const all = JSON.parse(localStorage.getItem('lowiska')) || [];
      const filtered = all.filter((lowisko) => {
        const miasto = lowisko.miasto || '';
        return miasto.toLowerCase().includes(searchQuery.toLowerCase());
      });
      setLowiska(filtered);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const loadOkregi = () => {
      try {
        const stored = localStorage.getItem('okregi');
        if (stored) {
          setOkregi(JSON.parse(stored));
        }
      } catch (e) {
        console.error("Error parsing okregi", e);
      }
    };
    loadOkregi();

    const loadData = (dataStr) => {
      try {
        if (!dataStr) return false;
        const all = JSON.parse(dataStr);
        if (Array.isArray(all) && all.length > 0) {
          const query = localStorage.getItem('searchQuery') || '';
          const filtered = all.filter((lowisko) => {
            const miasto = lowisko.miasto || '';
            return miasto.toLowerCase().includes(query.toLowerCase());
          });
          setLowiska(filtered);
          setIsLoading(false);
          return true;
        }
      } catch (e) {
        console.error("Error parsing lowiska", e);
      }
      return false;
    };

    const stored = localStorage.getItem('lowiska');
    if (!loadData(stored)) {
      const interval = setInterval(() => {
        const data = localStorage.getItem('lowiska');
        if (loadData(data)) {
          clearInterval(interval);
        }
      }, 300);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <Box className="web-page-container">
      <Navbar />

      <Box sx={{ display: 'flex', gap: 2, p: 2, height: '80vh' }}>
        {/* Sidebar */}
        <Paper
          elevation={3}
          sx={{
            width: 320,
            flexShrink: 0,
            p: 2,
            borderRadius: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            maxHeight: '100%',
          }}
        >
          <Typography variant="h6" fontWeight={700} color="primary" align="center">
            Znajdź łowisko
          </Typography>

          <Divider />

          <TextField
            label="Wpisz miasto"
            variant="outlined"
            size="small"
            fullWidth
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              localStorage.setItem('searchQuery', e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={searchLowiska}
            disabled={isLoading}
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
          >
            Szukaj
          </Button>

          <Divider />

          {/* Results list */}
          <Box
            sx={{
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
              flexGrow: 1,
              minHeight: 0,
              pr: 1,
            }}
          >
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <LowiskoCardSkeleton key={i} />
              ))
            ) : lowiska?.length > 0 ? (
              lowiska.map((lowisko) => 
                <LowiskoCard key={lowisko._id} lowisko={lowisko} okregiList={okregi} />
              )
            ) : (
              <Typography variant="body2" color="text.secondary" align="center">
                Brak wyników
              </Typography>
            )}
          </Box>
        </Paper>

        {/* Map */}
        {isLoading ? (
          <MapSkeleton />
        ) : (
          <Box sx={{ flexGrow: 1, borderRadius: 3, height: '100%', width: '100%' }}>
            <Mapbox lowiska={lowiska} okregiList={okregi} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Mapa;
