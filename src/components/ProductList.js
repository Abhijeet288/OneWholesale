// components/ProductList.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useCart } from '../Contexts/CartContext';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 42) / 2;

export default function ProductList({ item,imageUri }) {
  const { cartItem, addToCart, removeFromCart, decreaseQuantity } = useCart();
  const cartProduct = cartItem.find((p) => p.productID === item.productID);
  const quantity = cartProduct?.quantityCount || 0;

  const discount = (
    ((item.mrp - item.customerLandingCost) / item.mrp) * 100
  ).toFixed(0);

  const handleAdd = () => {
    addToCart({
      productID: item.productID,
      productName: item.productName,
      mrp: item.mrp,
      customerLandingCost: item.customerLandingCost,
      productWeight: item.productWeight,
      shortName: item.shortName,
      hsn: item.hsn || 0,
      oneCenterID: item.oneCenterID || 0,
      createdBy: 1,
    });

    if (quantity === 0) {
      Toast.show({
        type: 'success',
        text1: 'Added to Cart',
        text2: `${item.productName} added to your cart.`,
        position: 'bottom',
        bottomOffset: 120,
      });
    }
  };

  const handleRemove = () => {
    removeFromCart(item.productID);
    Toast.show({
      type: 'info',
      text1: 'Removed from Cart',
      text2: `${item.productName} removed from your cart.`,
      position: 'bottom',
      bottomOffset: 120,
    });
  };

  return (
    <View style={styles.card}>
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.image} />
      )}
      <Text style={styles.name}>{item.productName}</Text>
      <View style={styles.discountRow}>
        <Ionicons name="arrow-down" size={14} color="#D32F2F" />
        <Text style={styles.discountText}>{discount}% OFF</Text>
      </View>
      <Text style={styles.mrp}>₹{item.mrp.toFixed(2)}</Text>
      <Text style={styles.price}>₹{item.customerLandingCost.toFixed(2)}</Text>
      <Text style={styles.weight}>{item.productWeight} {item.shortName}</Text>

      {quantity === 0 ? (
        <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
          <Text style={styles.addBtnText}>Add to Cart</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.counterRow}>
          <TouchableOpacity
            onPress={quantity === 1 ? handleRemove : () => decreaseQuantity(item.productID)}
          >
            <Ionicons
              name={quantity === 1 ? 'trash-outline' : 'remove-circle-outline'}
              size={22}
              color="#d32f2f"
            />
          </TouchableOpacity>
          <Text style={styles.counterText}>{quantity}</Text>
          <TouchableOpacity onPress={handleAdd}>
            <Ionicons name="add-circle-outline" size={22} color="#388e3c" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 4,
    width: CARD_WIDTH,
    elevation: 2,
  },
  name: { fontSize: 14, fontWeight: 'bold' },
  mrp: { fontSize: 12, textDecorationLine: 'line-through', color: 'grey' },
  price: { fontSize: 14, fontWeight: 'bold', color: '#388E3C' },
  weight: { fontSize: 12, color: '#777', marginTop: 2 },
  discountRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  discountText: { fontSize: 12, color: '#D32F2F', marginLeft: 4 },
  addBtn: {
    backgroundColor: '#4CAF50',
    padding: 6,
    marginTop: 10,
    borderRadius: 4,
  },
  addBtnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  counterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  counterText: { fontSize: 16 },
  image: {
  width: '100%',
  height: 120,
  resizeMode: 'contain',
  marginBottom: 8,
  borderRadius: 8,
},

});
