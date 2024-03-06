import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  items: [] ,
  totalPrice: 0,
	processShop: null,
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

			state.processShop = action.payload.shop;
      state.totalPrice = countTotalPrice(state.items); 
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(obj => obj.id !== action.payload);
      state.totalPrice = countTotalPrice(state.items); 

			if(state.items.length === 0){
        state.processShop = null;
      }
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
    },
		clearCart: state => {
      state.items = [];
      state.totalPrice = countTotalPrice(state.items);
      state.processShop = null;
    }
  }
})

const {actions, reducer} = cartSlice;

export const {
  addItem,
  removeItem,
  incCount,
  decCount,
	clearCart
} = actions

export default reducer