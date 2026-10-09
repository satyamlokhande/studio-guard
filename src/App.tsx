/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';

// Pages
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { GroundwaterMonitoringPage } from './pages/GroundwaterMonitoringPage';
import { WaterQualityPage } from './pages/WaterQualityPage';
import { LeakageExtractionPage } from './pages/LeakageExtractionPage';
import { RechargeAnalyticsPage } from './pages/RechargeAnalyticsPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { AlertManagementPage } from './pages/AlertManagementPage';
import { ReportsPage } from './pages/ReportsPage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';

const AppContent: React.FC = () => {
  const { currentView } = useApp();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'monitoring':
        return <GroundwaterMonitoringPage />;
      case 'quality':
        return <WaterQualityPage />;
      case 'leakage':
        return <LeakageExtractionPage />;
      case 'recharge':
        return <RechargeAnalyticsPage />;
      case 'assistant':
        return <AIAssistantPage />;
      case 'alerts':
        return <AlertManagementPage />;
      case 'reports':
        return <ReportsPage />;
      case 'about':
        return <AboutPage />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'terms':
        return <TermsPage />;
      default:
        return <DashboardPage />;
    }
  };

  if (currentView === 'landing') {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans antialiased selection:bg-sky-500 selection:text-white">
        <Navbar />
        <main className="flex-1">
          <LandingPage />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/70 text-slate-800 font-sans antialiased selection:bg-sky-500 selection:text-white">
      <Navbar />
      <div className="flex-1 flex min-h-[calc(100vh-100px)]">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <main className="flex-1 overflow-x-hidden min-w-0">
          {renderCurrentView()}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
