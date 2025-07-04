import React from 'react';
import { View, Text, Image, StyleSheet, Pressable,ScrollView} from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';

const categories = [
  { id: 'all', title: 'All', icon: 'https://api.a0.dev/assets/image?text=fruit%20basket%20icon&aspect=1:1' },
  { id: 'vegetables', title: 'Fresh\nVegetables', icon: 'https://api.a0.dev/assets/image?text=vegetables%20icon&aspect=1:1' },
  { id: 'fruits', title: 'Fresh\nFruits', icon: 'https://api.a0.dev/assets/image?text=fruits%20icon&aspect=1:1' },
  { id: 'exotics', title: 'Exotics', icon: 'https://api.a0.dev/assets/image?text=exotic%20fruits%20icon&aspect=1:1' },
  { id: 'herbs', title: 'Coriander\n& Others', icon: 'https://api.a0.dev/assets/image?text=herbs%20icon&aspect=1:1' },
  { id: 'flowers', title: 'Flowers &\nLeaves', icon: 'https://api.a0.dev/assets/image?text=flowers%20icon&aspect=1:1' },
  { id: 'seasonal', title: 'Seasonal', icon: 'https://api.a0.dev/assets/image?text=seasonal%20fruits%20icon&aspect=1:1' },
  { id: 'frozen', title: 'Frozen Veg', icon: 'https://api.a0.dev/assets/image?text=frozen%20vegetables%20icon&aspect=1:1' },
];

const Sidebar = ({ selectedCategory, onSelectCategory }) => {
  return (
    <ScrollView style={styles.container}>
      {categories.map((category) => (
        <Pressable
          key={category.id}
          style={[
            styles.categoryItem,
            selectedCategory === category.id && styles.selectedCategory,
          ]}
          onPress={() => onSelectCategory(category.id)}
        >
          <Image source={{ uri: category.icon }} style={styles.icon} />
          <Text style={styles.categoryText}>{category.title}</Text>
          {selectedCategory === category.id && <View style={styles.activeIndicator} />}
        </Pressable>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: '20%',
    backgroundColor: '#f5f5f5',
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
  },
  categoryItem: {
    padding: 22,
    alignItems: 'center',
    position: 'relative',
  },
  selectedCategory: {
    backgroundColor: '#fff',
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
    color: '#333',
  },
  activeIndicator: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '#4CAF50',
  },
});

export default Sidebar;
