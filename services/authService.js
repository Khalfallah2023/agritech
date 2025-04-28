import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Remplacez par l'URL de votre API NestJS
const API_URL ='http://172.20.10.2:3000';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, 

});

// Intercepteur pour ajouter le token d'authentification
apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const authService = {
  // Inscription
  register: async (name, email, password) => {
    try {
      console.log("Tentative d'inscription avec:", { name, email, password });
      const response = await apiClient.post('/auth/register', {
        name,
        email,
        password,
      });
      
      if (response.data.access_token) {
        await AsyncStorage.setItem('auth_token', response.data.access_token);
        await AsyncStorage.setItem('user_info', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      console.error("Erreur détaillée:", error);
      throw error.response?.data || error.message;
    }
  },

  // Connexion
  login: async (email, password) => {
    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password,
      });
      
      if (response.data.access_token) {
        await AsyncStorage.setItem('auth_token', response.data.access_token);
        await AsyncStorage.setItem('user_info', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Déconnexion
  logout: async () => {
    await AsyncStorage.removeItem('auth_token');
    await AsyncStorage.removeItem('user_info');
  },

  // Vérifier l'authentification
  isAuthenticated: async () => {
    const token = await AsyncStorage.getItem('auth_token');
    return !!token;
  },

  // Récupérer l'utilisateur actuel
  getCurrentUser: async () => {
    try {
      const userInfo = await AsyncStorage.getItem('user_info');
      return userInfo ? JSON.parse(userInfo) : null;
    } catch (error) {
      console.log('Erreur lors de la récupération des infos utilisateur:', error);
      return null;
    }
  },

  // Mettre à jour le profil
  updateProfile: async (userData) => {
    try {
      const response = await apiClient.patch('/users/profile', userData);
      // Mettre à jour les infos stockées localement
      await AsyncStorage.setItem('user_info', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Récupérer le profil depuis le serveur
  fetchProfile: async () => {
    try {
      const response = await apiClient.get('/users/profile');
      await AsyncStorage.setItem('user_info', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default authService;