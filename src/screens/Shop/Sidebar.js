

// import React from 'react';
// import { View, Text, Image, StyleSheet, Pressable, ScrollView, Dimensions } from 'react-native';

// const { width: screenWidth } = Dimensions.get('window');

// const categories = [
//   { id: 'all', title: 'All', icon: 'https://api.a0.dev/assets/image?text=fruit%20basket%20icon&aspect=1:1' },
//   { id: 'vegetables', title: 'Fresh\nVegetables', icon: 'https://api.a0.dev/assets/image?text=vegetables%20icon&aspect=1:1' },
//   { id: 'fruits', title: 'Fresh\nFruits', icon: 'https://api.a0.dev/assets/image?text=fruits%20icon&aspect=1:1' },
//   { id: 'exotics', title: 'Exotics', icon: 'https://api.a0.dev/assets/image?text=exotic%20fruits%20icon&aspect=1:1' },
//   { id: 'herbs', title: 'Coriander\n& Others', icon: 'https://api.a0.dev/assets/image?text=herbs%20icon&aspect=1:1' },
//   { id: 'flowers', title: 'Flowers &\nLeaves', icon: 'https://api.a0.dev/assets/image?text=flowers%20icon&aspect=1:1' },
//   { id: 'seasonal', title: 'Seasonal', icon: 'https://api.a0.dev/assets/image?text=seasonal%20fruits%20icon&aspect=1:1' },
//   { id: 'frozen', title: 'Frozen Veg', icon: 'https://api.a0.dev/assets/image?text=frozen%20vegetables%20icon&aspect=1:1' },
// ];

// const Sidebar = ({ selectedCategory, onSelectCategory }) => {
//   const itemWidth = screenWidth * 0.22; 

//   return (
//     <ScrollView
//       horizontal
//       showsHorizontalScrollIndicator={true}
//       contentContainerStyle={styles.scrollContainer}
//     >
//       {categories.map((category) => (
//         <Pressable
//           key={category.id}
//           style={[
//             styles.categoryItem,
//             { width: itemWidth },
//             selectedCategory === category.id && styles.selectedCategory,
//           ]}
//           onPress={() => onSelectCategory(category.id)}
//         >
//           <Image source={{ uri: category.icon }} style={styles.icon} />
//           <Text style={styles.categoryText}>{category.title}</Text>
//           {selectedCategory === category.id && <View style={styles.dot} />}
//         </Pressable>
//       ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   scrollContainer: {
//     flexDirection: 'row',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     backgroundColor: '#f2fef6',
//   },
//   categoryItem: {
//     height: 85,
//     width: screenWidth * 0.22,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 12,
//     borderRadius: 10,
//     backgroundColor: '#ffffff',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   selectedCategory: {
//     backgroundColor: '#e0f7eb',
//     borderColor: '#4CAF50',
//     borderWidth: 1,
//   },
//   icon: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     resizeMode: 'contain',
//   },
//   categoryText: {
//     fontSize: 11,
//     textAlign: 'center',
//     marginTop: 4,
//     color: '#333',
//   },
//   dot: {
//     position: 'absolute',
//     top: 6,
//     right: 6,
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: '#4CAF50',
//   },
// });
// export default Sidebar;





import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const Sidebar = ({ selectedCategory, onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const itemWidth = screenWidth * 0.22;

  // List of known sector IDs to fetch from
  const sectorIds = [4001, 4002, 4003, 4004];

  useEffect(() => {
    const fetchAllCategories = async () => {
      setLoading(true);
      try {
        const allCategories = [];

        const fetchPromises = sectorIds.map(async (sectorId) => {
          const res = await fetch(`http://10.0.2.2:5220/api/Category/categories/${sectorId}`);
          const data = await res.json();
          return Array.isArray(data) ? data : [];
        });

        const results = await Promise.all(fetchPromises);

        results.forEach((categoryList) => {
          allCategories.push(...categoryList);
        });

        setCategories(allCategories);
      } catch (error) {
        console.error('❌ Error fetching categories:', error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCategories();
  }, []);

  if (loading) {
    return (
      <View style={{ padding: 20, alignItems: 'center' }}>
        <ActivityIndicator size="small" color="#4CAF50" />
      </View>
    );
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={true}
      contentContainerStyle={styles.scrollContainer}
    >
      {categories.map((category) => (
        <Pressable
          key={category.categoryID}
          style={[
            styles.categoryItem,
            { width: itemWidth },
            selectedCategory === category.categoryID && styles.selectedCategory,
          ]}
          onPress={() => onSelectCategory(category.categoryID)}
        >
          <Image
            source={{ uri: category.categoryImage || 'https://via.placeholder.com/32' }}
            style={styles.icon}
          />
          <Text style={styles.categoryText}>{category.categoryName}</Text>
          {selectedCategory === category.categoryID && <View style={styles.dot} />}
        </Pressable>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f2fef6',
  },
  categoryItem: {
    height: 85,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectedCategory: {
    backgroundColor: '#e0f7eb',
    borderColor: '#4CAF50',
    borderWidth: 1,
  },
  icon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    resizeMode: 'contain',
  },
  categoryText: {
    fontSize: 11,
    textAlign: 'center',
    marginTop: 4,
    color: '#333',
  },
  dot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
});

export default Sidebar;
