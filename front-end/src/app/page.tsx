"use client";

import FirstChild from "./_components/FirstChild";
import SecondChild from "./_components/SecondChild";
import { CounterStoreProvider } from "../hooks/useCounterStore";

export default function Home() {
  return (
    <main className="container mx-auto flex flex-col gap-4 p-40">
      <CounterStoreProvider>
        <FirstChild />
        <SecondChild />
      </CounterStoreProvider>
    </main>
  );
}
