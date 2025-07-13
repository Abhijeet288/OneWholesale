// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Pressable,
//   Image,
//   FlatList,
//   Dimensions,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { useCart } from '../../Contexts/CartContext';
// import Toast from 'react-native-toast-message';

// const { width } = Dimensions.get('window');

// // Sample product list
// const mockProducts = [
//   {
//     id: '1',
//     title: 'Safeda / Banganapalli Mango',
//     price: 78,
//     mrp: 106,
//     quantity: '2 pieces (550-700 g)',
//     deliveryTime: '15 MINS',
//     discount: 26,
//     image: require('../../assests/images/farmerbgi.jpg'),
//   },
//   {
//     id: '2',
//     title: 'Kesar Mango',
//     price: 81,
//     mrp: 112,
//     quantity: '2 units (400-600 g)',
//     deliveryTime: '15 MINS',
//     discount: 27,
//     image: require('../../assests/images/farmerbgi.jpg'),
//   },
//   {
//     id: '3',
//     title: 'Tomato',
//     price: 30,
//     mrp: 40,
//     quantity: '500 g',
//     deliveryTime: '10 MINS',
//     discount: 25,
//     image: require('../../assests/images/farmerbgi.jpg'),
//   },
//   {
//     id: '4',
//     title: 'Frozen Peas',
//     price: 55,
//     mrp: 70,
//     quantity: '500 g',
//     deliveryTime: '15 MINS',
//     discount: 21,
//     image: require('../../assests/images/farmerbgi.jpg'),
//   },
// ];

// // Individual product card
// const ProductCard = ({ item }) => {
//   const { cartItem, addToCart, decreaseQuantity } = useCart();

//   if (!item) return null;

//   const cartProduct = cartItem.find(p => p.id === item.id);
//   const isInCart = !!cartProduct;
//   const count = cartProduct?.quantityCount || 0;

//   const handleAdd = () => {
//     addToCart(item);
//     Toast.show({
//       type: 'success',
//       text1: 'Added to Cart',
//       text2: `${item.title} added successfully!`,
//       position: 'bottom',
//     });
//   };

//   const handleDecrease = () => {
//     decreaseQuantity(item.id);
//     Toast.show({
//       type: 'info',
//       text1: 'Item Removed',
//       text2: count === 1 ? `${item.title} removed from cart.` : `Reduced quantity of ${item.title}`,
//       position: 'bottom',
//     });
//   };

//   return (
//     <View style={styles.card}>
//       <Image source={item.image} style={styles.image} />
//       <View style={styles.content}>
//         <Text style={styles.quantity}>{item.quantity}</Text>
//         <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
//         <Text style={styles.deliveryTime}>{item.deliveryTime}</Text>

//         <View style={styles.priceRow}>
//           <View>
//             <Text style={styles.price}>₹{item.price}</Text>
//             <Text style={styles.mrp}>MRP ₹{item.mrp}</Text>
//           </View>
//           <View style={styles.discountBadge}>
//             <Text style={styles.discountText}>{item.discount}% OFF</Text>
//           </View>
//         </View>

//         {!isInCart ? (
//           <Pressable style={styles.addButton} onPress={handleAdd}>
//             <Text style={styles.addButtonText}>Add to Cart</Text>
//           </Pressable>
//         ) : (
//           <View style={styles.counterContainer}>
//             <Pressable onPress={handleDecrease}>
//               <Icon name={count === 1 ? 'delete' : 'remove'} size={20} color="#4CAF50" />
//             </Pressable>
//             <Text style={styles.counterValue}>{count}</Text>
//             <Pressable onPress={handleAdd}>
//               <Icon name="add" size={20} color="#4CAF50" />
//             </Pressable>
//           </View>
//         )}
//       </View>
//     </View>
//   );
// };

