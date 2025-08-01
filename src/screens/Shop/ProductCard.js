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



// -----------------------------------------------------------------------------------------------



import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // ↩︎ arrow icon
import ProductList from '../../components/ProductList';
import Toast from 'react-native-toast-message';
const { width } = Dimensions.get('window');

// const API_BASE = 'http://192.168.29.21:5220/api';
// const MEDIA_BASE = 'http://192.168.29.21:5220'; // prepend for relative image paths


const API_BASE = 'http://10.0.2.2:5220/api';
const MEDIA_BASE = 'http://10.0.2.2:5220'; // prepend for relative image paths
export default function ProductCard({ selectedCategory }) {
  /* ---------- shared state ---------- */
  const [loading, setLoading] = useState(false);

  /* ---------- sCategory state ---------- */
  const [sCategories, setSCategories] = useState([]);

  /* ---------- product state ---------- */
  const [products, setProducts] = useState([]);
  const [activeSCategory, setActiveSCategory] = useState(null); // null ⇢ show sCategories

  /* ---------- fetch sCategories when category changes ---------- */
  useEffect(() => {
    if (!selectedCategory || selectedCategory === 'all') {
      setSCategories([]);
      return;
    }

    const fetchSCategories = async () => {
      setLoading(true);
      try {
        // step 1: pCategories for category
        const pcRes = await fetch(`${API_BASE}/Category/pCategories/${selectedCategory}`);
        const pcData = await pcRes.json();
        const pIds = Array.isArray(pcData) ? pcData.map(p => p.pCategoryID) : [];

        // step 2: sCategories for each pCategory
        const scLists = await Promise.all(
          pIds.map(id =>
            fetch(`${API_BASE}/Category/sCategories/${id}`).then(r => r.json())
          )
        );
        setSCategories(scLists.flat());
      } catch (err) {
        console.error('❌ sCategory fetch error:', err);
        setSCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSCategories();
  }, [selectedCategory]);

  /* ---------- fetch products when an sCategory is chosen ---------- */
  const loadProducts = useCallback(async (sCatId) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${API_BASE}/Product/products/sCategoryId?sCategoryId=${sCatId}`
      );
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
      setActiveSCategory(sCatId);
    } catch (err) {
      console.error('❌ product fetch error:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  /* ---------- render helpers ---------- */
  const renderSCard = ({ item }) => {
    const uri = item.sCategoryImage
      ? item.sCategoryImage.startsWith('http')
        ? item.sCategoryImage
        : `${MEDIA_BASE}${item.sCategoryImage}`
      : 'nothing';

    return (
      <Pressable onPress={() => loadProducts(item.sCategoryID)} style={styles.card}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri }} style={styles.image} />
        </View>
        <Text style={styles.title}>{item.sCategoryName}</Text>
      </Pressable>
    );
  };


  //product list render function...
 const renderProduct = ({ item }) => {
  const imageUri = item.productImage
    ? item.productImage.startsWith('http')
      ? item.productImage
      : `${MEDIA_BASE}${item.productImage}`
    : null;

  return <ProductList item={item} imageUri={imageUri} />;
};

  /* ---------- loading spinner ---------- */
  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="small" color="#4CAF50" />
      </View>
    );
  }

  /* ---------- product view ---------- */
  if (activeSCategory) {
    return (
      <View style={{ flex: 1 }}>
        {/* back arrow */}
        <Pressable onPress={() => setActiveSCategory(null)} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </Pressable>

        {/* product list */}
        <FlatList
          data={products}
          keyExtractor={(p) => p.productID.toString()}
          renderItem={renderProduct}
          numColumns={2} 
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={styles.prodList}
          ListEmptyComponent={
            <Text style={styles.emptyMsg}>No products found.</Text>
          }
          showsVerticalScrollIndicator={false}
        />

      </View>
    );
  }

  /* ---------- sCategory grid (default view) ---------- */
  return (
    <FlatList
      data={sCategories}
      keyExtractor={s => s.sCategoryID.toString()}
      renderItem={renderSCard}
      numColumns={2}
      contentContainerStyle={styles.list}
      ListEmptyComponent={<Text style={styles.emptyMsg}>No sub‑categories found.</Text>}
      showsVerticalScrollIndicator={false}
    />
  );
  // <Toast />
}

/* ---------- styles ---------- */
const IMAGE_SIZE = 120; // square size for consistent image display

const styles = StyleSheet.create({
  /* shared */
  loading: { padding: 20, alignItems: 'center' },
  emptyMsg: { padding: 20, textAlign: 'center', color: '#666' },

  /* sCategory grid */
  list: { paddingHorizontal: 10, paddingBottom: 20 },
  card: {
  margin: 8,
  paddingVertical: 16,
  paddingHorizontal: 10,
  borderRadius: 16,
  width: (width - 40) / 2,
  alignItems: 'center',
  // backgroundColor: '#fff',  ❌ remove this
  backgroundColor: 'transparent', // ✅ optional — or use a light tint like '#f0f0f0'
  elevation: 0, // remove elevation shadow if you want flat look
  shadowColor: 'transparent', // also remove iOS shadow
},
 imageWrapper: {
  width: IMAGE_SIZE,
  height: IMAGE_SIZE,
  borderRadius: IMAGE_SIZE / 2,
  backgroundColor: '#e9f7f1', // ✅ soft green tint or transparent if you prefer
  overflow: 'hidden',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 10,
  borderWidth: 1,
  borderColor: '#d0e5db', // soft border
},
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },

  /* product list */
  backBtn: {
    padding: 12,
    paddingTop: 18,
  },
  prodList: {
    paddingHorizontal: 14,
    paddingBottom: 20,
  },
  prodCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 6,
    padding: 14,
    elevation: 2,
  },
  prodName: { fontSize: 15, fontWeight: '600', color: '#222' },
  prodPrice: { fontSize: 14, color: '#388E3C', marginTop: 4 },
  prodWeight: { fontSize: 12, color: '#666', marginTop: 2 },
});

// ---------------------------------------------------------------------------------------------------------