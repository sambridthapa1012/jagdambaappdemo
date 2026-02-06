import React, { createContext, useContext, useEffect, useState } from "react";
import * as cartApi from "../api/cartApi";
import { useAuth } from "./AuthContext";

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const [state, setState] = useState({
    items: [],
    total: 0,
    itemCount: 0,
    loading: true,
  });

  const resetCart = () => {
    setState({
      items: [],
      total: 0,
      itemCount: 0,
      loading: false,
    });
  };

  const loadCart = async () => {
    try {
      const cart = await cartApi.getCart();

      setState({
        items: cart.items.map(item => ({
          id: item._id,
          productId: item.product._id,
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
      resetCart();
    }
  };

  /* 🔑 RELOAD CART ON LOGIN / CLEAR ON LOGOUT */
  useEffect(() => {
    if (isAuthenticated) {
      loadCart();
    } else {
      resetCart();
    }
  }, [isAuthenticated]);

  // API actions
  const addItem = async (productId) => {
    await cartApi.addToCart(productId, 1);
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

// ❌ removes DB data (use only on checkout)
const clearServerCart = async () => {
  await cartApi.clearCart();
  loadCart();
};

// ✅ frontend-only reset (use on logout)
const clearLocalCart = () => {
  setState({
    items: [],
    total: 0,
    itemCount: 0,
    loading: false,
  });
};


  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        updateQuantity,
        removeItem,
        clearServerCart,
        clearLocalCart
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
