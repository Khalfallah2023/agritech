import React, { useRef } from 'react';
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

// Écrans d'authentification
import InitialLoginScreen from "../screens/auth/InitialLoginScreen";
import WelcomeBackScreen from "../screens/auth/WelcomeBackScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";

// Écrans principaux
import Home from "../screens/Home";
import Flag from "../screens/Flag";
import Welcome from "../screens/Welcome";
import Languages from "../screens/Languages";
import Profile from "../screens/garden/Profile";
import Arab from "../screens/targets/arab/Arab";
import Sports from "../screens/targets/sports/Sports";
import Engineering from "../screens/targets/engineering/Engineering";
import English from "../screens/targets/English/English";
import French from "../screens/targets/french/French";
import Aeronautics from "../screens/targets/aeronautics/Aeronautics";
import Robotics from "../screens/targets/robotics/Robotics";
import Music from "../screens/targets/music/Music";
import Theater from "../screens/targets/theater/Theater";
import LevelSelector from "../screens/LevelSelector";
import GardenScreen from "../screens/garden/GardenScreen";
import CourseProgress from "../screens/garden/CourseProgress";
import PlantDashboard from '../screens/garden/PlantDashboard';
import AddPlantScreen from '../screens/garden/AddPlante';
import PlantMetricsOverlay from '../screens/garden/PlantMetricsOverlay';
import GardenInventoryScreen from '../screens/garden/GardenInventoryScreen';
import Type_install from '../screens/Type_install';

const Stack = createNativeStackNavigator();

// Navigateur pour les écrans d'authentification

// Navigateur pour les écrans de l'application après authentification


// Navigateur principal qui vérifie l'état d'authentification
const RootNavigator = () => {
  // Utilisez un selector Redux pour vérifier l'état d'authentification
  const navigationRef = useRef(null);
  const isNavigationReady = useRef(false);
  const isAuthenticated = useSelector(state => state.auth?.isAuthenticated || false);
  const onNavigationReady = () => {
    isNavigationReady.current = true;
  };

  return (
    <NavigationContainer ref={navigationRef}
    onReady={onNavigationReady} >
      <StatusBar style="auto" />
      <Stack.Navigator> 
        {isAuthenticated ? (
          // Écrans pour utilisateurs authentifiés
          <>
            <Stack.Screen 
              name="Flag" 
              component={Flag} 
              options={{ headerShown: false }} 
            />
            
            <Stack.Screen 
              name="addPlante" 
              component={AddPlantScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="garden" 
              component={GardenScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="gardenInventoryScreen" 
              component={GardenInventoryScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="languages" component={Languages} />
            <Stack.Screen 
              name="type_install" 
              component={Type_install}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="welcome" component={Welcome} />
            <Stack.Screen name="levelselector" component={LevelSelector} options={{ headerShown: false }} />
            <Stack.Screen 
              name="progress" 
              component={CourseProgress}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="dashboard" 
              component={PlantDashboard}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="plantMetricsOverlay" 
              component={PlantMetricsOverlay}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="profile" component={Profile} options={{ headerShown: false }} />
            <Stack.Screen name="sports" component={Sports} />
            <Stack.Screen name="arab" component={Arab} />
            <Stack.Screen name="engineering" component={Engineering} />
            <Stack.Screen name="english" component={English} />
            <Stack.Screen name="french" component={French} />
            <Stack.Screen name="aeronautics" component={Aeronautics} />
            <Stack.Screen name="robotics" component={Robotics} />
            <Stack.Screen name="music" component={Music} />
            <Stack.Screen name="theater" component={Theater} />
          </>
        ) : (
          // Écrans d'authentification
          <>
            <Stack.Screen 
              name="InitialLogin" 
              component={InitialLoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="WelcomeBack" 
              component={WelcomeBackScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Register" 
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;