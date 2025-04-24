import { configureStore } from "@reduxjs/toolkit"
import cryptoReducer from "./features/crypto/cryptoSlice"
import { localStorageReducer } from "./features/localStorageSlice"


export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
    localStorage: localStorageReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
