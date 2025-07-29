import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

export const complaintService = {
  // Get all complaints
  async getAllComplaints() {
    try {
      const response = await apiClient.get('/api/complaints');
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch complaints');
    }
  },

  // Get user's complaints
  async getUserComplaints(userId) {
    try {
      const response = await apiClient.get(`/api/complaints/user/${userId}`);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user complaints');
    }
  },

  // Create new complaint
  async createComplaint(userId, complaintData) {
    try {
      const response = await apiClient.post(`/api/complaints/${userId}`, complaintData);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create complaint');
    }
  },

  // Update complaint
  async updateComplaint(complaintId, complaintData) {
    try {
      const response = await apiClient.patch(`/api/complaints/${complaintId}`, complaintData);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update complaint');
    }
  },

  // Delete complaint
  async deleteComplaint(complaintId) {
    try {
      const response = await apiClient.delete(`/api/complaints/${complaintId}`);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete complaint');
    }
  },

  // Get complaint by ID
  async getComplaintById(complaintId) {
    try {
      const response = await apiClient.get(`/api/complaints/${complaintId}`);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch complaint details');
    }
  },

  // Update complaint status
  async updateComplaintStatus(complaintId, status) {
    try {
      const response = await apiClient.patch(`/api/complaints/${complaintId}/status`, { status });
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update complaint status');
    }
  },

  // Get complaint statistics
  async getComplaintStats() {
    try {
      const response = await apiClient.get('/api/complaints/stats');
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch complaint statistics');
    }
  },
}; 