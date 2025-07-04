import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Pressable,TouchableOpacity,Image} from 'react-native';

const ProductCard = ({
  image,
  title,
  price,
  mrp,
  quantity,
  deliveryTime,
  discount,
  onAddToCart,

}) => {
  const navigation=useNavigation();
  return (
    <View style={styles.card} >
     
        <Image source={image} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={styles.quantity}>{quantity}</Text>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <Text style={styles.deliveryTime}>{deliveryTime}</Text>
        <View style={styles.priceRow}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹{price}</Text>
            <Text style={styles.mrp}>MRP ₹{mrp}</Text>
          </View>
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{discount}% OFF</Text>
          </View>
        </View>
        <Pressable style={styles.addButton} onPress={onAddToCart}>
          <Text style={styles.addButtonText}>ADD  </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 8,
    overflow: 'hidden',
    width: '47%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    aspectRatio: 1,
    backgroundColor: '#f5f5f5',
  },
  image: {
    flex: 1,
  },
  content: {
    padding: 12,
  },
  quantity: {
    fontSize: 12,
    color: '#666',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginVertical: 4,
  },
  deliveryTime: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  priceContainer: {
    flex: 1,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
  },
  mrp: {
    fontSize: 12,
    color: '#666',
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 4,
    paddingVertical: 6,
    marginTop: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#4CAF50',
    fontWeight: '600',
  },
});

export default ProductCard;
