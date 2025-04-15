import React from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { styles } from './styles';

const WelcomeBackScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.smallIllustrationContainer}>
          <Image 
            source={require('../../assets/illustration1R.png')} 
            style={styles.smallIllustration}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login to your account</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#999"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
        />

        <View style={styles.rowContainer}>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity style={styles.checkbox} />
            <Text style={styles.checkboxLabel}>Remember me</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('flag')}>
          
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

        <View style={styles.bottomTextContainer}>
          <Text style={styles.bottomText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.bottomLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeBackScreen;
