import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 

const UserAccount = ({ navigation }) => {
  const nav = useNavigation() || navigation;
  const [notifications, setNotifications] = useState(true);
  const [newsletter, setNewsletter] = useState(true);

  const userInfo = {
    name: 'Juliette Bush',
    email: 'julieteb@email.com',
    password: '••••••••',
    profileImage: 'https://your-image-url.com/profile.jpg'
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.iconButton}
        onPress={() => nav.goBack()}
      >
        <Text style={styles.headerIcon}>✕</Text>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Your Account</Text>
      <TouchableOpacity style={styles.iconButton}>
        <Text style={styles.headerIcon}>✓</Text>
      </TouchableOpacity>
    </View>
  );

  const renderProfile = () => (
    <View style={styles.profileSection}>
      <View style={styles.profileImageContainer}>
        <Image
          source={{ uri: userInfo.profileImage }}
          style={styles.profileImage}
          defaultSource={require('../../assets/icon1.png')}
        />
      </View>
      <TouchableOpacity 
        style={styles.changePhotoButton}
        onPress={() => console.log('Change photo')}
      >
        <Text style={styles.changePhotoText}>Change profile photo</Text>
      </TouchableOpacity>
    </View>
  );

  const renderPersonalInfo = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Personal Information</Text>
      <View style={styles.infoField}>
        <Text style={styles.fieldLabel}>Name</Text>
        <Text style={styles.fieldValue}>{userInfo.name}</Text>
      </View>
      <View style={styles.infoField}>
        <Text style={styles.fieldLabel}>Email</Text>
        <Text style={styles.fieldValue}>{userInfo.email}</Text>
      </View>
      <View style={styles.infoField}>
        <Text style={styles.fieldLabel}>Password</Text>
        <Text style={styles.fieldValue}>{userInfo.password}</Text>
      </View>
    </View>
  );

  const renderSettings = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Settings</Text>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Notifications</Text>
        <Switch
          value={notifications}
          onValueChange={setNotifications}
          trackColor={{ false: '#E0E0E0', true: '#6B4EFF' }}
          thumbColor="#FFFFFF"
        />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Newsletter</Text>
        <Switch
          value={newsletter}
          onValueChange={setNewsletter}
          trackColor={{ false: '#E0E0E0', true: '#6B4EFF' }}
          thumbColor="#FFFFFF"
        />
      </View>
    </View>
  );

  const renderNavBar = () => (
       <View style={styles.navbar}>
             <TouchableOpacity style={styles.navItem}
              onPress={() => nav.navigate('garden')}>
               <Icon name="home" size={28} color="#000" />
             </TouchableOpacity>
             <TouchableOpacity style={styles.navItem}>
               <Icon name="local-florist" size={28} color="#000" />
             </TouchableOpacity>
             <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
               <Icon name="spa" size={28} color="#008003" />
             </TouchableOpacity>
             <TouchableOpacity 
               style={styles.navItem}
               onPress={() => nav.navigate('progress')}>
               <Icon name="insert-chart" size={28} color="#000" />
             </TouchableOpacity>
             <TouchableOpacity 
               style={styles.navItem} >
               <Icon name="account-circle" size={28} color="#000" />
             </TouchableOpacity>
           </View>
    );
  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <ScrollView style={styles.scrollContent}>
        {renderProfile()}
        {renderPersonalInfo()}
        {renderSettings()}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: '50',
    color: '#E8FFDB',
    marginLeft: 20,
  },
  iconButton: {
    padding: 8,
  },
  headerIcon: {
    fontSize: 20,
    color: '#1A1A1A',
  },
  scrollContent: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F5F5F5',
    overflow: 'hidden',
    marginBottom: 12,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  changePhotoButton: {
    paddingVertical: 2,
  },
  changePhotoText: {
    color: '#6B4EFF',
    fontSize: 16,
    fontWeight: '500',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  infoField: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  fieldValue: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  settingLabel: {
    fontSize: 16,
    color: '#1A1A1A',
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
  navIcon: {
    fontSize: 24,
  },
  activeNavIcon: {
    color: '#6B4EFF',
  },
});

export default UserAccount;