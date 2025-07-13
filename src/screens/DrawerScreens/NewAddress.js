  import React from 'react';
import { useNavigation } from '@react-navigation/native';
import AddressScreen from '../../components/AddressScreen';

export default function NewAddress() {
  const navigation = useNavigation();

  const handleFormSubmit = (data) => {
    navigation.goBack(); 
  };

  return <AddressScreen onSubmit={handleFormSubmit} />;
}
