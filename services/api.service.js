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
export const plantService = {
  getAllPlants: () => {
    return apiClient.get('/user-plants');
  }
};


// Services pour les plantes de l'utilisateur
export const userPlantService = {
  getUserPlants: () => {
    return apiClient.get('/user-plants');
  },
  
  // Modified function to match your backend's expectations
  addPlantToUser: (plantData) => {
    // Extract plantId from the data
    const { plantId, ...requestData } = plantData;
    
    // Format the date in the correct format (YYYY-MM-DD)
    if (requestData.plantingDate) {
      // Ensure date is in the right format for your backend
      const dateObj = new Date(requestData.plantingDate);
      requestData.plantingDate = dateObj.toISOString().split('T')[0];
    }
    
    console.log(`Attempting to POST to: ${API_URL}/user-plants/${plantId}`);
    console.log('With data:', requestData);
    
    // Send request to the correct endpoint with properly formatted data
    return apiClient.post(`/user-plants/${plantId}`, requestData);
  },
  
  removePlantFromUser: (plantId) => {
    return apiClient.delete(`/user-plants/${plantId}`);
  }
};

// Services pour les métriques des plantes
export const plantMetricService = {
  // This might not exist based on your controller
  getAllMetrics: () => {
    return apiClient.get('/plant-metrics');
  },
  
  // Current metrics endpoint
  getCurrentMetrics: (plantId) => {
    return apiClient.get(`/plant-metrics/${plantId}/current`);
  },
  
  // Historical metrics endpoint
  getHistoricalMetrics: (plantId) => {
    return apiClient.get(`/plant-metrics/${plantId}/history`);
  },
  
  // Dashboard endpoint - this is the one you need for PlantDashboard
  getPlantDashboard: (plantId) => {
    return apiClient.get(`/plant-metrics/${plantId}/dashboard`);
  },
  
  // Add metric reading endpoint
  addMetricReading: (plantId, metricData) => {
    return apiClient.post(`/plant-metrics/${plantId}`, metricData);
  }
};

// Service pour la météo
export const weatherService = {
  getCurrentWeather: () => {
    return apiClient.get('/weather/current');
  }
};