// // Product list screen
// const ProductList = () => {
//   return (
//     <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
//       <FlatList
//         data={mockProducts}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => <ProductCard item={item} />}
//         numColumns={2}
//         contentContainerStyle={styles.list}
//         showsVerticalScrollIndicator={false}
//       />
//       <Toast />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   list: {
//     paddingHorizontal: 8,
//     paddingBottom: 20,
//   },
//   card: {
//     backgroundColor: 'white',
//     borderRadius: 8,
//     margin: 6,
//     width: '47%',
//     overflow: 'hidden',
//     elevation: 3,
//   },
//   image: {
//     width: '100%',
//     height: 160,
//     resizeMode: 'cover',
//   },
//   content: {
//     padding: 10,
//   },
//   quantity: {
//     fontSize: 11,
//     color: '#666',
//   },
//   title: {
//     fontSize: 13,
//     fontWeight: '600',
//     marginVertical: 2,
//   },
//   deliveryTime: {
//     fontSize: 11,
//     color: '#666',
//   },
//   priceRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginVertical: 4,
//   },
//   price: {
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   mrp: {
//     fontSize: 11,
//     color: '#999',
//     textDecorationLine: 'line-through',
//   },
//   discountBadge: {
//     backgroundColor: '#E8F5E9',
//     paddingHorizontal: 4,
//     paddingVertical: 1,
//     borderRadius: 3,
//   },
//   discountText: {
//     color: '#4CAF50',
//     fontSize: 11,
//     fontWeight: '600',
//   },
//   addButton: {
//     borderWidth: 1,
//     borderColor: '#4CAF50',
//     borderRadius: 4,
//     paddingVertical: 4,
//     marginTop: 6,
//     alignItems: 'center',
//   },
//   addButtonText: {
//     color: '#4CAF50',
//     fontSize: 13,
//     fontWeight: '600',
//   },
//   counterContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 8,
//     borderWidth: 1,
//     borderColor: '#4CAF50',
//     borderRadius: 4,
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//   },
//   counterValue: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#333',
//   },
// });

// export default ProductList;




import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

const { width } = Dimensions.get('window');

// 👇 Base URL (use 10.0.2.2 for Android emulator)
const BASE_URL = 'http://10.0.2.2:5220/api/Category';

const ProductList = ({ selectedCategory }) => {
  const [scategories, setScategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedCategory || selectedCategory === 'all') {
      setScategories([]);
      return;
    }

    const fetchSCategories = async () => {
      setLoading(true);
      try {
        // 1. Fetch all pCategories by selected categoryId
        const pcRes = await fetch(`${BASE_URL}/pCategories/${selectedCategory}`);
        const pcData = await pcRes.json();
        const pCategoryIDs = Array.isArray(pcData)
          ? pcData.map((p) => p.pCategoryID)
          : [];

        // 2. Fetch sCategories for each pCategoryId
        const sCatFetches = await Promise.all(
          pCategoryIDs.map(async (pcId) => {
            const res = await fetch(`${BASE_URL}/sCategories/${pcId}`);
            const data = await res.json();
            return Array.isArray(data) ? data : [];
          })
        );

        // 3. Merge all sCategories
        const allSCategories = sCatFetches.flat();
        setScategories(allSCategories);
      } catch (error) {
        console.error(' Error fetching sCategories:', error);
        setScategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSCategories();
  }, [selectedCategory]);

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.sCategoryImage || <Text>Null</Text> }}
        style={styles.image}
      />
      <Text style={styles.title}>{item.sCategoryName}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#4CAF50" />
      </View>
    );
  }

  return (
    <FlatList
      data={scategories}
      keyExtractor={(item) => item.sCategoryID.toString()}
      renderItem={renderCard}
      numColumns={2}
      contentContainerStyle={styles.list}
      ListEmptyComponent={
        <View style={{ padding: 20, alignItems: 'center' }}>
          <Text style={{ color: '#666' }}>No sub-categories found</Text>
        </View>
      }
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    margin: 8,
    padding: 10,
    borderRadius: 8,
    width: (width - 40) / 2,
    alignItems: 'center',
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
});

export default ProductList;

