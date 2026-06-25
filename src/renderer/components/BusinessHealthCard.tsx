import React from 'react';
import { useTranslation } from 'react-i18next';

interface HealthMetric {
  label: string;
  value: number; // 0–100
}

interface BusinessHealthCardProps {
  grade: 'A' | 'B' | 'C';
  score: number; // 0–100
  metrics: HealthMetric[];
}

const gradeConfig = {
  A: {
    key: 'gradeA',
    color: 'var(--color-success)',
    containerColor: 'var(--color-success-container)',
  },
  B: {
    key: 'gradeB',
    color: 'var(--color-warning)',
    containerColor: 'var(--color-warning-container)',
  },
  C: {
    key: 'gradeC',
    color: 'var(--color-error)',
    containerColor: 'var(--color-error-container)',
  },
} as const;

const BusinessHealthCard: React.FC<BusinessHealthCardProps> = ({ grade, score, metrics }) => {
  const { t } = useTranslation();
  const config = gradeConfig[grade];

  return (
    <div className="card">
      <h2 className="text-title-sm font-semibold mb-4" style={{ color: 'var(--color-on-surface)' }}>
        {t('dashboard.businessHealth')}
      </h2>

      <div className="flex items-center gap-space-lg mb-space-md">
        {/* Grade badge */}
        <div
          className="grade-badge flex items-center justify-center rounded-lg"
          style={{
            width: 64,
            height: 64,
            backgroundColor: config.containerColor,
            color: config.color,
            fontSize: 28,
            fontWeight: 700,
            fontFamily: 'Inter, sans-serif',
            lineHeight: 1,
          }}
        >
          {grade}
        </div>

        {/* Score + description */}
        <div>
          <p
            className="text-headline-md font-semibold"
            style={{ color: 'var(--color-on-surface)', lineHeight: 1.2 }}
          >
            {score}
            <span className="text-body-md font-normal" style={{ color: 'var(--color-on-surface-variant)' }}>
              /100
            </span>
          </p>
          <p className="text-body-sm mt-space-xs" style={{ color: 'var(--color-on-surface-variant)' }}>
            {t(`dashboard.${config.key}`)}
          </p>
        </div>
      </div>

      {/* Metrics bars */}
      <div className="space-y-space-sm">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-label-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
                {metric.label}
              </span>
              <span className="text-label-sm" style={{ color: 'var(--color-on-surface)', fontWeight: 600 }}>
                {metric.value}%
              </span>
            </div>
            <div
              className="rounded-sm"
              style={{
                height: 6,
                backgroundColor: 'var(--color-surface-container-high)',
                overflow: 'hidden',
              }}
            >
              <div
                className="rounded-sm"
                style={{
                  width: `${metric.value}%`,
                  height: '100%',
                  backgroundColor: config.color,
                  transition: 'width 200ms var(--ease-out)',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessHealthCard;
