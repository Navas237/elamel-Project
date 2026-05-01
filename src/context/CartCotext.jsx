import { createContext } from "react";

/**
 * @deprecated This context is deprecated. 
 * Please use the Zustand store `useCartStore` from `src/store/useCartStore.js`
 * for all cart-related state and actions.
 */
export const cartcontext = createContext();

export const CartContextProvider = ({ children }) => {
  // Empty provider for backward compatibility during migration
  return (
    <cartcontext.Provider value={{}}>
      {children}
    </cartcontext.Provider>
  );
};
