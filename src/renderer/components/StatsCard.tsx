import React from 'react';

interface StatsCardProps {
  label: string;
  value: string;
  subtitle?: string;
  trend?: {
    direction: 'up' | 'down';
    percentage: number;
  };
  /** Optional: color for the value emphasis */
  accentColor?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ label, value, subtitle, trend, accentColor }) => {
  return (
    <div
      className="card stats-card"
      style={{ cursor: 'default' }}
    >
      {/* Label */}
      <p className="text-label-md" style={{ color: 'var(--color-on-surface-variant)' }}>
        {label}
      </p>

      {/* Value */}
      <p
        className="text-display-lg font-semibold mt-space-xs mb-space-xs"
        style={{ color: accentColor || 'var(--color-on-surface)' }}
      >
        {value}
      </p>

      {/* Trend + subtitle */}
      <div className="flex items-center gap-space-sm">
        {trend && (
          <span
            className="text-label-sm"
            style={{
              color: trend.direction === 'up' ? 'var(--color-success)' : 'var(--color-error)',
            }}
          >
            {trend.direction === 'up' ? '↑' : '↓'} {trend.percentage}%
          </span>
        )}
        {subtitle && (
          <span className="text-body-sm" style={{ color: 'var(--color-outline)' }}>
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
