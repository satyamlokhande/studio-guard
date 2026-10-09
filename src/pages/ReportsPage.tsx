import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import {
  FileText,
  Download,
  Printer,
  Calendar,
  Filter,
  Layers,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Info,
  Droplets,
  Activity,
} from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const {
    stations,
    alerts,
    waterQualityMap,
    pipelineFlows,
    extractionAnomalies,
    rainfallRecords,
    isDemoMode,
  } = useApp();

  const [reportCategory, setReportCategory] = useState<
    'groundwater' | 'quality' | 'leakage' | 'recharge' | 'alerts'
  >('groundwater');
  const [selectedStationFilter, setSelectedStationFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('last_30_days');

  // Generate downloadable CSV
  const exportToCSV = () => {
    let headers: string[] = [];
    let rows: (string | number)[][] = [];
    let filename = `AquaGuard_${reportCategory}_report.csv`;

    if (reportCategory === 'groundwater') {
      headers = [
        'Station ID',
        'Station Name',
        'Zone',
        'Station Type',
        'Current Level (mbgl)',
        'Baseline (mbgl)',
        'Warning Threshold (mbgl)',
        'Critical Threshold (mbgl)',
        'Aquifer Layer',
        'Status',
      ];
      const targetStations =
        selectedStationFilter === 'all'
          ? stations
          : stations.filter((s) => s.id === selectedStationFilter);
      rows = targetStations.map((s) => [
        s.code,
        s.name,
        s.zone,
        s.stationType,
        s.currentLevelMeters,
        s.baselineLevelMeters,
        s.warningThresholdMeters,
        s.criticalThresholdMeters,
        s.aquiferType,
        s.status,
      ]);
    } else if (reportCategory === 'quality') {
      headers = [
        'Station ID',
        'Station Name',
        'Zone',
        'WQI Score',
        'pH',
        'TDS (mg/L)',
        'Turbidity (NTU)',
        'Conductivity (uS/cm)',
        'Nitrate (mg/L)',
        'Status',
      ];
      const targetStations =
        selectedStationFilter === 'all'
          ? stations
          : stations.filter((s) => s.id === selectedStationFilter);
      rows = targetStations.map((s) => {
        const q = waterQualityMap[s.id] || waterQualityMap['st-101'];
        return [
          s.code,
          s.name,
          s.zone,
          q.wqiScore,
          q.ph,
          q.tdsMgL,
          q.turbidityNtu,
          q.conductivityUsCm,
          q.nitrateMgL,
          q.status,
        ];
      });
    } else if (reportCategory === 'leakage') {
      headers = [
        'Pipeline ID',
        'Pipeline Name',
        'Zone',
        'Expected Flow (L/min)',
        'Observed Flow (L/min)',
        'Deficit (L/min)',
        'Imbalance %',
        'Pressure Delta (bar)',
        'Status',
        'Recommended SOP',
      ];
      rows = pipelineFlows.map((p) => [
        p.pipelineId,
        p.pipelineName,
        p.zone,
        p.expectedFlowLpm,
        p.observedFlowLpm,
        p.flowImbalanceLpm,
        p.imbalancePct,
        p.pressureDeltaBar,
        p.status,
        `"${p.recommendedAction.replace(/"/g, '""')}"`,
      ]);
    } else if (reportCategory === 'recharge') {
      headers = [
        'Month',
        'Rainfall (mm)',
        'Normal Rainfall (mm)',
        'Avg Water Table (mbgl)',
        'Est. Recharge (m3)',
        'Efficiency %',
      ];
      rows = rainfallRecords.map((r) => [
        r.month,
        r.rainfallMm,
        r.normalRainfallMm,
        r.avgWaterLevelMbgl,
        r.estimatedRechargeM3,
        r.rechargeEfficiencyPct,
      ]);
    } else {
      headers = [
        'Alert Code',
        'Severity',
        'Station Name',
        'Zone',
        'Category',
        'Title',
        'Status',
        'Logged At',
        'Action',
      ];
      const targetAlerts =
        selectedStationFilter === 'all'
          ? alerts
          : alerts.filter((a) => a.stationId === selectedStationFilter);
      rows = targetAlerts.map((a) => [
        a.code,
        a.severity,
        a.stationName,
        a.zone,
        a.category,
        `"${a.title.replace(/"/g, '""')}"`,
        a.status,
        a.createdAt,
        `"${a.suggestedAction.replace(/"/g, '""')}"`,
      ]);
    }

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header (Hidden on print) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <FileText className="w-7 h-7 text-sky-600" />
            <span>Environmental Compliance & Hydrogeological Reports</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Generate, filter, print, and export verifiable time-series data records.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={exportToCSV}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar (Hidden on print) */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4 print:hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Report Category:
            </label>
            <select
              value={reportCategory}
              onChange={(e) => setReportCategory(e.target.value as any)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800"
            >
              <option value="groundwater">Groundwater Level & Hydrograph Report</option>
              <option value="quality">Water Quality & WQI Compliance Report</option>
              <option value="leakage">Pipeline Leakage & Extraction Loss Report</option>
              <option value="recharge">Precipitation & Aquifer Recharge Summary</option>
              <option value="alerts">Incident Dispatch & Alert History</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Station Filter:
            </label>
            <select
              value={selectedStationFilter}
              onChange={(e) => setSelectedStationFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800"
            >
              <option value="all">All Monitoring Stations (12)</option>
              {stations.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.code} - {s.name} ({s.zone})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Temporal Window:
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800"
            >
              <option value="last_24_hours">Last 24 Hours (High Res)</option>
              <option value="last_7_days">Last 7 Days (Weekly Review)</option>
              <option value="last_30_days">Last 30 Days (Monthly Cycle)</option>
              <option value="seasonal">Monsoon & Post-Monsoon Season (2026)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Printable Report Document Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6 print:border-none print:shadow-none print:p-0">
        {/* Document Letterhead */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold text-slate-900 tracking-tight">
                AquaGuard Environmental Monitoring System
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-sky-100 text-sky-800">
                Official Telemetry Report
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Green Valley Aquifer Basin Hydrology Management Authority • Telemetry Rig v4.2
            </p>
          </div>

          <div className="text-right text-xs text-slate-500 space-y-0.5">
            <div>
              Generated:{' '}
              <strong className="text-slate-800">{new Date().toLocaleDateString()}</strong> at{' '}
              {new Date().toLocaleTimeString()}
            </div>
            <div>
              Data Source:{' '}
              <strong className="text-sky-700">
                {isDemoMode ? 'Simulated Telemetry Demonstration Feed' : 'Certified Live Sensor Rig'}
              </strong>
            </div>
          </div>
        </div>

        {/* Executive Summary Metrics Box */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-xs">
          <div>
            <span className="text-slate-500 block text-[11px]">Stations Evaluated:</span>
            <strong className="text-base font-extrabold text-slate-900">
              {selectedStationFilter === 'all' ? stations.length : 1}
            </strong>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Avg Basin Water Depth:</span>
            <strong className="text-base font-extrabold text-slate-900">18.4 mbgl</strong>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">WQI Quality Compliance:</span>
            <strong className="text-base font-extrabold text-emerald-700">83.3% Optimal</strong>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Active Incident Alerts:</span>
            <strong className="text-base font-extrabold text-rose-600">
              {alerts.filter((a) => a.status === 'active').length} Active
            </strong>
          </div>
        </div>

        {/* Table Content based on category */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
            {reportCategory === 'groundwater' && 'Groundwater Piezometric Telemetry Audit Table'}
            {reportCategory === 'quality' && 'Multi-Parameter Water Quality & Sonde Lab Log'}
            {reportCategory === 'leakage' && 'Hydraulic Mass-Balance Pipeline Transmission Log'}
            {reportCategory === 'recharge' && 'Rainfall Infiltration & Water Balance (WTF Method)'}
            {reportCategory === 'alerts' && 'Incident Dispatch History & Action Audit Trail'}
          </h2>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
                {reportCategory === 'groundwater' && (
                  <tr>
                    <th className="py-3 px-3">Station Code</th>
                    <th className="py-3 px-3">Name</th>
                    <th className="py-3 px-3">Zone</th>
                    <th className="py-3 px-3">Type</th>
                    <th className="py-3 px-3">Measured mbgl</th>
                    <th className="py-3 px-3">Baseline</th>
                    <th className="py-3 px-3">Critical Limit</th>
                    <th className="py-3 px-3">Aquifer Formation</th>
                    <th className="py-3 px-3">Status</th>
                  </tr>
                )}
                {reportCategory === 'quality' && (
                  <tr>
                    <th className="py-3 px-3">Station</th>
                    <th className="py-3 px-3">Zone</th>
                    <th className="py-3 px-3">WQI</th>
                    <th className="py-3 px-3">pH (6.5-8.5)</th>
                    <th className="py-3 px-3">TDS (&lt;500)</th>
                    <th className="py-3 px-3">Turbidity (&lt;5)</th>
                    <th className="py-3 px-3">Conductivity</th>
                    <th className="py-3 px-3">Nitrate (&lt;45)</th>
                    <th className="py-3 px-3">Evaluation</th>
                  </tr>
                )}
                {reportCategory === 'leakage' && (
                  <tr>
                    <th className="py-3 px-3">Pipeline</th>
                    <th className="py-3 px-3">Zone</th>
                    <th className="py-3 px-3">Expected (L/min)</th>
                    <th className="py-3 px-3">Observed (L/min)</th>
                    <th className="py-3 px-3">Deficit (L/min)</th>
                    <th className="py-3 px-3">Loss %</th>
                    <th className="py-3 px-3">Pressure Drop</th>
                    <th className="py-3 px-3">Status</th>
                  </tr>
                )}
                {reportCategory === 'recharge' && (
                  <tr>
                    <th className="py-3 px-3">Month</th>
                    <th className="py-3 px-3">Measured Rain (mm)</th>
                    <th className="py-3 px-3">Normal (mm)</th>
                    <th className="py-3 px-3">Water Table (mbgl)</th>
                    <th className="py-3 px-3">Est. Recharge (m³)</th>
                    <th className="py-3 px-3">Efficiency %</th>
                  </tr>
                )}
                {reportCategory === 'alerts' && (
                  <tr>
                    <th className="py-3 px-3">Alert Code</th>
                    <th className="py-3 px-3">Severity</th>
                    <th className="py-3 px-3">Location</th>
                    <th className="py-3 px-3">Incident Title</th>
                    <th className="py-3 px-3">Timestamp</th>
                    <th className="py-3 px-3">Status</th>
                  </tr>
                )}
              </thead>

              <tbody className="divide-y divide-slate-100">
                {reportCategory === 'groundwater' &&
                  stations
                    .filter((s) => selectedStationFilter === 'all' || s.id === selectedStationFilter)
                    .map((s) => (
                      <tr key={s.id} className="hover:bg-slate-50/50">
                        <td className="py-2.5 px-3 font-mono font-bold">{s.code}</td>
                        <td className="py-2.5 px-3 font-semibold text-slate-800">{s.name}</td>
                        <td className="py-2.5 px-3 text-slate-500">{s.zone}</td>
                        <td className="py-2.5 px-3 text-slate-500">{s.stationType}</td>
                        <td className="py-2.5 px-3 font-bold text-slate-900">{s.currentLevelMeters} m</td>
                        <td className="py-2.5 px-3 text-slate-500">{s.baselineLevelMeters} m</td>
                        <td className="py-2.5 px-3 text-rose-600 font-semibold">{s.criticalThresholdMeters} m</td>
                        <td className="py-2.5 px-3 text-slate-600">{s.aquiferType}</td>
                        <td className="py-2.5 px-3">
                          <Badge status={s.status} size="sm" />
                        </td>
                      </tr>
                    ))}

                {reportCategory === 'quality' &&
                  stations
                    .filter((s) => selectedStationFilter === 'all' || s.id === selectedStationFilter)
                    .map((s) => {
                      const q = waterQualityMap[s.id] || waterQualityMap['st-101'];
                      return (
                        <tr key={s.id} className="hover:bg-slate-50/50">
                          <td className="py-2.5 px-3 font-mono font-bold">{s.code}</td>
                          <td className="py-2.5 px-3 text-slate-500">{s.zone}</td>
                          <td className="py-2.5 px-3 font-bold">{q.wqiScore}</td>
                          <td className="py-2.5 px-3">{q.ph}</td>
                          <td className="py-2.5 px-3 font-semibold">{q.tdsMgL}</td>
                          <td className="py-2.5 px-3">{q.turbidityNtu}</td>
                          <td className="py-2.5 px-3">{q.conductivityUsCm}</td>
                          <td className="py-2.5 px-3 font-semibold">{q.nitrateMgL}</td>
                          <td className="py-2.5 px-3">
                            <Badge status={q.status as any} size="sm" />
                          </td>
                        </tr>
                      );
                    })}

                {reportCategory === 'leakage' &&
                  pipelineFlows.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-3 font-mono font-bold">{p.pipelineId}</td>
                      <td className="py-2.5 px-3 text-slate-500">{p.zone}</td>
                      <td className="py-2.5 px-3">{p.expectedFlowLpm}</td>
                      <td className="py-2.5 px-3 font-bold">{p.observedFlowLpm}</td>
                      <td className="py-2.5 px-3 font-bold text-rose-600">{p.flowImbalanceLpm}</td>
                      <td className="py-2.5 px-3 text-rose-600">{p.imbalancePct}%</td>
                      <td className="py-2.5 px-3">{p.pressureDeltaBar} bar</td>
                      <td className="py-2.5 px-3">
                        <Badge status={p.status} size="sm" />
                      </td>
                    </tr>
                  ))}

                {reportCategory === 'recharge' &&
                  rainfallRecords.map((r, i) => (
                    <tr key={i} className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-3 font-bold">{r.month}</td>
                      <td className="py-2.5 px-3 font-bold text-sky-700">{r.rainfallMm} mm</td>
                      <td className="py-2.5 px-3 text-slate-500">{r.normalRainfallMm} mm</td>
                      <td className="py-2.5 px-3 font-semibold">{r.avgWaterLevelMbgl} mbgl</td>
                      <td className="py-2.5 px-3 font-bold text-emerald-700">
                        {r.estimatedRechargeM3.toLocaleString()} m³
                      </td>
                      <td className="py-2.5 px-3">{r.rechargeEfficiencyPct}%</td>
                    </tr>
                  ))}

                {reportCategory === 'alerts' &&
                  alerts
                    .filter((a) => selectedStationFilter === 'all' || a.stationId === selectedStationFilter)
                    .map((a) => (
                      <tr key={a.id} className="hover:bg-slate-50/50">
                        <td className="py-2.5 px-3 font-mono font-bold">{a.code}</td>
                        <td className="py-2.5 px-3">
                          <Badge status={a.severity} size="sm" />
                        </td>
                        <td className="py-2.5 px-3 text-slate-600">{a.stationName}</td>
                        <td className="py-2.5 px-3 font-semibold text-slate-800">{a.title}</td>
                        <td className="py-2.5 px-3 text-slate-500">{a.createdAt}</td>
                        <td className="py-2.5 px-3">
                          <Badge status={a.status} size="sm" />
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Document Disclaimer */}
        <div className="pt-4 border-t border-slate-200 text-[11px] text-slate-500 space-y-1">
          <p className="font-semibold text-slate-700">
            Regulatory Compliance Notice:
          </p>
          <p className="leading-relaxed">
            This document is generated by the AquaGuard automated hydrogeology telemetry subsystem. All demonstration measurements are rendered in accordance with hydrologic modeling parameters. Physical field validation and certified ISO 17025 laboratory samples are recommended prior to statutory regulatory enforcement.
          </p>
        </div>
      </div>
    </div>
  );
};
