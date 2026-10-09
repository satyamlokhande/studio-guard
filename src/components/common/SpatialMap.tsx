import React, { useState } from 'react';
import { MonitoringStation } from '../../types';
import { Layers, ZoomIn, ZoomOut, Compass, Info, CheckCircle2, AlertTriangle, AlertOctagon, WifiOff } from 'lucide-react';

interface SpatialMapProps {
  stations: MonitoringStation[];
  selectedStationId?: string;
  onSelectStation: (stationId: string) => void;
  zoneFilter?: string;
}

export const SpatialMap: React.FC<SpatialMapProps> = ({
  stations,
  selectedStationId,
  onSelectStation,
  zoneFilter = 'All',
}) => {
  const [zoom, setZoom] = useState<number>(1);
  const [showAquiferOverlay, setShowAquiferOverlay] = useState<boolean>(true);
  const [showDepthLabels, setShowDepthLabels] = useState<boolean>(true);
  const [hoveredStation, setHoveredStation] = useState<MonitoringStation | null>(null);

  const filteredStations = stations.filter((s) => {
    if (zoneFilter !== 'All' && s.zone !== zoneFilter) return false;
    return true;
  });

  const getMarkerColor = (status: MonitoringStation['status']) => {
    switch (status) {
      case 'normal':
        return { bg: '#10b981', ring: 'rgba(16, 185, 129, 0.4)', text: 'text-emerald-700' };
      case 'warning':
        return { bg: '#f59e0b', ring: 'rgba(245, 158, 11, 0.4)', text: 'text-amber-700' };
      case 'critical':
        return { bg: '#ef4444', ring: 'rgba(239, 68, 68, 0.4)', text: 'text-rose-700' };
      case 'offline':
        return { bg: '#94a3b8', ring: 'rgba(148, 163, 184, 0.4)', text: 'text-slate-500' };
    }
  };

  return (
    <div className="relative w-full rounded-2xl border border-slate-200 bg-slate-900 overflow-hidden shadow-inner">
      {/* Map Header Bar */}
      <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2 rounded-lg bg-slate-900/90 px-3 py-1.5 text-xs text-white backdrop-blur-md border border-slate-700 shadow-sm">
          <Compass className="w-4 h-4 text-sky-400 animate-spin-slow" />
          <span className="font-semibold text-slate-200">Green Valley Aquifer Watershed</span>
          <span className="text-[10px] text-sky-400 bg-sky-950/80 px-1.5 py-0.5 rounded-sm border border-sky-800">
            Simulated GIS Basin
          </span>
        </div>

        {/* Controls */}
        <div className="pointer-events-auto flex items-center gap-1.5 rounded-lg bg-slate-900/90 p-1 backdrop-blur-md border border-slate-700">
          <button
            onClick={() => setShowAquiferOverlay(!showAquiferOverlay)}
            title="Toggle Aquifer Hydrology Overlays"
            className={`px-2 py-1 text-xs rounded-md transition-colors flex items-center gap-1 ${
              showAquiferOverlay
                ? 'bg-sky-600/40 text-sky-200 border border-sky-500/50'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Aquifer Zones</span>
          </button>
          <button
            onClick={() => setShowDepthLabels(!showDepthLabels)}
            title="Toggle Water Level Labels"
            className={`px-2 py-1 text-xs rounded-md transition-colors ${
              showDepthLabels
                ? 'bg-sky-600/40 text-sky-200 border border-sky-500/50'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="hidden sm:inline">Levels</span>
          </button>
          <div className="h-4 w-px bg-slate-700 mx-0.5" />
          <button
            onClick={() => setZoom((z) => Math.min(1.4, z + 0.1))}
            className="p-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded-sm"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(0.8, z - 0.1))}
            className="p-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded-sm"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* SVG Canvas Map Area */}
      <div className="relative w-full aspect-16/10 sm:aspect-2/1 min-h-[380px] sm:min-h-[460px] overflow-hidden flex items-center justify-center bg-[#0a192f]">
        <svg
          viewBox="0 0 1000 600"
          className="w-full h-full transition-transform duration-300"
          style={{ transform: `scale(${zoom})` }}
        >
          <defs>
            {/* Aquifer gradient definitions */}
            <radialGradient id="recharge-zone" cx="20%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.25" />
              <stop offset="70%" stopColor="#0369a1" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#0c4a6e" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="critical-depletion" cx="50%" cy="80%" r="40%">
              <stop offset="0%" stopColor="#e11d48" stopOpacity="0.30" />
              <stop offset="80%" stopColor="#be123c" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#881337" stopOpacity="0" />
            </radialGradient>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.75" />
            </pattern>
          </defs>

          {/* Background Grid */}
          <rect width="1000" height="600" fill="url(#grid-pattern)" opacity="0.6" />

          {/* Topographic Contour Boundaries */}
          <path
            d="M 50,80 Q 250,40 500,70 T 950,90 L 980,550 Q 750,570 500,560 T 30,520 Z"
            fill="#0f172a"
            stroke="#1e3a5f"
            strokeWidth="1.5"
            opacity="0.8"
          />

          {/* River Basin Channel */}
          <path
            d="M 120,40 C 220,120 300,160 380,220 C 460,280 500,340 560,420 C 620,500 700,560 850,590"
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="8"
            strokeLinecap="round"
            opacity="0.4"
          />
          <path
            d="M 120,40 C 220,120 300,160 380,220 C 460,280 500,340 560,420 C 620,500 700,560 850,590"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="8 6"
            opacity="0.7"
          />

          {/* Tributary Streams */}
          <path
            d="M 40,320 Q 200,300 380,220"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2"
            opacity="0.3"
          />
          <path
            d="M 880,180 Q 680,260 500,340"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2"
            opacity="0.3"
          />

          {/* Aquifer Hydrology Overlays */}
          {showAquiferOverlay && (
            <>
              {/* West Foothills Recharge Zone */}
              <circle cx="180" cy="240" r="160" fill="url(#recharge-zone)" />
              <text x="110" y="160" fill="#38bdf8" fontSize="12" fontWeight="600" opacity="0.6">
                Foothills Infiltration Recharge Zone
              </text>

              {/* South Watershed Depletion Depression Cone */}
              <circle cx="520" cy="490" r="170" fill="url(#critical-depletion)" />
              <text x="560" y="520" fill="#f43f5e" fontSize="12" fontWeight="600" opacity="0.7">
                Depression Cone (Critical Aquifer Drawdown)
              </text>

              {/* East Agri Belt Zone boundary */}
              <path
                d="M 680,120 L 920,150 L 890,440 L 650,380 Z"
                fill="#10b981"
                fillOpacity="0.04"
                stroke="#059669"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <text x="730" y="240" fill="#34d399" fontSize="11" opacity="0.6">
                Agricultural Extraction Grid
              </text>

              {/* Urban Industrial Corridor */}
              <path
                d="M 380,290 L 620,310 L 600,430 L 360,400 Z"
                fill="#f59e0b"
                fillOpacity="0.04"
                stroke="#d97706"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <text x="420" y="370" fill="#fbbf24" fontSize="11" opacity="0.6">
                Industrial Extraction & Pipeline Corridor
              </text>
            </>
          )}

          {/* Connecting Pipelines representation */}
          <line x1="380" y1="312" x2="580" y2="372" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="5 4" opacity="0.6" />
          <line x1="740" y1="204" x2="860" y2="348" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />

          {/* Station Markers */}
          {filteredStations.map((station) => {
            const cx = station.mapX * 10;
            const cy = station.mapY * 6;
            const isSelected = selectedStationId === station.id;
            const color = getMarkerColor(station.status);
            const isCritical = station.status === 'critical';

            return (
              <g
                key={station.id}
                className="cursor-pointer transition-transform duration-200"
                onClick={() => onSelectStation(station.id)}
                onMouseEnter={() => setHoveredStation(station)}
                onMouseLeave={() => setHoveredStation(null)}
              >
                {/* Outer halo / selection indicator */}
                {isSelected && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r="24"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                    strokeDasharray="4 2"
                    className="animate-spin-slow"
                  />
                )}

                {/* Critical warning pulsing animation */}
                {isCritical && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r="18"
                    fill={color.ring}
                    className="animate-ping"
                    opacity="0.75"
                  />
                )}

                {/* Base ring */}
                <circle
                  cx={cx}
                  cy={cy}
                  r="14"
                  fill="#0f172a"
                  stroke={isSelected ? '#ffffff' : color.bg}
                  strokeWidth={isSelected ? '3' : '2'}
                  filter="drop-shadow(0px 3px 6px rgba(0,0,0,0.5))"
                />

                {/* Inner status dot */}
                <circle cx={cx} cy={cy} r="7" fill={color.bg} />

                {/* Optional Water Level Label */}
                {showDepthLabels && (
                  <g>
                    <rect
                      x={cx - 30}
                      y={cy + 18}
                      width="60"
                      height="18"
                      rx="4"
                      fill="#0f172a"
                      fillOpacity="0.9"
                      stroke="#334155"
                      strokeWidth="1"
                    />
                    <text
                      x={cx}
                      y={cy + 30}
                      textAnchor="middle"
                      fill="#e2e8f0"
                      fontSize="10"
                      fontWeight="bold"
                    >
                      {station.currentLevelMeters}m
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Box */}
        {hoveredStation && (
          <div
            className="pointer-events-none absolute z-30 w-64 rounded-xl border border-slate-700 bg-slate-900/95 p-3 text-white shadow-2xl backdrop-blur-md transition-all"
            style={{
              left: `${hoveredStation.mapX}%`,
              top: `${Math.max(12, hoveredStation.mapY - 14)}%`,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <div className="flex items-center justify-between gap-1 border-b border-slate-800 pb-2">
              <span className="font-semibold text-xs text-sky-300 truncate">
                {hoveredStation.code} - {hoveredStation.name}
              </span>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded-sm uppercase ${
                  hoveredStation.status === 'normal'
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    : hoveredStation.status === 'warning'
                    ? 'bg-amber-950 text-amber-400 border border-amber-800'
                    : hoveredStation.status === 'critical'
                    ? 'bg-rose-950 text-rose-400 border border-rose-800'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {hoveredStation.status}
              </span>
            </div>

            <div className="mt-2 grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-slate-400 block">Water Depth:</span>
                <span className="font-bold text-white text-sm">
                  {hoveredStation.currentLevelMeters} mbgl
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Zone:</span>
                <span className="text-slate-200 truncate block">{hoveredStation.zone}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Aquifer Type:</span>
                <span className="text-slate-300 truncate block">{hoveredStation.aquiferType}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Sensor Health:</span>
                <span className="text-emerald-400 font-medium">
                  {hoveredStation.sensorHealth} ({hoveredStation.batteryPct}%)
                </span>
              </div>
            </div>

            <div className="mt-2 pt-1.5 border-t border-slate-800/80 text-[10px] text-sky-400 flex items-center justify-between">
              <span>Click marker to inspect station</span>
              <span>→</span>
            </div>
          </div>
        )}
      </div>

      {/* Map Legend Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 bg-slate-950/80 px-4 py-2.5 text-xs text-slate-300">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-slate-400 font-medium">Station Risk Status:</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Normal ({stations.filter((s) => s.status === 'normal').length})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>Warning ({stations.filter((s) => s.status === 'warning').length})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
            <span>Critical ({stations.filter((s) => s.status === 'critical').length})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
            <span>Offline ({stations.filter((s) => s.status === 'offline').length})</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[11px] text-slate-400">
          <Info className="w-3.5 h-3.5 text-sky-400" />
          <span>Coordinates and watershed topography are simulated for demonstration.</span>
        </div>
      </div>
    </div>
  );
};
