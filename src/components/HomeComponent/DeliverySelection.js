import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Image,
  Linking,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../Contexts/UserContext';
import { useLocation } from '../../Contexts/LocationContext';
import AddressCard from '../../components/AddressCard';
import Loader from '../Loader';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function DeliverySelection({ selectedOption, setSelectedOption }) {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const { location } = useLocation(); // Contains selected blockId
  const [showOptionsInitially, setShowOptionsInitially] = useState(true);
  const [storeData, setStoreData] = useState([]);
  const [loadingStore, setLoadingStore] = useState(false);

  const fetchOneCenters = async () => {
    if (!location?.blockId) {
      Alert.alert('Error', 'Block ID is missing. Please select a location.');
      return;
    }

    try {
      setLoadingStore(true);

      const res = await fetch(
        'http://10.0.2.2:5220/api/OneCenter/oneCenter'
        // 'http://192.168.29.21:5220/api/OneCenter/oneCenter'

      );
      const data = await res.json();

      // Filter based on selected blockId
      const filtered = data.filter(center => center.blockId === location.blockId);
      setStoreData(filtered);
    } catch (error) {
      Alert.alert('Error', 'Unable to fetch One Center data.');
      console.error(error);
    } finally {
      setLoadingStore(false);
    }
  };

  const handleOptionSelect = (option) => {
    const label = option === 'delivery' ? 'Home Delivery' : 'Store Pickup';
    Alert.alert('Confirm Selection', `Proceed with ${label}?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Yes',
        onPress: () => {
          setSelectedOption(option);
          setShowOptionsInitially(false);
          if (option === 'pickup') fetchOneCenters(); // Fetch filtered stores on pickup
        },
      },
    ]);
  };

  const renderStoreCard = (center, index) => (
    <View style={styles.storeCard} key={index}>
      <Image
        source={require('../../assests/images/store.png')} // Replace with center.imageUrl if available
        style={styles.storeImage}
      />
      <View style={styles.storeDetails}>
        <Text style={styles.storeName}>{center.businessCenterName}</Text>
        <View style={styles.storeButtons}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Linking.openURL(`tel:${center.phone ?? '9337370441'}`)}
          >
            <Text style={styles.buttonText}>Call Shop</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              Linking.openURL(
                `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  center.businessCenterName
                )}`
              )
            }
          >
            <Text style={styles.buttonText}>Directions</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {showOptionsInitially ? (
          <>
            <Text style={styles.title}>How Would You Like to Receive Your Order?</Text>
            <View style={styles.optionsContainer}>
              {['delivery', 'pickup'].map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.optionCard,
                    selectedOption === option && styles.selectedCard,
                  ]}
                  onPress={() => handleOptionSelect(option)}
                >
                  <Text style={styles.optionText}>
                    {option === 'delivery' ? 'Home\nDelivery' : 'Pickup\nfrom Store'}
                  </Text>
                  <View
                    style={[
                      styles.radioButton,
                      selectedOption === option && styles.radioButtonSelected,
                    ]}
                  >
                    {selectedOption === option && <View style={styles.radioButtonInner} />}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : selectedOption === 'delivery' ? (
          <View style={{ flex: 1 }}>
            <Text style={styles.subTitle}>Delivery Address</Text>
            
            <AddressCard user={user} location={location} />
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.storeSectionTitle}>Nearest One Center</Text>
            {loadingStore ? (
              <Loader visible={loadingStore} />
            ) : storeData.length > 0 ? (
              <View style={{ gap: 12 }}>
                {storeData.map(renderStoreCard)}
              </View>
            ) : (
              <Text style={{ color: 'gray', fontStyle: 'italic' }}>
                No centers found in your block
              </Text>
            )}
          </ScrollView>
        )}

        {!showOptionsInitially && (
          <TouchableOpacity
            onPress={() => {
              setShowOptionsInitially(true);
              setSelectedOption(null);
            }}
            style={{ alignSelf: 'center', marginTop: 20 }}
          >
            <Text style={{ color: '#007BFF', fontSize: 16, fontWeight: 'bold' }}>
              Change Delivery Option
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  content: { flex: 1, padding: screenWidth * 0.04 },
  title: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  optionCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  selectedCard: { borderColor: '#28a745', backgroundColor: '#e9fbe9' },
  optionText: { fontSize: 15, fontWeight: '600', flex: 1 },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: { borderColor: '#28a745' },
  radioButtonInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#28a745' },
  subTitle: { fontSize: 16, fontWeight: '800' },
  scrollContent: { paddingBottom: 20 },
  storeSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    marginLeft: 6,
  },
  storeCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    marginHorizontal: 4,
    width: screenWidth * 0.9,
    maxHeight: screenHeight * 0.12,
  },
  storeImage: {
    width: screenWidth * 0.20,
    aspectRatio: 1,
    borderRadius: 8,
    marginRight: 12,
  },
  storeDetails: { flex: 1 },
  storeName: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  storeButtons: { flexDirection: 'row', flexWrap: 'wrap' },
  button: {
    backgroundColor: '#28a745',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginRight: 10,
    marginBottom: 5,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
