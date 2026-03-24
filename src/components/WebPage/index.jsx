import './WebPage.css';
import Navbar from './NavBar';
import { Button, TextField, Typography, Box, Card, CardContent, Container, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const PLACEHOLDER_LOWISKA = [
  { id: 1, nazwa: 'Jezioro Bydgoskie' },
  { id: 2, nazwa: 'Stawy Milickie' },
  { id: 3, nazwa: 'Rzeka Wisła (odcinek Mazowiecki)' },
];

const WebPage = () => {
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
        <Typography variant="h6" gutterBottom>
          Gdzie łowić:
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 3,
            mt: 2,
          }}
        >
          {PLACEHOLDER_LOWISKA.map((lowisko) => (
            <Card
              key={lowisko.id}
              variant="outlined"
              sx={{
                borderRadius: 2,
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
            >
              <CardContent>
                <Typography variant="body1" fontWeight={500}>
                  {lowisko.nazwa}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default WebPage;
