import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setActiveView, toggleSidebar } from '../store/slices/uiSlice';
import type { ActiveView } from '../store/slices/uiSlice';

interface NavItem {
  id: ActiveView;
  labelKey: string;
  icon: string;
}

const navItems: NavItem[] = [
  { id: 'dashboard', labelKey: 'nav.dashboard', icon: '📊' },
  { id: 'pos', labelKey: 'nav.pos', icon: '🛒' },
  { id: 'products', labelKey: 'nav.products', icon: '📦' },
  { id: 'inventory', labelKey: 'nav.inventory', icon: '📋' },
  { id: 'employees', labelKey: 'nav.employees', icon: '👥' },
  { id: 'transactions', labelKey: 'nav.transactions', icon: '💰' },
  { id: 'analytics', labelKey: 'nav.analytics', icon: '📈' },
  { id: 'settings', labelKey: 'nav.settings', icon: '⚙️' },
];

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { activeView, sidebarOpen } = useAppSelector((state) => state.ui);

  const handleNav = (id: ActiveView) => {
    dispatch(setActiveView(id));
  };

  return (
    <aside
      className={`${
        sidebarOpen ? 'w-sidebar' : 'w-16'
      } flex flex-col transition-all duration-200 shrink-0`}
      style={{
        backgroundColor: 'var(--color-surface-container-lowest)',
        borderRight: '1px solid var(--color-outline-variant)',
      }}
    >
      {/* Logo */}
      <div className="h-14 flex items-center px-4"
        style={{ borderBottom: '1px solid var(--color-outline-variant)' }}>
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ backgroundColor: 'var(--color-secondary)' }}>
            <span className="font-bold text-sm" style={{ color: 'var(--color-on-secondary)' }}>CB</span>
          </div>
          {sidebarOpen && (
            <span className="font-semibold text-sm truncate"
              style={{ color: 'var(--color-on-surface)' }}>
              {t('app.name')}
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`sidebar-link w-full text-left ${
                isActive ? 'sidebar-link-active' : 'sidebar-link-inactive'
              }`}
              title={!sidebarOpen ? t(item.labelKey) : undefined}
            >
              <span className="text-lg shrink-0">{item.icon}</span>
              {sidebarOpen && <span className="truncate">{t(item.labelKey)}</span>}
            </button>
          );
        })}
      </nav>

      {/* Toggle */}
      <div className="p-2" style={{ borderTop: '1px solid var(--color-outline-variant)' }}>
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="sidebar-link sidebar-link-inactive w-full justify-center"
          title={sidebarOpen ? t('nav.collapse') : t('nav.expand')}
        >
          <span className="text-sm">{sidebarOpen ? '◀' : '▶'}</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
