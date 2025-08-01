// // components/AddressCard.js
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Dimensions,
//   Alert,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { useNavigation } from '@react-navigation/native';
// import Loader from './Loader';

// const { width } = Dimensions.get('window');

// export default function AddressCard() {
//   const navigation = useNavigation();
//   const [user, setUser] = useState({});
//   const [location, setLocation] = useState({});
//   const [ids, setIds] = useState({});
//   const [loading, setLoading] = useState(true);

//   const phoneNumber = '9337370441'; // Ideally from context or storage

//   useEffect(() => {
//     const fetchUserAddress = async () => {
//       try {
//         const response = await fetch(
//           // `http://192.168.29.21:5220/api/Registration/User/GetUserAddress?mobilenumber=${phoneNumber}`
//             `http://10.0.2.2:5220/api/Registration/User/GetUserAddress?mobilenumber=${phoneNumber}`
//         );

//         if (!response.ok) throw new Error('Failed to fetch address.');

//         const data = await response.json();
//         if (data.length > 0) {
//           const address = data[0];

//           setUser({
//             firstName: 'N/A', // Replace if API gives name
//             lastName: 'N/A',
//             phoneNumber: address.mobileNumber,
//           });

//           setLocation({
//             state: address.stateName,
//             district: address.districtName,
//             block: address.blockName,
//             village: address.village,
//             landmark: address.nearestLandMark,
//             pincode: address.pinCode?.toString(),
//           });

//           setIds({
//             userID: address.userID,
//             stateID: address.stateID,
//             districtID: address.districtID,
//             blockID: address.blockID,
//             updatedBy: address.userID,
//           });
//         } else {
//           Alert.alert('No address found');
//         }
//       } catch (error) {
//         console.error('Fetch error:', error);
//         Alert.alert('Error', 'Failed to load address');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserAddress();
//   }, []);

//   const handleEdit = () => {
//     navigation.navigate('EditAddress', {
//       user,
//       location,
//       ids,
//     });
//   };

//   if (loading) return <Loader visible={loading} />;

//   return (
//     <View style={styles.card}>
//       <View style={styles.headerRow}>
//         <Text style={styles.nameText}>
//           {user.firstName} {user.lastName}
//         </Text>
//         <TouchableOpacity onPress={handleEdit}>
//           <Icon name="edit" size={24} color="#2196F3" />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.row}>
//         <Icon name="phone" size={18} color="#555" style={styles.icon} />
//         <Text>+91 {user.phoneNumber || 'N/A'}</Text>
//       </View>

//       <View style={styles.row}>
//         <Icon name="home" size={18} color="#555" style={styles.icon} />
//         <Text>{location.village || 'N/A'}, {location.landmark || 'N/A'}</Text>
//       </View>

//       <View style={styles.row}>
//         <Icon name="location-city" size={18} color="#555" style={styles.icon} />
//         <Text>{location.block || 'N/A'}, {location.district || 'N/A'}</Text>
//       </View>

//       <View style={styles.row}>
//         <Icon name="map" size={18} color="#555" style={styles.icon} />
//         <Text>{location.state || 'N/A'} - {location.pincode || 'N/A'}</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     padding: width * 0.05,
//     margin: 10,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     elevation: 2,
//   },
//   headerRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   nameText: {
//     fontSize: width * 0.045,
//     fontWeight: 'bold',
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 3,
//   },
//   icon: {
//     marginRight: 8,
//   },
// });












// // -------------------------------------------------
// import React, { useEffect, useState, useContext } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Dimensions,
//   Alert,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { useNavigation } from '@react-navigation/native';
// import Loader from './Loader';
// import { UserContext } from '../Contexts/UserContext';

// const { width } = Dimensions.get('window');

// export default function AddressCard() {
//   const navigation = useNavigation();
//   const { user } = useContext(UserContext);
//   const [location, setLocation] = useState({});
//   const [ids, setIds] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!user?.phoneNumber) {
//       Alert.alert('Error', 'Phone number not available');
//       return;
//     }

//     const fetchUserAddress = async () => {
//       try {
//         const response = await fetch(
//           `http://10.0.2.2:5220/api/Registration/User/GetUserAddress?mobilenumber=${user.phoneNumber}`
//         );

//         if (!response.ok) throw new Error('Failed to fetch address.');

//         const data = await response.json();
//         if (data.length > 0) {
//           const address = data[0];

//           setLocation({
//             phoneNumber: address.mobileNumber,
//             state: address.stateName,
//             district: address.districtName,
//             block: address.blockName,
//             village: address.village,
//             landmark: address.nearestLandMark,
//             pincode: address.pinCode?.toString(),
//           });

