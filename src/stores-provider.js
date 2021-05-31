import React, {useContext} from 'react';
import { storesContext } from "./stores-context";

export function StoresProvider({ children }) {
  const stores = useContext(storesContext);

  return (
    <storesContext.Provider value={stores}>
      {children}
    </storesContext.Provider>
  );
}

StoresProvider.displayName = 'StoresProvider';