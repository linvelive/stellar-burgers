import { configureStore, combineReducers } from '@reduxjs/toolkit';
import ordersReducer from './slices/ordersSlice';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import userReducer from './slices/userSlice';
import ingredientsReducer from './slices/ingredientsSlice';
import constructorReducer from './slices/constructorSlice';
import newOrderReducer from './slices/newOrderSlice';
import feedReducer from './slices/feedSlice'; // [1] IMPORT HERE

export const rootReducer = combineReducers({
  orders: ordersReducer,
  user: userReducer,
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  newOrder: newOrderReducer,
  feed: feedReducer // [2] ADD HERE
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
