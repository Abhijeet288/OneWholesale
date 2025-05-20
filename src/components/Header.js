import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

export default function Header() {
  const navigation=useNavigation();
  const parentNavigation=navigation.getParent();
  const { width } = useWindowDimensions();
  const iconSize = width * 0.06;
  const smallFont = width * 0.035;
  const largeFont = width * 0.04;


  return (
    <View style={[styles.header, { padding: width * 0.04 }]}>
      <View style={styles.locationContainer}>
        <Ionicons name="location" size={iconSize} color="#FF6B00" />
        <View>
          <Text style={[styles.locationLabel, { fontSize: smallFont }]}>Your location</Text>
          <TouchableOpacity style={styles.locationButton}>
            <Text style={[styles.locationText, { fontSize: largeFont }]}></Text>
            <Ionicons name="chevron-down" size={iconSize * 0.8} color="#4CAF50" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.rightIcons}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={iconSize} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() =>navigation.openDrawer()}>
          <Ionicons name="person-circle-outline" size={iconSize} color="#666" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop:25
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  locationLabel: {
    color: '#666',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    color: '#4CAF50',
    fontWeight: '500',
  },
  rightIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    padding: 4,
  },
});
