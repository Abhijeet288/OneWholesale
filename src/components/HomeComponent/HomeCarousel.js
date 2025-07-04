import { useState, useRef, useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  useWindowDimensions,
} from 'react-native';

const CAROUSEL_DATA = [
  {
    id: '1',
    image:
      'https://api.a0.dev/assets/image?text=agriculture%20product%20banner%20with%20drip%20irrigation%20system&aspect=16:9',
  },
  {
    id: '2',
    image:
      'https://api.a0.dev/assets/image?text=farming%20equipment%20and%20tools%20showcase&aspect=16:9',
  },
  {
    id: '3',
    image:
      'https://api.a0.dev/assets/image?text=organic%20fertilizers%20and%20pesticides%20banner&aspect=16:9',
  },
];

export default function HomeCarousel() {
  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % CAROUSEL_DATA.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setActiveIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const renderItem = ({ item }) => (
    <View style={{ width, height: width * 0.5625 }}>
      <Image source={{ uri: item.image }} style={styles.image} />
    </View>
  );

  const handleScrollEnd = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  return (
    <View style={{ width, height: width * 0.5625, marginVertical: 10 }}>
      <FlatList
        ref={flatListRef}
        data={CAROUSEL_DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />

      {/* Dots just below the carousel */}
      <View style={[styles.pagination]}>
        {CAROUSEL_DATA.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '88%',
    height: '90%',
    resizeMode: 'cover',
    borderRadius: 12,
    alignSelf: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 5,
  },
  activeDot: {
    width: 24,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
});