//           setIds({
//             userID: address.userID,
//           });
//         } else {
//           Alert.alert('No address found');
//         }
//       } catch (error) {
//         console.error('Fetch error:', error);
//         Alert.alert('Error', 'Failed to load address');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserAddress();
//   }, [user]);

//   const handleEdit = () => {
//     navigation.navigate('EditAddress', {
//       user,
//       location,
//       ids,
//     });
//   };

//   if (loading) return <Loader visible={loading} />;

//   return (
//     <View style={styles.card}>
//       <View style={styles.headerRow}>
//         <Text style={styles.nameText}>User Address</Text>
//         <TouchableOpacity onPress={handleEdit}>
//           <Icon name="edit" size={24} color="#2196F3" />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.row}>
//         <Icon name="phone" size={18} color="#555" style={styles.icon} />
//         <Text>+91 {location.phoneNumber}</Text>
//       </View>

//       <View style={styles.row}>
//         <Icon name="home" size={18} color="#555" style={styles.icon} />
//         <Text>{location.village}, {location.landmark}</Text>
//       </View>

//       <View style={styles.row}>
//         <Icon name="location-city" size={18} color="#555" style={styles.icon} />
//         <Text>{location.block}, {location.district}</Text>
//       </View>

//       <View style={styles.row}>
//         <Icon name="map" size={18} color="#555" style={styles.icon} />
//         <Text>{location.state} - {location.pincode}</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     padding: width * 0.05,
//     margin: 10,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     elevation: 2,
//   },
//   headerRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   nameText: {
//     fontSize: width * 0.045,
//     fontWeight: 'bold',
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 3,
//   },
//   icon: {
//     marginRight: 8,
//   },
// });

















import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Loader from './Loader';
import { UserContext } from '../Contexts/UserContext';

const { width } = Dimensions.get('window');

export default function AddressCard() {
  const navigation = useNavigation();
  const { user, setUser } = useContext(UserContext);
  const [location, setLocation] = useState({});
  const [ids, setIds] = useState({});
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    if (!user?.phoneNumber) {
      Alert.alert('Error', 'Phone number not available');
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `http://10.0.2.2:5220/api/Registration/User/UserDetail/${user.phoneNumber}`
        );
        if (!response.ok) throw new Error('Failed to fetch user details.');

        const data = await response.json();
        if (data.length > 0) {
          const { firstName, lastName, gender } = data[0];
          setFullName(`${firstName} ${lastName}`);
          setUser({ firstName, lastName, gender });
        } else {
          setFullName(`${user.firstName ?? ''} ${user.lastName ?? ''}`.trim());
        }
      } catch (error) {
        console.error('User detail fetch error:', error);
        setFullName(`${user.firstName ?? ''} ${user.lastName ?? ''}`.trim());
      }
    };

    const fetchUserAddress = async () => {
      try {
        const response = await fetch(
          `http://10.0.2.2:5220/api/Registration/User/GetUserAddress?mobilenumber=${user.phoneNumber}`
        );

        if (!response.ok) throw new Error('Failed to fetch address.');

        const data = await response.json();
        if (data.length > 0) {
          const address = data[0];

          setLocation({
            phoneNumber: address.mobileNumber,
            state: address.stateName,
            district: address.districtName,
            block: address.blockName,
            village: address.village,
            landmark: address.nearestLandMark,
            pincode: address.pinCode?.toString(),
          });

          setIds({ userID: address.userID });
        } else {
          Alert.alert('No address found');
        }
      } catch (error) {
        console.error('Fetch address error:', error);
        Alert.alert('Error', 'Failed to load address');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails().finally(fetchUserAddress);
  }, [user]);

  const handleEdit = () => {
    navigation.navigate('EditAddress', {
      user,
      location,
      ids,
    });
  };

  if (loading) return <Loader visible={loading} />;

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.nameText}>{fullName || 'User Address'}</Text>
        <TouchableOpacity onPress={handleEdit}>
          <Icon name="edit" size={24} color="#2196F3" />
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <Icon name="phone" size={18} color="#555" style={styles.icon} />
        <Text>+91 {location.phoneNumber}</Text>
      </View>

      <View style={styles.row}>
        <Icon name="home" size={18} color="#555" style={styles.icon} />
        <Text>{location.village}, {location.landmark}</Text>
      </View>

      <View style={styles.row}>
        <Icon name="location-city" size={18} color="#555" style={styles.icon} />
        <Text>{location.block}, {location.district}</Text>
      </View>

      <View style={styles.row}>
        <Icon name="map" size={18} color="#555" style={styles.icon} />
        <Text>{location.state} - {location.pincode}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: width * 0.05,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  nameText: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
  icon: {
    marginRight: 8,
  },
});
