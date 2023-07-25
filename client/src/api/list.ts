import api from './api';

export const getTodos = () => api.get('/todos');
