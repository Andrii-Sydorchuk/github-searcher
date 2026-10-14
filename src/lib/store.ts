import searchReducer from "./features/search/searchSlice";
import storage from "redux-persist/lib/storage/session";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";

const searchPersistConfig = {
  key: "search",
  storage,
  whitelist: ["cache", "entityType", "searchTerm"],
};

const persistedSearchReducer = persistReducer(
  searchPersistConfig,
  searchReducer,
);

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      search: persistedSearchReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
  const persistor = persistStore(store);

  return { store, persistor };
};

export type AppStore = ReturnType<typeof makeStore>["store"];
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
