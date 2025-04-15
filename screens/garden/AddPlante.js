import React, { useState } from 'react';
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
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';

const AddPlantScreen = () => {
  const nav = useNavigation() || navigation;

  const [plantName, setPlantName] = useState('');
  const [plantImage, setPlantImage] = useState(null);
  const [plantingDate, setPlantingDate] = useState('');
  const [wateringSchedule, setWateringSchedule] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedPlantType, setSelectedPlantType] = useState(null);
  const [isAddPlantModalVisible, setIsAddPlantModalVisible] = useState(false);
  const [newPlantTitle, setNewPlantTitle] = useState('');
  const [newPlantImage, setNewPlantImage] = useState(null);
  const [newPlantColor, setNewPlantColor] = useState('#5B7553');
  const [newPlantBackgroundColor, setNewPlantBackgroundColor] = useState('#6E8649');
  const [newPlantQuantity, setNewPlantQuantity] = useState('');
  const [quantity, setQuantity] = useState('1');

  // Liste des types de plantes disponibles, transformée en state pour pouvoir l'étendre
  const [plantTypes, setPlantTypes] = useState([
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
      image: require('../../assets/plante/lettuce.png'),
      color: '#5B7553',
      backgroundColor: '#477023',
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
  ]);

  // Fonction pour choisir une image depuis la galerie
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPlantImage(result.assets[0].uri);
    }
  };

  // Fonction pour choisir une image pour un nouveau type de plante
  const pickNewPlantTypeImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setNewPlantImage(result.assets[0].uri);
    }
  };

  // Fonction pour gérer la sélection d'un type de plante
  const handlePlantTypeSelect = (plant) => {
    setSelectedPlantType(plant);
    setPlantName(plant.title);
  };

  // Fonction pour augmenter la quantité
  const increaseQuantity = () => {
    const currentQuantity = parseInt(quantity) || 0;
    setQuantity((currentQuantity + 1).toString());
  };

  // Fonction pour diminuer la quantité
  const decreaseQuantity = () => {
    const currentQuantity = parseInt(quantity) || 0;
    if (currentQuantity > 1) {
      setQuantity((currentQuantity - 1).toString());
    }
  };

  // Fonction pour ajouter un nouveau type de plante
  const handleAddNewPlantType = () => {
    if (!newPlantTitle.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer un nom pour le type de plante');
      return;
    }

    if (!newPlantImage) {
      Alert.alert('Erreur', 'Veuillez ajouter une image pour le type de plante');
      return;
    }

    if (!newPlantQuantity.trim() || isNaN(parseInt(newPlantQuantity)) || parseInt(newPlantQuantity) <= 0) {
      Alert.alert('Erreur', 'Veuillez entrer une quantité valide');
      return;
    }

    // Créer un nouvel ID basé sur le dernier ID existant + 1
    const newId = Math.max(...plantTypes.map(plant => plant.id)) + 1;

    // Créer un nouveau type de plante
    const newPlantType = {
      id: newId,
      title: newPlantTitle,
      image: { uri: newPlantImage },
      color: newPlantColor,
      backgroundColor: newPlantBackgroundColor,
      quantity: parseInt(newPlantQuantity)
    };

    // Ajouter le nouveau type à la liste
    setPlantTypes([...plantTypes, newPlantType]);
    
    // Réinitialiser les champs du formulaire
    setNewPlantTitle('');
    setNewPlantImage(null);
    setNewPlantQuantity('');
    
    // Fermer la modal
    setIsAddPlantModalVisible(false);
    
    // Sélectionner automatiquement le nouveau type de plante
    handlePlantTypeSelect(newPlantType);
    
    // Notification de succès
    Alert.alert('Succès', `Nouveau type de plante '${newPlantTitle}' ajouté avec une quantité de ${newPlantQuantity}!`);
  };

  // Fonction pour ajouter une nouvelle plante
  const handleAddPlant = () => {
    if (!plantName.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer un nom de plante');
      return;
    }

    if (!selectedPlantType) {
      Alert.alert('Erreur', 'Veuillez sélectionner un type de plante');
      return;
    }

    // Dans une application réelle, vous sauvegarderiez ces données dans votre état global ou base de données
    const newPlant = {
      id: Date.now(),
      title: plantName,
      image: plantImage || selectedPlantType.image,
      color: selectedPlantType.color,
      backgroundColor: selectedPlantType.backgroundColor,
      plantingDate: plantingDate,
      wateringSchedule: wateringSchedule,
      notes: notes,
      quantity: parseInt(quantity) || 1
    };

    // Notification de succès et redirection
    Alert.alert(
      'Succès',
      `${plantName} a été ajouté à votre jardin avec une quantité de ${quantity} !`,
      [
        {
          text: 'Voir le tableau de bord',
          onPress: () => nav.navigate('dashboard', { plantId: newPlant.id, plantName: newPlant.title }),
        },
        {
          text: 'Retour au jardin',
          onPress: () => nav.navigate('garden', { plantId: newPlant.id, plantName: newPlant.title }),
        },
      ]
    );
  };

  // Couleurs disponibles pour les nouveaux types de plantes
  const backgroundColorOptions = [
    '#0D330E', '#477023', '#6E8649', '#C1D95C', '#8FB339', 
    '#5A8F39', '#39608F', '#395A8F', '#5A398F', '#8F3960'
  ];

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
        {/* Image de la plante */}
        <TouchableOpacity style={styles.imageSelector} onPress={pickImage}>
          {plantImage ? (
            <Image source={{ uri: plantImage }} style={styles.plantImage} />
          ) : selectedPlantType ? (
            <Image 
              source={typeof selectedPlantType.image === 'object' ? selectedPlantType.image : selectedPlantType.image} 
              style={styles.plantImage} 
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Icon name="add-a-photo" size={40} color="#477023" />
              <Text style={styles.imagePlaceholderText}>Add Plant Photo</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Formulaire */}
        <View style={styles.formContainer}>
          {/* Nom de la plante */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Plant Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter plant name"
              value={plantName}
              onChangeText={setPlantName}
            />
          </View>

          {/* Types de plantes */}
          <View style={styles.inputContainer}>
            <View style={styles.plantTypeTitleRow}>
              <Text style={styles.inputLabel}>Plant Type</Text>
              {/*
              <TouchableOpacity 
                style={styles.addPlantTypeButton}
                onPress={() => setIsAddPlantModalVisible(true)}
              >
                <Icon name="add-circle" size={24} color="#477023" />
                <Text style={styles.addPlantTypeText}>New Type</Text>
              </TouchableOpacity>*/}
            </View>
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
                    source={typeof plant.image === 'object' ? plant.image : plant.image} 
                    style={styles.plantTypeImage} 
                  />
                  <Text style={styles.plantTypeTitle}>{plant.title}</Text>
                  
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Quantité */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Quantity</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity style={styles.quantityButton} onPress={decreaseQuantity}>
                <Icon name="remove" size={24} color="#477023" />
              </TouchableOpacity>
              <TextInput
                style={styles.quantityInput}
                keyboardType="numeric"
                value={quantity}
                onChangeText={(text) => {
                  // N'accepter que les nombres
                  if (/^\d*$/.test(text)) {
                    setQuantity(text);
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
            <Text style={styles.inputLabel}>Planting Date</Text>
            <TextInput
              style={styles.textInput}
              placeholder="DD/MM/YYYY"
              value={plantingDate}
              onChangeText={setPlantingDate}
            />
          </View>

          {/* Programme d'arrosage */}
          
          {/* Notes */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Notes</Text>
            <TextInput
              style={[styles.textInput, styles.textAreaInput]}
              placeholder="Add any special care instructions or notes"
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={4}
            />
          </View>
        </View>

        {/* Bouton d'ajout */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddPlant}>
          <Text style={styles.addButtonText}>Add to My Garden</Text>
          <Icon name="spa" size={24} color="#FFF" />
        </TouchableOpacity>

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Modal pour ajouter un nouveau type de plante */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isAddPlantModalVisible}
        onRequestClose={() => setIsAddPlantModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Plant Type</Text>
              <TouchableOpacity onPress={() => setIsAddPlantModalVisible(false)}>
                <Icon name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Image du nouveau type de plante */}
            <TouchableOpacity style={styles.imageSelector} onPress={pickNewPlantTypeImage}>
              {newPlantImage ? (
                <Image source={{ uri: newPlantImage }} style={styles.plantImage} />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Icon name="add-a-photo" size={40} color="#477023" />
                  <Text style={styles.imagePlaceholderText}>Add Type Photo</Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Nom du nouveau type de plante */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Plant Type Name</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter plant type name"
                value={newPlantTitle}
                onChangeText={setNewPlantTitle}
              />
            </View>

            {/* Quantité initiale */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Initial Quantity</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter initial quantity"
                value={newPlantQuantity}
                onChangeText={(text) => {
                  // N'accepter que les nombres
                  if (/^\d*$/.test(text)) {
                    setNewPlantQuantity(text);
                  }
                }}
                keyboardType="numeric"
              />
            </View>

            {/* Sélection de couleur */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Background Color</Text>
              <View style={styles.colorOptions}>
                {backgroundColorOptions.map((color, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.colorOption,
                      { backgroundColor: color },
                      newPlantBackgroundColor === color && styles.selectedColorOption,
                    ]}
                    onPress={() => setNewPlantBackgroundColor(color)}
                  />
                ))}
              </View>
            </View>

            {/* Bouton d'ajout du nouveau type */}
            <TouchableOpacity style={styles.addButton} onPress={handleAddNewPlantType}>
              <Text style={styles.addButtonText}>Add New Plant Type</Text>
              <Icon name="add-circle" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Navigation Bar */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem}
        onPress={() => nav.navigate('garden')}>
          <Icon name="home" size={28} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <Icon name="local-florist" size={28} color="#008003" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="spa" size={28} color="#000" />
        </TouchableOpacity>
        
        
        <TouchableOpacity style={styles.navItem}>
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
    resizeMode: 'cover',
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
  textAreaInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  plantTypeTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  addPlantTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#477023',
  },
  addPlantTypeText: {
    color: '#477023',
    fontWeight: 'bold',
    marginLeft: 5,
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
    color: '#000',
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
  wateringOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wateringOption: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedWateringOption: {
    backgroundColor: '#477023',
    borderColor: '#477023',
  },
  wateringOptionText: {
    fontSize: 12,
    color: '#477023',
    marginTop: 5,
  },
  selectedOptionText: {
    color: '#FFFFFF',
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
  // Styles pour la modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#477023',
  },
  colorOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
    marginHorizontal: 5,
  },
  selectedColorOption: {
    borderWidth: 3,
    borderColor: '#FFDE59',
  },
});

export default AddPlantScreen;