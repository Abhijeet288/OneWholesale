import { Animated } from 'react-native';

export const pulseAnimation = (animatedValue, duration = 100) => {
  return Animated.sequence([
    Animated.timing(animatedValue, {
      toValue: 0.5,
      duration: duration,
      useNativeDriver: true,
    }),
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true,
    }),
  ]);
};
