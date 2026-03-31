import {useState} from 'react';
import { Button, Stack, TextField, Typography, Checkbox, FormControlLabel, IconButton, InputAdornment } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const SignComponent = ({SignType}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const { signIn, signUp } = useAuth();
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  return (
    <Stack direction="row" justifyContent="center" alignItems="center" style={{minHeight: '100vh'}}>
        <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} style={{minHeight: '100vh', width: '100%', maxWidth: '400px', padding: '0 20px'}}>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                <img src="logo.svg" alt="Logo" width={60} height={60} />
                <Typography align="center" style={{fontSize: 32, fontWeight: 'bold', color: '#2e7d32'}}>
                    Legalne Łowiska
                </Typography>
            </Stack>
                <Typography variant="h4" align="center" gutterBottom>
                {SignType}
                </Typography>
                <TextField 
                    label="Email" 
                    variant="outlined" 
                    fullWidth 
                    margin="normal" 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <TextField 
                    label="Hasło" 
                    variant="outlined" 
                    fullWidth 
                    margin="normal" 
                    error={error} 
                    type={showPassword ? 'text' : 'password'} 
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                

                {SignType === "Rejestracja" && (
                    <TextField 
                        label="Potwierdź Hasło" 
                        variant="outlined" 
                        fullWidth 
                        margin="normal" 
                        error={error} 
                        type={showConfirmPassword ? 'text' : 'password'} 
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle confirm password visibility"
                                        onClick={handleClickShowConfirmPassword}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                )}
                
                <FormControlLabel
                    control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} color="primary" />}
                    label="Zapamiętaj mnie"
                    sx={{ width: '100%', mb: 1 }}
                />
                <Button variant="contained" color="primary" fullWidth size="large" onClick={async () => {
                    if(SignType === "Logowanie" ) {
                        try {
                            await signIn(email, password, rememberMe);
                            navigate('/webpage');
                        } catch (error) {
                            alert("Błąd logowania: " + (error.response?.data?.message || error.message));
                        }
                    }
                    else {
                        if(password !== confirmPassword) {
                            setError(true);
                            alert("Hasła się nie zgadzają!");
                            return;
                        }
                        try {
                            await signUp(email, password, rememberMe);
                            navigate('/webpage');
                        } catch (error) {
                            alert("Błąd rejestracji: " + (error.response?.data?.message || error.message));
                        }
                    }
                }}
                sx={{ mt: 2, py: 1.5, borderRadius: 2, fontWeight: 'bold' }}
                >
                    {SignType}
                </Button>
                {SignType === "Logowanie" ? (
                    <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                        Nie masz konta? <Link to="/signup" style={{ color: '#2e7d32', fontWeight: 'bold', textDecoration: 'none' }}>Zarejestruj się.</Link>
                    </Typography>) : (
                    <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                        Masz już konto? <Link to="/" style={{ color: '#2e7d32', fontWeight: 'bold', textDecoration: 'none' }}>Zaloguj się.</Link>
                    </Typography>)}
            </Stack>
        </Stack>
  );
}
export default SignComponent;