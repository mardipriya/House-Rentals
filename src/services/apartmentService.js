import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const apartmentService = {
  // Get all available apartments
  async getAvailableApartments() {
    try {
      const response = await apiClient.get('/api/apartments/available');
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch apartments');
    }
  },

  // Get apartment by ID
  async getApartmentById(id) {
    try {
      const response = await apiClient.get(`/api/apartments/${id}`);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch apartment details');
    }
  },

  // Submit lease application
  async submitLeaseApplication(apartmentId, applicationData) {
    try {
      const response = await apiClient.post(`/api/apartments/${apartmentId}/apply`, applicationData);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to submit application');
    }
  },

  // Create new apartment (admin only)
  async createApartment(apartmentData) {
    try {
      const response = await apiClient.post('/api/apartments', apartmentData);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create apartment');
    }
  },

  // Update apartment
  async updateApartment(apartmentId, apartmentData) {
    try {
      const response = await apiClient.put(`/api/apartments/${apartmentId}`, apartmentData);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update apartment');
    }
  },

  // Delete apartment
  async deleteApartment(apartmentId) {
    try {
      const response = await apiClient.delete(`/api/apartments/${apartmentId}`);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete apartment');
    }
  },

  // Search apartments
  async searchApartments(searchParams) {
    try {
      const response = await apiClient.get('/api/apartments/search', { params: searchParams });
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to search apartments');
    }
  },

  // Get apartment statistics
  async getApartmentStats() {
    try {
      const response = await apiClient.get('/api/apartments/stats');
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch statistics');
    }
  },
}; 