import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IForm } from '../../types.ts';

interface SelectedItemsState {
  items: Array<IForm>;
}

const initialState: SelectedItemsState = {
  items: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<IForm>) => {
      state.items.push(action.payload);
    },
  },
});

export const { addItem } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
