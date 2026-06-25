import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../store/hooks';
import { logout } from '../store/slices/authSlice';
import type { User } from '@shared/types';

interface TopBarProps {
  user: User;
}

const TopBar: React.FC<TopBarProps> = ({ user }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header
      className="h-14 flex items-center justify-between px-6 shrink-0"
      style={{
        backgroundColor: 'var(--color-surface-container-lowest)',
        borderBottom: '1px solid var(--color-outline-variant)',
      }}
    >
      <div className="flex items-center gap-3">
        <h2 className="text-body-md font-medium" style={{ color: 'var(--color-on-surface-variant)' }}>
          {t('nav.dashboard')}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-label-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
          {user.role === 'owner' ? t('role.owner') : t('role.cashier')}
        </span>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-tertiary-container)' }}>
            <span className="text-xs font-medium" style={{ color: 'var(--color-tertiary)' }}>
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="text-body-md" style={{ color: 'var(--color-on-surface)' }}>
            {user.name}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="text-label-sm transition-colors"
          style={{ color: 'var(--color-outline)' }}
          onMouseOver={(e) => (e.currentTarget.style.color = 'var(--color-error)')}
          onMouseOut={(e) => (e.currentTarget.style.color = 'var(--color-outline)')}
        >
          {t('auth.signOut')}
        </button>
      </div>
    </header>
  );
};

export default TopBar;
