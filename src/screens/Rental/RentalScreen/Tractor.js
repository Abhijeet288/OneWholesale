import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';



const Tractor = () => {
  const navigation = useNavigation();
  const tractors = [
    {
      name: 'Mahindra 265 DI',
      model: '2023 Model',
      location: 'Lucknow, Uttar Pradesh',
      rent: '750.00',
      minHours: 1,
      image: require('../../../assests/rent/tractor.png'), // update with correct image path
    },
    {
      name: 'Sonalika 745 DI III Sikander',
      model: '2025 Model',
      location: 'Lucknow, Uttar Pradesh',
      rent: '840.00',
      minHours: 1,
      image: require('../../../assests/rent/tractor.png'), // update with correct image path
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {tractors.map((item, index) => (
        <View key={index} style={styles.card}>
          <Image source={item.image} style={styles.image} resizeMode="cover" />
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.subtitle}>{item.model}  |  {item.location}</Text>
          <View style={styles.rentContainer}>
            <Text style={styles.rent}>Rent – ₹{item.rent}/Hour</Text>
            <Text style={styles.subrent}>Minimum {item.minHours} Hour</Text>
            <Text style={styles.subrent}>Available in your Area*</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RentalRegistration')}>
            <Text style={styles.buttonText}>Rent Now</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginVertical: 4,
  },
  rentContainer: {
    backgroundColor: '#f0f8f5',
    padding: 8,
    borderRadius: 6,
    marginVertical: 6,
  },
  rent: {
    fontSize: 16,
    color: '#333',
  },
  subrent: {
    fontSize: 13,
    color: '#666',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#0066cc',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Tractor;








// import { useNavigation } from '@react-navigation/native';
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   ActivityIndicator,
// } from 'react-native';

// const Tractor = () => {
//   const navigation = useNavigation();
//   const [tractors, setTractors] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const BASE_MEDIA_URL = 'http://localhost:5220'; // Update if you're using emulator
//   const API_URL = `${BASE_MEDIA_URL}/api/Rental/Tractors`; // Example endpoint

//   useEffect(() => {
//     const fetchTractors = async () => {
//       try {
//         const response = await fetch(API_URL);
//         const data = await response.json();
//         setTractors(data);
//       } catch (error) {
//         console.error('Error fetching tractors:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTractors();
//   }, []);

//   if (loading) {
//     return <ActivityIndicator size="large" color="#0066cc" style={{ marginTop: 50 }} />;
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {tractors.map((item, index) => (
//         <View key={index} style={styles.card}>
//           <Image
//             source={{ uri: `${BASE_MEDIA_URL}${item.uploadImage}` }}
//             style={styles.image}
//             resizeMode="cover"
//           />
//           <Text style={styles.title}>{item.companyName} {item.rsCategoryName}</Text>
//           <Text style={styles.subtitle}>
//             {item.modelName} ({item.purchaseYear})
//           </Text>
//           <Text style={styles.subtitle}>
//             Power: {item.power} HP | Sprayer: {item.sprayerType} ({item.sprayerCapacity} L)
//           </Text>
//           <View style={styles.rentContainer}>
//             <Text style={styles.rent}>Rent – ₹{item.rentPerHourAcre}/Hour</Text>
//             <Text style={styles.subrent}>Minimum 1 Hour</Text>
//             <Text style={styles.subrent}>Available in your Area*</Text>
//           </View>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => navigation.navigate('RentalRegistration')}
//           >
//             <Text style={styles.buttonText}>Rent Now</Text>
//           </TouchableOpacity>
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     alignItems: 'center',
//   },
//   card: {
//     width: '90%',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 12,
//     marginBottom: 20,
//     elevation: 4,
//   },
//   image: {
//     width: '100%',
//     height: 160,
//     borderRadius: 8,
//     backgroundColor: '#eee',
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 8,
//   },
//   subtitle: {
//     fontSize: 14,
//     color: '#555',
//     marginVertical: 2,
//   },
//   rentContainer: {
//     backgroundColor: '#f0f8f5',
//     padding: 8,
//     borderRadius: 6,
//     marginVertical: 6,
//   },
//   rent: {
//     fontSize: 16,
//     color: '#333',
//   },
//   subrent: {
//     fontSize: 13,
//     color: '#666',
//   },
//   button: {
//     marginTop: 10,
//     backgroundColor: '#0066cc',
//     paddingVertical: 10,
//     borderRadius: 6,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default Tractor;
