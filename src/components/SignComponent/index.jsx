import React from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const SignComponent = ({SignType}) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
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
                <TextField label="Password" variant="outlined" fullWidth margin="normal" type="password" onChange={(e) => setPassword(e.target.value)} />
                {SignType === "Sign Up" && (
                    <TextField label="Confirm Password" variant="outlined" fullWidth margin="normal" type="password" onChange={(e) => setConfirmPassword(e.target.value)}/>
                )}
                <Button variant="contained" color="primary" fullWidth onClick={async () => {
                    if(SignType === "Sign In" ) {
                        try {
                            await signIn(email, password);
                            navigate('/webpage');
                        } catch (error) {
                            alert("Error signing in: " + error.response.data.message);
                        }
                    }
                    else {
                        if(password !== confirmPassword) {
                            alert("Passwords do not match!");
                            return;
                        }
                        try {
                            await signUp(email, password);
                            navigate('/webpage');
                        } catch (error) {
                            alert("Error signing up: " + error.response.data.message);
                        }
                    }
                }}>
                    {SignType}
                </Button>
                {SignType === "Sign In" ? (
                    <Typography variant="body2" align="center">
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                    </Typography>) : (
                    <Typography variant="body2" align="center">
                        Already have an account? <Link to="/">Sign In</Link>
                    </Typography>)}
            </Stack>
        </Stack>
    );
}
export default SignComponent;