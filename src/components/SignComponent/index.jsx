import React from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const SignComponent = ({SignType}) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
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
                    if(SignType === "Sign In") {
                        fetch('http://localhost:3000/api/users/signin', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                email: email,
                                password: password
                            })
                        }).then(res => res.json())
                        .then(data => {
                            if(data.token) {
                                localStorage.setItem('token', data.token);
                                alert("Sign In successful!");
                            } else {
                                alert("Sign In failed!");
                            }
                        })
                    } else {
                        if(password !== confirmPassword) {
                            alert("Passwords do not match!");
                            return;
                        }
                        fetch('http://localhost:3000/api/users/signup', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                email: email,
                                password: password
                            })
                        }).then(res => res.json())
                        .then(data => {
                            if(data.token) {
                                localStorage.setItem('token', data.token);
                                alert("Sign Up successful!");
                            } else {
                                alert("Sign Up failed!");
                            }
                        })
                    }
                }}>
                    {SignType}
                </Button>
                {SignType === "Sign In" ? (
                    <Typography variant="body2" align="center">
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                    </Typography>) : (
                    <Typography variant="body2" align="center">
                        Already have an account? <Link to="/signin">Sign In</Link>
                    </Typography>)}
            </Stack>
        </Stack>
    );
}
export default SignComponent;