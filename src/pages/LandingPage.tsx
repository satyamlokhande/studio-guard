import { useApp } from '../context/AppContext';
import {
  Droplets,
  Shield,
  Activity,
  Layers,
  Search,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  CheckCircle2,
  Cpu,
  BarChart3,
  Bot,
  CloudRain,
  Compass,
  FileCheck2,
  Flame,
  Gauge,
  Sparkles,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setCurrentView, navigateToStation, stations, activeAlertCount } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-sky-950 to-slate-900 text-white pt-16 pb-24 lg:pt-24 lg:pb-32">
        {/* Subtle background glow & grid */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-600/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-size-[32px_32px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline & Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 text-xs text-sky-300 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                <span>Next-Gen Hydrogeological IoT & AI Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Protect Every Drop.{' '}
                <span className="bg-gradient-to-r from-sky-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
                  Monitor Every Depth.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Groundwater sustains 50% of the world&apos;s drinking supply and 40% of irrigated agriculture, yet it remains invisible and endangered. AquaGuard unites IoT well sensors, hydraulic anomaly modeling, and AI-assisted decision intelligence to track aquifer depletion, water quality, and pipeline loss in real time.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-lg shadow-sky-500/25 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <span>Explore Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setCurrentView('about')}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border border-slate-700 backdrop-blur-md transition-all cursor-pointer"
                >
                  <span>Discover How It Works</span>
                </button>

                <button
                  onClick={() => setCurrentView('assistant')}
                  className="flex items-center gap-2 px-4 py-3.5 rounded-xl font-semibold text-xs text-sky-300 hover:text-white transition-colors"
                >
                  <Bot className="w-4 h-4 text-sky-400" />
                  <span>Ask AquaGuard AI</span>
                </button>
              </div>

              {/* Status Pill Strip */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>12 Telemetry Stations Online</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-sky-400" />
                  <span>Automated Leak Detection</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-amber-400" />
                  <span>WQI Multi-Parameter Sonde</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Cross-Section Hydrogeology Visualizer */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-2xl backdrop-blur-md text-white">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-sky-400" />
                    <span className="font-semibold text-slate-200">Sub-Surface Hydrogeology Model</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/80 px-2 py-0.5 rounded-sm border border-emerald-800">
                    Live Stratigraphy
                  </span>
                </div>

                {/* Cross-section SVG Graphic */}
                <div className="relative mt-4 h-64 w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                  <svg viewBox="0 0 400 240" className="w-full h-full">
                    <defs>
                      <linearGradient id="ground-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#78350f" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#451a03" stopOpacity="0.8" />
                      </linearGradient>
                      <linearGradient id="aquifer-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0369a1" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#0c4a6e" stopOpacity="0.9" />
                      </linearGradient>
                      <linearGradient id="confined-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#075985" stopOpacity="0.95" />
                      </linearGradient>
                    </defs>

                    {/* Top Soil Layer (Vadose Zone) */}
                    <rect x="0" y="20" width="400" height="40" fill="url(#ground-grad)" />
                    <text x="12" y="44" fill="#d97706" fontSize="10" fontWeight="600">
                      Vadose Zone (Unsaturated Soil)
                    </text>

                    {/* Dynamic Water Table Line */}
                    <line x1="0" y1="60" x2="400" y2="60" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="4 2" />
                    <text x="12" y="75" fill="#38bdf8" fontSize="10" fontWeight="bold">
                      Water Table (18.4m mbgl)
                    </text>

                    {/* Unconfined Aquifer */}
                    <rect x="0" y="60" width="400" height="60" fill="url(#aquifer-grad)" />
                    <text x="12" y="105" fill="#bae6fd" fontSize="10" opacity="0.85">
                      Unconfined Alluvial Aquifer (Sand & Gravel)
                    </text>

                    {/* Impermeable Aquitard / Clay Bedrock */}
                    <rect x="0" y="120" width="400" height="25" fill="#1e293b" />
                    <text x="12" y="137" fill="#94a3b8" fontSize="10" fontWeight="600">
                      Impermeable Clay Aquitard (Aquitard Barrier)
                    </text>

                    {/* Confined Deep Aquifer */}
                    <rect x="0" y="145" width="400" height="95" fill="url(#confined-grad)" />
                    <text x="12" y="180" fill="#7dd3fc" fontSize="10" fontWeight="600">
                      Confined Sandstone Deep Aquifer (Pressurized)
                    </text>

                    {/* Well 1: Deep Borewell (ST-101) */}
                    <rect x="110" y="10" width="8" height="170" fill="#64748b" rx="2" />
                    <circle cx="114" cy="180" r="4" fill="#38bdf8" className="animate-pulse" />
                    <line x1="114" y1="10" x2="114" y2="0" stroke="#38bdf8" strokeWidth="2" />
                    <rect x="90" y="2" width="48" height="14" rx="3" fill="#0284c7" />
                    <text x="114" y="12" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">
                      ST-101
                    </text>

                    {/* Well 2: Industrial Extraction Well (ST-104) */}
                    <rect x="260" y="10" width="8" height="150" fill="#e11d48" rx="2" />
                    <circle cx="264" cy="160" r="4" fill="#ef4444" className="animate-ping" />
                    <rect x="240" y="2" width="48" height="14" rx="3" fill="#be123c" />
                    <text x="264" y="12" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">
                      ST-104 Crit
                    </text>

                    {/* Rain infiltration arrows */}
                    <path d="M 50,0 L 50,15" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
                    <path d="M 200,0 L 200,15" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
                    <path d="M 350,0 L 350,15" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                  <span>Demonstration telemetry snapshot</span>
                  <button
                    onClick={() => setCurrentView('monitoring')}
                    className="text-sky-400 hover:text-sky-300 font-medium flex items-center gap-1"
                  >
                    <span>View Map & Sensors</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demonstration Statistics Bar */}
      <section className="border-y border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="border-r border-slate-100 last:border-r-0">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">12</span>
              <p className="text-xs text-slate-500 mt-0.5">Monitoring Locations</p>
              <span className="text-[10px] text-sky-600 font-medium">Demonstration Grid</span>
            </div>
            <div className="border-r border-slate-100 last:border-r-0">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">18.4 m</span>
              <p className="text-xs text-slate-500 mt-0.5">Avg Water Level Depth</p>
              <span className="text-[10px] text-emerald-600 font-medium">+0.8m Recharge this Season</span>
            </div>
            <div className="border-r border-slate-100 last:border-r-0">
              <span className="text-2xl sm:text-3xl font-extrabold text-rose-600">{activeAlertCount}</span>
              <p className="text-xs text-slate-500 mt-0.5">Active Critical Alerts</p>
              <span className="text-[10px] text-rose-500 font-medium">1 Leak + 1 Quality Spike</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-sky-700">94.8%</span>
              <p className="text-xs text-slate-500 mt-0.5">Telemetry Reliability</p>
              <span className="text-[10px] text-slate-500 font-medium">Continuous Sampling</span>
            </div>
          </div>
        </div>
      </section>

      {/* Major Groundwater Challenges Section */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100 px-3 py-1 rounded-full">
              The Underground Water Crisis
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Why Traditional Monitoring Fails Today
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Underground water is out of sight and out of mind. Manual dip-tape measurements every 6 months leave water authorities blind to rapid industrial over-extraction, insidious pipeline leaks, and chemical plume migration.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                <TrendingDown className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Uncontrolled Aquifer Depletion</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Unmetered deep agricultural and industrial submersible pumps extract millions of liters without quotas, causing permanent aquifer compaction, land subsidence, and dried-up community wells.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Silent Pipeline Leakage & Loss</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Aging underground municipal transmission mains lose between 20% to 35% of treated drinking water via undetectable subsurface fractures, eroding foundations and wasting energy.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center mb-4">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Subsurface Contamination Plumes</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Nitrates from intensive fertilizer runoff and heavy TDS/pH leachate from unlined industrial pits seep down to deep drinking water aquifers undetected until illness strikes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The AquaGuard Solution: 4 Core Pillars */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-100 px-3 py-1 rounded-full">
              The AquaGuard Solution
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Unified Digital Groundwater Intelligence
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Transforming disjointed manual records into an automated, proactive cyber-physical management platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div
              onClick={() => setCurrentView('monitoring')}
              className="group cursor-pointer rounded-2xl border border-slate-200 bg-slate-50/50 p-6 hover:bg-white hover:border-sky-300 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Gauge className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5 flex items-center justify-between">
                <span>Groundwater Monitoring</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Piezometric depth sensors with automated telemetry transmit water levels, historical drawdown rates, and depletion warnings.
              </p>
            </div>

            {/* Feature 2 */}
            <div
              onClick={() => setCurrentView('quality')}
              className="group cursor-pointer rounded-2xl border border-slate-200 bg-slate-50/50 p-6 hover:bg-white hover:border-emerald-300 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Droplets className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5 flex items-center justify-between">
                <span>Water Quality Sonde</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Continuous pH, turbidity, TDS, electrical conductivity, and nitrate tracking with integrated Water Quality Index (WQI) scoring.
              </p>
            </div>

            {/* Feature 3 */}
            <div
              onClick={() => setCurrentView('leakage')}
              className="group cursor-pointer rounded-2xl border border-slate-200 bg-slate-50/50 p-6 hover:bg-white hover:border-amber-300 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5 flex items-center justify-between">
                <span>Leak & Extraction Detection</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hydraulic mass-balance flow algorithms detect pipeline loss and flag uncharacteristic night-time pumping spikes for rapid field verification.
              </p>
            </div>

            {/* Feature 4 */}
            <div
              onClick={() => setCurrentView('assistant')}
              className="group cursor-pointer rounded-2xl border border-slate-200 bg-slate-50/50 p-6 hover:bg-white hover:border-sky-300 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5 flex items-center justify-between">
                <span>AI AquaGuard Assistant</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Conversational assistant grounded in live station telemetry, recommending targeted recharge pits and compliance action items.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* End-to-End IoT & AI Architecture Flow */}
      <section className="py-16 sm:py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400 bg-sky-950 px-3 py-1 rounded-full border border-sky-800">
              System Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              From Physical Well Sensors to Executive Action
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              AquaGuard closes the loop between raw telemetry signals and prioritized environmental interventions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            <div className="rounded-xl border border-slate-800 bg-slate-800/60 p-5 space-y-2">
              <div className="text-sky-400 font-mono text-xs font-bold">STEP 01</div>
              <h4 className="text-base font-bold text-white">Subsurface IoT Sensing</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ultrasonic depth transducers, multiparameter water quality sondes, and electromagnetic flow meters record continuous readings.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-800/60 p-5 space-y-2">
              <div className="text-teal-400 font-mono text-xs font-bold">STEP 02</div>
              <h4 className="text-base font-bold text-white">Ingestion & Validation</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                LoRaWAN / 4G cellular gateways push payloads into a time-series store with automated boundary range and parity validation.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-800/60 p-5 space-y-2">
              <div className="text-amber-400 font-mono text-xs font-bold">STEP 03</div>
              <h4 className="text-base font-bold text-white">Hydraulic Anomaly Engine</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Mathematical mass-balance and statistical diurnal models cross-reference observed flow and depth against baseline profiles.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-800/60 p-5 space-y-2">
              <div className="text-sky-400 font-mono text-xs font-bold">STEP 04</div>
              <h4 className="text-base font-bold text-white">AI Decision Support</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                AquaGuard AI synthesizes risk patterns into actionable engineering SOPs: valve isolation, recharge pit locations, and health advisories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hackathon Presentation Walkthrough Guide for Judges */}
      <section className="py-16 sm:py-20 bg-sky-50 border-t border-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-sky-200 bg-white p-8 sm:p-10 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100 px-3 py-1 rounded-full">
                  Hackathon Demonstration Workflow
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                  10-Step Interactive Judge Evaluation Path
                </h3>
              </div>
              <button
                onClick={() => setCurrentView('dashboard')}
                className="px-5 py-2.5 rounded-xl font-semibold text-xs bg-sky-700 hover:bg-sky-800 text-white shadow-xs transition-colors shrink-0"
              >
                Begin Walkthrough Now →
              </button>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
              {[
                { step: '1', title: 'Executive Overview', desc: 'Open Dashboard to see 12 stations and 6 key health metrics.', view: 'dashboard' as const },
                { step: '2', title: 'Spatial Basin Map', desc: 'Visit Groundwater Monitoring to explore the watershed GIS layout.', view: 'monitoring' as const },
                { step: '3', title: 'Inspect Critical Station', desc: 'Click ST-104 (Riverside) or ST-105 (Sunset Plains).', view: 'monitoring' as const },
                { step: '4', title: 'Water Quality Sonde', desc: 'Examine pH, TDS, Nitrate spike and the WQI calculation score.', view: 'quality' as const },
                { step: '5', title: 'Pipeline Leak Detection', desc: 'Review the 580 L/min flow deficit on Trunk Line PL-UI-04.', view: 'leakage' as const },
                { step: '6', title: 'Extraction Anomaly', desc: 'Inspect the 470% midnight pumping surge at Station ST-111.', view: 'leakage' as const },
                { step: '7', title: 'Rainfall & Recharge', desc: 'Calculate rainwater harvesting potential and recharge wells.', view: 'recharge' as const },
                { step: '8', title: 'Alert Resolution', desc: 'Acknowledge an active alert and append an investigation note.', view: 'alerts' as const },
                { step: '9', title: 'Ask AquaGuard AI', desc: 'Query the assistant for evidence-based recommendations.', view: 'assistant' as const },
                { step: '10', title: 'Export Audit Report', desc: 'Download CSV and generate print-friendly compliance reports.', view: 'reports' as const },
              ].map((item) => (
                <div
                  key={item.step}
                  onClick={() => setCurrentView(item.view)}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4 hover:border-sky-300 hover:bg-sky-50/50 cursor-pointer transition-all"
                >
                  <div className="flex items-center justify-between text-sky-700 font-bold mb-1">
                    <span>STEP {item.step}</span>
                    <span className="text-[10px] text-slate-500 uppercase">Click</span>
                  </div>
                  <h5 className="font-bold text-slate-900 text-xs mb-1">{item.title}</h5>
                  <p className="text-slate-600 text-[11px] leading-snug">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-16 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Safeguard Underground Water Resources?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Experience the live interactive monitoring dashboard, explore simulated telemetry feeds, and witness how digital intelligence protects our most precious natural capital.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setCurrentView('dashboard')}
              className="px-8 py-3.5 rounded-xl font-bold text-sm bg-sky-500 hover:bg-sky-400 text-white shadow-xl shadow-sky-500/30 transition-all hover:scale-105 cursor-pointer"
            >
              Launch AquaGuard Dashboard
            </button>
            <button
              onClick={() => setCurrentView('assistant')}
              className="px-6 py-3.5 rounded-xl font-bold text-sm bg-slate-800 hover:bg-slate-700 text-sky-200 border border-slate-700 cursor-pointer"
            >
              Chat with AquaGuard AI
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
