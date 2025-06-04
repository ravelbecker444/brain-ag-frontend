import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://brain-ag-api-cqe8.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;