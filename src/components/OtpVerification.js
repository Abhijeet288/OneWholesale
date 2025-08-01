


// import React, { useRef, useState, useContext, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   Platform,
//   Image,
//   Dimensions,
//   Alert,
// } from 'react-native';
// import axios from 'axios';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { UserContext } from '../Contexts/UserContext';

// const { width, height } = Dimensions.get('window');

// export default function OtpVerification() {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const { user } = useContext(UserContext);
//   const { isExistingUser } = route.params;

//   const [otp, setOtp] = useState(['', '', '', '']);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [timer, setTimer] = useState(30);
//   const [resendDisabled, setResendDisabled] = useState(true);

//   const inputs = useRef([]);
//   const backspacePressed = useRef(false);

//   useEffect(() => {
//     let interval;
//     if (resendDisabled) {
//       interval = setInterval(() => {
//         setTimer(prev => {
//           if (prev <= 1) {
//             clearInterval(interval);
//             setResendDisabled(false);
//             return 30;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [resendDisabled]);

//   const handleChange = (text, index) => {
//     const newOtp = [...otp];
//     if (/^\d$/.test(text)) {
//       newOtp[index] = text;
//       setOtp(newOtp);
//       setErrorMessage('');
//       if (index < 3) inputs.current[index + 1]?.focus();
//     }
//   };

//   const handleKeyPress = ({ nativeEvent }, index) => {
//     if (nativeEvent.key === 'Backspace') {
//       if (otp[index] === '' && index > 0) {
//         inputs.current[index - 1]?.focus();
//         const newOtp = [...otp];
//         newOtp[index - 1] = '';
//         setOtp(newOtp);
//       }
//     }
//   };

//   const verifyOtp = async () => {
//     const enteredOtp = otp.join('');
//     if (enteredOtp.length < 4) {
//       setErrorMessage('Please enter all 4 digits');
//       return;
//     }

//     try {
//       const res = await axios.get(`http://10.0.2.2:5220/api/Registration/User/OTP/${enteredOtp}`);
//       if (res.data[0]?.success === 1) {
//         if (isExistingUser) {
//           navigation.replace('MainApp');
//         } else {
//           navigation.replace('Registration');
//         }
//       } else {
//         setErrorMessage('Invalid OTP! Please try again.');
//       }
//     } catch (error) {
//       Alert.alert('OTP API error', error.message);
//     }
//   };

//   const handleResendOtp = () => {
//     // For now, just restart timer and reset input (API call optional)
//     setOtp(['', '', '', '']);
//     setTimer(30);
//     setResendDisabled(true);
//     setErrorMessage('');
//     inputs.current[0]?.focus();
//     console.log('Resend OTP triggered'); // Can add resend OTP API call here
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}
//     >
//       <View style={styles.innerContainer}>
//         <Image
//           source={require('../assests/images/mainlogo.png')}
//           style={styles.logo}
//         />

//         <Text style={styles.title}>OTP Verification</Text>

//         <View style={styles.inputcontainer}>
//           <Text style={styles.prefix}>+91</Text>
//           <TextInput
//             style={styles.phoneInput}
//             value={user.phoneNumber}
//             editable={false}
//             keyboardType="phone-pad"
//           />
//         </View>

//         <View style={styles.otpContainer}>
//           {otp.map((digit, index) => (
//             <TextInput
//               key={index}
//               ref={ref => (inputs.current[index] = ref)}
//               style={styles.otpInput}
//               keyboardType="numeric"
//               maxLength={1}
//               value={digit}
//               onChangeText={text => handleChange(text, index)}
//               placeholder="•"
//               placeholderTextColor="#aaa"
//               onKeyPress={e => handleKeyPress(e, index)}
//               returnKeyType="done"
//             />
//           ))}
//         </View>

//         {errorMessage ? (
//           <Text style={styles.errorText}>{errorMessage}</Text>
//         ) : null}

