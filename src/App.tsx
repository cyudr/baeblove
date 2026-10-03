/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { MobileTabBar } from './components/layout/MobileTabBar';
import { GrowthDashboardView } from './components/views/GrowthDashboardView';
import { StagesAndWishesView } from './components/views/StagesAndWishesView';
import { MilestonesView } from './components/views/MilestonesView';
import { FetalHubView } from './components/views/FetalHubView';
import { HistoryLogsView } from './components/views/HistoryLogsView';
import { InteractiveGrowthChart } from './components/charts/InteractiveGrowthChart';
import { FetalBiometricsChart } from './components/charts/FetalBiometricsChart';
import { LogMeasurementModal } from './components/modals/LogMeasurementModal';
import { ProfileModal } from './components/modals/ProfileModal';
import { ExportReportModal } from './components/modals/ExportReportModal';
import { AddMilestoneModal } from './components/modals/AddMilestoneModal';
import { AddLoveNoteModal } from './components/modals/AddLoveNoteModal';
import { FormulaSourceModal } from './components/modals/FormulaSourceModal';
import { PasswordGate } from './components/auth/PasswordGate';
import {
  isPasswordProtectionEnabled,
  isUserAuthenticated,
  logoutUser,
} from './utils/authConfig';

interface AppContentProps {
  isPasswordProtected: boolean;
  onLockPortal: () => void;
}

function AppContent({ isPasswordProtected, onLockPortal }: AppContentProps) {
  const {
    activeProfile,
    activeBabyMeasurements,
    activeFetalMeasurements,
    unitSystem,
  } = useApp();

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isCustomMilestoneModalOpen, setIsCustomMilestoneModalOpen] = useState(false);
  const [isLoveNoteModalOpen, setIsLoveNoteModalOpen] = useState(false);
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState(false);
  const [loveNoteStageLabel, setLoveNoteStageLabel] = useState('Today');

  // Auto-toggle tabs when profile switches between baby and fetal
  React.useEffect(() => {
    if (!activeProfile) return;
    if (activeProfile.type === 'fetal' && activeTab === 'milestones') {
      setActiveTab('fetal-hub');
    } else if (activeProfile.type === 'baby' && activeTab === 'fetal-hub') {
      setActiveTab('milestones');
    }
  }, [activeProfile?.id, activeProfile?.type]);

  const handleOpenLoveNoteModal = (stageLabel: string) => {
    setLoveNoteStageLabel(stageLabel);
    setIsLoveNoteModalOpen(true);
  };

  const isDashboard = activeTab === 'dashboard';

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col font-sans pb-20 md:pb-12 transition-colors">
      {/* Decluttered Top Navigation (No logging button here) */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        onOpenFormulaModal={() => setIsFormulaModalOpen(true)}
        isPasswordProtected={isPasswordProtected}
        onLockPortal={onLockPortal}
      />

      {/* Main Content Area - naturally scrollable for overview and all tabs */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
        {activeTab === 'dashboard' && (
          <GrowthDashboardView
            onOpenLogModal={() => setIsLogModalOpen(true)}
            onNavigateTab={(tab) => setActiveTab(tab)}
            onOpenFormulaModal={() => setIsFormulaModalOpen(true)}
            onOpenLoveNoteModal={handleOpenLoveNoteModal}
            onOpenCustomMilestoneModal={() => setIsCustomMilestoneModalOpen(true)}
            onOpenExportModal={() => setIsExportModalOpen(true)}
          />
        )}

        {activeTab === 'stages' && (
          <StagesAndWishesView
            onOpenLoveNoteModal={handleOpenLoveNoteModal}
            onOpenFormulaModal={() => setIsFormulaModalOpen(true)}
          />
        )}

        {activeTab === 'charts' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-5 md:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors">
              <div>
                <h2 className="text-xl font-bold text-stone-900 dark:text-white">
                  {activeProfile?.type === 'baby'
                    ? 'WHO Clinical Growth Curve Standards'
                    : 'Fetal Ultrasound Biometric Reference Curves'}
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                  {activeProfile?.type === 'baby'
                    ? 'Multi-parameter percentile analysis (Weight, Length, Head Circumference) calibrated against WHO standards.'
                    : 'Ultrasound biometrics plotted against Hadlock fetal growth distribution curves.'}
                </p>
              </div>

              <button
                onClick={() => setIsFormulaModalOpen(true)}
                className="self-start sm:self-auto px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-200 hover:text-amber-900 dark:hover:text-amber-300 transition-colors flex items-center gap-1.5"
              >
                <span>Formula Math & Sources &rarr;</span>
              </button>
            </div>

            {activeProfile?.type === 'baby' ? (
              <InteractiveGrowthChart
                profile={activeProfile}
                measurements={activeBabyMeasurements}
                unitSystem={unitSystem}
                onOpenFormulaModal={() => setIsFormulaModalOpen(true)}
              />
            ) : (
              <FetalBiometricsChart
                profile={activeProfile!}
                measurements={activeFetalMeasurements}
                unitSystem={unitSystem}
                onOpenFormulaModal={() => setIsFormulaModalOpen(true)}
              />
            )}
          </div>
        )}

        {activeTab === 'milestones' && (
          <MilestonesView
            onOpenCustomMilestoneModal={() => setIsCustomMilestoneModalOpen(true)}
          />
        )}

        {activeTab === 'fetal-hub' && (
          <FetalHubView
            onOpenLogModal={() => setIsLogModalOpen(true)}
            onOpenFormulaModal={() => setIsFormulaModalOpen(true)}
          />
        )}

        {activeTab === 'logs' && (
          <HistoryLogsView
            onOpenLogModal={() => setIsLogModalOpen(true)}
            onOpenExportModal={() => setIsExportModalOpen(true)}
          />
        )}
      </main>

      {/* Mobile Bottom Tab Bar */}
      <MobileTabBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Modals */}
      <LogMeasurementModal
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
        onOpenFormulaModal={() => setIsFormulaModalOpen(true)}
      />

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />

      <ExportReportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />

      <AddMilestoneModal
        isOpen={isCustomMilestoneModalOpen}
        onClose={() => setIsCustomMilestoneModalOpen(false)}
      />

      <AddLoveNoteModal
        isOpen={isLoveNoteModalOpen}
        onClose={() => setIsLoveNoteModalOpen(false)}
        defaultStageLabel={loveNoteStageLabel}
      />

      <FormulaSourceModal
        isOpen={isFormulaModalOpen}
        onClose={() => setIsFormulaModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  const isProtected = isPasswordProtectionEnabled();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => isUserAuthenticated());

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
  };

  const handleLockPortal = () => {
    logoutUser();
    setIsAuthenticated(false);
  };

  if (isProtected && !isAuthenticated) {
    return <PasswordGate onAuthenticated={handleAuthenticated} />;
  }

  return (
    <AppProvider>
      <AppContent
        isPasswordProtected={isProtected}
        onLockPortal={handleLockPortal}
      />
    </AppProvider>
  );
}
