import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {useHttp} from '../../hook/http.hook'

const initialState = {
  orders: [],
	serchOrders: [],
  ordersLoadingStatus: 'idle',
}

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  () => {
    const { request } = useHttp();
    return request("https://647478397de100807b1b010c.mockapi.io/orders")
  }
)

const orderSlice = createSlice({
  name: 'orders',
  initialState,
	reducers: {
    searchOrder: (state, action) => {
      state.serchOrders = state.orders.filter(order => 
				order.email === action.payload.email && order.phoneNumber === action.payload.phoneNumber)
    },


  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, state => {state.ordersLoadingStatus = 'loading'})
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.ordersLoadingStatus = 'idle';
        state.orders = action.payload;
				state.serchOrders = [];
      })
      .addCase(fetchOrders.rejected, state => {state.ordersLoadingStatus = 'error'})
  }
})

const {actions, reducer} = orderSlice;

export const {
  searchOrder
} = actions

export default reducer