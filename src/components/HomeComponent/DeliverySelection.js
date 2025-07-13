// DeliverySelection.js
import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  FlatList,
  Image,
  Linking,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAddress } from '../../Contexts/AddressContext';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { UserContext } from '../../Contexts/UserContext';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');


const DeliverySelection = () => {

  const { user } = useContext(UserContext);
  const { addressList, deleteAddress, setEditingAddress } = useAddress();
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(null);
  const [showOptionsInitially, setShowOptionsInitially] = useState(true);


  const handleOptionSelect = (option) => {
    const label = option === 'delivery' ? 'Home Delivery' : 'Pickup from Store';
    Alert.alert('Confirm Selection', `Proceed with ${label}?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Yes',
        onPress: () => {
          setSelectedOption(option);
          setShowOptionsInitially(false);
        },
      },
    ]);
  };

  const renderAddressCards = () => (
    <>
      <View style={styles.cardHeaderRow}>
        <Text style={styles.subTitle}>Saved Addresses</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddressScreen')}>
          <Text style={styles.addAddressText}>Change Address</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
        {addressList.map((item, index) => (
          <View style={styles.card} key={index}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.farmerName || user?.name || 'N/A'}</Text>



              <View style={{ flexDirection: 'row', gap: 20 }}>
                {/* EDIT ICON */}
                <TouchableOpacity onPress={() => {
                  setEditingAddress({ ...item, index });
                  navigation.navigate('NewAddress');

                }}>
                  <Icon name="edit" size={25} color="#2196F3" />
                </TouchableOpacity>


                {/* DELETE ICON */}
                <TouchableOpacity onPress={() => deleteAddress(index)}>
                  <Icon name="delete" size={22} color="red" />
                </TouchableOpacity>
              </View>


            </View>
            <View style={styles.cardRow}><Icon name="phone" size={16} style={styles.icon} /><Text>+91 {item.farmerPhone}</Text></View>
            <View style={styles.cardRow}><Icon name="home" size={16} style={styles.icon} /><Text>{item.houseNameArea}, {item.landmark}</Text></View>
            <View style={styles.cardRow}><Icon name="location-city" size={16} style={styles.icon} /><Text>{item.village}, {item.block}</Text></View>
            <View style={styles.cardRow}><Icon name="map" size={16} style={styles.icon} /><Text>{item.district}, {item.state} - {item.pincode}</Text></View>
          </View>
        ))}
      </ScrollView>
    </>
  );

  const renderStoreCard = () => (

    <View style={styles.storeCard}>

      <Image
        source={{ uri: 'https://cdn-icons-png.freepik.com/256/13531/13531631.png' }}
        style={styles.storeImage}
      />
      <View style={styles.storeDetails}>
        <Text style={styles.storeName}>GreenMart Local Store</Text>
        <View style={styles.storeButtons}>
          <TouchableOpacity style={styles.button} onPress={() => Linking.openURL('tel:9337370441')}>
            <Text style={styles.buttonText}>Call Shop</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => Linking.openURL('https://maps.google.com/?q=GreenMart')}>
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
                  style={[styles.optionCard, selectedOption === option && styles.selectedCard]}
                  onPress={() => handleOptionSelect(option)}
                >
                  <Text style={styles.optionText}>
                    {option === 'delivery' ? 'Home\nDelivery' : 'Pickup\nfrom Store'}
                  </Text>
                  <View
                    style={[styles.radioButton, selectedOption === option && styles.radioButtonSelected]}
                  >
                    {selectedOption === option && <View style={styles.radioButtonInner} />}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : selectedOption === 'delivery' ? (
          addressList.length > 0 ? (
            renderAddressCards()
          ) : (
            <View style={styles.centerContent}>
              <Text style={styles.noAddressText}>No address saved yet.</Text>
              <TouchableOpacity onPress={() => navigation.navigate('AddressScreen')}>
                <Text style={styles.addAddressText}>+ Add Address</Text>
              </TouchableOpacity>
            </View>
          )
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.storeSectionTitle}>Nearest One Center</Text>
            {[1, 2].map((_, i) => (
              <React.Fragment key={i}>
                {renderStoreCard()}
              </React.Fragment>
            ))}
          </ScrollView>
        )}

        {/* Show Change Option button only after user made a selection */}
        {!showOptionsInitially && (
          <TouchableOpacity
            onPress={() => setShowOptionsInitially(true)}
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
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  content: { flex: 1, padding: screenWidth * 0.04, justifyContent: 'center' },
  title: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  subTitle: { fontSize: 16, fontWeight: '800' },
  optionsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
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

  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  horizontalScroll: {
    paddingBottom: 12,
    paddingHorizontal: 4,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: screenWidth * 0.030,
    borderRadius: 10,
    marginRight: 12,
    width: screenWidth * 0.60,
    // height: screenHeight * 0.15,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  icon: { marginRight: 8, color: '#555' },

  noAddressText: { fontSize: 16, color: 'gray', marginTop: 20 },
  addAddressText: {
    marginVertical: 10,
    color: '#28a745',
    fontSize: 15,
    fontWeight: 'bold',
    textDecorationLine: 'none',
  },
  centerContent: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  scrollContent: { paddingBottom: 20 },

  storeCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    marginBottom: 16,
    marginHorizontal: 4,
    width: screenWidth * 0.9,
    maxHeight: screenHeight * 0.12,
  },
  storeImage: {
    width: screenWidth * 0.15,
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
  storeSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    marginLeft: 6,
  },


});

export default DeliverySelection;
