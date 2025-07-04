import React, { useState } from 'react';
import { View, FlatList, StyleSheet ,Image, Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductCard from '../Shop/ProductCard';
import Sidebar from '../Shop/Sidebar';
import Header from '../../components/HomeComponent/Header';
import { useCart } from '../../Contexts/CartContext';
import { useNavigation } from '@react-navigation/native';



const mockProducts = [
  {
    id: '1',
    title: 'Safeda / Banganapalli Mango',
    price: 78,
    mrp: 106,
    quantity: '2 pieces (550-700 g)',
    deliveryTime: '15 MINS',
    discount: 26,
    category: 'fruits',
    image:require('../../assests/shop/Safeda_Banganapalli_Mango.jpeg')
  },
  {
    id: '2',
    title: 'Kesar Mango',
    price: 81,
    mrp: 112,
    quantity: '2 units (400-600 g)',
    deliveryTime: '15 MINS',
    discount: 27,
    category: 'fruits',
    image:require('../../assests/images/soiltest.png')

  },
  {
    id: '3',
    title: 'Tomato',
    price: 30,
    mrp: 40,
    quantity: '500 g',
    deliveryTime: '10 MINS',
    discount: 25,
    category: 'vegetables',
    image:require('../../assests/shop/Safeda_Banganapalli_Mango.jpeg')

  },
  {
    id: '4',
    title: 'Frozen Peas',
    price: 55,
    mrp: 70,
    quantity: '500 g',
    deliveryTime: '15 MINS',
    discount: 21,
    category: 'frozen',
    image:require('../../assests/shop/Safeda_Banganapalli_Mango.jpeg')

  },
];


export default function ShopNowScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const {addToCart}=useCart();
  const navigation=useNavigation();
   
  const filteredProducts = selectedCategory === 'all'
    ? mockProducts
    : mockProducts.filter(p => p.category === selectedCategory);

    const handleAddToCart=(item)=>{
      const itemWithQuantity = { ...item, quantityCount: 1 };
      addToCart(itemWithQuantity);
      console.log("Add to cart pressed");
      setTimeout(()=>{
      Alert.alert(
        "Item added to cart !",
         "Would you like to go to your cart now?", 

        [
          {
            text:'Shop more',
            style:'cancel',
          },
          {
            text:'Go To Cart',
              onPress:()=>navigation.navigate('MyCartScreen'),
          }
        ],
        {cancelable:true}
      )
      },100);
    }
      
        
  return (
    <>
    <Header />
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.sidebar}>
          <Sidebar
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </View>
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => 
            <ProductCard {...item} 
            onAddToCart={()=>handleAddToCart(item)}
           
          />}
          numColumns={2}
          contentContainerStyle={styles.list}
        />
      </View>
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f5ec'
  },
  content: {
    flexDirection: 'row',
    flex: 1,
  },
  sidebar: {
    width: 100,
  },
  list: {
    padding: 8,
  },
});
