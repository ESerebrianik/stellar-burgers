import { getIngridientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngridient } from '../../../utils/types';

type TIngridientState = {
  isLoading: boolean;
  ingridients: TIngridient[];
};

export const initialState: TIngridientState = {
  isLoading: false,
  ingridients: []
};

export const getIngridients = createAsyncThunk(
  'ingridients/getIngridients',
  async () => await getIngridientsApi()
);

export const slice = createSlice({
  name: 'ingridients',
  initialState,
  reducers: {},
  selectors: {
    getAllIngridients: (state) => state.ingridients,
    getIngridientsIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngridients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIngridients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingridients = action.payload;
      })
      .addCase(getIngridients.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const { getAllIngridients, getIngridientsIsLoading } = slice.selectors;
export const ingridientsReducer = slice.reducer;
