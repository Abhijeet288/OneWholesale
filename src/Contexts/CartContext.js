import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((p) => p.productID === item.productID);
      if (existing) {
        return prev.map((p) =>
          p.productID === item.productID
            ? { ...p, quantityCount: p.quantityCount + 1 }
            : p
        );
      } else {
        return [...prev, { ...item, quantityCount: 1 }];
      }
    });
  };

  const removeFromCart = (productID) => {
    setCartItems((prev) => prev.filter((item) => item.productID !== productID));
  };

  const decreaseQuantity = (productID) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.productID === productID
            ? { ...item, quantityCount: item.quantityCount - 1 }
            : item
        )
        .filter((item) => item.quantityCount > 0)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItem,
        setCartItems,
        addToCart,
        removeFromCart,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
