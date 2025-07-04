import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import AllLanguage from '../../assests/constants/AllLanguage';
import Icon from 'react-native-vector-icons/MaterialIcons';


const LanguageDrawer = () => {
  const navigation = useNavigation();
  const [selectionLangugae,setselectionLangugae]=useState(null);
  const handleSave=()=>{
    navigation.goBack();
  } 

  const handleLanguageSelect=(lang)=>{
    setselectionLangugae(lang.label);
  }


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assests/images/mainlogo.png')} 
            style={styles.logoDesign}
  
          />
        </View>
        <Text style={styles.title}>Select your language</Text>

        <View style={styles.grid}>
          {AllLanguage.map((lang, index) => {
            const isselected=selectionLangugae===lang.label
            return(
            <TouchableOpacity
              key={index}
              style={[styles.card, { backgroundColor: lang.color }]}
              onPress={()=>handleLanguageSelect(lang)}
            >
              <Text style={styles.langText}>{lang.label}</Text>
              <Text style={styles.subText}>{lang.sub}</Text>

              {isselected && (
                <View style={styles.tickiconcontainer}>   
                  <Icon name="check-circle" size={24} color="#4CAF50" />
                </View>
              )}

            </TouchableOpacity>
            );
            })}
        </View>
      </ScrollView>
      
            <View style={styles.buttonWrapper}>
              <TouchableOpacity style={[styles.saveButton,{backgroundColor:selectionLangugae?'#4CAF50': 'A5D6A7'}]} onPress={handleSave} disabled={!selectionLangugae}>
                <Text style={styles.saveButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>
    </View>
  );
};

const { width,height } = Dimensions.get('window');
const cardSize = width / 2 - 30;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
  buttonWrapper: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: width * 0.04,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: height * 0.02,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  tickiconcontainer:
  {
    position:'absolute',
    top:8,
    right:8
  }
});

export default LanguageDrawer;
