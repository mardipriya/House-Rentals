import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { NotificationProvider } from './hooks/useNotifications';
import ErrorBoundary from './components/common/ErrorBoundary';
import LoadingSpinner from './components/common/LoadingSpinner';

// Import components
import MainPage from './components/MainPage';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import StatusPage from './components/Status';
import RegisterComplaint from './components/RegisterComplaint';
import ViewComplaints from './components/ViewComplaints';
import ViewApartment from './components/ViewApartment';
import LeaseDetail from './components/LeaseDetail';
import Payments from './components/Payments';
import UpdateStatus from './components/UpdateStatus';
import FixComplaints from './components/FixComplaints';
import UpdatePayments from './components/UpdatePayments';
import GivenLeases from './components/GivenLeases';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
      light: '#ff5983',
      dark: '#9a0036',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner fullScreen message="Loading..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Public Route Component (redirects to home if already authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner fullScreen message="Loading..." />;
  }

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <NotificationProvider>
            <Router>
              <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<MainPage />} />
                  <Route 
                    path="/login" 
                    element={
                      <PublicRoute>
                        <LoginPage />
                      </PublicRoute>
                    } 
                  />

                  {/* Protected Routes */}
                  <Route 
                    path="/home" 
                    element={
                      <ProtectedRoute>
                        <HomePage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/status" 
                    element={
                      <ProtectedRoute>
                        <StatusPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/raise-complaints" 
                    element={
                      <ProtectedRoute>
                        <RegisterComplaint />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/view-complaints" 
                    element={
                      <ProtectedRoute>
                        <ViewComplaints />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/your-lease" 
                    element={
                      <ProtectedRoute>
                        <LeaseDetail />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/apartment/:id" 
                    element={<ViewApartment />} 
                  />
                  <Route 
                    path="/your-payments" 
                    element={
                      <ProtectedRoute>
                        <Payments />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/update-status" 
                    element={
                      <ProtectedRoute>
                        <UpdateStatus />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/fix-complaints" 
                    element={
                      <ProtectedRoute>
                        <FixComplaints />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/update-payments" 
                    element={
                      <ProtectedRoute>
                        <UpdatePayments />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/lease-list" 
                    element={
                      <ProtectedRoute>
                        <GivenLeases />
                      </ProtectedRoute>
                    } 
                  />

                  {/* Catch all route */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Box>
            </Router>
          </NotificationProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
