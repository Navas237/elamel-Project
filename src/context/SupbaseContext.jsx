import { createContext } from "react";

/**
 * @deprecated This context is deprecated. 
 * Please use React Query hooks (useProducts, useShipping, useOffer, useCatagory, useHeaderImages) 
 * and Zustand stores for state management.
 */
export const supbasecontext = createContext();

export const DisplayProdectProvider = ({ children }) => {
  // Empty provider for backward compatibility during migration
  return (
    <supbasecontext.Provider value={{}}>
      {children}
    </supbasecontext.Provider>
  );
};