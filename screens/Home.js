import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";

import { View, Image, StyleSheet, Text  } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { StackActions } from "@react-navigation/native";

export default Home = ({ navigation }) => {
  useEffect(() => {
    console.log("Bienvenue dans l'écran Home!");
    console.log("*************");
    const timeout = setTimeout(() => {
      navigation.dispatch(StackActions.replace("flag"));
    }, 4000);

    return () => {
      clearTimeout(timeout);
    };
  }, [navigation]);

  return (
    <SafeAreaView style={styles.saveAreaViewContainer}>
      <StatusBar backgroundColor="#FFF" barStyle="dark-content" />

      <View style={styles.body}>
        <Image
         source={require("../assets/logo.png")} 
        style={styles.logo}  />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveAreaViewContainer: {
    flex: 1,
    backgroundColor: "#0B4F6C",
  },
  

  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200, // Adjust the width as needed
    height: 200, // Adjust the height as needed
    resizeMode: "contain", // Ensures the image scales properly
  },
});
