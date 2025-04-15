import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { StackActions } from "@react-navigation/native";

const French = ({ navigation }) => {
  const language = useSelector((state) => state.language);
  const handlePress = () => {
    navigation.dispatch(
      StackActions.replace("foodquiz", { languageCode: language.code })
    );
  };
  const getTitle = () => {
    switch (language) {
      case "en":
        return "innovative French";
        break;
      case "ar":
        return "فرنسي مبتكر";
        break;
      case "es":
        return "francés innovador";
        break;
      case "it":
        return "francese innovativo";
        break;
      case "de":
        return "innovatives Französisch";
        break;
      case "fr":
        return "français innovant";
        break;
      default:
        return "innovative french";
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
          <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 20 }}>
            {getTitle()}
          </Text>
        </View>
      </View>
      <View style={styles.letitre}>
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 25,
            color: "#17556c",
          }}
        ></Text>
      </View>
      <ScrollView style={styles.body}>
        <Image
          style={styles.images}
          source={require("../../../assets/images/french.jpg")}
        />
        <Image
          style={styles.images}
          source={require("../../../assets/images/french1.jpg")}
        />
        <Image
          style={styles.images}
          source={require("../../../assets/images/french2.jpg")}
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

export default French;
