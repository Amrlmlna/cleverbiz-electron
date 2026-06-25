import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { DashboardSummary, BusinessHealth } from '@shared/types';

interface DashboardState {
  summary: DashboardSummary | null;
  health: BusinessHealth | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  summary: null,
  health: null,
  isLoading: false,
  error: null,
};

export const fetchDashboardSummary = createAsyncThunk(
  'dashboard/fetchSummary',
  async (storeId: string) => {
    const api = (window as any).electronAPI;
    return await api.getDashboardSummary(storeId) as DashboardSummary;
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardSummary.pending, (state) => { state.isLoading = true; })
      .addCase(fetchDashboardSummary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.summary = action.payload;
      })
      .addCase(fetchDashboardSummary.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch dashboard';
      });
  },
});

export default dashboardSlice.reducer;
