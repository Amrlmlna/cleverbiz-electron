import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setTheme, type ThemeMode } from '../store/slices/uiSlice';

interface ThemeContextValue {
  theme: ThemeMode;
  resolvedTheme: 'light' | 'dark';
  setTheme: (mode: ThemeMode) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'system',
  resolvedTheme: 'light',
  setTheme: () => {},
  isDark: false,
});

export const useTheme = () => useContext(ThemeContext);

function getSystemTheme(): 'light' | 'dark' {
  if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) return 'dark';
  return 'light';
}

function resolveTheme(theme: ThemeMode): 'light' | 'dark' {
  if (theme === 'system') return getSystemTheme();
  return theme;
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.ui.theme);

  const resolvedTheme = useMemo(() => resolveTheme(theme), [theme]);
  const isDark = resolvedTheme === 'dark';

  // Apply theme class to document
  useEffect(() => {
    const root = document.documentElement;

    // Remove both theme classes, then add the resolved one
    root.classList.remove('theme-light', 'theme-dark');
    root.classList.add(`theme-${resolvedTheme}`);

    // Also set color-scheme for native scrollbars etc.
    root.style.colorScheme = resolvedTheme;
  }, [resolvedTheme]);

  // Listen for system theme changes if mode is 'system'
  useEffect(() => {
    if (theme !== 'system') return;

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      const root = document.documentElement;
      const sys = getSystemTheme();
      root.classList.remove('theme-light', 'theme-dark');
      root.classList.add(`theme-${sys}`);
      root.style.colorScheme = sys;
    };

    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      resolvedTheme,
      setTheme: (mode: ThemeMode) => dispatch(setTheme(mode)),
      isDark,
    }),
    [theme, resolvedTheme, isDark, dispatch]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
