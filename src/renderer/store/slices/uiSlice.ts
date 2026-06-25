import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ActiveView = 'dashboard' | 'pos' | 'products' | 'inventory' | 'employees' | 'transactions' | 'analytics' | 'settings';
export type ThemeMode = 'light' | 'dark' | 'system';
export type Locale = 'en' | 'id';

interface UIState {
  activeView: ActiveView;
  sidebarOpen: boolean;
  theme: ThemeMode;
  locale: Locale;
}

const initialState: UIState = {
  activeView: 'dashboard',
  sidebarOpen: true,
  theme: 'system',
  locale: (localStorage.getItem('cleverbiz_locale') as Locale) || 'en',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveView: (state, action: PayloadAction<ActiveView>) => {
      state.activeView = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.theme = action.payload;
    },
    setLocale: (state, action: PayloadAction<Locale>) => {
      state.locale = action.payload;
    },
  },
});

export const { setActiveView, toggleSidebar, setTheme, setLocale } = uiSlice.actions;
export default uiSlice.reducer;
