import { configureStore } from '@reduxjs/toolkit';

import shops from '../components/shopsList/shopsSlice'

const store = configureStore({
  reducer: {shops},
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;