import { View, Image, StyleSheet, Dimensions } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Firstpage = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Selection');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assests/images/mainlogo.png')}
        style={styles.mainlogo}
        resizeMode="contain"
      />
      {/* <Image
        source={require('../assests/images/environment.webp')}
        style={styles.earthlogo}
        resizeMode="contain"
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
  },
  mainlogo: {
    width: width * 0.6,
    height: height * 0.3,
    marginVertical: height * 0.02,
  },
  earthlogo: {
    width: width * 0.8,
    height: height * 0.3,
    marginVertical: height * 0.02,
  },
});

export default Firstpage;
