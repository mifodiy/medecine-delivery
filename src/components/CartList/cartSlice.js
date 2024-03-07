import { createSlice } from "@reduxjs/toolkit"

const items = localStorage.getItem('cartItems') !== null ? JSON.parse(localStorage.getItem('cartItems')) : [];
const totalPrice = localStorage.getItem('totalPrice') !== null ? JSON.parse(localStorage.getItem('totalPrice')) : 0;
const processShop = localStorage.getItem('processShop') !== null ? JSON.parse(localStorage.getItem('processShop')) : null;

const initialState = {
  items,
  totalPrice,
	processShop,
}

const setItemFunc = (items, totalPrice, processShop) => {
  localStorage.setItem('cartItems', JSON.stringify(items));
  localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
  localStorage.setItem('processShop', JSON.stringify(processShop));
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
			
			setItemFunc(state.items.map(item => item), state.totalPrice, state.processShop);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(obj => obj.id !== action.payload);
      state.totalPrice = countTotalPrice(state.items); 

			if(state.items.length === 0){
        state.processShop = null;
      }

			setItemFunc(state.items.map(item => item), state.totalPrice, state.processShop);
    },
    incCount: (state, action) => {
      const findItem = state.items.find(obj => obj.id === action.payload);
      findItem.count++;

      state.totalPrice = countTotalPrice(state.items); 

			setItemFunc(state.items.map(item => item), state.totalPrice, state.processShop);
    },
    decCount: (state, action) => {
      const findItem = state.items.find(obj => obj.id === action.payload);
      findItem.count--;

      state.totalPrice = countTotalPrice(state.items); 

			setItemFunc(state.items.map(item => item), state.totalPrice, state.processShop);
    },
		clearCart: state => {
      state.items = [];
      state.totalPrice = countTotalPrice(state.items);
      state.processShop = null;

			setItemFunc(state.items.map(item => item), state.totalPrice, state.processShop);
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