import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Animated, Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const PlantMetricsOverlay = ({ visible, plant }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [pulseAnim] = useState(new Animated.Value(1));
  
  // Animation pour les cercles concentriques
  useEffect(() => {
    if (visible) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [visible]);
  
  // Métriques modernisées avec données plus détaillées
  const metrics = [
    { 
      id: 'temperature', 
      icon: 'thermometer',
      name: 'Temperature',
      value: '25°C', 
      status: 'Optimal',
      position: { top: 0, right: 120 },
      gradient: ['#FF8A65', '#FF5722'],
      details: 'Current temperature is in the optimal range for healthy growth.'
    },
    { 
      id: 'humidity', 
      icon: 'water-percent',
      name: 'Humidity',
      value: '65%', 
      status: 'Good',
      position: { top: 20, left: 120 },
      gradient: ['#64B5F6', '#1E88E5'],
      details: 'Humidity levels are good. Maintain these levels for optimal leaf development.'
    },
    { 
      id: 'ph', 
      icon: 'flask',
      name: 'pH Level',
      value: 'pH 6.5', 
      status: 'Optimal',
      position: { bottom: 0, left: 120 },
      gradient: ['#BA68C8', '#7B1FA2'],
      details: 'Soil pH is in the ideal range for nutrient absorption.'
    },
    { 
      id: 'nutrients', 
      icon: 'leaf',
      name: 'Nutrients',
      value: 'Good', 
      status: 'Sufficient',
      position: { bottom: 20, right: 120 },
      gradient: ['#AED581', '#689F38'],
      details: 'Nutrient levels are sufficient. Consider fertilizing in 2 weeks.'
    }
  ];

  const handleMetricPress = (metric) => {
    setSelectedMetric(metric);
    setModalVisible(true);
  };

  if (!visible) return null;

  const getStatusColor = (status) => {
    switch(status) {
      case 'Optimal': return '#4CAF50';
      case 'Good': return '#8BC34A';
      case 'Sufficient': return '#CDDC39';
      case 'Warning': return '#FFC107';
      case 'Critical': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  return (
    <View style={styles.overlayContainer}>
      {/* Cercles concentriques animés */}
      <View style={styles.concentricCircles}>
        <Animated.View 
          style={[
            styles.circle, 
            styles.circle1,
            { transform: [{ scale: pulseAnim }] }
          ]} 
        />
        <Animated.View 
          style={[
            styles.circle, 
            styles.circle2,
            { transform: [{ scale: pulseAnim }] }
          ]} 
        />
        <Animated.View 
          style={[
            styles.circle, 
            styles.circle3,
            { transform: [{ scale: pulseAnim }] }
          ]} 
        />
      </View>

      {/* Indicateurs de métriques */}
      {metrics.map((metric) => (
        <TouchableOpacity
          key={metric.id}
          style={[styles.metricCard, metric.position]}
          onPress={() => handleMetricPress(metric)}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={metric.gradient}
            style={styles.metricCardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.metricIconContainer}>
              <MaterialCommunityIcons name={metric.icon} size={22} color="#FFF" />
            </View>
            <View style={styles.metricTextContainer}>
              <Text style={styles.metricName}>{metric.name}</Text>
              <Text style={styles.metricValue}>{metric.value}</Text>
              <View style={styles.statusContainer}>
                <View style={[styles.statusDot, { backgroundColor: getStatusColor(metric.status) }]} />
                <Text style={styles.statusText}>{metric.status}</Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      ))}
      
      {/* Modal détaillé modernisé */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <LinearGradient
              colors={selectedMetric?.gradient || ['#9E9E9E', '#616161']}
              style={styles.modalHeader}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.modalTitleContainer}>
                <MaterialCommunityIcons name={selectedMetric?.icon} size={24} color="#FFF" />
                <Text style={styles.modalTitle}>
                  {selectedMetric?.name}
                </Text>
              </View>
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Icon name="close" size={24} color="#FFF" />
              </TouchableOpacity>
            </LinearGradient>
            
            <View style={styles.modalBody}>
              <View style={styles.plantInfoRow}>
                <Text style={styles.plantName}>{plant?.title || 'Your Plant'}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(selectedMetric?.status) }]}>
                  <Text style={styles.statusBadgeText}>{selectedMetric?.status}</Text>
                </View>
              </View>
              
              <View style={styles.valueContainer}>
                <Text style={styles.currentValueText}>{selectedMetric?.value}</Text>
                <Text style={styles.valueDescription}>{selectedMetric?.details}</Text>
              </View>
              
              <View style={styles.optimalRangeContainer}>
                <Text style={styles.sectionTitle}>Optimal Range</Text>
                <View style={styles.rangeBar}>
                  <View style={styles.rangeProgress} />
                  <View style={styles.rangeIndicator} />
                </View>
                <Text style={styles.optimalRangeText}>
                  {selectedMetric?.id === 'temperature' ? '20°C - 28°C' : 
                   selectedMetric?.id === 'humidity' ? '60% - 75%' :
                   selectedMetric?.id === 'ph' ? 'pH: 6.0 - 7.0' : 
                   selectedMetric?.id === 'nutrients' ? 'Medium to High' : 'N/A'}
                </Text>
              </View>
              
              <View style={styles.recommendationsContainer}>
                <Text style={styles.sectionTitle}>Recommendations</Text>
                <View style={styles.recommendationCard}>
                  <MaterialCommunityIcons 
                    name={selectedMetric?.id === 'temperature' ? 'thermometer-check' : 
                          selectedMetric?.id === 'humidity' ? 'water-check' :
                          selectedMetric?.id === 'ph' ? 'test-tube' : 'leaf-maple'} 
                    size={20} 
                    color="#4CAF50" 
                  />
                  <Text style={styles.recommendationText}>
                    {selectedMetric?.id === 'temperature' ? 'Current temperature is ideal. Maintain between 20-28°C.' : 
                     selectedMetric?.id === 'humidity' ? 'Mist leaves every 2-3 days to maintain humidity.' :
                     selectedMetric?.id === 'ph' ? 'Add lime if pH drops below 6.0.' : 
                     selectedMetric?.id === 'nutrients' ? 'Apply balanced fertilizer in 2 weeks.' : 
                     'Keep monitoring for optimal growth.'}
                  </Text>
                </View>
              </View>
              
              <TouchableOpacity style={styles.historyButton}>
                <MaterialCommunityIcons name="chart-line" size={20} color="#FFF" />
                <Text style={styles.historyButtonText}>View History</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Styles pour les cercles concentriques animés
  concentricCircles: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    position: 'absolute',
    borderRadius: 200,
    borderWidth: 1,
  },
  circle1: {
    width: 100,
    height: 100,
    borderColor: 'rgba(139, 195, 74, 0.3)',
  },
  circle2: {
    width: 180,
    height: 180,
    borderColor: 'rgba(77, 182, 172, 0.2)',
  },
  circle3: {
    width: 260,
    height: 260,
    borderColor: 'rgba(3, 169, 244, 0.1)',
  },
  
  // Style pour les cartes métriques
  metricCard: {
    position: 'absolute',
    width: width * 0.35,
    height: 90,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  metricCardGradient: {
    flex: 1,
    flexDirection: 'row',
    padding: 12,
  },
  metricIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  metricTextContainer: {
    flex: 1,
  },
  metricName: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  metricValue: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 5,
  },
  statusText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 12,
  },
  
  // Styles pour le modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    width: '90%',
    maxWidth: 400,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  modalTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginLeft: 8,
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    padding: 20,
  },
  plantInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  plantName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#424242',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '500',
  },
  valueContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: 16,
    marginBottom: 16,
  },
  currentValueText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 8,
  },
  valueDescription: {
    fontSize: 14,
    color: '#616161',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#424242',
    marginBottom: 8,
  },
  optimalRangeContainer: {
    marginBottom: 16,
  },
  rangeBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginVertical: 8,
    position: 'relative',
  },
  rangeProgress: {
    position: 'absolute',
    height: '100%',
    width: '60%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  rangeIndicator: {
    position: 'absolute',
    height: 16,
    width: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#4CAF50',
    top: -4,
    left: '60%',
    marginLeft: -8,
  },
  optimalRangeText: {
    fontSize: 14,
    color: '#616161',
  },
  recommendationsContainer: {
    marginBottom: 20,
  },
  recommendationCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F1F8E9',
    borderRadius: 12,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#8BC34A',
  },
  recommendationText: {
    flex: 1,
    fontSize: 14,
    color: '#424242',
    marginLeft: 10,
    lineHeight: 20,
  },
  historyButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5C6BC0',
    borderRadius: 12,
    paddingVertical: 12,
  },
  historyButtonText: {
    color: '#FFF',
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default PlantMetricsOverlay;