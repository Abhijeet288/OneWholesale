import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

const { width } = Dimensions.get('window');

const RentalSubcategory = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { rCategoryID } = route.params;

  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (rCategoryID) {
      fetchSubCategories();
    } else {
      setLoading(false);
      Alert.alert('Error', 'Category ID not found');
    }
  }, [rCategoryID]); // This will re-run whenever rCategoryID changes

  const fetchSubCategories = async () => {
    try {
      setLoading(true);
      console.log(`Fetching subcategories for category ID: ${rCategoryID}`);
      
      // Clear previous subcategories when fetching new ones
      setSubCategories([]);
      
      const response = await axios.get(
        `http://10.0.2.2:5220/api/RentalEquipment/RentalSubCategory/${rCategoryID}`
      );
      
      console.log('API Response:', response.data);
      
      if (response.data && Array.isArray(response.data)) {
        setSubCategories(response.data);
        console.log(`Found ${response.data.length} subcategories for category ${rCategoryID}`);
      } else {
        setSubCategories([]);
        console.warn('Invalid response format or empty data:', response.data);
      }
    } catch (error) {
      console.error(`Error fetching subcategories for category ${rCategoryID}:`, error);
      
      // More detailed error handling
      if (error.response) {
        // Server responded with error status
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
        Alert.alert(
          'Server Error', 
          `Failed to fetch subcategories. Server returned ${error.response.status}`
        );
      } else if (error.request) {
        // Request was made but no response received
        console.error('No response received:', error.request);
        Alert.alert(
          'Network Error', 
          'No response from server. Please check your connection.'
        );
      } else {
        // Something else happened
        console.error('Request setup error:', error.message);
        Alert.alert('Error', 'Failed to fetch subcategories.');
      }
      
      setSubCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePress = (item) => {
    navigation.navigate('RentalProducts', { subCategoryID: item.rsCategoryID });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
      <Image
        source={{ 
          uri: item.rsCategoryImage || 'https://via.placeholder.com/80x80?text=No+Image' 
        }}
        style={styles.image}
        resizeMode="contain"
        onError={() => console.log('Image failed to load:', item.rsCategoryImage)}
      />
      <Text style={styles.label} numberOfLines={2}>
        {item.rsCategoryName || 'Unknown Category'}
      </Text>
    </TouchableOpacity>
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        No subcategories available for this category
      </Text>
      <TouchableOpacity 
        style={styles.retryButton} 
        onPress={fetchSubCategories}
      >
        <Text style={styles.retryText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>
        Choose Rental Subcategory (ID: {rCategoryID})
      </Text> */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>
            Loading subcategories for category ......
          </Text>
        </View>
      ) : (
        <FlatList
          data={subCategories}
          keyExtractor={(item) => item.rsCategoryID?.toString() || Math.random().toString()}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={styles.grid}
          ListEmptyComponent={renderEmptyComponent}
          showsVerticalScrollIndicator={false}
          key={`category-${rCategoryID}`} // Force re-render when category changes
        />
      )}
    </View>
  );
};

export default RentalSubcategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: width * 0.04,
    paddingTop: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  grid: {
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  card: {
    width: width * 0.42,
    backgroundColor: '#f8f8f8',
    margin: width * 0.02,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 10,
    borderRadius: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
    lineHeight: 18,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
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