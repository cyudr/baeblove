import React from 'react';
import { CompletedMilestone, MilestoneCategory } from '../../types';
import { CDC_MILESTONES, CATEGORY_METADATA } from '../../data/milestonesData';
import { CheckCircle2, Award, Sparkles } from 'lucide-react';

interface MilestoneRadarProgressProps {
  completedList: CompletedMilestone[];
  targetAgeBracket?: number;
}

export const MilestoneRadarProgress: React.FC<MilestoneRadarProgressProps> = ({
  completedList,
  targetAgeBracket,
}) => {
  // Filter relevant milestones (either for specific bracket or all up to current)
  const relevantMilestones = targetAgeBracket
    ? CDC_MILESTONES.filter((m) => m.ageMonthBracket === targetAgeBracket)
    : CDC_MILESTONES;

  const categories: MilestoneCategory[] = ['movement', 'language', 'cognitive', 'social'];

  const stats = categories.map((cat) => {
    const total = relevantMilestones.filter((m) => m.category === cat).length;
    const completed = relevantMilestones.filter(
      (m) => m.category === cat && completedList.some((c) => c.milestoneId === m.id)
    ).length;
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
    return {
      category: cat,
      meta: CATEGORY_METADATA[cat],
      total,
      completed,
      pct,
    };
  });

  const totalCount = relevantMilestones.length;
  const totalCompleted = relevantMilestones.filter((m) =>
    completedList.some((c) => c.milestoneId === m.id)
  ).length;
  const overallPct = totalCount > 0 ? Math.round((totalCompleted / totalCount) * 100) : 0;

  return (
    <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-emerald-700" />
          <h4 className="text-sm font-semibold text-stone-900">Developmental Progress</h4>
        </div>
        <span className="text-xs font-semibold text-emerald-800">
          {totalCompleted} of {totalCount} completed ({overallPct}%)
        </span>
      </div>

      {/* Progress Bars by Category */}
      <div className="mt-4 space-y-3.5">
        {stats.map(({ category, meta, total, completed, pct }) => (
          <div key={category} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-stone-800 flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${
                  category === 'movement'
                    ? 'bg-amber-500'
                    : category === 'language'
                    ? 'bg-sky-500'
                    : category === 'cognitive'
                    ? 'bg-emerald-500'
                    : 'bg-rose-500'
                }`}></span>
                {meta.label}
              </span>
              <span className="text-stone-500 font-mono text-[11px]">
                {completed}/{total} ({pct}%)
              </span>
            </div>
            {/* Clean Progress track */}
            <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  category === 'movement'
                    ? 'bg-amber-600'
                    : category === 'language'
                    ? 'bg-sky-600'
                    : category === 'cognitive'
                    ? 'bg-emerald-600'
                    : 'bg-rose-600'
                }`}
                style={{ width: `${pct}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {overallPct === 100 && (
        <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2.5 text-xs text-emerald-900">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>All developmental milestones for this stage have been achieved!</span>
        </div>
      )}
    </div>
  );
};
