import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SpatialMap } from '../components/common/SpatialMap';
import { SimpleLineChart } from '../components/common/SimpleLineChart';
import { Badge } from '../components/common/Badge';
import {
  MapPin,
  Search,
  Filter,
  Gauge,
  Activity,
  Layers,
  Battery,
  Wifi,
  WifiOff,
  Clock,
  Sparkles,
  Bot,
  AlertTriangle,
  CheckCircle2,
  AlertOctagon,
  FileText,
  Radio,
} from 'lucide-react';
import { StationStatus } from '../types';

export const GroundwaterMonitoringPage: React.FC = () => {
  const {
    stations,
    selectedStationId,
    setSelectedStationId,
    selectedStation,
    setCurrentView,
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<StationStatus | 'all'>('all');
  const [zoneFilter, setZoneFilter] = useState<string>('All');

  // Filter stations for the sidebar list
  const filteredStations = stations.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    const matchesZone = zoneFilter === 'All' || s.zone === zoneFilter;
    return matchesSearch && matchesStatus && matchesZone;
  });

  const activeStation = selectedStation || stations[0];

  // Prepare line chart data for selected station
  const chartData = activeStation.recentTrends.map((val, idx) => {
    const dayLabels = ['Day -6', 'Day -5', 'Day -4', 'Day -3', 'Day -2', 'Yesterday', 'Today'];
    return {
      label: dayLabels[idx] || `T-${idx}`,
      value: val,
      secondaryValue: activeStation.baselineLevelMeters,
    };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <MapPin className="w-7 h-7 text-sky-600" />
            <span>Groundwater Level & Spatial Telemetry</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time hydrostatic water table telemetry across Green Valley Watershed basin.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('assistant')}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-sky-700 hover:bg-sky-800 text-white shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Query Well AI Assistant</span>
          </button>
        </div>
      </div>

      {/* Interactive Spatial Map Section */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700">Filter Basin Zone:</span>
            <div className="flex flex-wrap gap-1">
              {['All', 'North Basin', 'East Agricultural Belt', 'Urban Industrial Zone', 'South Watershed', 'West Foothills'].map((z) => (
                <button
                  key={z}
                  onClick={() => setZoneFilter(z)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    zoneFilter === z
                      ? 'bg-sky-700 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {z}
                </button>
              ))}
            </div>
          </div>
          <span className="text-xs text-slate-500">
            Showing {filteredStations.length} of {stations.length} stations
          </span>
        </div>

        <SpatialMap
          stations={stations}
          selectedStationId={selectedStationId}
          onSelectStation={(id) => setSelectedStationId(id)}
          zoneFilter={zoneFilter}
        />
      </div>

      {/* Two-Column Explorer: Station List / Filters + Detailed Telemetry Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Station Directory & Filter Controls */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Monitoring Wells Directory
              </h2>
              <span className="text-xs text-slate-500">{filteredStations.length} Results</span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search well name, code, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
              />
            </div>

            {/* Status Filter Tabs */}
            <div className="flex flex-wrap gap-1 text-xs">
              {(
                [
                  { id: 'all', label: 'All' },
                  { id: 'normal', label: 'Normal' },
                  { id: 'warning', label: 'Warning' },
                  { id: 'critical', label: 'Critical' },
                  { id: 'offline', label: 'Offline' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setStatusFilter(tab.id as any)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    statusFilter === tab.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Station Cards Scrollable List */}
          <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
            {filteredStations.map((station) => {
              const isSelected = station.id === activeStation.id;
              return (
                <div
                  key={station.id}
                  onClick={() => setSelectedStationId(station.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col gap-2 ${
                    isSelected
                      ? 'border-sky-500 bg-sky-50/50 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs font-bold text-sky-800">
                          {station.code}
                        </span>
                        <span className="text-xs font-semibold text-slate-900 line-clamp-1">
                          {station.name}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{station.location}</p>
                    </div>
                    <Badge status={station.status} size="sm" />
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1 text-slate-700">
                      <Gauge className="w-3.5 h-3.5 text-sky-600" />
                      <span>Level:</span>
                      <strong className="text-slate-900 font-bold">
                        {station.currentLevelMeters} mbgl
                      </strong>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span>{station.stationType}</span>
                      <span>•</span>
                      <span>{station.lastReadingTime}</span>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredStations.length === 0 && (
              <div className="p-8 text-center text-slate-400 text-xs">
                No stations match the selected filters.
              </div>
            )}
          </div>
        </div>

        {/* Right: Selected Station Detailed Inspector Card */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold bg-sky-100 text-sky-800 px-2 py-0.5 rounded-sm">
                  {activeStation.code}
                </span>
                <Badge status={activeStation.status} size="md" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-1">{activeStation.name}</h2>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{activeStation.location} ({activeStation.zone})</span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentView('quality')}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
              >
                Water Quality
              </button>
              <button
                onClick={() => setCurrentView('assistant')}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-50 text-sky-800 border border-sky-200 hover:bg-sky-100 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Bot className="w-3.5 h-3.5 text-sky-600" />
                <span>Ask AI</span>
              </button>
            </div>
          </div>

          {/* Offline Sensor Telemetry Banner if applicable */}
          {activeStation.status === 'offline' && (
            <div className="rounded-xl border border-slate-300 bg-slate-100 p-3.5 text-xs text-slate-800 flex items-start gap-2.5">
              <WifiOff className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Telemetry Link Severed - Sensor Offline</span>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                  No active heartbeat received for {activeStation.lastReadingTime}. Last recorded level ({activeStation.currentLevelMeters} mbgl) is frozen from historical cache. Dispatched service ticket #TK-882 to recharge solar lithium cell.
                </p>
              </div>
            </div>
          )}

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <span className="text-[11px] text-slate-500 font-medium">Current Water Depth</span>
              <div className="text-xl font-extrabold text-slate-900 mt-0.5">
                {activeStation.currentLevelMeters}{' '}
                <span className="text-xs font-normal text-slate-500">mbgl</span>
              </div>
              <span className="text-[10px] text-slate-500">
                Baseline: {activeStation.baselineLevelMeters}m
              </span>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <span className="text-[11px] text-slate-500 font-medium">Bore Depth</span>
              <div className="text-xl font-extrabold text-slate-900 mt-0.5">
                {activeStation.depthMeters}{' '}
                <span className="text-xs font-normal text-slate-500">meters</span>
              </div>
              <span className="text-[10px] text-slate-500">
                {activeStation.stationType}
              </span>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <span className="text-[11px] text-slate-500 font-medium">Critical Threshold</span>
              <div className="text-xl font-extrabold text-rose-600 mt-0.5">
                {activeStation.criticalThresholdMeters}{' '}
                <span className="text-xs font-normal text-slate-500">mbgl</span>
              </div>
              <span className="text-[10px] text-amber-600">
                Warn at {activeStation.warningThresholdMeters}m
              </span>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <span className="text-[11px] text-slate-500 font-medium">Sensor Health</span>
              <div className="text-xl font-extrabold text-emerald-600 mt-0.5 flex items-center gap-1.5">
                {activeStation.batteryPct}%
                <Battery className="w-4 h-4 text-emerald-500" />
              </div>
              <span className="text-[10px] text-slate-500">{activeStation.telemetryType}</span>
            </div>
          </div>

          {/* Historical Water Level Trend Chart */}
          <div className="rounded-xl border border-slate-200 p-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">7-Day Piezometric Hydrograph</span>
              <span className="text-slate-500">
                Last reading: {activeStation.lastReadingTime}
              </span>
            </div>
            <SimpleLineChart
              data={chartData}
              unit="mbgl"
              height={200}
              lineColor="#0284c7"
              secondaryLineColor="#64748b"
              warningThreshold={activeStation.warningThresholdMeters}
              criticalThreshold={activeStation.criticalThresholdMeters}
              valueLabel="Measured Depth (mbgl)"
              secondaryValueLabel="Baseline Target"
            />
          </div>

          {/* Aquifer & Hydrogeological Specifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 space-y-2 text-xs">
              <span className="font-bold text-slate-800 uppercase tracking-wide block text-[11px]">
                Aquifer Hydrogeology
              </span>
              <div className="flex items-center justify-between text-slate-600">
                <span>Aquifer Formation:</span>
                <strong className="text-slate-900">{activeStation.aquiferType}</strong>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Soil Stratigraphy:</span>
                <strong className="text-slate-900">{activeStation.soilType}</strong>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Daily Extraction Estimate:</span>
                <strong className="text-slate-900">{activeStation.dailyExtractionEstimateM3} m³/day</strong>
              </div>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 space-y-2 text-xs">
              <span className="font-bold text-slate-800 uppercase tracking-wide block text-[11px]">
                IoT Telemetry Rig
              </span>
              <div className="flex items-center justify-between text-slate-600">
                <span>Transducer Rig:</span>
                <span className="text-slate-900 font-semibold">Submersible Hydrostatic Probe</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Sampling Frequency:</span>
                <span className="text-slate-900 font-semibold">Every 15 minutes</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Transmission Mode:</span>
                <span className="text-slate-900 font-semibold">{activeStation.telemetryType}</span>
              </div>
            </div>
          </div>

          {/* Recommended Actions for this station */}
          <div className="rounded-xl border border-sky-200 bg-sky-50/50 p-4 space-y-2">
            <span className="text-xs font-bold text-sky-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>Recommended Engineering Action for {activeStation.code}:</span>
            </span>
            <p className="text-xs text-sky-950 leading-relaxed">
              {activeStation.status === 'critical'
                ? 'Issue emergency extraction reduction order of 35%. Verify well casing integrity for cavitation damage. Connect local distribution feeder to secondary reservoir.'
                : activeStation.status === 'warning'
                ? 'Elevate sampling frequency to 5-minute intervals. Inspect adjacent agricultural pump clusters for unmetered pumping drawdowns.'
                : activeStation.status === 'offline'
                ? 'Dispatch maintenance technician to clear debris from solar panel and inspect lithium backup power supply.'
                : 'Maintain routine continuous telemetry. Natural unconfined recharge remains stable with baseline levels.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
