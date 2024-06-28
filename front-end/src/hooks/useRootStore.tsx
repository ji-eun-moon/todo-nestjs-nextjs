import React, { createContext, useContext } from "react";
import RootStore from "../store/rootStore";

const RootStoreContext = createContext<RootStore | undefined>(undefined);

export const RootStoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const rootStore = new RootStore();
  return (
    <RootStoreContext.Provider value={rootStore}>
      {children}
    </RootStoreContext.Provider>
  );
};

export const useRootStore = () => {
  const rootStore = useContext(RootStoreContext);
  if (!rootStore) {
    throw new Error("useRootStore must be used within a RootStoreProvider");
  }
  return rootStore;
};
