import React from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Stack, 
  Chip, 
  Typography, 
  Divider, 
  Button 
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const LicencjaCard = ({ lic, okreg, onBuy }) => {
  return (
    <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
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
            onClick={() => onBuy(lic._id)}
            sx={{ borderRadius: 2, fontWeight: 'bold' }}
          >
            Kupuję
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default LicencjaCard;