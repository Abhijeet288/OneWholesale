



// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Dimensions,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import { useCart } from '../../Contexts/CartContext';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import CheckBox from '@react-native-community/checkbox';
// import Header from '../../components/HomeComponent/Header';
// import DeliverySelection from '../../components/HomeComponent/DeliverySelection';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import CartItemCard from '../../components/ButtomTabComponent/CartItemCard';
// import { useNavigation } from '@react-navigation/native';

// const screenWidth = Dimensions.get('window').width;
// const screenHeight = Dimensions.get('window').height;

// const MyCartScreen = () => {
//   const { cartItem, setCartItems } = useCart();
//   const [accepted, setAccepted] = useState(true);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const navigation = useNavigation();

//   useEffect(() => {
//     const loadCartAndUser = async () => {
//       const storedCart = await AsyncStorage.getItem('CART_ITEMS');
//       const storedUserId = await AsyncStorage.getItem('userId');
//       if (storedCart) setCartItems(JSON.parse(storedCart));
//       if (storedUserId) setUserId(parseInt(storedUserId));
//     };
//     loadCartAndUser();
//   }, []);

//   useEffect(() => {
//     AsyncStorage.setItem('CART_ITEMS', JSON.stringify(cartItem));
//   }, [cartItem]);

//   const totalPrice = cartItem.reduce(
//     (acc, item) =>
//       acc + (item.customerLandingCost || item.price) * item.quantityCount,
//     0
//   );

//   const shipping = selectedOption === 'delivery' ? 19 : 0;
//   const netPrice = totalPrice + shipping;

//   const handlePlaceOrder = async () => {
//     if (!accepted) {
//       Alert.alert('Notice', 'Please accept the terms and conditions.');
//       return;
//     }

//     if (!selectedOption) {
//       Alert.alert('Notice', 'Please select a delivery method.');
//       return;
//     }

//     if (cartItem.length === 0) {
//       Alert.alert('Notice', 'Your cart is empty.');
//       return;
//     }

//     if (!userId) {
//       Alert.alert('Error', 'User ID not found. Please login again.');
//       return;
//     }

//     const payload = cartItem.map((item) => ({
//       userID: userId,
//       productID: item.productID,
//       hsn: item.hsn || 0,
//       quantity: item.quantityCount,
//       customerLandingCost: item.customerLandingCost,
//       totalLandingCost: item.customerLandingCost * item.quantityCount,
//       productWeight: item.productWeight,
//       totalWeight: item.productWeight * item.quantityCount,
//       oneCenterID: item.oneCenterID || 0,
//       createdBy: userId,
//     }));

//     try {
//       const response = await fetch(
//         'http://10.0.2.2:5220/api/Product/Product/PlacedProducts',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(payload),
//         }
//       );

//       if (!response.ok) throw new Error('Order placement failed.');

//       const result = await response.json();
//       Alert.alert('Success', 'Your order has been placed successfully!');
//       setCartItems([]);
//       AsyncStorage.removeItem('CART_ITEMS');
//     } catch (err) {
//       Alert.alert('Error', err.message || 'Something went wrong');
//     }
//   };

//   const renderItem = ({ item }) => <CartItemCard item={item} />;

//   return (
//     <>
//       <Header />
//       {cartItem.length === 0 ? (
//         <View style={styles.emptycartcontainer}>
//           <Ionicons name="cart-outline" size={50} color="gray" />
//           <Text style={styles.emptytext}>
//             Your cart is empty. Please add items to proceed.
//           </Text>
//           <TouchableOpacity onPress={() => navigation.navigate('ShopNowScreen')}>
//             <Text style={styles.continueText}>Click me for Shopping!</Text>
//           </TouchableOpacity>
//         </View>
//       ) : (
//         <View style={{ flex: 1, backgroundColor: '#fff' }}>
//           <FlatList
//             data={cartItem}
//             keyExtractor={(item, index) =>
//               item?.productID?.toString() || index.toString()
//             }
//             renderItem={renderItem}
//             numColumns={1}
//             contentContainerStyle={{ padding: 10, paddingBottom: screenHeight * 0.3 }}
//             ListHeaderComponent={
//               <DeliverySelection
//                 selectedOption={selectedOption}
//                 setSelectedOption={setSelectedOption}
//               />
//             }
//             ListFooterComponent={
//               <View style={styles.footerBox}>
//                 <TouchableOpacity
//                   style={styles.couponBox}
//                   onPress={() => navigation.navigate('Coupon')}
//                 >
//                   <Ionicons name="pricetags-outline" size={20} />
//                   <Text style={styles.couponText}>Apply Coupon</Text>
//                   <Ionicons name="chevron-forward" size={20} />
//                 </TouchableOpacity>

