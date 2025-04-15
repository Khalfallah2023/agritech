import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { saveLanguage } from "../redux/actions";
import { StackActions } from "@react-navigation/native";
import { useSelector } from "react-redux";

const Languages = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const dispatch = useDispatch();

  const languageExpressions = [
    { name: "English", expression: "ENGLISH" },
    { name: "Français", expression: "FRANCAIS" },
    { name: "Deutsch", expression: "DEUTSCH" },
    { name: "Espagnol", expression: "ESPAÑOL" },
    { name: "العربية", expression: "العربية" },
    { name: "italian", expression: "ITALIANO" },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#0B4F6C",
    },
    button: {
      backgroundColor: "#0B4F6C",
      padding: 10,
      margin: 5,
      borderRadius: 5,
    },
    buttonText: {
      color: "white",
      fontSize: 30,
      fontWeight: "bold",
    },
  });

  const handleLanguageSelection = (language) => {
    setSelectedLanguage(language.name);
    dispatch(saveLanguage(language.name));
    navigation.dispatch(StackActions.replace("type_install"), language.name);
  };

  return (
    <View style={styles.container}>
      {languageExpressions.map((language) => (
        <TouchableOpacity
          key={language.name}
          onPress={() => handleLanguageSelection(language)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{language.expression}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Languages;
