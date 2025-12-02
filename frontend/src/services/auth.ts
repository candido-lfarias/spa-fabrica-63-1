import { api } from './api';

export interface LoginData {
  email: string;
  password: string;
}

export const authService = {
  login: async (data: LoginData) => {
    // Exemplo - equipe vai implementar
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  }
};