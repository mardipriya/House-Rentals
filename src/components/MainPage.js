import React from 'react';
import { Box, Container, Typography, Grid, Paper, Fade } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useApartments } from '../hooks/useApartments';
import { useNotifications } from '../hooks/useNotifications';
import Header from './Header';
import Footer from './Footer';
import SearchBar from './common/SearchBar';
import LoadingSpinner from './common/LoadingSpinner';
import ApartmentCard from './common/ApartmentCard';

const MainPage = () => {
  const navigate = useNavigate();
  const { apartments, loading, error, updateFilters, clearFilters } = useApartments();
  const { addNotification } = useNotifications();

  const handleSearch = (searchTerm, filters) => {
    updateFilters({
      location: searchTerm,
      ...filters,
    });
  };

  const handleApartmentClick = (apartmentId) => {
    navigate(`/apartment/${apartmentId}`);
  };

  const handleApplyNow = (apartment) => {
    addNotification({
      type: 'info',
      title: 'Application Started',
      message: `Application process started for ${apartment.address}`,
    });
    navigate(`/apartment/${apartment.id}`);
  };

  if (error) {
    addNotification({
      type: 'error',
      title: 'Error',
      message: error,
    });
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header hasLoginBtn={true} />
      
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 8,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Fade in timeout={1000}>
            <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                }}
              >
                Find Your Dream Home
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  maxWidth: 600,
                  mx: 'auto',
                }}
              >
                Discover the perfect rental property with our comprehensive search and modern platform
              </Typography>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Search Section */}
      <Container maxWidth="lg" sx={{ mt: -4, mb: 6, position: 'relative', zIndex: 3 }}>
        <SearchBar
          onSearch={handleSearch}
          onFiltersChange={updateFilters}
          placeholder="Search by location, amenities, or property type..."
          showFilters={true}
        />
      </Container>

      {/* Apartments Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Available Properties
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {loading ? 'Loading properties...' : `${apartments.length} properties found`}
          </Typography>
        </Box>

        {loading ? (
          <LoadingSpinner message="Loading properties..." />
        ) : (
          <Grid container spacing={3}>
            {apartments.map((apartment) => (
              <Grid item xs={12} sm={6} md={4} key={apartment.id}>
                <ApartmentCard
                  apartment={apartment}
                  onClick={() => handleApartmentClick(apartment.id)}
                  onApplyNow={() => handleApplyNow(apartment)}
                />
              </Grid>
            ))}
          </Grid>
        )}

        {!loading && apartments.length === 0 && (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No properties found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search criteria or filters
            </Typography>
          </Paper>
        )}
      </Container>

      {/* Features Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
            Why Choose Us?
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Easy Search
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Find your perfect home with our advanced search and filtering options
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Secure Payments
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Safe and secure payment processing for all your rental transactions
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  24/7 Support
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Round-the-clock customer support to help you with any questions
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default MainPage;