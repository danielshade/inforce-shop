// "Зріз" (slice) стану для продуктів
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/models';
import { fetchProducts, addProduct, deleteProduct, updateProduct } from './productsThunks';

export type SortKey = 'name' | 'count';

interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  sortKey: SortKey;
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
  sortKey: 'name',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSortKey(state, action: PayloadAction<SortKey>) {
      state.sortKey = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.items.push(action.payload);
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export const { setSortKey } = productsSlice.actions;
export default productsSlice.reducer;