
import 'react-native-gesture-handler';
import React, { Profiler } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import store from "./redux/store";
import { StatusBar } from "expo-status-bar";

// Écrans existants
import Home from "./screens/Home";
import Flag from "./screens/Flag";
import Welcome from "./screens/Welcome";
import Languages from "./screens/Languages";
import Profile from "./screens/garden/Profile";
import Arab from "./screens/targets/arab/Arab";
import Sports from "./screens/targets/sports/Sports";
import Engineering from "./screens/targets/engineering/Engineering";
import English from "./screens/targets/English/English";
import French from "./screens/targets/french/French";
import Aeronautics from "./screens/targets/aeronautics/Aeronautics";
import Robotics from "./screens/targets/robotics/Robotics";
import Music from "./screens/targets/music/Music";
import Theater from "./screens/targets/theater/Theater";
import LevelSelector from "./screens/LevelSelector";
import GardenScreen from "./screens/garden/GardenScreen";
import CourseProgress from "./screens/garden/CourseProgress";
import PlantDashboard from './screens/garden/PlantDashboard';

// Nouveaux écrans d'authentification
import InitialLoginScreen from "./screens/auth/InitialLoginScreen";
import WelcomeBackScreen from "./screens/auth/WelcomeBackScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import AddPlantScreen from './screens/garden/AddPlante';
import PlantMetricsOverlay from './screens/garden/PlantMetricsOverlay';
import GardenInventoryScreen from './screens/garden/GardenInventoryScreen';
import Type_install from './screens/Type_install';

const Stack = createNativeStackNavigator();

export default function App() {
  // À remplacer par votre logique d'authentification via Redux
  const isAuthenticated = false; // utilisez un selector Redux ici

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator initialRouteName="InitialLogin">
            
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
                <Stack.Screen name="home" component={Home}/>
                <Stack.Screen
                 name="flag"
                 component={Flag}  
                 options={{ headerShown: false }} />
                  <Stack.Screen 
                  name="garden" 
                  component={GardenScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen 
                  name="addPlante" 
                  component={AddPlantScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen 
                  name="gardenInventoryScreen" 
                  component={GardenInventoryScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="languages" component={Languages} />
                <Stack.Screen 
                  name="type_install" 
                  component={Type_install}
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="welcome" component={Welcome} />
                <Stack.Screen name="levelselector" component={LevelSelector} options={{ headerShown: false }}/>
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
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});