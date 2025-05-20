import React from 'react';
import { View, TextInput, StyleSheet, useWindowDimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SearchBar() {
  const { width } = useWindowDimensions();
  const paddingH = width * 0.04;
  const iconSize = width * 0.05;
  const fontSize = width * 0.045;

  return (
    <View style={[styles.searchContainer, { paddingHorizontal: paddingH }]}>
      <Ionicons name="search" size={iconSize} color="#666" />
      <TextInput
        style={[styles.searchInput, { fontSize }]}
        placeholder="Search for products, brands, etc."
        placeholderTextColor="#999"
      />
      <Ionicons name="mic" size={iconSize} color="#00BFA5" />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 8,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    color: '#333',
  },
});
