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

// const { width } = Dimensions.get('window');

// export default function LocationManual() {
//   const navigation = useNavigation();
//   const { setLocation } = useLocation();
//   const { addAddress } = useAddress();

//   const [home, setHome] = useState({
//     state: '',
//     stateId: '',
//     district: '',
//     districtId: '',
//     block: '',
//     blockId: '',
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

//   const BASE_URL = 'http://10.0.2.2:5220/api/Location';
//   // const BASE_URL = 'http://192.168.29.185:5220/api/Location';


//   useEffect(() => {
//     fetchStates();
//   }, []);

//   const fetchStates = async () => {
//     setDropdownLoading((prev) => ({ ...prev, state: true }));
//     try {
//       const res = await fetch(`${BASE_URL}/states`);
//       const data = await res.json();
//       setStates(data);
//     } catch (error) {
//       console.error('❌ Error fetching states:', error);
//     } finally {
//       setDropdownLoading((prev) => ({ ...prev, state: false }));
//     }
//   };


//  const fetchDistricts = async (stateId) => {
//   setDropdownLoading((prev) => ({ ...prev, district: true }));
//   try {
//     const res = await fetch(`${BASE_URL}/districts/${stateId}`);

//     const text = await res.text();
//     console.log("📦 District response:", text);

//     if (!text) {
//       throw new Error("❌ Empty response from /district API");
//     }

//     const data = JSON.parse(text);
//     setDistricts(data);
//   } catch (error) {
//     console.error('❌ Error fetching districts:', error);
//   } finally {
//     setDropdownLoading((prev) => ({ ...prev, district: false }));
//   }
// };



//   const fetchBlocks = async (districtId) => {
//     setDropdownLoading((prev) => ({ ...prev, block: true }));
//     try {
//       const res = await fetch(`${BASE_URL}/blocks/${districtId}`);
//       const data = await res.json();
//       setBlocks(data);
//     } catch (error) {
//       console.error('❌ Error fetching blocks:', error);
//     } finally {
//       setDropdownLoading((prev) => ({ ...prev, block: false }));
//     }
//   };

//   const getAlphabetValid = (text) => text.replace(/[^A-Za-z ]/g, '');
//   const getSixDigitPincode = (text) => text.replace(/[^0-9]/g, '').slice(0, 6);

//   const validateHome = () => {
//     const newErrors = {};
//     if (!home.state) newErrors.state = 'State is required.';
//     if (!home.district) newErrors.district = 'District is required.';
//     if (!home.block) newErrors.block = 'Block is required.';
//     if (!home.village.trim()) newErrors.village = 'Village is required.';
//     if (!home.pincode.trim()) newErrors.pincode = 'Pincode is required.';
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
//         houseNameArea: home.village,
//         landmark: home.landmark,
//         village: home.village,
//         block: home.block,
//         blockId: home.blockId,
//         district: home.district,
//         districtId: home.districtId,
//         state: home.state,
//         stateId: home.stateId,
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
//               selectedValue={home.stateId}
//               onValueChange={(value) => {
//                 const selected = states.find((s) => s.stateId === value);
//                 setHome({
//                   ...home,
//                   state: selected?.stateName || '',
//                   stateId: selected?.stateId || '',
//                   district: '',
//                   districtId: '',
//                   block: '',
//                   blockId: '',
//                 });
//                 if (value) fetchDistricts(value);
//               }}
//               style={styles.input}
//             >
//               <Picker.Item label="Select State" value="" />
//               {states.map((item) => (
//                 <Picker.Item
//                   key={item.stateId.toString()}
//                   label={item.stateName}
//                   value={item.stateId}
//                 />
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
//               selectedValue={home.districtId}
//               onValueChange={(value) => {
//                 const selected = districts.find((d) => d.districtId === value);
//                 setHome({
//                   ...home,
//                   district: selected?.districtName || '',
//                   districtId: selected?.districtId || '',
//                   block: '',
//                   blockId: '',
//                 });
//                 if (value) fetchBlocks(value);
//               }}
//               style={styles.input}
//             >
//               <Picker.Item label="Select District" value="" />
//               {districts.map((item) => (
//                 <Picker.Item
//                   key={item.districtId.toString()}
//                   label={item.districtName}
//                   value={item.districtId}
//                 />
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
//               selectedValue={home.blockId}
//               onValueChange={(value) => {
//                 const selected = blocks.find((b) => b.blockId === value);
//                 setHome({
//                   ...home,
//                   block: selected?.blockName || '',
//                   blockId: selected?.blockId || '',
//                 });
//               }}
//               style={styles.input}
//             >
//               <Picker.Item label="Select Block" value="" />
//               {blocks.map((item) => (
//                 <Picker.Item
//                   key={item.blockId.toString()}
//                   label={item.blockName}
//                   value={item.blockId}
//                 />
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
//   background: { flex: 1, backgroundColor: '#fff' },
//   logoContainer: { alignItems: 'center', marginVertical: 20 },
//   logo: { width: 150, height: 80 },
//   scrollContent: { padding: 16 },
//   form: { paddingBottom: 100 },
//   label: { marginTop: 10, fontSize: 16, fontWeight: '600', color: '#333' },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 6,
//     padding: 10,
//     marginTop: 5,
//     backgroundColor: '#f9f9f9',
//   },
//   inputError: { borderColor: 'red' },
//   errorText: { color: 'red', fontSize: 13, marginTop: 2 },
//   saveButton: {
//     marginTop: 20,
//     backgroundColor: '#2E86C1',
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   saveButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
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
import { useAddress, tempFarmerName } from '../Contexts/AddressContext';

