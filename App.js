import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { AppProviders } from './src/Contexts/AppProvider';
import {Text} from 'react-native'
export default function App() {

  

if (Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;
Text.defaultProps.style = { fontFamily: 'Oldenburg-Regular'};

   return (
    <AppProviders>
      <AppNavigator />
    </AppProviders>
  );
   
   

   
  
}




