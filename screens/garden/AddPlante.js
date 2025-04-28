import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { plantService } from '../../services/api.service';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { addPlantToUser ,resetLoading ,fetchUserPlants } from '../../redux/reducers/userPlantsReducer';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
const AddPlantScreen = () => {
  const nav = useNavigation();
  const dispatch = useDispatch();
  
  // Get the loading and error states from Redux store
  const { loading, error } = useSelector(state => state.userPlants);

  const [plantingDate, setPlantingDate] = useState('');
  const [selectedPlantType, setSelectedPlantType] = useState(null);
  const [quantity, setQuantity] = useState('1');

  // Liste des types de plantes disponibles
  const plantTypes = [
    {
      id: '20250428-tomato', // Corrected from 20240428-tomate
      title: 'Tomato',
      image: require('../../assets/plante/tomate(2).png'),
      color: '#5B7553',
      backgroundColor: '#0D330E',
      quantity: 12,
      img: 'tomate(2).png',
      plantingDate:'',
    },
    {
      id: '20250428-butterhead-lett',
      title: 'Butterhead Lettuce',
      image: require('../../assets/plante/lettuce.png'),
      color: '#5B7553',
      backgroundColor: '#477023',
      quantity: 8,
      img: 'lettuce.png',
      plantingDate:'',
    },
    {
      id: '20250428-carrot',
      title: 'Carrot',
      image: require('../../assets/plante/carrot(1).png'),
      color: '#5B7553',
      backgroundColor: '#6E8649',
      quantity: 20,
      img: 'carrot(1).png',
      plantingDate:'',
    },
    {
      id: '20250428-spinach',
      title: 'Spinach',
      image: require('../../assets/plante/spinach(2).png'),
      color: '#5B7553',
      backgroundColor: '#C1D95C',
      quantity: 15,
      img: 'spinach(2).png',
      plantingDate:'',
    },
  ];
  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchUserPlants());
    }, [dispatch])
  );
  useEffect(() => {
    let loadingTimeout;
    
    
    if (loading) {
      loadingTimeout = setTimeout(() => {
        dispatch(resetLoading());
        console.log('Loading timeout triggered - resetting state');
      }, 10000);
    }
    
    return () => {
      if (loadingTimeout) clearTimeout(loadingTimeout);
    };
  }, [loading, dispatch]);
  // Fonction pour gérer la sélection d'un type de plante
  const handlePlantTypeSelect = (plant) => {
    setSelectedPlantType(plant);
    if (!plantingDate) {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      setPlantingDate(`${year}/${day}/${month}`);
    }

  };
  const handleDateChange = (text) => {
    setPlantingDate(text);
    
    // If a plant is selected, update its plantingDate property
    if (selectedPlantType) {
      // Create a copy of the selected plant to avoid modifying the original
      const updatedPlant = { 
        ...selectedPlantType,
        plantingDate: text 
      };
      setSelectedPlantType(updatedPlant);
    }
  };
  // Fonction pour augmenter la quantité
  const increaseQuantity = () => {
    if (!selectedPlantType) return;
    const currentQuantity = parseInt(quantity) || 0;
    if (currentQuantity < selectedPlantType.quantity) {
      setQuantity((currentQuantity + 1).toString());
    } else {
      Alert.alert('Attention', `Stock maximal atteint : ${selectedPlantType.quantity}`);
    }  };

  // Fonction pour diminuer la quantité
  const decreaseQuantity = () => {
    const currentQuantity = parseInt(quantity) || 0;
    if (currentQuantity > 1) {
      setQuantity((currentQuantity - 1).toString());
    }
  };

  // Modify the handleAddPlant function:
