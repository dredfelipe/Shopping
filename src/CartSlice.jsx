import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: {}
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const plant = action.payload;
      if (!state.items[plant.id]) {
        state.items[plant.id] = { ...plant, quantity: 1 };
      }
    },
    removeItem: (state, action) => {
      delete state.items[action.payload];
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      if (!state.items[id]) {
        return;
      }

      if (quantity <= 0) {
        delete state.items[id];
      } else {
        state.items[id].quantity = quantity;
      }
    }
  }
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
