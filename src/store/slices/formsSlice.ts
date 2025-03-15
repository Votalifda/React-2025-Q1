import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IForm } from '../../types.ts';

interface SelectedItemsState {
  items: Array<IForm>;
}

const initialState: SelectedItemsState = {
  items: [],
};

const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<IForm>) => {
      state.items.push(action.payload);
    },
  },
});

export const { addItem } = formsSlice.actions;
export default formsSlice.reducer;
