import React from 'react';
import { useAppSelector } from '../store/hooks';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import POSView from '../components/POSView';
import ProductsView from '../components/ProductsView';
import InventoryView from '../components/InventoryView';
import EmployeesView from '../components/EmployeesView';
import TransactionsView from '../components/TransactionsView';
import AnalyticsView from '../components/AnalyticsView';
import SettingsView from '../components/SettingsView';
import DashboardHome from '../components/DashboardHome';
import type { ActiveView } from '../store/slices/uiSlice';

const viewComponents: Record<ActiveView, React.FC> = {
  dashboard: DashboardHome,
  pos: POSView,
  products: ProductsView,
  inventory: InventoryView,
  employees: EmployeesView,
  transactions: TransactionsView,
  analytics: AnalyticsView,
  settings: SettingsView,
};

const DashboardPage: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { activeView } = useAppSelector((state) => state.ui);

  const ViewComponent = viewComponents[activeView];

  return (
    <div className="flex h-screen overflow-hidden"
      style={{ backgroundColor: 'var(--color-surface)' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar user={user!} />
        <main className="flex-1 overflow-y-auto"
          style={{ padding: 'var(--space-xl) var(--space-container)' }}>
          <ViewComponent />
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
