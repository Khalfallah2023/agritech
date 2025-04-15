import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { styles } from './styless';

const InitialLoginScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.illustrationContainer}>
          <Image 
            source={require('../../assets/illustration5R.png')} 
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>AgriTech</Text>
        <Text style={styles.subtitle}>Where AI Meets Agriculture for a Smarter, Greener Future.</Text>

        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => navigation.navigate('WelcomeBack')}
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.secondaryButtonText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default InitialLoginScreen;