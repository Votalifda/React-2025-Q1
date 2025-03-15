import { configureStore } from '@reduxjs/toolkit';
import formsReducer from './slices/formsSlice.ts';

export const store = configureStore({
  reducer: {
    forms: formsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
