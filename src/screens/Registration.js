// import { useContext, useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
//   Image,
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { useNavigation } from '@react-navigation/native';
// import { UserContext } from '../Contexts/UserContext';
// import { useAddress } from '../Contexts/AddressContext';

// export default function Registration() {
//   const navigation = useNavigation();
//   const [name, setName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [gender, setGender] = useState('');
//   const { setUser } = useContext(UserContext);
//   const {setTempFarmerName}=useAddress();
//   const handleContinue = () => {
//     if (!name.trim() || !lastName.trim() || !gender) {
//       alert('Please enter your Full name and select gender !!');
//       return;
//     }
//     setUser(prev => ({
//       ...prev,
//       firstName: name,
//       lastName: lastName,
//       gender,
//     }));
//     setTempFarmerName(name);
//     navigation.navigate('Location');
//   };


//   const getAlphabetValid=(text)=>{
//     return text.replace(/[^A-Za-z]/g, '')
//   }
//   return (
//     <View style={styles.container}>
//       <View style={styles.logoContainer}>
//         <Image
//           source={require('../assests/images/mainlogo.png')}
//           style={styles.logoDesign}
//         />
//         <Text style={styles.heading}>Registration Page</Text>
//       </View>

//       <TextInput
//         style={styles.input}
//         placeholder="Enter your First Name"
//         placeholderTextColor="grey"
//         value={name}
//         onChangeText={(text)=>setName(getAlphabetValid(text))}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Enter your Last Name"
//         value={lastName}
//         onChangeText={(text)=>setLastName(getAlphabetValid(text))}
//         placeholderTextColor="#999"
//       />

//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={gender}
//           onValueChange={(itemValue) => setGender(itemValue)}
//           style={styles.picker}
//           dropdownIconColor="black"
//         >
//           <Picker.Item label="Select Gender" value="" color="grey" />
//           <Picker.Item label="Male" value="male" color="black" />
//           <Picker.Item label="Female" value="female" color="black" />
//           <Picker.Item label="Other" value="other" color="black" />
//         </Picker>
//       </View>

//       <TouchableOpacity style={styles.button} onPress={handleContinue}>
//         <Text style={styles.buttonText}>Continue</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const { width,height } = Dimensions.get('window');
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: 'white',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'left',
//   },
//   input: {
//   height: 50,
//   borderWidth: 1,
//   borderColor: '#ccc',
//   borderRadius: 10,
//   fontSize: 16,
//   paddingHorizontal: 15,
//   marginBottom: 20,
//   backgroundColor: '#f9f9f9',
// },
//   pickerContainer: {
//   borderWidth: 1,
//   borderColor: '#ccc',
//   borderRadius: 10,
//   marginBottom: 40,
//   overflow: 'hidden',
//   backgroundColor: '#f9f9f9',
// },

//   pickerContainer: {
//   borderWidth: 1,
//   borderColor: '#ccc',
//   borderRadius: 10,
//   marginBottom: 40,
//   overflow: 'hidden',
//   backgroundColor: '#f9f9f9',
// },
// picker: {
//   height: 50,
//   width: '100%',
  
// },

