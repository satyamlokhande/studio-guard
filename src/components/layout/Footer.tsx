import React from 'react';
import { useApp } from '../../context/AppContext';
import { AppView } from '../../types';
import { Droplets, Shield, ExternalLink, Award, FileCheck, Layers } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Hackathon Context */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600 text-white shadow-sm">
                <Droplets className="w-5 h-5 fill-white/30" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">AquaGuard</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              AI-Powered Underground Water Management and Monitoring System. Bridging IoT telemetry, predictive hydraulic modeling, and environmental stewardship to safeguard vital aquifers.
            </p>
            <div className="inline-flex items-center gap-2 rounded-md bg-slate-800/80 px-2.5 py-1 text-[11px] text-sky-300 border border-slate-700">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>National Environmental Tech Showcase Edition</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Platform Modules
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { view: 'dashboard' as AppView, label: 'Central Dashboard' },
                { view: 'monitoring' as AppView, label: 'Groundwater Monitoring' },
                { view: 'quality' as AppView, label: 'Water Quality Analysis' },
                { view: 'leakage' as AppView, label: 'Leakage & Extraction' },
                { view: 'recharge' as AppView, label: 'Recharge & Rainfall' },
                { view: 'assistant' as AppView, label: 'AquaGuard AI Assistant' },
              ].map((item) => (
                <li key={item.view}>
                  <button
                    onClick={() => setCurrentView(item.view)}
                    className="text-slate-400 hover:text-sky-300 transition-colors flex items-center gap-1.5"
                  >
                    <span>›</span>
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Management & Analytics */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Governance & Data
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { view: 'alerts' as AppView, label: 'Alert Dispatch Center' },
                { view: 'reports' as AppView, label: 'Compliance Reports & CSV' },
                { view: 'about' as AppView, label: 'System Architecture & Science' },
                { view: 'privacy' as AppView, label: 'Privacy Policy' },
                { view: 'terms' as AppView, label: 'Terms & Conditions' },
              ].map((item) => (
                <li key={item.view}>
                  <button
                    onClick={() => setCurrentView(item.view)}
                    className="text-slate-400 hover:text-sky-300 transition-colors flex items-center gap-1.5"
                  >
                    <span>›</span>
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="pt-2 text-xs text-slate-400">
              <span className="text-slate-500 block">Telemetry Standards:</span>
              <span className="text-slate-300 text-[11px]">
                ISO 5667-11 Groundwater Sampling & WMO Guidelines
              </span>
            </div>
          </div>

          {/* Col 4: Architecture Pipeline & Disclaimer */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              End-to-End Pipeline
            </h4>
            <div className="text-[11px] text-slate-400 space-y-1.5 bg-slate-800/60 p-3 rounded-lg border border-slate-700/80">
              <div className="flex items-center gap-1.5 text-sky-300 font-medium">
                <Layers className="w-3.5 h-3.5" />
                <span>Multi-Tier Architecture:</span>
              </div>
              <p className="leading-snug">
                IoT Sensors → MQTT/LoRa Ingestion → Data Validation → Time-Series Store → Anomaly Engine → AquaGuard AI → Human Action
              </p>
            </div>
          </div>
        </div>

        {/* Regulatory & Demonstration Disclaimer */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
          <div className="flex items-start gap-2">
            <Shield className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p>
              <strong className="text-slate-300">Technical Project Demonstration Disclaimer:</strong> This application demonstrates the AquaGuard groundwater monitoring and decision-support architecture using realistic simulated sensor telemetry and configured reference standards. It is designed for educational demonstrations, hackathon presentations, and decision-support modeling. Demonstration readings do not replace certified environmental laboratory testing (e.g. EPA, ISO, WHO, or BIS standards), authorized field inspections, or statutory regulatory mandates.
            </p>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-slate-400 text-xs gap-3">
            <span>© 2026 AquaGuard Technologies. Built for sustainable water security.</span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentView('privacy')}
                className="hover:text-sky-300 transition-colors"
              >
                Privacy Policy
              </button>
              <span>•</span>
              <button
                onClick={() => setCurrentView('terms')}
                className="hover:text-sky-300 transition-colors"
              >
                Terms of Use
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
