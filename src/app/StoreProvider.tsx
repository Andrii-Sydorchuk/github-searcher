"use client";

import { useState } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/lib/store";
import { PersistGate } from "redux-persist/integration/react";

type StoreWithPersistor = ReturnType<typeof makeStore>;

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [{ store, persistor }] = useState<StoreWithPersistor>(makeStore);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
