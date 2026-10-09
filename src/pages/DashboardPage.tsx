import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/common/StatCard';
import { Badge } from '../components/common/Badge';
import { SimpleLineChart, DataPoint } from '../components/common/SimpleLineChart';
import {
  Activity,
  Layers,
  MapPin,
  AlertTriangle,
  Droplets,
  CloudRain,
  Flame,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Sparkles,
  Bot,
  ExternalLink,
  Clock,
  Filter,
  CheckCircle2,
  AlertOctagon,
  Gauge,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const {
    stations,
    alerts,
    waterQualityMap,
    pipelineFlows,
    recommendations,
    isDemoMode,
    setCurrentView,
    navigateToStation,
    lastSimulatedTick,
  } = useApp();

  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [selectedChartStationId, setSelectedChartStationId] = useState<string>('all');

  // Compute metrics
  const totalStations = stations.length;
  const avgLevel = Number(
    (stations.reduce((acc, s) => acc + s.currentLevelMeters, 0) / totalStations).toFixed(1)
  );
  const lowLevelStations = stations.filter(
    (s) => s.currentLevelMeters >= s.warningThresholdMeters
  ).length;
  const waterQualityWarnings = Object.values(waterQualityMap).filter(
    (q) => q.status === 'Critical' || q.status === 'Poor'
  ).length;
  const activeLeakageAlerts = alerts.filter(
    (a) => a.status === 'active' && (a.category as string).includes('leak')
  ).length;

  // Chart data calculation
  const getChartData = (): DataPoint[] => {
    if (selectedChartStationId === 'all') {
      if (timeRange === 'daily') {
        return [
          { label: '00:00', value: 18.2 },
          { label: '04:00', value: 18.1 },
          { label: '08:00', value: 18.6 },
          { label: '12:00', value: 18.7 },
          { label: '16:00', value: 18.5 },
          { label: '20:00', value: 18.3 },
          { label: 'Now', value: avgLevel },
        ];
      }
      if (timeRange === 'weekly') {
        return [
          { label: 'Mon', value: 18.8 },
          { label: 'Tue', value: 18.7 },
          { label: 'Wed', value: 18.6 },
          { label: 'Thu', value: 18.5 },
          { label: 'Fri', value: 18.4 },
          { label: 'Sat', value: 18.3 },
          { label: 'Sun', value: avgLevel },
        ];
      }
      return [
        { label: 'Week 1', value: 19.4 },
        { label: 'Week 2', value: 19.1 },
        { label: 'Week 3', value: 18.7 },
        { label: 'Week 4', value: avgLevel },
      ];
    }

    const station = stations.find((s) => s.id === selectedChartStationId) || stations[0];
    const trends = station.recentTrends;
    const labels = ['Day -6', 'Day -5', 'Day -4', 'Day -3', 'Day -2', 'Yesterday', 'Today'];
    return trends.map((val, idx) => ({
      label: labels[idx] || `T-${idx}`,
      value: val,
      secondaryValue: station.baselineLevelMeters,
    }));
  };

  const chartData = getChartData();
  const activeAlerts = alerts.filter((a) => a.status === 'active').slice(0, 4);

  // Focus station for Water Quality card preview
  const sampleQuality = waterQualityMap['st-104']; // Shows critical reading with clear flags

  // Risk distribution
  const normalCount = stations.filter((s) => s.status === 'normal').length;
  const warningCount = stations.filter((s) => s.status === 'warning').length;
  const criticalCount = stations.filter((s) => s.status === 'critical').length;
  const offlineCount = stations.filter((s) => s.status === 'offline').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner: Welcome & Status Overview */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome to AquaGuard
            </h1>
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                isDemoMode
                  ? 'bg-sky-50 text-sky-800 border-sky-300'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-300'
              }`}
            >
              {isDemoMode ? '● Demo Simulation Mode' : '● Connected Sensor Feed'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>
              Real-time Basinal Telemetry • Last update:{' '}
              {lastSimulatedTick.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('monitoring')}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-sky-600" />
            <span>View All Wells</span>
          </button>
          <button
            onClick={() => setCurrentView('assistant')}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-sky-700 hover:bg-sky-800 text-white shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Ask AquaGuard AI</span>
          </button>
        </div>
      </div>

      {/* 6 Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Monitored Locations"
          value={totalStations}
          subtitle={`${stations.filter((s) => s.status !== 'offline').length} Active • ${stations.filter((s) => s.status === 'offline').length} Offline`}
          icon={MapPin}
          variant="info"
          onClick={() => setCurrentView('monitoring')}
        />

        <StatCard
          title="Avg Groundwater Level"
          value={avgLevel}
          unit="mbgl"
          subtitle="Meters below ground"
          icon={Gauge}
          trend={{ value: '-0.4m', isPositive: true, label: 'recharge trend' }}
          onClick={() => setCurrentView('monitoring')}
        />

        <StatCard
          title="Low Water Level Risk"
          value={lowLevelStations}
          unit="wells"
          subtitle={`${stations.filter((s) => s.currentLevelMeters >= s.criticalThresholdMeters).length} in critical state`}
          icon={TrendingDown}
          variant="danger"
          onClick={() => setCurrentView('monitoring')}
        />

        <StatCard
          title="Water Quality Alerts"
          value={waterQualityWarnings}
          unit="stations"
          subtitle={`${Object.values(waterQualityMap).filter((q) => q.status === 'Critical').length} critical • ${Object.values(waterQualityMap).filter((q) => q.status === 'Poor').length} warning`}
          icon={Droplets}
          variant="warning"
          onClick={() => setCurrentView('quality')}
        />

        <StatCard
          title="Active Leakage Alerts"
          value={activeLeakageAlerts}
          unit="pipeline"
          subtitle={`${pipelineFlows.filter((p) => p.status !== 'normal').length} pipeline anomalies`}
          icon={Activity}
          variant="danger"
          onClick={() => setCurrentView('leakage')}
        />

        <StatCard
          title="Recharge Trend"
          value="+4.8%"
          subtitle="Post-monsoon estimate"
          icon={CloudRain}
          variant="success"
          trend={{ value: '190K m³', isPositive: true, label: 'recharge vol' }}
          onClick={() => setCurrentView('recharge')}
        />
      </div>

      {/* Main Section: Groundwater Trends & Risk Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Groundwater Level Trends Interactive Chart */}
        <div className="lg:col-span-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Gauge className="w-4 h-4 text-sky-600" />
                <span>Groundwater Level Depletion & Recharge Trends</span>
              </h2>
              <p className="text-xs text-slate-500">
                Piezometric depth in meters below ground level (mbgl). Higher value = deeper water table.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Station Filter */}
              <select
                value={selectedChartStationId}
                onChange={(e) => setSelectedChartStationId(e.target.value)}
                className="text-xs font-medium rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-sky-500"
              >
                <option value="all">Basin Average (All)</option>
                {stations.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.code} - {s.name}
                  </option>
                ))}
              </select>

              {/* Time Range Tabs */}
              <div className="flex rounded-lg border border-slate-200 bg-slate-100 p-0.5 text-xs font-semibold">
                {(['daily', 'weekly', 'monthly'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setTimeRange(r)}
                    className={`px-2.5 py-1 rounded-md capitalize transition-colors ${
                      timeRange === r
                        ? 'bg-white text-sky-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Line Chart */}
          <SimpleLineChart
            data={chartData}
            unit="mbgl"
            height={260}
            lineColor="#0284c7"
            secondaryLineColor="#10b981"
            warningThreshold={24.0}
            criticalThreshold={30.0}
            valueLabel={selectedChartStationId === 'all' ? 'Average mbgl' : 'Measured Level'}
            secondaryValueLabel="Baseline Baseline"
          />

          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
            <span>Critical threshold set at 30.0 mbgl (amber warning at 24.0 mbgl).</span>
            <button
              onClick={() => setCurrentView('monitoring')}
              className="text-sky-700 hover:text-sky-800 font-semibold flex items-center gap-1"
            >
              <span>Explore Spatial Map View</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Risk Distribution & Station Breakdown */}
        <div className="lg:col-span-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">Aquifer Risk Distribution</h2>
              <span className="text-xs text-slate-500 font-medium">{totalStations} Stations Total</span>
            </div>

            {/* Risk meters */}
            <div className="mt-4 space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs font-medium mb-1">
                  <span className="flex items-center gap-1.5 text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Normal Conditions</span>
                  </span>
                  <span className="font-bold text-slate-800">
                    {normalCount} ({Math.round((normalCount / totalStations) * 100)}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className="bg-emerald-500 h-2 rounded-full"
                    style={{ width: `${(normalCount / totalStations) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-medium mb-1">
                  <span className="flex items-center gap-1.5 text-amber-700">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Warning Threshold</span>
                  </span>
                  <span className="font-bold text-slate-800">
                    {warningCount} ({Math.round((warningCount / totalStations) * 100)}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className="bg-amber-500 h-2 rounded-full"
                    style={{ width: `${(warningCount / totalStations) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-medium mb-1">
                  <span className="flex items-center gap-1.5 text-rose-700">
                    <AlertOctagon className="w-3.5 h-3.5" />
                    <span>Critical Alert State</span>
                  </span>
                  <span className="font-bold text-slate-800">
                    {criticalCount} ({Math.round((criticalCount / totalStations) * 100)}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className="bg-rose-500 h-2 rounded-full"
                    style={{ width: `${(criticalCount / totalStations) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-medium mb-1">
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <span className="w-2 h-2 rounded-full bg-slate-400" />
                    <span>Sensor Offline</span>
                  </span>
                  <span className="font-bold text-slate-800">
                    {offlineCount} ({Math.round((offlineCount / totalStations) * 100)}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className="bg-slate-400 h-2 rounded-full"
                    style={{ width: `${(offlineCount / totalStations) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Highlighted Critical Station Card */}
          <div className="rounded-xl border border-rose-200 bg-rose-50/60 p-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-rose-800 flex items-center gap-1">
                <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
                <span>Station at Maximum Risk</span>
              </span>
              <span className="text-[10px] font-mono font-bold bg-rose-200/60 text-rose-800 px-1.5 py-0.5 rounded-sm">
                ST-105
              </span>
            </div>
            <p className="text-xs text-rose-900 font-semibold">
              Sunset Plains Municipal Well #4
            </p>
            <p className="text-[11px] text-rose-700 leading-snug">
              Water level has dropped to 32.1 mbgl (breaching 30m threshold). Well cavitation and localized aquifer compaction imminent.
            </p>
            <button
              onClick={() => navigateToStation('st-105', 'monitoring')}
              className="text-xs font-bold text-rose-800 hover:text-rose-950 flex items-center gap-1 pt-1 cursor-pointer"
            >
              <span>Inspect Station Telemetry</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Row 2: Water Quality Overview & Recent Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Water Quality Sonde Status */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Droplets className="w-4 h-4 text-emerald-600" />
                <span>Water Quality Sonde Parameters (Sonde ST-104)</span>
              </h2>
              <p className="text-xs text-slate-500">
                Multi-parameter analysis: Urban Industrial Zone telemetry readings
              </p>
            </div>
            <Badge status="Critical" label="Anomalous Spike" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-3">
              <span className="text-[11px] text-slate-500 font-medium">pH Level</span>
              <div className="text-lg font-bold text-rose-700 mt-0.5">{sampleQuality.ph}</div>
              <span className="text-[10px] text-rose-600 font-medium">Exceeds 6.5 - 8.5</span>
            </div>

            <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-3">
              <span className="text-[11px] text-slate-500 font-medium">TDS (Dissolved Solids)</span>
              <div className="text-lg font-bold text-rose-700 mt-0.5">{sampleQuality.tdsMgL} <span className="text-xs">mg/L</span></div>
              <span className="text-[10px] text-rose-600 font-medium">Limit: &lt;500 mg/L</span>
            </div>

            <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-3">
              <span className="text-[11px] text-slate-500 font-medium">Nitrate (NO3)</span>
              <div className="text-lg font-bold text-rose-700 mt-0.5">{sampleQuality.nitrateMgL} <span className="text-xs">mg/L</span></div>
              <span className="text-[10px] text-rose-600 font-medium">Limit: &lt;45 mg/L</span>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-3">
              <span className="text-[11px] text-slate-500 font-medium">Turbidity</span>
              <div className="text-lg font-bold text-amber-700 mt-0.5">{sampleQuality.turbidityNtu} <span className="text-xs">NTU</span></div>
              <span className="text-[10px] text-amber-600 font-medium">Standard: &lt;5.0 NTU</span>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <span className="text-[11px] text-slate-500 font-medium">Conductivity (EC)</span>
              <div className="text-lg font-bold text-slate-800 mt-0.5">{sampleQuality.conductivityUsCm} <span className="text-xs">µS/cm</span></div>
              <span className="text-[10px] text-slate-500">Ref: &lt;1000 µS/cm</span>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <span className="text-[11px] text-slate-500 font-medium">Temperature</span>
              <div className="text-lg font-bold text-slate-800 mt-0.5">{sampleQuality.temperatureC}°C</div>
              <span className="text-[10px] text-slate-500">Normal range</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 text-[11px]">
              Calculated WQI Score: <strong className="text-rose-600">36 / 100 (Critical)</strong>
            </span>
            <button
              onClick={() => setCurrentView('quality')}
              className="text-sky-700 hover:text-sky-800 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>Full Water Quality Suite</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Recent Alerts Action Center */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Recent Priority Alerts</span>
              </h2>
              <p className="text-xs text-slate-500">
                Automated anomaly detections requiring engineering response
              </p>
            </div>
            <button
              onClick={() => setCurrentView('alerts')}
              className="text-xs font-semibold text-sky-700 hover:text-sky-800"
            >
              View All ({alerts.length})
            </button>
          </div>

          <div className="space-y-2.5">
            {activeAlerts.map((alert) => (
              <div
                key={alert.id}
                onClick={() => setCurrentView('alerts')}
                className="group cursor-pointer rounded-xl border border-slate-200 p-3 hover:border-sky-300 hover:bg-sky-50/30 transition-all flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge status={alert.severity} size="sm" />
                    <span className="text-xs font-bold text-slate-800 truncate">
                      {alert.stationName}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-1 group-hover:text-slate-900">
                    {alert.title}
                  </p>
                  <span className="text-[10px] text-slate-400 block">{alert.createdAt}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-sky-600 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>
              {alerts.filter((a) => a.status === 'resolved').length} alerts resolved today
            </span>
            <button
              onClick={() => setCurrentView('alerts')}
              className="text-sky-700 hover:text-sky-800 font-semibold"
            >
              Open Dispatch Center →
            </button>
          </div>
        </div>
      </div>

      {/* Row 3: Actionable AI Recommendations */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-sky-700 text-white shadow-xs">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                AquaGuard AI Decision Support & Action Items
              </h2>
              <p className="text-xs text-slate-600">
                Context-aware environmental interventions synthesized from live telemetry streams
              </p>
            </div>
          </div>
          <button
            onClick={() => setCurrentView('assistant')}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-700 hover:bg-sky-800 text-white shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
          >
            Chat with Assistant →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.slice(0, 3).map((rec) => (
            <div
              key={rec.id}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-xs space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="font-bold text-sky-800">{rec.category}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                    {rec.priority} Priority
                  </span>
                </div>
                <h3 className="text-xs font-bold text-slate-900 leading-snug">{rec.title}</h3>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed line-clamp-3">
                  {rec.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-medium truncate max-w-[150px]">
                  Zone: {rec.targetZone}
                </span>
                <button
                  onClick={() => setCurrentView('recharge')}
                  className="text-sky-700 hover:text-sky-900 font-bold"
                >
                  View Plan →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
