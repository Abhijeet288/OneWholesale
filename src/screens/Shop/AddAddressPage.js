import React from 'react';
import { useNavigation } from '@react-navigation/native';
import AddressScreen from '../../components/AddressScreen';

export default function AddAddressPage() {
  const navigation = useNavigation();

  const handleFormSubmit = (data) => {
    console.log("Data from AddAddressPage", data);
    navigation.navigate('MyCartScreen'); // Navigate to a different screen
  };

  return <AddressScreen onSubmit={handleFormSubmit} />;
}