const { width, height } = Dimensions.get('window');

export default function LocationManual() {
  const navigation = useNavigation();
  const { setLocation } = useLocation();
  const { addAddress } = useAddress();

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
    fetchStates();
  }, []);

  const sampleStates = [
    { id: 's1', name: 'Maharashtra' },
    { id: 's2', name: 'Karnataka' },
  ];

  const sampleDistricts = {
    s1: [
      { id: 'd1', name: 'Pune' },
      { id: 'd2', name: 'Mumbai' },
      { id: 'd3', name: 'Sangli' },
      { id: 'd4', name: 'Satara' },
      { id: 'd5', name: 'Solapur' },
      { id: 'd6', name: 'Kolhapur' },
      { id: 'd7', name: 'Akola' },
      { id: 'd8', name: 'Amravati' },
      { id: 'd9', name: 'Washim' },
      { id: 'd10', name: 'Aurangabad' },
      { id: 'd11', name: 'Chandrapur' },
      { id: 'd12', name: 'Nagpur' },
      { id: 'd13', name: 'Thane' },
      { id: 'd14', name: 'Ratnagiri' },
      { id: 'd15', name: 'Nashik' },
    ],
    s2: [
      { id: 'd16', name: 'Bangalore' },
      { id: 'd17', name: 'Mysore' },
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
    d16: [
      { id: 'b5', name: 'Whitefield' },
      { id: 'b6', name: 'Koramangala' },
    ],
    d17: [
      { id: 'b7', name: 'Lalith Mahal' },
      { id: 'b8', name: 'Nazarbad' },
    ],
  };

  const fetchStates = async () => {
    setDropdownLoading((prev) => ({ ...prev, state: true }));
    setTimeout(() => {
      setStates(sampleStates);
      setDropdownLoading((prev) => ({ ...prev, state: false }));
    }, 500);
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
      const newAddress = {
        farmerName: tempFarmerName,
        farmerPhone: '',
        farmerAddress: '',
        houseNameArea: home.village,
        landmark: home.landmark,
        village: home.village,
        block: home.block,
        district: home.district,
        state: home.state,
        pincode: home.pincode,
      };
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
              style={styles.input}
            >
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
                const selectedDistrict = districts.find((d) => d.name === value);
                fetchBlocks(selectedDistrict?.id);
              }}
              style={styles.input}
            >
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
              style={styles.input}
            >
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
          <Text style={styles.label}>Nearest Landmark</Text>
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
    borderColor: '#ccc',
    paddingHorizontal: width * 0.04,
    fontSize: width * 0.04,
    backgroundColor: 'white',
    color: '#000',
    height: 52, // ✅ fixed height
    justifyContent: 'center',
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
