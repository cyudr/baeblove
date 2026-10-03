import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  AGE_BRACKETS,
  CDC_MILESTONES,
  CATEGORY_METADATA,
  getAgeBracketRecommendations,
} from '../../data/milestonesData';
import { MilestoneCategory, MilestoneItem } from '../../types';
import {
  Check,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Sparkles,
  Info,
  Calendar,
  Search,
  Filter,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Lightbulb,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CardDetailPopupModal } from '../modals/CardDetailPopupModal';

interface MilestonesViewProps {
  onOpenCustomMilestoneModal: () => void;
}

export const MilestonesView: React.FC<MilestonesViewProps> = ({
  onOpenCustomMilestoneModal,
}) => {
  const {
    activeProfile,
    activeCompletedMilestones,
    toggleMilestone,
    removeCompletedMilestone,
  } = useApp();

  const [selectedAgeMonths, setSelectedAgeMonths] = useState<number>(6);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'achieved' | 'pending'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedGuides, setExpandedGuides] = useState<Record<string, boolean>>({});
  const [modalItem, setModalItem] = useState<MilestoneItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openMilestoneModal = (item: MilestoneItem) => {
    setModalItem(item);
    setIsModalOpen(true);
  };

  if (!activeProfile) return null;

  const currentBracket = AGE_BRACKETS.find((b) => b.months === selectedAgeMonths) || AGE_BRACKETS[2];
  const bracketRecs = getAgeBracketRecommendations(selectedAgeMonths);

  // Official milestones for this bracket
  const officialMilestones = CDC_MILESTONES.filter(
    (m) => m.ageMonthBracket === selectedAgeMonths
  );

  // Custom milestones
  const customMilestones = activeCompletedMilestones.filter((c) => c.isCustom);

  // Filter logic
  const filteredMilestones = officialMilestones.filter((m) => {
    const isCompleted = activeCompletedMilestones.some((c) => c.milestoneId === m.id);

    if (statusFilter === 'achieved' && !isCompleted) return false;
    if (statusFilter === 'pending' && isCompleted) return false;

    if (selectedCategory !== 'all' && m.category !== selectedCategory) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        m.title.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        (m.tips && m.tips.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const completedCount = officialMilestones.filter((m) =>
    activeCompletedMilestones.some((c) => c.milestoneId === m.id)
  ).length;

  const handleToggle = (id: string, currentlyCompleted: boolean) => {
    if (!currentlyCompleted) {
      confetti({
        particleCount: 45,
        spread: 55,
        origin: { y: 0.7 },
      });
    }
    toggleMilestone(id);
  };

  const toggleGuide = (id: string) => {
    setExpandedGuides((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      {/* Header with Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-5 md:p-6 shadow-xs transition-colors">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-stone-900 dark:text-white">
              CDC Developmental Milestones
            </h2>
            <span className="text-xs text-stone-500 dark:text-stone-400">Ages 2 to 36 Months</span>
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 max-w-2xl leading-relaxed">
            Clinical milestones from the CDC & American Academy of Pediatrics (AAP). Track progress across movement, communication, cognitive learning, and social bonding.
          </p>
        </div>

        <button
          onClick={onOpenCustomMilestoneModal}
          className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white dark:text-stone-900 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Record Custom Milestone</span>
        </button>
      </div>

      {/* Age Bracket Horizontal Carousel */}
      <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 p-3 shadow-xs transition-colors">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {AGE_BRACKETS.map((bracket) => {
            const isSelected = selectedAgeMonths === bracket.months;
            const bracketItems = CDC_MILESTONES.filter((m) => m.ageMonthBracket === bracket.months);
            const bracketCompleted = bracketItems.filter((m) =>
              activeCompletedMilestones.some((c) => c.milestoneId === m.id)
            ).length;

            return (
              <button
                key={bracket.months}
                onClick={() => setSelectedAgeMonths(bracket.months)}
                className={`shrink-0 px-3.5 py-2 rounded-lg text-xs font-medium text-left transition-all ${
                  isSelected
                    ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-xs'
                    : 'bg-stone-50 dark:bg-stone-800/60 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200/60 dark:border-stone-700/60'
                }`}
              >
                <div className="font-semibold">{bracket.label}</div>
                <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-stone-300 dark:text-stone-600' : 'text-stone-500 dark:text-stone-400'}`}>
                  {bracketCompleted}/{bracketItems.length} achieved
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Bracket Header & Summary */}
      <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 p-4 md:p-5 shadow-xs transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-stone-100 dark:border-stone-800">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-stone-900 dark:text-white">{currentBracket.label} Milestones</h3>
              <span className="text-xs text-emerald-800 dark:text-emerald-400 font-semibold">
                {completedCount} of {officialMilestones.length} completed
              </span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">{currentBracket.summary}</p>
          </div>

          {/* Search bar */}
          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search milestone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-white focus:outline-hidden focus:border-stone-400"
            />
          </div>
        </div>

        {/* Filter Bar (Domain & Status) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
          {/* Domain Category Filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white font-semibold'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              All Domains
            </button>
            {(['movement', 'language', 'cognitive', 'social'] as MilestoneCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  selectedCategory === cat
                    ? 'bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white font-semibold'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
                }`}
              >
                {CATEGORY_METADATA[cat].label}
              </button>
            ))}
          </div>

          {/* Status Segmented Control */}
          <div className="inline-flex p-0.5 bg-stone-100 dark:bg-stone-800 rounded-lg text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                statusFilter === 'all' ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs' : 'text-stone-600 dark:text-stone-400'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('achieved')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                statusFilter === 'achieved' ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs' : 'text-stone-600 dark:text-stone-400'
              }`}
            >
              Achieved ({completedCount})
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                statusFilter === 'pending' ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs' : 'text-stone-600 dark:text-stone-400'
              }`}
            >
              To Observe ({officialMilestones.length - completedCount})
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 4 PILLARS OF RECOMMENDATIONS FOR THIS AGE BRACKET             */}
      {/* ============================================================== */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-5 shadow-xs transition-colors">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900 dark:text-white">
                Recommendations for {currentBracket.label}
              </h3>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                AAP evidence-based developmental suggestions
              </p>
            </div>
          </div>
          <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-300">
            Care Guide
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Nutrition */}
          <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-lg">{bracketRecs.nutrition.emoji}</span>
                <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase">
                  {bracketRecs.nutrition.tag}
                </span>
              </div>
              <h4 className="text-xs font-bold text-emerald-950 dark:text-emerald-100 mb-1">
                {bracketRecs.nutrition.title}
              </h4>
              <p className="text-[11px] text-stone-600 dark:text-stone-300 leading-relaxed">
                {bracketRecs.nutrition.desc}
              </p>
            </div>
          </div>

          {/* Sleep */}
          <div className="p-3.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-900/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-lg">{bracketRecs.sleep.emoji}</span>
                <span className="text-[10px] font-bold text-indigo-800 dark:text-indigo-300 uppercase">
                  {bracketRecs.sleep.tag}
                </span>
              </div>
              <h4 className="text-xs font-bold text-indigo-950 dark:text-indigo-100 mb-1">
                {bracketRecs.sleep.title}
              </h4>
              <p className="text-[11px] text-stone-600 dark:text-stone-300 leading-relaxed">
                {bracketRecs.sleep.desc}
              </p>
            </div>
          </div>

          {/* Play & Movement */}
          <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-lg">{bracketRecs.playAndMovement.emoji}</span>
                <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase">
                  {bracketRecs.playAndMovement.tag}
                </span>
              </div>
              <h4 className="text-xs font-bold text-amber-950 dark:text-amber-100 mb-1">
                {bracketRecs.playAndMovement.title}
              </h4>
              <p className="text-[11px] text-stone-600 dark:text-stone-300 leading-relaxed">
                {bracketRecs.playAndMovement.desc}
              </p>
            </div>
          </div>

          {/* Pediatric Safety */}
          <div className="p-3.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-900/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-lg">{bracketRecs.pediatricSafety.emoji}</span>
                <span className="text-[10px] font-bold text-rose-800 dark:text-rose-300 uppercase">
                  {bracketRecs.pediatricSafety.tag}
                </span>
              </div>
              <h4 className="text-xs font-bold text-rose-950 dark:text-rose-100 mb-1">
                {bracketRecs.pediatricSafety.title}
              </h4>
              <p className="text-[11px] text-stone-600 dark:text-stone-300 leading-relaxed">
                {bracketRecs.pediatricSafety.desc}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Milestone Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMilestones.map((item) => {
          const completedRecord = activeCompletedMilestones.find(
            (c) => c.milestoneId === item.id
          );
          const isDone = !!completedRecord;
          const meta = CATEGORY_METADATA[item.category];
          const isGuideOpen = !!expandedGuides[item.id];

          return (
            <div
              key={item.id}
              className={`bg-white dark:bg-stone-900 rounded-xl border p-4.5 transition-all shadow-xs flex flex-col justify-between ${
                isDone
                  ? 'border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/20 dark:bg-emerald-950/20'
                  : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
              }`}
            >
              <div>
                {/* Clean unboxed metadata separator */}
                <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold ${meta.color} dark:text-stone-300`}>{meta.label}</span>
                    <span aria-hidden="true">·</span>
                    <span>{currentBracket.label}</span>
                  </div>

                  <button
                    onClick={() => openMilestoneModal(item)}
                    className="flex items-center gap-1 text-[11px] font-semibold text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 hover:bg-emerald-100 dark:hover:bg-emerald-950 transition-colors"
                  >
                    <Lightbulb className="w-3 h-3 text-amber-500" />
                    <span>Clinical Guide &rarr;</span>
                  </button>
                </div>

                <div className="flex items-start justify-between gap-3">
                  <h4
                    onClick={() => openMilestoneModal(item)}
                    className={`text-sm font-semibold leading-snug cursor-pointer hover:text-emerald-700 transition-colors ${
                      isDone
                        ? 'text-stone-900 dark:text-stone-300 line-through decoration-emerald-600/50'
                        : 'text-stone-900 dark:text-white'
                    }`}
                  >
                    {item.title}
                  </h4>
                  <button
                    onClick={() => handleToggle(item.id, isDone)}
                    className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                      isDone
                        ? 'bg-emerald-700 dark:bg-emerald-600 text-white shadow-xs'
                        : 'border-2 border-stone-300 dark:border-stone-600 hover:border-stone-500 text-transparent'
                    }`}
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>

                <p
                  onClick={() => openMilestoneModal(item)}
                  className="text-xs text-stone-600 dark:text-stone-400 mt-2 leading-relaxed cursor-pointer hover:text-stone-900 dark:hover:text-stone-200"
                >
                  {item.description}
                </p>

                {/* Expandable Nurture Recommendation Guide */}
                {isGuideOpen && (
                  <div className="mt-3 p-3 bg-amber-50/70 dark:bg-amber-950/30 rounded-xl border border-amber-200/60 dark:border-amber-900/40 text-xs space-y-1.5 animate-in fade-in duration-150">
                    <div className="font-semibold text-amber-950 dark:text-amber-200 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      How to Nurture This Skill:
                    </div>
                    <p className="text-[11px] text-stone-600 dark:text-stone-300 leading-relaxed">
                      {item.tips ||
                        'Offer supportive, reciprocal interactions. Practice with gentle repetition during calm, alert periods.'}
                    </p>
                  </div>
                )}
              </div>

              {/* Completion date footer if done */}
              {isDone && (
                <div className="mt-3 pt-2.5 border-t border-emerald-100 dark:border-emerald-900/40 flex items-center justify-between text-xs text-emerald-900 dark:text-emerald-300">
                  <span className="flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                    Achieved on {completedRecord.dateAchieved}
                  </span>
                  <button
                    onClick={() => removeCompletedMilestone(item.id)}
                    className="text-[11px] text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 underline"
                  >
                    Undo
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredMilestones.length === 0 && (
        <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 p-8 text-center text-stone-500 dark:text-stone-400 text-xs">
          No milestones match the current filter or search criteria.
        </div>
      )}

      {/* Custom Recorded Family Milestones */}
      {customMilestones.length > 0 && (
        <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 p-5 shadow-xs transition-colors">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800 mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-semibold text-stone-900 dark:text-white">
                Custom Family Memories & Milestones
              </h3>
            </div>
            <span className="text-xs text-stone-500 dark:text-stone-400">{customMilestones.length} recorded</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {customMilestones.map((m) => (
              <div
                key={m.milestoneId}
                className="p-3.5 bg-stone-50 dark:bg-stone-800/60 rounded-lg border border-stone-200/60 dark:border-stone-700/60 text-xs text-stone-700 dark:text-stone-300 flex justify-between items-start"
              >
                <div>
                  <div className="font-semibold text-stone-900 dark:text-white text-sm">{m.customTitle}</div>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                    Achieved: {m.dateAchieved}
                  </div>
                  {m.notes && <p className="text-stone-600 dark:text-stone-300 mt-1 italic leading-relaxed">{m.notes}</p>}
                </div>
                <button
                  onClick={() => removeCompletedMilestone(m.milestoneId)}
                  className="text-stone-400 hover:text-rose-600 text-xs p-1"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CDC Red Flag Signs - When to talk with your pediatrician */}
      <div className="bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 rounded-xl p-5 text-xs text-rose-950 dark:text-rose-200 transition-colors">
        <div className="flex items-center gap-2 mb-2 font-bold text-sm text-rose-900 dark:text-rose-300">
          <AlertTriangle className="w-4 h-4 text-rose-700 dark:text-rose-400" />
          <span>When to Talk with Your Pediatrician ({currentBracket.label})</span>
        </div>
        <p className="text-stone-600 dark:text-stone-400 mb-3 leading-relaxed">
          Every child develops at their own unique pace, but early identification of potential delays is very helpful. Share with your pediatrician if your child exhibits any of the following signs:
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-stone-800 dark:text-stone-300">
          {currentBracket.warningSigns.map((sign, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 shrink-0"></span>
              <span>{sign}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Pop-up modal for detailed milestone recommendations */}
      <CardDetailPopupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type="milestone-detail"
        profile={activeProfile}
        unitSystem="metric"
        data={{
          milestoneItem: modalItem || undefined,
        }}
      />
    </div>
  );
};
