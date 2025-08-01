import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useCart } from '../../Contexts/CartContext';

const CartItemCard = ({ item }) => {
  const { addToCart, decreaseQuantity, removeFromCart } = useCart();

  const handleIncrement = () => {
    addToCart(item);
  };

  const handleDecrement = () => {
    if (item.quantityCount > 1) {
      decreaseQuantity(item.productID);
    } else {
      removeFromCart(item.productID);
    }
  };

  const totalWeight = item.productWeight * item.quantityCount;
  const weightUnit = item.shortName || 'kg';

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.title}>{item.productName}</Text>
        <Text style={styles.price}>₹{item.customerLandingCost}</Text>

        {/* Show total weight dynamically */}
        <Text style={styles.weightText}>
          Total Weight: {totalWeight} {weightUnit}
        </Text>

        <View style={styles.counter}>
          <TouchableOpacity onPress={handleDecrement} style={styles.counterBtn}>
            <Text style={styles.counterText}>−</Text>
          </TouchableOpacity>

          <Text style={styles.quantity}>{item.quantityCount}</Text>

          <TouchableOpacity onPress={handleIncrement} style={styles.counterBtn}>
            <Text style={styles.counterText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginVertical: 8,
    padding: 10,
    borderRadius: 8,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 6,
    marginRight: 12,
    resizeMode: 'cover',
    backgroundColor: '#f0f0f0',
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  price: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  weightText: {
    fontSize: 13,
    color: '#777',
    marginBottom: 6,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  counterBtn: {
    backgroundColor: '#eee',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  counterText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 12,
    fontWeight: 'bold',
  },
});

export default CartItemCard;
