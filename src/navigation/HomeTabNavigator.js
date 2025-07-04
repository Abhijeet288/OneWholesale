import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeContent from '../screens/HomeContent';
import ShopNowScreen from '../screens/BottomTabScreens/ShopNowScreen';
import RentNowScreen from '../screens/BottomTabScreens/RentNowScreen';
import MyCartScreen from '../screens/BottomTabScreens/MyCartScreen';

const Tab = createBottomTabNavigator();
const homeIcon = require('../assests/images/mainlogo.png');

const { height, width } = Dimensions.get('window');
const TAB_BAR_HEIGHT = height * 0.11;

export default function HomeTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          const iconColor = focused ? '#4CAF50' : '#666';
          const iconSize = width * 0.065;

          const containerStyle = {
            width: '100%',
            height: TAB_BAR_HEIGHT,
            justifyContent: 'center',
            alignItems: 'center',
          };

          if (route.name === 'Home') {
            return (
              <View style={containerStyle}>
                <Image
                  source={homeIcon}
                  style={{
                    width: iconSize * 3,
                    height: iconSize * 3,
                    tintColor: iconColor,
                    resizeMode: 'contain',
                    top: 12,
                  }}
                />
              </View>
            );
          }

          if (route.name === 'ShopNowScreen') {
            return (
              <View style={containerStyle}>
                <Ionicons name="cart" size={iconSize} color={iconColor} />
              </View>
            );
          } else if (route.name === 'RentNow') {
            return (
              <View style={containerStyle}>
                <MaterialCommunityIcons
                  name="tractor"
                  size={iconSize}
                  color={iconColor}
                />
              </View>
            );
          } else if (route.name === 'MyCartScreen') {
            return (
              <View style={containerStyle}>
                <Ionicons name="basket" size={iconSize} color={iconColor} />
              </View>
            );
          }
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          height: TAB_BAR_HEIGHT,
          backgroundColor: '#b1e0cd',
          borderTopLeftRadius: 23,
          borderTopRightRadius: 23,
        },
        tabBarLabelStyle: {
          fontSize: width * 0.03,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeContent}
        options={{ tabBarLabel: () => null }}
      />
      <Tab.Screen
        name="ShopNowScreen"
        component={ShopNowScreen}
        options={{ title: 'Shop Now' }}
      />
      <Tab.Screen
        name="RentNow"
        component={RentNowScreen}
        options={{ title: 'Rent Now' }}
      />
      <Tab.Screen
        name="MyCartScreen"
        component={MyCartScreen}
        options={{ title: 'My Cart' }}
      />
    </Tab.Navigator>
  );
}
