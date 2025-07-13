import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View, Dimensions } from 'react-native';

import HomeContent from '../screens/HomeContent';
import ShopNowScreen from '../screens/BottomTabScreens/ShopNowScreen';
import RentNowScreen from '../screens/BottomTabScreens/RentNowScreen';
import MyCartScreen from '../screens/BottomTabScreens/MyCartScreen';

// Tab icon images
const homeIcon = require('../assests/images/logo.png');
const shopIcon = require('../assests/images/shop.png');
const rentIcon = require('../assests/images/rent.png');
const cartIcon = require('../assests/images/cart.png');

const Tab = createBottomTabNavigator();

const { height } = Dimensions.get('window');
const TAB_BAR_HEIGHT = height * 0.11;
const ICON_SIZE = 32;              // base size for most icons
const HOME_ICON_SCALE = 1.6;       // scale factor for the Home icon

export default function HomeTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          const iconColor = focused ? '#fc03cf' : 'black';

          // Common container style
          const containerStyle = {
            width: '100%',
            height: TAB_BAR_HEIGHT,
            justifyContent: 'center',
            alignItems: 'center',
          };

          // Base style shared by all icons
          const baseImageStyle = {
            resizeMode: 'contain',
            marginTop:10,
            marginBottom: 10,
            tintColor: iconColor,
          };

          // Choose source and size per route
          let imageSource;
          let imageStyle;

          switch (route.name) {
            case 'Home':
              imageSource = homeIcon;
              imageStyle = {
                ...baseImageStyle,
                width: ICON_SIZE * HOME_ICON_SCALE,
                height: ICON_SIZE * HOME_ICON_SCALE,
              };
              break;

            case 'ShopNowScreen':
              imageSource = shopIcon;
              imageStyle = {
                ...baseImageStyle,
                width: ICON_SIZE,
                height: ICON_SIZE,
              };
              break;

            case 'RentNow':
              imageSource = rentIcon;
              imageStyle = {
                ...baseImageStyle,
                width: ICON_SIZE,
                height: ICON_SIZE,
              };
              break;

            case 'MyCartScreen':
              imageSource = cartIcon;
              imageStyle = {
                ...baseImageStyle,
                width: ICON_SIZE,
                height: ICON_SIZE,
              };
              break;

            default:
              imageSource = homeIcon;
              imageStyle = {
                ...baseImageStyle,
                width: ICON_SIZE,
                height: ICON_SIZE,
              };
          }

          return (
            <View style={containerStyle}>
              <Image source={imageSource} style={imageStyle} />
            </View>
          );
        },
        tabBarActiveTintColor: '#fc03cf',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          height: TAB_BAR_HEIGHT,
          backgroundColor: '#b1e0cd',
          borderTopLeftRadius: 23,
          borderTopRightRadius: 23,
        },
        tabBarLabelStyle: {
          fontSize: 11,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeContent}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="ShopNowScreen"
        component={ShopNowScreen}
        options={{ title: 'Shop' }}
      />
      <Tab.Screen
        name="RentNow"
        component={RentNowScreen}
        options={{ title: 'Rent' }}
      />
      <Tab.Screen
        name="MyCartScreen"
        component={MyCartScreen}
        options={{ title: 'Cart' }}
      />
    </Tab.Navigator>
  );
}
