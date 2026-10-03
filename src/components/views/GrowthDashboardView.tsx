import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { calculatePercentile, UnitConverter } from '../../data/growthStandards';
import {
  calculateGestationalAge,
  FETAL_WEEK_DATA,
  FetalWeekMilestone,
} from '../../data/fetalStandards';
import {
  BABY_MONTH_STAGES,
  FETAL_STAGES_DATA,
  ALL_BABY_WEEKS,
  getBabyWeekStage,
  getFetalWeekStage,
  getFetalWeekRecommendations,
  getBabyStageRecommendations,
} from '../../data/stagesExpectationsData';
import {
  CDC_MILESTONES,
  CATEGORY_METADATA,
  AGE_BRACKETS,
} from '../../data/milestonesData';
import { MilestoneItem } from '../../types';
import {
  Scale,
  Ruler,
  Brain,
  Calendar,
  Sparkles,
  TrendingUp,
  Plus,
  ArrowRight,
  ChevronRight,
  HeartPulse,
  Heart,
  BookOpen,
  LineChart,
  CheckSquare,
  ClipboardList,
  Info,
  ShieldCheck,
  Activity,
  Footprints,
  Baby,
  Apple,
  Clock,
  CheckCircle2,
  FileText,
  Play,
  Pause,
  RotateCcw,
  Timer,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Search,
  Sliders,
  Gift,
  Star,
  Quote,
  Flame,
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
import { InteractiveGrowthChart } from '../charts/InteractiveGrowthChart';
import { FetalBiometricsChart } from '../charts/FetalBiometricsChart';
import confetti from 'canvas-confetti';

interface GrowthDashboardViewProps {
  onOpenLogModal: () => void;
  onNavigateTab: (tab: string) => void;
  onOpenFormulaModal?: () => void;
  onOpenLoveNoteModal?: (stageLabel: string) => void;
  onOpenCustomMilestoneModal?: () => void;
  onOpenExportModal?: () => void;
}

export const GrowthDashboardView: React.FC<GrowthDashboardViewProps> = ({
  onOpenLogModal,
  onNavigateTab,
  onOpenFormulaModal,
  onOpenLoveNoteModal,
  onOpenCustomMilestoneModal,
  onOpenExportModal,
}) => {
  const {
    activeProfile,
    activeBabyMeasurements,
    activeFetalMeasurements,
    activeCompletedMilestones,
    activeKickSessions,
    activeLoveNotes,
    addKickSession,
    deleteKickSession,
    toggleMilestone,
    unitSystem,
    formulaSettings,
  } = useApp();

  // Popup modal state for pointer details
  const [popupType, setPopupType] = useState<PopupCardType | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedMilestoneItem, setSelectedMilestoneItem] = useState<MilestoneItem | undefined>(undefined);
  const [customPointerData, setCustomPointerData] = useState<{
    pointerTitle?: string;
    pointerCategory?: string;
    pointerBadge?: string;
    pointerDesc?: string;
    pointerEvidence?: string;
    pointerActionSteps?: string[];
    pointerWhenToConsult?: string;
  }>({});

  // Stage explorer inside scrollable overview
  const [babyStageMode, setBabyStageMode] = useState<'weeks' | 'months'>('weeks');
  const [previewWeekNum, setPreviewWeekNum] = useState<number>(38);
  const [previewFetalWeekNum, setPreviewFetalWeekNum] = useState<number>(28);

  // Kick session live timer for fetal
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [liveKicksCount, setLiveKicksCount] = useState(0);

  // Milestones filter inside scrollable overview
  const [milestoneDomainFilter, setMilestoneDomainFilter] = useState<string>('all');

  // Live timer effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerActive) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive]);

  if (!activeProfile) return null;

  const isBaby = activeProfile.type === 'baby';

  // Calculate current age
  const today = new Date();
  const eventDate = new Date(activeProfile.dateOfEvent);

  let currentBabyMonth = 0;
  let currentBabyWeeks = 0;
  let currentBabyDays = 0;
  let gestationalAgeInfo: { weeks: number; days: number; totalDays: number } | null = null;

  if (isBaby) {
    const diffTime = today.getTime() - eventDate.getTime();
    const totalDays = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
    currentBabyMonth = Math.floor(totalDays / 30.4375);
    currentBabyWeeks = Math.max(1, Math.min(52, Math.floor(totalDays / 7)));
    currentBabyDays = totalDays % 7;
  } else {
    gestationalAgeInfo = calculateGestationalAge(activeProfile.dateOfEvent);
  }

  // Active stage snapshot auto-calculated from current child's age
  const activeBabyWeekStage = isBaby ? getBabyWeekStage(currentBabyWeeks) : null;
  const activeFetalStage = !isBaby ? getFetalWeekStage(gestationalAgeInfo?.weeks || 28) : null;

  // Selected stage for interactive carousel preview inside overview
  const currentFetalWeek = gestationalAgeInfo?.weeks || 28;
  const displayFetalStage = getFetalWeekStage(previewFetalWeekNum || currentFetalWeek);
  const displayBabyStage = getBabyWeekStage(previewWeekNum || currentBabyWeeks);

  // Latest measurements
  const latestBabyM = activeBabyMeasurements[activeBabyMeasurements.length - 1];
  const latestFetalM = activeFetalMeasurements[activeFetalMeasurements.length - 1];

  // Latest baby percentiles
  const weightPct =
    isBaby && latestBabyM?.weightKg
      ? calculatePercentile(latestBabyM.weightKg, latestBabyM.ageInMonths, 'weight', activeProfile.gender)
      : null;

  const lengthPct =
    isBaby && latestBabyM?.lengthCm
      ? calculatePercentile(latestBabyM.lengthCm, latestBabyM.ageInMonths, 'length', activeProfile.gender)
      : null;

  const hcPct =
    isBaby && latestBabyM?.headCircumferenceCm
      ? calculatePercentile(latestBabyM.headCircumferenceCm, latestBabyM.ageInMonths, 'headCircumference', activeProfile.gender)
      : null;

  const daysToDueDate = !isBaby && gestationalAgeInfo
    ? Math.max(0, 280 - gestationalAgeInfo.totalDays)
    : 0;

  const pregnancyPercent = !isBaby && gestationalAgeInfo
    ? Math.min(100, Math.round((gestationalAgeInfo.totalDays / 280) * 100))
    : 0;

  // 4 Pillars of recommendations calculated for active stage
  const recs = isBaby
    ? getBabyStageRecommendations(currentBabyWeeks, true)
    : getFetalWeekRecommendations(gestationalAgeInfo?.weeks || 28);

  // Milestones for current age bracket
  const currentAgeBracket = isBaby
    ? AGE_BRACKETS.find((b) => b.months === 9) || AGE_BRACKETS[3]
    : null;
  const bracketMilestones = currentAgeBracket
    ? CDC_MILESTONES.filter((m) => m.ageMonthBracket === currentAgeBracket.months)
    : [];

  const completedCount = bracketMilestones.filter((m) =>
    activeCompletedMilestones.some((c) => c.milestoneId === m.id)
  ).length;

  const milestoneCompletionPct = bracketMilestones.length > 0
    ? Math.round((completedCount / bracketMilestones.length) * 100)
    : 0;

  // Open modal helpers for clickable pointers
  const openPopup = (type: PopupCardType) => {
    setSelectedMilestoneItem(undefined);
    setCustomPointerData({});
    setPopupType(type);
    setIsPopupOpen(true);
  };

  const openMilestonePointer = (item: MilestoneItem) => {
    setSelectedMilestoneItem(item);
    setCustomPointerData({});
    setPopupType('milestone-detail');
    setIsPopupOpen(true);
  };

  const openPointerModal = (
    title: string,
    desc: string,
    evidence?: string,
    actionSteps?: string[],
    whenToConsult?: string,
    badge?: string,
    category?: string
  ) => {
    setSelectedMilestoneItem(undefined);
    setCustomPointerData({
      pointerTitle: title,
      pointerDesc: desc,
      pointerEvidence: evidence,
      pointerActionSteps: actionSteps,
      pointerWhenToConsult: whenToConsult,
      pointerBadge: badge,
      pointerCategory: category,
    });
    setPopupType('pointer-detail');
    setIsPopupOpen(true);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <div className="space-y-6 select-none">
        {/* ============================================================== */}
        {/* CARD 01: ASYMMETRIC BENTO COCKPIT & CORE VITALS                 */}
        {/* ============================================================== */}
        <section id="card-cockpit" className="space-y-4">
          {/* Hero Banner with Nursery/Womb Ambiance and Clickable Pointers */}
          <div
            className={`rounded-3xl border shadow-sm p-5 sm:p-6 transition-all relative overflow-hidden ${
              isBaby
                ? 'bg-linear-to-r from-emerald-500/10 via-teal-500/10 to-amber-500/10 border-emerald-200/80 dark:border-emerald-900/50'
                : 'bg-linear-to-r from-rose-500/10 via-amber-500/10 to-indigo-500/10 border-rose-200/80 dark:border-rose-900/50'
            }`}
          >
            {/* Subtle background glow circle */}
            <div
              className={`absolute -right-16 -top-16 w-64 h-64 rounded-full blur-3xl opacity-30 pointer-events-none ${
                isBaby ? 'bg-emerald-400' : 'bg-rose-400'
              }`}
            />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
              <div className="flex items-center gap-3.5 sm:gap-4">
                {/* Avatar with pulse ring */}
                <button
                  onClick={() => openPopup(isBaby ? 'baby-stage' : 'fetal-heartbeat')}
                  title="Click to view vital cardiac and development rhythm"
                  className="relative shrink-0 group cursor-pointer"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-xs text-white transition-transform group-hover:scale-105 ${
                      isBaby
                        ? 'bg-linear-to-br from-emerald-600 to-teal-700 dark:from-emerald-500 dark:to-teal-600'
                        : 'bg-linear-to-br from-rose-600 to-amber-600 dark:from-rose-500 dark:to-amber-500'
                    }`}
                  >
                    {isBaby ? '👶' : '🌱'}
                  </div>
                  {!isBaby ? (
                    <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500 text-[10px] text-white items-center justify-center font-bold">
                        ♥
                      </span>
                    </span>
                  ) : (
                    <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 text-[10px] text-white items-center justify-center font-bold shadow-xs">
                        ★
                      </span>
                    </span>
                  )}
                </button>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white tracking-tight">
                      {activeProfile.name}
                    </h1>
                    <button
                      onClick={() =>
                        openPointerModal(
                          'Biological Profile & Calibration',
                          `Current active profile: ${activeProfile.name}, biological gender: ${activeProfile.gender}. Growth calculations calibrate directly against WHO 2006 reference percentiles for ${activeProfile.gender === 'girl' ? 'girls' : 'boys'}.`,
                          'WHO Child Growth Standards (2006) provide sex-specific LMS parameters (Box-Cox power, median, coefficient of variation) to model biological differences in weight, stature, and cranial expansion.',
                          [
                            'Verify birth date accuracy for accurate age normalization',
                            'Calibrate metric or imperial measurement units',
                            'Export pediatric growth summary for checkup visits',
                          ],
                          'Contact your pediatrician if weight or length crosses more than two major percentile canals.',
                          'Profile Metadata',
                          'Clinical Calibration'
                        )
                      }
                      className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white/80 dark:bg-stone-800 text-stone-600 dark:text-stone-300 capitalize border border-stone-200/60 dark:border-stone-700 hover:border-emerald-400 transition-colors cursor-pointer"
                    >
                      {activeProfile.gender === 'undisclosed' ? 'Surprise' : activeProfile.gender} ⓘ
                    </button>
                  </div>

                  {/* Clickable Quick Pointers */}
                  <div className="flex flex-wrap items-center gap-2 mt-2 text-xs">
                    {isBaby ? (
                      <>
                        <button
                          onClick={() => openPopup('baby-stage')}
                          title="Click to view Week 38 Developmental Leap details"
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-300 font-bold hover:bg-emerald-200 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-2xs"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                          <span>Week {currentBabyWeeks} ({currentBabyMonth}m {currentBabyDays}d)</span>
                          <span className="text-[10px] opacity-70">➔</span>
                        </button>
                        <button
                          onClick={() => openPopup('awake-window-detail')}
                          title="Click to view awake window science and overtired signs"
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/70 text-indigo-900 dark:text-indigo-300 font-semibold hover:bg-indigo-200 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-2xs"
                        >
                          <span>☀️ Awake Window: 2.75–3.25h</span>
                          <span className="text-[10px] opacity-70">➔</span>
                        </button>
                        <button
                          onClick={() => openPopup('baby-rec-nutrition')}
                          title="Click to view infant nutrition & solids progression"
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 font-semibold hover:bg-amber-200 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-2xs"
                        >
                          <span>🥑 Finger Foods & Pincer</span>
                          <span className="text-[10px] opacity-70">➔</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => openPopup('fetal-gestational-age')}
                          title="Click to view gestational timeline and lung surfactant maturation"
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/70 text-rose-900 dark:text-rose-300 font-bold hover:bg-rose-200 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-2xs"
                        >
                          <HeartPulse className="w-3.5 h-3.5 text-rose-700 animate-pulse" />
                          <span>Week {gestationalAgeInfo?.weeks}, Day {gestationalAgeInfo?.days}</span>
                          <span className="text-[10px] opacity-70">➔</span>
                        </button>
                        <button
                          onClick={() =>
                            openPointerModal(
                              'Estimated Due Date & Third Trimester Countdown',
                              `There are approximately ${daysToDueDate} days remaining until your calculated due date (40 weeks gestation). Fetal organs are undergoing rapid final maturation.`,
                              'A normal term delivery occurs between 37 weeks 0 days and 41 weeks 6 days. Due dates calculated using Naegele rule or first-trimester crown-rump length (CRL) ultrasound have a +/- 5-day biological variance.',
                              [
                                'Review signs of pre-labor and true labor contractions',
                                'Pack the hospital go-bag with essentials and newborn layette',
                                'Confirm pediatric care provider selection before birth',
                              ],
                              'Report regular painful contractions every 5 minutes lasting 1 minute, fluid leakage, or vaginal bleeding immediately.',
                              'Timeline Guide',
                              'Obstetric Calendar'
                            )
                          }
                          title="Click to view due date countdown details"
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 font-semibold hover:bg-amber-200 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-2xs"
                        >
                          <span>⏳ {daysToDueDate} days to Due Date</span>
                          <span className="text-[10px] opacity-70">➔</span>
                        </button>
                        <button
                          onClick={() => openPopup('fetal-size')}
                          title="Click to view botanical scale & sensory awakening"
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-300 font-semibold hover:bg-emerald-200 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-2xs"
                        >
                          <span>🍆 Eggplant (~37.6 cm)</span>
                          <span className="text-[10px] opacity-70">➔</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Cluster */}
              <div className="flex items-center gap-2.5 self-start md:self-auto shrink-0">
                {onOpenFormulaModal && (
                  <button
                    onClick={onOpenFormulaModal}
                    title="View mathematical formulas and sources"
                    className="px-3.5 py-2 text-xs font-semibold rounded-2xl border border-stone-200 dark:border-stone-700 bg-white/95 dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 transition-all flex items-center gap-1.5 shadow-2xs hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                    <span className="font-bold text-amber-900 dark:text-amber-300 uppercase">
                      {isBaby ? 'WHO 2006 Math' : formulaSettings.fetalEfwFormula}
                    </span>
                  </button>
                )}

                <button
                  onClick={onOpenLogModal}
                  className="px-4 py-2 text-xs font-bold rounded-2xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 transition-all flex items-center gap-1.5 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isBaby ? 'Log Pediatric Visit' : 'Log Ultrasound'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* ASYMMETRIC BENTO GRID OF CORE VITALS                          */}
          {/* ============================================================== */}
          {isBaby ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {/* FEATURED SPOTLIGHT CARD (Spans 2 columns on lg): Weight Growth & Percentile */}
              <div className="md:col-span-2 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-5 sm:p-6 shadow-xs flex flex-col justify-between transition-all hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-md">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shadow-2xs">
                      <Scale className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-black text-stone-900 dark:text-white">
                        Weight & Growth Velocity Spotlight
                      </h3>
                      <button
                        onClick={onOpenFormulaModal}
                        className="text-[11px] text-stone-500 dark:text-stone-400 hover:text-emerald-700 underline text-left"
                      >
                        WHO Multi-Center Growth Reference (LMS Calibrated)
                      </button>
                    </div>
                  </div>

                  {/* Clickable pointer button */}
                  <button
                    onClick={() => openPopup('baby-weight')}
                    className="px-3 py-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 rounded-xl flex items-center gap-1.5 transition-all shadow-2xs hover:scale-105"
                  >
                    <span>Full Analysis</span>
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                  <div>
                    <div className="text-xs text-stone-500 dark:text-stone-400 font-medium">Current Measured Weight</div>
                    <div
                      onClick={() => openPopup('baby-weight')}
                      className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-white tracking-tight mt-0.5 cursor-pointer hover:text-emerald-700 transition-colors"
                    >
                      {latestBabyM?.weightKg
                        ? UnitConverter.formatWeight(latestBabyM.weightKg, unitSystem)
                        : '9.12 kg'}
                    </div>
                    <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                      <button
                        onClick={() => openPopup('baby-weight')}
                        className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-300 text-xs font-bold hover:bg-emerald-200 transition-all cursor-pointer shadow-2xs hover:scale-105"
                      >
                        {weightPct ? `${weightPct.percentile}th Pct` : '54th Pct'} ⓘ
                      </button>
                      <button
                        onClick={() =>
                          openPointerModal(
                            'Weight Gain Velocity Guidelines',
                            'At 9 months, healthy babies gain approximately 100g to 150g per week. Steady canal tracking indicates adequate caloric intake and balanced macro-nutrition.',
                            'The WHO velocity standard evaluates longitudinal weight gain rate (g/day or g/week) rather than single cross-sectional points, preventing misdiagnosis of temporary growth pauses.',
                            [
                              'Provide 3 balanced solid meals plus breastmilk or formula feeds',
                              'Offer iron-rich finger foods (soft meat, eggs, beans, fortified cereal)',
                              'Allow baby to self-regulate satiety cues without forced feeding',
                            ],
                            'Consult pediatrician if weight velocity drops flat for two consecutive visits or declines.',
                            'Velocity Metric',
                            'Weight Gain Rate'
                          )
                        }
                        className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-semibold hover:bg-stone-200 transition-all cursor-pointer shadow-2xs"
                      >
                        +135g / week ⓘ
                      </button>
                    </div>
                  </div>

                  {/* Visual Percentile Meter */}
                  <div
                    onClick={() => openPopup('baby-weight')}
                    className="flex flex-col justify-center cursor-pointer p-2 rounded-2xl hover:bg-stone-50 dark:hover:bg-stone-800/40 transition-colors"
                  >
                    <div className="flex justify-between text-[11px] font-bold text-stone-500 dark:text-stone-400 mb-1.5">
                      <span>3rd Pct</span>
                      <span className="text-emerald-800 dark:text-emerald-300 font-black">50th Median</span>
                      <span>97th Pct</span>
                    </div>
                    <div className="w-full h-3.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden p-0.5 relative">
                      <div
                        className="h-full bg-linear-to-r from-emerald-500 via-teal-400 to-sky-400 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, Math.max(5, weightPct?.percentile ?? 54))}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-stone-400 dark:text-stone-500 mt-1.5 text-center font-medium">
                      Tracking along the ideal 50th-60th WHO growth canal (Tap for z-score)
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                  <span className="text-stone-500 dark:text-stone-400 font-medium">
                    Next Target: ~9.4 kg (Month 10 Checkpoint)
                  </span>
                  <button
                    onClick={() => openPopup('baby-rec-nutrition')}
                    className="font-bold text-emerald-800 dark:text-emerald-300 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Nutrition & Solids Plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* CARD 2: Length & Skeletal Stature */}
              <div
                onClick={() => openPopup('baby-length')}
                className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-5 shadow-xs hover:border-teal-300 dark:hover:border-teal-700 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-stone-500 dark:text-stone-400 mb-2">
                    <span className="flex items-center gap-2 font-bold text-stone-900 dark:text-white text-xs">
                      <div className="w-8 h-8 rounded-xl bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 flex items-center justify-center">
                        <Ruler className="w-4 h-4" />
                      </div>
                      Length & Stature
                    </span>
                    <span className="text-[10px] font-bold text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded-full uppercase">
                      WHO 61st Pct
                    </span>
                  </div>

                  <div className="my-3">
                    <div className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white">
                      {latestBabyM?.lengthCm
                        ? UnitConverter.formatLength(latestBabyM.lengthCm, unitSystem)
                        : '72.4 cm'}
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-teal-800 dark:text-teal-300 font-semibold mt-1">
                      <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                      <span>~1.2 cm / mo skeletal velocity</span>
                    </div>
                  </div>

                  <div className="w-full h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden mb-1.5">
                    <div
                      className="h-full bg-linear-to-r from-teal-500 to-sky-400 rounded-full"
                      style={{ width: `${Math.min(100, Math.max(5, lengthPct?.percentile ?? 61))}%` }}
                    />
                  </div>
                </div>

                <div className="mt-4 pt-2.5 border-t border-stone-100 dark:border-stone-800 text-[10px] font-bold text-teal-800 dark:text-teal-300 flex items-center justify-between">
                  <span>View Stature Protocols &rarr;</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* CARD 3: Head Circumference & Neurodevelopment */}
              <div
                onClick={() => openPopup('fontanelle-detail')}
                className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-5 shadow-xs hover:border-amber-300 dark:hover:border-amber-700 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-stone-500 dark:text-stone-400 mb-2">
                    <span className="flex items-center gap-2 font-bold text-stone-900 dark:text-white text-xs">
                      <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 flex items-center justify-center">
                        <Brain className="w-4 h-4" />
                      </div>
                      Cranial & Brain
                    </span>
                    <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full uppercase">
                      WHO 58th Pct
                    </span>
                  </div>

                  <div className="my-3">
                    <div className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white">
                      {latestBabyM?.headCircumferenceCm
                        ? UnitConverter.formatLength(latestBabyM.headCircumferenceCm, unitSystem)
                        : '45.4 cm'}
                    </div>
                    <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 mt-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Fontanelle: Soft & Flat</span>
                    </div>
                  </div>

                  <div className="w-full h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden mb-1.5">
                    <div
                      className="h-full bg-linear-to-r from-amber-500 to-orange-400 rounded-full"
                      style={{ width: `${Math.min(100, Math.max(5, hcPct?.percentile ?? 58))}%` }}
                    />
                  </div>
                </div>

                <div className="mt-4 pt-2.5 border-t border-stone-100 dark:border-stone-800 text-[10px] font-bold text-amber-800 dark:text-amber-300 flex items-center justify-between">
                  <span>View Cranial Guides &rarr;</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {/* FEATURED SPOTLIGHT CARD (Spans 2 columns on lg): Gestational Age & Journey */}
              <div className="md:col-span-2 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-5 sm:p-6 shadow-xs flex flex-col justify-between transition-all hover:border-rose-300 dark:hover:border-rose-700 hover:shadow-md">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 flex items-center justify-center shadow-2xs">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-black text-stone-900 dark:text-white">
                        Gestational Timeline & Maturation
                      </h3>
                      <button
                        onClick={onOpenFormulaModal}
                        className="text-[11px] text-stone-500 dark:text-stone-400 hover:text-rose-700 underline text-left"
                      >
                        ACOG & Naegele Clinical Calculation Standard
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => openPopup('fetal-gestational-age')}
                    className="px-3 py-1.5 text-xs font-bold text-rose-800 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 rounded-xl flex items-center gap-1.5 transition-all shadow-2xs hover:scale-105"
                  >
                    <span>Timeline &rarr;</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                  <div>
                    <div className="text-xs text-stone-500 dark:text-stone-400 font-medium">Active Gestational Age</div>
                    <div
                      onClick={() => openPopup('fetal-gestational-age')}
                      className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-white tracking-tight mt-0.5 cursor-pointer hover:text-rose-700 transition-colors"
                    >
                      Week {gestationalAgeInfo?.weeks}, Day {gestationalAgeInfo?.days}
                    </div>
                    <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                      <button
                        onClick={() => openPopup('fetal-gestational-age')}
                        className="px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 text-xs font-bold hover:bg-amber-200 transition-all cursor-pointer shadow-2xs hover:scale-105"
                      >
                        Trimester 3
                      </button>
                      <button
                        onClick={() => openPopup('fetal-gestational-age')}
                        className="px-2.5 py-1 rounded-lg bg-rose-100 dark:bg-rose-950/80 text-rose-900 dark:text-rose-300 text-xs font-bold hover:bg-rose-200 transition-all cursor-pointer shadow-2xs hover:scale-105"
                      >
                        Viability &gt;95% ⓘ
                      </button>
                    </div>
                  </div>

                  {/* Visual 3-Trimester Progress */}
                  <div
                    onClick={() => openPopup('fetal-gestational-age')}
                    className="flex flex-col justify-center cursor-pointer p-2 rounded-2xl hover:bg-stone-50 dark:hover:bg-stone-800/40 transition-colors"
                  >
                    <div className="flex justify-between text-[11px] font-bold text-stone-500 dark:text-stone-400 mb-1.5">
                      <span>Tri 1 (1–13w)</span>
                      <span>Tri 2 (14–26w)</span>
                      <span className="text-rose-700 dark:text-rose-300 font-black">Tri 3 (Active)</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1 h-3.5">
                      <div className="bg-emerald-500 rounded-l-full" />
                      <div className="bg-emerald-500" />
                      <div className="bg-linear-to-r from-amber-500 to-rose-500 rounded-r-full" />
                    </div>
                    <p className="text-[10px] text-stone-400 dark:text-stone-500 mt-1.5 text-center font-medium">
                      {daysToDueDate} days remaining until estimated due date (Tap for full timeline)
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                  <span className="text-stone-500 dark:text-stone-400 font-medium">
                    Major Event: Fetal Alveolar Surfactant Production
                  </span>
                  <button
                    onClick={() => openPopup('fetal-rec-screening')}
                    className="font-bold text-rose-800 dark:text-rose-300 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Screenings Check &rarr;</span>
                  </button>
                </div>
              </div>

              {/* CARD 2: Estimated Fetal Weight (Hadlock) */}
              <div
                onClick={() => openPopup('fetal-efw')}
                className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-5 shadow-xs hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-stone-500 dark:text-stone-400 mb-2">
                    <span className="flex items-center gap-2 font-bold text-stone-900 dark:text-white text-xs">
                      <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center">
                        <Scale className="w-4 h-4" />
                      </div>
                      Hadlock EFW
                    </span>
                    <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full uppercase">
                      50th Percentile
                    </span>
                  </div>

                  <div className="my-3">
                    <div className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white">
                      {latestFetalM?.efwGrams ? UnitConverter.formatFetalWeight(latestFetalM.efwGrams, unitSystem) : '1,040 g'}
                    </div>
                    <div className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 mt-1">
                      ~180g / wk gain velocity
                    </div>
                  </div>

                  <div className="w-full h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden mb-1.5">
                    <div className="h-full bg-linear-to-r from-emerald-500 to-teal-400 rounded-full w-1/2" />
                  </div>
                </div>

                <div className="mt-4 pt-2.5 border-t border-stone-100 dark:border-stone-800 text-[10px] font-bold text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
                  <span>View Biometric Math &rarr;</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* CARD 3: Botanical Size Comparison */}
              <div
                onClick={() => openPopup('fetal-size')}
                className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-5 shadow-xs hover:border-amber-300 dark:hover:border-amber-700 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-stone-500 dark:text-stone-400 mb-2">
                    <span className="flex items-center gap-2 font-bold text-stone-900 dark:text-white text-xs">
                      <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 flex items-center justify-center">
                        <Apple className="w-4 h-4" />
                      </div>
                      Botanical Scale
                    </span>
                    <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full uppercase">
                      Fruit Standard
                    </span>
                  </div>

                  <div className="flex items-center gap-3 my-2">
                    <span className="text-3xl sm:text-4xl animate-bounce">🍆</span>
                    <div>
                      <div className="text-lg font-black text-stone-900 dark:text-white">
                        Eggplant
                      </div>
                      <div className="text-xs text-amber-800 dark:text-amber-300 font-bold">
                        ~37.6 cm (14.8 in)
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-2.5 border-t border-stone-100 dark:border-stone-800 text-[10px] font-bold text-amber-800 dark:text-amber-300 flex items-center justify-between">
                  <span>View Sensory Milestones &rarr;</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ============================================================== */}
        {/* CARD 02: DEVELOPMENTAL STAGE & BIOLOGICAL WONDER EXPLORER       */}
        {/* ============================================================== */}
        <section id="card-stage-wonder" className="space-y-4 pt-4 border-t border-stone-200 dark:border-stone-800 scroll-mt-28">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 flex items-center justify-center shadow-2xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-stone-900 dark:text-white">
                  {isBaby ? 'Developmental Leaps & Biological Wonder' : 'Fetal Development & Sensory Awakening'}
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                  {isBaby ? 'Surveillance of neurosensory leaps and physical wonders' : 'Week-by-week anatomical evolution in the womb'}
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('stages')}
              className="px-3.5 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-xs font-bold text-stone-700 dark:text-stone-200 flex items-center gap-1.5 shadow-2xs hover:scale-105 transition-all"
            >
              <span>Full Stages Hub & Wishes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Magazine-style split card */}
          <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-5 sm:p-6 shadow-xs grid grid-cols-1 lg:grid-cols-3 gap-6 transition-colors">
            {/* Left Column: Biological Wonder Spotlight */}
            <div className="lg:col-span-2 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300">
                    {isBaby ? `Week ${currentBabyWeeks} Active Wonder` : `Gestational Week ${currentFetalWeek} Womb Wonder`}
                  </span>
                  <span className="text-xs font-bold text-stone-500 dark:text-stone-400">
                    {isBaby ? activeBabyWeekStage?.developmentLeap : activeFetalStage?.babyLength}
                  </span>
                </div>

                <div
                  onClick={() => openPopup(isBaby ? 'baby-stage' : 'fetal-stage')}
                  className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/30 cursor-pointer hover:border-amber-300 dark:hover:border-amber-700 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <Quote className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider mb-1">
                        Biological Wonder of this Stage
                      </h4>
                      <p className="text-sm font-semibold text-stone-900 dark:text-stone-100 leading-relaxed group-hover:text-amber-900 dark:group-hover:text-amber-200 transition-colors">
                        {isBaby
                          ? activeBabyWeekStage?.biologicalWonder || 'Rapid motor coordination and spatial exploration are connecting neurological pathways in the motor cortex.'
                          : activeFetalStage?.biologicalWonder || 'Baby opens their eyes, distinguishes light from darkness, and turns toward rhythmic voices.'}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 text-[11px] font-bold text-amber-800 dark:text-amber-400 flex items-center justify-end gap-1">
                    <span>Tap to view in-depth biological breakdown</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

                {/* Clickable Quick Milestones Tags */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div
                    onClick={() => openPopup(isBaby ? 'baby-rec-play' : 'fetal-rec-comfort')}
                    className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 cursor-pointer hover:border-indigo-300 transition-all"
                  >
                    <span className="font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5 text-xs">
                      <span>🎯</span>
                      <span>{isBaby ? 'Sensory Leap Practice' : 'Sensory Development'}</span>
                    </span>
                    <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-1 leading-snug">
                      {isBaby
                        ? activeBabyWeekStage?.whatToExpect.milestoneFocus.join(', ') || 'Exploring textures, grasping soft fabrics, transferring toys between hands.'
                        : 'Auditory cortex fully connected; responsive to heartbeat and lullabies.'}
                    </p>
                  </div>

                  <div
                    onClick={() => openPopup(isBaby ? 'baby-rec-sleep' : 'fetal-rec-bonding')}
                    className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 cursor-pointer hover:border-emerald-300 transition-all"
                  >
                    <span className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5 text-xs">
                      <span>🌙</span>
                      <span>{isBaby ? 'Circadian Rhythm Window' : 'Circadian Kick Peaks'}</span>
                    </span>
                    <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-1 leading-snug">
                      {isBaby
                        ? 'Melatonin synthesis stabilizing; predictable 3-nap bedtime routine.'
                        : 'Peak active movements between 9 PM and 1 AM when maternal cortisol dips.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action trigger for Keepsake */}
              <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                <span className="text-stone-500 dark:text-stone-400">
                  {activeLoveNotes.length > 0
                    ? `${activeLoveNotes.length} keepsake notes recorded for ${activeProfile.name}`
                    : 'Capture your thoughts and hopes for this exact milestone'}
                </span>
                {onOpenLoveNoteModal && (
                  <button
                    onClick={() =>
                      onOpenLoveNoteModal(
                        isBaby ? `Week ${currentBabyWeeks}` : `Gestational Week ${currentFetalWeek}`
                      )
                    }
                    className="font-bold text-rose-700 dark:text-rose-400 hover:underline flex items-center gap-1"
                  >
                    <Heart className="w-3.5 h-3.5 text-rose-500" />
                    <span>+ Write a Love Note</span>
                  </button>
                )}
              </div>
            </div>

            {/* Right Column: Interactive Week Timeline Scrubber */}
            <div className="bg-stone-50 dark:bg-stone-800/50 rounded-2xl p-4 border border-stone-200/60 dark:border-stone-700/60 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-stone-200/60 dark:border-stone-700/60 mb-3">
                  <span className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider">
                    {isBaby ? 'Week Scrubber' : 'Pregnancy Week Scrubber'}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                    Interactive Preview
                  </span>
                </div>

                <p className="text-[11px] text-stone-500 dark:text-stone-400 mb-3">
                  Tap any week card below to preview the upcoming anatomical milestones:
                </p>

                {/* Scrubber pills */}
                <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                  {isBaby
                    ? [currentBabyWeeks - 1, currentBabyWeeks, currentBabyWeeks + 1, currentBabyWeeks + 2]
                        .filter((w) => w >= 1 && w <= 52)
                        .map((w) => {
                          const st = getBabyWeekStage(w);
                          const isCurrent = w === currentBabyWeeks;
                          return (
                            <button
                              key={w}
                              onClick={() => {
                                setPreviewWeekNum(w);
                                openPointerModal(
                                  `Week ${w}: ${st.developmentLeap}`,
                                  st.biologicalWonder,
                                  `Developmental wonder: ${st.whatToExpect.milestoneFocus.join(', ')}`,
                                  [
                                    'Engage in interactive tummy time and floor play',
                                    'Observe fine motor grasps and auditory responses',
                                    'Maintain age-appropriate sleep awake windows',
                                  ],
                                  'Discuss developmental milestones at your standard pediatric well-child checks.',
                                  `Week ${w} Milestone`,
                                  'Baby Developmental Leap'
                                );
                              }}
                              className={`p-2.5 rounded-xl border text-left transition-all ${
                                isCurrent
                                  ? 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-400 text-emerald-950 dark:text-emerald-100 font-bold shadow-2xs'
                                  : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-emerald-300'
                              }`}
                            >
                              <div className="flex items-center justify-between text-[11px]">
                                <span>Week {w}</span>
                                {isCurrent && <span className="text-[9px] uppercase px-1 rounded bg-emerald-600 text-white">Active</span>}
                              </div>
                              <div className="text-[10px] text-stone-500 dark:text-stone-400 truncate mt-0.5">
                                {st.developmentLeap}
                              </div>
                            </button>
                          );
                        })
                    : [currentFetalWeek - 1, currentFetalWeek, currentFetalWeek + 1, currentFetalWeek + 2]
                        .filter((w) => w >= 4 && w <= 42)
                        .map((w) => {
                          const st = getFetalWeekStage(w);
                          const isCurrent = w === currentFetalWeek;
                          return (
                            <button
                              key={w}
                              onClick={() => {
                                setPreviewFetalWeekNum(w);
                                openPointerModal(
                                  `Gestational Week ${w}: ${st.fruitComparison}`,
                                  st.biologicalWonder,
                                  `Average Length: ${st.babyLength} · Estimated Weight: ${st.babyWeight}`,
                                  [
                                    'Maintain daily prenatal vitamin with DHA and iron',
                                    'Perform daily 10-kick count tracking on your side',
                                    'Schedule gestational screenings with your OB-GYN',
                                  ],
                                  'Notify your maternity triage unit immediately if you experience decreased fetal movement.',
                                  `Week ${w} Fetal Scan`,
                                  'Obstetric Timeline'
                                );
                              }}
                              className={`p-2.5 rounded-xl border text-left transition-all ${
                                isCurrent
                                  ? 'bg-rose-100 dark:bg-rose-950/80 border-rose-400 text-rose-950 dark:text-rose-100 font-bold shadow-2xs'
                                  : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-rose-300'
                              }`}
                            >
                              <div className="flex items-center justify-between text-[11px]">
                                <span>{st.fruitEmoji} Wk {w}</span>
                                {isCurrent && <span className="text-[9px] uppercase px-1 rounded bg-rose-600 text-white">Active</span>}
                              </div>
                              <div className="text-[10px] text-stone-500 dark:text-stone-400 truncate mt-0.5">
                                {st.fruitComparison}
                              </div>
                            </button>
                          );
                        })}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-stone-200/60 dark:border-stone-700/60 text-center">
                <button
                  onClick={() => onNavigateTab('stages')}
                  className="text-xs font-bold text-stone-700 dark:text-stone-200 hover:text-emerald-700 dark:hover:text-emerald-300 underline"
                >
                  View full week-by-week timeline &rarr;
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* CARD 03: FOUR PILLARS EVIDENCE-BASED RECOMMENDATIONS           */}
        {/* ============================================================== */}
        <section id="card-recommendations" className="space-y-4 pt-4 border-t border-stone-200 dark:border-stone-800 scroll-mt-28">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 flex items-center justify-center shadow-2xs">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-stone-900 dark:text-white">
                  Four Pillars of Evidence-Based Recommendations
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                  AAP & ACOG evidence protocols · Tap any card to open the complete clinical guide
                </p>
              </div>
            </div>

            <button
              onClick={() => openPopup(isBaby ? 'baby-stage' : 'fetal-stage')}
              className="text-xs font-bold text-indigo-800 dark:text-indigo-300 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Explore Stage Guidance</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* Pillar 1: Nutrition / Screening */}
            <div
              onClick={() => openPopup(isBaby ? 'baby-rec-nutrition' : 'fetal-rec-screening')}
              className="p-4 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-emerald-300 dark:hover:border-emerald-700 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-2xl">{recs.pillar1.emoji}</span>
                  <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full uppercase">
                    Pillar 01 · {recs.pillar1.tag}
                  </span>
                </div>
                <h4 className="text-xs font-black text-stone-900 dark:text-white mb-1.5 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                  {recs.pillar1.title}
                </h4>
                <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                  {recs.pillar1.desc}
                </p>

                {/* Recipe Suggestions Teaser for Baby Nutrition */}
                {isBaby && (
                  <div className="mt-3 pt-2 border-t border-emerald-100 dark:border-emerald-900/40 space-y-1.5">
                    <span className="text-[10px] font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1">
                      <Utensils className="w-3 h-3 text-emerald-600" />
                      <span>Pediatric Recipe Suggestions:</span>
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {BABY_RECIPES.slice(0, 2).map((r) => (
                        <span
                          key={r.id}
                          className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200/60 text-emerald-950 dark:text-emerald-200 text-[10px] font-semibold flex items-center gap-1"
                        >
                          <span>{r.emoji}</span>
                          <span className="truncate max-w-[90px]">{r.title.split(' ')[0]}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-4 pt-2.5 border-t border-stone-100 dark:border-stone-800 text-[10px] font-bold text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
                <span>{isBaby ? 'View Recipes & Plan \u2192' : 'View Full Protocol \u2192'}</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Pillar 2: Sleep / Comfort */}
            <div
              onClick={() => openPopup(isBaby ? 'baby-rec-sleep' : 'fetal-rec-nutrition')}
              className="p-4 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-indigo-300 dark:hover:border-indigo-700 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-2xl">{recs.pillar2.emoji}</span>
                  <span className="text-[10px] font-bold text-indigo-800 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-full uppercase">
                    Pillar 02 · {recs.pillar2.tag}
                  </span>
                </div>
                <h4 className="text-xs font-black text-stone-900 dark:text-white mb-1.5 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                  {recs.pillar2.title}
                </h4>
                <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                  {recs.pillar2.desc}
                </p>

                {/* Recipe Suggestions Teaser for Fetal/Maternal Nutrition */}
                {!isBaby && (
                  <div className="mt-3 pt-2 border-t border-indigo-100 dark:border-indigo-900/40 space-y-1.5">
                    <span className="text-[10px] font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-1">
                      <Utensils className="w-3 h-3 text-indigo-600" />
                      <span>Maternal DHA Recipes:</span>
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {FETAL_MATERNAL_RECIPES.slice(0, 2).map((r) => (
                        <span
                          key={r.id}
                          className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200/60 text-indigo-950 dark:text-indigo-200 text-[10px] font-semibold flex items-center gap-1"
                        >
                          <span>{r.emoji}</span>
                          <span className="truncate max-w-[90px]">{r.title.split(' ')[0]}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-4 pt-2.5 border-t border-stone-100 dark:border-stone-800 text-[10px] font-bold text-indigo-800 dark:text-indigo-300 flex items-center justify-between">
                <span>{!isBaby ? 'View Recipes & Plan \u2192' : 'View Full Protocol \u2192'}</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Pillar 3: Play / Comfort */}
            <div
              onClick={() => openPopup(isBaby ? 'baby-rec-play' : 'fetal-rec-comfort')}
              className="p-4 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-300 dark:hover:border-amber-700 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-2xl">{recs.pillar3.emoji}</span>
                  <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full uppercase">
                    Pillar 03 · {recs.pillar3.tag}
                  </span>
                </div>
                <h4 className="text-xs font-black text-stone-900 dark:text-white mb-1.5 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
                  {recs.pillar3.title}
                </h4>
                <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                  {recs.pillar3.desc}
                </p>
              </div>
              <div className="mt-4 pt-2.5 border-t border-stone-100 dark:border-stone-800 text-[10px] font-bold text-amber-800 dark:text-amber-300 flex items-center justify-between">
                <span>View Full Protocol &rarr;</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Pillar 4: Safety / Bonding */}
            <div
              onClick={() => openPopup(isBaby ? 'baby-rec-safety' : 'fetal-rec-bonding')}
              className="p-4 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-rose-300 dark:hover:border-rose-700 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-2xl">{recs.pillar4.emoji}</span>
                  <span className="text-[10px] font-bold text-rose-800 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-full uppercase">
                    Pillar 04 · {recs.pillar4.tag}
                  </span>
                </div>
                <h4 className="text-xs font-black text-stone-900 dark:text-white mb-1.5 group-hover:text-rose-700 dark:group-hover:text-rose-300 transition-colors">
                  {recs.pillar4.title}
                </h4>
                <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                  {recs.pillar4.desc}
                </p>
              </div>
              <div className="mt-4 pt-2.5 border-t border-stone-100 dark:border-stone-800 text-[10px] font-bold text-rose-800 dark:text-rose-300 flex items-center justify-between">
                <span>View Full Protocol &rarr;</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* CARD 04: CLINICAL GROWTH CURVES & ULTRASOUND BIOMETRICS        */}
        {/* ============================================================== */}
        <section id="card-charts" className="space-y-4 pt-4 border-t border-stone-200 dark:border-stone-800 scroll-mt-28">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shadow-2xs">
                <LineChart className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-stone-900 dark:text-white">
                  {isBaby ? 'WHO Clinical Growth Curves' : 'Ultrasound Biometrics & Fetal Growth Curves'}
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                  {isBaby
                    ? 'Weight, Length, and Cranial Circumference multi-percentile curves calibrated against WHO 2006'
                    : 'Hadlock biometric regressions plotted against gestational age reference percentiles'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {onOpenFormulaModal && (
                <button
                  onClick={onOpenFormulaModal}
                  className="px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 text-xs font-semibold text-stone-700 dark:text-stone-200 flex items-center gap-1 shadow-2xs"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                  <span>Formula Math</span>
                </button>
              )}
              <button
                onClick={() => onNavigateTab('charts')}
                className="px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all hover:scale-105"
              >
                <span>Full Interactive View</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Chart Component embedded right in overview */}
          {isBaby ? (
            <InteractiveGrowthChart
              profile={activeProfile}
              measurements={activeBabyMeasurements}
              unitSystem={unitSystem}
              onOpenFormulaModal={onOpenFormulaModal}
            />
          ) : (
            <FetalBiometricsChart
              profile={activeProfile}
              measurements={activeFetalMeasurements}
              unitSystem={unitSystem}
              onOpenFormulaModal={onOpenFormulaModal}
            />
          )}
        </section>

        {/* ============================================================== */}
        {/* CARD 05: CDC MILESTONES CHECKLIST OR FETAL ACTIVITY TRACKER    */}
        {/* ============================================================== */}
        <section id="card-milestones-activity" className="space-y-4 pt-4 border-t border-stone-200 dark:border-stone-800 scroll-mt-28">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 flex items-center justify-center shadow-2xs">
                {isBaby ? <CheckSquare className="w-4 h-4" /> : <HeartPulse className="w-4 h-4" />}
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-stone-900 dark:text-white">
                  {isBaby ? 'CDC Developmental Milestones Checklist' : 'ACOG Fetal Kick Counter & Activity Tracker'}
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                  {isBaby
                    ? 'Track movement, language, cognitive, and social milestones (Tap items for clinical guides)'
                    : 'Count 10 distinct movements to verify healthy fetal activity & placental oxygenation'}
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab(isBaby ? 'milestones' : 'fetal-hub')}
              className="px-3.5 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-xs font-bold text-stone-700 dark:text-stone-200 flex items-center gap-1.5 shadow-2xs hover:scale-105 transition-all"
            >
              <span>Open Dedicated Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Baby Milestones Preview or Fetal Kick Counter Tool */}
          {isBaby ? (
            <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-5 sm:p-6 shadow-xs transition-colors space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-stone-100 dark:border-stone-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold text-xs">
                    {milestoneCompletionPct}%
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-900 dark:text-white block">
                      {currentAgeBracket?.label} Surveillance
                    </span>
                    <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-400">
                      {completedCount} of {bracketMilestones.length} achieved (Tap any milestone for home recommendations)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  {(['all', 'movement', 'language', 'cognitive', 'social'] as const).map((dom) => (
                    <button
                      key={dom}
                      onClick={() => setMilestoneDomainFilter(dom)}
                      className={`px-3 py-1 text-xs rounded-xl font-bold transition-all ${
                        milestoneDomainFilter === dom
                          ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-2xs'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900'
                      }`}
                    >
                      {dom === 'all' ? 'All Domains' : CATEGORY_METADATA[dom]?.label.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {bracketMilestones
                  .filter((m) => milestoneDomainFilter === 'all' || m.category === milestoneDomainFilter)
                  .map((item) => {
                    const isDone = activeCompletedMilestones.some((c) => c.milestoneId === item.id);
                    return (
                      <div
                        key={item.id}
                        className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                          isDone
                            ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-900/60'
                            : 'bg-stone-50 dark:bg-stone-800/60 border-stone-200/70 dark:border-stone-700/60 hover:border-emerald-300'
                        }`}
                      >
                        <div
                          onClick={() => openMilestonePointer(item)}
                          className="cursor-pointer flex-1 group"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                              {CATEGORY_METADATA[item.category].label}
                            </span>
                            <span className="text-[10px] text-stone-400 group-hover:text-emerald-600 font-semibold flex items-center gap-0.5">
                              <span>ⓘ Guide</span>
                            </span>
                          </div>
                          <h4
                            className={`text-xs font-bold group-hover:text-emerald-800 dark:group-hover:text-emerald-300 transition-colors ${
                              isDone ? 'line-through text-stone-500 dark:text-stone-400' : 'text-stone-900 dark:text-white'
                            }`}
                          >
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        <button
                          onClick={() => {
                            if (!isDone) {
                              confetti({ particleCount: 35, spread: 50, origin: { y: 0.8 } });
                            }
                            toggleMilestone(item.id);
                          }}
                          className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                            isDone
                              ? 'bg-emerald-700 text-white shadow-xs'
                              : 'border-2 border-stone-300 dark:border-stone-600 hover:border-emerald-600 text-transparent'
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-5 sm:p-6 shadow-xs transition-colors space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100 dark:border-stone-800">
                <div>
                  <h3 className="text-sm sm:text-base font-black text-stone-900 dark:text-white">
                    Active Fetal Movement Counter & Session Tracker
                  </h3>
                  <button
                    onClick={() => openPopup('fetal-kicks')}
                    className="text-xs text-rose-800 dark:text-rose-300 font-semibold hover:underline text-left block mt-0.5"
                  >
                    ACOG standard: Feel 10 distinct movements within a 2-hour resting window &rarr;
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <div className="font-mono text-sm font-bold bg-stone-100 dark:bg-stone-800 px-3 py-1.5 rounded-xl text-stone-800 dark:text-stone-200">
                    {Math.floor(timerSeconds / 60).toString().padStart(2, '0')}:{(timerSeconds % 60).toString().padStart(2, '0')}
                  </div>

                  <button
                    onClick={() => setIsTimerActive((t) => !t)}
                    className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 transition-colors"
                  >
                    {isTimerActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => {
                      setIsTimerActive(false);
                      setTimerSeconds(0);
                      setLiveKicksCount(0);
                    }}
                    className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      const nextCount = liveKicksCount + 1;
                      setLiveKicksCount(nextCount);
                      if (nextCount === 10) {
                        confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
                        addKickSession({
                          date: new Date().toISOString().split('T')[0],
                          startTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                          durationSeconds: timerSeconds || 1200,
                          kicksCount: 10,
                          targetReached: true,
                          notes: 'Completed 10-kick ACOG surveillance window',
                        });
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black shadow-xs flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                  >
                    <span>+ Log Kick</span>
                    <span className="w-5 h-5 rounded-full bg-white/25 flex items-center justify-center text-[10px]">
                      {liveKicksCount}
                    </span>
                  </button>
                </div>
              </div>

              {/* Recent Kick Sessions preview */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Recent Recorded Sessions</span>
                  <button
                    onClick={() => onNavigateTab('fetal-hub')}
                    className="text-rose-700 dark:text-rose-400 font-bold hover:underline"
                  >
                    All Sessions &rarr;
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {activeKickSessions.slice(-2).map((s) => (
                    <div
                      key={s.id}
                      onClick={() => openPopup('fetal-kicks')}
                      className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/60 flex items-center justify-between cursor-pointer hover:border-rose-300 transition-colors"
                    >
                      <div>
                        <div className="font-bold text-stone-900 dark:text-white">{s.date} at {s.startTime}</div>
                        <div className="text-[11px] text-stone-500 dark:text-stone-400">{Math.round(s.durationSeconds / 60)} min · {s.notes}</div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
                        {s.kicksCount} kicks ✓
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ============================================================== */}
        {/* CARD 06: CLINICAL MEASUREMENT LOGS & VISIT HISTORY             */}
        {/* ============================================================== */}
        <section id="card-clinical-logs" className="space-y-4 pt-4 border-t border-stone-200 dark:border-stone-800 scroll-mt-28">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 flex items-center justify-center shadow-2xs">
                <ClipboardList className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-stone-900 dark:text-white">
                  Clinical Measurement Logs & Visit History
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                  Doctor visits, ultrasound scans, and biometrics records
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {onOpenExportModal && (
                <button
                  onClick={onOpenExportModal}
                  className="px-3.5 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 text-xs font-bold text-stone-700 dark:text-stone-200 flex items-center gap-1.5 shadow-2xs"
                >
                  <FileText className="w-3.5 h-3.5 text-stone-500" />
                  <span>Export Report</span>
                </button>
              )}
              <button
                onClick={() => onNavigateTab('logs')}
                className="px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 text-xs font-bold shadow-xs transition-all hover:scale-105"
              >
                <span>View Full Logbook</span>
              </button>
            </div>
          </div>

          {/* Logs Table Card */}
          <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-5 sm:p-6 shadow-xs transition-colors overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-100 dark:border-stone-800 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                  <th className="pb-3">Date</th>
                  <th className="pb-3">{isBaby ? 'Age / Stage' : 'Gestational Age'}</th>
                  <th className="pb-3">{isBaby ? 'Weight' : 'EFW Weight'}</th>
                  <th className="pb-3">{isBaby ? 'Length / Head' : 'Biometrics'}</th>
                  <th className="pb-3">Clinical Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800 text-stone-700 dark:text-stone-300">
                {isBaby ? (
                  activeBabyMeasurements.slice(-3).reverse().map((m) => (
                    <tr
                      key={m.id}
                      onClick={() => openPopup('baby-weight')}
                      className="hover:bg-stone-50/70 dark:hover:bg-stone-800/40 cursor-pointer transition-colors"
                    >
                      <td className="py-3.5 font-bold text-stone-900 dark:text-white">{m.date}</td>
                      <td className="py-3.5 font-medium">Month {m.ageInMonths} ({m.ageInWeeks || Math.floor(m.ageInMonths * 4.345)}w)</td>
                      <td className="py-3.5 font-black text-emerald-800 dark:text-emerald-400">
                        {m.weightKg ? UnitConverter.formatWeight(m.weightKg, unitSystem) : '—'}
                      </td>
                      <td className="py-3.5 font-medium">
                        {m.lengthCm ? UnitConverter.formatLength(m.lengthCm, unitSystem) : '—'} · {m.headCircumferenceCm ? `${m.headCircumferenceCm}cm` : '—'}
                      </td>
                      <td className="py-3.5 text-[11px] text-stone-500 dark:text-stone-400 max-w-xs truncate">{m.notes}</td>
                    </tr>
                  ))
                ) : (
                  activeFetalMeasurements.slice(-3).reverse().map((m) => (
                    <tr
                      key={m.id}
                      onClick={() => openPopup('fetal-efw')}
                      className="hover:bg-stone-50/70 dark:hover:bg-stone-800/40 cursor-pointer transition-colors"
                    >
                      <td className="py-3.5 font-bold text-stone-900 dark:text-white">{m.date}</td>
                      <td className="py-3.5 font-medium">Week {m.gestationalWeeks}, Day {m.gestationalDays}</td>
                      <td className="py-3.5 font-black text-emerald-800 dark:text-emerald-400">
                        {m.efwGrams ? UnitConverter.formatFetalWeight(m.efwGrams, unitSystem) : '—'}
                      </td>
                      <td className="py-3.5 font-medium">BPD {m.bpdMm || '—'} · AC {m.acMm || '—'} · FL {m.flMm || '—'}</td>
                      <td className="py-3.5 text-[11px] text-stone-500 dark:text-stone-400 max-w-xs truncate">{m.notes}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* ============================================================== */}
        {/* CARD 07: KEEPSAKE & PARENT LOVE NOTES MEMORY VAULT              */}
        {/* ============================================================== */}
        <section id="card-love-notes" className="space-y-4 pt-4 border-t border-stone-200 dark:border-stone-800 scroll-mt-28">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 flex items-center justify-center shadow-2xs">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-stone-900 dark:text-white">
                  Parent Wishes & Keepsake Love Notes
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                  Cherished memories, hopes, and messages recorded along every milestone
                </p>
              </div>
            </div>

            {onOpenLoveNoteModal && (
              <button
                onClick={() =>
                  onOpenLoveNoteModal(
                    isBaby ? `Week ${currentBabyWeeks}` : `Gestational Week ${currentFetalWeek}`
                  )
                }
                className="px-4 py-2 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ Write Love Note</span>
              </button>
            )}
          </div>

          {/* Love notes scrapbook grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {activeLoveNotes.length > 0 ? (
              activeLoveNotes.map((note) => (
                <div
                  key={note.id}
                  className="p-5 rounded-3xl bg-amber-50/60 dark:bg-stone-900 border border-amber-200/70 dark:border-stone-800 shadow-xs flex flex-col justify-between hover:shadow-md transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-bold text-amber-900 dark:text-amber-400 bg-amber-100/80 dark:bg-amber-950/60 px-2 py-0.5 rounded-full text-[10px]">
                        {note.stageLabel}
                      </span>
                      <span className="text-[11px] text-stone-400">{note.date}</span>
                    </div>
                    <p className="text-xs text-stone-700 dark:text-stone-300 italic leading-relaxed">
                      "{note.content}"
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-amber-200/40 dark:border-stone-800 text-[10px] text-stone-400 flex items-center justify-between">
                    <span>With love, {note.author}</span>
                    <span>♥</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full p-8 rounded-3xl bg-white dark:bg-stone-900 border border-dashed border-stone-300 dark:border-stone-700 text-center space-y-2">
                <span className="text-3xl">💌</span>
                <h4 className="text-sm font-bold text-stone-900 dark:text-white">
                  No love notes recorded yet for {activeProfile.name}
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
                  Write down your wishes, emotional reflections, and tender thoughts to look back on years from now.
                </p>
                {onOpenLoveNoteModal && (
                  <button
                    onClick={() =>
                      onOpenLoveNoteModal(
                        isBaby ? `Week ${currentBabyWeeks}` : `Gestational Week ${currentFetalWeek}`
                      )
                    }
                    className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Write First Keepsake Note</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* ============================================================== */}
      {/* 3. INTERACTIVE POP-UP CARD FOR POINTERS & DETAILED RECOMMENDATIONS */}
      {/* ============================================================== */}
      <CardDetailPopupModal
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        type={popupType}
        profile={activeProfile}
        unitSystem={unitSystem}
        data={{
          weightKg: latestBabyM?.weightKg,
          weightPct: weightPct?.percentile,
          lengthCm: latestBabyM?.lengthCm,
          lengthPct: lengthPct?.percentile,
          headCircumferenceCm: latestBabyM?.headCircumferenceCm,
          hcPct: hcPct?.percentile,
          completedMilestonesCount: activeCompletedMilestones.length,
          totalMilestonesCount: bracketMilestones.length || 8,
          currentBabyWeeks,
          currentBabyMonth,
          gestationalWeeks: gestationalAgeInfo?.weeks || 28,
          gestationalDays: gestationalAgeInfo?.days || 0,
          efwGrams: latestFetalM?.efwGrams || 1040,
          fruitEmoji: activeFetalStage?.fruitEmoji || '🍆',
          fruitName: activeFetalStage?.fruitComparison || 'Eggplant',
          fruitLength: activeFetalStage?.babyLength || '~37.6 cm',
          milestoneItem: selectedMilestoneItem,
          ...customPointerData,
        }}
      />
    </>
  );
};
