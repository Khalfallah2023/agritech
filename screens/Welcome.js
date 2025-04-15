import React, { useState } from "react";
import { View, SafeAreaView, StyleSheet, Text, Image } from "react-native";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import { StackActions } from "@react-navigation/native";

import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";

const Welcome = ({ navigation }) => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language);

  const handlePress = () => {
    navigation.dispatch(
      StackActions.replace("profile", { languageCode: language.code })
    );
  };
  const welcomeMessage = () => {
    switch (language) {
      case "en":
        return "Welcome";
      case "fr":
        return "Bienvenue";
      case "de":
        return "Willkommen";
      case "ar":
        return "أهلاً وسهلاً";
      case "es":
        return "¡Bienvenido!";

      case "it":
        return "Benvenuto";
      default:
        return "Welcome";
    }
  };
  const message1 = () => {
    switch (language) {
      case "en":
        return "ALBAYEN SCHOOL";
      case "fr":
        return "ÉCOLE ALBAYEN";
      case "de":
        return "ALBAYEN SCHULE";
      case "ar":
        return "مدرسة البيان";
      case "es":
        return "ESCUELA ALBAYEN";
      case "it":
        return "SCUOLA ALBAYEN";
      default:
        return "Welcome";
    }
  };
  const adresse = (language) => {
    switch (language) {
      case "en":
        return "Address:";
      case "fr":
        return "Adresse :";
      case "de":
        return "Adresse:";
      case "ar":
        return "العنوان:";
      case "es":
        return "Dirección:";
      case "it":
        return "Indirizzo:";
      default:
        return "Address:";
    }
  };
  const adresseText = (language) => {
    switch (language) {
      case "en":
        return "Near the City of Sciences, next to Dar Assabah - Urban North, Tunis, Tunisia, 1000";
      case "fr":
        return "Près de la cité des sciences, à côté de Dar Assabah - Centre Urbain Nord, Tunis, Tunisie, 1000";
      case "de":
        return "In der Nähe der Stadt der Wissenschaften, neben Dar Assabah - Urban North, Tunis, Tunesien, 1000";
      case "ar":
        return "بالقرب من مدينة العلوم، بجوار دار الصباح - الشمال الحضري، تونس، تونس، 1000";
      case "es":
        return "Cerca de la Ciudad de las Ciencias, junto a Dar Assabah - Urban North, Túnez, Túnez, 1000";
      case "it":
        return "Vicino alla Città delle Scienze, accanto a Dar Assabah - Urban North, Tunisi, Tunisia, 1000";
      default:
        return "Near the City of Sciences, next to Dar Assabah - Urban North, Tunis, Tunisia, 1000";
    }
  };
  const mobileLabel = (language) => {
    switch (language) {
      case "en":
        return "Mobile";
      case "fr":
        return "Mobile";
      case "de":
        return "Mobil";
      case "ar":
        return "الجوال";
      case "es":
        return "Móvil";
      case "it":
        return "Cellulare";
      default:
        return "Mobile";
    }
  };
  const siteLabel = (language) => {
    switch (language) {
      case "en":
        return "Websites and social links";
      case "fr":
        return "Sites web et liens sociaux";
      case "de":
        return "Websites und soziale Links";
      case "ar":
        return "المواقع الإلكترونية والروابط الاجتماعية";
      case "es":
        return "Sitios web y enlaces sociales";
      case "it":
        return "Siti web e link sociali";
      default:
        return "Websites and social links";
    }
  };

  const emailLabel = (language) => {
    switch (language) {
      case "en":
        return "Email";
      case "fr":
        return "Email";
      case "de":
        return "E-Mail";
      case "ar":
        return "البريد الإلكتروني";
      case "es":
        return "Email";
      case "it":
        return "Email";
      default:
        return "Email";
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
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
          >menu-**</Text>
        </TouchableOpacity>
        <View style={styles.titre}>
          <Text style={{ fontWeight: "bold", color: "#0B4F6C", fontSize: 20 }}>
            {welcomeMessage()}
          </Text>
        </View>
      </View>
      <ScrollView style={styles.body}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/themap.jpg")}
            style={styles.image}
          />
        </View>

        <View style={styles.lesTextes}>
          <Text style={styles.para1}>{message1()}</Text>
          <Text style={styles.label}>{adresse()}</Text>
          <Text style={styles.value}>{adresseText()}</Text>
          <Text style={styles.label}>{mobileLabel()}:</Text>
          <Text style={styles.value}>54 352 240</Text>
          <Text style={styles.label}>{emailLabel()}:</Text>
          <Text style={styles.value}>elbayenschool0@gmail.com</Text>
          <Text style={styles.label}>{siteLabel()}:</Text>
          <Text style={styles.value}>
            http://bayenschool.wix.com/elbayenschool
          </Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity onPress={handlePress}>
          <Image
            source={require("../assets/logo.png")}
            style={{ width: 100, height: 100 }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  headbar: {
    flex: 0.09,

    flexDirection: "row",

    paddingLeft: "1%",
    backgroundColor: "#FFF",
  },
  menu: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titre: {
    flex: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    flex: 7,
    paddingBottom: 20,
  },
  image: {
    flex: 1,
  },
  lesTextes: {
    flex: 5,
    padding: 15,
  },
  footer: {
    flex: 0.09,
    backgroundColor: "#17556c",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  para1: {
    color: "#17556c",
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
  },
  label: {
    fontSize: 20,
    margin: 5,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  value: {
    fontSize: 18,
    fontWeight: "500",
    color: "#17556c",
  },
});

export default Welcome;
