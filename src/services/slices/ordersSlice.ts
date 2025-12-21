import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';

// 1. The Thunk: Returning the array directly as the API provides
export const fetchOrders = createAsyncThunk('orders/getAll', async () => {
  const data = await getOrdersApi();
  return data;
});

type TOrdersState = {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
};

const initialState: TOrdersState = {
  orders: [],
  isLoading: false,
  error: null
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload; // Successfully populating the array
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch orders';
      });
  }
});

// 2. Selectors: Exporting with RootState typing to avoid 'any'
export const getOrdersSelector = (state: { orders: TOrdersState }) =>
  state.orders.orders;
export const getOrdersLoadingSelector = (state: { orders: TOrdersState }) =>
  state.orders.isLoading;

export default ordersSlice.reducer;
