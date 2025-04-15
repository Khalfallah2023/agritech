
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LevelSelector = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const navigation = useNavigation();
  const [scaleAnim] = useState(new Animated.Value(1));

  const levels = [
    { id: 'beginner', label: 'Beginner', stars: 1, color: '#4CAF50' },
    { id: 'intermediate', label: 'Intermediate', stars: 2, color: '#4CAF50' },
    { id: 'advanced', label: 'Advanced', stars: 3, color: '#4CAF50' },
  ];

  const renderStars = (count) => {
    return (
      <View style={styles.starsContainer}>
        {[...Array(count)].map((_, index) => (
          <Text 
            key={index} 
            style={[
              styles.starIcon,
              selectedLevel === levels[count-1].id && styles.selectedStarIcon
            ]}
          >
            ★
          </Text>
        ))}
        {[...Array(3 - count)].map((_, index) => (
          <Text 
            key={`empty-${index}`} 
            style={[
              styles.starIcon, 
              styles.emptyStar,
              selectedLevel === levels[count-1].id && styles.selectedEmptyStar
            ]}
          >
            ☆
          </Text>
        ))}
      </View>
    );
  };


  const handleLevelSelect = (levelId) => {
    setSelectedLevel(levelId);
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleStart = () => {
    if (selectedLevel) {
      navigation.navigate('garden', {
        level: selectedLevel
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
     <View style={styles.header}>
             <TouchableOpacity 
               style={styles.backButton}
               onPress={() => navigation.goBack()}
             >
               <Text style={styles.backIcon}>←</Text>
             </TouchableOpacity>
             <Text style={styles.headerTitle}>Choose Your Level</Text>
             
           </View>
           <Text style={styles.subtitle}>Select the difficulty that matches your experience</Text>

      <View style={styles.levelsContainer}>
        {levels.map((level) => {
          const isSelected = selectedLevel === level.id;
          return (
            <TouchableOpacity
              key={level.id}
              style={[
                styles.levelButton,
                isSelected && [styles.selectedLevel, { backgroundColor: level.color }],
              ]}
              onPress={() => handleLevelSelect(level.id)}
            >
              <View>
                <Text style={[
                  styles.levelText,
                  isSelected && styles.selectedLevelText
                ]}>
                  {level.label}
                </Text>
                <Text style={[
                  styles.levelDescription,
                  isSelected && styles.selectedLevelText
                ]}>
                  {`Level ${level.stars} Difficulty`}
                </Text>
              </View>
            
                {renderStars(level.stars)}
             
            </TouchableOpacity>
          );
        })}
      </View>

      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          style={[
            styles.startButton,
            !selectedLevel && styles.startButtonDisabled,
          ]}
          disabled={!selectedLevel}
          onPress={handleStart}
        >
          <Text style={styles.startButtonText}>
            {selectedLevel ? 'Start Challenge' : 'Select a Level'}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8FFDB',
    padding: 24,
  },
  body: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
    paddingBottom:70,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginLeft: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: '#000000',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    color: '#E8FFDB',
    fontSize: 25,
  },
  title: {
    marginTop: 200,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#008000',
  },
  levelsContainer: {
    gap: 16,
  },
  levelButton: {
    marginTop: 3,
    margin: 20,
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedLevel: {
    borderColor: 'transparent',
    elevation: 4,
    shadowOpacity: 0.2,
  },
  levelText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  levelDescription: {
    fontSize: 14,
    color: '#666',
  },
  selectedLevelText: {
    color: '#FFF',
  },
  stars: {
    color: '#FFD700',
    fontSize: 20,
    fontWeight: '600',
  },
  selectedStars: {
    color: '#FFF',
  },
  startButton: {
    backgroundColor: '#008000',
    margin: 25,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: '100',
    marginBottom: 20,
  },
  startButtonDisabled: {
    backgroundColor: '#00ff003',
  },
  startButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  starIcon: {
    fontSize: 24,
    color: '#FFD700',
  },
  selectedStarIcon: {
    color: '#FFF',
  },
  emptyStar: {
    color: '#E0E0E0',
  },
  selectedEmptyStar: {
    color: 'rgba(255, 255, 255, 0.3)',
  },
});

export default LevelSelector;