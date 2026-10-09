import React, { useState } from 'react';

export interface DataPoint {
  label: string;
  value: number;
  secondaryValue?: number;
}

interface SimpleLineChartProps {
  data: DataPoint[];
  title?: string;
  unit?: string;
  height?: number;
  lineColor?: string;
  secondaryLineColor?: string;
  warningThreshold?: number;
  criticalThreshold?: number;
  invertY?: boolean; // Invert Y-axis if smaller depth means closer to surface (e.g. in meters below ground level)
  showArea?: boolean;
  valueLabel?: string;
  secondaryValueLabel?: string;
}

export const SimpleLineChart: React.FC<SimpleLineChartProps> = ({
  data,
  title,
  unit = 'm',
  height = 240,
  lineColor = '#0284c7', // sky-600
  secondaryLineColor = '#10b981', // emerald-500
  warningThreshold,
  criticalThreshold,
  invertY = false,
  showArea = true,
  valueLabel = 'Measured',
  secondaryValueLabel = 'Secondary',
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center text-slate-400 text-sm">
        No chart data available
      </div>
    );
  }

  // Calculate range
  const allValues = [
    ...data.map((d) => d.value),
    ...(data.some((d) => d.secondaryValue !== undefined)
      ? data.map((d) => d.secondaryValue!).filter((v) => v !== undefined)
      : []),
    ...(warningThreshold !== undefined ? [warningThreshold] : []),
    ...(criticalThreshold !== undefined ? [criticalThreshold] : []),
  ];

  let minVal = Math.min(...allValues);
  let maxVal = Math.max(...allValues);

  // Add 10% padding
  const padding = (maxVal - minVal) * 0.15 || 2;
  minVal = Math.max(0, minVal - padding);
  maxVal = maxVal + padding;

  const width = 600;
  const paddingLeft = 45;
  const paddingRight = 25;
  const paddingTop = 20;
  const paddingBottom = 35;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const getX = (index: number) => {
    if (data.length <= 1) return paddingLeft + chartWidth / 2;
    return paddingLeft + (index / (data.length - 1)) * chartWidth;
  };

  const getY = (val: number) => {
    if (maxVal === minVal) return paddingTop + chartHeight / 2;
    const ratio = (val - minVal) / (maxVal - minVal);
    // If invertY is true: high value (deep well) goes to bottom
    if (invertY) {
      return paddingTop + ratio * chartHeight;
    }
    return paddingTop + (1 - ratio) * chartHeight;
  };

  // Generate SVG path points
  const points = data.map((d, i) => `${getX(i)},${getY(d.value)}`);
  const linePath = `M ${points.join(' L ')}`;

  const areaPath = `${linePath} L ${getX(data.length - 1)},${
    paddingTop + chartHeight
  } L ${getX(0)},${paddingTop + chartHeight} Z`;

  // Secondary line path if available
  const hasSecondary = data.some((d) => d.secondaryValue !== undefined);
  const secondaryPoints = hasSecondary
    ? data.map((d, i) => `${getX(i)},${getY(d.secondaryValue || 0)}`)
    : [];
  const secondaryPath = hasSecondary ? `M ${secondaryPoints.join(' L ')}` : '';

  // Generate Y-axis grid ticks (4 ticks)
  const yTicks = [0, 0.33, 0.66, 1].map((pct) => {
    const val = invertY ? minVal + pct * (maxVal - minVal) : maxVal - pct * (maxVal - minVal);
    const yPos = paddingTop + pct * chartHeight;
    return { val: Number(val.toFixed(1)), yPos };
  });

  return (
    <div className="w-full select-none">
      {title && (
        <div className="mb-2 flex items-center justify-between">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {title}
          </h4>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="h-2 w-3 rounded-xs" style={{ backgroundColor: lineColor }} />
              {valueLabel}
            </span>
            {hasSecondary && (
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="h-2 w-3 rounded-xs" style={{ backgroundColor: secondaryLineColor }} />
                {secondaryValueLabel}
              </span>
            )}
          </div>
        </div>
      )}

      <div className="relative w-full">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible font-sans text-xs"
          style={{ maxHeight: height }}
        >
          <defs>
            <linearGradient id={`gradient-${lineColor.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={lineColor} stopOpacity="0.25" />
              <stop offset="100%" stopColor={lineColor} stopOpacity="0.01" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {yTicks.map((tick, i) => (
            <g key={i}>
              <line
                x1={paddingLeft}
                y1={tick.yPos}
                x2={width - paddingRight}
                y2={tick.yPos}
                stroke="#e2e8f0"
                strokeDasharray="3 3"
              />
              <text
                x={paddingLeft - 8}
                y={tick.yPos + 4}
                textAnchor="end"
                className="fill-slate-600 text-[11px]"
              >
                {tick.val}
              </text>
            </g>
          ))}

          {/* Threshold Lines */}
          {warningThreshold !== undefined && (
            <g>
              <line
                x1={paddingLeft}
                y1={getY(warningThreshold)}
                x2={width - paddingRight}
                y2={getY(warningThreshold)}
                stroke="#f59e0b"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <text
                x={width - paddingRight}
                y={getY(warningThreshold) - 4}
                textAnchor="end"
                className="fill-amber-600 font-medium text-[10px]"
              >
                Warn ({warningThreshold} {unit})
              </text>
            </g>
          )}

          {criticalThreshold !== undefined && (
            <g>
              <line
                x1={paddingLeft}
                y1={getY(criticalThreshold)}
                x2={width - paddingRight}
                y2={getY(criticalThreshold)}
                stroke="#ef4444"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <text
                x={width - paddingRight}
                y={getY(criticalThreshold) - 4}
                textAnchor="end"
                className="fill-rose-600 font-medium text-[10px]"
              >
                Crit ({criticalThreshold} {unit})
              </text>
            </g>
          )}

          {/* Area fill */}
          {showArea && (
            <path
              d={areaPath}
              fill={`url(#gradient-${lineColor.replace('#', '')})`}
            />
          )}

          {/* Secondary Line */}
          {hasSecondary && (
            <path
              d={secondaryPath}
              fill="none"
              stroke={secondaryLineColor}
              strokeWidth="2"
              strokeDasharray="4 3"
            />
          )}

          {/* Primary Line */}
          <path
            d={linePath}
            fill="none"
            stroke={lineColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data point circles and hover zones */}
          {data.map((d, i) => {
            const cx = getX(i);
            const cy = getY(d.value);
            const isHovered = hoveredIndex === i;

            return (
              <g key={i}>
                {/* Invisible large hit area */}
                <rect
                  x={cx - 15}
                  y={paddingTop}
                  width={30}
                  height={chartHeight}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />

                {/* Point circle */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? 5 : 3.5}
                  fill={isHovered ? '#ffffff' : lineColor}
                  stroke={lineColor}
                  strokeWidth={isHovered ? 2.5 : 1.5}
                  className="transition-all"
                />

                {/* X-axis labels */}
                {(data.length <= 8 || i % Math.ceil(data.length / 7) === 0 || i === data.length - 1) && (
                  <text
                    x={cx}
                    y={height - paddingBottom + 16}
                    textAnchor="middle"
                    className="fill-slate-600 text-[10px]"
                  >
                    {d.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* Tooltip on hover */}
          {hoveredIndex !== null && (
            <g>
              <line
                x1={getX(hoveredIndex)}
                y1={paddingTop}
                x2={getX(hoveredIndex)}
                y2={paddingTop + chartHeight}
                stroke="#64748b"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
            </g>
          )}
        </svg>

        {/* Floating HTML tooltip */}
        {hoveredIndex !== null && (
          <div
            className="pointer-events-none absolute z-10 rounded-lg bg-slate-900/95 px-3 py-1.5 text-xs text-white shadow-lg backdrop-blur-xs transition-all"
            style={{
              left: `${(getX(hoveredIndex) / width) * 100}%`,
              top: `${(getY(data[hoveredIndex].value) / height) * 100}%`,
              transform: 'translate(-50%, -120%)',
            }}
          >
            <div className="font-semibold text-slate-200">
              {data[hoveredIndex].label}
            </div>
            <div className="text-sky-300 font-bold">
              {valueLabel}: {data[hoveredIndex].value} {unit}
            </div>
            {data[hoveredIndex].secondaryValue !== undefined && (
              <div className="text-emerald-300 text-[11px]">
                {secondaryValueLabel}: {data[hoveredIndex].secondaryValue} {unit}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
