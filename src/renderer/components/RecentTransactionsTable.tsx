import React from 'react';
import { useTranslation } from 'react-i18next';

interface TransactionRow {
  id: string;
  date: string;
  items: number;
  amount: string;
  paymentMethod: string;
  status: 'completed' | 'refunded' | 'pending';
}

interface RecentTransactionsTableProps {
  transactions: TransactionRow[];
}

const statusBadge: Record<string, { className: string }> = {
  completed: { className: 'badge badge-success' },
  refunded: { className: 'badge badge-error' },
  pending: { className: 'badge badge-warning' },
};

const RecentTransactionsTable: React.FC<RecentTransactionsTableProps> = ({ transactions }) => {
  const { t } = useTranslation();

  if (transactions.length === 0) {
    return (
      <div className="card">
        <h2 className="text-title-sm font-semibold mb-4" style={{ color: 'var(--color-on-surface)' }}>
          {t('dashboard.recentTransactions')}
        </h2>
        <p className="text-body-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
          {t('dashboard.noTransactions')}
        </p>
      </div>
    );
  }

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      {/* Header inside card */}
      <div style={{ padding: '16px 16px 0' }}>
        <h2 className="text-title-sm font-semibold mb-3" style={{ color: 'var(--color-on-surface)' }}>
          {t('dashboard.recentTransactions')}
        </h2>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>{t('common.date')}</th>
              <th>{t('common.items')}</th>
              <th>{t('common.amount')}</th>
              <th>{t('pos.paymentMethod')}</th>
              <th>{t('common.status')}</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((trx) => (
              <tr key={trx.id}>
                <td style={{ whiteSpace: 'nowrap' }}>{trx.date}</td>
                <td>{trx.items}</td>
                <td style={{ fontWeight: 500 }}>{trx.amount}</td>
                <td>{trx.paymentMethod}</td>
                <td>
                  <span className={statusBadge[trx.status].className}>
                    {trx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTransactionsTable;
