import React from 'react';
import { View, TextInput, StyleSheet, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

export default function SearchBar() {
  const paddingH = width * 0.04;
  const iconSize = width * 0.06;
  const fontSize = width * 0.045;
  const containerHeight = height * 0.065;

  return (
    <View style={[styles.searchContainer, { paddingHorizontal: paddingH, height: containerHeight }]}>
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
    backgroundColor: '#ebe6e4',
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    color: '#333',
  },
});

// Most used TextInput placeholder color is usually '#999' or '#A9A9A9'