//                 <View style={styles.billContainer}>
//                   <Text style={styles.billTitle}>Bill Details</Text>
//                   <View style={styles.billRow}>
//                     <Text>Total Price</Text>
//                     <Text>₹{totalPrice.toFixed(2)}</Text>
//                   </View>
//                   <View style={styles.billRow}>
//                     <Text>Shipping Charges</Text>
//                     <Text>
//                       {shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}
//                     </Text>
//                   </View>
//                   <View style={[styles.billRow, { marginTop: 8 }]}>
//                     <Text style={styles.netText}>Net Price</Text>
//                     <Text style={styles.netText}>₹{netPrice.toFixed(2)}</Text>
//                   </View>
//                 </View>

//                 <View style={styles.termsRow}>
//                   <CheckBox
//                     value={accepted}
//                     onValueChange={setAccepted}
//                     tintColors={{ true: '#4CAF50', false: '#ccc' }}
//                   />
//                   <Text style={{ fontSize: screenWidth * 0.03 }}>
//                     I accept the <Text style={styles.link}>terms and conditions</Text>
//                   </Text>
//                 </View>

//                 <Text style={styles.policyText}>
//                   By clicking on Place Order, I agree to BigHaat’s{' '}
//                   <Text style={styles.link}>Return & Refund Policy</Text> and{' '}
//                   <Text style={styles.link}>Privacy Policy</Text>
//                 </Text>
//               </View>
//             }
//             showsVerticalScrollIndicator={false}
//           />

//           <View style={styles.fixedFooter}>
//             <TouchableOpacity style={styles.proceedBtn} onPress={handlePlaceOrder}>
//               <Text style={styles.proceedText}>Place Order</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => navigation.navigate('ShopNowScreen')}>
//               <Text style={styles.continueText}>Continue Shopping</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       )}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   emptycartcontainer: {
//     flex: 1,
//     backgroundColor: '#e6f5ec',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: screenWidth * 0.1,
//   },
//   emptytext: {
//     fontSize: screenWidth * 0.035,
//     color: 'grey',
//     marginVertical: 8,
//     textAlign: 'center',
//   },
//   continueText: {
//     textAlign: 'center',
//     color: '#4CAF50',
//     marginVertical: 10,
//     fontSize: screenWidth * 0.035,
//   },
//   couponBox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: screenWidth * 0.03,
//     borderTopWidth: 1,
//     borderBottomWidth: 1,
//     borderColor: '#eee',
//   },
//   couponText: { flex: 1, marginLeft: screenWidth * 0.025 },
//   billContainer: { padding: screenWidth * 0.04 },
//   billTitle: {
//     fontWeight: 'bold',
//     fontSize: screenWidth * 0.045,
//     marginBottom: 8,
//   },
//   billRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginVertical: 2,
//   },
//   netText: { fontWeight: 'bold' },
//   termsRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: screenWidth * 0.04,
//     marginVertical: 10,
//   },
//   link: { color: '#00f' },
//   policyText: {
//     fontSize: screenWidth * 0.03,
//     color: '#555',
//     paddingHorizontal: screenWidth * 0.04,
//     marginBottom: 10,
//   },
//   proceedBtn: {
//     backgroundColor: '#4CAF50',
//     padding: screenHeight * 0.02,
//     margin: screenWidth * 0.04,
//     borderRadius: 6,
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: screenWidth * 0.8,
//     alignSelf: 'center',
//   },
//   proceedText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: screenWidth * 0.045,
//   },
//   fixedFooter: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: '#fff',
//     paddingBottom: screenHeight * 0.015,
//     borderColor: '#ccc',
//   },
//   footerBox: {
//     paddingHorizontal: 10,
//     paddingBottom: 40,
//   },
// });

