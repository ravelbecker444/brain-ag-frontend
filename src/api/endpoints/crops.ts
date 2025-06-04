import { Crop } from '../../types';
import apiClient from '../apiClient';

export const cropsService = {
  getCrops: (params?: { page?: number; limit?: number }) => apiClient.get<Crop[]>('/crops', { params}),
  getCropsByFarm: (farmId: number) => apiClient.get(`/crops/farm/${farmId}`),
  createCrop: (data: any) => apiClient.post('/crops', data),
  updateCrop: (id: number, data: any) => apiClient.put(`/crops/${id}`, data),
  deleteCrop: (id: number) => apiClient.delete(`/crops/${id}`),
};