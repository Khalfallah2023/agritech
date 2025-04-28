import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LineChart, BarChart } from 'react-native-chart-kit';

import { plantMetricService } from '../../services/api.service'; 
// Update this with your API URL

const PlantDashboard = ({ navigation }) => {
  const nav = useNavigation() || navigation;
  const route = useRoute();
  const { plantId, plantName, plantImage } = route.params || { 
    plantId: null, 
    plantName: '',
    plantImage: ''
  };

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [plantData, setPlantData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch plant data from backend
  const fetchPlantData = async () => {
    try {
      setLoading(true);
      setError(null);
  
      if (!plantId) {
        throw new Error('Plant ID not provided');
      }
  
      // Use the correct service method that matches your backend
      const response = await plantMetricService.getPlantDashboard(plantId);
      setPlantData(response.data);
    } catch (err) {
      console.error('Error fetching plant data:', err);
      setError(err.message || 'Failed to load plant data');
      Alert.alert('Error', 'Failed to load plant data. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  useEffect(() => {
    fetchPlantData();
  }, [plantId]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchPlantData();
  };

  // Function to get plant image
  const getPlantImage = (imageName) => {
    switch(imageName) {
      case 'tomato(2).png': return require('../../assets/plante/tomate(2).png');
      case 'tomate(2).png': return require('../../assets/plante/tomate(2).png');
      case 'lettuce.png': return require('../../assets/plante/lettuce.png');
      case 'carrot(1).png': return require('../../assets/plante/carrot(1).png');
      case 'spinach(2).png': return require('../../assets/plante/spinach(2).png');
      default: return require('../../assets/plante/tomate(2).png');
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#477023" />
        <Text style={styles.loadingText}>Loading plant data...</Text>
      </SafeAreaView>
    );
  }

  if (error || !plantData) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Icon name="error-outline" size={40} color="#e74c3c" />
        <Text style={styles.errorText}>{error || 'Failed to load plant data'}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchPlantData}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // Extract data from response
  const { plant, currentMetrics, historicalData } = plantData;
  console.log('API Response for plants:', currentMetrics);
  console.log('API Response for plants:', historicalData );
  console.log('API Response for plants:', plant);
  // Format data for charts
  const temperatureData = {
    labels: historicalData.labels,
    datasets: [
      {
        data: historicalData.temperatureHistory,
        color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const phData = {
    labels: historicalData.labels,
    datasets: [
      {
        data: historicalData.phHistory,
        color: (opacity = 1) => `rgba(75, 192, 192, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const humidityData = {
    labels: historicalData.labels,
    datasets: [
      {
        data: historicalData.humidityHistory,
        color: (opacity = 1) => `rgba(52, 152, 219, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const nutrientsData = {
    labels: ['N', 'K', 'Ca', 'P'],
    datasets: [
      {
        data: [
          currentMetrics.nitrogen,
          currentMetrics.potassium,
          currentMetrics.calcium,
          currentMetrics.phosphorus,
        ],
      },
    ],
  };

  // Format dates
  const plantingDateFormatted = plant.plantingDate ? new Date(plant.plantingDate).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Not set';
  const harvestDateFormatted = plant.expectedHarvest ? new Date(plant.expectedHarvest).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Not set';
  const lastWateredFormatted = plant.lastWatered ? new Date(plant.lastWatered).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Not recorded';

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => nav.goBack()}>
          <Icon name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitleSmall}>{plant.title}</Text>
          <Text style={styles.headerTitleLarge}>Dashboard</Text>
        </View>
        <TouchableOpacity style={styles.settingsButton} onPress={handleRefresh}>
          <Icon name="refresh" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollContent}>
        {/* Plant Image and Basic Info */}
        <View style={styles.plantHeader}>
          <Image source={getPlantImage(plant.image)} style={styles.plantImage} />
          <View style={styles.plantBasicInfo}>
            <Text style={styles.plantDate}>Planted: {plantingDateFormatted}</Text>
            <Text style={styles.plantDate}>Expected harvest: {harvestDateFormatted}</Text>
          </View>
        </View>
        
        {/* 1. Soil pH */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Icon name="science" size={24} color="#477023" />
            <Text style={styles.sectionTitle}>Soil pH</Text>
          </View>
          
          {/* pH Meter */}
          <View style={styles.phContainer}>
            <Text style={styles.phTitle}>Current pH: {currentMetrics.ph}</Text>
            <View style={styles.phScale}>
              <View style={styles.phScaleLine}>
                {[...Array(14)].map((_, index) => (
                  <View 
                    key={index} 
                    style={[
                      styles.phMarker, 
                      index === Math.round(currentMetrics.ph) && styles.phMarkerCurrent
                    ]}
                  />
                ))}
              </View>
              <View style={styles.phLabels}>
                <Text style={styles.phLabelAcidic}>Acidic</Text>
                <Text style={styles.phLabelNeutral}>Neutral</Text>
                <Text style={styles.phLabelAlkaline}>Alkaline</Text>
              </View>
            </View>
          </View>
          
          {/* pH History Chart */}
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>pH Trend (Last {historicalData.labels.length} Months)</Text>
            <LineChart
              data={phData}
              width={Dimensions.get('window').width - 60}
              height={180}
              yAxisSuffix=""
              chartConfig={{
                backgroundColor: '#E8FFDB',
                backgroundGradientFrom: '#E8FFDB',
                backgroundGradientTo: '#E8FFDB',
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(75, 192, 192, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: { borderRadius: 16 },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#3498db',
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
        </View>
        
        {/* 2. Soil Temperature */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Icon name="thermostat" size={24} color="#477023" />
            <Text style={styles.sectionTitle}>Soil Temperature</Text>
          </View>
          
          {/* Temperature Display */}
          <View style={styles.temperatureContainer}>
            <View style={styles.temperatureHeader}>
              <Text style={styles.temperatureTitle}>Current Temperature</Text>
              <Text style={styles.temperatureValue}>{currentMetrics.temperature}°C</Text>
            </View>
            
            <View style={styles.temperatureInfo}>
              <View style={styles.temperatureIndicator}>
                <Icon name="arrow-upward" size={20} color="#e74c3c" />
                <Text style={styles.temperatureText}>Max: 26°C</Text>
              </View>
              <View style={styles.temperatureIndicator}>
                <Icon name="arrow-downward" size={20} color="#3498db" />
                <Text style={styles.temperatureText}>Min: 20°C</Text>
              </View>
              <View style={styles.temperatureIndicator}>
                <Icon name="check-circle" size={20} color="#477023" />
                <Text style={styles.temperatureText}>Optimal: 22-26°C</Text>
              </View>
            </View>
          </View>
          
          {/* Temperature History Chart */}
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Temperature Trend (Last {historicalData.labels.length} Months)</Text>
            <LineChart
              data={temperatureData}
              width={Dimensions.get('window').width - 60}
              height={180}
              yAxisSuffix="°C"
              chartConfig={{
                backgroundColor: '#E8FFDB',
                backgroundGradientFrom: '#E8FFDB',
                backgroundGradientTo: '#E8FFDB',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: { borderRadius: 16 },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#FF8C00',
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
        </View>
        
        {/* 3. Soil Humidity */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Icon name="water-drop" size={24} color="#477023" />
            <Text style={styles.sectionTitle}>Soil Humidity</Text>
          </View>
          
          {/* Humidity Display */}
          <View style={styles.humidityContainer}>
            <View style={styles.humidityHeader}>
              <Text style={styles.humidityTitle}>Current Humidity</Text>
              <Text style={styles.humidityValue}>{currentMetrics.humidity}%</Text>
            </View>
            
            <View style={styles.humidityInfo}>
              <View style={styles.humidityIndicator}>
                <Icon name="arrow-upward" size={20} color="#3498db" />
                <Text style={styles.humidityText}>Max: 75%</Text>
              </View>
              <View style={styles.humidityIndicator}>
                <Icon name="arrow-downward" size={20} color="#e74c3c" />
                <Text style={styles.humidityText}>Min: 55%</Text>
              </View>
              <View style={styles.humidityIndicator}>
                <Icon name="check-circle" size={20} color="#477023" />
                <Text style={styles.humidityText}>Optimal: 60-70%</Text>
              </View>
            </View>
            
            {/* Watering Information */}
            <View style={styles.wateringInfo}>
              <View style={styles.wateringItem}>
                <Icon name="schedule" size={20} color="#477023" />
                <Text style={styles.wateringText}>Schedule: {plant.wateringSchedule}</Text>
              </View>
              <View style={styles.wateringItem}>
                <Icon name="update" size={20} color="#477023" />
                <Text style={styles.wateringText}>Last watered: {lastWateredFormatted}</Text>
              </View>
            </View>
          </View>
          
          {/* Humidity Gauge */}
          <View style={styles.humidityGaugeContainer}>
            <View style={styles.humidityGauge}>
              <View 
                style={[
                  styles.humidityGaugeFill, 
                  { width: `${currentMetrics.humidity}%` }
                ]} 
              />
            </View>
            <View style={styles.humidityGaugeLabels}>
              <Text style={styles.humidityGaugeLabel}>Dry</Text>
              <Text style={styles.humidityGaugeLabel}>Optimal</Text>
              <Text style={styles.humidityGaugeLabel}>Wet</Text>
            </View>
          </View>
          
          {/* Humidity History Chart */}
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Humidity Trend (Last {historicalData.labels.length} Months)</Text>
            <LineChart
              data={humidityData}
              width={Dimensions.get('window').width - 60}
              height={180}
              yAxisSuffix="%"
              chartConfig={{
                backgroundColor: '#E8FFDB',
                backgroundGradientFrom: '#E8FFDB',
                backgroundGradientTo: '#E8FFDB',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(52, 152, 219, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: { borderRadius: 16 },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#3498db',
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
        </View>
        
        {/* 4. Soil Nutrients */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Icon name="grain" size={24} color="#477023" />
            <Text style={styles.sectionTitle}>Soil Nutrients</Text>
          </View>
          
          {/* Nutrients */}
          <View style={styles.nutrientsContainer}>
            <Text style={styles.nutrientsTitle}>Nutrient Levels</Text>
            <BarChart
              data={nutrientsData}
              width={Dimensions.get('window').width - 60}
              height={180}
              yAxisSuffix="%"
              chartConfig={{
                backgroundColor: '#E8FFDB',
                backgroundGradientFrom: '#E8FFDB',
                backgroundGradientTo: '#E8FFDB',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(71, 112, 35, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: { borderRadius: 16 },
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
            <View style={styles.nutrientLegend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, {backgroundColor: '#477023'}]} />
                <Text style={styles.legendText}>N: Nitrogen</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, {backgroundColor: '#477023'}]} />
                <Text style={styles.legendText}>K: Potassium</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, {backgroundColor: '#477023'}]} />
                <Text style={styles.legendText}>Ca: Calcium</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, {backgroundColor: '#477023'}]} />
                <Text style={styles.legendText}>P: Phosphorus</Text>
              </View>
            </View>
            
            {/* Nutrient Information Cards */}
            <View style={styles.nutrientCards}>
              <View style={styles.nutrientCard}>
                <Text style={styles.nutrientCardTitle}>Nitrogen (N)</Text>
                <Text style={styles.nutrientCardValue}>{currentMetrics.nitrogen}%</Text>
                <Text style={styles.nutrientCardDesc}>Essential for leaf growth</Text>
              </View>
              <View style={styles.nutrientCard}>
                <Text style={styles.nutrientCardTitle}>Potassium (K)</Text>
                <Text style={styles.nutrientCardValue}>{currentMetrics.potassium}%</Text>
                <Text style={styles.nutrientCardDesc}>Improves fruit quality</Text>
              </View>
              <View style={styles.nutrientCard}>
                <Text style={styles.nutrientCardTitle}>Calcium (Ca)</Text>
                <Text style={styles.nutrientCardValue}>{currentMetrics.calcium}%</Text>
                <Text style={styles.nutrientCardDesc}>Prevents blossom end rot</Text>
              </View>
              <View style={styles.nutrientCard}>
                <Text style={styles.nutrientCardTitle}>Phosphorus (P)</Text>
                <Text style={styles.nutrientCardValue}>{currentMetrics.phosphorus}%</Text>
                <Text style={styles.nutrientCardDesc}>Supports root development</Text>
              </View>
            </View>
          </View>
          
          {/* Environmental Indicators */}
          <View style={styles.envIndicators}>
            <View style={styles.indicatorItem}>
              <Icon name="compress" size={24} color="#477023" />
              <Text style={styles.indicatorText}>Pressure: {currentMetrics.pressure}</Text>
            </View>
            <View style={styles.indicatorItem}>
              <Icon name="air" size={24} color="#477023" />
              <Text style={styles.indicatorText}>Air Quality: {currentMetrics.airQuality}</Text>
            </View>
            <View style={styles.indicatorItem}>
              <Icon name="air" size={24} color="#477023" />
              <Text style={styles.indicatorText}>Wind: {currentMetrics.windSpeed}</Text>
            </View>
          </View>
        </View>
        
        {/* 5. Plant Growth */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Icon name="eco" size={24} color="#477023" />
            <Text style={styles.sectionTitle}>Plant Growth</Text>
          </View>
          
          <View style={styles.growthContainer}>
            <Text style={styles.growthPhase}>{plant.growthPhase}</Text>
            
            {/* Growth Progress Bar */}
            <View style={styles.growthProgressContainer}>
              <Text style={styles.growthProgressTitle}>Total Progress</Text>
              <View style={styles.growthProgressBarContainer}>
                <View 
                  style={[styles.growthProgressBar, { width: `${plant.growthProgress}%` }]} 
                />
              </View>
              <Text style={styles.growthProgressValue}>{plant.growthProgress}%</Text>
            </View>
            
            {/* Growth Phases */}
            <View style={styles.growthPhases}>
              <View style={[styles.phaseItem, plant.growthPhase.includes('Seedling') ? styles.phaseItemActive : null]}>
                <View style={styles.phaseIcon}>
                  <Icon name="filter-1" size={20} color="#FFFFFF" />
                </View>
                <Text style={styles.phaseText}>Seedling</Text>
              </View>
              <View style={[styles.phaseItem, plant.growthPhase.includes('Flowering') ? styles.phaseItemActive : null]}>
                <View style={styles.phaseIcon}>
                  <Icon name="filter-2" size={20} color="#FFFFFF" />
                </View>
                <Text style={styles.phaseText}>Flowering</Text>
              </View>
      
              <View style={[styles.phaseItem, plant.growthPhase.includes('Fruiting') ? styles.phaseItemActive : null]}>
                <View style={[styles.phaseIcon, !plant.growthPhase.includes('Fruiting') && styles.phaseIconInactive]}>
                  <Icon name="filter-3" size={20} color={plant.growthPhase.includes('Fruiting') ? "#FFFFFF" : "#477023"} />
                </View>
                <Text style={styles.phaseText}>Fruiting</Text>
              </View>
              <View style={[styles.phaseItem, plant.growthPhase.includes('Harvest') ? styles.phaseItemActive : null]}>
                <View style={[styles.phaseIcon, !plant.growthPhase.includes('Harvest') && styles.phaseIconInactive]}>
                  <Icon name="filter-4" size={20} color={plant.growthPhase.includes('Harvest') ? "#FFFFFF" : "#477023"} />
                </View>
                <Text style={styles.phaseText}>Harvest</Text>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.bottomPadding} />
      </ScrollView>
      
      {/* Bottom Navigation Bar */}
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

// Make sure to add the loading and error styles
const styles = StyleSheet.create({
  // Add these new styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F8F2',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#477023',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F8F2',
    padding: 20,
  },
  errorText: {
    marginTop: 15,
    fontSize: 16,
    color: '#e74c3c',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: '#477023',
    borderRadius: 25,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    backgroundColor: '#E8FFDB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    paddingTop: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: '#477023',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsButton: {
    width: 40,
    height: 40,
    backgroundColor: '#477023',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  headerTitleSmall: {
    fontSize: 24,
    fontWeight: '300',
    color: '#000',
  },
  headerTitleLarge: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginTop: -5,
  },
  scrollContent: {
    flex: 1,
    padding: 20,
  },
  plantHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  plantImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  plantBasicInfo: {
    marginLeft: 15,
  },
  plantDate: {
    fontSize: 14,
    color: '#444',
    marginBottom: 5,
  },
  sectionContainer: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#477023',
    marginLeft: 10,
  },
  phContainer: {
    marginBottom: 20,
  },
  phTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  phScale: {
    marginTop: 5,
  },
  phScaleLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 3,
  },
  phMarker: {
    width: 8,
    height: 14,
    backgroundColor: '#ddd',
    borderRadius: 4,
  },
  phMarkerCurrent: {
    backgroundColor: '#477023',
  },
  phLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  phLabelAcidic: {
    fontSize: 12,
    color: '#e74c3c',
  },
  phLabelNeutral: {
    fontSize: 12,
    color: '#3498db',
  },
  phLabelAlkaline: {
    fontSize: 12,
    color: '#9b59b6',
  },
  nutrientsContainer: {
    marginBottom: 20,
  },
  nutrientsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  nutrientLegend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    marginBottom: 15,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 5,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: '#555',
  },
  nutrientCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  nutrientCard: {
    width: '48%',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  nutrientCardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#477023',
  },
  nutrientCardValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 5,
  },
  nutrientCardDesc: {
    fontSize: 12,
    color: '#666',
  },
  envIndicators: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  indicatorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    width: '48%',
  },
  indicatorText: {
    fontSize: 13,
    color: '#555',
    marginLeft: 5,
  },
  temperatureContainer: {
    marginBottom: 20,
  },
  temperatureHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  temperatureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  temperatureValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF8C00',
  },
  temperatureInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  temperatureIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 5,
  },
  temperatureText: {
    fontSize: 13,
    color: '#555',
    marginLeft: 5,
  },
  humidityContainer: {
    marginBottom: 20,
  },
  humidityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  humidityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  humidityValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3498db',
  },
  humidityInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  humidityIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 5,
  },
  humidityText: {
    fontSize: 13,
    color: '#555',
    marginLeft: 5,
  },
  wateringInfo: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
    marginTop: 5,
  },
  wateringItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  wateringText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  humidityGaugeContainer: {
    marginBottom: 20,
  },
  humidityGauge: {
    height: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  humidityGaugeFill: {
    height: 20,
    backgroundColor: '#3498db',
    borderRadius: 10,
  },
  humidityGaugeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  humidityGaugeLabel: {
    fontSize: 12,
    color: '#555',
  },
  chartContainer: {
    marginBottom: 10,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  growthContainer: {
    alignItems: 'center',
  },
  growthPhase: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#477023',
    marginBottom: 15,
  },
  growthProgressContainer: {
    width: '100%',
    marginBottom: 20,
  },
  growthProgressTitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  growthProgressBarContainer: {
    height: 25,
    backgroundColor: '#f0f0f0',
    borderRadius: 12.5,
    overflow: 'hidden',
  },
  growthProgressBar: {
    height: 25,
    backgroundColor: '#477023',
    borderRadius: 12.5,
  },
  growthProgressValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#477023',
    textAlign: 'right',
    marginTop: 5,
  },
  growthPhases: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  phaseItem: {
    alignItems: 'center',
    width: '22%',
  },
  phaseItemActive: {
    opacity: 1,
  },
  phaseIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#477023',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  phaseIconInactive: {
    backgroundColor: '#E8FFDB',
    borderWidth: 2,
    borderColor: '#477023',
  },
  phaseText: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
  },
  bottomPadding: {
    height: 80,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#E8FFDB',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    padding: 10,
    borderRadius: 20,
  },
  activeNavItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
});

export default PlantDashboard;