import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 1. Import TIngredient from types.ts (FIX IS HERE)
import { TIngredient } from '../../utils/types';

// 2. Import only the API function from burger-api.ts
import { getIngredientsApi } from '../../utils/burger-api';

type TIngredientsState = {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
};

const initialState: TIngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

export const getIngredients = createAsyncThunk('ingredients/getAll', async () =>
  getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch';
      });
  }
});

export const {} = ingredientsSlice.actions;

// Selector to use in your components later
export const getIngredientsSelector = (state: {
  ingredients: TIngredientsState;
}) => state.ingredients.ingredients;
export const getLoadingSelector = (state: { ingredients: TIngredientsState }) =>
  state.ingredients.loading;

export default ingredientsSlice.reducer;
