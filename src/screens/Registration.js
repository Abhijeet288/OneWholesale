import { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../Contexts/UserContext';
import { useAddress } from '../Contexts/AddressContext';

export default function Registration() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const { setUser } = useContext(UserContext);
  const {setTempFarmerName}=useAddress();
  const handleContinue = () => {
    if (!name.trim() || !lastName.trim() || !gender) {
      alert('Please enter your Full name and select gender !!');
      return;
    }
    setUser(prev => ({
      ...prev,
      name,
      gender,
    }));
    setTempFarmerName(name);
    console.log('Set name to context:', name);

    navigation.navigate('Location');
  };


  const getAlphabetValid=(text)=>{
    return text.replace(/[^A-Za-z]/g, '')
  }
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assests/images/mainlogo.png')}
          style={styles.logoDesign}
        />
        <Text style={styles.heading}>Registration Page</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter your First Name"
        placeholderTextColor="grey"
        value={name}
        onChangeText={(text)=>setName(getAlphabetValid(text))}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your Last Name"
        value={lastName}
        onChangeText={(text)=>setLastName(getAlphabetValid(text))}
        placeholderTextColor="#999"
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
          style={styles.picker}
          dropdownIconColor="black"
        >
          <Picker.Item label="Select Gender" value="" color="grey" />
          <Picker.Item label="Male" value="male" color="black" />
          <Picker.Item label="Female" value="female" color="black" />
          <Picker.Item label="Other" value="other" color="black" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const { width,height } = Dimensions.get('window');
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
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 10,
  fontSize: 16,
  paddingHorizontal: 15,
  marginBottom: 20,
  backgroundColor: '#f9f9f9',
},
  pickerContainer: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 10,
  marginBottom: 40,
  overflow: 'hidden',
  backgroundColor: '#f9f9f9',
},

  pickerContainer: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 10,
  marginBottom: 40,
  overflow: 'hidden',
  backgroundColor: '#f9f9f9',
},
picker: {
  height: 50,
  width: '100%',
  
},

  button: {
    backgroundColor: '#4CAF50',
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
    // width: width * 0.5,
    // height: height * 0.25,
    alignItems: 'center',
    justifyContent:'center',
    marginTop: 20,
    marginBottom:30
    // backgroundColor:'red'
  },

  logoDesign: {
    height: width * 0.45,
    resizeMode: 'contain',
    // backgroundColor:'red'

  },
  heading: {
    fontSize: 22,
    marginTop: 10,
    color: '#333',
    fontWeight: 'bold',
  }
});