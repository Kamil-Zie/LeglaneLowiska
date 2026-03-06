import { Button, Stack, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const SignComponent = ({SignType}) => {
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
                <TextField label="Email" variant="outlined" fullWidth margin="normal" />
                <TextField label="Password" variant="outlined" fullWidth margin="normal" type="password" />
                {SignType === "Sign Up" && (
                    <TextField label="Confirm Password" variant="outlined" fullWidth margin="normal" type="password" />
                )}
                <Button variant="contained" color="primary" fullWidth>
                    Sign In
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