import { createContext, useContext } from "react";
import CounterStore from "../store/counterStore";

const CounterStoreContext = createContext<CounterStore | undefined>(undefined);

export const CounterStoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const counterStore = new CounterStore();
  return (
    <CounterStoreContext.Provider value={counterStore}>
      {children}
    </CounterStoreContext.Provider>
  );
};

export const useCounterStore = () => {
  const store = useContext(CounterStoreContext);
  if (!store) {
    throw new Error(
      "useCounterStore must be used within a CounterStoreProvider"
    );
  }
  return store;
};
