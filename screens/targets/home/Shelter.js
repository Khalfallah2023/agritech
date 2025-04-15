import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { StackActions } from "@react-navigation/native";
import { getTitle } from "./Translations";
import { buttonText, getTitre } from "../clothing/Translations";

const Shelter = ({ navigation }) => {
  const language = useSelector((state) => state.language);
  const handlePress = () => {
    navigation.dispatch(
      StackActions.replace("wohnenquiz", { languageCode: language.code })
    );
  };
  function message() {
    switch (language) {
      case "en":
        return "Here you will find an overview of offers. If you have rented a new apartment, you will find some tips here on how to furnish it affordably.";
      case "ar":
        return "هنا ستجد نظرة عامة على العروض. إذا كنت قد استأجرت شقة جديدة ، ستجد بعض النصائح هنا حول كيفية تأثيثها بأسعار معقولة.";
      case "fa":
        return "اینجا می‌توانید یک دید کلی از پیشنهادات را ببینید. اگر یک آپارتمان جدید اجاره کرده‌اید ، اینجا چند راهنما در مورد نحوه مبلمان آن به صورت مقرون به صرفه را پیدا خواهید کرد.";
      case "fr":
        return "Ici, vous trouverez un aperçu des offres. Si vous avez loué un nouvel appartement, vous trouverez ici quelques conseils sur la façon de l'aménager à moindre coût.";
      case "ru":
        return "Здесь вы найдете обзор предложений. Если вы арендовали новую квартиру, здесь вы найдете несколько советов о том, как обставить ее недорого.";
      case "uk":
        return "Тут ви знайдете огляд пропозицій. Якщо ви орендували нову квартиру, тут ви знайдете кілька порад щодо того, як облаштувати її недорого.";
      case "de":
        return "Hier findest du eine Übersicht an Angeboten. Wenn du eine neue Wohnung gemietet hast, findest du hier ein paar Tipps, wie du sie günstig einrichten kannst.";
      default:
        return "Unknown translation";
    }
  }
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
      <View style={styles.body}>
        <View style={styles.close}>
          <Text style={{ color: "#FFF", fontWeight: "bold", fontSize: 30 }}>
            X
          </Text>
        </View>
        <ScrollView style={styles.lesTextes}>
          <View style={styles.texte}>
            <Text style={{ fontWeight: "800", color: "#FFF", fontSize: 20 }}>
              {message()}
            </Text>
          </View>
          <TouchableOpacity style={styles.bouton} onPress={handlePress}>
            <Text style={{ color: "#FFF", fontWeight: "bold", fontSize: 20 }}>
              {buttonText()}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
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
    flex: 1,
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
    flex: 8,

    backgroundColor: "#17556c",
    margin: "8%",
    marginBottom: "35%",
  },
  close: {
    flex: 0.12,
    backgroundColor: "#17556c",
    alignItems: "flex-end",
    padding: "3%",
  },

  lesTextes: {
    flex: 1,
    paddingTop: "3%",
    paddingLeft: "6%",
    paddingRight: "6%",
    paddingBottom: "5%",
  },
  texte: {
    flex: 20,
  },
  bouton: {
    height: 50,
    backgroundColor: "#12b5bc",
    margin: "10%",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "#17556c",

    alignItems: "center",
  },
});

export default Shelter;
