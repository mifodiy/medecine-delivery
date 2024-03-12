import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {useHttp} from '../../hook/http.hook'

const activeShop = localStorage.getItem('activeShop') !== null ? JSON.parse(localStorage.getItem('activeShop')) : "1";
const activeAddress = localStorage.getItem('activeAddress') !== null ? JSON.parse(localStorage.getItem('activeAddress')) : null;
const activeCoordinates = localStorage.getItem('activeCoordinates') !== null ? JSON.parse(localStorage.getItem('activeCoordinates')) : null;

const initialState = {
  shops: [],
  products: [],
  shopsLoadingStatus: 'idle',
	activeShop,
  activeAddress,
  activeCoordinates
}

const setActiveAddress = (activeShop, activeAddress, activeCoordinates) => {
  localStorage.setItem('activeShop', JSON.stringify(activeShop));
  localStorage.setItem('activeAddress', JSON.stringify(activeAddress));
  localStorage.setItem('activeCoordinates', JSON.stringify(activeCoordinates));
}

export const fetchShops = createAsyncThunk(
  'shops/fetchShops',
  () => {
    const { request } = useHttp();
    return request("https://647478397de100807b1b010c.mockapi.io/shops")
  }
)

const shopsSlice = createSlice({
  name: 'shops',
  initialState,
	reducers: {
    changeActiveShop: (state, action) => {
      state.activeShop = action.payload;
      state.activeAddress = state.shops.find(obj => obj.id === action.payload).location.address;
      state.activeCoordinates = state.shops.find(obj => obj.id === action.payload).location.coordinates;
      state.products = state.shops.find(obj => obj.id === action.payload).items;

			setActiveAddress(state.activeShop, state.activeAddress, state.activeCoordinates);
    },
    sortByPriceASC: (state) => {
      state.products = state.products.sort((prevProd, nextProd) => (prevProd.price - nextProd.price))

    },
    sortByPriceDESC: (state) => {
      state.products = state.products.sort((prevProd, nextProd) => (nextProd.price - prevProd.price))
    },
    sortByTime: (state) => {
      state.products = state.products.sort((prevProd, nextProd) => (nextProd.datetime - prevProd.datetime))
    }


  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShops.pending, state => {state.shopsLoadingStatus = 'loading'})
      .addCase(fetchShops.fulfilled, (state, action) => {
        state.shopsLoadingStatus = 'idle';
        state.shops = action.payload;
        state.activeAddress = state.shops[0].location.address;
        state.activeCoordinates = state.shops[0].location.coordinates;
        state.products = state.shops[0].items;

				setActiveAddress(state.activeShop, state.activeAddress, state.activeCoordinates);
      })
      .addCase(fetchShops.rejected, state => {state.shopsLoadingStatus = 'error'})
  }
})

const {actions, reducer} = shopsSlice;

export const {
  changeActiveShop,
  sortByPriceASC,
  sortByPriceDESC,
  sortByTime
} = actions

export default reducer