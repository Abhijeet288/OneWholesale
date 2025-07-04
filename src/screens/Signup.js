import { useNavigation } from '@react-navigation/native';
import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Image,
  Animated,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { pulseAnimation } from '../utils/Animation';
import { UserContext } from '../Contexts/UserContext';

const { width, height } = Dimensions.get('window');

export default function Signup() {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const fadeAnim = new Animated.Value(1);

  const handleSendOTP = async () => {
    Keyboard.dismiss();
    if (phoneNumber.length !== 10 || !/^\d{10}$/.test(phoneNumber)) {
      Toast.show({
        type: 'error',
        text1: 'Please enter a valid 10-digit phonenumber',
      });
      return;
    }

    setIsLoading(true);
    pulseAnimation(fadeAnim).start();

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      console.log('Generated OTP:', otp);

      setUser({ phoneNumber });
      Toast.show({ type: 'success', text1: 'OTP Sent Successfully!' });
      navigation.navigate('OtpVerification', {
        generatedOtp: otp,
        purpose: 'Signup',
      });
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Failed to send OTP' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.content}>
            <Image
              source={require('../assests/images/mainlogo.png')}
              style={[styles.logo]}
            />
            <Text style={styles.title}>SignUp for New User !</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.prefix}>+91</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Phone number"
                keyboardType="phone-pad"
                maxLength={10}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholderTextColor="#999"
              />
            </View>

            <TouchableOpacity onPress={handleSendOTP} disabled={isLoading}>
              <Animated.View style={[styles.button, { opacity: fadeAnim, width: width * 0.8 }]}>
                <Text style={styles.buttonText}>
                  {isLoading ? 'Sending OTP ..' : 'Send OTP'}
                </Text>
              </Animated.View>
            </TouchableOpacity>

            <Text style={styles.terms}>
              By continuing, you agree that you have read and accept our{'\n'}
              <Text style={styles.link}>terms & conditions</Text> and{' '}
              <Text style={styles.link}>privacy policy</Text>
            </Text>
          </View>
        </ScrollView>
        <Toast />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: 
  { flex: 1, backgroundColor: 'white' },
  container: { flex: 1 },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
  },
  logo: {
     width: width * 0.8,
    height: height * 0.2,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
     marginBottom: height * 0.025,
    width: '95%',
    height:height*0.08,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
  },
  prefix: {
    fontSize: 16,
    color: '#333',
    marginRight: 5,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  terms: {
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 12,
    paddingHorizontal: 10,
  },
  link: {
    color: '#4CAF50',
    textDecorationLine: 'underline',
  },
});
