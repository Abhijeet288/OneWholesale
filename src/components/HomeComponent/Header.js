

// import React, { useContext, useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   useWindowDimensions,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import { useNavigation } from '@react-navigation/native';
// import { UserContext } from '../../Contexts/UserContext';
// import { useLocation } from '../../Contexts/LocationContext';

// const Header = () => {
//   const { user } = useContext(UserContext);
//   const { userAddress, getUserAddress } = useLocation(); // Use the updated LocationContext
//   const navigation = useNavigation();
//   const [address, setAddress] = useState(null);

//   const userId = user?.userId;

//   const { width } = useWindowDimensions();
//   const iconSize = width * 0.07;
//   const smallFont = width * 0.035;
//   const largeFont = width * 0.04;

//   useEffect(() => {
//     if (userId) {
//       // First check if userAddress matches current user
//       if (userAddress && userAddress.userId === userId) {
//         console.log('Using userAddress from context:', userAddress);
//         setAddress(userAddress);
//       } else {
//         // Try to get address using getUserAddress function
//         const addressResult = getUserAddress(userId);
//         if (addressResult.success) {
//           console.log('Address retrieved for Header:', addressResult.data);
//           setAddress(addressResult.data);
//         } else {
//           console.log('No address found for user:', addressResult.error);
//           setAddress(null);
//         }
//       }
//     }
//   }, [userId, userAddress, getUserAddress]);

//   // Function to format location display - only block and district
//   const getLocationDisplay = () => {
//     if (!address) {
//       return 'Add your address';
//     }
    
//     const block = address.blockName || null;
//     const district = address.districtName || null;
    
//     // Always show both block and district, use null if not available
//     return `${block}, ${district}`;
//   };

//   const handleLocationPress = () => {
//     if (!address) {
//       // Navigate to add address if no address exists
//       navigation.navigate('LocationManual');
//     } else {
//       // Maybe navigate to address details or update address
//       // navigation.navigate('AddressDetails');
//     }
//   };

//   return (
//     <View style={[styles.header, { padding: width * 0.04, backgroundColor: '#b1e0cd' }]}>
//       <View style={styles.locationContainer}>
//         <Ionicons name="person" size={iconSize} color="#FF6B00" />
//         <View>
//           <Text style={styles.username}>
//             Welcome {user?.firstName || 'User'} 👋
//           </Text>
//           <Text style={[styles.locationLabel, { fontSize: smallFont }]}>Your location</Text>
//           <TouchableOpacity 
//             style={styles.locationButton}
//             onPress={handleLocationPress}
//           >
//             <Text style={[
//               styles.locationText, 
//               { fontSize: largeFont, color: address ? '#4CAF50' : '#FF6B00' }
//             ]}>
//               📍 {getLocationDisplay()}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       <View style={styles.rightIcons}>
//         <TouchableOpacity 
//           style={styles.iconButton} 
//           onPress={() => navigation.navigate('LanguageDrawer')}
//         >
//           <FontAwesome name="language" size={22} color="#666" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.iconButton}>
//           <Ionicons name="notifications-outline" size={iconSize} color="black" />
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.iconButton}
//           onPress={() => navigation.openDrawer()}
//         >
//           <Ionicons name="person-circle-outline" size={iconSize} color="black" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     paddingVertical: 18,
//     height: '13%',
//     borderBottomRightRadius: 22,
//     borderBottomLeftRadius: 22,
//   },
//   username: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: 'darkgreen',
//   },
//   locationContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   locationLabel: {
//     color: '#666',
//   },
//   locationButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 4,
//   },
//   locationText: {
//     fontWeight: '500',
//   },
//   rightIcons: {
//     flexDirection: 'row',
//     gap: 12,
//   },
//   iconButton: {
//     padding: 4,
//   },
// });

// export default Header;





// -------------------------------------------------------------

// // DESIGN IS OK ,LOGIC IS OK
// import React, { useContext, useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   useWindowDimensions,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import { useNavigation } from '@react-navigation/native';
// import { UserContext } from '../../Contexts/UserContext';
// import { useLocation } from '../../Contexts/LocationContext';
// import axios from 'axios';

// const Header = () => {
//   const { user } = useContext(UserContext);
//   const { userAddress, saveAddressLocally } = useLocation();
//   const navigation = useNavigation();
//   const [address, setAddress] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const userId = user?.userId;

//   const { width } = useWindowDimensions();
//   const iconSize = width * 0.07;
//   const smallFont = width * 0.035;
//   const largeFont = width * 0.04;

