




// import React, { useEffect, useState, useContext } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import DropDownPicker from 'react-native-dropdown-picker';
// import axios from 'axios';
// import { UserContext } from '../Contexts/UserContext';
// import { useLocation } from '../Contexts/LocationContext';
// import { useNavigation } from '@react-navigation/native';

// const LocationManual = () => {
//   const { user } = useContext(UserContext);
//   const { saveAddressLocally } = useLocation(); // Only get the local save function
//   const navigation = useNavigation();
  
//   console.log('user in LocationManual:', user);
//   const userId = user?.userId;
//   console.log('LocationManual userId:', userId);

//   const [states, setStates] = useState([]);
//   const [districts, setDistricts] = useState([]);
//   const [blocks, setBlocks] = useState([]);

//   const [selectedState, setSelectedState] = useState(null);
//   const [selectedDistrict, setSelectedDistrict] = useState(null);
//   const [selectedBlock, setSelectedBlock] = useState(null);

//   const [village, setVillage] = useState('');
//   const [landmark, setLandmark] = useState('');
//   const [pincode, setPincode] = useState('');

//   // Store readable names for context
//   const [selectedStateName, setSelectedStateName] = useState('');
//   const [selectedDistrictName, setSelectedDistrictName] = useState('');
//   const [selectedBlockName, setSelectedBlockName] = useState('');

//   // Dropdown UI State
//   const [openState, setOpenState] = useState(false);
//   const [openDistrict, setOpenDistrict] = useState(false);
//   const [openBlock, setOpenBlock] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchStates();
//   }, []);

//   // Check if user has valid userId, redirect to login if not
//   useEffect(() => {
//     if (!user?.userId) {
//       console.warn('UserId not found. Redirecting to login.');
//       // navigation.replace('LoginDelivery');
//     }
//   }, [user]);

//   const fetchStates = async () => {
//     try {
//       const res = await axios.get('http://10.0.2.2:5220/api/Location/states');
//       const stateItems = res.data.map((item) => ({
//         label: item.stateName,
//         value: item.stateId,
//       }));
//       setStates(stateItems);
//     } catch (error) {
//       console.log('Error fetching states:', error);
//       Alert.alert('Error', 'Failed to load states. Please try again.');
//     }
//   };

//   const fetchDistricts = async (stateId) => {
//     try {
//       const res = await axios.get(`http://10.0.2.2:5220/api/Location/districts/${stateId}`);
//       const districtItems = res.data.map((item) => ({
//         label: item.districtName,
//         value: item.districtId,
//       }));
//       setDistricts(districtItems);
//     } catch (error) {
//       console.log('Error fetching districts:', error);
//       Alert.alert('Error', 'Failed to load districts. Please try again.');
//     }
//   };

//   const fetchBlocks = async (districtId) => {
//     try {
//       const res = await axios.get(`http://10.0.2.2:5220/api/Location/blocks/${districtId}`);
//       const blockItems = res.data.map((item) => ({
//         label: item.blockName,
//         value: item.blockId,
//       }));
//       setBlocks(blockItems);
//     } catch (error) {
//       console.log('Error fetching blocks:', error);
//       Alert.alert('Error', 'Failed to load blocks. Please try again.');
//     }
//   };

//   const handleStateChange = (callback) => {
//     const value = callback(selectedState);
//     setSelectedState(value);
//     setSelectedDistrict(null);
//     setSelectedBlock(null);
//     setDistricts([]);
//     setBlocks([]);
    
//     // Store state name for context
//     const stateName = states.find(state => state.value === value)?.label || '';
//     setSelectedStateName(stateName);
//     setSelectedDistrictName('');
//     setSelectedBlockName('');
    
//     if (value) {
//       fetchDistricts(value);
//     }
//   };

//   const handleDistrictChange = (callback) => {
//     const value = callback(selectedDistrict);
//     setSelectedDistrict(value);
//     setSelectedBlock(null);
//     setBlocks([]);
    
//     // Store district name for context
//     const districtName = districts.find(district => district.value === value)?.label || '';
//     setSelectedDistrictName(districtName);
//     setSelectedBlockName('');
    
