
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import  Ionicons  from 'react-native-vector-icons/Ionicons'; 

const CustomHeader = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={{ height: 60, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, backgroundColor: '#fff', elevation: 4 }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 16 }}>{title}</Text>
    </View>
  );
};

export default CustomHeader;
