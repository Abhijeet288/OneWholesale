import React, { useRef } from 'react';
import { AppState, Linking, Alert, View, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import  Ionicons  from 'react-native-vector-icons/Ionicons'; // Use this if using Expo

const CallSupport = ({ navigation }) => {
  const phoneNumber = '1234567890'; // Replace with your actual support number
  const callUrl = `tel:${phoneNumber}`;
  const appState = useRef(AppState.currentState);

  useFocusEffect(
    React.useCallback(() => {
      const handleAppStateChange = (nextAppState) => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          navigation.navigate('MainApp');
        }
        appState.current = nextAppState;
      };

      const openDialPad = async () => {
        try {
          await Linking.openURL(callUrl);
        } catch (error) {
          console.error('Dial error:', error);
          Alert.alert('Error', 'Unable to open dial pad');
          navigation.navigate('MainApp');
        }
      };

      const subscription = AppState.addEventListener('change', handleAppStateChange);
      openDialPad();

      return () => {
        subscription.remove();
      };
    }, [navigation])
  );

  return 
};

export default CallSupport;
