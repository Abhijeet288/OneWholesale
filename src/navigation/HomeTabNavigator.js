import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeContent from '../screens/HomeContent';
import ShopNowScreen from '../screens/ShopNowScreen';
import RentNowScreen from '../screens/RentNowScreen';
import MyCartScreen from '../screens/MyCartScreen';


const Tab = createBottomTabNavigator();
const homeIcon = require('../assests/images/mainlogo.png');

export default function HomeTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, size }) => {
          if (route.name === 'Home') {
            return (
              <Image
                source={homeIcon}
                style={{
                  width: size * 2.5,
                  height: size * 3,
                  tintColor: focused ? '#E91E63' : '#666',
                  marginTop: 23,
                }}
              />
            );
          }

          let iconName;
          switch (route.name) {
            case 'ShopNow':
              iconName = 'cart';
              break;
            case 'RentNow':
              iconName = 'business';
              break;
            case 'MyCart':
              iconName = 'basket';
              break;
          }

          return <Ionicons name={iconName} size={size} color={focused ? '#E91E63' : '#666'} />;
        },
        tabBarActiveTintColor: '#E91E63',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          paddingVertical: 10,
          height: 60,
          borderTopWidth: 1,
          borderTopColor: '#eee',
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeContent} options={{ tabBarLabel: () => null }} />
      <Tab.Screen name="ShopNow" component={ShopNowScreen} />
      <Tab.Screen name="RentNow" component={RentNowScreen} />
      <Tab.Screen name="MyCart" component={MyCartScreen} />
    </Tab.Navigator>
  );
}