//   button: {
//     backgroundColor: '#4CAF50',
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   logoContainer: {
//     // width: width * 0.5,
//     // height: height * 0.25,
//     alignItems: 'center',
//     justifyContent:'center',
//     marginTop: 20,
//     marginBottom:30
//     // backgroundColor:'red'
//   },

//   logoDesign: {
//     height: width * 0.45,
//     resizeMode: 'contain',
//     // backgroundColor:'red'

//   },
//   heading: {
//     fontSize: 22,
//     marginTop: 10,
//     color: '#333',
//     fontWeight: 'bold',
//   }
// });




// import React, { useState, useContext } from 'react';
// import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
// import axios from 'axios';
// import { UserContext } from '../Contexts/UserContext';
// import { useNavigation } from '@react-navigation/native';

// export default function Registration() {
//   const { user, setUser } = useContext(UserContext);
//   const navigation = useNavigation();
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [gender, setGender] = useState('');

//   const handleSubmit = async () => {
//     if (!firstName || !lastName || !gender) {
//       return Alert.alert('All fields are required');
//     }

//     try {
//       const payload = {
//         firstName,
//         lastName,
//         gender,
//         mobileNumber: user.phoneNumber,
//       };

//       await axios.post('http://10.0.2.2:5220/api/Registration/User/InsertDetails', payload);
//       const response = await axios.get(`http://10.0.2.2:5220/api/Registration/User/${user.phoneNumber}`);
//       const userId = response.data.userId;
//       console.log('User ID in registration:', response.data.userId);

//       setUser({ ...user, firstName, lastName, gender});
//       navigation.replace('Location');
//     } catch (error) {
//       Alert.alert('Registration failed', error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>First Name</Text>
//       <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} />
//       <Text style={styles.label}>Last Name</Text>
//       <TextInput style={styles.input} value={lastName} onChangeText={setLastName} />
//       <Text style={styles.label}>Gender</Text>
//       <TextInput style={styles.input} value={gender} onChangeText={setGender} />
//       <Button title="Submit" onPress={handleSubmit} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, justifyContent: 'center' },
//   input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 16 },
//   label: { marginBottom: 8 },
// });








// import React, { useState, useContext } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView
// } from 'react-native';
// import DropDownPicker from 'react-native-dropdown-picker';
// import { UserContext } from '../Contexts/UserContext';
// import { useNavigation } from '@react-navigation/native';

// const RegistrationScreen = () => {
//   const { setUser } = useContext(UserContext);
//   const navigation = useNavigation();

//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');

//   const [genderOpen, setGenderOpen] = useState(false);
//   const [gender, setGender] = useState(null);
//   const [genderItems, setGenderItems] = useState([
//     { label: 'Male', value: 'Male' },
//     { label: 'Female', value: 'Female' },
//     { label: 'Other', value: 'Other' },
//   ]);

//   const handleRegister = () => {
//     if (!firstName.trim() || !lastName.trim() || !gender) {
//       Alert.alert('Validation Error', 'Please fill all the fields.');
//       return;
//     }

//     const userData = {
//       userId: Date.now(), // Simulate userId. In real use, get from API.
//       firstName: firstName.trim(),
//       lastName: lastName.trim(),
//       gender: gender,
//       phoneNumber: '1234567890', // Replace with actual phone if needed
//       isActive: true,
//       isExistingUser: true,
//     };

//     console.log('Registering user:', userData);
//     setUser(userData);

//     Alert.alert('Success', 'Registration complete', [
//       { text: 'OK', onPress: () => navigation.replace('Location') },
//     ]);
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//       style={{ flex: 1 }}
//     >
//       <ScrollView contentContainerStyle={styles.container}>
//         <Text style={styles.title}>User Registration</Text>

//         <Text style={styles.label}>First Name</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter first name"
//           value={firstName}
//           onChangeText={setFirstName}
//         />

//         <Text style={styles.label}>Last Name</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter last name"
//           value={lastName}
//           onChangeText={setLastName}
//         />

//         <Text style={styles.label}>Gender</Text>
//         <DropDownPicker
//           open={genderOpen}
//           value={gender}
//           items={genderItems}
//           setOpen={setGenderOpen}
//           setValue={setGender}
//           setItems={setGenderItems}
//           placeholder="Select Gender"
//           style={styles.dropdown}
//           listMode="MODAL"
//           zIndex={1000}
//           zIndexInverse={1000}
//         />

//         <TouchableOpacity style={styles.button} onPress={handleRegister}>
//           <Text style={styles.buttonText}>Register</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// export default RegistrationScreen;

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     paddingBottom: 40,
//     backgroundColor: '#fff',
//     flexGrow: 1,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//     color: '#333',
//   },
//   label: {
//     marginTop: 12,
//     marginBottom: 4,
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#333',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 6,
//     padding: 10,
//     marginBottom: 10,
//     fontSize: 16,
//   },
//   dropdown: {
//     marginBottom: 10,
//     borderColor: '#ccc',
//   },
//   button: {
//     backgroundColor: '#007AFF',
//     paddingVertical: 14,
//     borderRadius: 6,
//     marginTop: 20,
//   },
//   buttonText: {
//     textAlign: 'center',
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 16,
//   },
// });






// import React, { useState, useContext } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
//   Image,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import axios from 'axios';
// import { UserContext } from '../Contexts/UserContext';
// import { useNavigation } from '@react-navigation/native';

// const { width } = Dimensions.get('window');

// const RegistrationScreen = () => {
//   const { user, setUser } = useContext(UserContext);
//   const navigation = useNavigation();

//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [gender, setGender] = useState('');

//   const getAlphabetValid = (text) => text.replace(/[^A-Za-z]/g, '');

//   const handleRegister = async () => {
//     if (!firstName.trim() || !lastName.trim() || !gender) {
//       Alert.alert('Validation Error', 'Please fill all the fields.');
//       return;
//     }

//     try {
//       const payload = {
//         firstName: firstName.trim(),
//         lastName: lastName.trim(),
//         gender,
//         mobileNumber: user.phoneNumber,
//       };

//       // Insert user details into backend
//       await axios.post('http://10.0.2.2:5220/api/Registration/User/InsertDetails', payload);

//       // Get userId back from backend using phone number
//       const response = await axios.get(
//         `http://10.0.2.2:5220/api/Registration/User/${user.phoneNumber}`
//       );
//       const userId = response.data.userId;

//       const updatedUser = {
//         ...user,
//         userId,
//         firstName: payload.firstName,
//         lastName: payload.lastName,
//         gender,
//         isActive: true,
//         isExistingUser: true,
//       };

//       setUser(updatedUser);

//       Alert.alert('Success', 'Registration complete', [
//         { text: 'OK', onPress: () => navigation.replace('Location') },
//       ]);
//     } catch (error) {
//       console.error('Registration error:', error);
//       Alert.alert('Registration failed', error.message || 'Something went wrong');
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//       style={{ flex: 1 }}
//     >
//       <ScrollView contentContainerStyle={styles.container}>
//         <View style={styles.logoContainer}>
//           <Image
//             source={require('../assests/images/mainlogo.png')}
//             style={styles.logoDesign}
//           />
//           <Text style={styles.heading}>Registration Page</Text>
//         </View>

//         {/* First Name */}
//         <View style={styles.inputContainer}>
//           <Icon name="user" size={20} color="#888" style={styles.icon} />
//           <TextInput
//             style={styles.input}
//             placeholder="Enter your First Name"
//             placeholderTextColor="grey"
//             value={firstName}
//             onChangeText={(text) => setFirstName(getAlphabetValid(text))}
//           />
//         </View>

//         {/* Last Name */}
//         <View style={styles.inputContainer}>
//           <Icon name="user" size={20} color="#888" style={styles.icon} />
//           <TextInput
//             style={styles.input}
//             placeholder="Enter your Last Name"
//             placeholderTextColor="grey"
//             value={lastName}
//             onChangeText={(text) => setLastName(getAlphabetValid(text))}
//           />
//         </View>

//         {/* Gender Picker */}
//         <View style={styles.inputContainer}>
//           <Icon name="venus-mars" size={20} color="#888" style={styles.icon} />
//           <View style={styles.pickerWrapper}>
//             <Picker
//               selectedValue={gender}
//               onValueChange={(itemValue) => setGender(itemValue)}
//               style={styles.picker}
//               dropdownIconColor="black"
//             >
//               <Picker.Item label="Select Gender" value="" color="grey" />
//               <Picker.Item label="Male" value="Male" color="black" />
//               <Picker.Item label="Female" value="Female" color="black" />
//               <Picker.Item label="Other" value="Other" color="black" />
//             </Picker>
//           </View>
//         </View>

//         <TouchableOpacity style={styles.button} onPress={handleRegister}>
//           <Text style={styles.buttonText}>Continue</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// export default RegistrationScreen;

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: 'white',
//     flexGrow: 1,
//     justifyContent: 'center',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     marginBottom: 20,
//     backgroundColor: '#f9f9f9',
//   },
//   icon: {
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     height: 50,
//     fontSize: 16,
//     color: '#333',
//   },
//   pickerWrapper: {
//     flex: 1,
//   },
//   picker: {
//     height: 50,
//     color: '#333',
//   },
//   button: {
//     backgroundColor: '#4CAF50',
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   logoContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 20,
//     marginBottom: 30,
//   },
//   logoDesign: {
//     height: width * 0.45,
//     resizeMode: 'contain',
//   },
//   heading: {
//     fontSize: 22,
//     marginTop: 10,
//     color: '#333',
//     fontWeight: 'bold',
//   },
// });








// --------------------------------------------
import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import { UserContext } from '../Contexts/UserContext';
import { useNavigation } from '@react-navigation/native';

export default function Registration() {
  const { user, setUser } = useContext(UserContext);
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');

  const handleSubmit = async () => {
    if (!firstName || !lastName || !gender) {
      return Alert.alert('Error', 'All fields are required');
    }

    try {
      const payload = {
        firstName,
        lastName,
        gender,
        mobileNumber: user.phoneNumber,
      };

      console.log('Registration payload:', payload);

      // Submit registration details
      await axios.post('http://10.0.2.2:5220/api/Registration/User/InsertDetails', payload);
      
      // Fetch updated user data to get the userId
      const response = await axios.get(`http://10.0.2.2:5220/api/Registration/User/${user.phoneNumber}`);
      console.log('User data after registration:', response.data);
      
      // Handle the response properly - it might be an array
      let userData;
      let userId;
      
      if (Array.isArray(response.data) && response.data.length > 0) {
        userData = response.data[0];
        userId = userData?.userId;
      } else if (response.data && !Array.isArray(response.data)) {
        userData = response.data;
        userId = userData?.userId;
      }
      
      console.log('Extracted userId:', userId);

      if (!userId) {
        console.error('User ID not received after registration. Full response:', response.data);
        throw new Error('User ID not received after registration');
      }

      console.log('Successfully extracted userId:', userId);

      // Update user context with all details including userId
      const updatedUser = {
        ...user,
        firstName,
        lastName,
        gender,
        userId: parseInt(userId), // Ensure it's stored as integer
        isExistingUser: true, // Now they're registered
      };

      console.log('Updated user context will be:', updatedUser);
      setUser(updatedUser);

      // Verify the context was updated
      setTimeout(() => {
        console.log('Context should be updated now');
      }, 200);

      Alert.alert('Success', 'Registration completed successfully!', [
        {
          text: 'OK',
          onPress: () => {
            // Longer delay to ensure context is updated
            setTimeout(() => {
              navigation.replace('LocationManual');
            }, 300);
          }
        }
      ]);

    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Registration failed', error.message || 'Please try again');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complete Your Registration</Text>
      
      <Text style={styles.label}>First Name</Text>
      <TextInput 
        style={styles.input} 
        value={firstName} 
        onChangeText={setFirstName}
        placeholder="Enter your first name"
      />
      
      <Text style={styles.label}>Last Name</Text>
      <TextInput 
        style={styles.input} 
        value={lastName} 
        onChangeText={setLastName}
        placeholder="Enter your last name"
      />
      
      <Text style={styles.label}>Gender</Text>
      <TextInput 
        style={styles.input} 
        value={gender} 
        onChangeText={setGender}
        placeholder="Enter your gender"
      />
      
      <Button title="Complete Registration" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 12, 
    marginBottom: 16,
    borderRadius: 6,
    fontSize: 16,
  },
  label: { 
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});