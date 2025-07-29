import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Autocomplete,
  Chip,
  Paper,
  Typography,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Collapse,
  Button,
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  FilterList as FilterIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';
import { debounce } from 'lodash';

const SearchBar = ({
  onSearch,
  onFiltersChange,
  placeholder = 'Search apartments...',
  showFilters = true,
  initialFilters = {},
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState(initialFilters);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((term, filters) => {
      onSearch(term, filters);
    }, 300),
    [onSearch]
  );

  useEffect(() => {
    debouncedSearch(searchTerm, filters);
  }, [searchTerm, filters, debouncedSearch]);

  const handleSearchChange = (event, value) => {
    setSearchTerm(value || '');
  };

  const handleFilterChange = (filterName, value) => {
    const newFilters = { ...filters, [filterName]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setFilters(initialFilters);
  };

  const handleClearFilters = () => {
    setFilters(initialFilters);
    onFiltersChange?.(initialFilters);
  };

  const bedroomOptions = [
    { value: 1, label: '1 Bedroom' },
    { value: 2, label: '2 Bedrooms' },
    { value: 3, label: '3 Bedrooms' },
    { value: 4, label: '4+ Bedrooms' },
  ];

  const amenityOptions = [
    'Parking',
    'Gym',
    'Pool',
    'Balcony',
    'Air Conditioning',
    'Dishwasher',
    'In-Unit Laundry',
    'Pet Friendly',
    'Furnished',
    'High-Speed Internet',
  ];

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: showFilters ? 2 : 0 }}>
        <Autocomplete
          freeSolo
          options={suggestions}
          value={searchTerm}
          onChange={handleSearchChange}
          onInputChange={(event, value) => setSearchTerm(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={placeholder}
              variant="outlined"
              size="small"
              fullWidth
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    {searchTerm && (
                      <IconButton size="small" onClick={handleClearSearch}>
                        <ClearIcon />
                      </IconButton>
                    )}
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        {showFilters && (
          <IconButton
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            color={showAdvancedFilters ? 'primary' : 'default'}
          >
            {showAdvancedFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            <FilterIcon sx={{ ml: 0.5 }} />
          </IconButton>
        )}
      </Box>

      {showFilters && (
        <Collapse in={showAdvancedFilters}>
          <Box sx={{ pt: 2, borderTop: 1, borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
              {/* Bedrooms Filter */}
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Bedrooms</InputLabel>
                <Select
                  value={filters.bedrooms || ''}
                  onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                  label="Bedrooms"
                >
                  <MenuItem value="">Any</MenuItem>
                  {bedroomOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Price Range Filter */}
              <Box sx={{ minWidth: 200 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Price Range: ${filters.priceRange?.[0] || 0} - ${filters.priceRange?.[1] || 5000}
                </Typography>
                <Slider
                  value={filters.priceRange || [0, 5000]}
                  onChange={(event, newValue) => handleFilterChange('priceRange', newValue)}
                  valueLabelDisplay="auto"
                  min={0}
                  max={5000}
                  step={100}
                />
              </Box>
            </Box>

            {/* Amenities Filter */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Amenities
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {amenityOptions.map((amenity) => (
                  <Chip
                    key={amenity}
                    label={amenity}
                    size="small"
                    onClick={() => {
                      const currentAmenities = filters.amenities || [];
                      const newAmenities = currentAmenities.includes(amenity)
                        ? currentAmenities.filter((a) => a !== amenity)
                        : [...currentAmenities, amenity];
                      handleFilterChange('amenities', newAmenities);
                    }}
                    color={
                      filters.amenities?.includes(amenity) ? 'primary' : 'default'
                    }
                    variant={
                      filters.amenities?.includes(amenity) ? 'filled' : 'outlined'
                    }
                  />
                ))}
              </Box>
            </Box>

            {/* Clear Filters Button */}
            <Button
              variant="outlined"
              size="small"
              onClick={handleClearFilters}
              disabled={Object.keys(filters).length === 0}
            >
              Clear Filters
            </Button>
          </Box>
        </Collapse>
      )}
    </Paper>
  );
};

export default SearchBar; 