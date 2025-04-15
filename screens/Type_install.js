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
import { saveType } from "../redux/actions2";
import { StackActions } from "@react-navigation/native";
import backgroundImage from '../assets/illustration10.png';

const Type_intall = ({ navigation }) => {
  const [selectedType, setSelectedtype] = useState("Nutrient Film Technique - NFT");
  const [selectedType_intall, setSelectedType_intall] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuAnimation = new Animated.Value(0);
  
  const dispatch = useDispatch();
  const theSelectedType = useSelector((state) => state.typeS);

  const TypeS = [
    {
      name: "Deep Water Culture - DWC",
      code: "dwc",
    },
    {
      name: "Ebb and Flow",
      code: "ebb",
    },
    {
      name: "Nutrient Film Technique - NFT",
      code: "nft",
    },
    {
      name: "Aéroponie",
      code: "ae",
    },
    {
      name: "Wick System",
      code: "ws",
    },
    {
      name: "Drip System",
      code: "ds",
    },
  ];

  useEffect(() => {
    // Find the initial selected type
    const typeS = TypeS.find((typ) => typ.name === selectedType);
    if (typeS) {
      setSelectedType_intall(typeS);
    } else {
      // Set a default if nothing matches
      const defaultType = TypeS.find(typ => typ.code === "nft");
      if (defaultType) {
        setSelectedType_intall(defaultType);
        setSelectedtype(defaultType.name);
      }
    }
  }, []);

  // Update when selected type changes in Redux store
  useEffect(() => {
    if (theSelectedType) {
      const typeS = TypeS.find((typ) => typ.code === theSelectedType);
      if (typeS) {
        setSelectedType_intall(typeS);
        setSelectedtype(typeS.name);
      }
    }
  }, [theSelectedType]);

  const handlePress = () => {
    setMenuOpen(true);
    Animated.timing(menuAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = (typeS) => {
    Animated.timing(menuAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setMenuOpen(false);
      setSelectedtype(typeS.name);
      setSelectedType_intall(typeS);
      dispatch(saveType(typeS.code));
      navigation.dispatch(
        StackActions.replace("garden", { typeCode: typeS.code })
      );
    });
  };

  const getChooseText = () => {
    return "Choose your system";
  };

  return (
    <View style={styles.container}>
      <Image source={backgroundImage} style={styles.backgroundImage} />
      
      <View style={styles.body}>
        <TouchableOpacity 
          onPress={handlePress} 
          style={styles.languageSelector}
          activeOpacity={0.8}
        >
          <View style={styles.iconContainer}>
            <Text style={styles.iconText}>
              {selectedType_intall ? selectedType_intall.code.toUpperCase() : "NFT"}
            </Text>
          </View>
          <Text style={styles.selectedLanguage}>{selectedType}</Text>
          <Text style={styles.chevron}>▼</Text>
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
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>Hydroponic Systems</Text>
            </View>
            <ScrollView 
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}
            >
              {TypeS.map((typeS, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => closeMenu(typeS)}
                  style={[
                    styles.languageItem,
                    selectedType === typeS.name && styles.selectedItem
                  ]}
                  activeOpacity={0.7}
                >
                  <View style={styles.listIconContainer}>
                    <Text style={styles.listIconText}>{typeS.code.toUpperCase()}</Text>
                  </View>
                  <Text style={[
                    styles.languageName,
                    selectedType === typeS.name && styles.selectedItemText
                  ]}>
                    {typeS.name}
                  </Text>
                  {selectedType === typeS.name && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
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
    backgroundColor: '#E8FFDB',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '40%', // Only covering part of the screen
    top: 0,
    resizeMode: 'cover',
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  languageSelector: {
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
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 160, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00A000',
  },
  selectedLanguage: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: "#00A000",
  },
  chevron: {
    fontSize: 16,
    color: "#00A000",
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
    top: height * 0.3,
    left: 20,
    right: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    maxHeight: height * 0.5,
  },
  menuHeader: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    backgroundColor: '#F5F5F5',
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#008000',
    textAlign: 'center',
  },
  scrollView: {
    flexGrow: 0,
  },
  languageItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  selectedItem: {
    backgroundColor: 'rgba(0, 160, 0, 0.1)',
  },
  listIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 160, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  listIconText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#008000',
  },
  languageName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#333333",
  },
  selectedItemText: {
    color: "#008000",
    fontWeight: "700",
  },
  checkmark: {
    fontSize: 18,
    color: "#008000",
    fontWeight: "bold",
  },
});

export default Type_intall;