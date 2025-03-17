import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFormValues } from '../../types.ts';

interface State {
  items: Array<IFormValues>;
}

const initialState: State = {
  items: [],
};

const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<IFormValues>) => {
      state.items.push(action.payload);
    },
  },
});

export const { addItem } = formsSlice.actions;
export default formsSlice.reducer;
