


// import React, { createContext, useContext, useState } from 'react';

// const LocationContext = createContext();

// export const LocationProvider = ({ children }) => {
//   const [userAddress, setUserAddress] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Function to store address data locally (no API call)
//   const saveAddressLocally = (userId, addressData) => {
//     try {
//       const addressWithUser = {
//         ...addressData,
//         userId: userId,
//         savedAt: new Date().toISOString(),
//       };

//       setUserAddress(addressWithUser);
//       console.log('Address saved locally in context:', addressWithUser);
      
//       return { success: true, data: addressWithUser };
      
//     } catch (error) {
//       console.error('Error saving address locally:', error);
//       return { 
//         success: false, 
//         error: 'Failed to save address locally'
//       };
//     }
//   };

//   // Function to get current user address
//   const getUserAddress = (userId) => {
//     if (userAddress && userAddress.userId === userId) {
//       return { success: true, data: userAddress };
//     }
//     return { success: false, error: 'Address not found for user' };
//   };

//   // Function to clear address data
//   const clearAddress = () => {
//     setUserAddress(null);
//   };

//   // Function to update specific address fields
//   const updateAddressField = (field, value) => {
//     if (userAddress) {
//       setUserAddress(prev => ({
//         ...prev,
//         [field]: value,
//         updatedAt: new Date().toISOString(),
//       }));
//     }
//   };

//   const contextValue = {
//     userAddress,
//     loading,
//     saveAddressLocally,
//     getUserAddress,
//     clearAddress,
//     updateAddressField,
//     setUserAddress,
//     setLoading,
//   };

//   return (
//     <LocationContext.Provider value={contextValue}>
//       {children}
//     </LocationContext.Provider>
//   );
// };

// export const useLocation = () => {
//   const context = useContext(LocationContext);
//   if (!context) {
//     throw new Error('useLocation must be used within a LocationProvider');
//   }
//   return context;
// };

// export { LocationContext };








// // Contexts/LocationContext.js
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const LocationContext = createContext();

// export const LocationProvider = ({ children }) => {
//   const [userAddress, setUserAddress] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Load address from AsyncStorage on mount
//   useEffect(() => {
//     const loadAddress = async () => {
//       try {
//         const storedAddress = await AsyncStorage.getItem('user_address');
//         if (storedAddress) {
//           setUserAddress(JSON.parse(storedAddress));
//         }
//       } catch (error) {
//         console.error('Failed to load address from storage:', error);
//       }
//     };
//     loadAddress();
//   }, []);

//   // Save address to both context and AsyncStorage
//   const saveAddressLocally = async (userId, addressData) => {
//     try {
//       const addressWithUser = {
//         ...addressData,
//         userId,
//         savedAt: new Date().toISOString(),
//       };

//       setUserAddress(addressWithUser);
//       await AsyncStorage.setItem('user_address', JSON.stringify(addressWithUser));
//       console.log('Address saved locally and to AsyncStorage:', addressWithUser);

//       return { success: true, data: addressWithUser };
//     } catch (error) {
//       console.error('Error saving address locally:', error);
//       return {
//         success: false,
//         error: 'Failed to save address locally',
//       };
//     }
//   };

//   const getUserAddress = (userId) => {
//     if (userAddress && userAddress.userId === userId) {
//       return { success: true, data: userAddress };
//     }
//     return { success: false, error: 'Address not found for user' };
//   };

//   const clearAddress = async () => {
//     try {
//       setUserAddress(null);
//       await AsyncStorage.removeItem('user_address');
//     } catch (error) {
//       console.error('Failed to clear address from storage:', error);
//     }
//   };

//   const updateAddressField = async (field, value) => {
//     if (userAddress) {
//       const updatedAddress = {
//         ...userAddress,
//         [field]: value,
//         updatedAt: new Date().toISOString(),
//       };
//       setUserAddress(updatedAddress);
//       await AsyncStorage.setItem('user_address', JSON.stringify(updatedAddress));
//     }
//   };

//   return (
//     <LocationContext.Provider
//       value={{
//         userAddress,
//         loading,
//         saveAddressLocally,
//         getUserAddress,
//         clearAddress,
//         updateAddressField,
//         setUserAddress,
//         setLoading,
//       }}
//     >
//       {children}
//     </LocationContext.Provider>
//   );
// };

// export const useLocation = () => {
//   const context = useContext(LocationContext);
//   if (!context) {
//     throw new Error('useLocation must be used within a LocationProvider');
//   }
//   return context;
// };

// export { LocationContext };












