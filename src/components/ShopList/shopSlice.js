import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {useHttp} from '../../hook/http.hook'

const initialState = {
  shops: [],
  shopsLoadingStatus: 'idle',
	activeShop: '1',
  activeAddress: null,
  activeCoordinates: null
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
      })
      .addCase(fetchShops.rejected, state => {state.shopsLoadingStatus = 'error'})
  }
})

const {actions, reducer} = shopsSlice;

export const {
  changeActiveShop
} = actions

export default reducer