//     if (value) {
//       fetchBlocks(value);
//     }
//   };
// const handleBlockChange = (callback) => {
//   const value = callback(selectedBlock);
//   setSelectedBlock(value);
  
//   // Store block name for context
//   const blockName = blocks.find(block => block.value === value)?.label || '';
//   setSelectedBlockName(blockName);
//   console.log('Block selected:', value, 'Block name:', blockName); // Debug log
// };

//   const handleSubmit = async () => {
//     // Validation
//     if (!selectedState || !selectedDistrict || !selectedBlock || !village.trim() || !pincode.trim()) {
//       Alert.alert('Error', 'Please fill all required fields');
//       return;
//     }

//     // Validate pincode
//     if (pincode.length !== 6 || isNaN(pincode)) {
//       Alert.alert('Error', 'Please enter a valid 6-digit pincode');
//       return;
//     }

//     // Ensure userId exists
//     if (!user?.userId) {
//       Alert.alert('Error', 'User ID not found. Please login again.');
//       // navigation.replace('LoginDelivery');
//       return;
//     }

//     setLoading(true);

//     try {
//       // Prepare address data for both API and context
//       const addressData = {
//         stateID: selectedState,
//         districtID: selectedDistrict,
//         blockID: selectedBlock,
//         village: village.trim(),
//         nearestLandMark: landmark.trim() || '',
//         pinCode: pincode,
//         // Include readable names for display purposes
//         stateName: selectedStateName,
//         districtName: selectedDistrictName,
//         blockName: selectedBlockName,
//       };

//       // Prepare the payload for API call
//       const apiPayload = {
//         userId: userId,
//         stateID: selectedState,
//         districtID: selectedDistrict,
//         blockID: selectedBlock,
//         village: village.trim(),
//         nearestLandMark: landmark.trim() || '',
//         pinCode: pincode,
//       };

//       console.log('Submitting address to API:', apiPayload);

//       // Step 1: Save to database via API
//       const response = await axios.post('http://10.0.2.2:5220/api/Registration/User/InsertUserAddress', apiPayload);
      
//       console.log('API Response:', response.data);

//       if (response.data) {
//         // Step 2: Save to LocationContext for global access (only if API call succeeds)
//         const contextResult = saveAddressLocally(userId, addressData);
        
//         if (contextResult.success) {
//           console.log('Address saved to both database and context successfully');
          
//           Alert.alert('Success', 'Address saved successfully!', [
//             {
//               text: 'OK',
//               onPress: () => {
//                 // Navigate to main app after success
//                 navigation.navigate('MainApp');
//               }
//             }
//           ]);
//         } else {
//           console.warn('API succeeded but context save failed:', contextResult.error);
//           // Still show success since API call worked
//           Alert.alert('Success', 'Address saved successfully!', [
//             {
//               text: 'OK',
//               onPress: () => {
//                 navigation.navigate('MainApp');
//               }
//             }
//           ]);
//         }
//       } else {
//         Alert.alert('Error', 'Failed to save address. Please try again.');
//       }
      
//     } catch (error) {
//       console.error('API submission failed:', error);
      
//       // Handle different types of errors
//       let errorMessage = 'Failed to save address. Please try again.';
      
//       if (error.response) {
//         // Server responded with error status
//         console.error('Error Response:', error.response.data);
//         errorMessage = error.response.data?.message || error.response.data || errorMessage;
//       } else if (error.request) {
//         // Request was made but no response received
//         console.error('Network Error:', error.request);
//         errorMessage = 'Network error. Please check your connection.';
//       } else {
//         // Something else happened
//         console.error('Error Message:', error.message);
//         errorMessage = error.message;
//       }
      
//       Alert.alert('Error', errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//       style={{ flex: 1 }}
//     >
//       <ScrollView
//         contentContainerStyle={styles.container}
//         keyboardShouldPersistTaps="handled"
//         nestedScrollEnabled
//       >
//         <Text style={styles.title}>Add Your Address</Text>
        
