import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { login, clearError } from '../store/slices/authSlice';

const AuthPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());
    dispatch(login({ email, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="w-full max-w-md">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl shadow-sm mb-4"
            style={{ backgroundColor: 'var(--color-secondary)' }}>
            <span className="text-white text-2xl font-bold" style={{ color: 'var(--color-on-secondary)' }}>CB</span>
          </div>
          <h1 className="text-headline-md font-semibold" style={{ color: 'var(--color-on-surface)' }}>
            {t('app.name')}
          </h1>
          <p className="text-body-md mt-1" style={{ color: 'var(--color-on-surface-variant)' }}>
            {t('app.tagline')}
          </p>
        </div>

        {/* Login Card */}
        <div className="card">
          <h2 className="text-title-sm font-semibold mb-6">{t('auth.signIn')}</h2>

          {error && (
            <div className="mb-4 p-3 rounded-lg text-sm"
              style={{
                backgroundColor: 'var(--color-error-container)',
                color: 'var(--color-on-error-container)',
              }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-label-md mb-1"
                style={{ color: 'var(--color-on-surface-variant)' }}>
                {t('auth.email')}
              </label>
              <input
                id="email"
                type="email"
                className="input-field"
                placeholder={t('auth.emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-label-md mb-1"
                style={{ color: 'var(--color-on-surface-variant)' }}>
                {t('auth.password')}
              </label>
              <input
                id="password"
                type="password"
                className="input-field"
                placeholder={t('auth.passwordPlaceholder')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {t('auth.signingIn')}
                </span>
              ) : (
                t('auth.signIn')
              )}
            </button>
          </form>

          <div className="mt-6 pt-4"
            style={{ borderTop: '1px solid var(--color-outline-variant)' }}>
            <p className="text-label-sm text-center" style={{ color: 'var(--color-outline)' }}>
              {t('app.version', { version: '1.0.0' })} &mdash; Clever Labs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
