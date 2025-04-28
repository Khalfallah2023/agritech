import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { PieChart } from 'react-native-chart-kit';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPlants } from '../../redux/reducers/userPlantsReducer';

const GardenInventoryScreen = ({ navigation }) => {
  const nav = useNavigation() || navigation;
  const [activeSort, setActiveSort] = useState('quantity'); // 'quantity', 'name', 'date'
  const dispatch = useDispatch();
  
  // Get plants data from Redux store
  const { plants, loading, error } = useSelector(state => state.userPlants);
  
  // Fetch plants when the component mounts
  useEffect(() => {
    dispatch(fetchUserPlants());
  }, [dispatch]);
  
  // Format the current date
  const getCurrentDate = () => {
    const date = new Date();
    const options = { weekday: 'long', day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  
  // Handle sorting
  const sortedPlants = [...plants].sort((a, b) => {
    if (activeSort === 'quantity') {
      return b.quantity - a.quantity;
    } else if (activeSort === 'name') {
      return a.title.localeCompare(b.title);
    } else if (activeSort === 'date') {
      // Convert dates to comparable format
      const dateA = new Date(a.plantingDate || '2000/01/01');
      const dateB = new Date(b.plantingDate || '2000/01/01');
      return dateB - dateA;
    }
    return 0;
  });
  
  // Format the planting date for display
  const formatPlantingDate = (dateString) => {
    if (!dateString) return "Not planted yet";
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };
  
  // Data for the pie chart
  const chartData = plants.map((plant) => ({
    name: plant.title,
    population: plant.quantity,
    color: plant.backgroundColor || '#477023',
    legendFontColor: '#7F7F7F',
    legendFontSize: 12
  }));
  
  // Calculate total plants
  const totalPlants = plants.reduce((sum, plant) => sum + (plant.quantity || 0), 0);
  
  // Header with search and filter
  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => nav.goBack()}>
        <Icon name="arrow-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.headerTitleSmall}>Garden</Text>
        <Text style={styles.headerTitleLarge}>Inventory</Text>
        <Text style={styles.dateText}>{getCurrentDate()}</Text>
      </View>
      <TouchableOpacity style={styles.filterButton}>
        <Icon name="filter-list" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
  
  // Sort options
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
  
  // Summary card
  const renderSummaryCard = () => (
    <View style={styles.summaryCard}>
      <View style={styles.summaryHeader}>
        <Text style={styles.summaryTitle}>Garden Overview</Text>
        <View style={styles.totalPlantsContainer}>
          <Icon name="spa" size={20} color="#477023" />
          <Text style={styles.totalPlantsText}>{totalPlants} plants</Text>
        </View>
      </View>
      
      {plants.length > 0 ? (
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
      ) : (
        <View style={styles.emptyChartMessage}>
          <Text style={styles.emptyText}>No plants data available</Text>
        </View>
      )}
    </View>
  );
  const getPlantImage = (imageName) => {
    switch(imageName) {
      case 'tomato(2).png': return require('../../assets/plante/tomate(2).png');
      case 'lettuce.png': return require('../../assets/plante/lettuce.png');
      case 'carrot(1).png': return require('../../assets/plante/carrot(1).png');
      case 'spinach(2).png': return require('../../assets/plante/spinach(2).png');
      default: return require('../../assets/plante/tomate(2).png');  // image par défaut
    }
  };
  // Plant card
  const renderPlantCard = (plant) => {
    // Find the maximum quantity for scaling the bar
    const maxQuantity = Math.max(...plants.map(p => p.quantity || 1));
    
    return (
      <TouchableOpacity
        key={plant.id}
        style={styles.plantCard}
        onPress={() => nav.navigate('dashboard', { plantId: plant.id, plantName: plant.title })}
      >
        <View style={[styles.plantImageContainer, { backgroundColor: plant.backgroundColor || '#477023' }]}>
          {plant.image ? (
            <Image 
              source={ getPlantImage(plant.image) } 
              style={styles.plantImage}
              defaultSource={require('../../assets/plante/tomate(2).png')}
            />
          ) : (
            <Icon name="spa" size={40} color="#FFFFFF" />
          )}
        </View>
        
        <View style={styles.plantDetails}>
          <Text style={styles.plantTitle}>{plant.title}</Text>
          <Text style={styles.plantedDate}>Planted: {formatPlantingDate(plant.plantingDate)}</Text>
          
          <View style={styles.quantityIndicatorContainer}>
            <View style={styles.quantityBar}>
              <View 
                style={[
                  styles.quantityFill, 
                  { 
                    width: `${Math.min(100, ((plant.quantity || 1) / maxQuantity) * 100)}%`,
                    backgroundColor: plant.backgroundColor || '#477023'
                  }
                ]} 
              />
            </View>
            <View style={styles.quantityTextContainer}>
              <MaterialCommunityIcons name="seed" size={16} color="#477023" />
              <Text style={styles.quantityText}>{plant.quantity || 0}</Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity style={styles.moreButton}>
          <Icon name="more-vert" size={24} color="#477023" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  
  // Navigation bar
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
  
  // Show error if there's an issue loading the data
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        {renderHeader()}
        <View style={styles.errorContainer}>
          <Icon name="error-outline" size={60} color="#cc0000" />
          <Text style={styles.errorText}>Error loading plants: {error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => dispatch(fetchUserPlants())}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
        {renderNavBar()}
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#477023" />
          <Text style={styles.loadingText}>Loading your garden...</Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollContent}>
          {renderSortOptions()}
          {renderSummaryCard()}
          
          <View style={styles.plantListHeader}>
            <Text style={styles.sectionTitle}>Plants in Your Garden</Text>
            <Text style={styles.plantCountText}>{plants.length} varieties</Text>
          </View>
          
          {plants.length > 0 ? (
            sortedPlants.map(renderPlantCard)
          ) : (
            <View style={styles.emptyStateContainer}>
              <Icon name="grass" size={60} color="#477023" opacity={0.5} />
              <Text style={styles.emptyStateText}>Your garden is empty</Text>
              <TouchableOpacity 
                style={styles.addPlantButton}
                onPress={() => nav.navigate('addPlante')}
              >
                <Text style={styles.addPlantButtonText}>Add your first plant</Text>
              </TouchableOpacity>
            </View>
          )}
          
          <View style={styles.bottomPadding} />
        </ScrollView>
      )}
      
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
  plantListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  plantCountText: {
    color: '#666',
    fontSize: 14,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    padding: 20,
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: '#cc0000',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: '#477023',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  retryButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#666',
    marginTop: 10,
    marginBottom: 20,
  },
  addPlantButton: {
    backgroundColor: '#477023',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  addPlantButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyChartMessage: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});

export default GardenInventoryScreen;