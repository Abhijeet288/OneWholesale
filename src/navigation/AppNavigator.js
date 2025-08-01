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
import { LocationProvider } from '../Contexts/LocationContext';
import LoginFarmer from '../screens/LoginFarmer';
import LoginDelivery from '../screens/LoginDelivery';
import { AppProviders } from '../Contexts/AppProvider';
import MandiPrice from '../screens/HomeSccreens/MandiPrice';
import Weather from '../screens/HomeSccreens/Weather';
import NearestStore from '../screens/HomeSccreens/NearestStore';
import CropDoctor from '../screens/HomeSccreens/CropDoctor';
import SoilTesting from '../screens/HomeSccreens/SoilTesting';
import HappyKissan from '../screens/HomeSccreens/HappyKissan';
import OtpVerification from '../components/OtpVerification';
import SignupPrompt from '../components/SignupPrompt';
import RentSector from '../screens/Rental/RentSector';
import MyCartScreen from '../screens/BottomTabScreens/MyCartScreen';
import ShopNowScreen from '../screens/BottomTabScreens/ShopNowScreen';
import AddAddressPage from '../screens/Shop/AddAddressPage';
import Coupon from '../components/Coupon';
import AddressScreen from '../components/AddressScreen';
import AddressDrawer from '../screens/DrawerScreens/AddressDrawer';
import DeliverySelection from '../components/HomeComponent/DeliverySelection';
import EditAddress from '../components/EditAddress';
import RentalSubcategory from '../screens/Rental/RentalSubcategory';
import Tractor from '../screens/Rental/RentalScreen/Tractor';
import RentalRegistration from '../screens/Rental/RentalRegistration';


const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    
    
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen  name="Firstpage" component={Firstpage} />
        <Stack.Screen name="Selection" component={Selection} />
        <Stack.Screen name="Language" component={Language} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="OtpVerification" component={OtpVerification} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="Location" component={Location} />
        <Stack.Screen name="LocationManual" component={LocationManual} />
        <Stack.Screen name="LoginFarmer" component={LoginFarmer} />
        <Stack.Screen name="LoginDelivery" component={LoginDelivery} />
        <Stack.Screen name="MandiPrice" component={MandiPrice} />
        <Stack.Screen name="Weather" component={Weather} />
        <Stack.Screen name="NearestStore" component={NearestStore} />
        <Stack.Screen name="CropDoctor" component={CropDoctor} />
        <Stack.Screen name="SoilTesting" component={SoilTesting} />
        <Stack.Screen name="HappyKissan" component={HappyKissan} />
        <Stack.Screen name="SignupPrompt" component={SignupPrompt} />
        <Stack.Screen name="RentalSubcategory" component={RentalSubcategory} />
        <Stack.Screen name="RentalRegistration" component={RentalRegistration} />
        <Stack.Screen name="RentSector" component={RentSector} /> 
        <Stack.Screen name="Tractor" component={Tractor} /> 


        <Stack.Screen name="MyCartScreen" component={MyCartScreen} />
        <Stack.Screen name="ShopNowScreen" component={ShopNowScreen} />
        <Stack.Screen name="AddAddressPage" component={AddAddressPage} />
        <Stack.Screen name="Coupon" component={Coupon} />
        <Stack.Screen name="AddressScreen" component={AddressScreen} />
        <Stack.Screen name="AddressDrawer" component={AddressDrawer} />
        <Stack.Screen name="EditAddress" component={EditAddress} />


    

        {/* <Stack.Screen name="AddressDrawer" component={DeliverySelection} /> */}
        <Stack.Screen name="MainApp" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
   
  );
}
