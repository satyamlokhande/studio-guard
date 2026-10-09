import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SimpleLineChart } from '../components/common/SimpleLineChart';
import { Badge } from '../components/common/Badge';
import {
  CloudRain,
  Droplets,
  Calculator,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Info,
  Layers,
  Sparkles,
  Bot,
  MapPin,
  Leaf,
  Shield,
  Gauge,
} from 'lucide-react';

export const RechargeAnalyticsPage: React.FC = () => {
  const { rainfallRecords, recommendations, stations, setCurrentView, navigateToStation } = useApp();

  // Rainwater harvesting calculator state
  const [roofAreaM2, setRoofAreaM2] = useState<number>(250);
  const [annualRainfallMm, setAnnualRainfallMm] = useState<number>(780);
  const [runoffCoefficient, setRunoffCoefficient] = useState<number>(0.85); // 0.85 for concrete / corrugated sheet

  // Calculated liters per year: Area (m2) * Rainfall (mm) * Runoff Coefficient
  const calculatedHarvestLiters = Math.round(roofAreaM2 * annualRainfallMm * runoffCoefficient);
  const calculatedHarvestM3 = (calculatedHarvestLiters / 1000).toFixed(1);

  // Chart data: Monthly Rainfall (secondary) vs Groundwater Level (primary)
  const chartData = rainfallRecords.map((r) => ({
    label: r.month,
    value: r.avgWaterLevelMbgl,
    secondaryValue: r.rainfallMm,
  }));

  // Declining stations needing priority recharge
  const decliningStations = stations.filter((s) => s.currentLevelMeters >= 22.0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <CloudRain className="w-7 h-7 text-sky-600" />
            <span>Rainfall Correlation & Groundwater Recharge Analytics</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Quantifying hydrologic infiltration response lag, water table recovery, and conservation interventions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentView('assistant')}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-sky-700 hover:bg-sky-800 text-white shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Ask AI Recharge Advice</span>
          </button>
        </div>
      </div>

      {/* Scientific Methodology Disclaimer */}
      <div className="rounded-xl border border-sky-200 bg-sky-50/70 p-4 text-xs text-sky-900 flex items-start gap-3">
        <Info className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-sky-950">
            Recharge Modeling Methodology & Estimation Note:
          </p>
          <p className="leading-relaxed">
            Recharge values presented in this module are calculated hydrologic estimates derived from the Classical Water Balance Equation (P = R + ET + ΔS) and empirical soil infiltration coefficients, cross-referenced against piezometric head rise (Water Table Fluctuation Method - WTF). They represent modelled estimates rather than direct sub-surface flow measurements.
          </p>
        </div>
      </div>

      {/* Rainfall vs Water Table Trend Dual Comparison */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Droplets className="w-4 h-4 text-sky-600" />
              <span>Precipitation vs Aquifer Level Response (WTF Method)</span>
            </h2>
            <p className="text-xs text-slate-500">
              Blue Line: Avg Depth to Water Table (mbgl - lower value is closer to surface) | Green Line: Monthly Rainfall (mm)
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1.5 font-semibold text-sky-700">
              <span className="w-3 h-2 rounded-xs bg-sky-600" />
              Water Table (mbgl)
            </span>
            <span className="flex items-center gap-1.5 font-semibold text-emerald-700">
              <span className="w-3 h-2 rounded-xs bg-emerald-500" />
              Precipitation (mm)
            </span>
          </div>
        </div>

        {/* Dual Axis Chart */}
        <SimpleLineChart
          data={chartData}
          unit="mbgl"
          height={260}
          lineColor="#0284c7"
          secondaryLineColor="#10b981"
          invertY={false}
          valueLabel="Water Table Depth (mbgl)"
          secondaryValueLabel="Rainfall (mm)"
        />

        {/* Seasonal Hydrogeological Insights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs">
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 space-y-1">
            <span className="font-bold text-slate-700 text-[11px] uppercase">
              Pre-Monsoon Depletion (Apr-May)
            </span>
            <p className="text-slate-600 leading-relaxed">
              Water table reached deepest drawdown of 22.4 mbgl due to intense summer agricultural pumping and minimal natural percolation.
            </p>
          </div>

          <div className="rounded-xl border border-slate-100 bg-emerald-50/60 p-4 space-y-1">
            <span className="font-bold text-emerald-800 text-[11px] uppercase">
              Monsoon Recharge Surge (Jul-Aug)
            </span>
            <p className="text-slate-600 leading-relaxed">
              265mm rainfall in August triggered 1.24 million m³ net infiltration, elevating water table by 7.2 meters to 15.2 mbgl.
            </p>
          </div>

          <div className="rounded-xl border border-slate-100 bg-sky-50/60 p-4 space-y-1">
            <span className="font-bold text-sky-800 text-[11px] uppercase">
              Post-Monsoon Infiltration Lag (Sep-Oct)
            </span>
            <p className="text-slate-600 leading-relaxed">
              Soil moisture percolation maintains steady baseflow with a 21-day lag time through unconfined gravel layers.
            </p>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Rainwater Harvesting Calculator + Declining Wells */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Rainwater Harvesting Calculator */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
          <div className="pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-sky-600" />
              <h2 className="text-base font-bold text-slate-900">
                Interactive Rainwater Harvesting & Recharge Potential Calculator
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Estimate annual groundwater recharge volume capturable from building rooftops.
            </p>
          </div>

          {/* Form Inputs */}
          <div className="space-y-4 text-xs">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-slate-700">Rooftop Catchment Area:</label>
                <span className="font-mono font-bold text-slate-900">{roofAreaM2} m² ({Math.round(roofAreaM2 * 10.76)} sq ft)</span>
              </div>
              <input
                type="range"
                min="50"
                max="2000"
                step="25"
                value={roofAreaM2}
                onChange={(e) => setRoofAreaM2(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-slate-700">Annual Local Rainfall:</label>
                <span className="font-mono font-bold text-slate-900">{annualRainfallMm} mm/year</span>
              </div>
              <input
                type="range"
                min="300"
                max="2000"
                step="20"
                value={annualRainfallMm}
                onChange={(e) => setAnnualRainfallMm(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Roof Surface Material:</label>
              <select
                value={runoffCoefficient}
                onChange={(e) => setRunoffCoefficient(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800"
              >
                <option value={0.85}>Reinforced Concrete Slab (Runoff Coeff 0.85)</option>
                <option value={0.90}>Corrugated Galvanized Metal Sheet (Runoff Coeff 0.90)</option>
                <option value={0.75}>Clay / Terracotta Tiles (Runoff Coeff 0.75)</option>
                <option value={0.60}>Pervious Pavement / Green Roof (Runoff Coeff 0.60)</option>
              </select>
            </div>
          </div>

          {/* Result Output Card */}
          <div className="rounded-xl border border-sky-200 bg-gradient-to-br from-sky-50 to-blue-50/50 p-5 space-y-3">
            <span className="text-xs font-bold text-sky-900 uppercase tracking-wide">
              Annual Harvestable Groundwater Recharge:
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-sky-950">
                {calculatedHarvestLiters.toLocaleString()}
              </span>
              <span className="text-sm font-semibold text-sky-700">Liters / Year</span>
            </div>
            <div className="text-xs text-sky-800 font-medium">
              ≈ <strong>{calculatedHarvestM3} m³</strong> equivalent to {Math.round(calculatedHarvestLiters / 135)} person-days of domestic water security.
            </div>
            <p className="text-[11px] text-sky-700/80 leading-snug pt-2 border-t border-sky-200">
              Injecting this volume into a gravel-pack recharge shaft will replenish the local unconfined water table and arrest urban stormwater flooding.
            </p>
          </div>
        </div>

        {/* Right: Declining Monitoring Wells Requiring Recharge Intervention */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Gauge className="w-4 h-4 text-rose-600" />
                <span>Priority Depletion Zones</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Monitoring stations exhibiting severe drawdown requiring artificial recharge
              </p>
            </div>
            <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
              {decliningStations.length} High Priority
            </span>
          </div>

          <div className="space-y-3">
            {decliningStations.map((st) => (
              <div
                key={st.id}
                onClick={() => navigateToStation(st.id, 'monitoring')}
                className="rounded-xl border border-slate-200 p-4 hover:border-sky-300 hover:bg-sky-50/30 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-sm">
                      {st.code}
                    </span>
                    <h3 className="text-xs font-bold text-slate-900">{st.name}</h3>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {st.location} • {st.aquiferType}
                  </p>
                  <div className="mt-1 flex items-center gap-3 text-xs">
                    <span className="text-rose-600 font-bold">Current: {st.currentLevelMeters} mbgl</span>
                    <span className="text-slate-400">|</span>
                    <span className="text-slate-500">Deficit: -{(st.currentLevelMeters - st.baselineLevelMeters).toFixed(1)}m</span>
                  </div>
                </div>

                <button className="text-xs font-bold text-sky-700 hover:text-sky-900 flex items-center gap-1 shrink-0">
                  <span>Target Shaft</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Conservation Interventions Catalog */}
      <section className="space-y-4">
        <div className="pb-3 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Leaf className="w-5 h-5 text-emerald-600" />
            <span>Recommended Conservation & Artificial Recharge Interventions</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Engineered solutions tailored to watershed geology, soil permeability, and depletion severity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3 flex flex-col justify-between hover:border-slate-300 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-sm border border-sky-200">
                    {rec.category}
                  </span>
                  <Badge
                    status={
                      rec.priority === 'High'
                        ? 'critical'
                        : rec.priority === 'Medium'
                        ? 'warning'
                        : 'info'
                    }
                    label={`${rec.priority} Priority`}
                    size="sm"
                  />
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug">{rec.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{rec.description}</p>

                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-700 block mb-1">
                    Hydrologic Evidence:
                  </span>
                  <p className="text-[11px] text-slate-500 leading-relaxed italic">
                    {rec.evidence}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                <div className="text-[11px] text-slate-700">
                  <strong className="text-slate-900">Target Zone:</strong> {rec.targetZone}
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 p-2 rounded-lg">
                  {rec.estimatedCostBenefit}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
