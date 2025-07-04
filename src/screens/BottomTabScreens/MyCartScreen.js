import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions


} from 'react-native';
import { useCart } from '../../Contexts/CartContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import Header from '../../components/HomeComponent/Header';
import { useNavigation } from '@react-navigation/native';
import DeliverySelection from '../../components/HomeComponent/DeliverySelection';



const MyCartScreen = () => {
  const { cartItem, setCartItems } = useCart();
  const [accepted, setAccepted] = useState(true);
  const navigation = useNavigation();
  const screenWidth=Dimensions.get('window').width;
  const screenHeight=Dimensions.get('window').height;

  const totalPrice = cartItem.reduce((acc, item) => acc + item.price * item.quantityCount, 0);
  const shipping = totalPrice >= 499 ? 0 : 70;
  const netPrice = totalPrice + shipping;
  const remaining = 499 - totalPrice;

  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantityCount: item.quantityCount + 1 } : item
      )
    )
  }
  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantityCount: item.quantityCount - 1 } : item
      ).filter((item) => item.quantityCount > 0)
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image
        source={item.image}
        style={styles.productImage}
      />
      <View style={styles.itemDetails}>
        <Text style={styles.brand}>Excel Crop Care</Text>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.price}>
          ₹{item.price} <Text style={styles.mrp}>₹{item.mrp}</Text>
        </Text>
        <Text style={styles.size}>{item.quantity}</Text>
      </View>
      <View style={styles.quantityBox}>
        <TouchableOpacity style={styles.qtyBtn}
          onPress={() =>
            item.quantityCount === 1 ? decreaseQuantity(item.id) : decreaseQuantity(item.id)
          }>
          {item.quantityCount === 1 ? (
            <Ionicons name='trash-outline' size={20} color='red' />
          ) : (
            <Text style={{ fontSize: 20 }}>-</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.qtyText}>{item.quantityCount}</Text>
        <TouchableOpacity style={styles.qtyBtn} onPress={() => increaseQuantity(item.id)}>
          <Text style={{ fontSize: 20 }}>+</Text>
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
          <Text style={styles.emptytext}> Your cart is empty. Please add items to proceed.</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ShopNowScreen')}>
            <Text style={styles.continueText}
            >
              Click me for Shopping !
            </Text>
          </TouchableOpacity>
        </View>


      ) : (
        
        <View style={{flex:1,bottom:10,backgroundColor:'#fff'}}>
          <FlatList
            data={cartItem}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{paddingBottom: screenHeight * 0.20 }}
            ListHeaderComponent={
              <>

                <DeliverySelection />

                {/* Free delivery bar */}
                <View style={styles.deliveryBar}>
                  <Ionicons name="lock-closed-outline" size={16} color="#f90" />
                  <Text style={styles.deliveryText}>
                    You're ₹{remaining > 0 ? remaining : 0} away from Free Delivery
                  </Text>
                </View>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${(totalPrice / 499) * 100}%` },
                    ]}
                  />
                </View>
              </>
            }
            ListFooterComponent={
              <>
                {/* Coupon section */}
                <TouchableOpacity style={styles.couponBox} onPress={() => navigation.navigate('Coupon')}>
                  <Ionicons name="pricetags-outline" size={20} />
                  <Text style={styles.couponText}>Apply Coupon</Text>
                  <Ionicons name="chevron-forward" size={20} />
                </TouchableOpacity>

                {/* Bill details */}
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

                {/* T&C */}
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

                {/* Proceed Button */}
               
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
    padding: 40,
  },
  emptytext: {
    fontSize: 13,
    color: 'grey',
    marginVertical: 8,
  },
  continueText: {
    color: 'blue',
    fontSize: 16,
    fontWeight: 500,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },

  container: { backgroundColor: '#fff', flex: 1 },
  header: {
    backgroundColor: '#4CAF50',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 18, color: '#fff', fontWeight: 'bold' },
  addAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f4fff4',
  },
  addAddressText: { color: 'green', marginLeft: 6 },
  deliveryBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  deliveryText: { color: 'purple', marginLeft: 6 },
  progressBar: {
    height: 5,
    backgroundColor: '#eee',
    marginHorizontal: 12,
    borderRadius: 2,
  },
  progressFill: {
    backgroundColor: 'purple',
    height: 5,
    borderRadius: 2,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  productImage:
    { width: 50, height: 50, resizeMode: 'contain' },
  itemDetails:
    { flex: 1, marginLeft: 12 },
  brand:
    { color: '#666', fontSize: 12 },
  itemTitle:
    { fontWeight: 'bold', fontSize: 14 },
  price:
    { fontSize: 14 },
  mrp:
    { textDecorationLine: 'line-through', color: '#999', fontSize: 12 },
  size: { color: '#555', fontSize: 12 },
  quantityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginLeft: 8,
  },
  qtyBtn: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 4,
  },
  qtyText: { fontSize: 16 },
  couponBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  couponText: { flex: 1, marginLeft: 10 },
  billContainer: {
    padding: 16,
  },
  billTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 8 },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  netText: { fontWeight: 'bold' },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  link: { color: '#00f' },
  policyText: { fontSize: 12, color: '#555', paddingHorizontal: 16 },
  proceedBtn: {
    backgroundColor: '#4CAF50',
    padding: 14,
    margin: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    margin:'auto',
    marginVertical:10,
    width: '80%',
  },
  proceedText: { color: '#fff', fontWeight: 'bold' },
  continueText: {
    textAlign: 'center',
    color: 'orange',
    marginBottom: 15,
  },
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
