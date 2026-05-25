import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: {}
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const plant = action.payload;
      if (!state.items[plant.id]) {
        state.items[plant.id] = { ...plant, quantity: 1 };
      }
    },
    increaseQuantity: (state, action) => {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id].quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const id = action.payload;
      if (!state.items[id]) {
        return;
      }
      if (state.items[id].quantity === 1) {
        delete state.items[id];
      } else {
        state.items[id].quantity -= 1;
      }
    },
    deleteItem: (state, action) => {
      delete state.items[action.payload];
    }
  }
});

export const { addToCart, increaseQuantity, decreaseQuantity, deleteItem } = cartSlice.actions;
export default cartSlice.reducer;
