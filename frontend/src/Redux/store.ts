import { configureStore } from "@reduxjs/toolkit"
import productReducer from "./reducers/productReducer"
import userReducer from "./reducers/userReducer"
import cardReducer from "./reducers/card"

const logger = (store: { getState: () => any; }) => (next: (arg0: any) => any) => (action: any) => {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
  } 

const store = configureStore({
    reducer: {
        productReducer,
        userReducer,
        cardReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export type GlobalState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store