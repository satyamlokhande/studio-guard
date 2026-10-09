import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  icon: LucideIcon;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  trend?: {
    value: string;
    isPositive?: boolean;
    label?: string;
  };
  onClick?: () => void;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  unit,
  subtitle,
  icon: Icon,
  variant = 'default',
  trend,
  onClick,
  className = '',
}) => {
  const variantStyles = {
    default: {
      card: 'bg-white border-slate-200 hover:border-slate-300',
      iconBg: 'bg-slate-100 text-slate-700',
    },
    success: {
      card: 'bg-white border-emerald-200 hover:border-emerald-300',
      iconBg: 'bg-emerald-50 text-emerald-600',
    },
    warning: {
      card: 'bg-white border-amber-200 hover:border-amber-300',
      iconBg: 'bg-amber-50 text-amber-600',
    },
    danger: {
      card: 'bg-white border-rose-200 hover:border-rose-300',
      iconBg: 'bg-rose-50 text-rose-600',
    },
    info: {
      card: 'bg-white border-sky-200 hover:border-sky-300',
      iconBg: 'bg-sky-50 text-sky-600',
    },
  }[variant];

  return (
    <div
      onClick={onClick}
      className={`rounded-xl border p-4 sm:p-5 shadow-xs transition-all ${variantStyles.card} ${
        onClick ? 'cursor-pointer hover:shadow-md hover:-translate-y-0.5' : ''
      } ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs sm:text-sm font-medium text-slate-500">{title}</p>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              {value}
            </span>
            {unit && <span className="text-sm font-medium text-slate-500">{unit}</span>}
          </div>
        </div>
        <div className={`rounded-lg p-2.5 sm:p-3 ${variantStyles.iconBg}`}>
          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
      </div>

      {(subtitle || trend) && (
        <div className="mt-3 flex items-center justify-between text-xs text-slate-600 border-t border-slate-100 pt-2.5">
          {subtitle && <span>{subtitle}</span>}
          {trend && (
            <span
              className={`font-medium ${
                trend.isPositive ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {trend.value} {trend.label && <span className="text-slate-500 font-normal">{trend.label}</span>}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
