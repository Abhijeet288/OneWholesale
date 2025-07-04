import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';


export default function Location() {
  const navigation = useNavigation();

  
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../assests/images/mainlogo.png')}
          style={styles.logo}
        />

        <Text style={styles.title}>What's your Location?</Text>
        <Text style={styles.subtitle}>
          Please allow your device's location to receive location-based personalised advisories and services for your crop.
        </Text>

        <Image
          source={{
            uri: 'https://cdn.pixabay.com/photo/2019/03/08/15/55/map-4042585_1280.png',
          }}
          style={styles.illustration}
        />

        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('MainApp')}>
          <Text style={styles.buttonText}>Allow Location Access</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.manualButton}
          onPress={() => navigation.navigate('LocationManual')}
        >
          <Text style={styles.manualButtonText}>
            Enter Location Manually
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: height * 0.05,
  },
  logo: {
    width: width * 0.4,
    height: width * 0.25,
    marginBottom: height * 0.03,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
    color: 'black',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginHorizontal: 20,
    lineHeight: 24,
  },
  illustration: {
    width: width * 0.565,
    height: width * 0.7,
    marginVertical: height * 0.05,
  },
  button: {
    backgroundColor: '#008756',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    marginTop: height * 0.02,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  manualButton: {
    marginTop: 16,
    padding: 8,
  },
  manualButtonText: {
    color: '#008756',
    fontSize: 16,
    fontWeight: '500',
  },
});
