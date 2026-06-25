import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from './store/hooks';
import { setLocale } from './store/slices/uiSlice';
import { useAppDispatch } from './store/hooks';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const locale = useAppSelector((state) => state.ui.locale);
  const { i18n } = useTranslation();

  // Sync Redux locale → i18next
  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale, i18n]);

  // Sync i18next → Redux (for initial/language-detected locale)
  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      if (lng !== locale) {
        dispatch(setLocale(lng as 'en' | 'id'));
      }
    };
    i18n.on('languageChanged', handleLanguageChanged);
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n, locale, dispatch]);

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return <DashboardPage />;
};

export default App;