const handleAddPlant = () => {
  if (!selectedPlantType) {
    Alert.alert('Erreur', 'Veuillez sélectionner un type de plante');
    return;
  }

  // Create a proper date - this fixes your date format issue
  let formattedDate;
  if (plantingDate) {
    // Parse the entered date (assuming format is YYYY/DD/MM as shown in your placeholder)
    const parts = plantingDate.split('/');
    if (parts.length === 3) {
      // Rearrange to YYYY-MM-DD for the API
      formattedDate = `${parts[0]}-${parts[2]}-${parts[1]}`;
    } else {
      // Fallback to today if format is incorrect
      formattedDate = new Date().toISOString().split('T')[0];
    }
  } else {
    // If no date provided, use today
    formattedDate = new Date().toISOString().split('T')[0];
  }
  
  // Format plant data properly
  const plantData = {
    plantId: selectedPlantType.id.toString(),
    quantity: parseInt(quantity) || 1,
    plantingDate: formattedDate,
    imageName: selectedPlantType.img
  };
  
  console.log('Sending plant data:', plantData);
  console.log('Plant ID:', selectedPlantType.id.toString());

  dispatch(addPlantToUser(plantData))
    .then((resultAction) => {
      // Check if the action was fulfilled
      if (addPlantToUser.fulfilled.match(resultAction)) {
        console.log('Success:', resultAction.payload);
        Alert.alert(
          'Succès',
          `${selectedPlantType.title} a été ajouté à votre jardin avec une quantité de ${quantity} !`,
          [
            {
              text: 'Voir le tableau de bord',
              onPress: async () => {
                await dispatch(fetchUserPlants()); // Add this line
                nav.navigate('dashboard', { 
                  plantId: selectedPlantType.id, 
                  plantName: selectedPlantType.title 
                });
              },
            },
            {
              text: 'Retour au jardin',
              onPress: async () => {
                await dispatch(fetchUserPlants());
                nav.navigate('garden');
              },
            },
          ]
        );
      } else {
        // Handle rejected case that might not trigger the useEffect error handler
        console.error('Error:', resultAction.error);
        Alert.alert('Erreur', 'Une erreur est survenue lors de l\'ajout de la plante');
      }
    })
    .catch((error) => {
      console.error('Exception caught:', error);
      Alert.alert('Erreur', 'Une erreur inattendue est survenue');
    });
};

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => nav.goBack()}>
          <Icon name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitleSmall}>Add</Text>
          <Text style={styles.headerTitleLarge}>Plant</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scrollContent}>
        {/* Visualisation de la plante sélectionnée */}
        <View style={styles.imageSelector}>
          {selectedPlantType ? (
            <Image 
              source={selectedPlantType.image} 
              style={styles.plantImage} 
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Icon name="spa" size={40} color="#477023" />
              <Text style={styles.imagePlaceholderText}>Sélectionnez une plante</Text>
            </View>
          )}
        </View>

        {/* Formulaire */}
        <View style={styles.formContainer}>
          {/* Types de plantes */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Sélectionnez votre plante</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.plantTypeScroll}>
              {plantTypes.map((plant) => (
                <TouchableOpacity
                  key={plant.id}
                  style={[
                    styles.plantTypeCard,
                    { backgroundColor: plant.backgroundColor },
                    selectedPlantType?.id === plant.id && styles.selectedPlantType,
                  ]}
                  onPress={() => handlePlantTypeSelect(plant)}
                >
                  <Image 
                    source={plant.image} 
                    style={styles.plantTypeImage} 
                  />
                  <Text style={styles.plantTypeTitle}>{plant.title}</Text>
                  <View style={styles.plantQuantityBadge}>
                    <Text style={styles.plantQuantityText}>In stock: {plant.quantity}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Quantité */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Quantité</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity style={styles.quantityButton} onPress={decreaseQuantity}>
                <Icon name="remove" size={24} color="#477023" />
              </TouchableOpacity>
              <TextInput
              style={styles.quantityInput}
              keyboardType="numeric"
              value={quantity}
              onChangeText={(text) => {
                // N'accepter que les chiffres
                if (/^\d*$/.test(text)) {
                  const numericValue = parseInt(text) || 0;
                  if (selectedPlantType && numericValue > selectedPlantType.quantity) {
                    Alert.alert('Attention', `Quantité maximale : ${selectedPlantType.quantity}`);
                    setQuantity(selectedPlantType.quantity.toString());
                  } else {
                    setQuantity(text);
                  }
                }
              }}
            />
              <TouchableOpacity style={styles.quantityButton} onPress={increaseQuantity}>
                <Icon name="add" size={24} color="#477023" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Date de plantation */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Date de plantation</Text>
            <TextInput
              style={styles.textInput}
              placeholder="YYYY/DD/MM"
              value={plantingDate}
              onChangeText={handleDateChange}
            />
          </View>
        </View>

        {/* Bouton d'ajout */}
                  <TouchableOpacity 
            style={[
              styles.addButton,
              (!selectedPlantType || loading) && styles.disabledButton
            ]} 
            onPress={handleAddPlant}
            disabled={loading || !selectedPlantType}
          >
          {loading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <>
              <Text style={styles.addButtonText}>Ajouter au jardin</Text>
              <Icon name="spa" size={24} color="#FFF" />
            </>
          )}
        </TouchableOpacity>

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Navigation Bar */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem}
        onPress={() => nav.navigate('garden')}>
          <Icon name="home" size={28} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <Icon name="local-florist" size={28} color="#008003" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => nav.navigate('gardenInventoryScreen')}>
          <Icon name="spa" size={28} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}  onPress={() => nav.navigate('profile')}>
          <Icon name="account-circle" size={28} color="#000" />
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
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  headerTitleSmall: {
    fontSize: 30,
    fontWeight: '200',
    color: '#000',
  },
  headerTitleLarge: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
    marginTop: -10,
  },
  scrollContent: {
    flex: 1,
    padding: 20,
  },
  imageSelector: {
    alignItems: 'center',
    marginBottom: 20,
  },
  plantImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    resizeMode: 'contain',
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#477023',
    borderStyle: 'dashed',
  },
  imagePlaceholderText: {
    color: '#477023',
    marginTop: 5,
    fontWeight: '500',
    textAlign: 'center',
  },
  formContainer: {
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
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#477023',
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  plantTypeScroll: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  plantTypeCard: {
    width: 150,
    height: 180,
    marginRight: 15,
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  selectedPlantType: {
    borderWidth: 3,
    borderColor: '#FFDE59',
  },
  plantTypeImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  plantTypeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  plantQuantityBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 5,
  },
  plantQuantityText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
  },
  quantityButton: {
    padding: 12,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
  },
  quantityInput: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    padding: 10,
  },
  addButton: {
    backgroundColor: '#477023',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: '#A0A0A0',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
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

export default AddPlantScreen;