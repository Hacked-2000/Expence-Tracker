import { createTheme } from '@mui/material/styles';

const sharedTypography = {
  fontFamily: '"Plus Jakarta Sans", "Roboto", sans-serif',
  h4: { fontWeight: 700, letterSpacing: '-0.02em' },
  h5: { fontWeight: 700, letterSpacing: '-0.02em' },
  h6: { fontWeight: 600 },
  button: { textTransform: 'none', fontWeight: 600 },
};

const sharedShape = {
  borderRadius: 12,
};

const sharedComponents = (mode) => ({
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 10,
        padding: '8px 20px',
        boxShadow: 'none',
      },
      contained: {
        background: mode === 'light'
          ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'
          : 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)',
        '&:hover': {
          background: mode === 'light'
            ? 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)'
            : 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
          boxShadow: '0 6px 20px rgba(99, 102, 241, 0.35)',
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'none',
      },
      rounded: {
        borderRadius: 16,
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 10,
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        fontWeight: 500,
        borderRadius: 8,
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: 16,
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundImage: mode === 'light'
          ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 55%, #7c3aed 100%)'
          : 'linear-gradient(135deg, #312e81 0%, #1e1b4b 55%, #0f172a 100%)',
        boxShadow: '0 4px 20px rgba(99, 102, 241, 0.25)',
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {
        borderRadius: '0 16px 16px 0',
      },
    },
  },
  MuiTableHead: {
    styleOverrides: {
      root: {
        '& .MuiTableCell-head': {
          fontWeight: 600,
          backgroundColor: mode === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.04)',
        },
      },
    },
  },
});

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#6366f1' : '#818cf8',
        light: '#a5b4fc',
        dark: '#4f46e5',
      },
      secondary: {
        main: mode === 'light' ? '#10b981' : '#34d399',
        light: '#6ee7b7',
        dark: '#059669',
      },
      error: {
        main: '#ef4444',
      },
      warning: {
        main: '#f59e0b',
      },
      background: {
        default: mode === 'light' ? '#f4f6fb' : '#0f172a',
        paper: mode === 'light' ? '#ffffff' : '#1e293b',
      },
      text: {
        primary: mode === 'light' ? '#0f172a' : '#f1f5f9',
        secondary: mode === 'light' ? '#64748b' : '#94a3b8',
      },
      divider: mode === 'light' ? 'rgba(15, 23, 42, 0.08)' : 'rgba(255, 255, 255, 0.08)',
    },
    typography: sharedTypography,
    shape: sharedShape,
    components: sharedComponents(mode),
  });

export const chartColors = [
  '#6366f1',
  '#10b981',
  '#f59e0b',
  '#ec4899',
  '#ef4444',
  '#06b6d4',
  '#8b5cf6',
];
