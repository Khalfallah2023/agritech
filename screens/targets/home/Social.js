import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { StackActions } from "@react-navigation/native";
import { beratung, getTitle, pauschale } from "./Translations";
import { text1 } from "../clothing/Translations";

const Social = ({ navigation }) => {
  const language = useSelector((state) => state.language);
  const handlePress = () => {
    navigation.dispatch(
      StackActions.replace("consultation", { languageCode: language.code })
    );
  };
  function message() {
    switch (language) {
      case "en":
        return "If you are receiving social benefits and have rented a new apartment properly, you will receive a one-time lump sum from the job center. You must use this money to buy all the necessary furniture. You can apply for the money at the job center.";
      case "ar":
        return "إذا كنت تتلقى مساعدات اجتماعية وقمت بتأجير شقة جديدة بشكل صحيح ، فستتلقى مبلغًا ثابتًا لمرة واحدة من مركز العمل. يجب أن تستخدم هذا المبلغ لشراء جميع الأثاث اللازم. يمكنك التقدم بطلب للحصول على المبلغ في مركز العمل.";
      case "fa":
        return "اگر شما دریافت کمک های اجتماعی هستید و یک آپارتمان جدید را به درستی اجاره کرده اید ، یک مبلغ ثابت برای یکبار از مرکز کار دریافت خواهید کرد. شما باید این پول را برای خرید همه مبلمان های لازم استفاده کنید. شما می توانید درخواست پول را در مرکز کار ارائه دهید.";
      case "fr":
        return "Si vous bénéficiez d'aides sociales et avez loué un nouvel appartement conformément aux règles, vous recevrez une somme forfaitaire unique du centre d'emploi. Vous devez utiliser cet argent pour acheter tous les meubles nécessaires. Vous pouvez faire une demande d'argent auprès du centre d'emploi.";
      case "ru":
        return "Если вы получаете социальные пособия и арендовали новую квартиру в соответствии с правилами, вы получите одноразовую фиксированную сумму от центра занятости. Вы должны использовать эту сумму для покупки всех необходимых мебели. Вы можете подать заявку на получение денег в центре занятости.";
      case "uk":
        return "Якщо ви отримуєте соціальні допомоги і орендували нову квартиру відповідно до правил, ви отримаєте одноразову фіксовану суму від центру зайнятості. Ви повинні використовувати ці гроші для покупки всіх необхідних меблів. Ви можете подати заявку на гроші в центрі зайнятості.";
      case "de":
        return "Wenn du Sozialleistungen beziehst und eine neue Wohnung ordnungsgemäß angemietet hast, erhältst du eine einmalige Pauschale vom Jobcenter. Von diesem Geld musst du sämtliche Möbel kaufen, die du benötigst. Das Geld kannst du beim Jobcenter beantragen.";
      default:
        return "Unknown translation";
    }
  }

  function antra() {
    switch (language) {
      case "en":
        return "Application form";
      case "ar":
        return "نموذج الطلب";
      case "fa":
        return "فرم درخواست";
      case "fr":
        return "Formulaire de demande";
      case "ru":
        return "Форма заявки";
      case "uk":
        return "Форма заяви";
      case "de":
        return "Antragsformular";
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
          }}
        >
          {pauschale()}
        </Text>
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <Text
          style={{
            color: "#17556c",
            fontSize: 20,
            fontWeight: "800",
            marginTop: "10%",
          }}
        >
          {message()}
        </Text>
        <TouchableOpacity style={styles.bouton} onPress={handlePress}>
          <Text style={{ color: "#FFF", fontWeight: "400", fontSize: 20 }}>
            {beratung()}
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            color: "#17556c",
            fontSize: 15,
            fontWeight: "800",
            marginTop: "10%",
            backgroundColor: "#FFC0CB",
          }}
        >
          {text1()}
        </Text>
        <TouchableOpacity style={styles.boutonbas}>
          <Text style={{ color: "#17556c", fontSize: 18, fontWeight: "500" }}>
            {antra()}
          </Text>
        </TouchableOpacity>
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
    marginRight: "20%",
    alignItems: "center",
  },

  body: {
    flex: 200,

    backgroundColor: "#FFF",
    marginLeft: "8%",
    marginRight: "8%",
    paddingBottom: "3%",
  },
  bouton: {
    backgroundColor: "#17556c",
    height: 50,
    borderRadius: 8,
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
  },
  boutonbas: {
    borderWidth: 2,
    marginTop: "10%",
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    width: "95%",
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

export default Social;
