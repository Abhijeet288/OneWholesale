// import { useNavigation } from '@react-navigation/native';
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
//   ScrollView,
//   Dimensions,
//   Image
// } from 'react-native';
// import Loader from '../components/Loader';
// import { useLocation } from '../Contexts/LocationContext';

// const { width, height } = Dimensions.get('window');

// export default function LocationManual() {
//   const navigation = useNavigation();
//   const { setLocation } = useLocation();

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

//   const getAlphabetValid = (text) => text.replace(/[^A-Za-z ]/g, '');
//   const getSixDigitPincode = (text) => text.replace(/[^0-9]/g, '').slice(0, 6);

//   const validateHome = () => {
//     const newErrors = {};
//     if (!home.state.trim()) newErrors.state = 'State is required.';
//     if (!home.district.trim()) newErrors.district = 'District is required.';
//     if (!home.block.trim()) newErrors.block = 'Block is required.';
//     if (!home.village.trim()) newErrors.village = 'Village is required.';
//     // if (!home.landmark.trim()) newErrors.landmark = 'Landmark is required.';
//     if (!home.pincode.trim()) newErrors.pincode = 'Pincode is required';


//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSave = async () => {
//     if (!validateHome()) return;

//     setLoading(true);
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 2000));
//       setLocation({
//         village: home.village,
//         block: home.block,
//         district: home.district,
//         state: home.state,
//         landmark: home.landmark,
//         pincode: home.pincode,
//       });
//       navigation.navigate('MainApp', { screen: 'MainScreen' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fields = [
//     { label: 'State', key: 'state' },
//     { label: 'District', key: 'district' },
//     { label: 'Block', key: 'block' },
//     { label: 'Village', key: 'village' },
//     { label: 'Nearest Land Mark', key: 'landmark' },
//     { label: 'Pin code', key: 'pincode', keyboardType: 'numeric' },
//   ];

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
//           {fields.map(({ label, key, keyboardType }) => {
//             const value = home[key];
//             const setter = (val) => setHome((prev) => ({ ...prev, [key]: val }));
//             const showError = errors[key];

//             return (
//               <View key={key} style={styles.inputContainer}>
//                 <Text style={styles.label}>{label}</Text>
//                 <TextInput
//                   style={[styles.input, showError && styles.inputError]}
//                   value={value}
//                   onChangeText={(text) =>
//                     setter(key === 'pincode' ? getSixDigitPincode(text) : getAlphabetValid(text))
//                   }
//                   placeholder={`Enter ${label.toLowerCase()}`}
//                   keyboardType={keyboardType || 'default'}
//                   placeholderTextColor="#888"
//                 />
//                 {showError && <Text style={styles.errorText}>{errors[key]}</Text>}
//               </View>
//             );
//           })}

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
//     top:0,
//     flexGrow: 1,
//     padding: width * 0.06,
//     justifyContent: 'center',
//   },
//   form: {
//     gap: height * 0.02,
//   },
//   inputContainer: {
//     gap: height * 0.01,
//   },
//   label: {
//     fontSize: width * 0.045,
//     fontWeight: '600',
//     color: '#2E7D32',
//   },

//   input: {
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     borderRadius: 8,
//     paddingVertical: height * 0.015,
//     paddingHorizontal: width * 0.04,
//     fontSize: width * 0.04,
//     backgroundColor: 'white',
//     color: 'black',
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
//   alignItems:'center',
//   // backgroundColor:'red'
// },
// logo: {

//   width: width * 0.5,
//   height: width * 0.45,
// },

// });



import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Loader from '../components/Loader';
import { useLocation } from '../Contexts/LocationContext';
import { useAddress,tempFarmerName } from '../Contexts/AddressContext';


const { width, height } = Dimensions.get('window');

