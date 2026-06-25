import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Employee } from '@shared/types';

interface EmployeesState {
  items: Employee[];
  isLoading: boolean;
  error: string | null;
}

const initialState: EmployeesState = {
  items: [],
  isLoading: false,
  error: null,
};

export const fetchEmployees = createAsyncThunk(
  'employees/fetch',
  async (storeId: string) => {
    const api = (window as any).electronAPI;
    return await api.getEmployees(storeId) as Employee[];
  }
);

export const createEmployee = createAsyncThunk(
  'employees/create',
  async (employee: Partial<Employee>) => {
    const api = (window as any).electronAPI;
    return await api.createEmployee(employee) as Employee;
  }
);

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => { state.isLoading = true; })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch employees';
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default employeesSlice.reducer;
