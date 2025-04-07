import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { TConstructorIngridient, TIngridient } from '../../../utils/types';

export type TConstructorState = {
  bun: TIngridient | null;
  ingridients: TConstructorIngridient[];
};

export const initialState: TConstructorState = {
  bun: null,
  ingridients: []
};

export const slice = createSlice({
  name: 'creator',
  initialState,
  reducers: {
    addToConstructor: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngridient>) => {
        if (payload.type === 'bun') {
          state.bun = payload;
        } else {
          state.ingridients.push(payload);
        }
      },
      prepare: (ingridient: TIngridient) => ({
        payload: { ...ingridient, id: uuidv4() }
      })
    },
    removeFromConstructor: (state, { payload }: PayloadAction<number>) => {
      state.ingridients.splice(payload, 1);
    },
    reorderConstructor: (
      state,
      { payload }: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = payload;
      const ingridients = [...state.ingridients];
      ingridients.splice(to, 0, ingridients.splice(from, 1)[0]);
      state.ingridients = ingridients;
    },
    resetConstructor: () => initialState
  }
});

export const {
  addToConstructor,
  removeFromConstructor,
  reorderConstructor,
  resetConstructor
} = slice.actions;
export const builderReducer = slice.reducer;
