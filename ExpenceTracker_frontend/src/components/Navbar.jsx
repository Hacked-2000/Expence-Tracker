import { useState } from 'react';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../store/themeSlice';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Menu,
  MenuItem,
  Avatar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LogoutIcon from '@mui/icons-material/Logout';
import { clearSession, getUser } from '../utils/apiEndpoints';

const navItems = [
  { label: 'Dashboard', path: '/' },
  { label: 'Expenses', path: '/expenses' },
];

const getInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileAnchor, setProfileAnchor] = useState(null);
  const user = getUser();

  const handleLogout = () => {
    setProfileAnchor(null);
    clearSession();
    navigate('/login');
  };

  const navLinks = (
    <>
      {navItems.map((item) => (
        <Button
          key={item.path}
          component={RouterLink}
          to={item.path}
          color="inherit"
          className={`nav-link-btn ${location.pathname === item.path ? 'active' : ''}`}
          onClick={() => setDrawerOpen(false)}
        >
          {item.label}
        </Button>
      ))}
    </>
  );

  return (
    <>
      <AppBar position="sticky" elevation={1}>
        <Toolbar>
          {isMobile && (
            <IconButton color="inherit" edge="start" onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Expense Tracker
          </Typography>
          {!isMobile && navLinks}
          <IconButton color="inherit" onClick={() => dispatch(toggleTheme())}>
            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          <IconButton
            className="profile-trigger"
            color="inherit"
            onClick={(e) => setProfileAnchor(e.currentTarget)}
            aria-label="profile menu"
          >
            <Avatar className="profile-trigger-avatar">
              {getInitials(user?.name)}
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={profileAnchor}
            open={Boolean(profileAnchor)}
            onClose={() => setProfileAnchor(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            slotProps={{
              paper: { className: 'profile-menu-paper' },
            }}
          >
            <Box
              className="profile-menu-header"
            >
              <Avatar className="profile-menu-avatar">
                {getInitials(user?.name)}
              </Avatar>
              <Box sx={{ minWidth: 0 }}>
                <div className="profile-menu-name">{user?.name}</div>
              </Box>
            </Box>
            <Box className="profile-menu-actions">
              <MenuItem
                onClick={handleLogout}
                className="profile-logout-btn"
                sx={{ color: 'text.secondary' }}
              >
                <LogoutIcon fontSize="small" />
                Logout
              </MenuItem>
            </Box>
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 240, pt: 2 }}>
          <List>
            {navItems.map((item) => (
              <ListItemButton
                key={item.path}
                component={RouterLink}
                to={item.path}
                selected={location.pathname === item.path}
                onClick={() => setDrawerOpen(false)}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