//         <Text style={styles.label}>State *</Text>
//         <DropDownPicker
//           open={openState}
//           value={selectedState}
//           items={states}
//           setOpen={setOpenState}
//           setValue={handleStateChange}
//           setItems={setStates}
//           placeholder="Select State"
//           style={styles.dropdown}
//           listMode="MODAL"
//           zIndex={3000}
//           zIndexInverse={1000}
//         />

//         <Text style={styles.label}>District *</Text>
//         <DropDownPicker
//           open={openDistrict}
//           value={selectedDistrict}
//           items={districts}
//           setOpen={setOpenDistrict}
//           setValue={handleDistrictChange}
//           setItems={setDistricts}
//           placeholder="Select District"
//           style={styles.dropdown}
//           listMode="MODAL"
//           zIndex={2000}
//           zIndexInverse={2000}
//           disabled={!selectedState}
//         />

//         <Text style={styles.label}>Block *</Text>
//         <DropDownPicker
//           open={openBlock}
//           value={selectedBlock}
//           items={blocks}
//           setOpen={setOpenBlock}
//           setValue={handleBlockChange}
//           setItems={setBlocks}
//           placeholder="Select Block"
//           style={styles.dropdown}
//           listMode="MODAL"
//           zIndex={1000}
//           zIndexInverse={3000}
//           disabled={!selectedDistrict}
//         />

//         <Text style={styles.label}>Village *</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter Village"
//           value={village}
//           onChangeText={setVillage}
//         />

//         <Text style={styles.label}>Landmark</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter Landmark (Optional)"
//           value={landmark}
//           onChangeText={setLandmark}
//         />

//         <Text style={styles.label}>Pincode *</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter 6-digit Pincode"
//           value={pincode}
//           onChangeText={setPincode}
//           keyboardType="number-pad"
//           maxLength={6}
//         />

//         <TouchableOpacity 
//           style={[styles.button, loading && styles.buttonDisabled]} 
//           onPress={handleSubmit}
//           disabled={loading}
//         >
//           <Text style={styles.buttonText}>
//             {loading ? 'Saving...' : 'Submit Address'}
//           </Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// export default LocationManual;

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     paddingBottom: 40,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//     color: '#333',
//   },
//   label: {
//     marginBottom: 4,
//     marginTop: 12,
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#333',
//   },
//   dropdown: {
//     marginBottom: 10,
//     borderColor: '#ccc',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 6,
//     padding: 10,
//     marginBottom: 10,
//     fontSize: 16,
//   },
//   button: {
//     backgroundColor: '#007AFF',
//     paddingVertical: 14,
//     borderRadius: 6,
//     marginTop: 20,
//   },
//   buttonDisabled: {
//     backgroundColor: '#ccc',
//   },
//   buttonText: {
//     textAlign: 'center',
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 16,
//   },
// });









import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import { UserContext } from '../Contexts/UserContext';
import { useLocation } from '../Contexts/LocationContext';
import { useNavigation } from '@react-navigation/native';

