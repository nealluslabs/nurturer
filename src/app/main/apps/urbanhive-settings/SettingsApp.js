import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Divider, Alert } from '@mui/material';

function SettingsApp() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
      <Card elevation={4}>
        <CardContent>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Settings
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Reset Password
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Enter your email address to receive a password reset link.
          </Typography>
          <form onSubmit={handleResetPassword}>
            <TextField
              label="Email Address"
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
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ py: 1.2, fontWeight: 600 }}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>
          {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        </CardContent>
      </Card>
    </Box>
  );
}

export default SettingsApp;
