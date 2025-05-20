import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';


export default function Registration() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');

  return (
    <View style={styles.container}>

      <View style={styles.logoContainer}>
        <Image
          source={require('../assests/images/mainlogo.png')} // Adjust path if necessary
          style={styles.logoDesign}
        />
        <Text style={styles.heading}>Login / Registration Page</Text>
      </View>
     

      <TextInput
        style={styles.input}
        placeholder="Enter your Name"
        placeholderTextColor='grey'
        value={name}
        onChangeText={setName}
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Gender" value="" color='grey' />
          <Picker.Item label="Male" value="male" color='black' />
          <Picker.Item label="Female" value="female" color='black' />
          <Picker.Item label="Other" value="other" color='black' />
        </Picker>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (!name.trim() || !gender) {
            alert('Please enter your name and select gender');
            return;
          } else {
            navigation.navigate('Location');
          }


        }}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
  },
  input: {
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: '#2E7D32',
    fontSize: 16,
    marginBottom: 20,
    paddingHorizontal: 10,
    marginTop:'20'
  },
  pickerContainer: {
    borderBottomWidth: 2,
    borderBottomColor: '#2E7D32',
    marginBottom: 40,
  },
  picker: {
    height: 50,
  },
  button: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  logoDesign: {
    width: width * 0.35,
    height: width * 0.35,
    resizeMode: 'contain',
  },
  heading: {
    fontSize: 22,
    marginTop: 10,
    color: '#333',
    fontWeight: 'bold',
  }
});