import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {useHttp} from '../../hooks/http.hook'

const initialState = {
  shops: [],
  shopsLoadingStatus: 'idle',
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchShops.pending, state => {state.shopsLoadingStatus = 'loading'})
      .addCase(fetchShops.fulfilled, (state, action) => {
        state.shopsLoadingStatus = 'idle';
        state.shops = action.payload
      })
      .addCase(fetchShops.rejected, state => {state.shopsLoadingStatus = 'error'})
  }
})

const {actions, reducer} = shopsSlice;


export default reducer