import { Farm } from '../../types';
import apiClient from '../apiClient';

export const farmsService = {
  getFarms: (params?: { page?: number; limit?: number }) => apiClient.get<Farm[]>('/farms', { params }),
  createFarm: (data: any) => apiClient.post('/farms', data),
  updateFarm: (id: number, data: any) => apiClient.put(`/farms/${id}`, data),
  deleteFarm: (id: number) => apiClient.delete(`/farms/${id}`),
};