import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { saveLanguage } from "../redux/actions";
import { StackActions } from "@react-navigation/native";
import backgroundImage from '../assets/illustration10.png';


const Flag = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("العربية");
  const [selectedFlag, setSelectedFlag] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuAnimation = new Animated.Value(0);
  
  const dispatch = useDispatch();
  const theSelectedLanguage = useSelector((state) => state.language);

  const languages = [
    {
      name: "English",
      code: "en",
      flag: require("../assets/flags/en.png"),
    },
    {
      name: "Français",
      code: "fr",
      flag: require("../assets/flags/fr.png"),
    },
    {
      name: "Deutsch",
      code: "de",
      flag: require("../assets/flags/gr.png"),
    },
    {
      name: "Italiano",
      code: "it",
      flag: require("../assets/flags/it.png"),
    },
    {
      name: "العربية",
      code: "ar",
      flag: require("../assets/flags/sa.png"),
    },
    {
      name: "Español",
      code: "es",
      flag: require("../assets/flags/es.png"),
    },
  ];

  useEffect(() => {
    const language = languages.find((lang) => lang.name === selectedLanguage);
    setSelectedFlag(language ? language.flag : null);
  }, [theSelectedLanguage]);

  const handlePress = () => {
    setMenuOpen(true);
    Animated.timing(menuAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = (language) => {
    Animated.timing(menuAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setMenuOpen(false);
      setSelectedLanguage(language.name);
      setSelectedFlag(language.flag);
      dispatch(saveLanguage(language.code));
      navigation.dispatch(
        StackActions.replace("type_install", { languageCode: language.code })
      );
    });
  };

  const getChooseText = () => {
    const language = languages.find((lang) => lang.name === selectedLanguage);
    if (language) {
      switch (language.code) {
        case "en": return "Choose your language";
        case "fr": return "Choisissez votre langue";
        case "de": return "Wählen Sie Ihre Sprache";
        case "ar": return "اختر لغتك";
        case "es": return "Elige tu idioma";
        case "it": return "Scegli la tua lingua";
        default: return "Choose your language";
      }
    }
    return "Choose your language";
  };

  return (
    <View style={styles.container}>
    
<View style={styles.container}>
  <Image source={backgroundImage} style={styles.backgroundImage} />
</View>
      
      <View style={styles.body}>
        <TouchableOpacity 
          onPress={handlePress} 
          style={styles.languageSelector}
          activeOpacity={0.8}
        >
          <Image source={selectedFlag} style={styles.selectedFlag} />
          <Text style={styles.selectedLanguage}>{selectedLanguage}</Text>
          <Image 
            source={require("../assets/OIP (1).jpg")} 
            style={styles.chevron}
          />
        </TouchableOpacity>

        <Text style={styles.choose}>{getChooseText()}</Text>

        {menuOpen && (
          <Animated.View 
            style={[
              styles.menu,
              {
                opacity: menuAnimation,
                transform: [{
                  translateY: menuAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                }],
              },
            ]}
          >
            <ScrollView 
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}
            >
              {languages.map((language, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => closeMenu(language)}
                  style={styles.languageItem}
                  activeOpacity={0.7}
                >
                  <Image source={language.flag} style={styles.flag} />
                  <Text style={styles.languageName}>{language.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>
        )}
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#E8FFDB'
    
  },
  backgroundImage: {
    
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  logo: {
    height: height * 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    marginTop:180,
    width: width * 0.6,
    height: width * 0.5,
    resizeMode: "contain",
  },
  body: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 0,
  
  },
  languageSelector: {
    marginTop:10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    borderRadius: 12,
    padding: 15,
    width: "90%",
    elevation: 3,
    shadowColor: "#00ff0030",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  selectedFlag: {
    width: 30,
    height: 20,
    resizeMode: "cover",
    borderRadius: 4,
  },
  selectedLanguage: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 15,
    color: "#008000",
  },
  chevron: {
    width: 20,
    height: 20,
    tintColor: "#666",
  },
  choose: {
    color: "#008000",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 20,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  menu: {
    position: "absolute",
    top: 80,
    left: 20,
    right: 20,
    backgroundColor: "#00ff003",
    borderRadius: 12,
    padding: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    maxHeight: height * 0.5,
  },
  scrollView: {
    flexGrow: 0,
  },
  languageItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#0000000",
  },
  flag: {
    width: 30,
    height: 20,
    resizeMode: "cover",
    borderRadius: 4,
  },
  languageName: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 15,
    color: "#008000",
  },
});

export default Flag;