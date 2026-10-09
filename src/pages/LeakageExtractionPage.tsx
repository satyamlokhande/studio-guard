import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import {
  GitBranch,
  Activity,
  AlertTriangle,
  AlertOctagon,
  CheckCircle2,
  Filter,
  Wrench,
  Search,
  Shield,
  FileText,
  Clock,
  Compass,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export const LeakageExtractionPage: React.FC = () => {
  const { pipelineFlows, extractionAnomalies, setCurrentView, navigateToStation } = useApp();

  const [leakFilter, setLeakFilter] = useState<'all' | 'suspected' | 'normal'>('all');
  const [anomalyFilter, setAnomalyFilter] = useState<'all' | 'high' | 'moderate' | 'low'>('all');
  const [selectedPipelineId, setSelectedPipelineId] = useState<string>('pipe-01');

  const filteredPipelines = pipelineFlows.filter((p) => {
    if (leakFilter === 'suspected') return p.status !== 'normal';
    if (leakFilter === 'normal') return p.status === 'normal';
    return true;
  });

  const filteredAnomalies = extractionAnomalies.filter((a) => {
    if (anomalyFilter !== 'all' && a.severity !== anomalyFilter) return false;
    return true;
  });

  const selectedPipeline =
    pipelineFlows.find((p) => p.id === selectedPipelineId) || pipelineFlows[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <GitBranch className="w-7 h-7 text-amber-600" />
            <span>Underground Pipeline Leakage & Extraction Anomaly Analytics</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Dual-vector hydraulic telemetry: Flow mass-balance loss and diurnal extraction deviations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentView('alerts')}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Open Leak Alerts</span>
          </button>
        </div>
      </div>

      {/* Ethical & Legal Anomaly Detection Notice */}
      <div className="rounded-xl border border-sky-200 bg-sky-50/70 p-4 text-xs text-sky-900 flex items-start gap-3">
        <Shield className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-sky-950">
            Automated Anomaly Detection Disclaimer & Ethical Standard:
          </p>
          <p className="leading-relaxed">
            AquaGuard algorithmic alerts flag statistical departures from historical baseline curves and hydraulic mass-balance deficits. Suspected anomalies do not constitute legal determinations of illicit extraction or confirmed pipeline fracture. All alerts serve as prioritized triggers for physical field verification, acoustic leak logging, and cooperative administrative review.
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODULE A: UNDERGROUND PIPELINE LEAKAGE DETECTION */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-sm">
                Module A
              </span>
              <h2 className="text-lg font-bold text-slate-900">
                Underground Pipeline Mass-Balance Leakage Detection
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Comparative upstream vs downstream electromagnetic flow meters & hydraulic pressure gradients.
            </p>
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Filter Pipelines:</span>
            <div className="flex rounded-lg border border-slate-200 bg-white p-0.5 font-semibold">
              <button
                onClick={() => setLeakFilter('all')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  leakFilter === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600'
                }`}
              >
                All ({pipelineFlows.length})
              </button>
              <button
                onClick={() => setLeakFilter('suspected')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  leakFilter === 'suspected' ? 'bg-rose-600 text-white' : 'text-slate-600'
                }`}
              >
                Suspected Leaks ({pipelineFlows.filter((p) => p.status !== 'normal').length})
              </button>
              <button
                onClick={() => setLeakFilter('normal')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  leakFilter === 'normal' ? 'bg-emerald-600 text-white' : 'text-slate-600'
                }`}
              >
                Normal
              </button>
            </div>
          </div>
        </div>

        {/* Pipeline Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPipelines.map((pipe) => {
            const isSelected = selectedPipeline.id === pipe.id;
            const isCrit = pipe.status === 'critical_leak';
            const isWarn = pipe.status === 'suspected_leak';

            return (
              <div
                key={pipe.id}
                onClick={() => setSelectedPipelineId(pipe.id)}
                className={`rounded-2xl border p-5 transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                  isSelected
                    ? 'border-sky-500 bg-sky-50/30 shadow-md ring-1 ring-sky-500'
                    : isCrit
                    ? 'border-rose-200 bg-white hover:border-rose-300'
                    : isWarn
                    ? 'border-amber-200 bg-white hover:border-amber-300'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-sm">
                      {pipe.pipelineId}
                    </span>
                    <Badge status={pipe.status} size="sm" />
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 line-clamp-1">
                    {pipe.pipelineName}
                  </h3>
                  <p className="text-xs text-slate-500">{pipe.zone} • {pipe.pipeMaterial} ({pipe.diameterMm}mm)</p>
                </div>

                {/* Telemetry Metrics */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Expected Flow:</span>
                    <strong className="text-slate-800 font-bold">{pipe.expectedFlowLpm} L/min</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Observed Flow:</span>
                    <strong className={isCrit ? 'text-rose-600 font-bold' : isWarn ? 'text-amber-600 font-bold' : 'text-emerald-600 font-bold'}>
                      {pipe.observedFlowLpm} L/min
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Flow Deficit:</span>
                    <strong className={isCrit ? 'text-rose-600 font-bold' : 'text-slate-700 font-bold'}>
                      {pipe.flowImbalanceLpm} L/min ({pipe.imbalancePct}%)
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Pressure Drop:</span>
                    <strong className={pipe.pressureDeltaBar > 1.0 ? 'text-rose-600 font-bold' : 'text-slate-700 font-bold'}>
                      Δ {pipe.pressureDeltaBar} bar
                    </strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-600 flex items-center justify-between">
                  <span>Reading: {pipe.readingTime}</span>
                  <span className="text-sky-700 font-semibold">Inspect Plan →</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Pipeline Detailed Inspection Plan Box */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-sky-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Engineering Action Plan: {selectedPipeline.pipelineName} ({selectedPipeline.pipelineId})
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Connecting Station {selectedPipeline.upstreamStationId} to {selectedPipeline.downstreamStationId}
              </p>
            </div>
            <Badge status={selectedPipeline.status} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-1.5">
              <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                Hydraulic Loss Diagnosis
              </span>
              <p className="text-slate-800 leading-relaxed">
                Flow deficit of <strong>{selectedPipeline.flowImbalanceLpm} Liters/min</strong> represents an estimated volumetric loss of <strong>{Number((selectedPipeline.flowImbalanceLpm * 60).toLocaleString())} L/hour</strong> into surrounding soil substrate.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-1.5">
              <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                Pressure Gradient Anomaly
              </span>
              <p className="text-slate-800 leading-relaxed">
                Upstream pressure: <strong>{selectedPipeline.upstreamPressureBar} bar</strong> | Downstream: <strong>{selectedPipeline.downstreamPressureBar} bar</strong>. Pressure drop of <strong>{selectedPipeline.pressureDeltaBar} bar</strong> exceeds hydraulic threshold (max 0.5 bar).
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-1.5">
              <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                Recommended Field Action
              </span>
              <p className="text-slate-800 leading-relaxed">
                {selectedPipeline.recommendedAction}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* MODULE B: ABNORMAL GROUNDWATER EXTRACTION DETECTION */}
      {/* ========================================================================= */}
      <section className="space-y-6 pt-4 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-800 bg-sky-100 px-2.5 py-0.5 rounded-sm">
                Module B
              </span>
              <h2 className="text-lg font-bold text-slate-900">
                Abnormal Groundwater Extraction & Diurnal Pattern Anomaly Detection
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Machine-learned diurnal pumping curves vs actual instantaneous submersible draw rates.
            </p>
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Severity:</span>
            <div className="flex rounded-lg border border-slate-200 bg-white p-0.5 font-semibold">
              {(['all', 'high', 'moderate', 'low'] as const).map((sev) => (
                <button
                  key={sev}
                  onClick={() => setAnomalyFilter(sev)}
                  className={`px-2.5 py-1 rounded-md capitalize transition-colors ${
                    anomalyFilter === sev ? 'bg-slate-900 text-white' : 'text-slate-600'
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Extraction Anomaly Records Table */}
        <div className="space-y-4">
          {filteredAnomalies.map((anomaly) => (
            <div
              key={anomaly.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4 hover:border-slate-300 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">{anomaly.stationName}</h3>
                    <Badge
                      status={
                        anomaly.severity === 'high'
                          ? 'critical'
                          : anomaly.severity === 'moderate'
                          ? 'warning'
                          : 'info'
                      }
                      label={`${anomaly.severity.toUpperCase()} DEVIATION`}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {anomaly.zone} • Time slot: <strong>{anomaly.timeSlot}</strong> • {anomaly.readingTime}
                  </p>
                </div>

                <button
                  onClick={() => navigateToStation(anomaly.stationId, 'monitoring')}
                  className="text-xs font-semibold text-sky-700 hover:text-sky-900 flex items-center gap-1 self-start sm:self-auto cursor-pointer"
                >
                  <span>View Station Telemetry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Extraction Metrics Comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                  <span className="text-slate-500 block text-[11px]">Expected Baseline Flow</span>
                  <strong className="text-base font-extrabold text-slate-900 mt-0.5 block">
                    {anomaly.expectedRateM3h} m³/h
                  </strong>
                  <span className="text-[10px] text-slate-400">Diurnal baseline curve</span>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                  <span className="text-slate-500 block text-[11px]">Observed Extraction Rate</span>
                  <strong className="text-base font-extrabold text-rose-600 mt-0.5 block">
                    {anomaly.observedRateM3h} m³/h
                  </strong>
                  <span className="text-[10px] text-rose-500 font-semibold">
                    +{anomaly.deltaPct}% Surge
                  </span>
                </div>

                <div className="sm:col-span-2 rounded-xl border border-slate-100 bg-slate-50 p-3 space-y-1">
                  <span className="text-slate-500 font-bold block text-[11px]">
                    Suspected Hydrogeological Cause:
                  </span>
                  <p className="text-slate-700 leading-relaxed text-xs">
                    {anomaly.suspectedCause}
                  </p>
                </div>
              </div>

              {/* Investigation Guidance & Protocol */}
              <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 space-y-1.5 text-xs">
                <span className="font-bold text-amber-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Standard Investigation Protocol:</span>
                </span>
                <p className="text-amber-950 leading-relaxed">
                  {anomaly.recommendedInvestigation}
                </p>
                <p className="text-[11px] text-amber-800 italic pt-1 border-t border-amber-200/50">
                  {anomaly.disclaimer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
