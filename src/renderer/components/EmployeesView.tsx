import React from 'react';
import { useTranslation } from 'react-i18next';

const EmployeesView: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h1 className="text-headline-md font-semibold" style={{ color: 'var(--color-on-surface)' }}>
        {t('employees.title')}
      </h1>

      <div className="card">
        <p className="text-body-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
          {t('employees.description')}
        </p>
      </div>
    </div>
  );
};

export default EmployeesView;
