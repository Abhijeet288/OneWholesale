import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import React, { useContext, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAddress } from '../../Contexts/AddressContext';
import { UserContext } from '../../Contexts/UserContext';

const { width } = Dimensions.get('window');

const AddressDrawer = () => {
    const navigation = useNavigation();
    const{user}=useContext(UserContext);
    // const[selectIndex,seTSelectIndex]=useState(null);

    const handleAddNew = () => {
        navigation.navigate('NewAddress');
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.centerContent}>
                    {addressList.length > 0 ? (
                        addressList.map((item, index) => (
                            <View style={styles.card} key={index}>
                                <View style={styles.cardHeader}>
                                    <Text style={styles.cardTitle}>{item.farmerName || user?.name || 'N/A'}</Text>

                                    <View style={{ flexDirection: 'row', gap: 20 }}>
                                        <TouchableOpacity onPress={() => {
                                            setEditingAddress({ ...item, index,farmerName: item.farmerName || user?.name || '' });
                                            navigation.navigate('NewAddress');
                                        }}>
                                            <Icon name="edit" size={25} color="#2196F3" />
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => deleteAddress(index)}>
                                            <Icon name="delete" size={25} color="red" />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {item.farmerPhone ? (
                                    <View style={styles.cardRow}>
                                        <Icon name="phone" size={18} color="#555" style={styles.icon} />
                                        <Text>+91 {item.farmerPhone}</Text>
                                    </View>
                                ) : null}

                                {item.farmerAddress ? (
                                    <View style={styles.cardRow}>
                                        <Text>{item.farmerAddress}</Text>
                                    </View>
                                ) : null}

                                <View style={styles.cardRow}>
                                    <Icon name="home" size={18} color="#555" style={styles.icon} />
                                    <Text>{item.houseNameArea || 'N/A'}, {item.landmark || 'N/A'}</Text>
                                </View>

                                <View style={styles.cardRow}>
                                    <Icon name="location-city" size={18} color="#555" style={styles.icon} />
                                    <Text>{item.village || 'N/A'}, {item.block || 'N/A'}</Text>
                                </View>

                                <View style={styles.cardRow}>
                                    <Icon name="map" size={18} color="#555" style={styles.icon} />
                                    <Text>{item.district || 'N/A'}, {item.state || 'N/A'} - {item.pincode || 'N/A'}</Text>
                                </View>
                            </View>
                        ))
                    ) : (
                        <View style={styles.centerIconWrapper}>
                            <Icon name="location-on" size={60} color="grey" />
                            <Text style={styles.noAddressText}>No address saved yet.</Text>
                        </View>
                    )}

                </View>
            </ScrollView>

            <View style={styles.buttonWrapper}>
                <TouchableOpacity
                    style={[styles.saveButton, { backgroundColor: '#4CAF50' }]}
                    onPress={handleAddNew}
                >
                    <Text style={styles.saveButtonText}>+ Add New Address</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    scrollContent: { padding: 20 },
    centerContent: { alignItems: 'center' },
    centerIconWrapper: { alignItems: 'center', justifyContent: 'center', flex: 1 },
    card: {
        width: width * 0.9,
        padding: 16,
        borderRadius: 10,
        backgroundColor: '#f5f5f5',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        marginBottom: 20,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    noAddressText: {
        fontSize: 16,
        color: 'gray',
        marginTop: 20,
    },
    buttonWrapper: {
        position: 'absolute',
        bottom: 50,
        left: 20,
        right: 20,
    },
    saveButton: {
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
    },
    saveButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    icon: {
        marginRight: 8,
    },
});

export default AddressDrawer;