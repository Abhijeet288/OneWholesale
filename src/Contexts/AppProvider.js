import { AddressProvider } from "./AddressContext";
import { CartProvider } from "./CartContext";
import { LocationProvider } from "./LocationContext";
import { UserProvider } from "./UserContext";

 const AppProvider = ({ children }) => {
  console.log('AppProviders initialized');

  return (
    <UserProvider>
      <LocationProvider>
        <CartProvider>
          <AddressProvider>
            {children}
          </AddressProvider>
        </CartProvider>
      </LocationProvider>
    </UserProvider>
  );
};
export default AppProvider;