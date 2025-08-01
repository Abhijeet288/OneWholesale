import React, { useState, useContext, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  StyleSheet, SafeAreaView,Dimensions,Platform  
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { UserContext } from '../../Contexts/UserContext';

export default function EditPersonalDetails({ navigation }) {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');

useEffect(() => {
  if (user) {
    setName(`${user.firstName} ${user.lastName}`.trim());
    const normalizedGender =
      user.gender?.charAt(0).toUpperCase() + user.gender?.slice(1).toLowerCase();
    setGender(normalizedGender || '');
  }
}, [user]);


  const handleSave = () => {
    const [firstName, lastName] = name.trim().split(' ');
    setUser(prev => ({
      ...prev,
      firstName: firstName || '',
      lastName: lastName || '',
      gender,
    }));
    navigation.goBack();
  };

  const clearName = () => setName('');

  return (
    <SafeAreaView style={styles.safeArea}>
    
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.label}>Enter your Name</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your Name"
            placeholderTextColor='grey'
          />
          {name !== '' && (
            <TouchableOpacity onPress={clearName} style={styles.clearIcon}>
              <Icon name="close" size={20} color="gray" />
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.label}>Choose Your Gender</Text>
        <View style={styles.radioContainer}>
          {['Male', 'Female'].map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.radioBox, gender === item && styles.selected]}
              onPress={() => setGender(item)}
            >
              <View style={styles.circle}>
                {gender === item && <View style={styles.innerCircle} />}
              </View>
              <Text style={styles.radioText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}


const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: height * 0.08,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.04,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    marginLeft: width * 0.03,
  },
  scrollContent: {
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.02,
    paddingBottom: height * 0.15,
  },
  label: {
    fontSize: width * 0.04,
    marginTop: height * 0.02,
    marginBottom: height * 0.01,
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.04,
    backgroundColor: '#f3f3f3',
    paddingRight: width * 0.12,
    fontSize: width * 0.04,
  },
  clearIcon: {
    position: 'absolute',
    right: 10,
    top: Platform.OS === 'ios' ? height * 0.02 : height * 0.018,
  },
  radioContainer: {
    flexDirection: 'row',
    marginTop: height * 0.015,
    gap: width * 0.05,
    flexWrap: 'wrap',
  },
  radioBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.06,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    minWidth: width * 0.35,
    justifyContent: 'center',
  },
  selected: {
    borderColor: 'green',
  },
  circle: {
    height: width * 0.05,
    width: width * 0.05,
    borderRadius: (width * 0.05) / 2,
    borderWidth: 2,
    borderColor: '#666',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: width * 0.02,
  },
  innerCircle: {
    height: width * 0.025,
    width: width * 0.025,
    borderRadius: (width * 0.025) / 2,
    backgroundColor: 'green',
  },
  radioText: {
    fontSize: width * 0.04,
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: width * 0.04,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: height * 0.02,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
});
