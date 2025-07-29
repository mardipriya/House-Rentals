import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Button,
  Rating,
  IconButton,
  Fade,
} from '@mui/material';
import {
  LocationOn,
  Bed,
  Bathtub,
  SquareFoot,
  Favorite,
  FavoriteBorder,
  Star,
} from '@mui/icons-material';
import { formatCurrency } from '../../utils/formatters';

const ApartmentCard = ({
  apartment,
  onClick,
  onApplyNow,
  showFavorite = true,
  showRating = true,
}) => {
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const getDefaultImage = () => {
    return apartment.images?.[0] || '/images/default-apartment.jpg';
  };

  const amenities = apartment.amenities || [];
  const rating = apartment.rating || 4.5;
  const reviewCount = apartment.reviewCount || 12;

  return (
    <Fade in timeout={300}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
          },
        }}
        onClick={onClick}
      >
        {/* Image Section */}
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="200"
            image={imageError ? getDefaultImage() : apartment.image || getDefaultImage()}
            alt={apartment.address}
            onError={handleImageError}
            sx={{ objectFit: 'cover' }}
          />
          
          {/* Favorite Button */}
          {showFavorite && (
            <IconButton
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                bgcolor: 'rgba(255, 255, 255, 0.9)',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 1)',
                },
              }}
              onClick={handleFavoriteClick}
            >
              {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
            </IconButton>
          )}

          {/* Price Tag */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 8,
              left: 8,
              bgcolor: 'primary.main',
              color: 'white',
              px: 2,
              py: 0.5,
              borderRadius: 1,
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              {formatCurrency(apartment.rent)}
            </Typography>
            <Typography variant="caption">/month</Typography>
          </Box>

          {/* Available Badge */}
          {apartment.available && (
            <Chip
              label="Available Now"
              color="success"
              size="small"
              sx={{
                position: 'absolute',
                top: 8,
                left: 8,
                bgcolor: 'success.main',
                color: 'white',
              }}
            />
          )}
        </Box>

        {/* Content Section */}
        <CardContent sx={{ flexGrow: 1, p: 2 }}>
          {/* Address */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
            <LocationOn sx={{ color: 'text.secondary', mr: 0.5, mt: 0.2 }} />
            <Typography variant="h6" component="h3" noWrap>
              {apartment.address}
            </Typography>
          </Box>

          {/* Rating */}
          {showRating && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={rating} precision={0.5} size="small" readOnly />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({reviewCount} reviews)
              </Typography>
            </Box>
          )}

          {/* Property Details */}
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Bed sx={{ color: 'text.secondary', mr: 0.5 }} />
              <Typography variant="body2">
                {apartment.bedrooms} bed
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Bathtub sx={{ color: 'text.secondary', mr: 0.5 }} />
              <Typography variant="body2">
                {apartment.bathrooms} bath
              </Typography>
            </Box>
            {apartment.squareFootage && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SquareFoot sx={{ color: 'text.secondary', mr: 0.5 }} />
                <Typography variant="body2">
                  {apartment.squareFootage} sq ft
                </Typography>
              </Box>
            )}
          </Box>

          {/* Amenities */}
          {amenities.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                {amenities.slice(0, 3).map((amenity) => (
                  <Chip
                    key={amenity}
                    label={amenity}
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: '0.7rem' }}
                  />
                ))}
                {amenities.length > 3 && (
                  <Chip
                    label={`+${amenities.length - 3} more`}
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: '0.7rem' }}
                  />
                )}
              </Box>
            </Box>
          )}

          {/* Available Date */}
          {apartment.availableFrom && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Available from: {new Date(apartment.availableFrom).toLocaleDateString()}
            </Typography>
          )}

          {/* Action Button */}
          <Button
            variant="contained"
            fullWidth
            onClick={(e) => {
              e.stopPropagation();
              onApplyNow?.(apartment);
            }}
            sx={{ mt: 'auto' }}
          >
            Apply Now
          </Button>
        </CardContent>
      </Card>
    </Fade>
  );
};

export default ApartmentCard; 