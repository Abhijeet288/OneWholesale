import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import AllLanguage from '../assests/constants/AllLanguage';


const Language = () => {
  const navigation = useNavigation();

  const handleLanguageSelect = (lang) => {

    navigation.navigate('LoginDelivery'); 
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assests/images/mainlogo.png')} // Adjust path if necessary
            style={styles.logoDesign}
          />
        </View>
        <Text style={styles.title}>Select your language</Text>

        <View style={styles.grid}>
          {AllLanguage.map((lang, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.card, { backgroundColor: lang.color }]}
              onPress={() => handleLanguageSelect(lang)}
            >
              <Text style={styles.langText}>{lang.label}</Text>
              <Text style={styles.subText}>{lang.sub}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const { width } = Dimensions.get('window');
const cardSize = width / 2 - 30;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f5ec',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  logoDesign: {
    width: width * 0.35,
    height: width * 0.35,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    marginVertical: 20,
    color: 'black',
   
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  card: {
    width: cardSize,
    height: 100,
    borderRadius: 12,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  langText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    

  },
  subText: {
    fontSize: 14,
    color: '#333',
    

  },
});

export default Language;
