import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const RentSector = () => {
  const navigation = useNavigation();

  const AllSector = [
    {
      sub: 'Tractor',
      uri: require('../../assests/rent/tractor.png'),
    },
    {
      sub: 'Harvestor',
      uri: require('../../assests/rent/harvestor.png'),
    },
    {
      sub: 'KissanDrones',
      uri: require('../../assests/rent/drones.jpg'),
    },
    {
      sub: 'Implements',
      // uri: require('../../assests/rent/powertillers.jpeg'),
    },
    
    {
      sub: 'Pumpset',
      uri: require('../../assests/rent/pumpset.jpeg'),
    },
    {
      sub: 'Pneumatic planter',
      // uri: require('../../assests/rent/gardentool.png'),
    },
  ];

  const handleSectorSelect = (sector) => {
    navigation.navigate('RentalRegistration',{sectorName:sector.sub})
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleSectorSelect(item)}
      activeOpacity={0.8}
    >
      <Image source={item.uri} style={styles.image} />
      <Text style={styles.langText}>{item.sub}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select your Sector</Text>
      <FlatList
        data={AllSector}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.flatListContainer}
        columnWrapperStyle={{ justifyContent: 'space-evenly' }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const cardWidth = width * 0.42;
const cardHeight = height * 0.22;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f5ec',
    paddingTop: height * 0.02,
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: height * 0.015,
    color: 'black',
  },
  flatListContainer: {
    paddingBottom: height * 0.03,
  },
  card: {
    width: cardWidth-20,
    height: cardHeight-30,
    borderRadius: 12,
    marginBottom: height * 0.025,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    backgroundColor: '#ffffff',
    padding: width * 0.025,
  },
  image: {
    width: '75%',
    height: '60%',
    resizeMode: 'contain',
    marginBottom: height * 0.015,
  },
  langText: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    flexWrap: 'wrap',
  },
});

export default RentSector;
