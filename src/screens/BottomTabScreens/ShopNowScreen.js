// import React, { useState } from 'react';
// import { View, StyleSheet, Dimensions } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Header from '../../components/HomeComponent/Header';
// import Sidebar from '../Shop/Sidebar'; // category bar
// import ProductList from '../Shop/ProductCard'; // now handles full product list

// const { width: screenWidth } = Dimensions.get('window');

// export default function ShopNowScreen() {
//   const [selectedCategory, setSelectedCategory] = useState('all');

//   return (
//     <>
//       <Header />
//       <SafeAreaView style={styles.container}>
//         <View style={styles.sidebarWrapper}>
//           <Sidebar
//             selectedCategory={selectedCategory}
//             onSelectCategory={setSelectedCategory}
//           />
//         </View>

//         <View style={styles.flatListWrapper}>
//           <ProductList selectedCategory={selectedCategory} />
//         </View>
//       </SafeAreaView>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f2fef6',
//   },
//   sidebarWrapper: {
//     paddingBottom: 8,
//   },
//   flatListWrapper: {
//     flex: 1,
//     width: screenWidth,
//     alignSelf: 'center',
//   },
// });



import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/HomeComponent/Header';
import Sidebar from '../Shop/Sidebar'; // updated category bar (with Option 2)
import ProductList from '../Shop/ProductCard'; // handles filtered products

const { width: screenWidth } = Dimensions.get('window');

export default function ShopNowScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <>
      <Header />
      <SafeAreaView style={styles.container}>
        <View style={styles.sidebarWrapper}>
          <Sidebar
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </View>

        <View style={styles.flatListWrapper}>
          <ProductList selectedCategory={selectedCategory} />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2fef6',
  },
  sidebarWrapper: {
    paddingBottom: 8,
  },
  flatListWrapper: {
    flex: 1,
    width: screenWidth,
    alignSelf: 'center',
  },
});
