import React from 'react';
import { useTranslation } from 'react-i18next';

const TransactionsView: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h1 className="text-headline-md font-semibold" style={{ color: 'var(--color-on-surface)' }}>
        {t('transactions.title')}
      </h1>

      <div className="card">
        <p className="text-body-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
          {t('transactions.description')}
        </p>
      </div>
    </div>
  );
};

export default TransactionsView;
