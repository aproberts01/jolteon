import { configureStore } from '@reduxjs/toolkit';
import listReducer from '@/lib/listSlice';

const store = configureStore({
  reducer: {
    list: listReducer,
  },
});

export default store

export type RootState = ReturnType<typeof store.getState>;