//   // Function to fetch address from API
//   const fetchAddressFromAPI = async (userId) => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`http://10.0.2.2:5220/api/Registration/User/GetUserAddress/${userId}`);
      
//       if (response.data && response.data.length > 0) {
//         const addressData = response.data[0]; // Get the first (and should be only) address
        
//         // Format the address data to match our context structure
//         const formattedAddress = {
//           userId: userId,
//           stateID: addressData.stateID,
//           districtID: addressData.districtID,
//           blockID: addressData.blockID,
//           village: addressData.village,
//           nearestLandMark: addressData.nearestLandMark,
//           pinCode: addressData.pinCode,
//           // These might need to be fetched separately or stored differently
//           // For now, we'll use the IDs as fallback
//           stateName: addressData.stateName || `State ${addressData.stateID}`,
//           districtName: addressData.districtName || `District ${addressData.districtID}`,
//           blockName: addressData.blockName || `Block ${addressData.blockID}`,
//           // savedAt: addressData.createdAt || new Date().toISOString(),
//         };

//         // Save to context for quick access
//         saveAddressLocally(userId, formattedAddress);
//         setAddress(formattedAddress);
        
//         console.log('Address fetched from API and saved to context:', formattedAddress);
//         return formattedAddress;
//       } else {
//         console.log('No address found in API for user:', userId);
//         setAddress(null);
//         return null;
//       }
//     } catch (error) {
//       console.error('Error fetching address from API:', error);
      
//       // If API fails, try to use context as fallback
//       if (userAddress && userAddress.userId === userId) {
//         setAddress(userAddress);
//         return userAddress;
//       }
      
//       setAddress(null);
//       return null;
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (userId) {
//       // Always fetch from API first to ensure we have the latest data
//       fetchAddressFromAPI(userId);
//     } else {
//       setAddress(null);
//     }
//   }, [userId]);

//   // Function to format location display - show first name, block and district
//   const getLocationDisplay = () => {
//     if (!address || loading) {
//       return loading  
//     }
    
//     // const firstName = user?.firstName || 'User';
//     const block = address.blockName || 'Unknown Block';
//     const district = address.districtName || 'Unknown District';
    
//     return ` ${block}, ${district}`;
//   };

//   const handleLocationPress = () => {
//     if (!address && !loading) {
//       // Only allow navigation to add address if no address exists
//       // navigation.navigate('LocationManual');
//     }
//     // If address exists, do nothing (remove the ability to add multiple addresses)
//   };

//   return (
//     <View style={[styles.header, { padding: width * 0.04, backgroundColor: '#b1e0cd' }]}>
//       <View style={styles.locationContainer}>
//         <Ionicons name="person" size={iconSize} color="#FF6B00" />
//         <View>
//           <Text style={styles.username}>
//             Welcome {user?.firstName || 'User'} 👋
//           </Text>
//           <Text style={[styles.locationLabel, { fontSize: smallFont }]}>Your location</Text>
//           <TouchableOpacity 
//             style={styles.locationButton}
//             onPress={handleLocationPress}
//             disabled={address !== null || loading} // Disable if address exists or loading
//           >
//             <Text style={[
//               styles.locationText, 
//               { 
//                 fontSize: largeFont, 
//                 color: address ? '#4CAF50' : (loading ? '#999' : '#FF6B00'),
//                 opacity: (address || loading) ? 1 : 1 // Keep full opacity always
//               }
//             ]}>
//               📍 {getLocationDisplay()}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       <View style={styles.rightIcons}>
//         <TouchableOpacity 
//           style={styles.iconButton} 
//           onPress={() => navigation.navigate('LanguageDrawer')}
//         >
//           <FontAwesome name="language" size={22} color="#666" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.iconButton}>
//           <Ionicons name="notifications-outline" size={iconSize} color="black" />
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.iconButton}
//           onPress={() => navigation.openDrawer()}
//         >
//           <Ionicons name="person-circle-outline" size={iconSize} color="black" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     paddingVertical: 18,
//     height: '13%',
//     borderBottomRightRadius: 22,
//     borderBottomLeftRadius: 22,
//   },
//   username: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: 'darkgreen',
//   },
//   locationContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   locationLabel: {
//     color: '#666',
//   },
//   locationButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 4,
//   },
//   locationText: {
//     fontWeight: '500',
//   },
//   rightIcons: {
//     flexDirection: 'row',
//     gap: 12,
//   },
//   iconButton: {
//     padding: 4,
//   },
// });

// export default Header;

// // -------------------------------------------------






