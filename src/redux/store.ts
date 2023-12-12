import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import cartReducer from "./feature/cartSlice";
import userReducer from "./feature/userinfoSlice"
const reducer = combineReducers({
  cart: cartReducer,
  userInfo : userReducer
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["cart","userInfo"],
};

const persistor = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistor,
  middleware:(getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false}),
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch