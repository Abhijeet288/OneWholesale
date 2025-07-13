import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeTabNavigator from './HomeTabNavigator';
import ProfileScreen from '../screens/BottomTabScreens/ProfleScreens';
import DrawerContent from '../screens/DrawerScreens/DrawerContent';
import Ondcshop from '../screens/DrawerScreens/Ondcshop';
import EditPersonalDetails from '../screens/DrawerScreens/EditPersonalDetails';
import WeatherScreenDrawer from '../screens/DrawerScreens/WeatherScreenDrawer';
import LanguageDrawer from '../screens/DrawerScreens/LanguageDrawer';
import CallSupport from '../screens/DrawerScreens/CallSupport';
import WhatsappSupport from '../screens/DrawerScreens/WhatsappSupport';
import CustomHeader from '../components/DrawerComponent/CustomHeader';
import AddressDrawer from '../screens/DrawerScreens/AddressDrawer';
import NewAddress from '../screens/DrawerScreens/NewAddress';
import Tractor from '../screens/Rental/RentalScreen/Tractor';
import RentalRegistration from '../screens/Rental/RentalRegistration';
import MyCartScreen from '../screens/BottomTabScreens/MyCartScreen';
import AddAddressPage from '../screens/Shop/AddAddressPage';
import Traps from '../screens/Rental/RentalScreen/Traps';
import Pumpset from '../screens/Rental/RentalScreen/Pumpset';
import PowerTillers from '../screens/Rental/RentalScreen/PowerTillers';
import Motor from '../screens/Rental/RentalScreen/Motor';
import KissanDrone from '../screens/Rental/RentalScreen/KissanDrones';
import Harvestor from '../screens/Rental/RentalScreen/Harvestor';
import HandTools from '../screens/Rental/RentalScreen/HandTools';
import GardenTools from '../screens/Rental/RentalScreen/GardenTools';
import KissanDrones from '../screens/Rental/RentalScreen/KissanDrones';
import Coupon from '../components/Coupon';




const Drawer = createDrawerNavigator();

const drawerScreenTitles = {
  MainScreen: 'Home',
  EditPersonalDetails: 'Edit Profile',
  Ondcshop: 'ONDC Shop',
  WeatherScreenDrawer: 'Weather ',
  LanguageDrawer: 'Select your Language ',
  CallSupport: 'Call Support',
  WhatsappSupport: 'WhatsApp Support',
  Profile: 'My Profile',
  AddressDrawer:'My Addresses',
  NewAddress:'Add New Address',
  RentalRegistration:'Add your Details',
  AddAddressPage: 'Add New Address',
  Coupon: 'My Coupons',
  Tractor:'All tractor items',
  Traps:'All traps items',
  Pumpset:'All pumpset items',
  PowerTillers:'All powertillers items',
  Motor:'All motor items',
  KissanDrones:'All Drone items',
  Harvestor:'All Harvestor items',
  HandTools:'All Hand Tools items',
  GardenTools:'All Garden Tools items',

  
};

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerPosition="right"
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={({ route, navigation }) => {
        const title = drawerScreenTitles[route.name] || null ;
        if (route.name === 'MainScreen') {
          return {
            headerShown: false,
            drawerPosition: 'right',
            drawerStyle: { width: '85%' },
            drawerType: 'front',
            swipeEdgeWidth: 40,
          };
        }
        return {
          headerShown: true,
          drawerPosition: 'right',
          drawerStyle: { width: '85%' },
          drawerType: 'front',
          swipeEdgeWidth: 40,
          header: () => <CustomHeader title={title} navigation={navigation} />,
        };
      }}
    >
      <Drawer.Screen name="MainScreen" component={HomeTabNavigator}/>
      <Drawer.Screen name="EditPersonalDetails" component={EditPersonalDetails} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Ondcshop" component={Ondcshop} />
      <Drawer.Screen name="WeatherScreenDrawer" component={WeatherScreenDrawer} />
      <Drawer.Screen name="LanguageDrawer" component={LanguageDrawer} />
      <Drawer.Screen name="CallSupport" component={CallSupport} />
      <Drawer.Screen name="WhatsappSupport" component={WhatsappSupport} />
      <Drawer.Screen name="AddressDrawer" component={AddressDrawer} />
      {/* <Drawer.Screen name="NewAddress" component={NewAddress} /> */}
      <Drawer.Screen name="NewAddress" component={NewAddress} />
      <Drawer.Screen name="AddAddressPage" component={AddAddressPage} />
      <Drawer.Screen name="Coupon" component={Coupon} />





      <Drawer.Screen name="RentalRegistration" component={RentalRegistration} />
      <Drawer.Screen name="Tractor" component={Tractor} />
      <Drawer.Screen name="Traps" component={Traps} />
      <Drawer.Screen name="Pumpset" component={Pumpset} />
      <Drawer.Screen name="PowerTillers" component={PowerTillers} />
      <Drawer.Screen name="Motor" component={Motor} />
      <Drawer.Screen name="KissanDrones" component={KissanDrones} />
      <Drawer.Screen name="Harvestor" component={Harvestor} />
      <Drawer.Screen name="HandTools" component={HandTools} />
      <Drawer.Screen name="GardenTools" component={GardenTools} />









    </Drawer.Navigator>
  );
}
