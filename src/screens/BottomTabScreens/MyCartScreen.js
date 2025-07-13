import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { useCart } from '../../Contexts/CartContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import Header from '../../components/HomeComponent/Header';
import { useNavigation } from '@react-navigation/native';
import DeliverySelection from '../../components/HomeComponent/DeliverySelection';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const MyCartScreen = () => {
  const { cartItem, setCartItems } = useCart();
  const [accepted, setAccepted] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const loadCart = async () => {
      const storedCart = await AsyncStorage.getItem('CART_ITEMS');
      if (storedCart) setCartItems(JSON.parse(storedCart));
    };
    loadCart();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('CART_ITEMS', JSON.stringify(cartItem));
  }, [cartItem]);

  const totalPrice = cartItem.reduce((acc, item) => acc + item.price * item.quantityCount, 0);
  const shipping = totalPrice >= 499 ? 0 : 70;
  const netPrice = totalPrice + shipping;
  const remaining = 499 - totalPrice;

  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantityCount: item.quantityCount + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantityCount: item.quantityCount - 1 } : item
      ).filter((item) => item.quantityCount > 0)
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.brand}>Excel Crop Care</Text>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.price}>
          ₹{item.price} <Text style={styles.mrp}>₹{item.mrp}</Text>
        </Text>
        <Text style={styles.size}>{item.quantity}</Text>
      </View>
      <View style={styles.quantityBox}>
        <TouchableOpacity style={styles.qtyBtn} onPress={() => decreaseQuantity(item.id)}>
          {item.quantityCount === 1 ? (
            <Ionicons name="trash-outline" size={20} color="red" />
          ) : (
            <Text style={{ fontSize: screenWidth * 0.05 }}>-</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.qtyText}>{item.quantityCount}</Text>
        <TouchableOpacity style={styles.qtyBtn} onPress={() => increaseQuantity(item.id)}>
          <Text style={{ fontSize: screenWidth * 0.05 }}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
      <Header />
      {cartItem.length === 0 ? (
        <View style={styles.emptycartcontainer}>
          <Ionicons name="cart-outline" size={50} color="gray" />
          <Text style={styles.emptytext}>Your cart is empty. Please add items to proceed.</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ShopNowScreen')}>
            <Text style={styles.continueText}>Click me for Shopping !</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <FlatList
            data={cartItem}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: screenHeight * 0.2 }}
            ListHeaderComponent={<DeliverySelection />}
            ListFooterComponent={
              <>
                <TouchableOpacity style={styles.couponBox} onPress={() => navigation.navigate('Coupon')}>
                  <Ionicons name="pricetags-outline" size={20} />
                  <Text style={styles.couponText}>Apply Coupon</Text>
                  <Ionicons name="chevron-forward" size={20} />
                </TouchableOpacity>

                <View style={styles.billContainer}>
                  <Text style={styles.billTitle}>Bill Details</Text>
                  <View style={styles.billRow}>
                    <Text>Total Price</Text>
                    <Text>₹{totalPrice}</Text>
                  </View>
                  <View style={styles.billRow}>
                    <Text>Shipping Charges</Text>
                    <Text>₹{shipping}</Text>
                  </View>
                  <View style={[styles.billRow, { marginTop: 8 }]}>
                    <Text style={styles.netText}>Net Price</Text>
                    <Text style={styles.netText}>₹{netPrice}</Text>
                  </View>
                </View>

                <View style={styles.termsRow}>
                  <CheckBox
                    value={accepted}
                    onValueChange={setAccepted}
                    tintColors={{ true: '#4CAF50', false: '#ccc' }}
                  />
                  <Text>
                    I accept the <Text style={styles.link}>terms and conditions</Text>
                  </Text>
                </View>
                <Text style={styles.policyText}>
                  By clicking on Proceed, I agree to BigHaat’s{' '}
                  <Text style={styles.link}>Return & Refund Policy</Text> and{' '}
                  <Text style={styles.link}>Privacy Policy</Text>
                </Text>
              </>
            }
          />
          <View style={styles.fixedFooter}>
            <TouchableOpacity style={styles.proceedBtn}>
              <Text style={styles.proceedText}>Proceed for Address</Text>
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
    marginBottom: 15,
  },
  cartItem: {
    flexDirection: 'row',
    padding: screenWidth * 0.03,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  productImage: {
    width: screenWidth * 0.15,
    height: screenWidth * 0.15,
    resizeMode: 'contain',
  },
  itemDetails: {
    flex: 1,
    marginLeft: screenWidth * 0.03,
  },
  brand: { color: '#666', fontSize: screenWidth * 0.03 },
  itemTitle: { fontWeight: 'bold', fontSize: screenWidth * 0.04 },
  price: { fontSize: screenWidth * 0.035 },
  mrp: { textDecorationLine: 'line-through', color: '#999', fontSize: screenWidth * 0.03 },
  size: { color: '#555', fontSize: screenWidth * 0.03 },
  quantityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: screenWidth * 0.02,
    marginLeft: screenWidth * 0.02,
  },
  qtyBtn: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: screenWidth * 0.015,
  },
  qtyText: { fontSize: screenWidth * 0.045 },
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
  billTitle: { fontWeight: 'bold', fontSize: screenWidth * 0.045, marginBottom: 8 },
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
  policyText: { fontSize: screenWidth * 0.03, color: '#555', paddingHorizontal: screenWidth * 0.04 },
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
  proceedText: { color: '#fff', fontWeight: 'bold', fontSize: screenWidth * 0.045 },
  fixedFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderColor: '#ccc',
  },
});

export default MyCartScreen;
