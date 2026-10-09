import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import { Alert, AlertCategory, AlertSeverity, AlertStatus } from '../types';
import {
  AlertTriangle,
  AlertOctagon,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  MapPin,
  FileText,
  UserCheck,
  Send,
  MessageSquare,
  X,
  Shield,
  Layers,
  ArrowRight,
} from 'lucide-react';

export const AlertManagementPage: React.FC = () => {
  const { alerts, acknowledgeAlert, resolveAlert, addAlertNote, navigateToStation } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Selected Alert for Detailed Inspector Modal / Slide-over
  const [selectedAlertId, setSelectedAlertId] = useState<string>(alerts[0]?.id || '');
  const [noteInput, setNoteInput] = useState('');
  const [authorName, setAuthorName] = useState('Hydro-Tech Specialist');

  const selectedAlert = alerts.find((a) => a.id === selectedAlertId) || alerts[0] || null;

  const filteredAlerts = alerts.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.stationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === 'all' ||
      a.category === categoryFilter ||
      (categoryFilter === 'pipeline_leak' && (a.category as string).includes('leak'));

    const matchesSeverity = severityFilter === 'all' || a.severity === severityFilter;
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;

    return matchesSearch && matchesCategory && matchesSeverity && matchesStatus;
  });

  const handleAddNote = () => {
    if (!selectedAlert || !noteInput.trim()) return;
    addAlertNote(selectedAlert.id, noteInput.trim(), authorName);
    setNoteInput('');
  };

  const handleAcknowledge = (id: string) => {
    acknowledgeAlert(id, 'Alert acknowledged by dispatch operations.');
  };

  const handleResolve = (id: string) => {
    resolveAlert(id, 'Site inspection completed and mitigation protocol executed.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <AlertTriangle className="w-7 h-7 text-rose-600" />
            <span>Alert Dispatch & Emergency Response Center</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time incident dispatch, telemetry verification, and standard operating procedure (SOP) audit logs.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-lg text-xs font-bold bg-rose-50 text-rose-800 border border-rose-200">
            {alerts.filter((a) => a.status === 'active').length} Active
          </span>
          <span className="px-3 py-1 rounded-lg text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
            {alerts.filter((a) => a.status === 'acknowledged').length} Acknowledged
          </span>
          <span className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
            {alerts.filter((a) => a.status === 'resolved').length} Resolved
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Search Box */}
          <div className="relative md:col-span-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search alert title, code, station..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active Incidents</option>
              <option value="acknowledged">Acknowledged</option>
              <option value="resolved">Resolved / Closed</option>
            </select>
          </div>

          {/* Severity Filter */}
          <div>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="warning">Warning</option>
              <option value="info">Informational</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700"
            >
              <option value="all">All Categories</option>
              <option value="critical_leak">Pipeline Leakage</option>
              <option value="water_quality">Water Quality Anomaly</option>
              <option value="level_decline">Groundwater Level Decline</option>
              <option value="unusual_extraction">Extraction Surge Anomaly</option>
              <option value="sensor_offline">Sensor Telemetry Offline</option>
              <option value="environmental_risk">Saline Ingress / Envir. Risk</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Two-Column View: Alert List + Selected Alert Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Alert Feed */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 px-1">
            <span>Incident Queue ({filteredAlerts.length})</span>
            <span>Sorted by Recent</span>
          </div>

          <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
            {filteredAlerts.map((alert) => {
              const isSelected = selectedAlert?.id === alert.id;
              return (
                <div
                  key={alert.id}
                  onClick={() => setSelectedAlertId(alert.id)}
                  className={`rounded-xl border p-4 transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? 'border-sky-500 bg-sky-50/50 shadow-xs ring-1 ring-sky-500'
                      : alert.status === 'active' && alert.severity === 'critical'
                      ? 'border-rose-200 bg-white hover:border-rose-300'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded-sm">
                        {alert.code}
                      </span>
                      <Badge status={alert.severity} size="sm" />
                    </div>
                    <Badge status={alert.status} size="sm" />
                  </div>

                  <h3 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">
                    {alert.title}
                  </h3>

                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                    {alert.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span className="truncate max-w-[140px]">{alert.stationName}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{alert.createdAt}</span>
                    </span>
                  </div>
                </div>
              );
            })}

            {filteredAlerts.length === 0 && (
              <div className="p-10 text-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-slate-500 text-xs">
                No alerts match the selected criteria.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Selected Alert Detailed Dossier */}
        {selectedAlert ? (
          <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
            {/* Top Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold bg-slate-100 px-2.5 py-0.5 rounded-sm text-slate-900">
                    {selectedAlert.code}
                  </span>
                  <Badge status={selectedAlert.severity} size="md" />
                  <Badge status={selectedAlert.status} size="md" />
                </div>
                <h2 className="text-lg font-bold text-slate-900 mt-2">{selectedAlert.title}</h2>
                <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>
                    {selectedAlert.stationName} ({selectedAlert.zone}) • Logged at {selectedAlert.createdAt}
                  </span>
                </p>
              </div>

              {/* Status Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                {selectedAlert.status === 'active' && (
                  <button
                    onClick={() => handleAcknowledge(selectedAlert.id)}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Acknowledge</span>
                  </button>
                )}
                {selectedAlert.status !== 'resolved' && (
                  <button
                    onClick={() => handleResolve(selectedAlert.id)}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark Resolved</span>
                  </button>
                )}
              </div>
            </div>

            {/* Incident Description */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Incident Description & Telemetry Context:
              </span>
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                {selectedAlert.description}
              </p>
            </div>

            {/* Relevant Telemetry Snapshot Metrics */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Triggering Sensor Telemetry Values:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {selectedAlert.relevantReadings.map((reading, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs"
                  >
                    <span className="text-slate-500 block text-[11px]">{reading.parameter}</span>
                    <strong className="text-sm font-extrabold text-slate-900 mt-0.5 block">
                      {reading.value}
                    </strong>
                    <span className="text-[10px] text-rose-600 font-medium">
                      Standard: {reading.threshold}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Standard Operating Procedure (SOP) Suggested Action */}
            <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-4 space-y-1.5 text-xs">
              <span className="font-bold text-sky-950 flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-sky-700" />
                <span>Recommended Standard Operating Procedure (SOP):</span>
              </span>
              <p className="text-sky-950 leading-relaxed">{selectedAlert.suggestedAction}</p>
            </div>

            {/* Investigation Notes & Audit Trail */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                  <span>Investigation Audit Trail ({selectedAlert.investigationNotes.length})</span>
                </span>
                <button
                  onClick={() => navigateToStation(selectedAlert.stationId, 'monitoring')}
                  className="text-xs text-sky-700 hover:text-sky-900 font-semibold flex items-center gap-1"
                >
                  <span>Go to Station Piezometer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Notes list */}
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {selectedAlert.investigationNotes.map((note) => (
                  <div
                    key={note.id}
                    className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <strong className="text-slate-800 font-semibold">{note.author}</strong>
                      <span>{note.timestamp}</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">{note.note}</p>
                  </div>
                ))}

                {selectedAlert.investigationNotes.length === 0 && (
                  <p className="text-slate-400 text-xs italic py-2">
                    No field notes recorded yet. Add an on-site finding below.
                  </p>
                )}
              </div>

              {/* Add Note Input Box */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <input
                  type="text"
                  placeholder="Author / Specialist name"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full sm:w-44 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-800"
                />
                <input
                  type="text"
                  placeholder="Append field investigation finding or repair action..."
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddNote();
                  }}
                  className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
                <button
                  onClick={handleAddNote}
                  disabled={!noteInput.trim()}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors disabled:opacity-40 cursor-pointer flex items-center justify-center gap-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Add Note</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-7 p-12 text-center rounded-2xl border border-slate-200 bg-white text-slate-400 text-xs">
            Select an alert from the left column to inspect telemetry dossier and record field audit notes.
          </div>
        )}
      </div>
    </div>
  );
};
