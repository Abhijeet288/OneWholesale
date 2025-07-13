import React, { useRef, useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { UserContext } from '../Contexts/UserContext';

const { width, height } = Dimensions.get('window');

export default function OtpVerification() {
  const navigation = useNavigation();
  const route = useRoute();
  const { purpose = '' } = route.params || {};
  const [generatedOtp, setGeneratedOtp] = useState(route.params?.generatedOtp || '');
  const { user } = useContext(UserContext);
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = useRef([]);
  const [timer, settimer] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const backspacePressed = useRef(false);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    if (backspacePressed.current) {
      backspacePressed.current = false;
      if (text === '') {
        newOtp[index] = '';
        setOtp(newOtp);
        return;
      }
    }

    if (/^\d$/.test(text)) {
      newOtp[index] = text;
      setOtp(newOtp);
      setErrorMessage(''); // Clear error on input
      if (index < 3) {
        inputs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === 'Backspace') {
      backspacePressed.current = true;
      if (otp[index] === '') {
        if (index > 0) {
          inputs.current[index - 1]?.focus();
          const newOtp = [...otp];
          newOtp[index - 1] = '';
          setOtp(newOtp);
        }
      }
    }
  };

  const handleVerifyOtp = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp === generatedOtp) {
      setErrorMessage('');

      if (purpose === 'login') {
        navigation.replace('MainApp');
      } else if (purpose === 'Signup') {
        navigation.replace('Registration');
      }
    } else {
      setErrorMessage('Invalid OTP! Please try again.');
    }
  };

  useEffect(() => {
    let interval;
    if (resendDisabled) {
      interval = setInterval(() => {
        settimer(prev => {
          if (prev === 1) {
            clearInterval(interval);
            setResendDisabled(false);
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendDisabled]);

  const handleResendOtp = () => {
    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(newOtp);
    console.log('New OTP:', newOtp); // For testing
    setResendDisabled(true);
    settimer(30);
    setErrorMessage('');
    setOtp(['', '', '', '']);
    inputs.current[0]?.focus();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Image
          source={require('../assests/images/mainlogo.png')}
          style={styles.logo}
        />

        <Text style={styles.title}>OTP Verification</Text>

        <View style={styles.inputcontainer}>
          <Text style={styles.prefix}>+91</Text>
          <TextInput
            style={styles.phoneInput}
            value={user.phoneNumber}
            editable={false}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => (inputs.current[index] = ref)}
              style={styles.otpInput}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={text => handleChange(text, index)}
              placeholder="•"
              placeholderTextColor="#aaa"
              onKeyPress={e => handleKeyPress(e, index)}
              returnKeyType="done"
            />
          ))}
        </View>

        {/* Inline error message */}
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        <TouchableOpacity onPress={handleVerifyOtp} style={styles.button}>
          <Text style={styles.buttonText}>Submit OTP</Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={resendDisabled}
          onPress={handleResendOtp}
          style={[styles.resendButton, resendDisabled && { opacity: 0.6 }]}
        >
          <Text style={styles.resendText}>
            {resendDisabled ? `Resend OTP in ${timer}s` : 'Resend OTP'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#e6f5ec',
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.06,
    paddingVertical: height * 0.05,
  },
  logo: {
    width: width * 0.5,
    height: height * 0.25,
    resizeMode: 'contain',
  },
  title: {
    fontSize: width * 0.065,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: height * 0.02,
  },
  inputcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    paddingVertical: 10,
    width: '85%',
    marginTop: height * 0.010,
  },
  prefix: {
    fontSize: width * 0.045,
    color: '#333',
    marginRight: 6,
  },
  phoneInput: {
    fontSize: width * 0.045,
    color: '#333',
    flex: 1,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: height * 0.035,
  },
  otpInput: {
    width: width * 0.15,
    height: width * 0.14,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 12,
    textAlign: 'center',
    fontSize: width * 0.06,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  errorText: {
    color: 'red',
    fontSize: width * 0.035,
    marginBottom: height * 0.015,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: height * 0.018,
    borderRadius: 10,
    width: '80%',
    alignSelf: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    marginTop: height * 0.01,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: width * 0.045,
  },
  resendButton: {
    marginTop: height * 0.015,
    paddingVertical: height * 0.012,
    paddingHorizontal: width * 0.1,
  },
  resendText: {
    color: '#007BFF',
    fontSize: width * 0.04,
    textAlign: 'center',
    fontWeight: '500',
  },
});
