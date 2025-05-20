import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  ScrollView,
} from 'react-native';
import Loader from '../components/Loader'; // Adjust the path if needed

export default function LocationManual() {
  const navigation = useNavigation();
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [block, setBlock] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pincode, setPincode] = useState('');
  const [phone, setPhone] = useState('');
  const [altContact, setAltContact] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});
  const [activeHome, setActiveHome] = useState(1);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!state.trim()) newErrors.state = 'State is required.';
    if (!district.trim()) newErrors.district = 'District is required.';
    if (!block.trim()) newErrors.block = 'Block is required.';
    if (!landmark.trim()) newErrors.landmark = 'Landmark is required.';
    if (!pincode.trim()) {
      newErrors.pincode = 'Pincode is required.';
    } else if (!/^\d{6}$/.test(pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateHome2 = () => {
    const newErrors = {};
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = 'Phone number must be 10 digits.';
    }
    if (altContact.trim() && !/^\d{10}$/.test(altContact)) {
      newErrors.altContact = 'Alternate contact must be 10 digits.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
  if (activeHome === 1) {
    if (validate()) {
      setActiveHome(2);
    }
  } else {
    if (validateHome2()) {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 3000)); 
        const payload = {
          state,
          district,
          block,
          landmark,
          pincode,
          phone,
          altContact,
          notes,
        };
        navigation.navigate('MainApp');
      } 
      finally {
        setLoading(false);
      }
    }
  }
};


  return (
    <View style={styles.background}>
      <Loader visible={loading} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <Image
            source={require('../assests/images/mainlogo.png')}
            style={styles.logo}
          />

          <View style={styles.homeButtons}>
            {[1, 2].map((num) => (
              <TouchableOpacity
                key={num}
                style={[
                  styles.homeButton,
                  activeHome === num && styles.activeHomeButton,
                ]}
                onPress={() => setActiveHome(num)}
              >
                <Text
                  style={[
                    styles.homeButtonText,
                    activeHome === num && styles.activeHomeButtonText,
                  ]}
                >
                  Home {num}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.form}>
            {activeHome === 1 ? (
              <>
                {[
                  { label: 'State', value: state, setter: setState, key: 'state' },
                  { label: 'District', value: district, setter: setDistrict, key: 'district' },
                  { label: 'Block', value: block, setter: setBlock, key: 'block' },
                  { label: 'Nearest Land Mark', value: landmark, setter: setLandmark, key: 'landmark' },
                  {
                    label: 'Pin code', value: pincode, setter: setPincode, key: 'pincode', keyboardType: 'numeric',
                  },
                ].map(({ label, value, setter, key, keyboardType }) => (
                  <View key={key} style={styles.inputContainer}>
                    <Text style={styles.label}>{label}</Text>
                    <TextInput
                      style={[
                        styles.input,
                        errors[key] && { borderColor: '#f44336' },
                      ]}
                      value={value}
                      onChangeText={text => setter(text)}
                      placeholder={`Enter ${label.toLowerCase()}`}
                      keyboardType={keyboardType || 'default'}
                      placeholderTextColor="#888"
                    />
                    {errors[key] && (
                      <Text style={styles.errorText}>{errors[key]}</Text>
                    )}
                  </View>
                ))}
              </>
            ) : (
              <>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Phone Number</Text>
                  <TextInput
                    style={[styles.input, errors.phone && { borderColor: '#f44336' }]}
                    placeholder="Enter phone number"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                    placeholderTextColor="#888"
                  />
                  {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Alternate Contact</Text>
                  <TextInput
                    style={[styles.input, errors.altContact && { borderColor: '#f44336' }]}
                    placeholder="Enter alternate contact"
                    keyboardType="phone-pad"
                    value={altContact}
                    onChangeText={setAltContact}
                    placeholderTextColor="#888"
                  />
                  {errors.altContact && (
                    <Text style={styles.errorText}>{errors.altContact}</Text>
                  )}
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Others</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Optional notes"
                    value={notes}
                    onChangeText={setNotes}
                    placeholderTextColor="#888"
                  />
                </View>
              </>
            )}

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>
                {activeHome === 1 ? 'Save & Next' : 'Submit'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    paddingTop: height * 0.04,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
  },
  logo: {
    width: width * 0.4,
    height: width * 0.25,
    alignSelf: 'center',
    marginBottom: height * 0.03,
  },
  homeButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: height * 0.03,
  },
  homeButton: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 6,
    backgroundColor: '#8BC34A',
  },
  activeHomeButton: {
    backgroundColor: '#689F38',
  },
  homeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  activeHomeButtonText: {
    fontWeight: '600',
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E7D32',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
    color: 'black',
  },
  errorText: {
    color: '#f44336',
    fontSize: 14,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});
