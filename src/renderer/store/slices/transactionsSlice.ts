import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Transaction } from '@shared/types';

interface TransactionsState {
  items: Transaction[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TransactionsState = {
  items: [],
  isLoading: false,
  error: null,
};

export const createTransaction = createAsyncThunk(
  'transactions/create',
  async (transaction: Partial<Transaction>) => {
    const api = (window as any).electronAPI;
    return await api.createTransaction(transaction) as Transaction;
  }
);

export const fetchTransactions = createAsyncThunk(
  'transactions/fetch',
  async (params: { storeId: string; offset?: number; limit?: number }) => {
    const api = (window as any).electronAPI;
    return await api.getTransactions(params) as Transaction[];
  }
);

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => { state.isLoading = true; })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch transactions';
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      });
  },
});

export default transactionsSlice.reducer;
