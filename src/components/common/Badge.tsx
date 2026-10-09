import React from 'react';
import { StationStatus, AlertSeverity } from '../../types';
import { CheckCircle2, AlertTriangle, AlertOctagon, WifiOff, Info } from 'lucide-react';

interface BadgeProps {
  status?: StationStatus | AlertSeverity | 'active' | 'acknowledged' | 'resolved' | 'suspected_leak' | 'critical_leak' | 'Good' | 'Fair' | 'Poor' | 'Critical';
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  status = 'normal',
  label,
  size = 'md',
  showIcon = true,
  className = '',
}) => {
  let displayLabel = label;
  let bg = 'bg-slate-100 text-slate-700 border-slate-200';
  let Icon = Info;

  switch (status) {
    case 'normal':
    case 'Good':
    case 'resolved':
      displayLabel = displayLabel || (status === 'Good' ? 'Good Quality' : status === 'resolved' ? 'Resolved' : 'Normal');
      bg = 'bg-emerald-50 text-emerald-800 border-emerald-300';
      Icon = CheckCircle2;
      break;

    case 'warning':
    case 'Fair':
    case 'Poor':
    case 'acknowledged':
    case 'suspected_leak':
      displayLabel = displayLabel || (status === 'acknowledged' ? 'Acknowledged' : status === 'suspected_leak' ? 'Suspected Leak' : 'Warning');
      bg = 'bg-amber-50 text-amber-900 border-amber-300';
      Icon = AlertTriangle;
      break;

    case 'critical':
    case 'Critical':
    case 'active':
    case 'critical_leak':
      displayLabel = displayLabel || (status === 'active' ? 'Active Alert' : status === 'critical_leak' ? 'Critical Leak' : 'Critical');
      bg = 'bg-rose-50 text-rose-800 border-rose-300';
      Icon = AlertOctagon;
      break;

    case 'offline':
      displayLabel = displayLabel || 'Sensor Offline';
      bg = 'bg-slate-100 text-slate-700 border-slate-300';
      Icon = WifiOff;
      break;

    case 'info':
    default:
      displayLabel = displayLabel || 'Informational';
      bg = 'bg-sky-50 text-sky-800 border-sky-300';
      Icon = Info;
      break;
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs font-medium px-2.5 py-1 gap-1.5',
    lg: 'text-sm font-semibold px-3 py-1.5 gap-2',
  }[size];

  return (
    <span
      className={`inline-flex items-center rounded-full border ${bg} ${sizeClasses} ${className}`}
    >
      {showIcon && <Icon className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} />}
      <span>{displayLabel}</span>
    </span>
  );
};
