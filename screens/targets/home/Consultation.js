import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { StackActions } from "@react-navigation/native";
import { beratung, getTitle } from "./Translations";
import {
  text1,
  text2,
  text3,
  text4,
  text5,
  text6,
} from "../clothing/Translations";

const Consultation = ({ navigation }) => {
  const language = useSelector((state) => state.language);

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
      <View style={styles.letitre}>
        <TouchableOpacity
          onPress={() => {
            navigation.dispatch(
              StackActions.replace("assistance", {
                languageCode: language.code,
              })
            );
          }}
        >
          <Text style={{ color: "#17556c", fontWeight: "bold", fontSize: 50 }}>
            &lt;
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 25,

            color: "#17556c",
            marginLeft: "20%",
          }}
        >
          {beratung()}
        </Text>
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <Text style={styles.lestextes}>{text1()}</Text>
        <Text style={styles.lestextes}>{text2()}</Text>
        <Text style={styles.lestextes}>{text3()}</Text>
        <Text style={styles.lestextes}>{text4()}</Text>
        <Text style={styles.lestextes}>{text5()}</Text>
        <Text style={styles.lestextes}>{text6()}</Text>
        <View style={styles.gmaps}>
          <Text
            style={{
              fontWeight: "900",
              fontSize: 18,

              color: "#12b5bc",
            }}
          >
            Google Maps
          </Text>
        </View>
        <Text style={styles.lestextes}>{text1()}</Text>
        <Text style={styles.lestextes}>{text2()}</Text>
        <Text style={styles.lestextes}>{text3()}</Text>
        <Text style={styles.lestextes}>{text4()}</Text>
        <Text style={styles.lestextes}>{text5()}</Text>
        <Text style={styles.lestextes}>{text6()}</Text>
        <View style={styles.gmaps}>
          <Text
            style={{
              fontWeight: "900",
              fontSize: 18,

              color: "#12b5bc",
            }}
          >
            Google Maps
          </Text>
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
    marginRight: "28%",
    alignItems: "center",
  },
  lestextes: {
    color: "#17556c",
    fontWeight: "600",
    fontSize: 20,
    margin: "3%",
  },
  body: {
    flex: 200,

    backgroundColor: "#FFF",
    marginLeft: "8%",
    marginRight: "8%",
    paddingBottom: "3%",
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

export default Consultation;
