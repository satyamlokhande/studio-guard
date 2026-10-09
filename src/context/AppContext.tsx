import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AppView,
  MonitoringStation,
  Alert,
  WaterQualityReading,
  PipelineFlowReading,
  ExtractionAnomaly,
  RainfallRecord,
  ConservationRecommendation,
} from '../types';
import {
  INITIAL_STATIONS,
  INITIAL_ALERTS,
  MOCK_WATER_QUALITY,
  PIPELINE_FLOW_READINGS,
  EXTRACTION_ANOMALIES,
  RAINFALL_RECORDS,
  CONSERVATION_RECOMMENDATIONS,
} from '../data/mockData';

interface AppContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  isDemoMode: boolean;
  setIsDemoMode: (val: boolean) => void;
  selectedStationId: string;
  setSelectedStationId: (id: string) => void;
  stations: MonitoringStation[];
  alerts: Alert[];
  waterQualityMap: Record<string, WaterQualityReading>;
  pipelineFlows: PipelineFlowReading[];
  extractionAnomalies: ExtractionAnomaly[];
  rainfallRecords: RainfallRecord[];
  recommendations: ConservationRecommendation[];
  lastSimulatedTick: Date;
  refreshData: () => void;
  acknowledgeAlert: (alertId: string, noteText?: string) => void;
  resolveAlert: (alertId: string, noteText?: string) => void;
  addAlertNote: (alertId: string, noteText: string, author?: string) => void;
  navigateToStation: (stationId: string, targetView?: AppView) => void;
  selectedStation: MonitoringStation | undefined;
  activeAlertCount: number;
  criticalAlertCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_ALERTS_KEY = 'aquaguard_alerts_v1';
const STORAGE_STATIONS_KEY = 'aquaguard_stations_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);
  const [selectedStationId, setSelectedStationId] = useState<string>('st-101');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lastSimulatedTick, setLastSimulatedTick] = useState<Date>(new Date());

  // Load persisted alerts or fall back to default
  const [alerts, setAlerts] = useState<Alert[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ALERTS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_ALERTS;
  });

  // Load stations
  const [stations, setStations] = useState<MonitoringStation[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_STATIONS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_STATIONS;
  });

  const [waterQualityMap] = useState<Record<string, WaterQualityReading>>(MOCK_WATER_QUALITY);
  const [pipelineFlows] = useState<PipelineFlowReading[]>(PIPELINE_FLOW_READINGS);
  const [extractionAnomalies] = useState<ExtractionAnomaly[]>(EXTRACTION_ANOMALIES);
  const [rainfallRecords] = useState<RainfallRecord[]>(RAINFALL_RECORDS);
  const [recommendations] = useState<ConservationRecommendation[]>(CONSERVATION_RECOMMENDATIONS);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_ALERTS_KEY, JSON.stringify(alerts));
    } catch {
      // ignore
    }
  }, [alerts]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_STATIONS_KEY, JSON.stringify(stations));
    } catch {
      // ignore
    }
  }, [stations]);

  // Periodic telemetry heartbeat in demo mode (every 45s or on manual refresh)
  useEffect(() => {
    const timer = setInterval(() => {
      setLastSimulatedTick(new Date());
    }, 45000);
    return () => clearInterval(timer);
  }, []);

  const refreshData = () => {
    setLastSimulatedTick(new Date());
    // Apply realistic micro-fluctuation to simulated sensor readings (±0.05m)
    setStations((prev) =>
      prev.map((s) => {
        if (s.status === 'offline') return s;
        const delta = (Math.random() - 0.5) * 0.08;
        const newLevel = Number(Math.max(4, s.currentLevelMeters + delta).toFixed(2));
        const updatedTrends = [...s.recentTrends.slice(1), newLevel];
        return {
          ...s,
          currentLevelMeters: newLevel,
          recentTrends: updatedTrends,
          lastReadingTime: 'Just now',
        };
      })
    );
  };

  const acknowledgeAlert = (alertId: string, noteText?: string) => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setAlerts((prev) =>
      prev.map((a) => {
        if (a.id !== alertId) return a;
        const updatedNotes = [...a.investigationNotes];
        if (noteText && noteText.trim()) {
          updatedNotes.push({
            id: 'note-' + Date.now(),
            author: 'Operations Staff',
            timestamp: now,
            note: noteText.trim(),
          });
        }
        return {
          ...a,
          status: 'acknowledged',
          acknowledgedAt: `Today, ${now}`,
          investigationNotes: updatedNotes,
        };
      })
    );
  };

  const resolveAlert = (alertId: string, noteText?: string) => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setAlerts((prev) =>
      prev.map((a) => {
        if (a.id !== alertId) return a;
        const updatedNotes = [...a.investigationNotes];
        if (noteText && noteText.trim()) {
          updatedNotes.push({
            id: 'note-' + Date.now(),
            author: 'Operations Staff',
            timestamp: now,
            note: noteText.trim(),
          });
        }
        return {
          ...a,
          status: 'resolved',
          resolvedAt: `Today, ${now}`,
          investigationNotes: updatedNotes,
        };
      })
    );
  };

  const addAlertNote = (alertId: string, noteText: string, author: string = 'Investigator') => {
    if (!noteText.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setAlerts((prev) =>
      prev.map((a) => {
        if (a.id !== alertId) return a;
        return {
          ...a,
          investigationNotes: [
            ...a.investigationNotes,
            {
              id: 'note-' + Date.now(),
              author,
              timestamp: now,
              note: noteText.trim(),
            },
          ],
        };
      })
    );
  };

  const navigateToStation = (stationId: string, targetView: AppView = 'monitoring') => {
    setSelectedStationId(stationId);
    setCurrentView(targetView);
  };

  const selectedStation = stations.find((s) => s.id === selectedStationId) || stations[0];
  const activeAlertCount = alerts.filter((a) => a.status === 'active').length;
  const criticalAlertCount = alerts.filter((a) => a.status === 'active' && a.severity === 'critical').length;

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        isDemoMode,
        setIsDemoMode,
        selectedStationId,
        setSelectedStationId,
        stations,
        alerts,
        waterQualityMap,
        pipelineFlows,
        extractionAnomalies,
        rainfallRecords,
        recommendations,
        lastSimulatedTick,
        refreshData,
        acknowledgeAlert,
        resolveAlert,
        addAlertNote,
        navigateToStation,
        selectedStation,
        activeAlertCount,
        criticalAlertCount,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
