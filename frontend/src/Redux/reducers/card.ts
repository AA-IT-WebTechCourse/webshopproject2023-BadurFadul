import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { CartItem } from "../../Types/CartItem";
import { Products } from "../../Types/Products";

const initialState: {
    items: CartItem[]
    loading: boolean,
    error: string
} = {
    items:[],
    loading: false,
    error: ""
}


const cardSlice = createSlice({
    name:"cardlist",
    initialState,
    reducers: {
      addToCart: (state, action: PayloadAction<Products>) => {
        const itemInCart = state.items.find(item => item.product.id === action.payload.id)
        if(itemInCart) {
            itemInCart.quantity++;
        } else {
            state.items.push({ product: action.payload, quantity: 1 });
        }
    },
        removeProductFromCart: (state, action: PayloadAction<string>) => {
            const productId = action.payload;
            state.items = state.items.filter(
              (item) => item.product.id !== productId
            );
          },
          updateProductQuantityInCart: (
            state,
            action: PayloadAction<{ productId: string; quantity: number }>
          ) => {
            const { productId, quantity } = action.payload;
            const existingItem = state.items.find(
              (item) => item.product.id === productId
            );
            if (existingItem) {
              existingItem.quantity = quantity;
            }
          },
          emptyCart: () => {
            return initialState
          }
    }
})

const cardReducer = cardSlice.reducer
export const {addToCart, removeProductFromCart, updateProductQuantityInCart, emptyCart } = cardSlice.actions
export default cardReducer