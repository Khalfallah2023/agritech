// config/environment.js
export const API_URL = __DEV__ 
  ? 'http://192.168.1.X:3000' // Adresse IP locale pour le développement
  : 'http://localhost:3000';
  

export const APP_ENV = __DEV__ ? 'development' : 'production';