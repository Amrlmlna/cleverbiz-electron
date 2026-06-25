import React from 'react';
import { useTranslation } from 'react-i18next';
import StatsCard from './StatsCard';
import RecentTransactionsTable from './RecentTransactionsTable';
import BusinessHealthCard from './BusinessHealthCard';

const MOCK_TRANSACTIONS = [
  { id: 'TRX-001', date: '25 Jun 2026, 14:32', items: 3, amount: 'Rp 156.000', paymentMethod: 'QRIS', status: 'completed' as const },
  { id: 'TRX-002', date: '25 Jun 2026, 13:15', items: 1, amount: 'Rp 25.000', paymentMethod: 'Cash', status: 'completed' as const },
  { id: 'TRX-003', date: '25 Jun 2026, 12:00', items: 5, amount: 'Rp 342.500', paymentMethod: 'QRIS', status: 'completed' as const },
  { id: 'TRX-004', date: '24 Jun 2026, 18:45', items: 2, amount: 'Rp 89.000', paymentMethod: 'Debit', status: 'refunded' as const },
  { id: 'TRX-005', date: '24 Jun 2026, 10:20', items: 4, amount: 'Rp 210.000', paymentMethod: 'QRIS', status: 'completed' as const },
];

const DashboardHome: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-space-lg">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <h1 className="text-headline-md font-semibold" style={{ color: 'var(--color-on-surface)' }}>
          {t('dashboard.title')}
        </h1>
        <div className="flex items-center gap-space-sm">
          <span className="badge badge-info">Today: 25 Jun 2026</span>
        </div>
      </div>

      {/* Stats Grid — 4 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        <StatsCard
          label={t('dashboard.todayRevenue')}
          value="Rp 4.580.000"
          subtitle={t('dashboard.offlineMode')}
          trend={{ direction: 'up', percentage: 12 }}
        />
        <StatsCard
          label={t('dashboard.monthlyRevenue')}
          value="Rp 89.250.000"
          subtitle="vs Rp 72M last month"
          trend={{ direction: 'up', percentage: 8 }}
        />
        <StatsCard
          label={t('dashboard.transactionsToday')}
          value="47"
          subtitle="+5 from yesterday"
          trend={{ direction: 'up', percentage: 3 }}
        />
        <StatsCard
          label={t('dashboard.lowStockItems')}
          value="3"
          subtitle="Needs reorder"
          accentColor="var(--color-warning)"
          trend={{ direction: 'down', percentage: 2 }}
        />
      </div>

      {/* Bottom row: transactions table + business health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        {/* Transactions table — spans 2 cols */}
        <div className="lg:col-span-2">
          <RecentTransactionsTable transactions={MOCK_TRANSACTIONS} />
        </div>

        {/* Business Health */}
        <BusinessHealthCard
          grade="A"
          score={86}
          metrics={[
            { label: t('dashboard.revenueGrowth'), value: 92 },
            { label: t('dashboard.inventoryTurnover'), value: 74 },
            { label: t('dashboard.cashFlowStability'), value: 88 },
          ]}
        />
      </div>
    </div>
  );
};

export default DashboardHome;
