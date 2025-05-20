// ShopNowScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MyCartScreen() {
  return (
    <View style={styles.container}>
      <Text>Cart Now Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
