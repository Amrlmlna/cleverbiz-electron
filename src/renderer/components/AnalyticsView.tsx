import React from 'react';
import { useTranslation } from 'react-i18next';

const AnalyticsView: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h1 className="text-headline-md font-semibold" style={{ color: 'var(--color-on-surface)' }}>
        {t('analytics.title')}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
        <div className="card">
          <h2 className="text-title-sm font-semibold mb-3" style={{ color: 'var(--color-on-surface)' }}>
            {t('analytics.digitalPresence')}
          </h2>
          <p className="text-body-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
            {t('analytics.digitalPresenceDesc')}
          </p>
        </div>
        <div className="card">
          <h2 className="text-title-sm font-semibold mb-3" style={{ color: 'var(--color-on-surface)' }}>
            {t('analytics.businessHealth')}
          </h2>
          <p className="text-body-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
            {t('analytics.businessHealthDesc')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
