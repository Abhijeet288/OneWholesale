import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import HomeCarousel from '../components/HomeCarousel';
import BodyGrid from '../components/BodyGrid';

export default function HomeContent() {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollView}>
        <SearchBar />
        <HomeCarousel />
        <BodyGrid />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
});
