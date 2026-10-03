import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FETAL_STAGES_DATA,
  BABY_MONTH_STAGES,
  ALL_BABY_WEEKS,
  getBabyWeekStage,
  getFetalWeekStage,
  getFetalWeekRecommendations,
  getBabyStageRecommendations,
  FetalWeekStage,
  BabyMonthStage,
  BabyWeekStage,
} from '../../data/stagesExpectationsData';
import { calculateGestationalAge } from '../../data/fetalStandards';
import {
  Sparkles,
  Heart,
  Moon,
  Smile,
  Compass,
  Plus,
  Trash2,
  Calendar,
  Gift,
  Star,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  Sliders,
  ShieldCheck,
  Utensils,
} from 'lucide-react';
import {
  CardDetailPopupModal,
  PopupCardType,
} from '../modals/CardDetailPopupModal';
import {
  BABY_RECIPES,
  FETAL_MATERNAL_RECIPES,
} from '../../data/recipeData';

interface StagesAndWishesViewProps {
  onOpenLoveNoteModal: (stageLabel: string) => void;
  onOpenFormulaModal?: () => void;
}

export const StagesAndWishesView: React.FC<StagesAndWishesViewProps> = ({
  onOpenLoveNoteModal,
  onOpenFormulaModal,
}) => {
  const {
    activeProfile,
    activeLoveNotes,
    deleteLoveNote,
    formulaSettings,
  } = useApp();

  if (!activeProfile) return null;

  const isBaby = activeProfile.type === 'baby';

  // Calculate current age
  const today = new Date();
  const eventDate = new Date(activeProfile.dateOfEvent);

  let currentBabyMonth = 0;
  let currentBabyWeek = 1;
  let currentFetalWeek = 28;

  if (isBaby) {
    const diffTime = today.getTime() - eventDate.getTime();
    const totalDays = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
    currentBabyMonth = Math.floor(totalDays / 30.4375);
    currentBabyWeek = Math.max(1, Math.min(52, Math.floor(totalDays / 7)));
  } else {
    const ga = calculateGestationalAge(activeProfile.dateOfEvent);
    currentFetalWeek = Math.max(4, Math.min(42, ga.weeks || 28));
  }

  // Toggle for baby: 'weeks' vs 'months'
  const [babyTrackingMode, setBabyTrackingMode] = useState<'weeks' | 'months'>('weeks');

  // Selected week for baby
  const [selectedBabyWeek, setSelectedBabyWeek] = useState<number>(currentBabyWeek);

  // Selected month for baby
  const [selectedMonth, setSelectedMonth] = useState<number>(() => {
    if (!isBaby) return 0;
    const months = BABY_MONTH_STAGES.map((s) => s.month);
    return months.reduce((prev, curr) =>
      Math.abs(curr - currentBabyMonth) < Math.abs(prev - currentBabyMonth) ? curr : prev
    );
  });

  // Selected week for fetal
  const [selectedFetalWeek, setSelectedFetalWeek] = useState<number>(() => {
    return currentFetalWeek;
  });

  // Popup modal state for pointer details
  const [popupType, setPopupType] = useState<PopupCardType | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = (type: PopupCardType) => {
    setPopupType(type);
    setIsPopupOpen(true);
  };

  // Auto toggle and sync all cards when profile switches
  React.useEffect(() => {
    if (activeProfile?.type === 'baby') {
      setSelectedBabyWeek(currentBabyWeek);
      const months = BABY_MONTH_STAGES.map((s) => s.month);
      const closest = months.reduce((prev, curr) =>
        Math.abs(curr - currentBabyMonth) < Math.abs(prev - currentBabyMonth) ? curr : prev
      );
      setSelectedMonth(closest);
    } else {
      setSelectedFetalWeek(currentFetalWeek);
    }
  }, [activeProfile?.id, currentBabyWeek, currentBabyMonth, currentFetalWeek]);

  // Current active data
  const currentBabyMonthStage: BabyMonthStage =
    BABY_MONTH_STAGES.find((s) => s.month === selectedMonth) || BABY_MONTH_STAGES[4];

  const currentBabyWeekStage: BabyWeekStage = getBabyWeekStage(selectedBabyWeek);

  const currentFetalStage: FetalWeekStage = getFetalWeekStage(selectedFetalWeek);

  const currentStageLabel = isBaby
    ? babyTrackingMode === 'weeks'
      ? `Week ${selectedBabyWeek}`
      : `Month ${selectedMonth}`
    : `Week ${selectedFetalWeek}`;

  const handlePrevStage = () => {
    if (isBaby) {
      if (babyTrackingMode === 'weeks') {
        const idx = ALL_BABY_WEEKS.indexOf(selectedBabyWeek);
        if (idx > 0) setSelectedBabyWeek(ALL_BABY_WEEKS[idx - 1]);
        else if (selectedBabyWeek > 1) setSelectedBabyWeek(selectedBabyWeek - 1);
      } else {
        const months = BABY_MONTH_STAGES.map((s) => s.month);
        const idx = months.indexOf(selectedMonth);
        if (idx > 0) setSelectedMonth(months[idx - 1]);
      }
    } else {
      if (selectedFetalWeek > 4) setSelectedFetalWeek(selectedFetalWeek - 1);
    }
  };

  const handleNextStage = () => {
    if (isBaby) {
      if (babyTrackingMode === 'weeks') {
        const idx = ALL_BABY_WEEKS.indexOf(selectedBabyWeek);
        if (idx !== -1 && idx < ALL_BABY_WEEKS.length - 1) setSelectedBabyWeek(ALL_BABY_WEEKS[idx + 1]);
        else if (selectedBabyWeek < 52) setSelectedBabyWeek(selectedBabyWeek + 1);
      } else {
        const months = BABY_MONTH_STAGES.map((s) => s.month);
        const idx = months.indexOf(selectedMonth);
        if (idx !== -1 && idx < months.length - 1) setSelectedMonth(months[idx + 1]);
      }
    } else {
      if (selectedFetalWeek < 42) setSelectedFetalWeek(selectedFetalWeek + 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Mode switcher & Formula Source link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-stone-900 p-3.5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs transition-colors">
        <div className="flex items-center gap-2">
          {isBaby ? (
            <div className="inline-flex p-1 bg-stone-100 dark:bg-stone-800 rounded-xl">
              <button
                onClick={() => setBabyTrackingMode('weeks')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  babyTrackingMode === 'weeks'
                    ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-xs font-bold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Week-by-Week (Weeks 1–52)</span>
              </button>
              <button
                onClick={() => setBabyTrackingMode('months')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  babyTrackingMode === 'months'
                    ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-xs font-bold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Month-by-Month (0–36m)</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-800 dark:text-stone-200">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              <span>Pregnancy Hub · Gestational Week-by-Week Explorer (Weeks 4–42)</span>
            </div>
          )}
        </div>

        {onOpenFormulaModal && (
          <button
            onClick={onOpenFormulaModal}
            className="flex items-center gap-1.5 text-xs text-stone-600 dark:text-stone-300 hover:text-amber-800 dark:hover:text-amber-300 px-2.5 py-1.5 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-700 transition-colors self-start sm:self-auto"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
            <span>Formula Sources: <strong>{formulaSettings.fetalEfwFormula.toUpperCase()}</strong></span>
          </button>
        )}
      </div>

      {/* Lively Hero Stage Header */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-amber-500/15 via-rose-500/10 to-teal-500/10 border border-amber-200/70 dark:border-amber-900/50 p-6 md:p-8 shadow-xs">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-2xl">
                {isBaby
                  ? babyTrackingMode === 'weeks'
                    ? currentBabyWeekStage.symbolEmoji
                    : currentBabyMonthStage.symbolEmoji
                  : currentFetalStage.fruitEmoji}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 font-sans">
                {isBaby
                  ? babyTrackingMode === 'weeks'
                    ? `Week ${selectedBabyWeek} of Year 1`
                    : `Month ${selectedMonth} Stage Guide`
                  : `Week ${selectedFetalWeek} of 40 Weeks`}
              </span>
              {((isBaby && babyTrackingMode === 'weeks' && selectedBabyWeek === currentBabyWeek) ||
                (isBaby && babyTrackingMode === 'months' && selectedMonth === currentBabyMonth) ||
                (!isBaby && selectedFetalWeek === currentFetalWeek)) && (
                <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full">
                  Current Stage Now
                </span>
              )}
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-stone-900 dark:text-white tracking-tight">
              {isBaby
                ? babyTrackingMode === 'weeks'
                  ? currentBabyWeekStage.stageTitle
                  : currentBabyMonthStage.stageTitle
                : currentFetalStage.stageTitle}
            </h2>
            <p className="text-xs md:text-sm text-stone-600 dark:text-stone-300 max-w-xl font-medium leading-relaxed">
              {isBaby
                ? babyTrackingMode === 'weeks'
                  ? currentBabyWeekStage.developmentLeap
                  : currentBabyMonthStage.subtitle
                : `Size of a ${currentFetalStage.fruitComparison} · ${currentFetalStage.babyLength} · ${currentFetalStage.babyWeight}`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenLoveNoteModal(currentStageLabel)}
              className="px-4 py-2.5 text-xs font-bold text-white bg-linear-to-r from-amber-700 to-rose-700 hover:from-amber-800 hover:to-rose-800 rounded-xl shadow-sm flex items-center justify-center gap-2 transition-transform active:scale-95 shrink-0"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Write a Wish for {currentStageLabel}</span>
            </button>
          </div>
        </div>

        {/* Decorative background glow circle */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-200/40 dark:bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>
      </div>

      {/* Stage Number Navigator */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-4 shadow-xs transition-colors">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs font-bold text-stone-700 dark:text-stone-200 uppercase tracking-wider flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
            <span>
              {isBaby
                ? babyTrackingMode === 'weeks'
                  ? 'Browse Baby Week by Week (1 to 52)'
                  : 'Browse Month by Month (0 to 36)'
                : 'Browse Gestational Weeks (4 to 42)'}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrevStage}
              className="p-1 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300"
              title="Previous stage"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextStage}
              className="p-1 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300"
              title="Next stage"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {isBaby && babyTrackingMode === 'weeks' && (
            ALL_BABY_WEEKS.map((w) => {
              const isSelected = selectedBabyWeek === w;
              const isCurrent = currentBabyWeek === w;
              const st = getBabyWeekStage(w);
              return (
                <button
                  key={w}
                  onClick={() => setSelectedBabyWeek(w)}
                  className={`flex-shrink-0 px-3 py-2 rounded-xl text-left transition-all ${
                    isSelected
                      ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-xs font-semibold'
                      : isCurrent
                      ? 'bg-amber-100/80 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200 font-medium'
                      : 'bg-stone-50 dark:bg-stone-800/60 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200/70 dark:border-stone-700/60'
                  }`}
                >
                  <div className="flex items-center gap-1 text-xs">
                    <span>{st.symbolEmoji}</span>
                    <span>Week {w}</span>
                  </div>
                  <div className={`text-[10px] truncate max-w-[80px] mt-0.5 ${isSelected ? 'text-stone-300 dark:text-stone-600' : 'text-stone-500 dark:text-stone-400'}`}>
                    {w === 52 ? '1 Year' : `~${(w / 4.345).toFixed(0)}m`}
                  </div>
                </button>
              );
            })
          )}

          {isBaby && babyTrackingMode === 'months' && (
            BABY_MONTH_STAGES.map((s) => {
              const isSelected = selectedMonth === s.month;
              const isCurrent = currentBabyMonth === s.month;
              return (
                <button
                  key={s.month}
                  onClick={() => setSelectedMonth(s.month)}
                  className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-left transition-all ${
                    isSelected
                      ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-xs font-semibold'
                      : isCurrent
                      ? 'bg-amber-100/70 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200 font-medium'
                      : 'bg-stone-50 dark:bg-stone-800/60 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200/70 dark:border-stone-700/60'
                  }`}
                >
                  <div className="flex items-center gap-1 text-xs">
                    <span>{s.symbolEmoji}</span>
                    <span>Month {s.month}</span>
                  </div>
                  <div className={`text-[10px] truncate max-w-[85px] mt-0.5 ${isSelected ? 'text-stone-300 dark:text-stone-600' : 'text-stone-500 dark:text-stone-400'}`}>
                    {s.month === 0 ? 'Birth' : s.stageTitle.split(' ')[0]}
                  </div>
                </button>
              );
            })
          )}

          {!isBaby && (
            Array.from({ length: 39 }, (_, i) => i + 4).map((w) => {
              const isSelected = selectedFetalWeek === w;
              const isCurrent = currentFetalWeek === w;
              const st = getFetalWeekStage(w);
              return (
                <button
                  key={w}
                  onClick={() => setSelectedFetalWeek(w)}
                  className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-left transition-all ${
                    isSelected
                      ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-xs font-semibold'
                      : isCurrent
                      ? 'bg-amber-100/70 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200 font-medium'
                      : 'bg-stone-50 dark:bg-stone-800/60 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200/70 dark:border-stone-700/60'
                  }`}
                >
                  <div className="flex items-center gap-1 text-xs">
                    <span>{st.fruitEmoji}</span>
                    <span>Week {w}</span>
                  </div>
                  <div className={`text-[10px] truncate max-w-[85px] mt-0.5 ${isSelected ? 'text-stone-300 dark:text-stone-600' : 'text-stone-500 dark:text-stone-400'}`}>
                    {st.fruitComparison}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Biological Wonder Highlight Card */}
      <div
        onClick={() => openPopup(isBaby ? 'baby-stage' : 'fetal-stage')}
        className="p-5 rounded-3xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 flex items-start justify-between gap-3 shadow-xs transition-all hover:border-amber-400 hover:shadow-md cursor-pointer group"
      >
        <div className="flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-2xl bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-amber-900 dark:text-amber-300">
                The Biological Wonder at {currentStageLabel}
              </h4>
              <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 bg-amber-100/80 dark:bg-amber-900/40 px-2 py-0.5 rounded-full">
                Tap for Breakdown &rarr;
              </span>
            </div>
            <p className="text-xs md:text-sm text-stone-900 dark:text-stone-100 font-semibold mt-1 leading-relaxed group-hover:text-amber-900 dark:group-hover:text-amber-200 transition-colors">
              {isBaby
                ? babyTrackingMode === 'weeks'
                  ? currentBabyWeekStage.biologicalWonder
                  : currentBabyMonthStage.biologicalWonder
                : currentFetalStage.biologicalWonder}
            </p>
          </div>
        </div>
      </div>

      {/* Four Pillars of Evidence-Based Care & Recommendations */}
      {(() => {
        const stageRecs = isBaby
          ? getBabyStageRecommendations(
              babyTrackingMode === 'weeks' ? selectedBabyWeek : selectedMonth,
              babyTrackingMode === 'weeks'
            )
          : getFetalWeekRecommendations(selectedFetalWeek);

        return (
          <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-5 sm:p-6 shadow-xs transition-colors">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shadow-2xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-stone-900 dark:text-white">
                    Clinical Recommendations for {currentStageLabel}
                  </h3>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">
                    AAP & ACOG evidence-based guidance (Tap any pillar card below to expand details)
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                {isBaby ? 'Infant Care Plan' : 'Maternal-Fetal Plan'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {/* Pillar 1 */}
              <div
                onClick={() => openPopup(isBaby ? 'baby-rec-nutrition' : 'fetal-rec-screening')}
                className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40 flex flex-col justify-between hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-md transition-all cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-xl">{stageRecs.pillar1.emoji}</span>
                    <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase">
                      Pillar 01 · {stageRecs.pillar1.tag}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-stone-900 dark:text-white mb-1 group-hover:text-emerald-700 transition-colors">
                    {stageRecs.pillar1.title}
                  </h4>
                  <p className="text-[11px] text-stone-600 dark:text-stone-300 leading-relaxed">
                    {stageRecs.pillar1.desc}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-emerald-200/40 text-[10px] font-bold text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
                  <span>View Details &rarr;</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Pillar 2 */}
              <div
                onClick={() => openPopup(isBaby ? 'baby-rec-sleep' : 'fetal-rec-nutrition')}
                className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-900/40 flex flex-col justify-between hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-xl">{stageRecs.pillar2.emoji}</span>
                    <span className="text-[10px] font-bold text-indigo-800 dark:text-indigo-300 uppercase">
                      Pillar 02 · {stageRecs.pillar2.tag}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-stone-900 dark:text-white mb-1 group-hover:text-indigo-700 transition-colors">
                    {stageRecs.pillar2.title}
                  </h4>
                  <p className="text-[11px] text-stone-600 dark:text-stone-300 leading-relaxed">
                    {stageRecs.pillar2.desc}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-indigo-200/40 text-[10px] font-bold text-indigo-800 dark:text-indigo-300 flex items-center justify-between">
                  <span>View Details &rarr;</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Pillar 3 */}
              <div
                onClick={() => openPopup(isBaby ? 'baby-rec-play' : 'fetal-rec-comfort')}
                className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 flex flex-col justify-between hover:border-amber-300 dark:hover:border-amber-700 hover:shadow-md transition-all cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-xl">{stageRecs.pillar3.emoji}</span>
                    <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase">
                      Pillar 03 · {stageRecs.pillar3.tag}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-stone-900 dark:text-white mb-1 group-hover:text-amber-700 transition-colors">
                    {stageRecs.pillar3.title}
                  </h4>
                  <p className="text-[11px] text-stone-600 dark:text-stone-300 leading-relaxed">
                    {stageRecs.pillar3.desc}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-amber-200/40 text-[10px] font-bold text-amber-800 dark:text-amber-300 flex items-center justify-between">
                  <span>View Details &rarr;</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Pillar 4 */}
              <div
                onClick={() => openPopup(isBaby ? 'baby-rec-safety' : 'fetal-rec-bonding')}
                className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-900/40 flex flex-col justify-between hover:border-rose-300 dark:hover:border-rose-700 hover:shadow-md transition-all cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-xl">{stageRecs.pillar4.emoji}</span>
                    <span className="text-[10px] font-bold text-rose-800 dark:text-rose-300 uppercase">
                      Pillar 04 · {stageRecs.pillar4.tag}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-stone-900 dark:text-white mb-1 group-hover:text-rose-700 transition-colors">
                    {stageRecs.pillar4.title}
                  </h4>
                  <p className="text-[11px] text-stone-600 dark:text-stone-300 leading-relaxed">
                    {stageRecs.pillar4.desc}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-rose-200/40 text-[10px] font-bold text-rose-800 dark:text-rose-300 flex items-center justify-between">
                  <span>View Details &rarr;</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Evidence-Based Food & Recipe Suggestions Section */}
            <div className="p-5 rounded-3xl bg-linear-to-r from-emerald-500/10 via-teal-500/5 to-amber-500/10 border border-emerald-200/80 dark:border-emerald-900/50 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold text-sm">
                    🥗
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-stone-900 dark:text-white">
                      {isBaby ? 'Stage-Appropriate Infant Recipe Suggestions' : 'Pregnancy & Maternal-Fetal Nourishment Recipes'}
                    </h4>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400">
                      {isBaby
                        ? 'Evidence-based texture progressions, iron-rich purees, and self-feeding finger foods'
                        : 'Brain DHA, iron bioavailability, and choline-rich recipes calibrated for pregnancy'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => openPopup(isBaby ? 'baby-rec-nutrition' : 'fetal-rec-nutrition')}
                  className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1 shadow-2xs hover:scale-105 transition-all cursor-pointer"
                >
                  <Utensils className="w-3.5 h-3.5" />
                  <span>View All Recipes &rarr;</span>
                </button>
              </div>

              {/* Recipe Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {(isBaby ? BABY_RECIPES : FETAL_MATERNAL_RECIPES).slice(0, 3).map((recipe) => (
                  <div
                    key={recipe.id}
                    onClick={() => openPopup(isBaby ? 'baby-rec-nutrition' : 'fetal-rec-nutrition')}
                    className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{recipe.emoji}</span>
                        <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full">
                          ⏱️ {recipe.prepTime}
                        </span>
                      </div>
                      <h5 className="text-xs font-bold text-stone-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                        {recipe.title}
                      </h5>
                      <p className="text-[10px] text-emerald-800 dark:text-emerald-400 font-semibold mt-1">
                        {recipe.stageBracket}
                      </p>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-2 mt-1.5 leading-relaxed">
                        {recipe.clinicalBenefit}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-[10px] font-bold text-emerald-800 dark:text-emerald-300">
                      <span>Ingredients & Method</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Grid: What to Expect & Curious Behaviors */}
      {isBaby ? (
        babyTrackingMode === 'weeks' ? (
          /* WEEK-BY-WEEK DETAILED CARDS FOR BABY */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card: Sleep & Wake Windows + Feeding */}
            <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-5 shadow-xs space-y-4 transition-colors">
              <div className="flex items-center gap-2 pb-3 border-b border-stone-100 dark:border-stone-800">
                <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-sm font-bold text-stone-900 dark:text-white">
                  Sleep, Wake Windows & Soothing
                </h3>
              </div>

              <div className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200/60 dark:border-stone-700/60 text-xs">
                <span className="font-bold text-stone-900 dark:text-white block mb-1">Rhythms & Soothing:</span>
                <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                  {currentBabyWeekStage.whatToExpect.sleepAndSoothe}
                </p>
              </div>

              <div className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200/60 dark:border-stone-700/60 text-xs">
                <span className="font-bold text-stone-900 dark:text-white block mb-1">Feeding Patterns:</span>
                <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                  {currentBabyWeekStage.whatToExpect.feedingNotes}
                </p>
              </div>
            </div>

            {/* Card: Weekly Milestone Focus & Play */}
            <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-5 shadow-xs space-y-4 transition-colors">
              <div className="flex items-center gap-2 pb-3 border-b border-stone-100 dark:border-stone-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-sm font-bold text-stone-900 dark:text-white">
                  Weekly Milestone Watchlist
                </h3>
              </div>

              <div className="space-y-2 text-xs">
                {currentBabyWeekStage.whatToExpect.milestoneFocus.map((m, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60">
                    <Star className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <span className="text-stone-700 dark:text-stone-300 leading-relaxed">{m}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-900/40 rounded-xl text-xs text-rose-950 dark:text-rose-200">
                <span className="font-bold block mb-0.5 flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-rose-700 dark:text-rose-400" />
                  Sensory Play Idea for this Week:
                </span>
                <p className="leading-relaxed text-stone-700 dark:text-stone-300">
                  {currentBabyWeekStage.whatToExpect.interactionIdea}
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* MONTH-BY-MONTH CARDS FOR BABY */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-5 shadow-xs space-y-4 transition-colors">
              <div className="flex items-center gap-2 pb-3 border-b border-stone-100 dark:border-stone-800">
                <Moon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-sm font-bold text-stone-900 dark:text-white">
                  Sleep Rhythms & Feeding Evolution
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200/60 dark:border-stone-700/60">
                  <span className="font-bold text-stone-900 dark:text-white block mb-0.5">Sleep & Cycles:</span>
                  <span className="text-stone-600 dark:text-stone-300 leading-relaxed">
                    {currentBabyMonthStage.whatToExpect.sleepAndRhythms}
                  </span>
                </div>

                <div className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200/60 dark:border-stone-700/60">
                  <span className="font-bold text-stone-900 dark:text-white block mb-0.5">Feeding & Tastes:</span>
                  <span className="text-stone-600 dark:text-stone-300 leading-relaxed">
                    {currentBabyMonthStage.whatToExpect.feedingAndTastes}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                <span>Typical Weight: <strong>{currentBabyMonthStage.typicalWeight}</strong></span>
                <span>Length: <strong>{currentBabyMonthStage.typicalLength}</strong></span>
              </div>
            </div>

            <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-5 shadow-xs space-y-4 transition-colors">
              <div className="flex items-center gap-2 pb-3 border-b border-stone-100 dark:border-stone-800">
                <Smile className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <h3 className="text-sm font-bold text-stone-900 dark:text-white">
                  Curious Behaviors & Wonder Moments
                </h3>
              </div>

              <div className="space-y-2 text-xs">
                {currentBabyMonthStage.whatToExpect.curiousBehaviors.map((b, i) => (
                  <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60">
                    <Star className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <span className="text-stone-700 dark:text-stone-300 leading-relaxed">{b}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-900/40 rounded-xl text-xs text-rose-950 dark:text-rose-200">
                <span className="font-bold block mb-0.5 flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-rose-700 dark:text-rose-400" />
                  A Magic Game to Play Together Today:
                </span>
                <p className="leading-relaxed text-stone-700 dark:text-stone-300">
                  {currentBabyMonthStage.whatToExpect.sensoryPlayIdea}
                </p>
              </div>
            </div>
          </div>
        )
      ) : (
        /* Fetal Expectations Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-5 shadow-xs space-y-4 transition-colors">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-100 dark:border-stone-800">
              <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <h3 className="text-sm font-bold text-stone-900 dark:text-white">
                What Baby is Doing in the Womb (Week {selectedFetalWeek})
              </h3>
            </div>

            <div className="space-y-2 text-xs">
              {currentFetalStage.whatToExpect.forBaby.map((item, i) => (
                <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 dark:bg-amber-400 mt-1.5 shrink-0"></span>
                  <span className="text-stone-700 dark:text-stone-300 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-5 shadow-xs space-y-4 transition-colors">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-100 dark:border-stone-800">
              <Heart className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              <h3 className="text-sm font-bold text-stone-900 dark:text-white">
                For Mama's Body & Comfort
              </h3>
            </div>

            <div className="space-y-2 text-xs">
              {currentFetalStage.whatToExpect.forParent.map((item, i) => (
                <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600 dark:bg-rose-400 mt-1.5 shrink-0"></span>
                  <span className="text-stone-700 dark:text-stone-300 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>

            <div className="p-3 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 rounded-xl text-xs text-amber-950 dark:text-amber-200">
              <span className="font-bold block mb-0.5">Gentle Care Tip:</span>
              <p className="leading-relaxed text-stone-700 dark:text-stone-300">{currentFetalStage.whatToExpect.careTip}</p>
            </div>
          </div>
        </div>
      )}

      {/* Loving Growth Note & Parent Pep Talk Banner */}
      <div className="bg-linear-to-r from-emerald-50 via-teal-50 to-sky-50 dark:from-emerald-950/40 dark:via-teal-950/30 dark:to-sky-950/30 rounded-2xl border border-emerald-200/70 dark:border-emerald-900/50 p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-colors">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
            <span>🌿</span> Loving Growth Note for {currentStageLabel}
          </span>
          <p className="text-xs md:text-sm text-stone-800 dark:text-stone-200 font-serif italic leading-relaxed">
            "{isBaby
              ? babyTrackingMode === 'weeks'
                ? currentBabyWeekStage.growthNote
                : currentBabyMonthStage.lovingGrowthNote
              : currentFetalStage.lovingGrowthNote}"
          </p>
          {isBaby && babyTrackingMode === 'months' && (
            <p className="text-xs text-emerald-800 dark:text-emerald-300 font-medium pt-1">
              ✨ <strong>Parent reminder:</strong> {currentBabyMonthStage.parentPepTalk}
            </p>
          )}
        </div>
      </div>

      {/* Wishes, Love Letters & Hope Capsule Section */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-amber-200/80 dark:border-amber-900/50 p-5 md:p-6 shadow-xs space-y-4 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100 dark:border-stone-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">💌</span>
              <h3 className="text-base font-bold text-stone-900 dark:text-white">
                Wishes & Love Notes Keepsake Capsule
              </h3>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              Little letters of hope and wonder written for {activeProfile.name} during their journey.
            </p>
          </div>

          <button
            onClick={() => onOpenLoveNoteModal(currentStageLabel)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-900 dark:text-amber-200 bg-amber-100/80 dark:bg-amber-950/80 hover:bg-amber-200 dark:hover:bg-amber-900 rounded-xl transition-colors self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add a Wish for {currentStageLabel}</span>
          </button>
        </div>

        {/* List of notes */}
        {activeLoveNotes.length === 0 ? (
          <div className="text-center py-8 px-4 bg-stone-50/60 dark:bg-stone-800/40 rounded-xl border border-dashed border-stone-200 dark:border-stone-700">
            <Heart className="w-8 h-8 text-amber-300 dark:text-amber-500 mx-auto mb-2" />
            <p className="text-xs font-semibold text-stone-700 dark:text-stone-300">No wishes penned yet</p>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 max-w-sm mx-auto">
              Write a short message or a heartfelt wish for this stage. It will be treasured for years to come.
            </p>
            <button
              onClick={() => onOpenLoveNoteModal(currentStageLabel)}
              className="mt-3 px-3 py-1.5 text-xs font-medium text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 hover:bg-amber-200 dark:hover:bg-amber-900 rounded-lg transition-colors inline-flex items-center gap-1.5"
            >
              <Heart className="w-3.5 h-3.5 fill-amber-700 dark:fill-amber-400 text-amber-700 dark:text-amber-400" />
              <span>Write the First Wish</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeLoveNotes.map((note) => (
              <div
                key={note.id}
                className="p-4 rounded-xl bg-amber-50/40 dark:bg-stone-800/60 border border-amber-200/60 dark:border-stone-700 relative group hover:border-amber-300 dark:hover:border-amber-600 transition-all shadow-xs"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{note.emoji || '✨'}</span>
                    <div>
                      <span className="text-xs font-bold text-amber-950 dark:text-amber-300 block">
                        {note.stageLabel}
                      </span>
                      <span className="text-[10px] text-stone-400 dark:text-stone-500">
                        {note.date} · from {note.author}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteLoveNote(note.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-stone-400 hover:text-rose-600 rounded-md transition-opacity"
                    title="Delete note"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-xs text-stone-800 dark:text-stone-200 font-serif italic leading-relaxed pl-1 border-l-2 border-amber-300/80 dark:border-amber-600/80">
                  "{note.content}"
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pop-up detail card for pointers and recommendations */}
      <CardDetailPopupModal
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        type={popupType}
        profile={activeProfile}
        unitSystem="metric"
        data={{
          currentBabyWeeks: selectedBabyWeek,
          currentBabyMonth: selectedMonth,
          gestationalWeeks: selectedFetalWeek,
          fruitEmoji: currentFetalStage?.fruitEmoji || '🍆',
          fruitName: currentFetalStage?.fruitComparison || 'Eggplant',
          fruitLength: currentFetalStage?.babyLength || '~37.6 cm',
        }}
      />
    </div>
  );
};
