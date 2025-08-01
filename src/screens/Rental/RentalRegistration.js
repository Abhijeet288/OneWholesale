// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
//   ScrollView,
//   Platform,
//   Alert
// } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import AddressDrawer from '../DrawerScreens/AddressDrawer';

// const { width, height } = Dimensions.get('window');

// export default function RentalRegistrationForm() {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const selectedSector = route.params?.sectorName ;
//   const isDrone = selectedSector === 'KissanDrones';
//   console.log('Selected Sector:', selectedSector);



//   const [block, setBlock] = useState('');
//   const [time, setTime] = useState('');
//   const [land, setLand] = useState('');
//   const [date, setDate] = useState('');

//   const [errors, setErrors] = useState({});
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   // const [showTimePicker, setShowTimePicker] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(new Date());
  
//   const onChangeDate = (event, selected) => {
//     setShowDatePicker(false);
//     if (selected) {
//       const formattedDate = selected.toLocaleDateString('en-GB');
//       setDate(formattedDate);
//       setSelectedDate(selected);
//     }
//   };

 

//   const validateFields = () => {
//     const newErrors = {};
//     if (!block) newErrors.block = 'Block is required';
//     else if (!/^[A-Za-z\s]+$/.test(block)) newErrors.block = 'Block must contain only alphabets';
//     if (isDrone) {
//       if (!land) newErrors.land = "Land field is required"
//     } else {
//       if (!time) newErrors.time = 'Time is required'
//     }
//     if (!date) newErrors.date = 'Date is required';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleEnter = () => {
//     if (validateFields()) {
//       Alert.alert(
//         'Confirm Submission',
//         'Please check all details before proceeding.',
//         [
//           { text: 'Cancel', style: 'cancel' },
//           {
//             text: 'Proceed',
//             onPress: () => {
//               setBlock('');
//               setTime('');
//               setLand('');
//               setDate('');
//               setErrors({});
//               navigation.navigate(selectedSector); 
//               // You can also navigate to a different screen or perform any other action here');
//             }
//           },
//         ],
//         { cancelable: false }
//       );
//     }
//   };

//   return (
//     <><ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>User Registration Details</Text>

//       {/* Block */}
//       <View style={styles.inputGroup}>
//         <Text style={styles.label}>
//           Block<Text style={styles.required}>*</Text>:
//         </Text>
//         <TextInput
//           style={styles.input}
//           value={block}
//           onChangeText={setBlock}
//           autoCapitalize="words"
//           keyboardType="default"
//           placeholder="Enter Block"
//           placeholderTextColor={'#999'}
//           maxLength={30}
//           autoFocus
//           returnKeyType="next" />
//       </View>
//       {errors.block && <Text style={styles.errorText}>{errors.block}</Text>}

//       {!isDrone && (
//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>
//             Time<Text style={styles.required}>*</Text>:
//           </Text>
//           <TextInput
//             style={styles.input}
//             value={time}
//             onChangeText={setTime}
//             placeholder="Enter time (e.g. 5 for 5 hour)"
//             placeholderTextColor={'#999'}
//             keyboardType="number-pad" />
//         </View>
//       )}
//       {errors.time && !isDrone && <Text style={styles.errorText}>{errors.time}</Text>}

//       {isDrone && (
//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>
//             Land<Text style={styles.required}>*</Text>:
//           </Text>
//           <TextInput
//             style={styles.input}
//             value={land}
//             onChangeText={setLand}
//             placeholder="Enter Land ( in acres)"
//             placeholderTextColor={'#999'} />
//         </View>
//       )}
//       {errors.land && isDrone && <Text style={styles.errorText}>{errors.land}</Text>}

//       {/* Date */}
//       <View style={styles.inputGroup}>
//         <Text style={styles.label}>
//           Date<Text style={styles.required}>*</Text>:
//         </Text>
//         <TouchableOpacity
//           style={[styles.input, styles.touchableInput]}
//           onPress={() => setShowDatePicker(true)}
//         >
//           <Text>{date || 'Select Date'}</Text>
//           <Ionicons name="calendar" size={20} color="#007AFF" />
//         </TouchableOpacity>
//       </View>
//       {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}

//       {showDatePicker && (
//         <DateTimePicker
//           value={selectedDate}
//           mode="date"
//           display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//           onChange={onChangeDate} />
//       )}

      


//       <TouchableOpacity style={styles.button} onPress={handleEnter}>
//         <Text style={styles.buttonText}>Enter</Text>
//       </TouchableOpacity>
    
//     </ScrollView>

//     <AddressDrawer />
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     paddingTop: height * 0.05,
//     height:0,
//     paddingHorizontal: width * 0.05,
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5',
//     flexGrow: 1,
//   },
//   title: {
//     fontSize: width * 0.06,
//     fontWeight: 'bold',
//     marginBottom: height * 0.03,
//     color: '#333',
//     textAlign: 'center',
//   },
//   inputGroup: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: height * 0.02,
//     width: '100%',
//   },
//   label: {
//     fontSize: width * 0.04,
//     fontWeight: 'bold',
//     width: '30%',
//   },
//   required: {
//     color: 'red',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#5cb85c',
//     borderRadius:8,
//     padding: 10,
//     width: '65%',
//     backgroundColor: '#fff',
//   },
//   touchableInput: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: width * 0.03,
//     marginBottom: 5,
//     marginLeft: '30%',
//     textAlign: 'left',
//     width: '70%',
//   },
//   button: {
//     marginTop: height * 0.03,
//     backgroundColor: '#5cb85c',
//     paddingVertical: 12,
//     paddingHorizontal: 40,
//     borderRadius: 8,
//     alignSelf: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: width * 0.045,
//     textAlign: 'center',
//   },
// });


