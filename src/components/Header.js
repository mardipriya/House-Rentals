
import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Container,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  AccountCircle,
  Menu as MenuIcon,
  Home,
  Search,
  Notifications,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import NotificationSystem from './common/NotificationSystem';

const Header = ({ hasLoginBtn = false }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = React.useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileMenuAnchor(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };

  const handleProfile = () => {
    handleMenuClose();
    navigate('/home');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navigationItems = [
    { label: 'Home', path: '/home', icon: <Home /> },
    { label: 'Search', path: '/', icon: <Search /> },
  ];

  const renderNavigationItems = () => (
    <Box sx={{ display: 'flex', gap: 1 }}>
      {navigationItems.map((item) => (
        <Button
          key={item.path}
          color="inherit"
          startIcon={item.icon}
          onClick={() => navigate(item.path)}
          sx={{
            bgcolor: isActive(item.path) ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          {item.label}
        </Button>
      ))}
    </Box>
  );

  const renderAuthSection = () => {
    if (!isAuthenticated) {
      return (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            color="inherit"
            onClick={() => navigate('/login')}
            sx={{
              border: '1px solid rgba(255, 255, 255, 0.3)',
              '&:hover': {
                border: '1px solid rgba(255, 255, 255, 0.5)',
                bgcolor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            Login
          </Button>
        </Box>
      );
    }

    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <NotificationSystem />
        
        <IconButton
          color="inherit"
          onClick={handleProfileMenuOpen}
          sx={{ ml: 1 }}
        >
          {user?.avatar ? (
            <Avatar src={user.avatar} sx={{ width: 32, height: 32 }} />
          ) : (
            <AccountCircle />
          )}
        </IconButton>
      </Box>
    );
  };

  return (
    <AppBar position="sticky" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar sx={{ px: { xs: 0 } }}>
          {/* Logo */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 0,
              cursor: 'pointer',
              fontWeight: 700,
              mr: 4,
            }}
            onClick={() => navigate('/')}
          >
            HouseRentals
          </Typography>

          {/* Desktop Navigation */}
          {!isMobile && isAuthenticated && (
            <Box sx={{ flexGrow: 1 }}>
              {renderNavigationItems()}
            </Box>
          )}

          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Auth Section */}
          {!isMobile && renderAuthSection()}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              color="inherit"
              onClick={handleMobileMenuOpen}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Profile Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleProfile}>
              <AccountCircle sx={{ mr: 1 }} />
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              Logout
            </MenuItem>
          </Menu>

          {/* Mobile Menu */}
          <Menu
            anchorEl={mobileMenuAnchor}
            open={Boolean(mobileMenuAnchor)}
            onClose={handleMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {isAuthenticated ? (
              <>
                {navigationItems.map((item) => (
                  <MenuItem
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      handleMenuClose();
                    }}
                  >
                    {item.icon}
                    <Typography sx={{ ml: 1 }}>{item.label}</Typography>
                  </MenuItem>
                ))}
                <MenuItem onClick={handleProfile}>
                  <AccountCircle sx={{ mr: 1 }} />
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  Logout
                </MenuItem>
              </>
            ) : (
              <MenuItem
                onClick={() => {
                  navigate('/login');
                  handleMenuClose();
                }}
              >
                Login
              </MenuItem>
            )}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;