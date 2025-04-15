import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import Flag from "./Flag";
import Home from "./Home";
const Drawer = createDrawerNavigator();
const NavigationMenu = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Screen1" component={Flag} />
        <Drawer.Screen name="Screen2" component={Home} />
        {/* Add more screens as needed */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default NavigationMenu;
