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
  MoreHorizontal,
  LayoutDashboard,
  LineChart,
  History,
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
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    {
      id: 'charts',
      label: activeProfile?.type === 'baby' ? 'Curves' : 'Biometrics',
      icon: LineChart,
    },
    { id: 'stages', label: 'Stages & Wishes', icon: Sparkles },
    {
      id: activeProfile?.type === 'fetal' ? 'fetal-hub' : 'milestones',
      label: activeProfile?.type === 'fetal' ? 'Pregnancy' : 'Milestones',
      icon: activeProfile?.type === 'fetal' ? HeartPulse : Check,
    },
    { id: 'logs', label: 'History', icon: History },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full h-14 bg-white/92 dark:bg-stone-900/92 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800/80 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto h-full px-3 sm:px-5 lg:px-8 flex items-center justify-between gap-2">
        {/* Left: Brand & Compact Profile Pill */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2 cursor-pointer text-left hover:opacity-90 transition-opacity"
            title="BaeLove Home"
          >
            <div className="w-8 h-8 rounded-xl bg-linear-to-tr from-emerald-700 via-teal-600 to-amber-600 flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-4 h-4 text-emerald-100" />
            </div>
            <div className="hidden xs:block">
              <span className="font-black text-stone-900 dark:text-white tracking-tight text-sm">
                BaeLove
              </span>
            </div>
          </button>

          {/* Compact Profile Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl border border-stone-200 dark:border-stone-700 hover:border-emerald-400 dark:hover:border-emerald-600 bg-stone-50/90 dark:bg-stone-800/90 text-xs font-semibold text-stone-800 dark:text-stone-200 transition-all shadow-2xs hover:bg-stone-100 dark:hover:bg-stone-700/80"
              title="Switch or manage profiles"
            >
              {activeProfile?.type === 'baby' ? (
                <Baby className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              ) : (
                <HeartPulse className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
              )}
              <span className="max-w-[75px] sm:max-w-[130px] truncate">
                {activeProfile?.name?.split(' ')[0] || 'Child'}
              </span>
              <ChevronDown className="w-3 h-3 text-stone-400 shrink-0" />
            </button>

            {profileDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setProfileDropdownOpen(false)}
                />
                <div className="absolute left-0 mt-2 w-64 bg-white dark:bg-stone-800 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-700 py-2 z-20 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
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
                        className={`w-full px-3.5 py-2 text-left text-xs flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-700/60 transition-colors ${
                          isActive
                            ? 'font-bold text-stone-900 dark:text-white bg-emerald-50/60 dark:bg-emerald-950/40'
                            : 'text-stone-600 dark:text-stone-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          {p.type === 'baby' ? (
                            <Baby className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          ) : (
                            <HeartPulse className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                          )}
                          <span className="truncate">{p.name}</span>
                        </div>
                        {isActive && (
                          <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}

                  <div className="border-t border-stone-100 dark:border-stone-700 my-1.5" />

                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      onOpenProfileModal();
                    }}
                    className="w-full px-3.5 py-2 text-left text-xs text-stone-700 dark:text-stone-200 hover:text-stone-900 dark:hover:text-white hover:bg-stone-50 dark:hover:bg-stone-700/60 flex items-center gap-2 font-medium"
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
                    className="w-full px-3.5 py-2 text-left text-xs text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-700/60 flex items-center gap-2"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-stone-400" />
                    <span>Reset Sample Data</span>
                  </button>

                  <div className="px-3.5 py-1.5 border-t border-stone-100 dark:border-stone-700 text-[10px] text-stone-400 flex items-center justify-between bg-stone-50/50 dark:bg-stone-850/50">
                    <span>🍪 Browser Cookie Storage</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">Active ✓</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Center: Desktop Nav Pills (decluttered, compact, clean) */}
        <nav className="hidden md:flex items-center p-1 bg-stone-100/90 dark:bg-stone-800/90 rounded-2xl border border-stone-200/60 dark:border-stone-700/60 space-x-0.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-2xs font-bold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-stone-700/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-700 dark:text-emerald-400' : 'text-stone-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Decluttered Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Light / Dark Mode Icon Toggle */}
          <button
            onClick={toggleTheme}
            title={`Current: ${theme === 'dark' ? 'Dark' : 'Light'} mode (Defaulted to ${systemOrTimeTheme}). Click to toggle.`}
            className="w-8 h-8 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-700 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
          >
            {theme === 'dark' ? (
              <Moon className="w-4 h-4 text-indigo-400 fill-indigo-400/20" />
            ) : (
              <Sun className="w-4 h-4 text-amber-500 fill-amber-500/20" />
            )}
          </button>

          {/* Quick Clinical Formulas Button */}
          <button
            onClick={onOpenFormulaModal}
            title={`Clinical formulas: ${formulaSettings.fetalEfwFormula} & WHO LMS`}
            className="hidden sm:flex items-center gap-1 px-2.5 h-8 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:text-amber-900 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 transition-colors cursor-pointer shadow-2xs"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span className="text-[11px] hidden lg:inline">Formulas</span>
          </button>

          {/* Quick Medical Report / Print Button */}
          <button
            onClick={onOpenExportModal}
            title="Export clinical report & data backup"
            className="hidden sm:flex items-center gap-1 px-2.5 h-8 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 transition-colors cursor-pointer shadow-2xs"
          >
            <FileText className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" />
            <span className="text-[11px] hidden lg:inline">Report</span>
          </button>

          {/* Lock Portal Button (if protected) */}
          {isPasswordProtected && onLockPortal && (
            <button
              onClick={onLockPortal}
              title="Lock site portal (Requires password to re-enter)"
              className="w-8 h-8 rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-amber-900 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
            >
              <Lock className="w-4 h-4 text-amber-700 dark:text-amber-400" />
            </button>
          )}

          {/* Mobile More Tools Menu button (Formulas & Report on mobile) */}
          <div className="relative sm:hidden">
            <button
              onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
              className="w-8 h-8 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-700 flex items-center justify-center transition-colors shadow-2xs"
              title="More options"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>

            {toolsDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setToolsDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-stone-800 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-700 py-1.5 z-20 animate-in fade-in duration-100">
                  <button
                    onClick={() => {
                      setToolsDropdownOpen(false);
                      onOpenFormulaModal();
                    }}
                    className="w-full px-3 py-2 text-left text-xs text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-700 flex items-center gap-2 font-medium"
                  >
                    <BookOpen className="w-4 h-4 text-amber-600" />
                    <span>Clinical Formulas</span>
                  </button>
                  <button
                    onClick={() => {
                      setToolsDropdownOpen(false);
                      onOpenExportModal();
                    }}
                    className="w-full px-3 py-2 text-left text-xs text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-700 flex items-center gap-2 font-medium"
                  >
                    <FileText className="w-4 h-4 text-emerald-600" />
                    <span>Clinical Report</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
