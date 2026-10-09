import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AppView } from '../../types';
import {
  Droplets,
  Shield,
  Activity,
  Bell,
  Menu,
  X,
  RefreshCw,
  Sparkles,
  LayoutDashboard,
  MapPin,
  FlaskConical,
  GitBranch,
  CloudRain,
  Bot,
  AlertTriangle,
  FileText,
  Info,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    isDemoMode,
    setIsDemoMode,
    activeAlertCount,
    criticalAlertCount,
    refreshData,
    lastSimulatedTick,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    refreshData();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const navItems: { view: AppView; label: string; icon: React.ElementType; badge?: number }[] = [
    { view: 'landing', label: 'Home', icon: Droplets },
    { view: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { view: 'monitoring', label: 'Monitoring', icon: MapPin },
    { view: 'quality', label: 'Water Quality', icon: FlaskConical },
    { view: 'leakage', label: 'Leak & Extraction', icon: GitBranch },
    { view: 'recharge', label: 'Recharge', icon: CloudRain },
    { view: 'assistant', label: 'AquaGuard AI', icon: Bot },
    { view: 'alerts', label: 'Alerts', icon: AlertTriangle, badge: activeAlertCount },
    { view: 'reports', label: 'Reports', icon: FileText },
    { view: 'about', label: 'About', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      {/* Top Telemetry Ticker Strip */}
      <div className="bg-slate-900 px-4 py-1.5 text-xs text-slate-300 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-medium text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            {isDemoMode ? 'Simulated Telemetry Stream' : 'Live IoT Gateway Connected'}
          </span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:inline text-slate-400">
            Updated: {lastSimulatedTick.toLocaleTimeString()}
          </span>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:inline text-slate-400">
            12 Stations Monitored across Green Valley Basin
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Demo Mode Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 hidden xs:inline">Mode:</span>
            <button
              onClick={() => setIsDemoMode(!isDemoMode)}
              className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium transition-colors ${
                isDemoMode
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-400/30'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
              }`}
              title="Toggle Demo Mode vs Connected Sensor Stream"
            >
              <span>{isDemoMode ? 'Demo Mode' : 'Connected Sensor'}</span>
            </button>
          </div>

          {/* Quick Refresh Button */}
          <button
            onClick={handleRefresh}
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
            title="Trigger Telemetry Refresh Cycle"
          >
            <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin text-sky-400' : ''}`} />
            <span className="hidden sm:inline">Tick</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <button
            onClick={() => setCurrentView('landing')}
            className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-sky-700 text-white shadow-xs group-hover:scale-105 transition-transform">
              <Droplets className="w-5 h-5 text-sky-200 fill-sky-200/40" />
              <Shield className="w-4 h-4 text-white absolute -bottom-1 -right-1" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-slate-900">
                  AquaGuard
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-sm bg-sky-100 text-sky-800 border border-sky-200">
                  AI IoT
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium -mt-0.5 hidden xs:block">
                Groundwater Management System
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => setCurrentView(item.view)}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-sky-50 text-sky-900 shadow-xs border border-sky-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-sky-600' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                        criticalAlertCount > 0 ? 'bg-rose-500 text-white' : 'bg-amber-500 text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Alert Center Pill */}
            <button
              onClick={() => setCurrentView('alerts')}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                activeAlertCount > 0
                  ? 'border-amber-200 bg-amber-50 text-amber-900 hover:bg-amber-100'
                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
              title="Active Alerts"
            >
              <Bell className="w-4 h-4 text-amber-600" />
              <span className="hidden sm:inline font-semibold">Alerts</span>
              {activeAlertCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-rose-600 text-white">
                  {activeAlertCount}
                </span>
              )}
            </button>

            {/* Launch Dashboard Button (if on landing or other pages) */}
            {currentView !== 'dashboard' && (
              <button
                onClick={() => setCurrentView('dashboard')}
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-700 hover:bg-sky-800 text-white shadow-xs transition-colors"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Open Dashboard</span>
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-5 space-y-1 shadow-lg">
          <div className="grid grid-cols-2 gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => {
                    setCurrentView(item.view);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between p-2.5 rounded-lg text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-sky-50 text-sky-900 border border-sky-200'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-sky-600' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-600 text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span>Simulation State:</span>
            <span className="font-semibold text-sky-700">
              {isDemoMode ? 'Demo Mode Active' : 'Live Connected Sensor'}
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