import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Dimensions
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

// Get screen dimensions for responsive design
const { width } = Dimensions.get('window');

export default function RentalRegistration() {
  const navigation = useNavigation();
  const route = useRoute();
  const { subcategory } = route.params || { subcategory: 'Item' };

  // Form state
  const [customerName, setCustomerName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const [oneCenterID, setOneCenterID] = useState('');
  const [pricePerHourOrAcre, setPricePerHourOrAcre] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  
  // Date picker state
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);
  
  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Handle date changes
  const onDateFromChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateFrom;
    setShowFromDatePicker(Platform.OS === 'ios');
    setDateFrom(currentDate);
  };

  const onDateToChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateTo;
    setShowToDatePicker(Platform.OS === 'ios');
    setDateTo(currentDate);
  };

  // Format date for display
  const formatDate = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  // Validate form
  const validateForm = () => {
    if (!customerName.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return false;
    }
    if (!mobileNumber.trim()) {
      Alert.alert('Error', 'Please enter your mobile number');
      return false;
    }
    if (!address.trim()) {
      Alert.alert('Error', 'Please enter your address');
      return false;
    }
    if (!oneCenterID.trim()) {
      Alert.alert('Error', 'Please enter your One Center ID');
      return false;
    }
    if (!pricePerHourOrAcre.trim()) {
      Alert.alert('Error', 'Please enter price per hour/acre');
      return false;
    }
    if (!totalPrice.trim()) {
      Alert.alert('Error', 'Please enter total price');
      return false;
    }
    return true;
  };

  // Handle order placement
  const handlePlaceOrder = () => {
    if (!validateForm()) return;

    // Show confirmation dialog
    Alert.alert(
      'Confirm Order',
      'Are you sure you want to place this order?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes, Place Order',
          onPress: submitOrder,
        },
      ],
      { cancelable: false }
    );
  };

  // Submit order to API
  const submitOrder = async () => {
    setIsLoading(true);
    
    try {
      const orderData = {
        customerName,
        mobileNumber,
        address,
        oneCenterID: parseInt(oneCenterID, 10),
        dateFrom: dateFrom.toISOString(),
        dateTo: dateTo.toISOString(),
        pricePerHourOrAcre: parseFloat(pricePerHourOrAcre),
        totalPrice: parseFloat(totalPrice),
      };

      const response = await fetch('http://10.0.2.2:5220/api/RentalEquipment/RentalEquipment/PlacedProducts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        Alert.alert(
          'Success',
          'Your rental order has been placed successfully!',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Home'),
            },
          ]
        );
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        
        <View style={styles.formContainer}>
          <Text style={styles.formLabel}>Customer Name</Text>
          <TextInput
            style={styles.input}
            value={customerName}
            onChangeText={setCustomerName}
            placeholder="Enter your full name"
            placeholderTextColor="#999"
          />

          <Text style={styles.formLabel}>Mobile Number</Text>
          <TextInput
            style={styles.input}
            value={mobileNumber}
            onChangeText={setMobileNumber}
            placeholder="Enter your mobile number"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
          />

          <Text style={styles.formLabel}>Address</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={address}
            onChangeText={setAddress}
            placeholder="Enter your complete address"
            placeholderTextColor="#999"
            multiline
            numberOfLines={3}
          />

          {/* <Text style={styles.formLabel}>One Center ID</Text>
          <TextInput
            style={styles.input}
            value={oneCenterID}
            onChangeText={setOneCenterID}
            placeholder="Enter your One Center ID"
            placeholderTextColor="#999"
            keyboardType="numeric"
          /> */}

          <View style={styles.dateContainer}>
            <View style={styles.dateField}>
              <Text style={styles.formLabel}>From Date</Text>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowFromDatePicker(true)}
              >
                <Text style={styles.dateButtonText}>{formatDate(dateFrom)}</Text>
              </TouchableOpacity>
              {showFromDatePicker && (
                <DateTimePicker
                  value={dateFrom}
                  mode="date"
                  display="default"
                  onChange={onDateFromChange}
                  minimumDate={new Date()}
                />
              )}
            </View>

            <View style={styles.dateField}>
              <Text style={styles.formLabel}>To Date</Text>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowToDatePicker(true)}
              >
                <Text style={styles.dateButtonText}>{formatDate(dateTo)}</Text>
              </TouchableOpacity>
              {showToDatePicker && (
                <DateTimePicker
                  value={dateTo}
                  mode="date"
                  display="default"
                  onChange={onDateToChange}
                  minimumDate={dateFrom}
                />
              )}
            </View>
          </View>

          <Text style={styles.formLabel}>Price Per Hour/Acre</Text>
          <TextInput
            style={styles.input}
            value={pricePerHourOrAcre}
            onChangeText={setPricePerHourOrAcre}
            placeholder="Enter price per hour/acre"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />

          <Text style={styles.formLabel}>Total Price</Text>
          <TextInput
            style={styles.input}
            value={totalPrice}
            onChangeText={setTotalPrice}
            placeholder="Enter total price"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />

          <TouchableOpacity
            style={styles.placeOrderButton}
            onPress={handlePlaceOrder}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.placeOrderButtonText}>Place Order</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollViewContent: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 40, // To offset the back button and center the title
    color: '#333',
  },
  formContainer: {
    padding: 20,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    width: '100%',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  dateField: {
    width: '48%',
  },
  dateButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  dateButtonText: {
    fontSize: 16,
    color: '#333',
  },
  placeOrderButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 30,
    width: '100%',
  },
  placeOrderButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
