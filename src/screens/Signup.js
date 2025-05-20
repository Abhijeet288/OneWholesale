import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
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
} from 'react-native';
import Toast from 'react-native-toast-message';
import { pulseAnimation } from '../utils/Animation';

export default function Signup() {

  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [showOtpSection, setShowOtpSection] = useState(false);
  const fadeAnim = new Animated.Value(1);

  const generateOTP = () => {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    console.log('Generated OTP:', otp);
    setGeneratedOtp(otp);
  };

  const NavigatetoSignIn = (lang) => {
    navigation.navigate('Registration');
  }
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
      generateOTP();
      setShowOtpSection(true);
      Toast.show({ type: 'success', text1:'OTP Sent Successfully !!' });
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Failed to send OTP' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = () => {
    if (otp === generatedOtp) {
      Toast.show({ type: 'success', text1: 'OTP verified successfully!' });
      navigation.navigate('Registration');
    } else {
      Toast.show({ type: 'error', text1: ' Invalid  OTP ! Please check again' });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.whiteBackground}>
        <View style={styles.content}>
          <Image
            source={require('../assests/images/mainlogo.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>SignUp for New User !</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.prefix}>+91</Text>
            <TextInput
              style={styles.input}
              placeholder='Enter Phone number'
              keyboardType="phone-pad"
              maxLength={10}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholderTextColor="#999"
            />
          </View>

          <TouchableOpacity onPress={handleSendOTP} disabled={isLoading}>
            <Animated.View style={[styles.button, { opacity: fadeAnim }]}>
              <Text style={styles.buttonText}>
                {isLoading ? 'Sending OTP ..': 'Send Otp'}
              </Text>
            </Animated.View>
          </TouchableOpacity>

          {showOtpSection && (
            <>
              <TextInput
                style={{
                  fontSize: 15,
                  marginVertical: 20,
                  width: '80%',
                  textAlign: 'center',
                  color: '#333',
                  borderRadius: 10,
                  borderColor: '#333',
                  borderWidth: 1,
                  backgroundColor: '#f9f9f9',
                }}
                placeholder='Enter 4-digit OTP'
                keyboardType="numeric"
                maxLength={4}
                value={otp}
                onChangeText={setOtp}
                placeholderTextColor="grey"
              />
              <TouchableOpacity
                onPress={handleVerifyOtp}
                style={{ marginTop: 10 }}>
                <View style={[styles.button, { backgroundColor: '#2196F3' }]}>
                  <Text style={styles.buttonText}>Submit OTP</Text>
                </View>
              </TouchableOpacity>
            </>
          )}

          <Text style={styles.terms}>
            By continuing, you agree that you have read and accept our{'\n'}
            <Text style={styles.link}>terms & conditions</Text> and{' '}
            <Text style={styles.link}>privacy policy</Text>
          </Text>
        </View>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Already have an account? </Text>
           
        </View>
        <TouchableOpacity style={styles.LoginContainer} onPress={() => navigation.navigate('Registration')}>
            <Text style={styles.signupLink}>Click here for Login</Text>
          </TouchableOpacity>
       
      </View>
      <Toast />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, },
  whiteBackground: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  logo: { width: 400, height: 180, resizeMode: 'contain' },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  prefix: { paddingLeft: 15, paddingRight: 5, fontSize: 16, color: '#333' },
  input: { flex: 1, padding: 15, fontSize: 16, color: '#333' },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: 300,
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
    textAlign: 'center',
  },
  terms: {
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 12,
    paddingHorizontal: 20,
  },
  link: { color: '#4CAF50', textDecorationLine: 'underline' },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: { color: '#333', fontSize: 17 },
  signupLink: {
    color: '#4CAF50',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 5,
    textDecorationLine: 'underline',
  },
  LoginContainer:{

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
