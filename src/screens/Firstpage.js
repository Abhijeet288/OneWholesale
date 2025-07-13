// screens/Firstpage.js
import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomLoader from '../components/CustomLoader';

const { width, height } = Dimensions.get('window');

const Firstpage = () => {
  const navigation = useNavigation();
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(true);
    },150); // Show loader after 1.5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleLoaderFinish = () => {
    navigation.navigate('Language');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assests/images/mainlogo.png')}
        style={styles.mainlogo}
        resizeMode="contain"
      />
      <CustomLoader visible={showLoader} onFinish={handleLoaderFinish} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f5ec',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
  },
  mainlogo: {
    width: width * 0.6,
    height: height * 0.3,
    marginBottom: 20,
  },
});

export default Firstpage;
