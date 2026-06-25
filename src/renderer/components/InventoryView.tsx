import React from 'react';
import { useTranslation } from 'react-i18next';

const InventoryView: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h1 className="text-headline-md font-semibold" style={{ color: 'var(--color-on-surface)' }}>
        {t('inventory.title')}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
        <div className="card">
          <h2 className="text-title-sm font-semibold mb-3" style={{ color: 'var(--color-on-surface)' }}>
            {t('inventory.stockIn')}
          </h2>
          <p className="text-body-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
            {t('inventory.stockInDesc')}
          </p>
        </div>
        <div className="card">
          <h2 className="text-title-sm font-semibold mb-3" style={{ color: 'var(--color-on-surface)' }}>
            {t('inventory.stockOut')}
          </h2>
          <p className="text-body-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
            {t('inventory.stockOutDesc')}
          </p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-title-sm font-semibold mb-3" style={{ color: 'var(--color-on-surface)' }}>
          {t('inventory.log')}
        </h2>
        <p className="text-body-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
          {t('inventory.logDesc')}
        </p>
      </div>
    </div>
  );
};

export default InventoryView;
