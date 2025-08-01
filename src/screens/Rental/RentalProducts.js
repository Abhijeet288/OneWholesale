// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   StyleSheet,
//   ActivityIndicator,
//   Dimensions,
//   TouchableOpacity,
// } from 'react-native';
// import { useRoute, useNavigation } from '@react-navigation/native';

// const { width } = Dimensions.get('window');

// const RentalProducts = () => {
//   const [rentalProducts, setRentalProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const route = useRoute();
//   const navigation = useNavigation();

//   // Assumes previous screen passed subcategoryId as param
//   const { subCategoryId } = route.params;

//   useEffect(() => {
//     if (subCategoryId) {
//       fetchRentalProducts();
//     }
//   }, [subCategoryId]);

//   const fetchRentalProducts = async () => {
//     try {
//       const response = await fetch('http://10.0.2.2:5220/api/RentalEquipment/rentalProducts');
//       const data = await response.json();

//       // Filter products based on subCategoryId
//       const filteredProducts = data.filter(
//         (item) => item.rsCategoryName === subCategoryId // adjust this if needed
//       );

//       setRentalProducts(filteredProducts);
//     } catch (error) {
//       console.error('Error fetching rental products:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderProductCard = ({ item }) => (
//     <TouchableOpacity
//       style={styles.card}
//       onPress={() => navigation.navigate('RentalRegistration', { product: item })}
//     >
//       <Image
//         // source={{ uri: `http://10.0.2.2:5220/wwwroot/uploadRental/${item.uploadImage}` }}
//         style={styles.image}
//       />
//       <View style={styles.details}>
//         <Text style={styles.name}>{item.companyName} - {item.modelName}</Text>
//         <Text>Year: {item.purchaseYear}</Text>
//         <Text>Rent/hour/acre: ₹{item.rentPerHourAcre}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   if (loading) {
//     return <ActivityIndicator size="large" color="#007BFF" style={{ marginTop: 50 }} />;
//   }

//   if (rentalProducts.length === 0) {
//     return (
//       <View style={styles.emptyContainer}>
//         <Text style={styles.emptyText}>No rental products found.</Text>
//       </View>
//     );
//   }