// export default MyCartScreen;


import React, { useEffect, useState,useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useCart } from '../../Contexts/CartContext';

import { UserContext } from '../../Contexts/UserContext'; // Import your UserContext
import Ionicons from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import Header from '../../components/HomeComponent/Header';
import DeliverySelection from '../../components/HomeComponent/DeliverySelection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartItemCard from '../../components/ButtomTabComponent/CartItemCard';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const MyCartScreen = () => {
  const { cartItem, setCartItems } = useCart();
  const { user } = useContext(UserContext); // Get user from UserContext
  const [accepted, setAccepted] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const navigation = useNavigation();

  // Get userId from user context
  const userId = user?.userId;

  useEffect(() => {
    const loadCart = async () => {
      const storedCart = await AsyncStorage.getItem('CART_ITEMS');
      if (storedCart) setCartItems(JSON.parse(storedCart));
    };
    loadCart();
  }, [setCartItems]);

  useEffect(() => {
    if (cartItem.length > 0) {
      AsyncStorage.setItem('CART_ITEMS', JSON.stringify(cartItem));
    }
  }, [cartItem]);

  const totalPrice = cartItem.reduce(
    (acc, item) =>
      acc + (item.customerLandingCost || item.price) * item.quantityCount,
    0
  );

  const shipping = selectedOption === 'delivery' ? 19 : 0;
  const netPrice = totalPrice + shipping;

  const handlePlaceOrder = async () => {
    if (!accepted) {
      Alert.alert('Notice', 'Please accept the terms and conditions.');
      return;
    }

    if (!selectedOption) {
      Alert.alert('Notice', 'Please select a delivery method.');
      return;
    }

    if (cartItem.length === 0) {
      Alert.alert('Notice', 'Your cart is empty.');
      return;
    }

    if (!userId) {
      Alert.alert('Error', 'User not logged in. Please login to place order.');
      return;
    }

    // Debug logs
    console.log('User ID from context:', userId);
    console.log('Cart items:', cartItem);

    const payload = cartItem.map((item) => ({
      userID: userId,
      productID: item.productID,
      hsn: item.hsn || 0,
      quantity: item.quantityCount,
      customerLandingCost: item.customerLandingCost || item.price || 0,
      totalLandingCost: (item.customerLandingCost || item.price || 0) * item.quantityCount,
      productWeight: item.productWeight || 0,
      totalWeight: (item.productWeight || 0) * item.quantityCount,
      oneCenterID: item.oneCenterID || 0,
      createdBy: userId,
    }));

    console.log('Payload being sent:', JSON.stringify(payload, null, 2));

    try {
      // Show loading state
      Alert.alert('Processing', 'Placing your order...');

      const response = await fetch(
        'http://10.0.2.2:5220/api/Product/Product/PlacedProducts',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      // Get response text first to see what we're getting
      const responseText = await response.text();
      console.log('Raw response:', responseText);

      if (!response.ok) {
        let errorMessage = 'Order placement failed.';
        
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (e) {
          errorMessage = `Server error (${response.status}): ${responseText}`;
        }
        
        console.error('API Error:', errorMessage);
        Alert.alert('Error', errorMessage);
        return;
      }

      // Try to parse the response
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        console.log('Response is not JSON, treating as success');
        result = { success: true };
      }

      console.log('Order placement successful:', result);
      Alert.alert('Success', 'Your order has been placed successfully!', [
        {
          text: 'OK',
          onPress: () => {
            setCartItems([]);
            AsyncStorage.removeItem('CART_ITEMS');
            navigation.navigate('ShopNowScreen'); // Navigate back to shop
          }
        }
      ]);

    } catch (err) {
      console.error('Network/Request Error:', err);
      Alert.alert('Error', 
        `Network error: ${err.message}. Please check your internet connection and try again.`
      );
    }
  };

  const renderItem = ({ item }) => <CartItemCard item={item} />;

  return (
    <>
      <Header />
      {cartItem.length === 0 ? (
        <View style={styles.emptycartcontainer}>
          <Ionicons name="cart-outline" size={50} color="gray" />
          <Text style={styles.emptytext}>
            Your cart is empty. Please add items to proceed.
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('ShopNowScreen')}>
            <Text style={styles.continueText}>Click me for Shopping!</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <FlatList
            data={cartItem}
            keyExtractor={(item, index) =>
              item?.productID?.toString() || index.toString()
            }
            renderItem={renderItem}
            numColumns={1}
            contentContainerStyle={{ padding: 10, paddingBottom: screenHeight * 0.3 }}
            ListHeaderComponent={
              <DeliverySelection
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              />
            }
            ListFooterComponent={
              <View style={styles.footerBox}>
                <TouchableOpacity
                  style={styles.couponBox}
                  onPress={() => navigation.navigate('Coupon')}
                >
                  <Ionicons name="pricetags-outline" size={20} />
                  <Text style={styles.couponText}>Apply Coupon</Text>
                  <Ionicons name="chevron-forward" size={20} />
                </TouchableOpacity>

                <View style={styles.billContainer}>
                  <Text style={styles.billTitle}>Bill Details</Text>
                  <View style={styles.billRow}>
                    <Text>Total Price</Text>
                    <Text>₹{totalPrice.toFixed(2)}</Text>
                  </View>
                  <View style={styles.billRow}>
                    <Text>Shipping Charges</Text>
                    <Text>
                      {shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}
                    </Text>
                  </View>
                  <View style={[styles.billRow, { marginTop: 8 }]}>
                    <Text style={styles.netText}>Net Price</Text>
                    <Text style={styles.netText}>₹{netPrice.toFixed(2)}</Text>
                  </View>
                </View>

                <View style={styles.termsRow}>
                  <CheckBox
                    value={accepted}
                    onValueChange={setAccepted}
                    tintColors={{ true: '#4CAF50', false: '#ccc' }}
                  />
                  <Text style={{ fontSize: screenWidth * 0.03 }}>
                    I accept the <Text style={styles.link}>terms and conditions</Text>
                  </Text>
                </View>

                <Text style={styles.policyText}>
                  By clicking on Place Order, I agree to BigHaat's{' '}
                  <Text style={styles.link}>Return & Refund Policy</Text> and{' '}
                  <Text style={styles.link}>Privacy Policy</Text>
                </Text>
              </View>
            }
            showsVerticalScrollIndicator={false}
          />

          <View style={styles.fixedFooter}>
            <TouchableOpacity style={styles.proceedBtn} onPress={handlePlaceOrder}>
              <Text style={styles.proceedText}>Place Order</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ShopNowScreen')}>
              <Text style={styles.continueText}>Continue Shopping</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  emptycartcontainer: {
    flex: 1,
    backgroundColor: '#e6f5ec',
    justifyContent: 'center',
    alignItems: 'center',
    padding: screenWidth * 0.1,
  },
  emptytext: {
    fontSize: screenWidth * 0.035,
    color: 'grey',
    marginVertical: 8,
    textAlign: 'center',
  },
  continueText: {
    textAlign: 'center',
    color: '#4CAF50',
    marginVertical: 10,
    fontSize: screenWidth * 0.035,
  },
  couponBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: screenWidth * 0.03,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  couponText: { flex: 1, marginLeft: screenWidth * 0.025 },
  billContainer: { padding: screenWidth * 0.04 },
  billTitle: {
    fontWeight: 'bold',
    fontSize: screenWidth * 0.045,
    marginBottom: 8,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  netText: { fontWeight: 'bold' },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: screenWidth * 0.04,
    marginVertical: 10,
  },
  link: { color: '#00f' },
  policyText: {
    fontSize: screenWidth * 0.03,
    color: '#555',
    paddingHorizontal: screenWidth * 0.04,
    marginBottom: 10,
  },
  proceedBtn: {
    backgroundColor: '#4CAF50',
    padding: screenHeight * 0.02,
    margin: screenWidth * 0.04,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth * 0.8,
    alignSelf: 'center',
  },
  proceedText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: screenWidth * 0.045,
  },
  fixedFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingBottom: screenHeight * 0.015,
    borderColor: '#ccc',
  },
  footerBox: {
    paddingHorizontal: 10,
    paddingBottom: 40,
  },
});

export default MyCartScreen;