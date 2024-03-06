import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  items: [] ,
  totalPrice: 0
}

const countTotalPrice = (arr) => {
  return arr.reduce((sum, obj) => {
    return (obj.price * obj.count) + sum;
  }, 0)
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const findItem = state.items.find(obj => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1
        })
      }

      state.totalPrice = countTotalPrice(state.items); 
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(obj => obj.id !== action.payload);
      state.totalPrice = countTotalPrice(state.items); 
    },
    incCount: (state, action) => {
      const findItem = state.items.find(obj => obj.id === action.payload);
      findItem.count++;

      state.totalPrice = countTotalPrice(state.items); 
    },
    decCount: (state, action) => {
      const findItem = state.items.find(obj => obj.id === action.payload);
      findItem.count--;

      state.totalPrice = countTotalPrice(state.items); 
    }
  }
})

const {actions, reducer} = cartSlice;

export const {
  addItem,
  removeItem,
  incCount,
  decCount
} = actions

export default reducer