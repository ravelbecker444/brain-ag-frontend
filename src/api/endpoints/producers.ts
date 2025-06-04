import apiClient from '../apiClient';
import { Producer } from '../../types';

export const producersService = {
  getProducers: (params?: { page?: number; limit?: number }) => {
    return apiClient.get<Producer[]>('/producers', { params });
  },
  createProducer: (data: Omit<Producer, 'id'>) => {
    return apiClient.post<Producer>('/producers', data);
  },
  updateProducer: (id: number, data: Partial<Producer>) => {
    return apiClient.put<Producer>(`/producers/${id}`, data);
  },
  deleteProducer: (id: number) => {
    return apiClient.delete(`/producers/${id}`);
  },
};