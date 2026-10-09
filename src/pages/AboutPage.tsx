import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Droplets,
  Shield,
  Layers,
  Activity,
  Cpu,
  Bot,
  CheckCircle2,
  Award,
  BookOpen,
  ArrowRight,
  GitBranch,
  Gauge,
  Sparkles,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Title & Introduction */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-300 bg-sky-50 px-3.5 py-1 text-xs font-bold text-sky-800">
          <Award className="w-3.5 h-3.5 text-amber-500" />
          <span>National Environmental Hackathon Technical Showcase</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
          About AquaGuard
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          An AI-powered underground water management and monitoring system engineered to safeguard invisible freshwater aquifers through real-time IoT telemetry, hydraulic anomaly detection, and predictive hydrogeological intelligence.
        </p>
      </div>

      {/* The Groundwater Problem & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-6 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-700 block">
            The Critical Challenge
          </span>
          <h2 className="text-lg font-bold text-slate-900">
            Invisible Depletion, Incurable Destruction
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Unlike rivers and lakes, underground aquifers cannot be easily seen. Traditional groundwater monitoring relies on manual inspections every 3 to 6 months. By the time water levels drop or heavy chemical contaminants breach municipal wells, the damage is already severe: aquifer compaction, land subsidence, and irreversible salinization.
          </p>
        </div>

        <div className="rounded-2xl border border-sky-200 bg-sky-50/50 p-6 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700 block">
            The AquaGuard Solution
          </span>
          <h2 className="text-lg font-bold text-slate-900">
            Continuous Cyber-Physical Stewardship
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            AquaGuard replaces delayed paperwork with sub-hourly IoT piezometric telemetry, multiparameter water-quality sondes, and hydraulic mass-balance pipe analytics. Coupled with AquaGuard AI, authorities receive prioritized alerts, leakage coordinates, and actionable aquifer recharge plans.
          </p>
        </div>
      </div>

      {/* System Architecture Diagram Pipeline */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-sm">
            Technical Architecture
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-2">
            End-to-End IoT & AI Data Pipeline
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            AquaGuard Architecture: Water Sensors → Data Collection → Data Validation → Central Database → Analytics and Anomaly Detection → Dashboard and Alerts → AI Recommendations → Human Review and Action.
          </p>
        </div>

        {/* Visual Pipeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="font-bold text-slate-900">IoT Water Sensors</h3>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Submersible hydrostatic pressure transducers, multiparameter optical sondes (pH, TDS, Nitrate), and electromagnetic flow meters.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="font-bold text-slate-900">Ingestion & Validation</h3>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              LoRaWAN / 4G cellular telemetry relays. Edge data validation cleans noisy signals and checks range boundaries against sensor calibration.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="font-bold text-slate-900">Analytics & Anomalies</h3>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Mass-balance pipeline loss calculations, diurnal extraction deviation detection, and Water Quality Index (WQI) aggregation.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center font-bold">
              4
            </div>
            <h3 className="font-bold text-slate-900">AI & Human Action</h3>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              AquaGuard AI synthesizes real-time telemetry into actionable engineering recommendations: valve isolation, recharge pits, and public advisories.
            </p>
          </div>
        </div>
      </section>

      {/* Scientific & Hydrogeological Formulations */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-sm">
            Mathematical & Scientific Foundations
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-2">
            Hydrogeological Equations Applied in AquaGuard
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">
              1. Water Balance Equation
            </h3>
            <div className="bg-slate-900 text-sky-300 font-mono p-2.5 rounded-lg text-center font-bold">
              P = R + ET + ΔS
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Where <strong>P</strong> is precipitation, <strong>R</strong> is surface runoff, <strong>ET</strong> is evapotranspiration, and <strong>ΔS</strong> is change in aquifer storage. Used in the Recharge Analytics module.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">
              2. Darcy&apos;s Subsurface Law
            </h3>
            <div className="bg-slate-900 text-sky-300 font-mono p-2.5 rounded-lg text-center font-bold">
              Q = -K · A · (dh / dl)
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Calculates groundwater discharge flux <strong>Q</strong> across cross-sectional area <strong>A</strong> given hydraulic conductivity <strong>K</strong> and hydraulic gradient <strong>dh/dl</strong>.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">
              3. Weighted Arithmetic WQI
            </h3>
            <div className="bg-slate-900 text-sky-300 font-mono p-2.5 rounded-lg text-center font-bold">
              WQI = Σ(Wᵢ · qᵢ) / ΣWᵢ
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Aggregates sub-indices <strong>qᵢ</strong> weighted by standard severity factor <strong>Wᵢ</strong> for pH, TDS, Nitrate, Turbidity, and Conductivity into a 0-100 composite index.
            </p>
          </div>
        </div>
      </section>

      {/* Environmental & Social Benefits */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-sm">
            Ecological Impact
          </span>
          <h3 className="text-base font-bold text-slate-900">
            Halting Permanent Aquifer Destruction
          </h3>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Prevents irreversible pore compaction and catastrophic land subsidence.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Arrests coastal saline intrusion by maintaining positive freshwater hydraulic head.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Enables data-backed community recharge well construction in high-infiltration basins.</span>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-sm">
            Municipal & Social Impact
          </span>
          <h3 className="text-base font-bold text-slate-900">
            Drinking Security & Cost Reduction
          </h3>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <span>Saves millions of liters of treated drinking water via early underground pipeline leak isolation.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <span>Early detection of chemical seepage prevents acute waterborne toxicities.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <span>Empowers municipal authorities and farmers with transparent, shared hydrological truth.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Mandatory Regulatory Testing Disclaimer */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-6 space-y-3 text-xs text-amber-900">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-amber-600" />
          <h3 className="text-sm font-bold text-amber-950">
            Scientific, Legal & Hackathon Regulatory Disclaimer
          </h3>
        </div>
        <p className="leading-relaxed">
          AquaGuard is an advanced environmental technology demonstration platform developed for hackathon presentation, academic modeling, and digital water resource management prototyping. All sensor telemetry, coordinates, and historical fluctuations rendered in this system are demonstration datasets designed to simulate hydrogeologically plausible real-world dynamics.
        </p>
        <p className="leading-relaxed">
          This system is not a substitute for certified laboratory microbiological or spectrometry testing (e.g., ISO/IEC 17025, EPA, BIS, or WHO potable water standards), authorized municipal field inspections, or official regulatory decisions by state groundwater authorities.
        </p>
      </div>

      {/* Launch CTA */}
      <div className="text-center pt-4">
        <button
          onClick={() => setCurrentView('dashboard')}
          className="px-6 py-3 rounded-xl font-bold text-xs bg-sky-700 hover:bg-sky-800 text-white shadow-md transition-colors cursor-pointer"
        >
          Return to Central Dashboard →
        </button>
      </div>
    </div>
  );
};
