import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Baby,
  HeartPulse,
  Plus,
  FileText,
  ChevronDown,
  RotateCcw,
  Sparkles,
  Check,
  BookOpen,
  Sun,
  Moon,
  Lock,
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenProfileModal: () => void;
  onOpenExportModal: () => void;
  onOpenFormulaModal: () => void;
  isPasswordProtected?: boolean;
  onLockPortal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenProfileModal,
  onOpenExportModal,
  onOpenFormulaModal,
  isPasswordProtected = false,
  onLockPortal,
}) => {
  const {
    profiles,
    activeProfileId,
    activeProfile,
    setActiveProfileId,
    resetToSampleData,
    formulaSettings,
    theme,
    toggleTheme,
    systemOrTimeTheme,
  } = useApp();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Overview' },
    { id: 'stages', label: activeProfile?.type === 'baby' ? '✨ Stages & Wishes' : '✨ Week Stages & Wishes' },
    { id: 'charts', label: activeProfile?.type === 'baby' ? 'WHO Growth Curves' : 'Ultrasound Biometrics' },
    { id: 'milestones', label: 'Milestones' },
    ...(activeProfile?.type === 'fetal' ? [{ id: 'fetal-hub', label: 'Pregnancy & Kicks' }] : []),
    { id: 'logs', label: 'Measurement Logs' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Brand & Child Selector */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-800 dark:bg-emerald-700 flex items-center justify-center text-white shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-stone-900 dark:text-white tracking-tight text-xs sm:text-sm">Sprout & Bloom</span>
              </div>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600 bg-stone-50/80 dark:bg-stone-800 text-xs font-semibold text-stone-800 dark:text-stone-200 transition-colors"
              >
                {activeProfile?.type === 'baby' ? (
                  <Baby className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                ) : (
                  <HeartPulse className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                )}
                <span className="max-w-[100px] sm:max-w-[140px] truncate">{activeProfile?.name || 'Select Child'}</span>
                <ChevronDown className="w-3 h-3 text-stone-400" />
              </button>

              {profileDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setProfileDropdownOpen(false)}
                  ></div>
                  <div className="absolute left-0 mt-1.5 w-60 bg-white dark:bg-stone-800 rounded-xl shadow-lg border border-stone-200 dark:border-stone-700 py-1.5 z-20">
                    <div className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                      Switch Profile
                    </div>
                    {profiles.map((p) => {
                      const isActive = p.id === activeProfileId;
                      return (
                        <button
                          key={p.id}
                          onClick={() => {
                            setActiveProfileId(p.id);
                            setProfileDropdownOpen(false);
                          }}
                          className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-700/60 transition-colors ${
                            isActive ? 'font-semibold text-stone-900 dark:text-white bg-stone-50 dark:bg-stone-700/40' : 'text-stone-600 dark:text-stone-300'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            {p.type === 'baby' ? (
                              <Baby className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 shrink-0" />
                            ) : (
                              <HeartPulse className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 shrink-0" />
                            )}
                            <span className="truncate">{p.name}</span>
                          </div>
                          {isActive && <Check className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 shrink-0" />}
                        </button>
                      );
                    })}

                    <div className="border-t border-stone-100 dark:border-stone-700 my-1"></div>

                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onOpenProfileModal();
                      }}
                      className="w-full px-3 py-2 text-left text-xs text-stone-700 dark:text-stone-200 hover:text-stone-900 dark:hover:text-white hover:bg-stone-50 dark:hover:bg-stone-700/60 flex items-center gap-2 font-medium"
                    >
                      <Plus className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" />
                      <span>Add New Profile</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm('Reset to standard sample data (Liam 9m + Fetal 28w)?')) {
                          resetToSampleData();
                          setProfileDropdownOpen(false);
                        }
                      }}
                      className="w-full px-3 py-2 text-left text-xs text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-700/60 flex items-center gap-2"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-stone-400" />
                      <span>Reset Sample Data</span>
                    </button>

                    <div className="px-3 py-1.5 border-t border-stone-100 dark:border-stone-700 text-[10px] text-stone-400 flex items-center justify-between bg-stone-50/50 dark:bg-stone-850/50">
                      <span>🍪 Browser Cookie Storage</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">Active ✓</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'text-stone-900 dark:text-white font-bold bg-stone-100 dark:bg-stone-800'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-50 dark:hover:bg-stone-800/60'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Decluttered Right Controls: Light/Dark Theme Toggle, Formulas, Report */}
          <div className="flex items-center gap-2">
            {/* Light / Dark Theme Toggle (Auto-detects daytime vs nighttime) */}
            <button
              onClick={toggleTheme}
              title={`Theme: ${theme === 'dark' ? 'Dark' : 'Light'} mode (Defaulted to ${systemOrTimeTheme} based on local time). Click to toggle.`}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors shadow-2xs"
            >
              {theme === 'dark' ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400/20" />
                  <span className="text-[11px]">Dark</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
                  <span className="text-[11px]">Light</span>
                </>
              )}
            </button>

            {/* Formulas / Clinical Standards Button */}
            <button
              onClick={onOpenFormulaModal}
              title="Clinical data formulas & citations"
              className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-stone-700 dark:text-stone-300 hover:text-amber-900 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
              <span className="hidden lg:inline text-[11px]">Formulas</span>
              <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase bg-amber-100 dark:bg-amber-950/70 px-1 py-0.2 rounded">
                {formulaSettings.fetalEfwFormula}
              </span>
            </button>

            {/* Export / Print Button */}
            <button
              onClick={onOpenExportModal}
              title="Clinical report & JSON backup"
              className="hidden sm:flex items-center gap-1 px-2 py-1 text-xs font-medium text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" />
              <span className="text-[11px]">Report</span>
            </button>

            {/* Lock Site Button (Visible when password protection is active) */}
            {isPasswordProtected && onLockPortal && (
              <button
                onClick={onLockPortal}
                title="Lock Site (Password Required to Re-enter)"
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-amber-900 transition-colors shadow-2xs cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                <span className="hidden sm:inline text-[11px]">Lock</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
