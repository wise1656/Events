import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

const initialState: { number: number } = {
  number: 0,
};

const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setNumber: (state, action: PayloadAction<number>) => {
      state.number = action.payload;
    },
  },
});

export const { setNumber } = appSlice.actions;

export const selectNumber = (state: RootState) => state.app.number;

export default appSlice.reducer;
