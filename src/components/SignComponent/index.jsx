import {useState} from 'react';
import { Button, Stack, TextField, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const SignComponent = ({SignType}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(false);
    const [seePassword, setSeePassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const { signIn, signUp } = useAuth();
    const navigate = useNavigate();
  return (
    <Stack direction="row" justifyContent="center" alignItems="center" style={{minHeight: '100vh'}}>
        <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} style={{minHeight: '100vh'}}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <img src="logo.svg" alt="Logo" width={100} height={100} />
                <Typography align="center" style={{fontSize:50}}>
                    Legalne Lowiska
                </Typography>
            </Stack>
                <Typography variant="h2" align="center">
                {SignType}
                </Typography>
                <TextField label="Email" variant="outlined" fullWidth margin="normal" onChange={(e) => setEmail(e.target.value)} />
                <TextField label="Password" variant="outlined" fullWidth margin="normal" error={error} type="password" onChange={(e) => setPassword(e.target.value)} />
                
                {SignType === "Logowanie" && (
                    <FormControlLabel
                        control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} color="primary" />}
                        label="Zapamiętaj mnie"
                        sx={{ width: '100%' }}
                    />
                )}

                {SignType === "Rejestracja" && (
                    <TextField label="Confirm Password" variant="outlined" fullWidth margin="normal" error={error} type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
                )}
                
                <Button variant="contained" color="primary" fullWidth onClick={async () => {
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
                            await signUp(email, password);
                            navigate('/webpage');
                        } catch (error) {
                            alert("Błąd rejestracji: " + (error.response?.data?.message || error.message));
                        }
                    }
                }}>
                    {SignType}
                </Button>
                {SignType === "Logowanie" ? (
                    <Typography variant="body2" align="center">
                        Nie masz konta? <Link to="/signup">Zarejestruj się.</Link>
                    </Typography>) : (
                    <Typography variant="body2" align="center">
                        Masz już konto? <Link to="/">Zaloguj się.</Link>
                    </Typography>)}
            </Stack>
        </Stack>
    );
}
export default SignComponent;