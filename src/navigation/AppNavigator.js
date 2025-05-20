import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Firstpage from '../screens/Firstpage';
import Selection from '../screens/Selection';
import Language from '../screens/Language';
import Signup from '../screens/Signup';
import Registration from '../screens/Registration';
import Location from '../screens/Location';
import LocationManual from '../screens/LocationManual';
import DrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Firstpage" component={Firstpage} />
        <Stack.Screen name="Selection" component={Selection} />
        <Stack.Screen name="Language" component={Language} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="Location" component={Location} />
        <Stack.Screen name="LocationManual" component={LocationManual} />
        <Stack.Screen name="MainApp" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
