import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {useHttp} from '../../hook/http.hook'

const activeShop = localStorage.getItem('activeShop') !== null ? JSON.parse(localStorage.getItem('activeShop')) : "1";
const activeAddress = localStorage.getItem('activeAddress') !== null ? JSON.parse(localStorage.getItem('activeAddress')) : null;
const activeCoordinates = localStorage.getItem('activeCoordinates') !== null ? JSON.parse(localStorage.getItem('activeCoordinates')) : null;

const initialState = {
  shops: [],
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
    return request("http://localhost:3001/shops")
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

			setActiveAddress(state.activeShop, state.activeAddress, state.activeCoordinates);
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

				setActiveAddress(state.activeShop, state.activeAddress, state.activeCoordinates);
      })
      .addCase(fetchShops.rejected, state => {state.shopsLoadingStatus = 'error'})
  }
})

const {actions, reducer} = shopsSlice;

export const {
  changeActiveShop
} = actions

export default reducer