
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

const Loader = ({ visible = true }) => {
  if (!visible) 
    return null;

  return (
    <View style={styles.overlay}>
      <LottieView
        source={require('../../locals/loader.json')}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0, left: 0,
    width,
    height,
    backgroundColor: 'rgba(242, 230, 230, 0.74)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  animation: {
    width: 150,
    height: 150,
    
  },
});

export default Loader;
