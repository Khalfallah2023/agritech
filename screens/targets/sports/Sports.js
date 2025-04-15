import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { StackActions } from "@react-navigation/native";

const Sports = ({ navigation }) => {
  const language = useSelector((state) => state.language);
  const getTitle = () => {
    switch (language) {
      case "en":
        return "sport";
        break;
      case "ar":
        return "رياضة";
        break;
      case "es":
        return "deporte";
        break;
      case "it":
        return "sport";
        break;
      case "de":
        return "Sport";
        break;
      case "fr":
        return "sport";
        break;
      default:
        return "sport";
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
            {getTitle()}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <Image
          style={styles.images}
          source={require("../../../assets/images/sports1.jpeg")}
        />
        <Image
          style={styles.images}
          source={require("../../../assets/images/tennis.jpeg")}
        />
        <Image
          style={styles.images}
          source={require("../../../assets/images/sport.jpeg")}
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
    flex: 0.13,
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
  letitre: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "2%",
    marginRight: "12%",
    alignItems: "center",
  },
  lestextes: {
    color: "#17556c",
    fontWeight: "600",
    fontSize: 20,
    margin: "3%",
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
    flex: 0.13,
    backgroundColor: "#17556c",

    alignItems: "center",
  },
  gmaps: {
    margin: "3%",
    alignItems: "center",
    borderColor: "#000",
    borderWidth: 3,
    height: 40,
    justifyContent: "center",
  },
});

export default Sports;
