// components/CustomLoader.js
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Animated } from 'react-native';

const { width } = Dimensions.get('window');

const imageData = [
  { uri: require('../assests/images/img/drone.png'), text: 'Drone' },
  { uri: require('../assests/images/img/feed.webp'), text: 'Feed' },
  { uri: require('../assests/images/img/harvestor.png'), text: 'Harvestor' },
  { uri: require('../assests/images/img/sprayer.png'), text: 'sprayer' },
  { uri: require('../assests/images/img/precessionfarming.png'), text: 'precession' },
  { uri: require('../assests/images/img/seed.png'), text: 'seed' },
  { uri: require('../assests/images/img/tractor.png'), text: 'tractor' },
  { uri: require('../assests/images/img/weather.png'), text: 'weather' },
  { uri: require('../assests/images/img/pesticides.png'), text: 'Pesticides' },


];

const CustomLoader = ({ visible, onFinish }) => {
  const [index, setIndex] = useState(0);
  const translateY = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    if (!visible) return;

    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % imageData.length);
    }, 300);

    const timeout = setTimeout(() => {
      Animated.timing(translateY, {
        toValue: 30,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        if (onFinish) onFinish();
      });
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.box, { transform: [{ translateY }] }]}>
      <Image source={imageData[index].uri} style={styles.image} />
      <Text style={styles.text}>{imageData[index].text}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  image: {
    width: width * 0.35,
    height: width * 0.35,
    opacity: 0.8,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginTop: 10,
    opacity: 0.8,
  },
});

export default CustomLoader;
