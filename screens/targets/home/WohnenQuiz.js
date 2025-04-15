import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { StackActions } from "@react-navigation/native";
import { gebrauchte, getTitle, pauschale, troedel } from "./Translations";
import { getTitre } from "../clothing/Translations";

const WohnenQuiz = ({ navigation }) => {
  const language = useSelector((state) => state.language);
  const handlePress = (scrennId) => {
    switch (scrennId) {
      case 1:
        navigation.dispatch(
          StackActions.replace("social", { languageCode: language.code })
        );
        break;
      case 2:
        navigation.dispatch(
          StackActions.replace("fourniture", { languageCode: language.code })
        );
        break;
      case 3:
        navigation.dispatch(
          StackActions.replace("market", { languageCode: language.code })
        );
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
              MediaRecorder: "20%",
            }}
          >
            {getTitle()}
          </Text>
        </View>
      </View>
      <ScrollView style={styles.body}>
        <View style={styles.letitre}>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 25,
              color: "#17556c",
            }}
          >
            {getTitre()}
          </Text>
        </View>
        <View style={styles.lesboutons}>
          <View style={styles.bouton}>
            <TouchableOpacity onPress={() => handlePress(1)}>
              <Text style={styles.lestextes}>{pauschale()}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bouton}>
            <TouchableOpacity onPress={() => handlePress(2)}>
              <Text style={styles.lestextes}>{gebrauchte()}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bouton}>
            <TouchableOpacity onPress={() => handlePress(3)}>
              <Text style={styles.lestextes}>{troedel()}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.hand}>
          <Image
            source={require("../../../assets/hand.png")}
            style={{ width: 50, height: 100 }}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Image
          source={require("../../../assets/icon.png")}
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

  lestextes: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#FFF",
  },

  body: {
    flex: 1,

    margin: "8%",
    flexGrow: 1,
    paddingBottom: "0%",
  },
  letitre: {
    flex: 1,
  },
  bouton: {
    flex: 40,
    backgroundColor: "#17556c",
    marginTop: "10%",
    borderRadius: 8,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },

  lesboutons: {
    flex: 20,
  },
  hand: {
    height: "80%",
    alignItems: "flex-end",
    padding: "10%",
  },

  footer: {
    flex: 0.1,
    backgroundColor: "#17556c",
    alignItems: "center",
  },
});

export default WohnenQuiz;
