import React, { createContext, useContext, useEffect, useState } from "react";
import * as cartApi from "../api/cartApi";

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const [state, setState] = useState({
    items: [],
    total: 0,
    itemCount: 0,
    loading: true,
  });

  // Load cart from backend on app start
  const loadCart = async () => {
    try {
      const cart = await cartApi.getCart();
      setState({
        items: cart.items.map(item => ({
          id: item._id,                // cart item id
          productId: item.product._id, // product id
          name: item.product.name,
          price: item.price,
          image: item.product.images?.[0],
          quantity: item.quantity,
        })),
        total: cart.total,
        itemCount: cart.itemCount,
        loading: false,
      });
    } catch (err) {
      console.error(err);
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  // API-powered actions
  const addItem = async (productId) => {
    const cart = await cartApi.addToCart(productId, 1);
    loadCart();
  };

  const updateQuantity = async (itemId, quantity) => {
    if (quantity < 1) return removeItem(itemId);
    await cartApi.updateCartItem(itemId, quantity);
    loadCart();
  };

  const removeItem = async (itemId) => {
    await cartApi.removeCartItem(itemId);
    loadCart();
  };

  const clear = async () => {
    await cartApi.clearCart();
    loadCart();
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        updateQuantity,
        removeItem,
        clear,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
