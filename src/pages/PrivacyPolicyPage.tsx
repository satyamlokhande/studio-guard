import React from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Lock, FileText, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back button */}
      <div>
        <button
          onClick={() => setCurrentView('landing')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </div>

      {/* Header */}
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-800">
          <Shield className="w-3.5 h-3.5 text-sky-700" />
          <span>Data Stewardship & Protection</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-500">
          Last revised: October 2026 • Effective for AquaGuard Platform and Telemetry Services
        </p>
      </div>

      {/* Policy Content */}
      <div className="space-y-6 text-xs text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900">1. Overview and Purpose</h2>
          <p>
            AquaGuard (&quot;we,&quot; &quot;our,&quot; or &quot;the Platform&quot;) is committed to transparent and ethical data management. This Privacy Policy details how telemetry, operational notes, and account metadata are collected, processed, and safeguarded when interacting with the AquaGuard groundwater monitoring system.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900">2. Categories of Data Collected</h2>
          <p>We restrict data collection exclusively to environmental and operational parameters:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Subsurface Hydrogeological Telemetry:</strong> Water table depth (mbgl), hydrostatic head pressure, volumetric flow rates (L/min), electrical conductivity, pH, turbidity, TDS, nitrate levels, and solar telemetry health metrics.
            </li>
            <li>
              <strong>Operational Audit Notes:</strong> On-site technician inspection logs, alert resolution timestamps, and standard operating procedure notes recorded during well maintenance.
            </li>
            <li>
              <strong>Technical Session Logs:</strong> Client device type, IP address, and browser headers required strictly for authenticated API communication and DDoS mitigation.
            </li>
          </ul>
          <p className="text-slate-500 italic">
            AquaGuard does not collect, harvest, or monetize consumer behavioral profiles, location tracking, or private financial records.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900">3. Lawful Basis and Use of Information</h2>
          <p>Environmental data is processed under the following lawful operational requirements:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>To compute real-time hydraulic mass-balance deficits and detect pipeline leakages.</li>
            <li>To dispatch automated contamination warnings to municipal environmental health desks.</li>
            <li>To evaluate regional aquifer recharge rates and calibrate watershed conservation models.</li>
            <li>To support municipal water boards with regulatory audit compliance reports.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900">4. Telemetry Encryption and Storage</h2>
          <p>
            All sensor transmissions are secured using TLS 1.3 transit encryption. Persistent time-series data is stored with AES-256 server-side encryption. Access is strictly partitioned by role-based operational permissions (Field Investigator, Municipal Engineer, System Administrator).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900">5. Data Sharing and Third Parties</h2>
          <p>
            Aggregated hydrogeological data may be shared with accredited academic environmental research institutions and statutory water authority boards for watershed protection. Raw data is never sold or shared with commercial advertising entities.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900">6. Data Subject Rights and Retention</h2>
          <p>
            Authorized operators may request audit log export, data correction, or incident record deletion through their municipal water authority administrator or by contacting the Data Protection Officer.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900">7. Data Protection Officer Contact</h2>
          <p>
            For privacy inquiries or regulatory audit requests, contact:
          </p>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 space-y-1 font-mono text-[11px] text-slate-800">
            <div>Office of Data Governance: AquaGuard Watershed Authority</div>
            <div>Email: privacy@aquaguard-systems.org</div>
            <div>Response SLA: Within 48 business hours</div>
          </div>
        </section>
      </div>

      {/* Return button */}
      <div className="pt-6 border-t border-slate-200">
        <button
          onClick={() => setCurrentView('dashboard')}
          className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-sky-700 hover:bg-sky-800 text-white transition-colors"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};
