import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Product } from '@shared/types';

interface ProductsState {
  items: Product[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  isLoading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetch',
  async (storeId: string) => {
    const api = (window as any).electronAPI;
    return await api.getProducts(storeId) as Product[];
  }
);

export const createProduct = createAsyncThunk(
  'products/create',
  async (product: Partial<Product>) => {
    const api = (window as any).electronAPI;
    return await api.createProduct(product) as Product;
  }
);

export const updateProduct = createAsyncThunk(
  'products/update',
  async (product: Product) => {
    const api = (window as any).electronAPI;
    return await api.updateProduct(product) as Product;
  }
);

export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (productId: string) => {
    const api = (window as any).electronAPI;
    await api.deleteProduct(productId);
    return productId;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.isLoading = true; })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const idx = state.items.findIndex((p) => p.id === action.payload.id);
        if (idx >= 0) state.items[idx] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      });
  },
});

export default productsSlice.reducer;
