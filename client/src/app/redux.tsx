import React, { useRef, useEffect, useState } from "react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  Provider,
} from "react-redux";
import globalReducer from "@/src/state";
import { api } from "@/src/state/api";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

/* ------------------ Storage ------------------ */
const createNoopStorage = () => ({
  getItem: (_key: string) => Promise.resolve(null),
  setItem: (_key: string, value: string) => Promise.resolve(value),
  removeItem: (_key: string) => Promise.resolve(),
});

const storage =
  typeof window !== "undefined" && typeof window.localStorage !== "undefined"
    ? {
        getItem: (key: string) =>
          Promise.resolve(window.localStorage.getItem(key)),
        setItem: (key: string, value: string) => {
          window.localStorage.setItem(key, value);
          return Promise.resolve(value);
        },
        removeItem: (key: string) => {
          window.localStorage.removeItem(key);
          return Promise.resolve();
        },
      }
    : createNoopStorage();

/* ------------------ Persist Config ------------------ */
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["global"],
};

/* ------------------ Root Reducer ------------------ */
const rootReducer = combineReducers({
  global: globalReducer,
  [api.reducerPath]: api.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

/* ------------------ Store ------------------ */
export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefault) =>
      getDefault({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(api.middleware),
  });
};

/* ------------------ Types ------------------ */
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/* ------------------ Provider ------------------ */
export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(undefined);
  const [isClient, setIsClient] = useState(false);
  const [persistor, setPersistor] = useState<any>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
    setupListeners(storeRef.current.dispatch);
  }

  // Only create persistor on client
  useEffect(() => {
    setPersistor(persistStore(storeRef.current!));
    setIsClient(true);
  }, []);

  if (!isClient || !persistor) {
    // During SSR, render children without PersistGate
    return <Provider store={storeRef.current}>{children}</Provider>;
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
