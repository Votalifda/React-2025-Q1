import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITableItem } from './../../types.ts';

interface SelectedItemsState {
  items: ITableItem[];
}

const initialState: SelectedItemsState = {
  items: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ITableItem>) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<ITableItem>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    clearItems: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearItems } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
