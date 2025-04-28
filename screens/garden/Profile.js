import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { TextInput } from 'react-native';
// Import API config (create this file if you don't have it)
import { API_URL } from '../../config/environment';

const UserAccount = ({ navigation }) => {
  const nav = useNavigation() || navigation;
  const dispatch = useDispatch();
  
  // Get user data from Redux store
  const { user, isAuthenticated } = useSelector(state => state.auth);
  
  // Local state
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [newsletter, setNewsletter] = useState(true);
  const [editMode, setEditMode] = useState({
    name: false,
    email: false,
    password: false,
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Fetch user settings from backend on component mount
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '••••••••', // Password is masked
      });
      setNotifications(user.notifications || true);
      setNewsletter(user.newsletter || true);
    } else {
      // Redirect to login if not authenticated
      nav.navigate('InitialLogin');
    }
  }, [user, isAuthenticated]);

  // Function to toggle edit mode for a field
  const toggleEditMode = (field) => {
    setEditMode({
      ...editMode,
      [field]: !editMode[field],
    });
  };

  // Function to handle input changes
  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  // Function to update user profile
  const updateProfile = async (field) => {
    if (!formData[field] || formData[field].trim() === '') {
      Alert.alert('Error', `${field.charAt(0).toUpperCase() + field.slice(1)} cannot be empty`);
      return;
    }

    setUpdating(true);
    try {
      // Create update data object - only include the field being updated
      const updateData = {};
      updateData[field] = formData[field];

      // Make API call to update profile
      const token = user.token; // Assuming token is stored in user object
      const response = await axios.patch(
        `${API_URL}/users/profile`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update Redux store with new user data
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          ...user,
          ...response.data,
        },
      });

      // Exit edit mode
      toggleEditMode(field);
      
      Alert.alert('Success', `Your ${field} has been updated successfully.`);
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert(
        'Update Failed',
        error.response?.data?.message || 'Failed to update profile. Please try again.'
      );
    } finally {
      setUpdating(false);
    }
  };

  // Function to update settings (notifications, newsletter)
  const updateSettings = async (setting, value) => {
    try {
      const token = user.token;
      const updateData = {};
      updateData[setting] = value;

      await axios.patch(
        `${API_URL}/users/profile`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update Redux store
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          ...user,
          [setting]: value,
        },
      });
    } catch (error) {
      console.error(`Error updating ${setting}:`, error);
      // Revert switch if update fails
      if (setting === 'notifications') {
        setNotifications(!value);
      } else if (setting === 'newsletter') {
        setNewsletter(!value);
      }
      Alert.alert('Update Failed', `Failed to update ${setting}. Please try again.`);
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    Alert.alert(
      "Sign Out",
      "Êtes-vous sûr de vouloir vous déconnecter?",
      [
        { text: "Annuler", style: "cancel" },
        { 
          text: "Sign Out", 
          onPress: () => {
            // Dispatch logout action to Redux
            dispatch({ type: 'LOGOUT' });
            // Navigate to login screen
            nav.navigate('InitialLogin');
          },
          style: "destructive"
        }
      ]
    );
  };

  // Show loading indicator while fetching user data
  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#477023" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => nav.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitleSmall}>Your</Text>
          <Text style={styles.headerTitleLarge}>Profile</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scrollContent}>
        {/* Personal Information Card */}
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>Personal Information</Text>
          
          {/* Name Field */}
          <View style={styles.infoField}>
            <Text style={styles.fieldLabel}>Name</Text>
            {editMode.name ? (
              <View style={styles.editContainer}>
                <TextInput
                  style={styles.input}
                  value={formData.name}
                  onChangeText={(text) => handleChange('name', text)}
                  autoFocus
                />
                <View style={styles.editActions}>
                  <TouchableOpacity 
                    style={styles.saveButton}
                    onPress={() => updateProfile('name')}
                    disabled={updating}
                  >
                    {updating ? (
                      <ActivityIndicator size="small" color="#FFFFFF" />
                    ) : (
                      <Icon name="check" size={16} color="#FFFFFF" />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.cancelButton}
                    onPress={() => {
                      setFormData({...formData, name: user.name});
                      toggleEditMode('name');
                    }}
                    disabled={updating}
                  >
                    <Icon name="close" size={16} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.fieldValueContainer}>
                <Text style={styles.fieldValue}>{formData.name}</Text>
                <TouchableOpacity onPress={() => toggleEditMode('name')}>
                  <Icon name="edit" size={16} color="#477023" />
                </TouchableOpacity>
              </View>
            )}
          </View>
          
          {/* Email Field */}
          <View style={styles.infoField}>
            <Text style={styles.fieldLabel}>Email</Text>
            {editMode.email ? (
              <View style={styles.editContainer}>
                <TextInput
                  style={styles.input}
                  value={formData.email}
                  onChangeText={(text) => handleChange('email', text)}
                  autoFocus
                  keyboardType="email-address"
                />
                <View style={styles.editActions}>
                  <TouchableOpacity 
                    style={styles.saveButton}
                    onPress={() => updateProfile('email')}
                    disabled={updating}
                  >
                    {updating ? (
                      <ActivityIndicator size="small" color="#FFFFFF" />
                    ) : (
                      <Icon name="check" size={16} color="#FFFFFF" />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.cancelButton}
                    onPress={() => {
                      setFormData({...formData, email: user.email});
                      toggleEditMode('email');
                    }}
                    disabled={updating}
                  >
                    <Icon name="close" size={16} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.fieldValueContainer}>
                <Text style={styles.fieldValue}>{formData.email}</Text>
                <TouchableOpacity onPress={() => toggleEditMode('email')}>
                  <Icon name="edit" size={16} color="#477023" />
                </TouchableOpacity>
              </View>
            )}
          </View>
          
          {/* Password Field */}
          <View style={styles.infoField}>
            <Text style={styles.fieldLabel}>Password</Text>
            {editMode.password ? (
              <View style={styles.editContainer}>
                <TextInput
                  style={styles.input}
                  value={formData.password}
                  onChangeText={(text) => handleChange('password', text)}
                  autoFocus
                  secureTextEntry
                  placeholder="Enter new password"
                />
                <View style={styles.editActions}>
                  <TouchableOpacity 
                    style={styles.saveButton}
                    onPress={() => updateProfile('password')}
                    disabled={updating}
                  >
                    {updating ? (
                      <ActivityIndicator size="small" color="#FFFFFF" />
                    ) : (
                      <Icon name="check" size={16} color="#FFFFFF" />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.cancelButton}
                    onPress={() => {
                      setFormData({...formData, password: '••••••••'});
                      toggleEditMode('password');
                    }}
                    disabled={updating}
                  >
                    <Icon name="close" size={16} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.fieldValueContainer}>
                <Text style={styles.fieldValue}>{formData.password}</Text>
                <TouchableOpacity onPress={() => {
                  setFormData({...formData, password: ''});
                  toggleEditMode('password');
                }}>
                  <Icon name="edit" size={16} color="#477023" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

       
        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>Sign Out</Text>
          <Icon name="exit-to-app" size={20} color="#FFFFFF" style={styles.logoutIcon} />
        </TouchableOpacity>

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Navigation Bar */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem} onPress={() => nav.navigate('garden')}>
          <Icon name="home" size={28} color="#555" />
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
          style={[styles.navItem, styles.activeNavItem]}
        >
          <Icon name="account-circle" size={28} color="#477023" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Add additional styles for the new components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8FFDB',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
  cardContainer: {
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
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#477023',
    marginBottom: 16,
  },
  infoField: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  fieldValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  fieldValue: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  editContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    fontSize: 16,
  },
  editActions: {
    flexDirection: 'row',
  },
  saveButton: {
    backgroundColor: '#477023',
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
  },
  cancelButton: {
    backgroundColor: '#D32F2F',
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  settingLabel: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  logoutButton: {
    backgroundColor: '#477023',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logoutIcon: {
    marginLeft: 10,
  },
  logoutText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
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

export default UserAccount;