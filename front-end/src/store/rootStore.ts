import CounterStore from "./counterStore";

class RootStore {
  counterStore: CounterStore;

  constructor() {
    this.counterStore = new CounterStore();
  }
}

export default RootStore;
