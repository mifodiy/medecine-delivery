import { configureStore } from '@reduxjs/toolkit';

import shops from '../components/ShopList/shopSlice';
import cart from '../components/CartList/cartSlice'
import orders from '../components/OrderList/orderSlice'

const store = configureStore({
  reducer: {shops, cart, orders},
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;