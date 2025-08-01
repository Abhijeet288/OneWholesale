

// import React, { useState, useContext } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   Keyboard,
//   KeyboardAvoidingView,
//   Platform,
//   Image,
//   Animated,
//   ImageBackground,
//   Dimensions,
//   Alert,
//   ToastAndroid,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import axios from 'axios';
// import { useNavigation } from '@react-navigation/native';
// import { UserContext } from '../Contexts/UserContext';

// const { width, height } = Dimensions.get('window');

// export default function LoginDelivery() {
//   const navigation = useNavigation();
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [phoneError, setPhoneError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const fadeAnim = new Animated.Value(1);
//   const { setUser } = useContext(UserContext);

//   // Function to show toast message
//   const showToast = (message) => {
//     if (Platform.OS === 'android') {
//       ToastAndroid.show(message, ToastAndroid.SHORT);
//     } else {
//       Alert.alert('Info', message);
//     }
//   };

//   // Function to generate OTP
//   const generateOtp = async (phoneNumber) => {
//     try {
//       const response = await axios.post(`http://10.0.2.2:5220/api/Registration/GenerateOtp/${phoneNumber}`, {}, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.data) {
//         showToast(response.data.message || 'OTP generated successfully');
//         console.log('OTP Generated:', response.data.otp); // For debugging - remove in production
//         console.log('OTP Expiry:', response.data.expiry);
        
//         // Return the OTP data for storing in user context
//         return {
//           success: true,
//           generatedOTP: response.data.otp,
//           otpExpiryTime: response.data.expiry
//         };
//       }
//       return { success: false };
//     } catch (error) {
//       console.error('Generate OTP Error:', error);
//       console.error('Generate OTP Error Response:', error.response?.data);
      
//       // Handle specific error messages from server
//       if (error.response && error.response.data && error.response.data.message) {
//         showToast(error.response.data.message);
//       } else {
//         showToast('Failed to generate OTP. Please try again.');
//       }
//       return { success: false };
//     }
//   };

//   const handleLogin = async () => {
//     Keyboard.dismiss();

//     if (mobileNumber.length !== 10 || !/^\d{10}$/.test(mobileNumber)) {
//       setPhoneError('Please enter a valid 10-digit mobile number');
//       return;
//     }

//     setPhoneError('');
//     setIsLoading(true);

//     try {
//       // Check if user exists
//       const response = await axios.get(`http://10.0.2.2:5220/api/Registration/User/${mobileNumber}`);
//       console.log('Login API response:', response.data);

//       let isExistingUser = false;
//       let userId = null;
//       let isActive = false;

//       // Determine if user exists
//       if (Array.isArray(response.data) && response.data.length > 0) {
//         const data = response.data[0];
//         if (data && data.result === 1) {
//           isExistingUser = true;
//           userId = parseInt(data.userId);
//           isActive = data.isActive ?? false;
//         }
//       } else if (response.data && !Array.isArray(response.data)) {
//         const data = response.data;
//         if (data.result === 1) {
//           isExistingUser = true;
//           userId = parseInt(data.userId);
//           isActive = data.isActive ?? false;
//         }
//       }

//       // Generate OTP first
//       const otpResult = await generateOtp(mobileNumber);
      
//       if (otpResult.success) {
//         // Set user context with OTP data
//         const userContext = {
//           userId: userId,
//           phoneNumber: mobileNumber,
//           isExistingUser: isExistingUser,
//           isActive: isActive,
//           generatedOTP: otpResult.generatedOTP, // Store generated OTP
//           otpExpiryTime: otpResult.otpExpiryTime, // Store expiry time
//         };

//         setUser(userContext);
//         console.log('Set user context:', userContext);

//         // Navigate to OTP verification screen
//         setTimeout(() => {
//           navigation.navigate('OtpVerification', {
//             isExistingUser: isExistingUser,
//             isActive: isActive,
//           });
//         }, 100);
//       } else {
//         throw new Error('Failed to generate OTP');
//       }

//     } catch (error) {
//       console.error('Login API error:', error.message);
      
//       if (error.response && error.response.data && error.response.data.message) {
//         Alert.alert('Login Error', error.response.data.message);
//       } else {
//         Alert.alert('Login Error', 'Failed to process login. Please try again.');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <ImageBackground
//       style={styles.background}
//       resizeMode="cover"
//     >
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={styles.container}
//       >
//         <View style={styles.overlay}>
//           <View style={styles.content}>
//             <Image
//               source={require('../assests/images/mainlogo.png')}
//               style={styles.logo}
//             />
//             <Text style={styles.title}>Enter your Phone Number</Text>

//             <View style={styles.inputContainer}>
//               <View style={styles.iconContainer}>
//                 <Ionicons name="call" size={width * 0.06} color="#333" />
//               </View>
//               <TextInput
//                 style={styles.input}
//                 keyboardType="phone-pad"
//                 maxLength={10}
//                 value={mobileNumber}
//                 onChangeText={(text) => {
//                   setMobileNumber(text);
//                   setPhoneError('');
//                 }}
//                 placeholder="Enter Phone Number"
//                 placeholderTextColor="#999"
//                 editable={!isLoading}
//               />
//             </View>

//             {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}

//             <TouchableOpacity 
//               onPress={handleLogin} 
//               disabled={isLoading}
//               style={[styles.button, isLoading && styles.buttonDisabled]}
//             >
//               <Animated.View style={[styles.buttonContent, { opacity: fadeAnim }]}>
//                 <Text style={styles.buttonText}>
//                   {isLoading ? 'Generating OTP...' : 'Send OTP'}
//                 </Text>
//               </Animated.View>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </KeyboardAvoidingView>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#e6f5ec',
//   },
//   container: {
//     flex: 1,
//   },
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(255, 255, 255, 0.45)',
//     justifyContent: 'center',
//     padding: width * 0.05,
//   },
//   content: {
//     alignItems: 'center',
//   },
//   logo: {
//     width: width * 0.8,
//     height: height * 0.2,
//     resizeMode: 'contain',
//     marginBottom: height * 0.02,
//   },
//   title: {
//     fontSize: width * 0.06,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: height * 0.04,
//     textAlign: 'center',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f0f0f0',
//     borderRadius: 8,
//     marginBottom: height * 0.015,
//     width: '95%',
//     height: height * 0.072,
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
//   iconContainer: {
//     width: width * 0.15,
//     height: '100%',
//     backgroundColor: '#f0f0f0',
//     borderRightWidth: 1,
//     borderColor: '#ccc',
//     borderTopLeftRadius: 8,
//     borderBottomLeftRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   input: {
//     flex: 1,
//     padding: width * 0.04,
//     fontSize: width * 0.045,
//     color: '#333',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: width * 0.035,
//     marginBottom: height * 0.015,
//     alignSelf: 'flex-start',
//     marginLeft: width * 0.025,
//   },
//   button: {
//     backgroundColor: '#4CAF50',
//     paddingVertical: height * 0.02,
//     borderRadius: 8,
//     width: width * 0.8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   buttonDisabled: {
//     backgroundColor: '#cccccc',
//     shadowColor: '#cccccc',
//   },
//   buttonContent: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: width * 0.045,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });









// ------------------------------------------------------------------------











import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Image,
  Animated,
  ImageBackground,
  Dimensions,
  Alert,
  ToastAndroid,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../Contexts/UserContext';

const { width, height } = Dimensions.get('window');

export default function LoginDelivery() {
  const navigation = useNavigation();
  const [mobileNumber, setMobileNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fadeAnim = new Animated.Value(1);
  const { setUser } = useContext(UserContext);

  // Function to show toast message
  const showToast = (message) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert('Info', message);
    }
  };

  // Function to fetch user details (firstName, lastName, gender)
  const fetchUserDetails = async (phoneNumber) => {
    try {
      const response = await axios.get(`http://10.0.2.2:5220/api/Registration/User/UserDetail/${phoneNumber}`);
      console.log('User Details API response:', response.data);

      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        const userDetails = response.data[0];
        return {
          firstName: userDetails.firstName || null,
          lastName: userDetails.lastName || null,
          gender: userDetails.gender || null,
        };
      } else if (response.data && !Array.isArray(response.data)) {
        // In case API returns single object instead of array
        return {
          firstName: response.data.firstName || null,
          lastName: response.data.lastName || null,
          gender: response.data.gender || null,
        };
      }

      // Return empty details if no data found
      return {
        firstName: null,
        lastName: null,
        gender: null,
      };
    } catch (error) {
      console.error('Fetch User Details Error:', error);
      console.error('User Details Error Response:', error.response?.data);
      
      // Return empty details on error
      return {
        firstName: null,
        lastName: null,
        gender: null,
      };
    }
  };

  // Function to generate OTP
  const generateOtp = async (phoneNumber) => {
    try {
      const response = await axios.post(`http://10.0.2.2:5220/api/Registration/GenerateOtp/${phoneNumber}`, {}, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data) {
        showToast(response.data.message || 'OTP generated successfully');
        console.log('OTP Generated:', response.data.otp); // For debugging - remove in production
        console.log('OTP Expiry:', response.data.expiry);
        
        // Return the OTP data for storing in user context
        return {
          success: true,
          generatedOTP: response.data.otp,
          otpExpiryTime: response.data.expiry
        };
      }
      return { success: false };
    } catch (error) {
      console.error('Generate OTP Error:', error);
      console.error('Generate OTP Error Response:', error.response?.data);
      
      // Handle specific error messages from server
      if (error.response && error.response.data && error.response.data.message) {
        showToast(error.response.data.message);
      } else {
        showToast('Failed to generate OTP. Please try again.');
      }
      return { success: false };
    }
  };

  const handleLogin = async () => {
    Keyboard.dismiss();

    if (mobileNumber.length !== 10 || !/^\d{10}$/.test(mobileNumber)) {
      setPhoneError('Please enter a valid 10-digit mobile number');
      return;
    }

    setPhoneError('');
    setIsLoading(true);

    try {
      // Check if user exists
      const response = await axios.get(`http://10.0.2.2:5220/api/Registration/User/${mobileNumber}`);
      console.log('Login API response:', response.data);

      let isExistingUser = false;
      let userId = null;
      let isActive = false;

      // Determine if user exists
      if (Array.isArray(response.data) && response.data.length > 0) {
        const data = response.data[0];
        if (data && data.result === 1) {
          isExistingUser = true;
          userId = parseInt(data.userId);
          isActive = data.isActive ?? false;
        }
      } else if (response.data && !Array.isArray(response.data)) {
        const data = response.data;
        if (data.result === 1) {
          isExistingUser = true;
          userId = parseInt(data.userId);
          isActive = data.isActive ?? false;
        }
      }

      // Fetch user details (firstName, lastName, gender) - for both existing and new users
      const userDetails = await fetchUserDetails(mobileNumber);
      console.log('Fetched user details:', userDetails);

      // Generate OTP
      const otpResult = await generateOtp(mobileNumber);
      
      if (otpResult.success) {
        // Set user context with OTP data and user details
        const userContext = {
          userId: userId,
          phoneNumber: mobileNumber,
          isExistingUser: isExistingUser,
          isActive: isActive,
          generatedOTP: otpResult.generatedOTP, // Store generated OTP
          otpExpiryTime: otpResult.otpExpiryTime, // Store expiry time
          firstName: userDetails.firstName, // Store firstName
          lastName: userDetails.lastName, // Store lastName
          gender: userDetails.gender, // Store gender
        };

        setUser(userContext);
        console.log('Set user context:', userContext);

        // Navigate to OTP verification screen
        setTimeout(() => {
          navigation.navigate('OtpVerification', {
            isExistingUser: isExistingUser,
            isActive: isActive,
          });
        }, 100);
      } else {
        throw new Error('Failed to generate OTP');
      }

    } catch (error) {
      console.error('Login API error:', error.message);
      
      if (error.response && error.response.data && error.response.data.message) {
        Alert.alert('Login Error', error.response.data.message);
      } else {
        Alert.alert('Login Error', 'Failed to process login. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.overlay}>
          <View style={styles.content}>
            <Image
              source={require('../assests/images/mainlogo.png')}
              style={styles.logo}
            />
            <Text style={styles.title}>Enter your Phone Number</Text>

            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Ionicons name="call" size={width * 0.06} color="#333" />
              </View>
              <TextInput
                style={styles.input}
                keyboardType="phone-pad"
                maxLength={10}
                value={mobileNumber}
                onChangeText={(text) => {
                  setMobileNumber(text);
                  setPhoneError('');
                }}
                placeholder="Enter Phone Number"
                placeholderTextColor="#999"
                editable={!isLoading}
              />
            </View>

            {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}

            <TouchableOpacity 
              onPress={handleLogin} 
              disabled={isLoading}
              style={[styles.button, isLoading && styles.buttonDisabled]}
            >
              <Animated.View style={[styles.buttonContent, { opacity: fadeAnim }]}>
                <Text style={styles.buttonText}>
                  {isLoading ? 'Generating OTP...' : 'Send OTP'}
                </Text>
              </Animated.View>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#e6f5ec',
  },
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    justifyContent: 'center',
    padding: width * 0.05,
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    width: width * 0.8,
    height: height * 0.2,
    resizeMode: 'contain',
    marginBottom: height * 0.02,
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: height * 0.04,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: height * 0.015,
    width: '95%',
    height: height * 0.072,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  iconContainer: {
    width: width * 0.15,
    height: '100%',
    backgroundColor: '#f0f0f0',
    borderRightWidth: 1,
    borderColor: '#ccc',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: width * 0.04,
    fontSize: width * 0.045,
    color: '#333',
  },
  errorText: {
    color: 'red',
    fontSize: width * 0.035,
    marginBottom: height * 0.015,
    alignSelf: 'flex-start',
    marginLeft: width * 0.025,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: height * 0.02,
    borderRadius: 8,
    width: width * 0.8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
    shadowColor: '#cccccc',
  },
  buttonContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: width * 0.045,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});