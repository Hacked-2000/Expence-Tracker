import { useState } from 'react';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  Box,
} from '@mui/material';
import { register, saveSession, isAuthenticated } from '../utils/apiEndpoints';
import { validateRegister } from '../utils/validation';
import AuthLayout from '../components/AuthLayout';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
    setApiError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = validateRegister(form);
    if (!result.valid) {
      setErrors(result.errors);
      return;
    }

    setLoading(true);
    try {
      const data = await register(form);
      saveSession(data.token, data.user);
      window.location.href = '/';
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Paper className="auth-card" sx={{ p: 4 }}>
        <Box className="auth-brand">
          <Box className="auth-brand-icon">₹</Box>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Create account
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
          Start tracking your expenses today
        </Typography>

        {apiError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {apiError}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            value={form.name}
            onChange={handleChange('name')}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={form.email}
            onChange={handleChange('email')}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={form.password}
            onChange={handleChange('password')}
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Register'}
          </Button>
        </Box>

        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
          Already have an account?{' '}
          <Link component={RouterLink} to="/login">
            Login
          </Link>
        </Typography>
      </Paper>
    </AuthLayout>
  );
};

export default Register;
