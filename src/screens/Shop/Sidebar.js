

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
const BASE_URL = 'http://10.0.2.2:5220'; // emulator-safe localhost
// const BASE_URL = 'http://192.168.29.21:5220'; // replace with your actual backend URL

const Sidebar = ({ selectedCategory, onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const itemWidth = screenWidth * 0.22;

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/api/Category/categories`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          console.warn('Unexpected categories response:', data);
          setCategories([]);
        }
      } catch (error) {
        console.error('❌ Error fetching categories:', error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
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
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {categories.map((category) => {
        const imageUrl = category.categoryImage?.startsWith('http')
          ? category.categoryImage
          : `${BASE_URL}${category.categoryImage}`;

        return (
          <Pressable
            key={category.categoryID}
            style={[
              styles.categoryItem,
              { width: itemWidth },
              selectedCategory === category.categoryID && styles.selectedCategory,
            ]}
            onPress={() => onSelectCategory(category.categoryID)}
          >
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: imageUrl }}
                style={styles.icon}
              />
            </View>
            <Text style={styles.categoryText} numberOfLines={1}>
              {category.categoryName}
            </Text>
            {selectedCategory === category.categoryID && <View style={styles.dot} />}
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#f6fefc',
  },
  categoryItem: {
    height: 110,
    marginRight: 12,
    borderRadius: 14,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 6,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  selectedCategory: {
    backgroundColor: '#e1f5ee',
    borderColor: '#4CAF50',
    borderWidth: 1,
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25, // half of width/height
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    overflow: 'hidden',
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: 'cover',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    color: '#333',
    maxWidth: '95%',
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
