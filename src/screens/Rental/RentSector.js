// import { useNavigation } from '@react-navigation/native';
// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Dimensions,
//   Image,
//   FlatList,
//   ScrollView,
// } from 'react-native';

// const { width, height } = Dimensions.get('window');

// const RentSector = () => {
//   const navigation = useNavigation();

//   const AllSector = [
//     {
//       sub: 'Tractor',
//       uri: require('../../assests/rent/tractor.png'),
//     },
//     {
//       sub: 'Harvester',
//       uri: require('../../assests/rent/harvestor.png'),
//     },
//     {
//       sub: 'Drones',
//       uri: require('../../assests/rent/drones.jpg'),
//     },
//     {
//       sub: 'Implements',
//       uri: require('../../assests/rent/implements.png'),
//     },
    
//     {
//       sub: 'Pumpset',
//       uri: require('../../assests/rent/pumpset.jpeg'),
//     },
//     {
//       sub: 'Sprayer',
//       uri: require('../../assests/rent/sprayer.png'),
//     },
//     {
//       sub: 'Power Tillers',
//       uri: require('../../assests/rent/powertillers.jpeg'),
//     },
//     // {
//     //   sub: 'Others..',
//     //   // uri: require('../../assests/rent/gardentool.png'),
//     // },
//   ];

//   const handleSectorSelect = (sector) => {
//     // navigation.navigate('RentalRegistration',{sectorName:sector.sub})
//     navigation.navigate('RentalSubcategory' )
//   };

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       style={styles.card}
//       onPress={() => handleSectorSelect(item)}
//       activeOpacity={0.8}
//     >
//       <Image source={item.uri} style={styles.image} />
//       <Text style={styles.langText}>{item.sub}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Select your Sector</Text>
//       <FlatList
//         data={AllSector}
//         renderItem={renderItem}
//         keyExtractor={(item, index) => index.toString()}
//         numColumns={2}
//         contentContainerStyle={styles.flatListContainer}
//         columnWrapperStyle={{ justifyContent: 'space-evenly' }}
//         showsVerticalScrollIndicator={false}
        
//       />
//     </View>
//   );
// };

// const cardWidth = width * 0.42;
// const cardHeight = height * 0.22;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#e6f5ec',
//     paddingTop: height * 0.02,
//   },
//   title: {
//     fontSize: width * 0.06,
//     fontWeight: '800',
//     textAlign: 'center',
//     marginBottom: height * 0.015,
//     color: 'black',
//   },
//   flatListContainer: {
//     paddingBottom: height * 0.03,
//   },
//   card: {
//     width: cardWidth-20,
//     height: cardHeight-30,
//     borderRadius: 12,
//     marginBottom: height * 0.025,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 3,
//     backgroundColor: '#ffffff',
//     padding: width * 0.025,
//   },
//   image: {
//     width: '75%',
//     height: '60%',
//     resizeMode: 'contain',
//     marginBottom: height * 0.015,
//   },
//   langText: {
//     fontSize: width * 0.04,
//     fontWeight: 'bold',
//     color: 'black',
//     textAlign: 'center',
//     flexWrap: 'wrap',
//   },
// });

// export default RentSector;


import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const RentSector = () => {
  const navigation = useNavigation();
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRentalCategories();
  }, []);

  const fetchRentalCategories = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:5220/api/RentalEquipment/rentalCategory');
      setSectors(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSectorSelect = (sector) => {
    navigation.navigate('RentalSubcategory', { rCategoryID: sector.rCategoryID });

  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleSectorSelect(item)}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: item.rCategoryImage }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.langText}>{item.rCategoryName}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select your Sector</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : (
        <FlatList
          data={sectors}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={styles.flatListContainer}
          columnWrapperStyle={{ justifyContent: 'space-evenly' }}
          showsVerticalScrollIndicator={false}
        />
      )}
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
    width: cardWidth - 20,
    height: cardHeight - 30,
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
