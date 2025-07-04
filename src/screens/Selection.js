import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const Selection = () => {
  const navigation = useNavigation();

  const goToRegistration = () => {
    navigation.navigate('Registration');
  };

  

  return (
    <View style={styles.container}>
      {/* Header with Logo */}
      <View style={styles.header}>
        <Image
          source={require('../assests/images/mainlogo.png')}
          style={styles.logo}
        />
      </View>

      <View style={styles.contentContainer}>
        {/* BUYER Card */}
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.optionContainer}
            onPress={goToRegistration}
          >
            <Image
              source={require('../assests/images/buyer.png')}
                // source={{ uri: 'https://images.unsplash.com/photo-1623211265502-412854043d15?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGluZGlhbiUyMGZhcm1lcnxlbnwwfHwwfHx8MA%3D%3D' }}
              style={styles.optionImage}
            />
            <Text style={styles.optionText}>FARMER</Text>
          </TouchableOpacity>
        </View>

        {/* DELIVERY Card */}
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.optionContainer}
            onPress={goToRegistration}
          >
            <Image
              source={require('../assests/images/delivery.png')}
              style={styles.optionImage}
            />
            <Text style={styles.optionText}>DELIVERY PARTNER</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  logo: {
    width: width * 0.25,
    height: 80,
    resizeMode: 'contain',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  optionContainer: {
    alignItems: 'center',
  },
  optionImage: {
    width: '100%',
    height: height * 0.27, // Reduced height to prevent overflow
    resizeMode: 'cover',
    borderRadius: 15,
  },
  optionText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default Selection;