const LocationManual = () => {
  const { user } = useContext(UserContext);
  const { saveAddressLocally } = useLocation(); // Only get the local save function
  const navigation = useNavigation();
  
  console.log('user in LocationManual:', user);
  const userId = user?.userId;
  console.log('LocationManual userId:', userId);

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [blocks, setBlocks] = useState([]);

  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedBlock, setSelectedBlock] = useState(null);

  const [village, setVillage] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pincode, setPincode] = useState('');

  // Store readable names for context
  const [selectedStateName, setSelectedStateName] = useState('');
  const [selectedDistrictName, setSelectedDistrictName] = useState('');
  const [selectedBlockName, setSelectedBlockName] = useState('');

  // Dropdown UI State
  const [openState, setOpenState] = useState(false);
  const [openDistrict, setOpenDistrict] = useState(false);
  const [openBlock, setOpenBlock] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStates();
  }, []);

  // Check if user has valid userId, redirect to login if not
  useEffect(() => {
    if (!user?.userId) {
      console.warn('UserId not found. Redirecting to login.');
      // navigation.replace('LoginDelivery');
    }
  }, [user]);

  const fetchStates = async () => {
    try {
      const res = await axios.get('http://10.0.2.2:5220/api/Location/states');
      console.log('Raw states response:', res.data);
      console.log('First state item keys:', res.data[0] ? Object.keys(res.data[0]) : 'No data');
      
      // Try multiple possible field names for stateId
      const stateItems = res.data.map((item) => {
        const stateId = item.stateId || item.stateID || item.id || item.StateId || item.StateID;
        const stateName = item.stateName || item.StateName || item.name;
        console.log(`State: ${stateName} -> ID: ${stateId}`);
        
        return {
          label: stateName,
          value: stateId,
        };
      });
      console.log('Processed state items:', stateItems);
      setStates(stateItems);
    } catch (error) {
      console.log('Error fetching states:', error);
      Alert.alert('Error', 'Failed to load states. Please try again.');
    }
  };

  const fetchDistricts = async (stateId) => {
    try {
      console.log('Fetching districts for stateId:', stateId);
      const res = await axios.get(`http://10.0.2.2:5220/api/Location/districts/${stateId}`);
      console.log('Raw districts response:', res.data);
      console.log('First district item keys:', res.data[0] ? Object.keys(res.data[0]) : 'No data');
      
      // Try multiple possible field names for districtId
      const districtItems = res.data.map((item) => {
        const districtId = item.districtId || item.districtID || item.id || item.DistrictId || item.DistrictID;
        const districtName = item.districtName || item.DistrictName || item.name;
        console.log(`District: ${districtName} -> ID: ${districtId}`);
        
        return {
          label: districtName,
          value: districtId,
        };
      });
      console.log('Processed district items:', districtItems);
      setDistricts(districtItems);
    } catch (error) {
      console.log('Error fetching districts:', error);
      Alert.alert('Error', 'Failed to load districts. Please try again.');
    }
  };

  const fetchBlocks = async (districtId) => {
    try {
      console.log('Fetching blocks for districtId:', districtId);
      const res = await axios.get(`http://10.0.2.2:5220/api/Location/blocks/${districtId}`);
      console.log('Raw blocks response:', res.data);
      console.log('First block item keys:', res.data[0] ? Object.keys(res.data[0]) : 'No data');
      
      // Try multiple possible field names for blockId
      const blockItems = res.data.map((item) => {
        const blockId = item.blockId || item.blockID || item.id || item.BlockId || item.BlockID;
        const blockName = item.blockName || item.BlockName || item.name;
        console.log(`Block: ${blockName} -> ID: ${blockId}`);
        
        return {
          label: blockName,
          value: blockId,
        };
      });
      console.log('Processed block items:', blockItems);
      setBlocks(blockItems);
    } catch (error) {
      console.log('Error fetching blocks:', error);
      Alert.alert('Error', 'Failed to load blocks. Please try again.');
    }
  };



  const handleSubmit = async () => {
    // Debug log current selections before validation
    console.log('Current selections before submit:', {
      selectedState,
      selectedDistrict,
      selectedBlock,
      selectedStateName,
      selectedDistrictName,
      selectedBlockName
    });

    // Validation
    if (!selectedState || !selectedDistrict || !selectedBlock || !village.trim() || !pincode.trim()) {
      Alert.alert('Error', 'Please fill all required fields');
      console.log('Validation failed:', {
        hasState: !!selectedState,
        hasDistrict: !!selectedDistrict,
        hasBlock: !!selectedBlock,
        hasVillage: !!village.trim(),
        hasPincode: !!pincode.trim()
      });
      return;
    }

    // Validate pincode
    if (pincode.length !== 6 || isNaN(pincode)) {
      Alert.alert('Error', 'Please enter a valid 6-digit pincode');
      return;
    }

    // Ensure userId exists
    if (!user?.userId) {
      Alert.alert('Error', 'User ID not found. Please login again.');
      // navigation.replace('LoginDelivery');
      return;
    }

    setLoading(true);

    try {
      // Prepare address data for both API and context with explicit ID fields
      const addressData = {
        // Store both IDs and names for better context management
        stateId: selectedState,
        districtId: selectedDistrict,
        blockId: selectedBlock,
        stateID: selectedState, // Keep original field for backward compatibility
        districtID: selectedDistrict, // Keep original field for backward compatibility
        blockID: selectedBlock, // Keep original field for backward compatibility
        village: village.trim(),
        nearestLandMark: landmark.trim() || '',
        pinCode: pincode,
        // Include readable names for display purposes
        stateName: selectedStateName,
        districtName: selectedDistrictName,
        blockName: selectedBlockName,
      };

      // Prepare the payload for API call
      const apiPayload = {
        userId: userId,
        stateID: selectedState,
        districtID: selectedDistrict,
        blockID: selectedBlock,
        village: village.trim(),
        nearestLandMark: landmark.trim() || '',
        pinCode: pincode,
      };

      console.log('Final addressData for context:', addressData);
      console.log('API payload:', apiPayload);

      // Step 1: Save to database via API
      const response = await axios.post('http://10.0.2.2:5220/api/Registration/User/InsertUserAddress', apiPayload);
      
      console.log('API Response:', response.data);

      if (response.data) {
        // Step 2: Save to LocationContext for global access (only if API call succeeds)
        const contextResult = await saveAddressLocally(userId, addressData);
        
        if (contextResult.success) {
          console.log('Address saved to both database and context successfully');
          console.log('Stored address data with IDs:', contextResult.data);
          
          Alert.alert('Success', 'Address saved successfully!', [
            {
              text: 'OK',
              onPress: () => {
                // Navigate to main app after success
                navigation.navigate('MainApp');
              }
            }
          ]);
        } else {
          console.warn('API succeeded but context save failed:', contextResult.error);
          // Still show success since API call worked
          Alert.alert('Success', 'Address saved successfully!', [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('MainApp');
              }
            }
          ]);
        }
      } else {
        Alert.alert('Error', 'Failed to save address. Please try again.');
      }
      
    } catch (error) {
      console.error('API submission failed:', error);
      
      // Handle different types of errors
      let errorMessage = 'Failed to save address. Please try again.';
      
      if (error.response) {
        // Server responded with error status
        console.error('Error Response:', error.response.data);
        errorMessage = error.response.data?.message || error.response.data || errorMessage;
      } else if (error.request) {
        // Request was made but no response received
        console.error('Network Error:', error.request);
        errorMessage = 'Network error. Please check your connection.';
      } else {
        // Something else happened
        console.error('Error Message:', error.message);
        errorMessage = error.message;
      }
      
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled
      >
        <Text style={styles.title}>Add Your Address</Text>
        
        <Text style={styles.label}>State *</Text>
        <DropDownPicker
          open={openState}
          value={selectedState}
          items={states}
          setOpen={setOpenState}
          setValue={setSelectedState}
          setItems={setStates}
          onChangeValue={(value) => {
            console.log('State onChangeValue - Selected value:', value, 'Type:', typeof value);
            setSelectedState(value);
            setSelectedDistrict(null);
            setSelectedBlock(null);
            setDistricts([]);
            setBlocks([]);
            
            // Store state name for context
            const stateName = states.find(state => state.value === value)?.label || '';
            setSelectedStateName(stateName);
            setSelectedDistrictName('');
            setSelectedBlockName('');
            console.log('State name set:', stateName);
            console.log('Selected state ID stored:', value);
            
            if (value) {
              fetchDistricts(value);
            }
          }}
          placeholder="Select State"
          style={styles.dropdown}
          listMode="MODAL"
          zIndex={3000}
          zIndexInverse={1000}
        />

        <Text style={styles.label}>District *</Text>
        <DropDownPicker
          open={openDistrict}
          value={selectedDistrict}
          items={districts}
          setOpen={setOpenDistrict}
          setValue={setSelectedDistrict}
          setItems={setDistricts}
          onChangeValue={(value) => {
            console.log('District onChangeValue - Selected value:', value, 'Type:', typeof value);
            setSelectedDistrict(value);
            setSelectedBlock(null);
            setBlocks([]);
            
            // Store district name for context
            const districtName = districts.find(district => district.value === value)?.label || '';
            setSelectedDistrictName(districtName);
            setSelectedBlockName('');
            console.log('District name set:', districtName);
            console.log('Selected district ID stored:', value);
            
            if (value) {
              fetchBlocks(value);
            }
          }}
          placeholder="Select District"
          style={styles.dropdown}
          listMode="MODAL"
          zIndex={2000}
          zIndexInverse={2000}
          disabled={!selectedState}
        />

        <Text style={styles.label}>Block *</Text>
        <DropDownPicker
          open={openBlock}
          value={selectedBlock}
          items={blocks}
          setOpen={setOpenBlock}
          setValue={setSelectedBlock}
          setItems={setBlocks}
          onChangeValue={(value) => {
            console.log('Block onChangeValue - Selected value:', value, 'Type:', typeof value);
            setSelectedBlock(value);
            
            // Store block name for context
            const blockName = blocks.find(block => block.value === value)?.label || '';
            setSelectedBlockName(blockName);
            console.log('Block name set:', blockName);
            console.log('Selected block ID stored:', value);
          }}
          placeholder="Select Block"
          style={styles.dropdown}
          listMode="MODAL"
          zIndex={1000}
          zIndexInverse={3000}
          disabled={!selectedDistrict}
        />

        <Text style={styles.label}>Village *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Village"
          value={village}
          onChangeText={setVillage}
        />

        <Text style={styles.label}>Landmark</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Landmark (Optional)"
          value={landmark}
          onChangeText={setLandmark}
        />

        <Text style={styles.label}>Pincode *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter 6-digit Pincode"
          value={pincode}
          onChangeText={setPincode}
          keyboardType="number-pad"
          maxLength={6}
        />

        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Saving...' : 'Submit Address'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LocationManual;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    marginBottom: 4,
    marginTop: 12,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  dropdown: {
    marginBottom: 10,
    borderColor: '#ccc',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 6,
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});




