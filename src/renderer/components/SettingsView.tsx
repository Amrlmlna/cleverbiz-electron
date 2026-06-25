import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setTheme, setLocale } from '../store/slices/uiSlice';
import type { ThemeMode, Locale } from '../store/slices/uiSlice';
import { SUPPORTED_LOCALES } from '../i18n';

const SettingsView: React.FC = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector((state) => state.ui.theme);
  const currentLocale = useAppSelector((state) => state.ui.locale);

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setTheme(e.target.value as ThemeMode));
  };

  const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const locale = e.target.value as Locale;
    dispatch(setLocale(locale));
    i18n.changeLanguage(locale);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-headline-md font-semibold" style={{ color: 'var(--color-on-surface)' }}>
        {t('settings.title')}
      </h1>

      {/* Language */}
      <div className="card max-w-xl">
        <h2 className="text-title-sm font-semibold mb-4" style={{ color: 'var(--color-on-surface)' }}>
          {t('settings.language')}
        </h2>
        <div>
          <label className="block text-label-sm mb-1"
            style={{ color: 'var(--color-on-surface-variant)' }}>
            {t('settings.languageLabel')}
          </label>
          <select
            className="input-field max-w-xs"
            value={currentLocale}
            onChange={handleLocaleChange}
          >
            {SUPPORTED_LOCALES.map((loc) => (
              <option key={loc.code} value={loc.code}>
                {loc.nativeLabel}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Theme */}
      <div className="card max-w-xl">
        <h2 className="text-title-sm font-semibold mb-4" style={{ color: 'var(--color-on-surface)' }}>
          {t('settings.theme')}
        </h2>
        <div>
          <label className="block text-label-sm mb-1"
            style={{ color: 'var(--color-on-surface-variant)' }}>
            {t('settings.themeLabel')}
          </label>
          <select
            className="input-field max-w-xs"
            value={currentTheme}
            onChange={handleThemeChange}
          >
            <option value="light">{t('settings.themeLight')}</option>
            <option value="dark">{t('settings.themeDark')}</option>
            <option value="system">{t('settings.themeSystem')}</option>
          </select>
        </div>
      </div>

      {/* Store Profile */}
      <div className="card max-w-xl">
        <h2 className="text-title-sm font-semibold mb-4" style={{ color: 'var(--color-on-surface)' }}>
          {t('settings.storeProfile')}
        </h2>
        <form className="space-y-3">
          <div>
            <label className="block text-label-sm mb-1"
              style={{ color: 'var(--color-on-surface-variant)' }}>
              {t('settings.storeName')}
            </label>
            <input className="input-field" placeholder={t('settings.storeNamePlaceholder')} />
          </div>
          <div>
            <label className="block text-label-sm mb-1"
              style={{ color: 'var(--color-on-surface-variant)' }}>
              {t('settings.address')}
            </label>
            <textarea className="input-field" rows={2} placeholder={t('settings.addressPlaceholder')} />
          </div>
          <button className="btn-primary">{t('settings.save')}</button>
        </form>
      </div>

      {/* Printer */}
      <div className="card max-w-xl">
        <h2 className="text-title-sm font-semibold mb-4" style={{ color: 'var(--color-on-surface)' }}>
          {t('settings.printerConfig')}
        </h2>
        <p className="text-body-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
          {t('settings.printerConfigDesc')}
        </p>
      </div>

      {/* About */}
      <div className="card max-w-xl">
        <h2 className="text-title-sm font-semibold mb-4" style={{ color: 'var(--color-on-surface)' }}>
          {t('settings.about')}
        </h2>
        <p className="text-body-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
          {t('settings.aboutDesc')}
        </p>
      </div>
    </div>
  );
};

export default SettingsView;