export default function LocationManual() {
  const navigation = useNavigation();
  const { setLocation } = useLocation();
  const {addAddress}=useAddress();

  const [home, setHome] = useState({
    state: '',
    district: '',
    block: '',
    village: '',
    landmark: '',
    pincode: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [blocks, setBlocks] = useState([]);

  const [dropdownLoading, setDropdownLoading] = useState({
    state: false,
    district: false,
    block: false,
  });
  useEffect(() => {
  console.log('Name from context in LocationManual:', tempFarmerName); 
}, []);

  //  Mock  API data
  const sampleStates = [
    { id: 's1', name: 'Maharashtra' },
    { id: 's2', name: 'Karnataka' },
  ];

  const sampleDistricts = {
    s1: [
      { id: 'd1', name: 'Pune' },
      { id: 'd2', name: 'Mumbai' },
    ],
    s2: [
      { id: 'd3', name: 'Bangalore' },
      { id: 'd4', name: 'Mysore' },
    ],
  };

  const sampleBlocks = {
    d1: [
      { id: 'b1', name: 'Hinjewadi' },
      { id: 'b2', name: 'Kothrud' },
    ],
    d2: [
      { id: 'b3', name: 'Andheri' },
      { id: 'b4', name: 'Borivali' },
    ],
    d3: [
      { id: 'b5', name: 'Whitefield' },
      { id: 'b6', name: 'Koramangala' },
    ],
    d4: [
      { id: 'b7', name: 'Lalith Mahal' },
      { id: 'b8', name: 'Nazarbad' },
    ],
  };

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = async () => {
    setDropdownLoading((prev) => ({ ...prev, state: true }));
    setTimeout(() => {
      setStates(sampleStates);
      setDropdownLoading((prev) => ({ ...prev, state: false }));
    }, 500); // simulate delay
  };

  const fetchDistricts = async (stateId) => {
    setDropdownLoading((prev) => ({ ...prev, district: true }));
    setTimeout(() => {
      setDistricts(sampleDistricts[stateId] || []);
      setDropdownLoading((prev) => ({ ...prev, district: false }));
    }, 500);
  };

  const fetchBlocks = async (districtId) => {
    setDropdownLoading((prev) => ({ ...prev, block: true }));
    setTimeout(() => {
      setBlocks(sampleBlocks[districtId] || []);
      setDropdownLoading((prev) => ({ ...prev, block: false }));
    }, 500);
  };

  const getAlphabetValid = (text) => text.replace(/[^A-Za-z ]/g, '');
  const getSixDigitPincode = (text) => text.replace(/[^0-9]/g, '').slice(0, 6);

  const validateHome = () => {
    const newErrors = {};
    if (!home.state) newErrors.state = 'State is required.';
    if (!home.district) newErrors.district = 'District is required.';
    if (!home.block) newErrors.block = 'Block is required.';
    if (!home.village.trim()) newErrors.village = 'Village is required.';
    if (!home.pincode.trim()) newErrors.pincode = 'Pincode is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateHome()) return;
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLocation(home);
      const newAddress={
        
      farmerName: tempFarmerName,     // ✅ Comes from Registration.js
      farmerPhone: '',                // If needed, update this
      farmerAddress: '',              // Or build full string if you want
      houseNameArea: home.village,
      landmark: home.landmark,
      village: home.village,
      block: home.block,
      district: home.district,
      state: home.state,
      pincode: home.pincode
    

      }
      console.log('Name from context:', tempFarmerName);
      addAddress(newAddress);
      navigation.navigate('MainApp', { screen: 'MainScreen' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.background}>
      <Loader visible={loading} />
      <View style={styles.logoContainer}>
        <Image
          source={require('../assests/images/mainlogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.form}>

          {/* State Picker */}
          <Text style={styles.label}>State*</Text>
          {dropdownLoading.state ? (
            <ActivityIndicator />
          ) : (
            <Picker
              selectedValue={home.state}
             onValueChange={(value) => {
                setHome({ ...home, state: value, district: '', block: '' });
                fetchDistricts(value);
              }}
              style={[styles.input, {}]}>
              <Picker.Item label="Select State" value="" />
              {states.map((item) => (
                <Picker.Item key={item.id} label={item.name} value={item.id} />
              ))}
            </Picker>
          )}
          {errors.state && <Text style={styles.errorText}>{errors.state}</Text>}


          {/* District Picker */}
          <Text style={styles.label}>District*</Text>
          {dropdownLoading.district ? (
            <ActivityIndicator />
          ) : (
            <Picker
              selectedValue={home.district}
              onValueChange={(value) => {
                setHome({ ...home, district: value, block: '' });
                const seletedDistrict = districts.find((d) => d.name === value);
                const districtId = seletedDistrict?.id;
                fetchBlocks(districtId);
              }}
              style={styles.input}>
              <Picker.Item label="Select District" value="" />
              {districts.map((item) => (
                <Picker.Item key={item.id} label={item.name} value={item.name} />
              ))}
            </Picker>
          )}
          {errors.district && <Text style={styles.errorText}>{errors.district}</Text>}




          {/* Block Picker */}
          <Text style={styles.label}>Block*</Text>
          {dropdownLoading.block ? (
            <ActivityIndicator />
          ) : (
            <Picker
              selectedValue={home.block}
              onValueChange={(value) => setHome({ ...home, block: value })}
              style={styles.input}>
              <Picker.Item label="Select Block" value="" />
              {blocks.map((item) => (
                <Picker.Item key={item.id} label={item.name} value={item.name} />
              ))}
            </Picker>
          )}
          {errors.block && <Text style={styles.errorText}>{errors.block}</Text>}

          {/* Village Input */}
          <Text style={styles.label}>Village*</Text>
          <TextInput
            style={[styles.input, errors.village && styles.inputError]}
            value={home.village}
            onChangeText={(text) => setHome({ ...home, village: getAlphabetValid(text) })}
            placeholder="Enter village"
            placeholderTextColor="#888"
          />
          {errors.village && <Text style={styles.errorText}>{errors.village}</Text>}

          {/* Landmark Input */}
          <Text style={styles.label}>Nearest Landmark </Text>
          <TextInput
            style={styles.input}
            value={home.landmark}
            onChangeText={(text) => setHome({ ...home, landmark: getAlphabetValid(text) })}
            placeholder="Enter landmark (optional)"
            placeholderTextColor="#888"
          />

          {/* Pincode Input */}
          <Text style={styles.label}>Pincode*</Text>
          <TextInput
            style={[styles.input, errors.pincode && styles.inputError]}
            value={home.pincode}
            keyboardType="numeric"
            onChangeText={(text) => setHome({ ...home, pincode: getSixDigitPincode(text) })}
            placeholder="Enter pincode"
            placeholderTextColor="#888"
          />
          {errors.pincode && <Text style={styles.errorText}>{errors.pincode}</Text>}

          {/* Submit Button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}







const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    flexGrow: 1,
    padding: width * 0.06,
    justifyContent: 'center',
  },
  form: {
    gap: height * 0.02,
  },
  label: {
    fontSize: width * 0.045,
    fontWeight: '600',
    color: '#2E7D32',
  },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    // borderRadius:10,
    // paddingVertical: height * 0.010,
    paddingHorizontal: width * 0.04,
    fontSize: width * 0.04,
    backgroundColor: 'white',
    color: '#888',
  },
  inputError: {
    borderColor: '#f44336',
  },
  errorText: {
    color: '#f44336',
    fontSize: width * 0.035,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: height * 0.02,
    borderRadius: 8,
    marginTop: height * 0.02,
  },
  saveButtonText: {
    color: 'white',
    fontSize: width * 0.045,
    fontWeight: '600',
    textAlign: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: width * 0.5,
    height: width * 0.45,
  },
});
