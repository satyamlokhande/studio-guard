import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import { SimpleLineChart } from '../components/common/SimpleLineChart';
import {
  FlaskConical,
  Droplets,
  AlertTriangle,
  CheckCircle2,
  AlertOctagon,
  Info,
  Scale,
  Sparkles,
  Bot,
  ArrowRight,
  TrendingUp,
  FileCheck2,
  ShieldCheck,
} from 'lucide-react';

export const WaterQualityPage: React.FC = () => {
  const { stations, waterQualityMap, setCurrentView } = useApp();

  const [selectedStationId, setSelectedStationId] = useState<string>('st-104');
  const [compareStationId, setCompareStationId] = useState<string>('st-103');
  const [selectedParameter, setSelectedParameter] = useState<'ph' | 'tds' | 'nitrate' | 'turbidity' | 'ec'>('tds');

  const station = stations.find((s) => s.id === selectedStationId) || stations[0];
  const compareStation = stations.find((s) => s.id === compareStationId) || stations[1];

  const qData = waterQualityMap[selectedStationId] || waterQualityMap['st-101'];
  const compareQData = waterQualityMap[compareStationId] || waterQualityMap['st-103'];

  // Historical sample data generator based on current value
  const getParamTrend = (currentVal: number, param: string) => {
    const variations = [-0.08, -0.05, 0.02, -0.03, 0.05, 0.02, 0];
    const days = ['Day -6', 'Day -5', 'Day -4', 'Day -3', 'Day -2', 'Yesterday', 'Today'];
    return days.map((day, idx) => ({
      label: day,
      value: Number((currentVal * (1 + variations[idx])).toFixed(1)),
    }));
  };

  const getParamConfig = (key: typeof selectedParameter) => {
    switch (key) {
      case 'ph':
        return {
          title: 'pH Level (Acidity / Alkalinity)',
          unit: 'pH',
          safeRange: '6.5 - 8.5',
          warnThreshold: 8.5,
          critThreshold: 9.0,
          current: qData.ph,
          compare: compareQData.ph,
          status: qData.ph < 6.5 || qData.ph > 8.5 ? 'Critical' : 'Good',
          explanation: 'Measures hydrogen-ion concentration. Values outside 6.5-8.5 indicate acidic mine drainage or alkaline industrial washing effluent.',
        };
      case 'tds':
        return {
          title: 'Total Dissolved Solids (TDS)',
          unit: 'mg/L',
          safeRange: '< 500 mg/L',
          warnThreshold: 500,
          critThreshold: 1000,
          current: qData.tdsMgL,
          compare: compareQData.tdsMgL,
          status: qData.tdsMgL > 1000 ? 'Critical' : qData.tdsMgL > 500 ? 'Fair' : 'Good',
          explanation: 'Cumulative measurement of dissolved mineral salts. Excessive TDS causes mineral scaling and unpleasant taste, and signals contaminant leaching.',
        };
      case 'nitrate':
        return {
          title: 'Nitrate Concentration (NO3)',
          unit: 'mg/L',
          safeRange: '< 45.0 mg/L',
          warnThreshold: 40.0,
          critThreshold: 45.0,
          current: qData.nitrateMgL,
          compare: compareQData.nitrateMgL,
          status: qData.nitrateMgL >= 45 ? 'Critical' : qData.nitrateMgL > 35 ? 'Fair' : 'Good',
          explanation: 'Common byproduct of chemical nitrogen fertilizer leaching and animal manure seepage. High nitrate poses methemoglobinemia risk.',
        };
      case 'turbidity':
        return {
          title: 'Turbidity (Water Clarity)',
          unit: 'NTU',
          safeRange: '< 5.0 NTU',
          warnThreshold: 4.0,
          critThreshold: 5.0,
          current: qData.turbidityNtu,
          compare: compareQData.turbidityNtu,
          status: qData.turbidityNtu >= 5 ? 'Critical' : 'Good',
          explanation: 'Cloudiness caused by suspended colloids or organic sediment. Indicates potential well casing rupture or surface runoff ingress.',
        };
      case 'ec':
      default:
        return {
          title: 'Electrical Conductivity (EC)',
          unit: 'µS/cm',
          safeRange: '< 1000 µS/cm',
          warnThreshold: 1000,
          critThreshold: 1500,
          current: qData.conductivityUsCm,
          compare: compareQData.conductivityUsCm,
          status: qData.conductivityUsCm > 1500 ? 'Critical' : qData.conductivityUsCm > 1000 ? 'Poor' : 'Good',
          explanation: 'Ability to conduct electrical current, directly tied to ion mineralization and coastal saltwater intrusion.',
        };
    }
  };

  const paramConfig = getParamConfig(selectedParameter);
  const trendData = getParamTrend(paramConfig.current, selectedParameter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Title & Mandatory Testing Disclaimer */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <FlaskConical className="w-7 h-7 text-emerald-600" />
            <span>Groundwater Quality & Hydro-Chemical Monitoring</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time in-situ multiparameter sonde analysis across configured reference baselines.
          </p>
        </div>

        {/* Station Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-700">Target Station:</label>
          <select
            value={selectedStationId}
            onChange={(e) => setSelectedStationId(e.target.value)}
            className="text-xs font-semibold rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {stations.map((s) => (
              <option key={s.id} value={s.id}>
                {s.code} - {s.name} ({s.zone})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Prominent Scientific Testing Standards Disclaimer */}
      <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-xs text-amber-900 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold">
            Important Hydro-Chemical Safety Protocol:
          </p>
          <p className="leading-relaxed">
            Groundwater cannot and must not be declared safe for human drinking solely because standard physical sonde parameters (such as pH or TDS) appear within normal ranges. Full potable water suitability requires certified microbiological culture testing (E. coli, coliforms) and spectrometry for trace heavy metals (Arsenic, Lead, Fluoride) under ISO 17025 accredited laboratory protocols.
          </p>
        </div>
      </div>

      {/* Primary Station Overview: WQI Score & 6 Sonde Parameters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold bg-slate-100 px-2 py-0.5 rounded-sm text-slate-800">
                {station.code}
              </span>
              <h2 className="text-lg font-bold text-slate-900">{station.name}</h2>
              <Badge status={qData.status as any} />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Sampled: {qData.readingTime} via {qData.dataSource} • {station.aquiferType}
            </p>
          </div>

          {/* Water Quality Index (WQI) Score Meter */}
          <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div className="text-right">
              <span className="text-[11px] text-slate-500 font-medium block">Water Quality Index</span>
              <span className="text-xs font-bold text-slate-700">Weighted Arithmetic WQI</span>
            </div>
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-sm border-2 ${
                qData.wqiScore >= 80
                  ? 'border-emerald-500 text-emerald-700 bg-emerald-50'
                  : qData.wqiScore >= 60
                  ? 'border-amber-500 text-amber-700 bg-amber-50'
                  : 'border-rose-500 text-rose-700 bg-rose-50'
              }`}
            >
              {qData.wqiScore}
            </div>
          </div>
        </div>

        {/* The 6 Parameter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* pH */}
          <div
            onClick={() => setSelectedParameter('ph')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              selectedParameter === 'ph'
                ? 'border-sky-500 bg-sky-50/40 ring-1 ring-sky-500'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold">pH Level</span>
              <span className="font-mono text-[11px]">Safe: 6.5 - 8.5</span>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">
              {qData.ph}{' '}
              <span className="text-xs font-normal text-slate-500">pH</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span
                className={`font-semibold ${
                  qData.ph < 6.5 || qData.ph > 8.5 ? 'text-rose-600' : 'text-emerald-600'
                }`}
              >
                {qData.ph < 6.5 || qData.ph > 8.5 ? 'Breached' : 'Within Range'}
              </span>
              <span className="text-slate-400 text-[11px]">Click to inspect</span>
            </div>
          </div>

          {/* TDS */}
          <div
            onClick={() => setSelectedParameter('tds')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              selectedParameter === 'tds'
                ? 'border-sky-500 bg-sky-50/40 ring-1 ring-sky-500'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold">Total Dissolved Solids (TDS)</span>
              <span className="font-mono text-[11px]">Limit: &lt;500 mg/L</span>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">
              {qData.tdsMgL}{' '}
              <span className="text-xs font-normal text-slate-500">mg/L</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span
                className={`font-semibold ${
                  qData.tdsMgL > 1000
                    ? 'text-rose-600'
                    : qData.tdsMgL > 500
                    ? 'text-amber-600'
                    : 'text-emerald-600'
                }`}
              >
                {qData.tdsMgL > 1000 ? 'Critical High' : qData.tdsMgL > 500 ? 'Warning' : 'Optimal'}
              </span>
              <span className="text-slate-400 text-[11px]">Click to inspect</span>
            </div>
          </div>

          {/* Nitrate */}
          <div
            onClick={() => setSelectedParameter('nitrate')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              selectedParameter === 'nitrate'
                ? 'border-sky-500 bg-sky-50/40 ring-1 ring-sky-500'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold">Nitrate (NO3)</span>
              <span className="font-mono text-[11px]">Standard: &lt;45 mg/L</span>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">
              {qData.nitrateMgL}{' '}
              <span className="text-xs font-normal text-slate-500">mg/L</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span
                className={`font-semibold ${
                  qData.nitrateMgL >= 45 ? 'text-rose-600' : 'text-emerald-600'
                }`}
              >
                {qData.nitrateMgL >= 45 ? 'Contamination Spike' : 'Within Threshold'}
              </span>
              <span className="text-slate-400 text-[11px]">Click to inspect</span>
            </div>
          </div>

          {/* Turbidity */}
          <div
            onClick={() => setSelectedParameter('turbidity')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              selectedParameter === 'turbidity'
                ? 'border-sky-500 bg-sky-50/40 ring-1 ring-sky-500'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold">Turbidity (Clarity)</span>
              <span className="font-mono text-[11px]">Standard: &lt;5.0 NTU</span>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">
              {qData.turbidityNtu}{' '}
              <span className="text-xs font-normal text-slate-500">NTU</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span
                className={`font-semibold ${
                  qData.turbidityNtu >= 5 ? 'text-rose-600' : 'text-emerald-600'
                }`}
              >
                {qData.turbidityNtu >= 5 ? 'Elevated Turbidity' : 'Clear Aquifer'}
              </span>
              <span className="text-slate-400 text-[11px]">Click to inspect</span>
            </div>
          </div>

          {/* Electrical Conductivity */}
          <div
            onClick={() => setSelectedParameter('ec')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              selectedParameter === 'ec'
                ? 'border-sky-500 bg-sky-50/40 ring-1 ring-sky-500'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold">Electrical Conductivity (EC)</span>
              <span className="font-mono text-[11px]">Target: &lt;1000 µS/cm</span>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">
              {qData.conductivityUsCm}{' '}
              <span className="text-xs font-normal text-slate-500">µS/cm</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span
                className={`font-semibold ${
                  qData.conductivityUsCm > 1000 ? 'text-amber-600' : 'text-emerald-600'
                }`}
              >
                {qData.conductivityUsCm > 1000 ? 'Elevated Mineralization' : 'Optimal'}
              </span>
              <span className="text-slate-400 text-[11px]">Click to inspect</span>
            </div>
          </div>

          {/* Water Temperature & Dissolved Oxygen */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold">Temp & Dissolved Oxygen</span>
              <span className="font-mono text-[11px]">Thermal Equilibrium</span>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">
              {qData.temperatureC}°C{' '}
              <span className="text-xs font-normal text-slate-500">
                / {qData.dissolvedOxygenMgL} mg/L DO
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-emerald-600 font-semibold">Subsurface Stable</span>
              <span className="text-slate-400 text-[11px]">Thermal Sonde</span>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Parameter Trend & Scientific Details */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">{paramConfig.title}</h3>
            <p className="text-xs text-slate-600 mt-0.5">{paramConfig.explanation}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Permissible Benchmark:</span>
            <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-sm">
              {paramConfig.safeRange}
            </span>
          </div>
        </div>

        <SimpleLineChart
          data={trendData}
          unit={paramConfig.unit}
          height={220}
          lineColor="#059669"
          warningThreshold={paramConfig.warnThreshold}
          criticalThreshold={paramConfig.critThreshold}
          valueLabel="Measured Sonde Concentration"
        />
      </div>

      {/* Station Side-by-Side Comparator */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-sky-600" />
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Side-by-Side Aquifer Hydro-Chemical Comparator
              </h3>
              <p className="text-xs text-slate-500">
                Compare water quality profiles between 2 contrasting monitoring stations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-slate-600">Compare With:</label>
            <select
              value={compareStationId}
              onChange={(e) => setCompareStationId(e.target.value)}
              className="text-xs font-semibold rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-slate-700"
            >
              {stations.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.code} - {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Hydro-Chemical Parameter</th>
                <th className="py-3 px-4 font-bold text-slate-700">
                  {station.code} ({station.name})
                </th>
                <th className="py-3 px-4 font-bold text-sky-700">
                  {compareStation.code} ({compareStation.name})
                </th>
                <th className="py-3 px-4">Configured Safe Standard</th>
                <th className="py-3 px-4">Variance Evaluation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3 px-4 font-medium text-slate-900">Overall WQI Index</td>
                <td className="py-3 px-4 font-bold text-slate-900">{qData.wqiScore} / 100</td>
                <td className="py-3 px-4 font-bold text-sky-900">{compareQData.wqiScore} / 100</td>
                <td className="py-3 px-4 text-slate-500">&gt; 75 (Good Quality)</td>
                <td className="py-3 px-4">
                  <Badge status={qData.status as any} size="sm" />
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-slate-900">pH</td>
                <td className="py-3 px-4 font-bold">{qData.ph}</td>
                <td className="py-3 px-4 font-bold text-sky-900">{compareQData.ph}</td>
                <td className="py-3 px-4 text-slate-500">6.5 - 8.5</td>
                <td className="py-3 px-4">
                  <span className={qData.ph > 8.5 ? 'text-rose-600 font-bold' : 'text-emerald-600 font-medium'}>
                    {qData.ph > 8.5 ? 'Exceeded' : 'Normal'}
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-slate-900">TDS (Total Dissolved Solids)</td>
                <td className="py-3 px-4 font-bold">{qData.tdsMgL} mg/L</td>
                <td className="py-3 px-4 font-bold text-sky-900">{compareQData.tdsMgL} mg/L</td>
                <td className="py-3 px-4 text-slate-500">&lt; 500 mg/L</td>
                <td className="py-3 px-4">
                  <span className={qData.tdsMgL > 1000 ? 'text-rose-600 font-bold' : 'text-emerald-600 font-medium'}>
                    {qData.tdsMgL > 1000 ? 'Critical Leachate' : 'Acceptable'}
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-slate-900">Nitrate (NO3)</td>
                <td className="py-3 px-4 font-bold">{qData.nitrateMgL} mg/L</td>
                <td className="py-3 px-4 font-bold text-sky-900">{compareQData.nitrateMgL} mg/L</td>
                <td className="py-3 px-4 text-slate-500">&lt; 45.0 mg/L</td>
                <td className="py-3 px-4">
                  <span className={qData.nitrateMgL >= 45 ? 'text-rose-600 font-bold' : 'text-emerald-600 font-medium'}>
                    {qData.nitrateMgL >= 45 ? 'Fertilizer/Sewage Spike' : 'Safe'}
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-slate-900">Electrical Conductivity</td>
                <td className="py-3 px-4 font-bold">{qData.conductivityUsCm} µS/cm</td>
                <td className="py-3 px-4 font-bold text-sky-900">{compareQData.conductivityUsCm} µS/cm</td>
                <td className="py-3 px-4 text-slate-500">&lt; 1000 µS/cm</td>
                <td className="py-3 px-4">
                  <span className={qData.conductivityUsCm > 1000 ? 'text-amber-600 font-bold' : 'text-emerald-600 font-medium'}>
                    {qData.conductivityUsCm > 1000 ? 'Saline Warning' : 'Normal'}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
