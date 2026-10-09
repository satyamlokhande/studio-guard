import React from 'react';
import { useApp } from '../../context/AppContext';
import { AppView } from '../../types';
import {
  LayoutDashboard,
  MapPin,
  FlaskConical,
  GitBranch,
  CloudRain,
  Bot,
  AlertTriangle,
  FileText,
  Info,
  Droplets,
  ChevronLeft,
  ChevronRight,
  Shield,
  Activity,
  Layers,
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggleCollapse }) => {
  const { currentView, setCurrentView, activeAlertCount, criticalAlertCount } = useApp();

  const links: { view: AppView; label: string; icon: React.ElementType; badge?: number }[] = [
    { view: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { view: 'monitoring', label: 'Well Monitoring', icon: MapPin },
    { view: 'quality', label: 'Water Quality', icon: FlaskConical },
    { view: 'leakage', label: 'Leak & Extraction', icon: GitBranch },
    { view: 'recharge', label: 'Recharge & Rain', icon: CloudRain },
    { view: 'assistant', label: 'AquaGuard AI', icon: Bot },
    { view: 'alerts', label: 'Alert Center', icon: AlertTriangle, badge: activeAlertCount },
    { view: 'reports', label: 'Data Reports', icon: FileText },
    { view: 'about', label: 'Architecture & Info', icon: Info },
  ];

  return (
    <aside
      className={`hidden lg:flex flex-col justify-between border-r border-slate-200/80 bg-white transition-all duration-300 select-none ${
        collapsed ? 'w-16' : 'w-60'
      }`}
    >
      <div className="p-3 space-y-4">
        {/* Collapse toggle */}
        <div className="flex items-center justify-between px-2 pt-1">
          {!collapsed && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Operations
            </span>
          )}
          <button
            onClick={onToggleCollapse}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors ml-auto"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Links */}
        <nav className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = currentView === link.view;

            return (
              <button
                key={link.view}
                onClick={() => setCurrentView(link.view)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-sky-50 text-sky-900 border border-sky-200/80 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
                title={collapsed ? link.label : undefined}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? 'text-sky-700' : 'text-slate-500'
                  }`}
                />
                {!collapsed && <span className="truncate">{link.label}</span>}
                {!collapsed && link.badge !== undefined && link.badge > 0 && (
                  <span
                    className={`ml-auto px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      criticalAlertCount > 0 ? 'bg-rose-600 text-white' : 'bg-amber-600 text-white'
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Mini Status & Legal */}
      {!collapsed && (
        <div className="p-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-2 bg-slate-50/50">
          <div className="flex items-center gap-1.5 font-semibold text-slate-700">
            <Shield className="w-3.5 h-3.5 text-sky-600" />
            <span>Green Valley Basin</span>
          </div>
          <p className="text-[10px] leading-snug text-slate-400">
            Watershed Hydrology v4.2 Demo
          </p>
          <div className="flex items-center gap-2 pt-1 border-t border-slate-200/60 text-[10px] text-slate-500">
            <button
              onClick={() => setCurrentView('privacy')}
              className={`hover:text-slate-900 ${currentView === 'privacy' ? 'font-bold text-sky-800' : ''}`}
            >
              Privacy
            </button>
            <span>•</span>
            <button
              onClick={() => setCurrentView('terms')}
              className={`hover:text-slate-900 ${currentView === 'terms' ? 'font-bold text-sky-800' : ''}`}
            >
              Terms
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};
