import { useState, useEffect, useCallback, useMemo } from 'react';
import { apartmentService } from '../services/apartmentService';

export const useApartments = () => {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    date: null,
    bedrooms: null,
    priceRange: null,
    location: '',
    amenities: [],
  });

  const fetchApartments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apartmentService.getAvailableApartments();
      setApartments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApartments();
  }, [fetchApartments]);

  const filteredApartments = useMemo(() => {
    return apartments.filter(apartment => {
      // Date filter
      if (filters.date) {
        const apartmentDate = new Date(apartment.availableFrom);
        const filterDate = new Date(filters.date);
        if (apartmentDate < filterDate) return false;
      }

      // Bedrooms filter
      if (filters.bedrooms && apartment.bedrooms !== filters.bedrooms) {
        return false;
      }

      // Price range filter
      if (filters.priceRange) {
        const { min, max } = filters.priceRange;
        if (apartment.rent < min || apartment.rent > max) return false;
      }

      // Location filter
      if (filters.location && !apartment.address.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }

      // Amenities filter
      if (filters.amenities.length > 0) {
        const apartmentAmenities = apartment.amenities || [];
        const hasAllAmenities = filters.amenities.every(amenity => 
          apartmentAmenities.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    });
  }, [apartments, filters]);

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      date: null,
      bedrooms: null,
      priceRange: null,
      location: '',
      amenities: [],
    });
  }, []);

  const getApartmentById = useCallback((id) => {
    return apartments.find(apt => apt.id === id);
  }, [apartments]);

  const refreshApartments = useCallback(() => {
    fetchApartments();
  }, [fetchApartments]);

  return {
    apartments: filteredApartments,
    allApartments: apartments,
    loading,
    error,
    filters,
    updateFilters,
    clearFilters,
    getApartmentById,
    refreshApartments,
  };
}; 