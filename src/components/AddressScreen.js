import React, { useCallback, useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAddress } from '../Contexts/AddressContext';
import { UserContext } from '../Contexts/UserContext';

const { width, height } = Dimensions.get('window');
const wp = (percentage) => (width * percentage) / 100;
const hp = (percentage) => (height * percentage) / 100;

const AddressScreen = () => {
  const navigation = useNavigation();
  const { addAddress, editAddress, editingAddress, setEditingAddress } = useAddress();
  const { user } = useContext(UserContext);

  const [error, setError] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [hasInteracted, setHasInteracted] = useState(false);

  const [formData, setFormData] = useState({
    farmerName: '',
    farmerPhone: '',
    farmerAddress: '',
    houseNameArea: '',
    landmark: '',
    pincode: '',
    block: '',
    village: '',
    district: '',
    state: '',
  });

  useEffect(() => {
    if (editingAddress) {
      setFormData((prev) => ({
        ...prev,
        ...editingAddress,
        farmerName: editingAddress.farmerName || user?.name || '',
      }));
    }
  }, [editingAddress]);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFieldBlur = (field) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
    setHasInteracted(true);
  };

  const validateForm = useCallback((data) => {
    const phoneRegex = /^[0-9]{10}$/;
    const pincodeRegex = /^[0-9]{6}$/;
    const alphabetRegex = /^[A-Za-z\s]+$/;
    const newError = {};

    const validateAlphabetField = (key, label) => {
      const value = data[key]?.trim();
      if (!value) newError[key] = `${label} is required`;
      else if (!alphabetRegex.test(value)) newError[key] = `${label} should contain only alphabets`;
    };

    validateAlphabetField('farmerName', 'Farmer name');
    validateAlphabetField('block', 'Block');
    validateAlphabetField('district', 'District');
    validateAlphabetField('state', 'State');
    validateAlphabetField('village', 'Village');

    if (!data.farmerPhone?.trim()) newError.farmerPhone = 'Farmer phone number is required';
    else if (!phoneRegex.test(data.farmerPhone)) newError.farmerPhone = 'Invalid phone number';

    if (!data.pincode?.trim()) newError.pincode = 'Pincode is required';
    else if (!pincodeRegex.test(data.pincode)) newError.pincode = 'Invalid pincode';

    return newError;
  }, []);

  useEffect(() => {
    const errors = validateForm(formData);
    setError(errors);
  }, [formData, validateForm]);

  const shouldShowError = (field) => hasInteracted && touchedFields[field] && error[field];

  const handleFormSubmit = () => {
    const allFieldsTouched = Object.keys(formData).reduce((acc, field) => ({ ...acc, [field]: true }), {});
    setTouchedFields(allFieldsTouched);

    const errors = validateForm(formData);
    setError(errors);
    const isValid = Object.keys(errors).length === 0;

    if (!isValid) {
      alert("Please fill all required fields correctly.");
      return;
    }

    const finalForm = {
      ...formData,
      farmerName: formData.farmerName?.trim() || user?.name || '',
    };

    if (editingAddress) {
      editAddress(editingAddress.index, finalForm);
      setEditingAddress(null);
    } else {
      addAddress(finalForm);
    }

    alert("Address saved successfully!");
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardAvoid}>
        <ScrollView
          style={styles.scrollContent}
          contentContainerStyle={styles.scrollContentContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionTitle}>Receiver's detail</Text>

          {[
            ['farmerName', "Farmer's Name"],
            ['farmerPhone', "Farmer's Phone number"],
            ['farmerAddress', "Farmer's Address"],
            ['houseNameArea', "House Name, Area"],
            ['landmark', 'Landmark (Optional)'],
            ['pincode', 'Pincode'],
            ['block', 'Block'],
            ['village', 'Village'],
            ['district', 'District'],
            ['state', 'State'],
          ].map(([key, label]) => (
            <View style={styles.inputContainer} key={key}>
              <Text style={styles.label}>
                {label} {key !== 'landmark' && <Text style={styles.required}>*</Text>}
              </Text>
              <TextInput
                style={styles.input}
                value={formData[key]}
                onChangeText={(text) => updateField(key, text)}
                onBlur={() => handleFieldBlur(key)}
                placeholder={`Enter ${label.toLowerCase()}`}
                placeholderTextColor="#999"
                keyboardType={key === 'farmerPhone' || key === 'pincode' ? 'numeric' : 'default'}
                maxLength={key === 'farmerPhone' ? 10 : key === 'pincode' ? 6 : undefined}
              />
              {shouldShowError(key) && <Text style={styles.errorText}>{error[key]}</Text>}
            </View>
          ))}

          <View style={styles.bottomPadding} />
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleFormSubmit}>
          <Text style={styles.saveButtonText}>
            {editingAddress ? 'Update and Proceed' : 'Save and Proceed'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
  },
  sectionTitle: {
    fontSize: wp(5),
    fontWeight: '700',
    marginBottom: hp(2),
    color: '#333',
  },
  inputContainer: {
    marginBottom: hp(2),
  },
  label: {
    fontSize: wp(3.8),
    marginBottom: 5,
    color: '#555',
  },
  required: {
    color: 'red',
  },
  input: {
    height: hp(6.5),
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: wp(4),
    fontSize: wp(4),
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  errorText: {
    color: 'red',
    fontSize: wp(3),
    marginTop: hp(0.5),
    marginLeft: wp(1),
  },
  bottomPadding: {
    height: hp(25),
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: wp(5),
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    height: hp(6.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: wp(4),
    fontWeight: '600',
  },
});

export default AddressScreen;
