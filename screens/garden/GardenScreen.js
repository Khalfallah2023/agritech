
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import PlantMetricsOverlay from './PlantMetricsOverlay';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LineChart, BarChart,PieChart, ProgressChart, ContributionGraph } from 'react-native-chart-kit';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const WeatherCard = () => {
  return (
    <View style={styles.container}>
      
      
      <View style={styles.searchBar}>
        <Icon name="search" size={20} color="#FFF" />
        <Text style={styles.searchText}>Search here</Text>
      </View>
      
      <View style={styles.weatherCard}>
        <View style={styles.locationContainer}>
          <Icon name="location-on" size={16} color="#000" />
          <Text style={styles.locationText}>Gabes</Text>
        </View>
        
        <View style={styles.weatherContent}>
          <View style={styles.temperatureContainer}>
            <MaterialCommunityIcons 
              name="weather-partly-cloudy" 
              size={50} 
              color="#477023" 
            />
            <Text style={styles.temperatureText}>+16°C</Text>
          </View>
          
          
        </View>
      </View>
      <Text style={styles.sectionTitle}>My Garden</Text>
    </View>
  );
};

const GardenScreen = ({navigation}) => {
  const nav = useNavigation() || navigation;
  const [activeMetricsPlantId, setActiveMetricsPlantId] = useState(null);
  // Modification des cours pour les plantes
  const plants = [
    {
      id: 1,
      title: 'Tomato',
      image: require('../../assets/plante/tomate(2).png'),
      color: '#5B7553',
      backgroundColor: '#0D330E',
      quantity: 12
    },
    {
      id: 2,
      title: 'Butterhead Lettuce',
      image: require('../../assets/plante/lettuce.png'), // Assurez-vous de créer ce dossier avec les images
      color: '#5B7553', // Vert foncé
      backgroundColor: '#477023', // Vert légèrement plus clair pour le fond
      quantity: 8    
    },
    {
      id: 3,
      title: 'Carrot',
      image: require('../../assets/plante/carrot(1).png'),
      color: '#5B7553',
      backgroundColor: '#6E8649',
      quantity: 20
    },
    {
      id: 4,
      title: 'Spinach',
      image: require('../../assets/plante/spinach(2).png'),
      color: '#5B7553',
      backgroundColor: '#C1D95C',
      quantity: 15
    },
    {
      id: 5,
      title: 'Carrot',
      image: require('../../assets/plante/carrot(1).png'),
      color: '#5B7553',
      backgroundColor: '#80B155',
      quantity: 20
    },
    {
      id: 6,
      title: 'Spinach',
      image: require('../../assets/plante/spinach(2).png'),
      color: '#5B7553',
      backgroundColor: '#6A8761',
      quantity: 35
    },
    
    
  ];

  const renderPlantCard = (plant) => (
    <View
      key={plant.id}
      style={[styles.plantCard, { backgroundColor: plant.backgroundColor }]}
    >
      <View style={styles.plantInfo}>
        <View style={styles.iconContainer}>
          <Icon name="spa" size={20} color="#000" />
        </View>
        <Text style={styles.plantTitle}>{plant.title}</Text>
      </View>
      
      <View style={styles.plantImageContainer}>
      <TouchableOpacity 
        onPress={() => setActiveMetricsPlantId(
          activeMetricsPlantId === plant.id ? null : plant.id
        )}>
        <Image source={plant.image} style={styles.plantImage} />
        <PlantMetricsOverlay 
        visible={activeMetricsPlantId === plant.id} 
        plant={plant} 
      />
      </TouchableOpacity>
      
      </View>
      
     
      
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.goButton}
          onPress={() => nav.navigate('dashboard', { 
            plantId: plant.id,
            plantName: plant.title 
          })}
        >
           <Text style={styles.arrowIcon}>↗</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );

  const renderNavBar = () => (
    <View style={styles.navbar}>
      <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
        <Icon name="home" size={28} color="#008003" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => nav.navigate('addPlante')}>
        <Icon name="local-florist" size={28} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}onPress={() => nav.navigate('gardenInventoryScreen')}>
        <Icon name="spa" size={28} color="#000" />
      </TouchableOpacity>
      
      
      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => nav.navigate('profile')}
      >
        <Icon name="account-circle" size={28} color="#000" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
      
        <TouchableOpacity style={styles.backButton} onPress={() => nav.goBack()}>
          <Icon name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
        <Text style={styles.headerTitleSmall}>Hello,</Text>
        <Text style={styles.headerTitleLarge}>Farmers</Text>
        <Text style={styles.dateText}>Sunday, 01 Dec 2024</Text>
    
        
          
        </View>
        <TouchableOpacity 
         style={styles.addButton}
         onPress={() => nav.navigate('addPlante')}>
          <Icon name="add" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
      <WeatherCard />
      <ScrollView style={styles.scrollContent}>
        {plants.map(renderPlantCard)}
        <View style={styles.bottomPadding} />
      </ScrollView>
      
      {renderNavBar()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:0.9,
    backgroundColor: '#E8FFDB', // Vert foncé
  },
  header: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    paddingTop: 20,
    paddingHorizontal: 20,
  
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 15,
    marginBottom:200,
    marginHorizontal: 20, 
    paddingBottom:200,
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#477023',
    marginHorizontal: 20,
    borderRadius: 25,
    padding: 10,
    alignItems: 'center',
    marginBottom: 15,
    
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchText: {
    color: '#FFF',
    marginLeft: 10,
  },
  locationText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#000',
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: '#477023',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    width: 40,
    height: 40,
    backgroundColor: '#477023',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
     marginLeft: -100,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  headerTitleSmall: {
    fontSize: 30,
    fontWeight: '200',
    color: '#000',
  },
  arrowIcon: {
    fontSize: 21,
    color: '#000',
  },
  headerTitleLarge: {
    fontSize: 36,
    fontWeight:30,
    color: '#000',
    marginTop: -10,
  },
 
 
  scrollContent: {
    flex: 5,
    padding: 20,
  },
  bottomPadding: {
    height: 80, // Espace pour que le contenu ne soit pas caché par la navbar
  },
  plantCard: {
    borderRadius: 40,
    padding: 1*20,
    marginBottom: 10,
    height: 230,
  },
  plantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    width: 30,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  plantTitle: {
    fontSize: 16,
    fontWeight: '300',
    color: '#000',
  },
  plantImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
  },
  plantImage: {
    marginTop:60,
    width: 200,
    height:180,
    resizeMode: 'contain',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  circleButton: {
    width: 36,
    height: 36,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goButton: {
    marginTop: -220,
    right: -290,
    width: 50,
    height: 50,
    backgroundColor: '#rgba(255, 255, 255, 0.2)', // Jaune
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,},shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
  },
  
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 18,
    backgroundColor: '#E8FFDB', // Vert un peu plus foncé que le fond
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    position: 'absolute',
    bottom: -85,
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
  weatherCard: {
    backgroundColor: '#FFFFFF', // White background
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 15,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  locationText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#000',
  },
  weatherContent: {
   
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  temperatureContainer: {
    position: (500 ,200) ,
    flexDirection: 'row',
    alignItems: 'center',
  },
  temperatureText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 5,
  },
  weatherDetails: {
    flex: 1,
    marginLeft: 20,
  },
  weatherDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  weatherDetailItem: {
    alignItems: 'center',
  },
  weatherDetailText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 5,
  },
  weatherDetailLabel: {
    fontSize: 10,
    color: '#666',
  },
  sunContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sunItem: {
    alignItems: 'center',
  },
  sunText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 5,
  },
  sunLabel: {
    fontSize: 10,
    color: '#666',
  },
  
});


export default GardenScreen;