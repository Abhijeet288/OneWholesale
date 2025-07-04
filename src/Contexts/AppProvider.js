import { AddressProvider } from "./AddressContext";
import { CartProvider } from "./CartContext";
import { LocationProvider } from "./LocationContext";
import { UserProvider } from "./UserContext";

export const AppProviders = ({ children }) => (
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

