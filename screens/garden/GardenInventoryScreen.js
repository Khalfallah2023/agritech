import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { PieChart } from 'react-native-chart-kit';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const GardenInventoryScreen = ({ navigation }) => {
  const nav = useNavigation() || navigation;
  const [activeSort, setActiveSort] = useState('quantity'); // 'quantity', 'name', 'date'
  
  // Données du jardin (similaire à votre structure existante)
  const plants = [
    {
      id: 1,
      title: 'Tomato',
      image: require('../../assets/plante/tomate(2).png'),
      color: '#5B7553',
      backgroundColor: '#0D330E',
      quantity: 12,
      planted: '12/01/2024'
    },
    {
      id: 2,
      title: 'Butterhead Lettuce',
      image: require('../../assets/plante/lettuce.png'),
      color: '#5B7553',
      backgroundColor: '#477023',
      quantity: 8,
      planted: '05/02/2024'
    },
    {
      id: 3,
      title: 'Carrot',
      image: require('../../assets/plante/carrot(1).png'),
      color: '#5B7553',
      backgroundColor: '#6E8649',
      quantity: 20,
      planted: '20/02/2024'
    },
    {
      id: 4,
      title: 'Spinach',
      image: require('../../assets/plante/spinach(2).png'),
      color: '#5B7553',
      backgroundColor: '#C1D95C',
      quantity: 15,
      planted: '15/03/2024'
    },
    {
      id: 5,
      title: 'Bell Pepper',
      image: require('../../assets/plante/carrot(1).png'),
      color: '#5B7553',
      backgroundColor: '#80B155',
      quantity: 6,
      planted: '01/03/2024'
    },
  ];
  
  // Trier les plantes en fonction de l'option de tri active
  const sortedPlants = [...plants].sort((a, b) => {
    if (activeSort === 'quantity') {
      return b.quantity - a.quantity;
    } else if (activeSort === 'name') {
      return a.title.localeCompare(b.title);
    } else if (activeSort === 'date') {
      // Convertir les dates dans un format comparable
      const dateA = new Date(a.planted.split('/').reverse().join('/'));
      const dateB = new Date(b.planted.split('/').reverse().join('/'));
      return dateB - dateA;
    }
    return 0;
  });
  
  // Données pour le graphique
  const chartData = plants.map((plant, index) => ({
    name: plant.title,
    population: plant.quantity,
    color: plant.backgroundColor,
    legendFontColor: '#7F7F7F',
    legendFontSize: 12
  }));
  
  // Calcul du total des plantes
  const totalPlants = plants.reduce((sum, plant) => sum + plant.quantity, 0);
  
  // Header avec recherche et filtre
  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => nav.goBack()}>
        <Icon name="arrow-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.headerTitleSmall}>Garden</Text>
        <Text style={styles.headerTitleLarge}>Inventory</Text>
        <Text style={styles.dateText}>Sunday, 01 Dec 2024</Text>
      </View>
      <TouchableOpacity style={styles.filterButton}>
        <Icon name="filter-list" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
  
  // Options de tri
  const renderSortOptions = () => (
    <View style={styles.sortOptionsContainer}>
      <Text style={styles.sortByText}>Sort by:</Text>
      <View style={styles.sortButtons}>
        <TouchableOpacity 
          style={[styles.sortButton, activeSort === 'quantity' && styles.activeSortButton]}
          onPress={() => setActiveSort('quantity')}
        >
          <Text style={[styles.sortButtonText, activeSort === 'quantity' && styles.activeSortButtonText]}>Quantity</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.sortButton, activeSort === 'name' && styles.activeSortButton]}
          onPress={() => setActiveSort('name')}
        >
          <Text style={[styles.sortButtonText, activeSort === 'name' && styles.activeSortButtonText]}>Name</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.sortButton, activeSort === 'date' && styles.activeSortButton]}
          onPress={() => setActiveSort('date')}
        >
          <Text style={[styles.sortButtonText, activeSort === 'date' && styles.activeSortButtonText]}>Planted</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  
  // Carte sommaire
  const renderSummaryCard = () => (
    <View style={styles.summaryCard}>
      <View style={styles.summaryHeader}>
        <Text style={styles.summaryTitle}>Garden Overview</Text>
        <View style={styles.totalPlantsContainer}>
          <Icon name="spa" size={20} color="#477023" />
          <Text style={styles.totalPlantsText}>{totalPlants} plants</Text>
        </View>
      </View>
      
      <View style={styles.chartContainer}>
        <PieChart
          data={chartData}
          width={Dimensions.get('window').width - 80}
          height={180}
          chartConfig={{
            backgroundColor: '#FFFFFF',
            backgroundGradientFrom: '#FFFFFF',
            backgroundGradientTo: '#FFFFFF',
            color: (opacity = 1) => `rgba(71, 112, 35, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>
    </View>
  );
  
  // Rendu d'une carte de plante
  const renderPlantCard = (plant) => (
    <TouchableOpacity
      key={plant.id}
      style={styles.plantCard}
      onPress={() => nav.navigate('dashboard', { plantId: plant.id, plantName: plant.title })}
    >
      <View style={[styles.plantImageContainer, { backgroundColor: plant.backgroundColor }]}>
        <Image source={plant.image} style={styles.plantImage} />
      </View>
      
      <View style={styles.plantDetails}>
        <Text style={styles.plantTitle}>{plant.title}</Text>
        <Text style={styles.plantedDate}>Planted: {plant.planted}</Text>
        
        <View style={styles.quantityIndicatorContainer}>
          <View style={styles.quantityBar}>
            <View 
              style={[
                styles.quantityFill, 
                { 
                  width: `${Math.min(100, (plant.quantity / Math.max(...plants.map(p => p.quantity))) * 100)}%`,
                  backgroundColor: plant.backgroundColor
                }
              ]} 
            />
          </View>
          <View style={styles.quantityTextContainer}>
            <MaterialCommunityIcons name="seed" size={16} color="#477023" />
            <Text style={styles.quantityText}>{plant.quantity}</Text>
          </View>
        </View>
      </View>
      
      <TouchableOpacity style={styles.moreButton}>
        <Icon name="more-vert" size={24} color="#477023" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
  
  // Navbar
  const renderNavBar = () => (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.navItem} onPress={() => nav.navigate('garden')}>
        <Icon name="home" size={28} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => nav.navigate('addPlante')}>
        <Icon name="local-florist" size={28} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
        <Icon name="spa" size={28} color="#008003" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => nav.navigate('profile')}>
        <Icon name="account-circle" size={28} color="#000" />
      </TouchableOpacity>
    </View>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      
      <ScrollView style={styles.scrollContent}>
        {renderSortOptions()}
        {renderSummaryCard()}
        
        <Text style={styles.sectionTitle}>Plants in Your Garden</Text>
        
        {sortedPlants.map(renderPlantCard)}
        
        <View style={styles.bottomPadding} />
      </ScrollView>
      
      {renderNavBar()}
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
    padding: 10,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: '#477023',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButton: {
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
    fontSize: 28,
    fontWeight: '200',
    color: '#000',
  },
  headerTitleLarge: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#000',
    marginTop: -10,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  scrollContent: {
    flex: 1,
    padding: 20,
  },
  sortOptionsContainer: {
    marginBottom: 15,
  },
  sortByText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#477023',
    marginBottom: 10,
  },
  sortButtons: {
    flexDirection: 'row',
  },
  sortButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  activeSortButton: {
    backgroundColor: '#477023',
    borderColor: '#477023',
  },
  sortButtonText: {
    color: '#477023',
    fontWeight: '500',
  },
  activeSortButtonText: {
    color: '#FFF',
  },
  summaryCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
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
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  totalPlantsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8FFDB',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  totalPlantsText: {
    marginLeft: 5,
    color: '#477023',
    fontWeight: 'bold',
  },
  chartContainer: {
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
  },
  plantCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  plantImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plantImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  plantDetails: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  plantTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  plantedDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  quantityIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityBar: {
    flex: 1,
    height: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    overflow: 'hidden',
    marginRight: 10,
  },
  quantityFill: {
    height: '100%',
    borderRadius: 5,
  },
  quantityTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    marginLeft: 5,
    fontWeight: 'bold',
    color: '#477023',
  },
  moreButton: {
    justifyContent: 'center',
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
  bottomPadding: {
    height: 80,
  },
});

export default GardenInventoryScreen;