import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Platform,
  Alert
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import AddressDrawer from '../DrawerScreens/AddressDrawer';

const { width, height } = Dimensions.get('window');

export default function RentalRegistrationForm() {
  const navigation = useNavigation();
  const route = useRoute();
  const selectedSector = route.params?.sectorName ;
  const isDrone = selectedSector === 'KissanDrones';
  console.log('Selected Sector:', selectedSector);



  const [block, setBlock] = useState('');
  const [time, setTime] = useState('');
  const [land, setLand] = useState('');
  const [date, setDate] = useState('');

  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  // const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const onChangeDate = (event, selected) => {
    setShowDatePicker(false);
    if (selected) {
      const formattedDate = selected.toLocaleDateString('en-GB');
      setDate(formattedDate);
      setSelectedDate(selected);
    }
  };

 

  const validateFields = () => {
    const newErrors = {};
    if (!block) newErrors.block = 'Block is required';
    else if (!/^[A-Za-z\s]+$/.test(block)) newErrors.block = 'Block must contain only alphabets';
    if (isDrone) {
      if (!land) newErrors.land = "Land field is required"
    } else {
      if (!time) newErrors.time = 'Time is required'
    }
    if (!date) newErrors.date = 'Date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEnter = () => {
    if (validateFields()) {
      Alert.alert(
        'Confirm Submission',
        'Please check all details before proceeding.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Proceed',
            onPress: () => {
              setBlock('');
              setTime('');
              setLand('');
              setDate('');
              setErrors({});
              navigation.navigate(selectedSector); 
              // You can also navigate to a different screen or perform any other action here');
            }
          },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <><ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>User Registration Details</Text>

      {/* Block */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Block<Text style={styles.required}>*</Text>:
        </Text>
        <TextInput
          style={styles.input}
          value={block}
          onChangeText={setBlock}
          autoCapitalize="words"
          keyboardType="default"
          placeholder="Enter Block"
          placeholderTextColor={'#999'}
          maxLength={30}
          autoFocus
          returnKeyType="next" />
      </View>
      {errors.block && <Text style={styles.errorText}>{errors.block}</Text>}

      {!isDrone && (
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Time<Text style={styles.required}>*</Text>:
          </Text>
          <TextInput
            style={styles.input}
            value={time}
            onChangeText={setTime}
            placeholder="Enter time (e.g. 5 for 5 hour)"
            placeholderTextColor={'#999'}
            keyboardType="number-pad" />
        </View>
      )}
      {errors.time && !isDrone && <Text style={styles.errorText}>{errors.time}</Text>}

      {isDrone && (
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Land<Text style={styles.required}>*</Text>:
          </Text>
          <TextInput
            style={styles.input}
            value={land}
            onChangeText={setLand}
            placeholder="Enter Land ( in acres)"
            placeholderTextColor={'#999'} />
        </View>
      )}
      {errors.land && isDrone && <Text style={styles.errorText}>{errors.land}</Text>}

      {/* Date */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Date<Text style={styles.required}>*</Text>:
        </Text>
        <TouchableOpacity
          style={[styles.input, styles.touchableInput]}
          onPress={() => setShowDatePicker(true)}
        >
          <Text>{date || 'Select Date'}</Text>
          <Ionicons name="calendar" size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>
      {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChangeDate} />
      )}

      


      <TouchableOpacity style={styles.button} onPress={handleEnter}>
        <Text style={styles.buttonText}>Enter</Text>
      </TouchableOpacity>
    
    </ScrollView>

    <AddressDrawer />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: height * 0.05,
    height:0,
    paddingHorizontal: width * 0.05,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    flexGrow: 1,
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    marginBottom: height * 0.03,
    color: '#333',
    textAlign: 'center',
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.02,
    width: '100%',
  },
  label: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    width: '30%',
  },
  required: {
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: '#5cb85c',
    borderRadius:8,
    padding: 10,
    width: '65%',
    backgroundColor: '#fff',
  },
  touchableInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: width * 0.03,
    marginBottom: 5,
    marginLeft: '30%',
    textAlign: 'left',
    width: '70%',
  },
  button: {
    marginTop: height * 0.03,
    backgroundColor: '#5cb85c',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.045,
    textAlign: 'center',
  },
});