// import { useNavigation } from '@react-navigation/native';
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
//   ScrollView,
//   Dimensions,
//   Image,
//   ActivityIndicator,
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import Loader from '../components/Loader';
// import { useLocation } from '../Contexts/LocationContext';
// import { useAddress, tempFarmerName } from '../Contexts/AddressContext';

// const { width, height } = Dimensions.get('window');

// export default function LocationManual() {
//   const navigation = useNavigation();
//   const { setLocation } = useLocation();
//   const { addAddress } = useAddress();

//   const [home, setHome] = useState({
//     state: '',
//     district: '',
//     block: '',
//     village: '',
//     landmark: '',
//     pincode: '',
//   });

//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [states, setStates] = useState([]);
//   const [districts, setDistricts] = useState([]);
//   const [blocks, setBlocks] = useState([]);

//   const [dropdownLoading, setDropdownLoading] = useState({
//     state: false,
//     district: false,
//     block: false,
//   });

//   useEffect(() => {
//     fetchStates();
//   }, []);

//   const sampleStates = [
//     { id: 's1', name: 'Maharashtra' },
//     { id: 's2', name: 'Karnataka' },
//   ];

//   const sampleDistricts = {
//     s1: [
//       { id: 'd1', name: 'Pune' },
//       { id: 'd2', name: 'Mumbai' },
//       { id: 'd3', name: 'Sangli' },
//       { id: 'd4', name: 'Satara' },
//       { id: 'd5', name: 'Solapur' },
//       { id: 'd6', name: 'Kolhapur' },
//       { id: 'd7', name: 'Akola' },
//       { id: 'd8', name: 'Amravati' },
//       { id: 'd9', name: 'Washim' },
//       { id: 'd10', name: 'Aurangabad' },
//       { id: 'd11', name: 'Chandrapur' },
//       { id: 'd12', name: 'Nagpur' },
//       { id: 'd13', name: 'Thane' },
//       { id: 'd14', name: 'Ratnagiri' },
//       { id: 'd15', name: 'Nashik' },
//     ],
//     s2: [
//       { id: 'd16', name: 'Bangalore' },
//       { id: 'd17', name: 'Mysore' },
//     ],
//   };

