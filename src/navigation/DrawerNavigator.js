import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeTabNavigator from './HomeTabNavigator';
import ProfileScreen from '../screens/ProfleScreens';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="HomeTabs" component={HomeTabNavigator} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}
