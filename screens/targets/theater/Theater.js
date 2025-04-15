import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { StackActions } from "@react-navigation/native";

const Theater = ({ navigation }) => {
  const language = useSelector((state) => state.language);
  const getTitle = () => {
    switch (language) {
      case "en":
        return "theater";
        break;
      case "ar":
        return "مسرح";
        break;
      case "es":
        return "teatro";
        break;
      case "it":
        return "teatro";
        break;
      case "de":
        return "Theater";
        break;
      case "fr":
        return "théâtre";
        break;
      default:
        return "theater";
        break;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headbar}>
        <TouchableOpacity style={styles.menu}>
          <Text
            style={{
              backgroundColor: "#000",
              marginBottom: "4%",
              width: "60%",
              height: "7%",
            }}
          ></Text>
          <Text
            style={{
              backgroundColor: "#000",
              marginTop: "2%",
              marginBottom: "2%",
              width: "60%",
              height: "7%",
            }}
          ></Text>
          <Text
            style={{
              backgroundColor: "#000",
              marginTop: "4%",
              width: "60%",
              height: "7%",
            }}
          ></Text>
        </TouchableOpacity>
        <View style={styles.titlemsg}>
          <Text
            style={{
              fontWeight: "bold",
              color: "#fff",
              fontSize: 20,
              marginRight: "20%",
            }}
          >
            {" "}
            {getTitle()}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <Image
          style={styles.images}
          source={require("../../../assets/images/theatre2.jpeg")}
        />
        <Image
          style={styles.images}
          source={require("../../../assets/images/theatre6.jpeg")}
        />
        <Image
          style={styles.images}
          source={require("../../../assets/images/theatre8.jpeg")}
        />
      </ScrollView>

      <View style={styles.footer}>
        <Image
          source={require("../../../assets/logo.png")}
          style={{ width: 70, height: 70 }}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  headbar: {
    flex: 0.1,
    flexDirection: "row",
    paddingLeft: "1%",
    backgroundColor: "#17556c",
    alignItems: "center",
  },

  menu: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
  },
  titlemsg: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  body: {
    flex: 20,

    margin: 0,
    marginBottom: 0,
  },
  images: {
    height: 300,
    width: "90%",
    marginRight: "5%",
    marginLeft: "5%",
    marginTop: "2.5%",
    marginBottom: "2.5%",
  },

  footer: {
    flex: 0.1,
    backgroundColor: "#17556c",

    alignItems: "center",
  },
});

export default Theater;
