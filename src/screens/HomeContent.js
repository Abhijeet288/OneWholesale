import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/HomeComponent/Header';
import SearchBar from '../components/HomeComponent/SearchBar';
import HomeCarousel from '../components/HomeComponent/HomeCarousel';
import BodyGrid from '../components/HomeComponent/BodyGrid';


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
    backgroundColor: '#e6f5ec', // Soft greenish background related to #b1e0cd
    // backgroundColor: '#d6f5e3', // Soft light green, complements #b1e0cd
  },
  scrollView: {
    flex: 1,
  },
});
