import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Image,
  FlatList,
  ActivityIndicator,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';

// const BASE_URL = 'http://192.168.29.21:5220'; // Replace with your IP
const BASE_URL = 'http://10.0.2.2:5220';

export default function HomeCarousel() {
  const { width} = useWindowDimensions();
  const imageWidth = width // 16 padding on each side
  const imageHeight = imageWidth * 0.57; // Maintain ~16:9 aspect ratio

  const [carouselData, setCarouselData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const flatListRef = useRef(null);

  useEffect(() => {
    fetch(`${BASE_URL}/api/Banner/banners`)
      .then(res => res.json())
      .then(data => {
        setCarouselData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching banners:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (carouselData.length === 0) return;
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % carouselData.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setActiveIndex(nextIndex);
    }, 2000);
    return () => clearInterval(interval);
  }, [activeIndex, carouselData]);

  const renderItem = ({ item }) => (
    <View style={[styles.imageWrapper, { width, borderRadius: 55, overflow: 'hidden' }]}>
      <Image
        source={{ uri: `${BASE_URL}${item.bannerImage}` }}
        style={{
          width: imageWidth,
          height: imageHeight,
          resizeMode: 'contain',
        }}
      />
    </View>
  );

  const handleScrollEnd = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  if (loading) {
    return (
      <View style={[styles.loaderContainer, { height: imageHeight + 20 }]}>
        <ActivityIndicator size="large" color="#888" />
      </View>
    );
  }

  return (
    <View style={{ width, height: imageHeight + 20 }}>
      <FlatList
        ref={flatListRef}
        data={carouselData}
        renderItem={renderItem}
        keyExtractor={(item) => item.bannerID.toString()}
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
      <View style={styles.pagination}>
        {carouselData.map((_, index) => (
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
  imageWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 20,
    backgroundColor: '#bbb',
    marginHorizontal: 4,
  },
  activeDot: {
    width: 24,
    backgroundColor: '#000',
  },
  imageContainer: {
  width: 50,
  height: 50,
  borderRadius: 25,
  borderWidth: 1,
  borderColor: '#ddd',
  backgroundColor: '#fff',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 8,
  overflow: 'hidden',
}

});




// import { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Image,
//   StyleSheet,
//   FlatList,
//   useWindowDimensions,
// } from 'react-native';

// const CAROUSEL_DATA = [
//   {
//     id: '1',
//     image:require('../../../wwwroot/uploadBanners/06a8afd4-9e7f-4f0c-83a2-c15c4aec1013.jpg'),
//   },
//   {
//     id: '2',
//     image:require('../../assests/images/banner/carousel2.jpg'),
//   },
//   {
//     id: '3',
//     image:require('../../assests/images/banner/carousel3.jpg'),
//   },
//   {
//     id: '4',
//     image:require('../../assests/images/banner/carousel4.jpg'),
//   },
// ];

// export default function HomeCarousel() {
//   const { width } = useWindowDimensions();
//   const [activeIndex, setActiveIndex] = useState(0);
//   const flatListRef = useRef(null);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const nextIndex = (activeIndex + 1) % CAROUSEL_DATA.length;
//       flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
//       setActiveIndex(nextIndex);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [activeIndex]);

//   const renderItem = ({ item }) => (
//     <View style={{ width, height: width * 0.5625 }}>
//       <Image source={item.image} style={styles.image} />
//     </View>
//   );

//   const handleScrollEnd = (event) => {
//     const index = Math.round(event.nativeEvent.contentOffset.x / width);
//     setActiveIndex(index);
//   };

//   return (
//     <View style={{ width, height: width * 0.5625, marginVertical: 10 }}>
//       <FlatList
//         ref={flatListRef}
//         data={CAROUSEL_DATA}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         onMomentumScrollEnd={handleScrollEnd}
//         getItemLayout={(_, index) => ({
//           length: width,
//           offset: width * index,
//           index,
//         })}
//       />

//       {/* Dots just below the carousel */}
//       <View style={[styles.pagination]}>
//         {CAROUSEL_DATA.map((_, index) => (
//           <View
//             key={index}
//             style={[
//               styles.dot,
//               activeIndex === index && styles.activeDot,
//             ]}
//           />
//         ))}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   image: {
//     width: '88%',
//     height: '90%',
//     resizeMode: 'cover',
//     borderRadius: 12,
//     alignSelf: 'center',
//   },
//   pagination: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   dot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: 'rgba(255, 255, 255, 0.5)',
//     marginHorizontal: 5,
//   },
//   activeDot: {
//     width: 24,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: '#fff',
//   },
// });










// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Image,
//   StyleSheet,
//   FlatList,
//   useWindowDimensions,
//   ActivityIndicator,
// } from 'react-native';

// // const BASE_URL = 'http://10.0.2.2:5220'; // Adjust this if using physical device
// const BASE_URL = 'http://192.168.29.21:5220'; // Adjust this if using physical device

// export default function HomeCarousel() {
//   const { width } = useWindowDimensions();
//   const imageHeight = width * 0.5625; // 16:9 aspect ratio
//   const [carouselData, setCarouselData] = useState([]);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const flatListRef = useRef(null);

//   useEffect(() => {
//     fetch(`${BASE_URL}/api/Banner/banners`)
//       .then(res => res.json())
//       .then(data => {
//         setCarouselData(data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching banners:', error);
//         setLoading(false);
//       });
//   }, []);

//   useEffect(() => {
//     if (carouselData.length === 0) return;
//     const interval = setInterval(() => {
//       const nextIndex = (activeIndex + 1) % carouselData.length;
//       flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
//       setActiveIndex(nextIndex);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [activeIndex, carouselData]);

//   const renderItem = ({ item }) => (
//     <View style={{ width, height: imageHeight }}>
//       <Image
//         source={{ uri: `${BASE_URL}${item.bannerImage}` }}
//         style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
//       />
//     </View>
//   );

//   const handleScrollEnd = (event) => {
//     const index = Math.round(event.nativeEvent.contentOffset.x / width);
//     setActiveIndex(index);
//   };

//   if (loading) {
//     return (
//       <View style={{ height: imageHeight, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" color="#999" />
//       </View>
//     );
//   }

//   return (
//     <View style={{ width, height: imageHeight }}>
//       <FlatList
//         ref={flatListRef}
//         data={carouselData}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.bannerID.toString()}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         onMomentumScrollEnd={handleScrollEnd}
//         getItemLayout={(_, index) => ({
//           length: width,
//           offset: width * index,
//           index,
//         })}
//       />

//       <View style={styles.pagination}>
//         {carouselData.map((_, index) => (
//           <View
//             key={index}
//             style={[
//               styles.dot,
//               activeIndex === index && styles.activeDot,
//             ]}
//           />
//         ))}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   pagination: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 6,
//   },
//   dot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: '#bbb',
//     marginHorizontal: 4,
//   },
//   activeDot: {
//     width: 24,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: '#333',
//   },
// });
