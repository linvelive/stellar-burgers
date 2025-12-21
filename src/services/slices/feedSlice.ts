import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsApi, getOrdersApi } from '../../utils/burger-api';

type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

export const fetchOrders = createAsyncThunk(
  'feed/fetchOrders',
  async () => await getOrdersApi()
);

export const getFeeds = createAsyncThunk('feed/getFeeds', async () => {
  const res = await getFeedsApi();
  return res;
});

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch feeds';
      });
  }
});

// Selectors

export const getFeedOrdersSelector = (state: { feed: TFeedState }) =>
  state.feed.orders;
export const getFeedTotalSelector = (state: { feed: TFeedState }) =>
  state.feed.total;
export const getFeedTotalTodaySelector = (state: { feed: TFeedState }) =>
  state.feed.totalToday;
export const getFeedLoadingSelector = (state: { feed: TFeedState }) =>
  state.feed.isLoading; // IMPORTANT

export default feedSlice.reducer;
