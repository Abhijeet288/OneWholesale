import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import AppProvider from './src/Contexts/AppProvider';
import {Text} from 'react-native'
import Toast from 'react-native-toast-message';
export default function App() {

  

if (Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;
Text.defaultProps.style = { fontFamily: 'Oldenburg-Regular'};

   return (
    <>
    <AppProvider>
       <AppNavigator />
    </AppProvider>
      
     <Toast />
     </>
  );
   
   

   
  
}