//   return (
//     <FlatList
//       data={rentalProducts}
//       keyExtractor={(item, index) => index.toString()}
//       renderItem={renderProductCard}
//       contentContainerStyle={styles.list}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   list: {
//     padding: 10,
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     marginBottom: 15,
//     elevation: 3,
//     flexDirection: 'row',
//     overflow: 'hidden',
//   },
//   image: {
//     width: width * 0.3,
//     height: width * 0.3,
//   },
//   details: {
//     flex: 1,
//     padding: 10,
//   },
//   name: {
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   emptyContainer: {
//     marginTop: 60,
//     alignItems: 'center',
//   },
//   emptyText: {
//     fontSize: 16,
//     color: 'gray',
//   },
// });

// export default RentalProducts;




//"submit" to navigate to the rentalregistration


import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Loader from '../../components/Loader';

const { width, height } = Dimensions.get('window');

const RentalProducts = () => {
  const [rentalProducts, setRentalProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState('');

  const route = useRoute();
  const navigation = useNavigation();

  // Get subCategoryID from the previous screen (RentalSubcategory)
  const { subCategoryID } = route.params;

  useEffect(() => {
    if (subCategoryID) {
      fetchRentalProducts();
    } else {
      setLoading(false);
      Alert.alert('Error', 'Subcategory ID not found');
    }
  }, [subCategoryID]);

  const fetchRentalProducts = async () => {
    navigation.navigate('RentalRegistration')
    try {
      setLoading(true);
      console.log(`Fetching rental products for subcategory ID: ${subCategoryID}`);
      
      // Clear previous products when fetching new ones
      setRentalProducts([]);
      
      const response = await axios.get(
        `http://10.0.2.2:5220/api/RentalEquipment/rentalProducts/${subCategoryID}`
      );
      
      console.log('API Response:', response.data);
      
      if (response.data && Array.isArray(response.data)) {
        setRentalProducts(response.data);
        // Set category name from first product if available
        if (response.data.length > 0) {
          setCategoryName(response.data[0].rsCategoryName || '');
        }
        console.log(`Found ${response.data.length} rental products for subcategory ${subCategoryID}`);
      } else {
        setRentalProducts([]);
        console.warn('Invalid response format or empty data:', response.data);
      }
    } catch (error) {
      console.error(`Error fetching rental products for subcategory ${subCategoryID}:`, error);
      
      // Detailed error handling
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
        Alert.alert(
          'Server Error', 
          `Failed to fetch rental products. Server returned ${error.response.status}`
        );
      } else if (error.request) {
        console.error('No response received:', error.request);
        Alert.alert(
          'Network Error', 
          'No response from server. Please check your connection.'
        );
      } else {
        console.error('Request setup error:', error.message);
        Alert.alert('Error', 'Failed to fetch rental products.');
      }
      
      setRentalProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleProductPress = (product) => {
    navigation.navigate('RentalRegistration', { product });
  };

  const renderSpecialFields = (item) => {
    const categoryName = item.rsCategoryName?.toLowerCase() || '';
    
    // Show power for tractor, pumpset, powertillers
    if (categoryName.includes('tractor') || 
        categoryName.includes('pumpset') || 
        categoryName.includes('powertiller')) {
      return (
        <Text style={styles.detailText}>
          Power: {item.power || 'N/A'} HP
        </Text>
      );
    }
    
    // Show sprayer details for sprayer
    if (categoryName.includes('sprayer')) {
      return (
        <View>
          <Text style={styles.detailText}>
            Type: {item.sprayerType || 'N/A'}
          </Text>
          <Text style={styles.detailText}>
            Capacity: {item.sprayerCapacity || 'N/A'} L
          </Text>
        </View>
      );
    }
    
    return null;
  };

  const getRentLabel = (item) => {
    const categoryName = item.rsCategoryName?.toLowerCase() || '';
    
    // For drone, show rent per acre
    if (categoryName.includes('drone')) {
      return `Rent/Acre: ₹${item.rentPerHourAcre || 0}`;
    }
    
    // For others, show rent per hour
    return `Rent/Hour: ₹${item.rentPerHourAcre || 0}`;
  };

  const renderProductCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleProductPress(item)}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ 
            uri: item.uploadImage 
              ? `http://10.0.2.2:5220/wwwroot/uploadRental/${item.uploadImage}`
              : 'https://via.placeholder.com/120x120?text=No+Image'
          }}
          style={styles.image}
          resizeMode="cover"
          onError={() => console.log('Image failed to load:', item.uploadImage)}
        />
      </View>
      
      <View style={styles.details}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.companyName} numberOfLines={1}>
            {item.companyName || 'Unknown Company'}
          </Text>
          
          <Text style={styles.modelName} numberOfLines={1}>
            {item.modelName || 'Unknown Model'}
          </Text>
          
          <Text style={styles.detailText}>
            Year: {item.purchaseYear || 'N/A'}
          </Text>
          
          {renderSpecialFields(item)}
          
          <View style={styles.rentContainer}>
            <Text style={styles.rentText}>
              {getRentLabel(item)}
            </Text>
          </View>
        </ScrollView>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        No rental products available for this category
      </Text>
      <TouchableOpacity 
        style={styles.retryButton} 
        onPress={fetchRentalProducts}
      >
        <Text style={styles.retryText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );

  // if (loading) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <ActivityIndicator size="large" color="#4CAF50" />
  //       <Text style={styles.loadingText}>
  //         Loading rental products...
  //       </Text>
  //     </View>
  //   );
  // }


  if (loading) return <Loader visible={loading} />;

  return (
    <View style={styles.container}>
      {categoryName ? (
        <Text style={styles.header}>
          {categoryName} Rentals
        </Text>
      ) : null}
      
      <FlatList
        data={rentalProducts}
        keyExtractor={(item) => item.rentalProductID?.toString() || Math.random().toString()}
        renderItem={renderProductCard}
        contentContainerStyle={styles.list}
        ListEmptyComponent={renderEmptyComponent}
        showsVerticalScrollIndicator={false}
        key={`subcategory-${subCategoryID}`} // Force re-render when subcategory changes
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f5ec',
  },
  header: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    color: '#333',
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6f5ec',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  list: {
    padding: width * 0.04,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    marginBottom: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: 'row',
    overflow: 'hidden',
    minHeight: height * 0.18,
  },
  imageContainer: {
    width: width * 0.35,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  details: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  companyName: {
    fontWeight: 'bold',
    fontSize: width * 0.045,
    color: '#2E7D32',
    marginBottom: 4,
  },
  modelName: {
    fontSize: width * 0.04,
    color: '#333',
    fontWeight: '600',
    marginBottom: 8,
  },
  detailText: {
    fontSize: width * 0.035,
    color: '#666',
    marginBottom: 3,
    lineHeight: 18,
  },
  rentContainer: {
    backgroundColor: '#E8F5E8',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  rentText: {
    fontSize: width * 0.038,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
    marginTop: height * 0.2,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 40,
  },
  retryButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default RentalProducts;