//         <TouchableOpacity onPress={verifyOtp} style={styles.button}>
//           <Text style={styles.buttonText}>Submit OTP</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           disabled={resendDisabled}
//           onPress={handleResendOtp}
//           style={[styles.resendButton, resendDisabled && { opacity: 0.6 }]}
//         >
//           <Text style={styles.resendText}>
//             {resendDisabled ? `Resend OTP in ${timer}s` : 'Resend OTP'}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#e6f5ec',
//   },
//   innerContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: width * 0.06,
//     paddingVertical: height * 0.05,
//   },
//   logo: {
//     width: width * 0.5,
//     height: height * 0.25,
//     resizeMode: 'contain',
//   },
//   title: {
//     fontSize: width * 0.065,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: height * 0.02,
//   },
//   inputcontainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5',
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//     width: '85%',
//     marginTop: height * 0.01,
//   },
//   prefix: {
//     fontSize: width * 0.045,
//     color: '#333',
//     marginRight: 6,
//   },
//   phoneInput: {
//     fontSize: width * 0.045,
//     color: '#333',
//     flex: 1,
//   },
//   otpContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '80%',
//     marginVertical: height * 0.035,
//   },
//   otpInput: {
//     width: width * 0.15,
//     height: width * 0.14,
//     borderWidth: 2,
//     borderColor: 'white',
//     borderRadius: 12,
//     textAlign: 'center',
//     fontSize: width * 0.06,
//     backgroundColor: '#fff',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 3,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: width * 0.035,
//     marginBottom: height * 0.015,
//     textAlign: 'center',
//   },
//   button: {
//     backgroundColor: '#4CAF50',
//     paddingVertical: height * 0.018,
//     borderRadius: 10,
//     width: '80%',
//     alignSelf: 'center',
//     shadowColor: '#4CAF50',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 3,
//     marginTop: height * 0.01,
//   },
//   buttonText: {
//     color: '#fff',
//     textAlign: 'center',
//     fontWeight: '600',
//     fontSize: width * 0.045,
//   },
//   resendButton: {
//     marginTop: height * 0.015,
//     paddingVertical: height * 0.012,
//     paddingHorizontal: width * 0.1,
//   },
//   resendText: {
//     color: '#007BFF',
//     fontSize: width * 0.04,
//     textAlign: 'center',
//     fontWeight: '500',
//   },
// });








// -----------------------------------------------------------






















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
  Alert,
  ToastAndroid,
} from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import { UserContext } from '../Contexts/UserContext';

const { width, height } = Dimensions.get('window');

export default function OtpVerification() {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useContext(UserContext);
  const { isExistingUser } = route.params;

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [errorMessage, setErrorMessage] = useState('');
  const [timer, setTimer] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const inputs = useRef([]);

  // Function to show toast message
  const showToast = (message) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert('Info', message);
    }
  };

  useEffect(() => {
    let interval;
    if (resendDisabled) {
      interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
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

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    if (/^\d$/.test(text)) {
      newOtp[index] = text;
      setOtp(newOtp);
      setErrorMessage('');
      if (index < 5) inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        inputs.current[index - 1]?.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
      }
    }
  };
    
  const verifyOtp = async () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 6) {
      setErrorMessage('Please enter all 6 digits');
      return;
    }

    setIsLoading(true);
    try {
      const requestData = {
        mobileNumber: user.phoneNumber,
        otp: enteredOtp,
        generatedOTP: user.generatedOTP, // Use stored generated OTP
        otpExpiryTime: user.otpExpiryTime // Use stored expiry time
      };

      console.log('Sending validate OTP request:', requestData); // Debug log

      const response = await axios.post('http://10.0.2.2:5220/api/Registration/ValidateOtp', requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Validate OTP response:', response.data); // Debug log

      if (response.data) {
        // Show success toast message
        showToast(response.data.message || 'OTP verified successfully');
        
        // Navigate based on user type
        if (isExistingUser) {
          navigation.replace('MainApp');
        } else {
          navigation.replace('Registration');
        }
      }
    } catch (error) {
      console.error('Verify OTP Error:', error);
      console.error('Error response:', error.response?.data); // Debug log
      console.error('Error status:', error.response?.status); // Debug log
      
      // Handle error response
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
        showToast(error.response.data.message);
      } else if (error.response?.status === 400) {
        setErrorMessage('Invalid request. Please check your input.');
        showToast('Invalid request. Please try again.');
      } else if (error.response?.status === 401) {
        setErrorMessage('OTP expired or invalid. Please try again.');
        showToast('OTP expired or invalid. Please try again.');
      } else {
        setErrorMessage('Invalid OTP! Please try again.');
        Alert.alert('Error', 'Failed to verify OTP. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleResendOtp = () => {
    // Clear current OTP and reset UI
    setOtp(['', '', '', '', '', '']);
    setTimer(30);
    setResendDisabled(true);
    setErrorMessage('');
    inputs.current[0]?.focus();
    
    // Show message that new OTP has been sent (backend handles the generation)
    showToast('New OTP has been sent to your mobile number');
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

        <Text style={styles.otpSentText}>
          OTP has been sent to your mobile number
        </Text>

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
              editable={!isLoading}
            />
          ))}
        </View>

        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        <TouchableOpacity 
          onPress={verifyOtp} 
          style={[styles.button, isLoading && styles.buttonDisabled]}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Verifying...' : 'Submit OTP'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={resendDisabled}
          onPress={handleResendOtp}
          style={[
            styles.resendButton, 
            resendDisabled && { opacity: 0.6 }
          ]}
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
    marginTop: height * 0.01,
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
  otpSentText: {
    fontSize: width * 0.035,
    color: '#666',
    textAlign: 'center',
    marginTop: height * 0.015,
    marginBottom: height * 0.01,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginVertical: height * 0.035,
  },
  otpInput: {
    width: width * 0.12,
    height: width * 0.12,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 12,
    textAlign: 'center',
    fontSize: width * 0.05,
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
  buttonDisabled: {
    backgroundColor: '#cccccc',
    shadowColor: '#cccccc',
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