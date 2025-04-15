import React from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView ,Image} from 'react-native';
import { styles } from './styles';

const RegisterScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.content}>
        <View style={styles.smallIllustrationContainer}>
                  <Image 
                    source={require('../../assets/illustration2R.png')} 
                    style={styles.smallIllustration}
                    resizeMode="contain"
                  />
                </View>
        <Text style={styles.title}>Register</Text>
        <Text style={styles.subtitle}>Create your account</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#999"
        />

        <TextInput
          style={styles.input}
          placeholder="Email address"
          placeholderTextColor="#999"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          placeholderTextColor="#999"
          secureTextEntry
        />

        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('InitialLogin')}>
          
          <Text style={styles.buttonText}>REGISTER</Text>
        </TouchableOpacity>

        <View style={styles.bottomTextContainer}>
          <Text style={styles.bottomText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('WelcomeBack')}>
            <Text style={styles.bottomLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
