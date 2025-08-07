import React, { useState } from 'react';
import { Box, Card, CardContent, TextField, Button, Divider, Alert } from '@mui/material';
import {
  Grid,
  Container,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Input,
} from '@mui/material';

function SettingsApp() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [state, setState] = useState({

    oldPassword: '',
    password: '',
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

 

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    setLoading(true);
    try {
      // Replace with your Firebase or API call
      // await auth.sendPasswordResetEmail(email);
      setTimeout(() => {
        setSuccess('Password reset email sent!');
        setLoading(false);
      }, 1200);
    } catch (err) {
      setError('Failed to send reset email.');
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 6 }}>
      {
      <Card elevation={4}>
        <CardContent>
          <Typography variant="h5" fontWeight={700} gutterBottom>
          Reset Password
          </Typography>
          <Divider sx={{ mb: 3 }} />
         {/* <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Reset Password
      </Typography>*/}
         


          <form onSubmit={handleResetPassword}>

          <TextField
              label="Old Password"
              type="password"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              sx={{ mb: 2 }}
            />

            <TextField
              label="password"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              
              fullWidth
              disabled={loading}
              sx={{ py: 1.2, fontWeight: 600,backgroundColor:"black" }}
            >
              {loading ? 'Resetting...' : ' Reset'}
            </Button>
          </form>
          
          {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        </CardContent>
      </Card>
  }

{/*<Container
        maxWidth="xl"
        style={{ marginLeft: '15%', width: 'calc(100% - 15%)', backgroundColor: '#f8f8f8', }}
      >
        <br />
        <Grid container spacing={1}>
          <Grid item xs={12} md={12} lg={12}>
            <div style={{ background: '#ffffff', padding: '10px', width: '100%',  }}>
              <Typography
                sx={{ mt: 12, mb: 1, py: 1,ml:2, color: '#000000', fontSize: '18px',}}
              >
                <b>Reset Password</b>
              </Typography>
              
              <br />

              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="space-around"
                paddingRight={15}
                style={{ paddingBottom: '3rem', }}
              >
                <Grid item xs={12} md={12} lg={12}>
               
                  <Input
                    name="oldPassword"
                    placeholder="Old Password"
                    autoComplete="current-password"
                    value={state.oldPassword}
                    onChange={handleChange}
                    InputProps={{
                      disableUnderline: true,
                    }}                
                    style={{
                      width: '100%',
                      height: '2.91rem',
                      border: '1px solid #000000',
                      color: '#000000',
                      fontSize: '1rem',
                      padding: '0.5rem',
                      fontFamily: 'lato',
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={12} lg={12}>
                    <Input
                    name="password"
                    fullWidth
                    value={state.password}
                    onChange={handleChange}
                    placeholder="New Password"
                    InputProps={{
                      disableUnderline: true,
                    }}               
                    style={{
                      width: '100%',
                      height: '2.91rem',
                      border: '1px solid #000000',
                      color: '#000000',
                      fontSize: '1rem',
                      padding: '0.5rem',
                      fontFamily: 'lato',
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={2} style={{}}>
                  <Button
                    variant="contained"
                    // fullWidth
                    style={{
                      backgroundColor: '#000000',
                      height: '3rem',
                      textTransform: 'none',
                      width: '14.25rem',
                    }}
                    onClick={() => {
                      //dispatch(updateProfile(state, user.id))
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
                  </Container>
                */}
    </Box>
  );
}

export default SettingsApp;
