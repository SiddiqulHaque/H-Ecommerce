"use client";
import { createContext, useEffect, useReducer } from "react";
const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD":
      return {
        ...state,
        items: payload.items,
      };

    case "REMOVE":
      return {
        ...state,
        items: payload.items,
      };

    default:
      throw new Error("No case for that type");
  }
};
const storedItems = JSON.parse(localStorage.getItem("cart")) || [];

const initialState = {
  items: [...storedItems],
};
export const CartContext = createContext(initialState);
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  useEffect(() => {
    if (state.items?.length > 0) {
      localStorage.setItem("cart", JSON.stringify(state.items));
    }
  }, [state.items]);
  const addToCart = (product) => {
    const updatedCart = [...state.items, product];

    dispatch({
      type: "ADD",
      payload: {
        items: updatedCart,
      },
    });
  };

  const removeFromCart = (id) => {
    const pos = state.items.indexOf(id);
     if (pos != -1) {
      var updatedCart = state.items.filter((value, index) => index !== pos);
    }
    dispatch({
      type: "REMOVE",
      payload: {
        items: updatedCart,
      },
    });
  };
  const value = {
    items: state.items,
    addToCart,
    removeFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
