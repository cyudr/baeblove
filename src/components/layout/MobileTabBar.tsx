import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Sparkles,
  LineChart,
  CheckSquare,
  HeartPulse,
  ClipboardList,
} from 'lucide-react';

interface MobileTabBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const MobileTabBar: React.FC<MobileTabBarProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const { activeProfile } = useApp();

  const tabs = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'stages', label: 'Stages', icon: Sparkles },
    { id: 'charts', label: 'Growth', icon: LineChart },
    { id: 'milestones', label: 'Milestones', icon: CheckSquare },
    ...(activeProfile?.type === 'fetal'
      ? [{ id: 'fetal-hub', label: 'Pregnancy', icon: HeartPulse }]
      : [{ id: 'logs', label: 'History', icon: ClipboardList }]),
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-t border-stone-200 dark:border-stone-800 pb-safe transition-colors">
      <div className="flex items-center justify-around h-16 px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full min-h-[44px] transition-colors ${
                isActive
                  ? 'text-stone-900 dark:text-white font-semibold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-stone-900 dark:text-white' : 'text-stone-600 dark:text-stone-400'}`} />
              <span className="text-[10px] mt-1 tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