// DESIGN IS OK ,LOGIC IS OK
import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../Contexts/UserContext';
import { useLocation } from '../../Contexts/LocationContext';
import axios from 'axios';

const Header = () => {
  const { user } = useContext(UserContext);
  const { userAddress, saveAddressLocally } = useLocation();
  const navigation = useNavigation();
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  const phoneNumber = user?.phoneNumber;

  const { width } = useWindowDimensions();
  const iconSize = width * 0.07;
  const smallFont = width * 0.035;
  const largeFont = width * 0.04;

  // Function to fetch address from API using mobile number
  const fetchAddressFromAPI = async (mobileNumber) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://10.0.2.2:5220/api/Registration/User/GetUserAddress?mobilenumber=${mobileNumber}`);
      
      console.log('Address API Response:', response.data);
      
      if (response.data && response.data.length > 0) {
        const addressData = response.data[0]; // Get the first (and should be only) address
        
        // Format the address data to match our context structure
        const formattedAddress = {
          userId: user?.userId || null,
          phoneNumber: mobileNumber,
          stateID: addressData.stateID,
          districtID: addressData.districtID,
          blockID: addressData.blockID,
          village: addressData.village,
          nearestLandMark: addressData.nearestLandMark,
          pinCode: addressData.pinCode,
          // These might need to be fetched separately or stored differently
          // For now, we'll use the IDs as fallback
          stateName: addressData.stateName || `State ${addressData.stateID}`,
          districtName: addressData.districtName || `District ${addressData.districtID}`,
          blockName: addressData.blockName || `Block ${addressData.blockID}`,
        };

        // Save to context for quick access
        if (user?.userId) {
          saveAddressLocally(user.userId, formattedAddress);
        }
        setAddress(formattedAddress);
        
        console.log('Address fetched from API and saved to context:', formattedAddress);
        return formattedAddress;
      } else {
        console.log('No address found in API for mobile number:', mobileNumber);
        setAddress(null);
        return null;
      }
    } catch (error) {
      console.error('Error fetching address from API:', error);
      console.error('Error response:', error.response?.data);
      
      // If API fails, try to use context as fallback
      if (userAddress && userAddress.phoneNumber === mobileNumber) {
        setAddress(userAddress);
        return userAddress;
      }
      
      setAddress(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (phoneNumber) {
      console.log('Fetching address for phone number:', phoneNumber);
      // Always fetch from API first to ensure we have the latest data
      fetchAddressFromAPI(phoneNumber);
    } else {
      console.log('No phone number available in user context');
      setAddress(null);
    }
  }, [phoneNumber]);

  // Function to format location display - show only block and district
  const getLocationDisplay = () => {
    if (loading) {
      return 'Loading location...';
    }
    
    if (!address) {
      return 'No address found';
    }
    
    const block = address.blockName || 'Unknown Block';
    const district = address.districtName || 'Unknown District';
    
    return `${block}, ${district}`;
  };

  const handleLocationPress = () => {
    if (!address && !loading) {
      // Only allow navigation to add address if no address exists
      // navigation.navigate('LocationManual');
      console.log('No address found, user can add address');
    }
    // If address exists, do nothing (remove the ability to add multiple addresses)
  };

  return (
    <View style={[styles.header, { padding: width * 0.04, backgroundColor: '#b1e0cd' }]}>
      <View style={styles.locationContainer}>
        <Ionicons name="person" size={iconSize} color="#FF6B00" />
        <View>
          <Text style={styles.username}>
            Welcome {user?.firstName || 'User'} 👋
          </Text>
          <Text style={[styles.locationLabel, { fontSize: smallFont }]}>Your location</Text>
          <TouchableOpacity 
            style={styles.locationButton}
            onPress={handleLocationPress}
            disabled={address !== null || loading} // Disable if address exists or loading
          >
            <Text style={[
              styles.locationText, 
              { 
                fontSize: largeFont, 
                color: address ? '#4CAF50' : (loading ? '#999' : '#FF6B00'),
                opacity: 1 // Keep full opacity always
              }
            ]}>
              📍 {getLocationDisplay()}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.rightIcons}>
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={() => navigation.navigate('LanguageDrawer')}
        >
          <FontAwesome name="language" size={22} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={iconSize} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.openDrawer()}
        >
          <Ionicons name="person-circle-outline" size={iconSize} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 18,
    height: '13%',
    borderBottomRightRadius: 22,
    borderBottomLeftRadius: 22,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: 'darkgreen',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  locationLabel: {
    color: '#666',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontWeight: '500',
  },
  rightIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    padding: 4,
  },
});

export default Header;