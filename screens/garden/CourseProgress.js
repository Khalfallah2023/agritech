import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const CourseProgress = ({ navigation }) => {
  const nav = useNavigation() || navigation;
 

  const progressItems= [
    {
      title: 'Smart Irrigation',
      progress: 87, 
      color: '#E8FFDB', // Vert clair pour l'irrigation
      gradientColors: ['#A7D489', '#E8FFDB']
    },
    {
      progress: 92,
      title: 'Drone Farming',
      color: '#F0F7FF', // Bleu clair pour les drones
     gradientColors: ['#87CEEB', '#F0F7FF']
    },
    {
      title: 'Soil Analysis',
      progress: 51,
      color: '#E8FFDB', // Beige pour le sol
      gradientColors: ['#DEB887', '#E8FFDB']
    },
    { progress: 92,
      title: 'IoT Sensors',
      color: '#FFE6E6', // Rose clair pour l'électronique
      gradientColors: ['#FFE6E6', '#FFE6E6']
    },
   
    {
      title: 'Climate Data',
      progress: 92,
      color: '#E6FFF9', // Turquoise clair pour le climat
      gradientColors: ['#98D8BF', '#E6FFF9'] 
    }
  ];
  // Données du graphique avec des valeurs plus réalistes
  const chartData = [45, 58, 32, 79, 65, 48];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  const renderProgressItem = (item) => (
    <TouchableOpacity
      key={item.title}
      style={styles.progressItem}
    >
      <LinearGradient
        colors={item.gradientColors}
        style={styles.progressItemGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.progressCircle}>
          <View style={styles.progressInnerCircle}>
            <Text style={styles.progressPercentage}>{item.progress}%</Text>
          </View>
        </View>
        <Text style={styles.progressItemTitle}>{item.title}</Text>
        <View style={styles.arrowContainer}>
          <Icon name="chevron-right" size={24} color="#000" />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const render3DChart = () => (
    <View style={styles.chartContainer}>
      <View style={styles.chartHeader}>
        <View style={styles.gpaBadge}>
          <Text style={styles.gpaText}>GPA 7.0</Text>
        </View>
      </View>
      
      {/* Ligne pointillée de référence */}
      <View style={styles.chartLine} />
      
      {/* Barres du graphique 3D */}
      <View style={styles.barsContainer}>
        {chartData.map((value, index) => (
          <View key={index} style={styles.barItemContainer}>
            {/* Face avant (front) */}
            <LinearGradient
              colors={['#4CAF50', '#2E7D32']}
              style={[styles.chartBarFront, { height: value * 1.2 }]}
            />
            
            {/* Face supérieure (top) */}
            <View style={[styles.chartBarTop, { bottom: value * 1.2 }]} />
            
            {/* Face latérale (side) */}
            <LinearGradient
              colors={['#2E7D32', '#1B5E20']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.chartBarSide, { height: value * 1.2 }]}
            />
            
            <Text style={styles.monthLabel}>{months[index]}</Text>
          </View>
        ))}
      </View>

      {/* Effet de reflet sur le "sol" */}
      <View style={styles.chartReflection} />
    </View>
  );

  const renderNavBar = () => (
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem}
                  onPress={() => nav.navigate('garden')}
>
          <Icon name="home" size={35} color="#00000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="search" size={35} color="#00000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="spa" size={30} color="#008000" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => nav.navigate('progress')}
        >
          <Icon name="bar-chart" size={35} color="#00000" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => nav.navigate('profile')}
        >
          <Icon name="person" size={35} color="#00000" />
        </TouchableOpacity>
      </View>
    );
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => nav.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Progress</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Icon name="share" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.mainProgress}>
        <Text style={styles.mainProgressText}>
          87% <Text style={styles.rocketEmoji}>🚀</Text>
        </Text>
        <Text style={styles.mainProgressSubtext}>of the course Passed</Text>
      </View>
      
      {render3DChart()}
      
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {progressItems.map(renderProgressItem)}
      </ScrollView>
      
      {renderNavBar()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: '#333',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButton: {
    width: 40,
    height: 40,
    backgroundColor: '#333',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainProgress: {
    alignItems: 'center',
    padding: 10,
  },
  mainProgressText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  rocketEmoji: {
    fontSize: 28,
  },
  mainProgressSubtext: {
    fontSize: 16,
    color: '#AAAAAA',
    marginTop: 5,
  },
  chartContainer: {
    height: 200,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    position: 'relative',
    perspective: 500, // Effet de perspective pour le 3D
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  gpaBadge: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  gpaText: {
    fontWeight: 'bold',
    color: '#000000',
  },
  chartLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '30%',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#FFFFFF',
    opacity: 0.5,
    zIndex: 1,
  },
  barsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '80%',
    paddingHorizontal: 5,
    transform: [{ rotateX: '10deg' }], // Légère inclinaison pour effet 3D
  },
  barItemContainer: {
    alignItems: 'center',
    width: (width - 80) / 6,
    position: 'relative',
  },
  chartBarFront: {
    width: 50,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    zIndex: 2,
    
  },
  chartBarTop: {
    width: 0,
    height: 80,
    position: 'absolute',
    right: 0,
    backgroundColor: '#4CAF50',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    transform: [{ rotateX: '70deg' }, { translateY: -4 }],
    zIndex: 3,
  },
  chartBarSide: {
    width: 8,
    position: 'absolute',
    right: -4,
    bottom: 0,
    borderTopRightRadius: 2,
    transform: [{ rotateY: '90deg' }],
    zIndex: 1,
  },
  monthLabel: {
    color: '#AAAAAA',
    fontSize: 12,
    marginTop: 10,
  },
  chartReflection: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 10,
  },
  scrollContent: {
    flex: 1,
    padding: 20,
  },
  progressItem: {
    marginBottom: 15,
    borderRadius: 25,
    overflow: 'hidden',
  },
  progressItemGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 25,
  },
  progressCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  progressInnerCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressItemTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  arrowContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#E8FFDB',
    borderTopWidth: 1,
    marginBottom: -30,
    borderTopColor: '#E8FFDB',
  },
  navItem: {
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeNavItem: {
    backgroundColor: 'rgba(46, 125, 50, 0.1)',
  },
});

export default CourseProgress;