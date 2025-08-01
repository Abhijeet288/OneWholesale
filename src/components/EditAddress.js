import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function EditAddress() {
  const navigation = useNavigation();
  const route = useRoute();
  const { user, location, ids } = route.params;

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [form, setForm] = useState(location);
  const [errors, setErrors] = useState({});

  // Dropdowns
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [blocks, setBlocks] = useState([]);

  const [stateOpen, setStateOpen] = useState(false);
  const [districtOpen, setDistrictOpen] = useState(false);
  const [blockOpen, setBlockOpen] = useState(false);

  const [selectedState, setSelectedState] = useState(ids.stateID);
  const [selectedDistrict, setSelectedDistrict] = useState(ids.districtID);
  const [selectedBlock, setSelectedBlock] = useState(ids.blockID);

  // Validation
  const validateFields = () => {
    const tempErrors = {};
    if (!firstName.trim()) tempErrors.firstName = 'First name is required.';
    if (!lastName.trim()) tempErrors.lastName = 'Last name is required.';
    if (!selectedState) tempErrors.state = 'State is required.';
    if (!selectedDistrict) tempErrors.district = 'District is required.';
    if (!selectedBlock) tempErrors.block = 'Block is required.';
    if (!form.village?.trim()) tempErrors.village = 'Village is required.';
    if (!form.landmark?.trim()) tempErrors.landmark = 'Landmark is required.';
    if (!form.pincode?.trim()) {
      tempErrors.pincode = 'Pincode is required.';
    } else if (!/^\d{6}$/.test(form.pincode)) {
      tempErrors.pincode = 'Pincode must be exactly 6 digits.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateFields()) return;

    const payload = {
      userID: ids.userID,
      stateID: selectedState,
      districtID: selectedDistrict,
      blockID: selectedBlock,
      pinCode: parseInt(form.pincode),
      updatedBy: ids.updatedBy,
    };

    try {
      const response = await fetch(
        // 'http://10.0.2.2:5220/api/Registration/User/UpdateUserAddress',
        'http://192.168.29.21:5220/api/Registration/User/UpdateUserAddress',

        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error('Failed to update address');

      Alert.alert('Success', 'Address updated successfully!');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update address');
    }
  };

  // Fetch dropdowns
  useEffect(() => {
    fetchStates();
  }, []);

  useEffect(() => {
  console.log('Selected State:', selectedState);
  if (selectedState) fetchDistricts(selectedState);
}, [selectedState]);

  useEffect(() => {
    if (selectedDistrict) fetchBlocks(selectedDistrict);
  }, [selectedDistrict]);

  const fetchStates = async () => {
    try {
      const res = await fetch(
        // 'http://10.0.2.2:5220/api/Location/states'
        'http://192.168.29.21:5220/api/Location/states'

      );
      const data = await res.json();
      setStates(
        data.map((item, index) => ({
          label: item.stateName ?? `State-${index}`,
          value: item.stateID ?? `state-${index}`, // fallback to string id
        }))
      );
    } catch (err) {
      console.error('Error fetching states:', err);
    }
  };

 const fetchDistricts = async (stateId) => {
  if (!stateId || typeof stateId !== 'number') {
    console.warn('Invalid stateId passed to fetchDistricts:', stateId);
    setDistricts([]);
    return;
  }

  try {
    const res = await fetch(
      // `http://10.0.2.2:5220/api/Location/districts/${stateId}`
      `http://192.168.29.21:5220/api/Location/districts/${stateId}`

    );
    const data = await res.json();

    if (!Array.isArray(data)) {
      console.error('Expected districts array but got:', data);
      setDistricts([]);
      return;
    }

    setDistricts(
      data.map((item, index) => ({
        label: item.districtName ?? `District-${index}`,
        value: item.districtID ?? `district-${index}`,
      }))
    );
  } catch (err) {
    console.error('Error fetching districts:', err);
  }
};

  const fetchBlocks = async (districtId) => {
    try {
      const res = await fetch(
        // `http://10.0.2.2:5220/api/Location/blocks/${districtId}`
        `http://192.168.29.21:5220/api/Location/blocks/${districtId}`

      );
      const data = await res.json();
      setBlocks(
        data.map((item, index) => ({
          label: item.blockName ?? `Block-${index}`,
          value: item.blockID ?? `block-${index}`, // fallback to string id
        }))
      );
    } catch (err) {
      console.error('Error fetching blocks:', err);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <FlatList
        ListHeaderComponent={
          <View>
            <Text style={styles.heading}>Edit Your Address</Text>

            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
            />
            {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
            />
            {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={[styles.input, { backgroundColor: '#eee' }]}
              value={user.phoneNumber}
              editable={false}
            />

            <Text style={styles.label}>State</Text>
            <DropDownPicker
              open={stateOpen}
              value={selectedState}
              items={states}
              setOpen={setStateOpen}
              setValue={(callback) => {
                const val = typeof callback === 'function' ? callback(selectedState) : callback;
                setSelectedState(val);
              }}
              setItems={setStates}
              placeholder="Select State"
              listMode="MODAL"
              style={styles.dropdown}
              zIndex={3000}
            />
            {errors.state && <Text style={styles.errorText}>{errors.state}</Text>}

            <Text style={styles.label}>District</Text>
            <DropDownPicker
              open={districtOpen}
              value={selectedDistrict}
              items={districts}
              setOpen={setDistrictOpen}
              setValue={(callback) => {
                const val = typeof callback === 'function' ? callback(selectedDistrict) : callback;
                setSelectedDistrict(val);
              }}
              setItems={setDistricts}
              placeholder="Select District"
              listMode="MODAL"
              style={styles.dropdown}
              zIndex={2000}
            />
            {errors.district && <Text style={styles.errorText}>{errors.district}</Text>}

            <Text style={styles.label}>Block</Text>
            <DropDownPicker
              open={blockOpen}
              value={selectedBlock}
              items={blocks}
              setOpen={setBlockOpen}
              setValue={(callback) => {
                const val = typeof callback === 'function' ? callback(selectedBlock) : callback;
                setSelectedBlock(val);
              }}
              setItems={setBlocks}
              placeholder="Select Block"
              listMode="MODAL"
              style={styles.dropdown}
              zIndex={1000}
            />
            {errors.block && <Text style={styles.errorText}>{errors.block}</Text>}

            <Text style={styles.label}>Village</Text>
            <TextInput
              style={styles.input}
              value={form.village}
              onChangeText={(text) => setForm({ ...form, village: text })}
            />
            {errors.village && <Text style={styles.errorText}>{errors.village}</Text>}

            <Text style={styles.label}>Landmark</Text>
            <TextInput
              style={styles.input}
              value={form.landmark}
              onChangeText={(text) => setForm({ ...form, landmark: text })}
            />
            {errors.landmark && <Text style={styles.errorText}>{errors.landmark}</Text>}

            <Text style={styles.label}>Pincode</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={form.pincode}
              onChangeText={(text) => {
                if (/^\d{0,6}$/.test(text)) {
                  setForm({ ...form, pincode: text });
                }
              }}
            />
            {errors.pincode && <Text style={styles.errorText}>{errors.pincode}</Text>}

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Update Address</Text>
            </TouchableOpacity>
          </View>
        }
        data={[]} // required prop
        renderItem={null} // prevent rendering
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05,
    backgroundColor: '#f9f9f9',
  },
  heading: {
    fontSize: width * 0.055,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: width * 0.04,
    marginTop: 10,
    marginBottom: 4,
    fontWeight: '600',
    color: '#2E7D32',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  dropdown: {
    marginTop: 4,
    marginBottom: 10,
    borderColor: '#ccc',
  },
  errorText: {
    fontSize: width * 0.033,
    color: 'red',
    marginBottom: 8,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
