import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');
const ITEM_SIZE = width * 0.25;

export default function CropCarousel() {
  const crops = [
    {
      id: 'onion',
      name: 'Onion',
      image:
        'https://api.a0.dev/assets/image?text=fresh%20red%20onion%20with%20slice%20on%20white%20background',
    },
    {
      id: 'carrot',
      name: 'Carrot',
      image:
        'https://api.a0.dev/assets/image?text=fresh%20orange%20carrots%20on%20white%20background',
    },
    {
      id: 'tomato',
      name: 'Tomato',
      image:
        'https://api.a0.dev/assets/image?text=fresh%20red%20tomato%20cut%20in%20half%20on%20white%20background',
    },
    {
      id: 'chili',
      name: 'Chili',
      image:
        'https://api.a0.dev/assets/image?text=fresh%20green%20chilies%20on%20white%20background',
    },
  ];

  const handleCropPress = (cropId) => {
    console.log(`Selected crop: ${cropId}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* Fixed Add Button */}
        <TouchableOpacity
          style={styles.cropContainer}
          onPress={() => handleCropPress('add')}
        >
          <View style={styles.cropCircle}>
            <Icon name="add" size={40} color="#27ae60" />
          </View>
          <Text style={styles.cropName}>Add Crop</Text>
        </TouchableOpacity>

        {/* Scrollable Crops */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          decelerationRate="fast"
          snapToInterval={ITEM_SIZE}
          snapToAlignment="center"
        >
          {crops.map((crop) => (
            <TouchableOpacity
              key={crop.id}
              style={styles.cropContainer}
              onPress={() => handleCropPress(crop.id)}
            >
              <View style={styles.cropCircle}>
                <Image
                  source={{ uri: crop.image }}
                  style={styles.cropImage}
                  resizeMode="cover"
                />
              </View>
              <Text style={styles.cropName}>{crop.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 15,

  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollContent: {
    paddingRight: 250,
    alignItems: 'center',
  },
  cropContainer: {
    width: ITEM_SIZE-5,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  cropCircle: {
    width: ITEM_SIZE - 20,
    height: ITEM_SIZE - 20,
    borderRadius: (ITEM_SIZE - 20) / 2,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
  },
  cropImage: {
    width: '100%',
    height: '100%',
    borderRadius: (ITEM_SIZE - 20) / 2,
  },
  cropName: {
    marginTop: 6,
    fontSize: 13,
    color: '#333',
    textAlign: 'center',
  },
});
