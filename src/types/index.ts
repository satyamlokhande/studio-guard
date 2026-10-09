export type StationStatus = 'normal' | 'warning' | 'critical' | 'offline';

export type AlertSeverity = 'critical' | 'warning' | 'info';

export type AlertCategory =
  | 'level_decline'
  | 'water_quality'
  | 'pipeline_leak'
  | 'unusual_extraction'
  | 'sensor_offline'
  | 'environmental_risk';

export type AlertStatus = 'active' | 'acknowledged' | 'resolved';

export interface MonitoringStation {
  id: string;
  code: string;
  name: string;
  location: string;
  zone: 'North Basin' | 'East Agricultural Belt' | 'Urban Industrial Zone' | 'South Watershed' | 'West Foothills';
  latitude: number;
  longitude: number;
  mapX: number; // 0-100% for SVG map
  mapY: number; // 0-100% for SVG map
  stationType: 'Deep Borewell' | 'Piezometer' | 'Open Well' | 'Recharge Shaft' | 'Industrial Sensor Well';
  depthMeters: number;
  currentLevelMeters: number; // meters below ground level (mbgl)
  baselineLevelMeters: number;
  criticalThresholdMeters: number;
  warningThresholdMeters: number;
  status: StationStatus;
  aquiferType: 'Unconfined Alluvial' | 'Confined Sandstone' | 'Fissured Hard Rock' | 'Karst Limestone';
  soilType: 'Sandy Loam' | 'Clayey Silt' | 'Alluvium Gravel' | 'Porous Basalt';
  sensorHealth: 'Optimal' | 'Degraded' | 'Offline' | 'Calibrating';
  batteryPct: number;
  lastReadingTime: string;
  telemetryType: 'LoRaWAN IoT' | '4G/5G Cellular' | 'Satellite Telemetry';
  dailyExtractionEstimateM3: number;
  recentTrends: number[]; // recent 7 readings
}

export interface GroundwaterReading {
  id: string;
  stationId: string;
  waterLevel: number; // meters below ground level
  readingTime: string;
  dataSource: 'IoT Ultrasonic Transducer' | 'Pressure Probe' | 'Simulated Demonstration';
  temperatureC: number;
  batteryVoltage: number;
}

export interface WaterQualityReading {
  id: string;
  stationId: string;
  readingTime: string;
  dataSource: 'Multi-parameter Sonde' | 'Field Spectrometer' | 'Simulated Demonstration';
  ph: number; // Standard: 6.5 - 8.5
  turbidityNtu: number; // Safe: < 5.0 NTU
  tdsMgL: number; // Total Dissolved Solids Safe: < 500 mg/L (Warning > 1000)
  conductivityUsCm: number; // Safe: < 1000 uS/cm
  temperatureC: number; // Typical: 18 - 25 C
  nitrateMgL: number; // Safe: < 45 mg/L (or < 10 mg/L N)
  dissolvedOxygenMgL: number; // Safe: > 4.0 mg/L
  wqiScore: number; // Water Quality Index (0 - 100)
  status: 'Good' | 'Fair' | 'Poor' | 'Critical';
}

export interface PipelineFlowReading {
  id: string;
  pipelineId: string;
  pipelineName: string;
  zone: string;
  upstreamStationId: string;
  downstreamStationId: string;
  expectedFlowLpm: number; // Liters per minute
  observedFlowLpm: number;
  flowImbalanceLpm: number;
  imbalancePct: number;
  upstreamPressureBar: number;
  downstreamPressureBar: number;
  pressureDeltaBar: number;
  readingTime: string;
  status: 'normal' | 'suspected_leak' | 'critical_leak';
  alertSeverity: 'normal' | 'warning' | 'critical';
  recommendedAction: string;
  pipeMaterial: 'Ductile Iron' | 'HDPE' | 'PVC' | 'Reinforced Concrete';
  diameterMm: number;
}

export interface ExtractionAnomaly {
  id: string;
  stationId: string;
  stationName: string;
  zone: string;
  readingTime: string;
  expectedRateM3h: number; // cubic meters per hour
  observedRateM3h: number;
  deltaPct: number;
  severity: 'low' | 'moderate' | 'high';
  timeSlot: 'Night (01:00-05:00)' | 'Morning Peak (06:00-10:00)' | 'Day (11:00-17:00)' | 'Evening (18:00-22:00)';
  suspectedCause: string;
  recommendedInvestigation: string;
  disclaimer: string;
}

export interface Alert {
  id: string;
  code: string;
  category: AlertCategory;
  stationId: string;
  stationName: string;
  zone: string;
  severity: AlertSeverity;
  title: string;
  description: string;
  createdAt: string;
  status: AlertStatus;
  relevantReadings: {
    parameter: string;
    value: string;
    threshold: string;
  }[];
  suggestedAction: string;
  investigationNotes: {
    id: string;
    author: string;
    timestamp: string;
    note: string;
  }[];
  acknowledgedAt?: string;
  resolvedAt?: string;
}

export interface RainfallRecord {
  date: string;
  month: string;
  rainfallMm: number;
  normalRainfallMm: number;
  avgWaterLevelMbgl: number;
  estimatedRechargeM3: number;
  rechargeEfficiencyPct: number;
}

export interface ConservationRecommendation {
  id: string;
  title: string;
  category: 'Rainwater Harvesting' | 'Recharge Wells' | 'Watershed Restoration' | 'Extraction Quota' | 'Leakage Repair';
  priority: 'High' | 'Medium' | 'Low';
  targetZone: string;
  affectedStationIds: string[];
  description: string;
  evidence: string;
  suggestedSteps: string[];
  estimatedCostBenefit: string;
}

export type AppView =
  | 'landing'
  | 'dashboard'
  | 'monitoring'
  | 'quality'
  | 'leakage'
  | 'recharge'
  | 'assistant'
  | 'alerts'
  | 'reports'
  | 'about'
  | 'privacy'
  | 'terms';