//   const sampleBlocks = {
//     d1: [
//       { id: 'b1', name: 'Hinjewadi' },
//       { id: 'b2', name: 'Kothrud' },
//     ],
//     d2: [
//       { id: 'b3', name: 'Andheri' },
//       { id: 'b4', name: 'Borivali' },
//     ],
//     d16: [
//       { id: 'b5', name: 'Whitefield' },
//       { id: 'b6', name: 'Koramangala' },
//     ],
//     d17: [
//       { id: 'b7', name: 'Lalith Mahal' },
//       { id: 'b8', name: 'Nazarbad' },
//     ],
//   };

//   const fetchStates = async () => {
//     setDropdownLoading((prev) => ({ ...prev, state: true }));
//     setTimeout(() => {
//       setStates(sampleStates);
//       setDropdownLoading((prev) => ({ ...prev, state: false }));
//     }, 500);
//   };

//   const fetchDistricts = async (stateId) => {
//     setDropdownLoading((prev) => ({ ...prev, district: true }));
//     setTimeout(() => {
//       setDistricts(sampleDistricts[stateId] || []);
//       setDropdownLoading((prev) => ({ ...prev, district: false }));
//     }, 500);
//   };

//   const fetchBlocks = async (districtId) => {
//     setDropdownLoading((prev) => ({ ...prev, block: true }));
//     setTimeout(() => {
//       setBlocks(sampleBlocks[districtId] || []);
//       setDropdownLoading((prev) => ({ ...prev, block: false }));
//     }, 500);
//   };

