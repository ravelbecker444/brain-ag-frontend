import apiClient from '../apiClient';

export const dashboardService = {
  getSummary: async () => {
    return apiClient.get('/dashboard/summary');
  },
  getByState: async () => {
    return apiClient.get('/dashboard/by-state');
  },
  getByCrop: async () => {
    return apiClient.get('/dashboard/by-crop');
  },
  getLandUsage: async () => {
    return apiClient.get('/dashboard/land-usage');
  },
  getFullReport: async () => {
    return apiClient.get('/dashboard/full-report');
  },
};