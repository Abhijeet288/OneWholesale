import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from '@react-navigation/native';
import { UserContext } from '../../Contexts/UserContext';


const { width, height } = Dimensions.get('window');

export const DrawerContent = ({ navigation }) => {
  const { user } = useContext(UserContext)
  const userProfile = {
    name: user.name,
    phone: user.phoneNumber,
  };


  const sections = [
    // {
    //   title: 'ONDC',

    //   items: [{ icon: 'shopping-cart', label: 'Shop via ONDC', isNew: true, navigateTo: 'Ondcshop' }],
    // },
    {
      title: 'Orders and Bookings',
      items: [
        { icon: 'shopping-bag', label: 'Orders' },
        //{ icon: 'calendar', label: 'My booking' },
      ],
    },
    {
      title: 'Earn with OneWholesale',

      items: [
        { icon: 'gift', label: 'Refer & Earn', isNew: true },
        { icon: 'ticket', label: 'My coupon' },
      ],
    },
    {
      title: 'OneWholesale Services',

      items: [
        { icon: 'cloud', label: 'Weather', navigateTo: 'WeatherScreenDrawer' },
        { icon: 'satellite', label: 'Precison Farming', navigateTo: '' },

      ],
    },
    {
      title: 'Help and Support',

      items: [
        { icon: 'phone', label: 'Call krushi expert', navigateTo: 'CallSupport' },
        { icon: 'whatsapp', label: 'Chat on whatsapp', navigateTo: 'WhatsappSupport' },
      ],
    },
    // {
    //   title: 'My Activity',

    //   items: [
    //     { icon: 'image', label: 'My Post' },
    //     { icon: 'map-location-dot', label: 'My tagged Farm', },
    //   ],
    // },
    {
      title: 'Account Settings',
      items: [
        { icon: 'language', label: 'Select Language', navigateTo: 'LanguageDrawer' },
        { icon: 'location-dot', label: 'Saved Address', navigateTo: 'AddressDrawer' },
        { icon: 'address-card', label: 'Terms & Condition' },
        { icon: 'file', label: 'Privacy & Policy' },
      ],
    },
    {
      title: 'Insurance',

      items: [
        { icon: '', label: 'KYC' },
        //{ icon: 'umbrella', label: 'My Policy', },
        //{ icon: 'shield', label: 'My Claims', },

      ],
    },
    {
      title: 'Credit',

      items: [
        { icon: 'person', label: 'Loan', isNew: true },

      ],
    },

  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}
        >
          <MaterialIcons name="keyboard-arrow-left" size={32} color="black" />
        </TouchableOpacity>
        <Image
          source={require('../../assests/images/mainlogo.png')}
          style={styles.headerImage}
        />
      </View>
      <View style={styles.profileCard}>
        <View style={styles.profileInfo}>
          <View style={styles.profileImageContainer}>
            <MaterialIcons name="person" size={40} color="#666" />
            <View style={styles.cameraIcon}>
              <MaterialIcons name="photo-camera" size={16} color="#fff" />
            </View>
          </View>
          <View>
            <Text style={styles.name}>{userProfile.name}</Text>
            <Text style={styles.phone}>{userProfile.phone}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditPersonalDetails')}>
          <MaterialIcons name="edit" size={20} color="green" />
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.menuContainer} showsVerticalScrollIndicator={false}>
        {sections.map((section, i) => (
          <View key={i} style={styles.section}>
            <View style={styles.sectionHeader}>
              {/* <FontAwesome name={section.icon} size={18} color="#27ae60" style={{ marginRight: 6 }} /> */}
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
            {section.items.map((item, j) => (
              <TouchableOpacity key={j} style={styles.menuItem} onPress={() => navigation.navigate(item.navigateTo)}>
                <FontAwesome name={item.icon} size={22} color="#666" />
                <Text style={styles.menuItemText}>{item.label}</Text>
                {item.isNew && (
                  <View style={styles.newBadge}>
                    <Text style={styles.newBadgeText}>New</Text>
                  </View>
                )}
                <MaterialIcons name="chevron-right" size={24} color="#666" />
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => navigation.replace('LoginDelivery')}
      >
        <FontAwesome name="sign-out" size={22} color="#e74c3c" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    backgroundColor: '#e6f5ec',

  },
  header: {
    backgroundColor: '#b1e0cd',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // center horizontally
    paddingVertical: height * 0.02,
    position: 'relative', // allow absolute positioning for back button
  },
  headerImage: {
    width: width * 0.33, // increase size
    height: height * 0.12,
    // borderWidth:2,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    // resizeMode: 'contain',
    // marginBottom:0
    
  },
  backButton: {
    position: 'absolute',
    left: width * 0.04,
    
  },

  profileCard: {
    backgroundColor: '#b1e0cd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.015,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileInfo: {
    backgroundColor: 'white',
    padding: width * 0.03, 
    flexDirection: 'row',
    borderRadius: 12,
    flex: 1,
    alignItems: 'center',
  },
  profileImageContainer: {
    width: width * 0.15,
    height: width * 0.14,
    borderRadius: width * 0.07,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: width * 0.03,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#27ae60',
    borderRadius: 10,
    padding: width * 0.01,
  },
  name: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  phone: {
    fontSize: width * 0.035,
    color: '#666',
    marginTop: height * 0.005,
  },
  editButton: {
    position: 'absolute',
    right: width * 0.05,
    top: height * 0.025,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: height * 0.005,
    paddingHorizontal: width * 0.02,
    borderRadius: 8,
  },
  editText: {
    color: 'green',
    marginLeft: width * 0.01,
    fontSize: width * 0.035,
  },
  menuContainer: {
    flex: 1,
    marginTop: height * 0.015,
  },
  section: {
    marginVertical: height * 0.005,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.01,
  },
  sectionTitle: {
    fontSize: width * 0.045,
    fontWeight: '800',
    color: '#333',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.015,
  },
  menuItemText: {
    flex: 1,
    marginLeft: width * 0.03,
    fontSize: width * 0.04,
    color: '#333',
  },
  newBadge: {
    backgroundColor: '#e74c3c',
    borderRadius: 10,
    paddingHorizontal: width * 0.02,
    paddingVertical: height * 0.002,
    marginRight: width * 0.02,
  },
  newBadgeText: {
    color: '#fff',
    fontSize: width * 0.03,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.02,
    borderTopWidth: 1,
    borderColor: '#eee',
    marginBottom: height * 0.01,
  },
  logoutText: {
    marginLeft: width * 0.03,
    fontSize: width * 0.04,
    color: '#e74c3c',
    fontWeight: 'bold',
  },

});


export default DrawerContent;