//   const getAlphabetValid = (text) => text.replace(/[^A-Za-z ]/g, '');
//   const getSixDigitPincode = (text) => text.replace(/[^0-9]/g, '').slice(0, 6);
  
//   const validateHome = () => {
//     const newErrors = {};
//     if (!home.state) newErrors.state = 'State is required.';
//     if (!home.district) newErrors.district = 'District is required.';
//     if (!home.block) newErrors.block = 'Block is required.';
//     if (!home.village.trim()) newErrors.village = 'Village is required.';
//     if (!home.pincode.trim()) {
//     newErrors.pincode = 'Pincode is required.';
//   } else if (home.pincode.length !== 6) {
//     newErrors.pincode = 'Pincode must be exactly 6 digits.';
//   }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSave = async () => {
//     if (!validateHome()) return;
//     setLoading(true);
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       setLocation(home);
//       const newAddress = {
//         farmerName: tempFarmerName,
//         farmerPhone: '',
//         farmerAddress: '',
//         houseNameArea: home.village,
//         landmark: home.landmark,
//         village: home.village,
//         block: home.block,
//         district: home.district,
//         state: home.state,
//         pincode: home.pincode,
//       };
//       addAddress(newAddress);
//       navigation.navigate('MainApp', { screen: 'MainScreen' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.background}>
//       <Loader visible={loading} />
//       <View style={styles.logoContainer}>
//         <Image
//           source={require('../assests/images/mainlogo.png')}
//           style={styles.logo}
//           resizeMode="contain"
//         />
//       </View>
//       <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
//         <View style={styles.form}>
//           {/* State Picker */}
//           <Text style={styles.label}>State*</Text>
//           {dropdownLoading.state ? (
//             <ActivityIndicator />
//           ) : (
//             <Picker
//               selectedValue={home.state}
//               onValueChange={(value) => {
//                 const selectedState = states.find((s) => s.id === value);

//                 setHome({
//                   ...home,
//                   state: selectedState?.name || '',
//                   district: '',
//                   block: '',
//                 });
//                 fetchDistricts(value);
//               }}
//               style={styles.input}
//             >
//               <Picker.Item label="Select State" value="" />
//               {states.map((item) => (
//                 <Picker.Item key={item.id} label={item.name} value={item.id} />
//               ))}
//             </Picker>
//           )}
//           {errors.state && <Text style={styles.errorText}>{errors.state}</Text>}