// Contexts/LocationContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [userAddress, setUserAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load address from AsyncStorage on mount
  useEffect(() => {
    const loadAddress = async () => {
      try {
        const storedAddress = await AsyncStorage.getItem('user_address');
        if (storedAddress) {
          const parsedAddress = JSON.parse(storedAddress);
          setUserAddress(parsedAddress);
          console.log('Loaded address from storage:', parsedAddress);
        }
      } catch (error) {
        console.error('Failed to load address from storage:', error);
      }
    };
    loadAddress();
  }, []);

  // Save address to both context and AsyncStorage
  const saveAddressLocally = async (userId, addressData) => {
    try {
      // Ensure all required ID fields are present and properly structured
      const addressWithUser = {
        ...addressData,
        userId,
        // Ensure both camelCase and original field names are stored for compatibility
        stateId: addressData.stateId || addressData.stateID,
        districtId: addressData.districtId || addressData.districtID,
        blockId: addressData.blockId || addressData.blockID,
        stateID: addressData.stateID || addressData.stateId,
        districtID: addressData.districtID || addressData.districtId,
        blockID: addressData.blockID || addressData.blockId,
        savedAt: new Date().toISOString(),
      };

      setUserAddress(addressWithUser);
      await AsyncStorage.setItem('user_address', JSON.stringify(addressWithUser));
      
      console.log('Address saved locally and to AsyncStorage with IDs:', {
        stateId: addressWithUser.stateId,
        districtId: addressWithUser.districtId,
        blockId: addressWithUser.blockId,
        stateName: addressWithUser.stateName,
        districtName: addressWithUser.districtName,
        blockName: addressWithUser.blockName,
        village: addressWithUser.village,
        pinCode: addressWithUser.pinCode,
      });

      return { success: true, data: addressWithUser };
    } catch (error) {
      console.error('Error saving address locally:', error);
      return {
        success: false,
        error: 'Failed to save address locally',
      };
    }
  };

  const getUserAddress = (userId) => {
    if (userAddress && userAddress.userId === userId) {
      return { success: true, data: userAddress };
    }
    return { success: false, error: 'Address not found for user' };
  };

  // Get specific location IDs for easy access
  const getLocationIds = (userId) => {
    if (userAddress && userAddress.userId === userId) {
      return {
        success: true,
        data: {
          stateId: userAddress.stateId,
          districtId: userAddress.districtId,
          blockId: userAddress.blockId,
          stateName: userAddress.stateName,
          districtName: userAddress.districtName,
          blockName: userAddress.blockName,
        }
      };
    }
    return { success: false, error: 'Address not found for user' };
  };

  const clearAddress = async () => {
    try {
      setUserAddress(null);
      await AsyncStorage.removeItem('user_address');
      console.log('Address cleared from context and storage');
    } catch (error) {
      console.error('Failed to clear address from storage:', error);
    }
  };

  const updateAddressField = async (field, value) => {
    if (userAddress) {
      const updatedAddress = {
        ...userAddress,
        [field]: value,
        updatedAt: new Date().toISOString(),
      };
      setUserAddress(updatedAddress);
      await AsyncStorage.setItem('user_address', JSON.stringify(updatedAddress));
      console.log(`Updated address field ${field} to:`, value);
    }
  };

  // Update location selection (useful for changing state/district/block)
  const updateLocationSelection = async (locationData) => {
    if (userAddress) {
      const updatedAddress = {
        ...userAddress,
        ...locationData,
        // Ensure both field name conventions are updated
        stateId: locationData.stateId || locationData.stateID || userAddress.stateId,
        districtId: locationData.districtId || locationData.districtID || userAddress.districtId,
        blockId: locationData.blockId || locationData.blockID || userAddress.blockId,
        stateID: locationData.stateID || locationData.stateId || userAddress.stateID,
        districtID: locationData.districtID || locationData.districtId || userAddress.districtID,
        blockID: locationData.blockID || locationData.blockId || userAddress.blockID,
        updatedAt: new Date().toISOString(),
      };
      setUserAddress(updatedAddress);
      await AsyncStorage.setItem('user_address', JSON.stringify(updatedAddress));
      console.log('Updated location selection:', updatedAddress);
    }
  };

  return (
    <LocationContext.Provider
      value={{
        userAddress,
        loading,
        saveAddressLocally,
        getUserAddress,
        getLocationIds, // New method to get just the IDs
        clearAddress,
        updateAddressField,
        updateLocationSelection, // New method for updating location data
        setUserAddress,
        setLoading,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

export { LocationContext };