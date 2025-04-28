import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import PlantMetricsOverlay from './PlantMetricsOverlay';
import { fetchUserPlants, removePlantFromUser } from '../../redux/reducers/userPlantsReducer';
import { fetchLatestMetrics } from '../../redux/reducers/metricsReducer';
import { fetchCurrentWeather } from '../../redux/reducers/weatherReducer';

const WeatherCard = () => {
  const dispatch = useDispatch();
  const { data: weather, loading, error } = useSelector(state => state.weather);

  useEffect(() => {
    dispatch(fetchCurrentWeather());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.weatherContainer}>
        <ActivityIndicator size="large" color="#477023" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.weatherContainer}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Impossible de charger les données météo</Text>
        </View>
      </View>
    );
  }

  // Données météo par défaut si l'API échoue
  const weatherData = weather || {
    location: 'Gabes',
    temperature: 16,
    humidity: 68,
    windSpeed: 15,
    timestamp: new Date().toISOString()
  };

  const formattedDate = new Date(weatherData.timestamp).toLocaleDateString('en-US', {
    weekday: 'long',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  return (
    <View style={styles.weatherContainer}>
      <View style={styles.searchBar}>
        <Icon name="search" size={20} color="#FFF" />
        <Text style={styles.searchText}>Rechercher ici</Text>
      </View>
      
      <View style={styles.weatherCard}>
        <View style={styles.weatherHeader}>
          <View style={styles.locationContainer}>
            <Icon name="location-on" size={16} color="#333" />
            <Text style={styles.locationText}>{weatherData.location}</Text>
          </View>
          <Text style={styles.dateText}>{formattedDate}</Text>
        </View>
        
        <View style={styles.weatherContent}>
          <MaterialCommunityIcons 
            name="weather-partly-cloudy" 
            size={50} 
            color="#477023" 
          />
          <Text style={styles.temperatureText}>+{weatherData.temperature}°C</Text>
          <View style={styles.weatherDetails}>
            <View style={styles.weatherDetailItem}>
              <Text style={styles.weatherDetailLabel}>Humidité</Text>
              <Text style={styles.weatherDetailValue}>{weatherData.humidity}%</Text>
            </View>
            <View style={styles.weatherDetailItem}>
              <Text style={styles.weatherDetailLabel}>Vent</Text>
              <Text style={styles.weatherDetailValue}>{weatherData.windSpeed} km/h</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const GardenScreen = ({ navigation }) => {
  const nav = useNavigation() || navigation;
  const dispatch = useDispatch();
  const [activeMetricsPlantId, setActiveMetricsPlantId] = useState(null);
  
  const { plants, loading, error } = useSelector(state => state.userPlants);
  const { plantMetrics } = useSelector(state => state.metrics);

  // Charger les plantes de l'utilisateur
 useEffect(() => {
  // Log l'état actuel des plantes
  console.log('Current plants in state:', plants);
  
  // Essayer de charger les plantes
  dispatch(fetchUserPlants())
    .unwrap()
    .then(data => {
      console.log('Successfully fetched plants:', data);
    })
    .catch(err => {
      console.error('Error in fetchUserPlants:', err);
      Alert.alert(
        "Erreur de chargement",
        "Impossible de charger vos plantes. Veuillez vérifier votre connexion réseau.",
        [{ text: "OK" }]
      );
    });
}, [dispatch]);

  // Charger les métriques quand une plante est sélectionnée
  useEffect(() => {
    if (activeMetricsPlantId) {
      dispatch(fetchLatestMetrics(activeMetricsPlantId));
    }
  }, [activeMetricsPlantId, dispatch]);

  const handleRemovePlantFromUser = (plantId) => {
    Alert.alert(
      "Confirmation",
      "Êtes-vous sûr de vouloir supprimer cette plante de votre jardin ?",
      [
        { 
          text: "Annuler", 
          style: "cancel" 
        },
        { 
          text: "Supprimer", 
          style: "destructive",
          onPress: () => {
            console.log('Suppression de la plante avec l\'ID:', plantId);
            dispatch(removePlantFromUser(plantId))
              .unwrap()
              .then(() => {
                // Réinitialiser l'overlay si la plante supprimée était active
                if (activeMetricsPlantId === plantId) {
                  setActiveMetricsPlantId(null);
                }
              })
              .catch((error) => {
                Alert.alert("Erreur", "Impossible de supprimer la plante. Veuillez réessayer.");
              });
          }
        }
      ]
    );
  };

  // Fonction pour obtenir la source d'image correcte
  const getPlantImage = (imageName) => {
    switch(imageName) {
      case 'tomato(2).png': return require('../../assets/plante/tomate(2).png');
      case 'lettuce.png': return require('../../assets/plante/lettuce.png');
      case 'carrot(1).png': return require('../../assets/plante/carrot(1).png');
      case 'spinach(2).png': return require('../../assets/plante/spinach(2).png');
      default: return require('../../assets/plante/tomate(2).png');  // image par défaut
    }
  };

  const renderPlantCard = (plant,index) => (
    <View
      key={`${plant.id}-${index}`}
      style={[styles.plantCard, { backgroundColor: plant.backgroundColor }]}
    >
      <View style={styles.plantCardContent}>
        <View style={styles.plantInfo}>
          <View style={styles.iconContainer}>
            <Icon name="spa" size={20} color="#FFF" />
          </View>
          <Text style={[styles.plantTitle, { color: plant.color }]}>{plant.title}</Text>
          <View style={styles.quantityBadge}>
            <Text style={styles.quantityText}>{plant.quantity}</Text>
          </View>
        </View>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.removeButton}
            onPress={() => handleRemovePlantFromUser(plant.id)}
          >
            <Icon name="delete" size={18} color="#FFF" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.goButton}
            onPress={() => nav.navigate('dashboard', { 
              plantId: plant.id,
              plantName: plant.title,
              plantImage: plant.image
            })}
          
          >
            <Text style={styles.arrowIcon}>↗</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.plantImageContainer}
        onPress={() => setActiveMetricsPlantId(
          activeMetricsPlantId === plant.id ? null : plant.id
        )}>
        <Image 
          source={getPlantImage(plant.image)} 
          style={styles.plantImage} 
        />
        {activeMetricsPlantId === plant.id && (
          <PlantMetricsOverlay 
            visible={true} 
            plant={plant}
            metrics={plantMetrics[plant.id] || []}
          />
        )}
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8FFDB" />
      
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitleSmall}>Hello,</Text>
          <Text style={styles.headerTitleLarge}>Farmers</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => nav.navigate('addPlante')}
        >
          <Icon name="add" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
      
      <WeatherCard />
      
      <View style={styles.gardenSection}>
        <Text style={styles.sectionTitle}>My Garden</Text>
        <TouchableOpacity 
          style={styles.viewAllButton}
          onPress={() => nav.navigate('gardenInventoryScreen')}
        >
          <Text style={styles.viewAllText}>View All</Text>
          <Icon name="arrow-forward" size={16} color="#477023" />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        style={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#477023" />
            <Text style={styles.loadingText}>Chargement de vos plantes...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Icon name="error" size={48} color="#FF5252" />
            <Text style={styles.errorText}>Impossible de charger vos plantes</Text>
            <TouchableOpacity 
              style={styles.retryButton}
              onPress={() => dispatch(fetchUserPlants())}
            >
              <Text style={styles.retryButtonText}>Réessayer</Text>
            </TouchableOpacity>
          </View>
        ) : plants.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Icon name="spa" size={60} color="#477023" />
            <Text style={styles.emptyText}>Votre jardin est vide</Text>
            <TouchableOpacity 
              style={styles.addPlantButton}
              onPress={() => nav.navigate('addPlante')}
            >
              <Text style={styles.addPlantButtonText}>Ajouter des Plantes</Text>
            </TouchableOpacity>
          </View>
        ) : (
          plants.map((plant, index) => renderPlantCard(plant, index))
        )}
        <View style={styles.bottomPadding} />
      </ScrollView>
      
      <View style={styles.navbar}>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <Icon name="home" size={28} color="#477023" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => nav.navigate('addPlante')}
        >
          <Icon name="local-florist" size={28} color="#555" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => nav.navigate('gardenInventoryScreen')}
        >
          <Icon name="spa" size={28} color="#555" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => nav.navigate('profile')}
        >
          <Icon name="account-circle" size={28} color="#555" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8FFDB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  titleContainer: {
    flexDirection: 'column',
  },
  headerTitleSmall: {
    fontSize: 20,
    fontWeight: '300',
    color: '#555',
  },
  headerTitleLarge: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    marginTop: -5,
  },
  addButton: {
    width: 48,
    height: 48,
    backgroundColor: '#477023',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  weatherContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
    minHeight: 150,
    justifyContent: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#477023',
    borderRadius: 25,
    padding: 12,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
  },
  searchText: {
    color: '#FFF',
    marginLeft: 10,
    fontWeight: '400',
  },
  weatherCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    elevation: 4,
  },
  weatherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  weatherContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  temperatureText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 15,
    marginRight: 20,
  },
  weatherDetails: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  weatherDetailItem: {
    alignItems: 'center',
  },
  weatherDetailLabel: {
    fontSize: 12,
    color: '#666',
  },
  weatherDetailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  gardenSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: '#477023',
    marginRight: 5,
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  plantCard: {
    borderRadius: 24,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 4,
  },
  plantCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  plantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  plantTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginRight: 10,
  },
  quantityBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  quantityText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  removeButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  goButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowIcon: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  plantImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 160,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  plantImage: {
    width: 180,
    height: 150,
    resizeMode: 'contain',
  },
  bottomPadding: {
    height: 80,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#E8FFDB',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 8,
  },
  navItem: {
    padding: 10,
    borderRadius: 20,
  },
  activeNavItem: {
    backgroundColor: 'rgba(71, 112, 35, 0.1)',
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#477023',
  },
  errorContainer: {
    padding: 40,
    alignItems: 'center',
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: '#FF5252',
    marginBottom: 15,
  },
  retryButton: {
    backgroundColor: '#477023',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    marginTop: 10,
    fontSize: 18,
    color: '#555',
    marginBottom: 20,
  },
});

export default GardenScreen;