//           {/* District Picker */}
//           <Text style={styles.label}>District*</Text>
//           {dropdownLoading.district ? (
//             <ActivityIndicator />
//           ) : (
//             <Picker
//               selectedValue={home.district}
//               onValueChange={(value) => {
//                 setHome({ ...home, district: value, block: '' });
//                 const selectedDistrict = districts.find((d) => d.name === value);
//                 fetchBlocks(selectedDistrict?.id);
//               }}
//               style={styles.input}
//             >
//               <Picker.Item label="Select District" value="" />
//               {districts.map((item) => (
//                 <Picker.Item key={item.id} label={item.name} value={item.name} />
//               ))}
//             </Picker>
//           )}
//           {errors.district && <Text style={styles.errorText}>{errors.district}</Text>}

//           {/* Block Picker */}
//           <Text style={styles.label}>Block*</Text>
//           {dropdownLoading.block ? (
//             <ActivityIndicator />
//           ) : (
//             <Picker
//               selectedValue={home.block}
//               onValueChange={(value) => setHome({ ...home, block: value })}
//               style={styles.input}
//             >
//               <Picker.Item label="Select Block" value="" />
//               {blocks.map((item) => (
//                 <Picker.Item key={item.id} label={item.name} value={item.name} />
//               ))}
//             </Picker>
//           )}
//           {errors.block && <Text style={styles.errorText}>{errors.block}</Text>}

//           {/* Village Input */}
//           <Text style={styles.label}>Village*</Text>
//           <TextInput
//             style={[styles.input, errors.village && styles.inputError]}
//             value={home.village}
//             onChangeText={(text) => setHome({ ...home, village: getAlphabetValid(text) })}
//             placeholder="Enter village"
//             placeholderTextColor="#888"
//           />
//           {errors.village && <Text style={styles.errorText}>{errors.village}</Text>}

//           {/* Landmark Input */}
//           <Text style={styles.label}>Nearest Landmark</Text>
//           <TextInput
//             style={styles.input}
//             value={home.landmark}
//             onChangeText={(text) => setHome({ ...home, landmark: getAlphabetValid(text) })}
//             placeholder="Enter landmark (optional)"
//             placeholderTextColor="#888"
//           />

//           {/* Pincode Input */}
//           <Text style={styles.label}>Pincode*</Text>
//           <TextInput
//             style={[styles.input, errors.pincode && styles.inputError]}
//             value={home.pincode}
//             keyboardType="numeric"
//             onChangeText={(text) => setHome({ ...home, pincode: getSixDigitPincode(text) })}
//             placeholder="Enter pincode"
//             placeholderTextColor="#888"
//           />
//           {errors.pincode && <Text style={styles.errorText}>{errors.pincode}</Text>}

//           {/* Submit Button */}
//           <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
//             <Text style={styles.saveButtonText}>Submit</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//   },
//   scrollContent: {
//     flexGrow: 1,
//     padding: width * 0.06,
//     justifyContent: 'center',
//   },
//   form: {
//     gap: height * 0.02,
//   },
//   label: {
//     fontSize: width * 0.045,
//     fontWeight: '600',
//     color: '#2E7D32',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     paddingHorizontal: width * 0.04,
//     fontSize: width * 0.04,
//     backgroundColor: 'white',
//     color: '#000',
//     height: 48, // ✅ fixed height
//     justifyContent: 'center',
//   },
//   inputError: {
//     borderColor: '#f44336',
//   },
//   errorText: {
//     color: '#f44336',
//     fontSize: width * 0.035,
//   },
//   saveButton: {
//     backgroundColor: '#4CAF50',
//     paddingVertical: height * 0.02,
//     borderRadius: 8,
//     marginTop: height * 0.02,
//   },
//   saveButtonText: {
//     color: 'white',
//     fontSize: width * 0.045,
//     fontWeight: '600',
//     textAlign: 'center',
//   },
//   logoContainer: {
//     alignItems: 'center',
//   },
//   logo: {
//     width: width * 0.5,
//     height: width * 0.45,
//   },
// });
