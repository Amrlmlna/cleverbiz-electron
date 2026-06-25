import React from 'react';
import { useTranslation } from 'react-i18next';

const DashboardHome: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h1 className="text-headline-md font-semibold" style={{ color: 'var(--color-on-surface)' }}>
        {t('dashboard.title')}
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
        <div className="card">
          <p className="text-body-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
            {t('dashboard.todayRevenue')}
          </p>
          <p className="text-display-lg font-semibold mt-1" style={{ color: 'var(--color-on-surface)' }}>
            Rp 0
          </p>
          <p className="text-label-sm mt-1" style={{ color: 'var(--color-outline)' }}>
            {t('dashboard.offlineMode')}
          </p>
        </div>
        <div className="card">
          <p className="text-body-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
            {t('dashboard.monthlyRevenue')}
          </p>
          <p className="text-display-lg font-semibold mt-1" style={{ color: 'var(--color-on-surface)' }}>
            Rp 0
          </p>
        </div>
        <div className="card">
          <p className="text-body-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
            {t('dashboard.transactionsToday')}
          </p>
          <p className="text-display-lg font-semibold mt-1" style={{ color: 'var(--color-on-surface)' }}>
            0
          </p>
        </div>
        <div className="card">
          <p className="text-body-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
            {t('dashboard.lowStockItems')}
          </p>
          <p className="text-display-lg font-semibold mt-1" style={{ color: 'var(--color-on-surface)' }}>
            0
          </p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card">
        <h2 className="text-title-sm font-semibold mb-4" style={{ color: 'var(--color-on-surface)' }}>
          {t('dashboard.recentTransactions')}
        </h2>
        <p className="text-body-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
          {t('dashboard.noTransactions')}
        </p>
      </div>

      {/* Business Health */}
      <div className="card">
        <h2 className="text-title-sm font-semibold mb-4" style={{ color: 'var(--color-on-surface)' }}>
          {t('dashboard.businessHealth')}
        </h2>
        <p className="text-body-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
          {t('dashboard.businessHealthDesc')}
        </p>
      </div>
    </div>
  );
};

export default DashboardHome;
