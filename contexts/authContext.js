import React, { createContext, useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux'; // Ajout de l'import pour Redux
import authService from '../services/authService';
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Ajout du dispatch Redux
  const dispatch = useDispatch();

  // Fonction pour mettre à jour Redux
  const updateAuthState = (userData) => {
    if (userData) {
      dispatch({ type: 'AUTH_SUCCESS', payload: userData });
    } else {
      dispatch({ type: 'AUTH_LOGOUT' });
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const isAuth = await authService.isAuthenticated();
        
        if (isAuth) {
          const userData = await authService.getCurrentUser();
          setUser(userData);
          dispatch({ type: 'LOGIN_SUCCESS', payload: userData });
          
          // Mettre à jour Redux également
          updateAuthState(userData);
          
          // Optionnel: récupérer les informations à jour depuis le serveur
          try {
            const freshUserData = await authService.fetchProfile();
            setUser(freshUserData);
            // Mettre à jour Redux avec les données fraîches
            updateAuthState(freshUserData);
          } catch (profileError) {
            console.log('Erreur lors de la récupération du profil:', profileError);
          }
        }
      } catch (err) {
        setError('Erreur lors du chargement de l\'utilisateur');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadUser();
  }, [dispatch]);

  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log("AuthContext: Tentative d'inscription avec", { name, email });
      const response = await authService.register(name, email, password);
      console.log("AuthContext: Réponse du service:", response);
      
      if (!response || !response.user) {
        throw new Error("Réponse invalide du service d'authentification");
      }
      
      setUser(response.user);
      // Mettre à jour Redux avec les données utilisateur
      updateAuthState(response.user);
      setLoading(false);
      return response;
    } catch (err) {
      console.error("AuthContext: Erreur d'inscription:", err);
      const errorMessage = err.message || 'Erreur lors de l\'inscription';
      setError(errorMessage);
      setLoading(false);
      throw err;
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.login(email, password);
      setUser(response.user);
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.user });

      // Mettre à jour Redux avec les données utilisateur
      updateAuthState(response.user);
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.message || 'Identifiants incorrects');
      setLoading(false);
      throw err;
    }
  };

  const logout = async () => {
    setLoading(true);
    
    try {
      await authService.logout();
      setUser(null);
      dispatch({ type: 'LOGOUT' });
      // Mettre à jour Redux pour indiquer la déconnexion
      updateAuthState(null);
    } catch (err) {
      setError('Erreur lors de la déconnexion');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedUser = await authService.updateProfile(userData);
      setUser(updatedUser);
      // Mettre à jour Redux avec les données utilisateur mises à jour
      updateAuthState(updatedUser);
      setLoading(false);
      return updatedUser;
    } catch (err) {
      setError(err.message || 'Erreur lors de la mise à jour du profil');
      setLoading(false);
      throw err;
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
};