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
    const timer = setInterval(() => {
      setActiveIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % CAROUSEL_DATA.length;
        flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const renderItem = ({ item }) => (
    <View style={{ width, height: width * 0.5625, padding: width * 0.025 }}>
      <Image source={{ uri: item.image }} style={styles.image} />
    </View>
  );

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={CAROUSEL_DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
          setActiveIndex(newIndex);
        }}
      />
      <View style={[styles.pagination, { bottom: width * 0.025 }]}>
        {CAROUSEL_DATA.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { width: width * 0.02, height: width * 0.02, marginHorizontal: width * 0.01 },
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
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 12,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
  },
  dot: {
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  activeDot: {
    backgroundColor: '#fff',
  },
});
