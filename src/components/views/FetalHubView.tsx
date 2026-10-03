import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FETAL_WEEK_DATA,
  calculateGestationalAge,
  getFetalBiometricRef,
  FetalWeekMilestone,
} from '../../data/fetalStandards';
import { calculateGestationalAgeWithSettings } from '../../data/formulaSources';
import { getFetalWeekRecommendations } from '../../data/stagesExpectationsData';
import { FetalBiometricsChart } from '../charts/FetalBiometricsChart';
import { UnitConverter } from '../../data/growthStandards';
import {
  HeartPulse,
  Timer,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Info,
  CheckCircle2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  BookOpen,
  Sliders,
  ShieldCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  CardDetailPopupModal,
  PopupCardType,
} from '../modals/CardDetailPopupModal';

interface FetalHubViewProps {
  onOpenLogModal: () => void;
  onOpenFormulaModal?: () => void;
}

export const FetalHubView: React.FC<FetalHubViewProps> = ({
  onOpenLogModal,
  onOpenFormulaModal,
}) => {
  const {
    activeProfile,
    activeFetalMeasurements,
    activeKickSessions,
    addKickSession,
    deleteKickSession,
    unitSystem,
    formulaSettings,
  } = useApp();

  if (!activeProfile) return null;

  // Calculate current gestational age based on active formula settings
  const ga = calculateGestationalAgeWithSettings(activeProfile.dateOfEvent, formulaSettings);
  const currentWeek = Math.max(4, Math.min(42, ga.weeks || 28));

  const [selectedWeek, setSelectedWeek] = useState<number>(currentWeek);

  // Auto toggle to current week on profile switch
  useEffect(() => {
    setSelectedWeek(currentWeek);
  }, [activeProfile?.id, currentWeek]);

  // Kick Counter State
  const [isCounting, setIsCounting] = useState(false);
  const [kickCount, setKickCount] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [kickNotes, setKickNotes] = useState('');

  // Popup modal state for pointer details
  const [popupType, setPopupType] = useState<PopupCardType | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = (type: PopupCardType) => {
    setPopupType(type);
    setIsPopupOpen(true);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isCounting) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isCounting]);

  const handleStartKickSession = () => {
    setIsCounting(true);
    setKickCount(0);
    setElapsedSeconds(0);
  };

  const handleKickTap = () => {
    if (!isCounting) {
      setIsCounting(true);
    }
    const nextCount = kickCount + 1;
    setKickCount(nextCount);

    if (nextCount === 10) {
      setIsCounting(false);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
      // Save session
      addKickSession({
        date: new Date().toISOString().split('T')[0],
        startTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        durationSeconds: elapsedSeconds,
        kicksCount: 10,
        targetReached: true,
        notes: kickNotes || 'Target of 10 kicks reached successfully.',
      });
    }
  };

  const handleResetKickSession = () => {
    setIsCounting(false);
    setKickCount(0);
    setElapsedSeconds(0);
  };

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Find week data
  const weekData: FetalWeekMilestone =
    FETAL_WEEK_DATA.find((w) => w.week === selectedWeek) ||
    FETAL_WEEK_DATA[FETAL_WEEK_DATA.length - 1];

  const daysUntilDue = Math.max(0, 280 - ga.totalDays);

  return (
    <div className="space-y-6">
      {/* Hero Gestational Status Banner */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 md:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
              <span>Gestational Age Progress</span>
              <span aria-hidden="true">·</span>
              <span>Due: {activeProfile.dateOfEvent}</span>
            </div>
            <h2 className="text-2xl font-bold text-stone-900 tracking-tight">
              Week {ga.weeks}, Day {ga.days}
            </h2>
            <div className="flex items-center gap-2 mt-1 text-xs text-stone-600">
              <span className="font-semibold text-amber-900">
                {ga.weeks <= 13 ? '1st Trimester' : ga.weeks <= 26 ? '2nd Trimester' : '3rd Trimester'}
              </span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>{daysUntilDue} days remaining until estimated due date</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenFormulaModal && (
              <button
                onClick={onOpenFormulaModal}
                className="px-3 py-2 text-xs font-semibold text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-xl transition-colors flex items-center gap-1.5"
                title="View mathematical formulas and peer-reviewed sources"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-800" />
                <span>Formula: {formulaSettings.fetalEfwFormula.toUpperCase()}</span>
              </button>
            )}
            <button
              onClick={onOpenLogModal}
              className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl shadow-xs transition-colors shrink-0"
            >
              Log Ultrasound Scan
            </button>
          </div>
        </div>

        {/* 40-Week Progress Bar */}
        <div className="mt-4 pt-3 border-t border-stone-100">
          <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1.5">
            <span>Conception</span>
            <span className="font-semibold text-stone-800">{Math.round((ga.weeks / 40) * 100)}% of pregnancy</span>
            <span>40 Weeks (Due Date)</span>
          </div>
          <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-600 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(5, (ga.weeks / 40) * 100))}%` }}
            ></div>
          </div>

          {/* Formula calculation badge */}
          <div className="mt-3 pt-2.5 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-medium text-stone-700">Calculation Method:</span>
              <span className="bg-stone-100 px-2 py-0.5 rounded text-stone-800 font-mono text-[11px]">
                {ga.methodUsed}
              </span>
              <span className="text-stone-300">·</span>
              <span className="bg-stone-100 px-2 py-0.5 rounded text-stone-800 font-mono text-[11px]">
                EFW Standard: {formulaSettings.fetalEfwFormula.toUpperCase()}
              </span>
            </div>
            {onOpenFormulaModal && (
              <button
                onClick={onOpenFormulaModal}
                className="text-amber-800 hover:text-amber-900 font-semibold underline text-xs"
              >
                Change or customize formula &rarr;
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Week-by-Week Interactive Navigator */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 md:p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <h3 className="text-base font-bold text-stone-900">
              Week-by-Week Fetal Growth & Size Comparison
            </h3>
          </div>

          {/* Quick prev / next buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                const prev = FETAL_WEEK_DATA.filter((w) => w.week < selectedWeek).pop();
                if (prev) setSelectedWeek(prev.week);
              }}
              disabled={selectedWeek <= FETAL_WEEK_DATA[0].week}
              className="p-1 rounded-lg border border-stone-200 hover:bg-stone-50 disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft className="w-4 h-4 text-stone-600" />
            </button>
            <span className="text-xs font-semibold px-2">Week {selectedWeek}</span>
            <button
              onClick={() => {
                const next = FETAL_WEEK_DATA.find((w) => w.week > selectedWeek);
                if (next) setSelectedWeek(next.week);
              }}
              disabled={selectedWeek >= FETAL_WEEK_DATA[FETAL_WEEK_DATA.length - 1].week}
              className="p-1 rounded-lg border border-stone-200 hover:bg-stone-50 disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronRight className="w-4 h-4 text-stone-600" />
            </button>
          </div>
        </div>

        {/* Week Select Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-3 scrollbar-none border-b border-stone-100">
          {FETAL_WEEK_DATA.map((w) => {
            const isSel = selectedWeek === w.week;
            const isCur = ga.weeks === w.week;
            return (
              <button
                key={w.week}
                onClick={() => setSelectedWeek(w.week)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  isSel
                    ? 'bg-amber-800 text-white font-semibold'
                    : isCur
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-600'
                }`}
              >
                <span>Wk {w.week}</span> {w.fruitEmoji}
              </button>
            );
          })}
        </div>

        {/* Week Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
          {/* Fruit / Size Visualizer */}
          <div className="bg-amber-50/50 rounded-xl border border-amber-200/60 p-5 flex flex-col items-center justify-center text-center">
            <div className="text-6xl mb-2">{weekData.fruitEmoji}</div>
            <div className="text-xs text-amber-900 font-semibold uppercase tracking-wider">
              Size of a
            </div>
            <div className="text-lg font-bold text-amber-950 mt-0.5">
              {weekData.fruitComparison}
            </div>

            <div className="grid grid-cols-2 gap-3 w-full mt-4 pt-4 border-t border-amber-200/60 text-xs">
              <div className="p-2 bg-white/80 rounded-lg">
                <span className="text-[10px] text-stone-500 block">Length</span>
                <span className="font-semibold text-stone-900">
                  {unitSystem === 'metric'
                    ? `${weekData.avgLengthCm} cm`
                    : `${weekData.avgLengthInches} in`}
                </span>
              </div>
              <div className="p-2 bg-white/80 rounded-lg">
                <span className="text-[10px] text-stone-500 block">Weight</span>
                <span className="font-semibold text-stone-900">
                  {unitSystem === 'metric'
                    ? `${weekData.avgWeightGrams} g`
                    : `${weekData.avgWeightOz} oz`}
                </span>
              </div>
            </div>
          </div>

          {/* Anatomical Milestones */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Anatomical Highlights
            </h4>
            <div className="space-y-2">
              {weekData.anatomicalHighlights.map((highlight, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-stone-800 bg-stone-50 p-2.5 rounded-lg border border-stone-200/60">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Maternal Body & Clinical Guidance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Maternal Health & Body Changes
            </h4>
            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200/60 text-xs text-stone-700 leading-relaxed">
              {weekData.maternalBodyNotes}
            </div>

            <div className="p-3 bg-amber-50/60 dark:bg-amber-950/30 rounded-xl border border-amber-200/50 dark:border-amber-900/40 text-[11px] text-amber-950 dark:text-amber-200 flex items-start gap-2">
              <Info className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
              <span>
                Standard fetal weight estimates can vary naturally by ±10-15% without clinical concern.
              </span>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Clinical & Maternal Care for this Week */}
        {(() => {
          const recs = getFetalWeekRecommendations(selectedWeek);
          return (
            <div className="mt-6 pt-5 border-t border-stone-100 dark:border-stone-800">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                    ACOG Recommendations for Week {selectedWeek}
                  </h4>
                </div>
                <span className="text-[10px] font-semibold text-stone-500 dark:text-stone-400">
                  Clinical Care Plan
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-base">{recs.pillar1.emoji}</span>
                    <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase">
                      {recs.pillar1.tag}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-emerald-950 dark:text-emerald-100 mb-0.5">
                    {recs.pillar1.title}
                  </div>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                    {recs.pillar1.desc}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-base">{recs.pillar2.emoji}</span>
                    <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase">
                      {recs.pillar2.tag}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-amber-950 dark:text-amber-100 mb-0.5">
                    {recs.pillar2.title}
                  </div>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                    {recs.pillar2.desc}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-900/40">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-base">{recs.pillar3.emoji}</span>
                    <span className="text-[10px] font-bold text-indigo-800 dark:text-indigo-300 uppercase">
                      {recs.pillar3.tag}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-indigo-950 dark:text-indigo-100 mb-0.5">
                    {recs.pillar3.title}
                  </div>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                    {recs.pillar3.desc}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-900/40">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-base">{recs.pillar4.emoji}</span>
                    <span className="text-[10px] font-bold text-rose-800 dark:text-rose-300 uppercase">
                      {recs.pillar4.tag}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-rose-950 dark:text-rose-100 mb-0.5">
                    {recs.pillar4.title}
                  </div>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                    {recs.pillar4.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Ultrasound Biometrics Chart */}
      <FetalBiometricsChart
        profile={activeProfile}
        measurements={activeFetalMeasurements}
        unitSystem={unitSystem}
      />

      {/* Fetal Kick Counter Section */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 md:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2">
              <HeartPulse className="w-4 h-4 text-rose-600" />
              <h3 className="text-base font-bold text-stone-900">Fetal Kick Counter</h3>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Standard ACOG protocol: Track how long it takes to feel 10 distinct baby kicks or rolls.
            </p>
          </div>

          {/* Timer Display */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 font-mono text-sm font-semibold bg-stone-100 px-3 py-1.5 rounded-lg text-stone-800">
              <Timer className="w-4 h-4 text-stone-500" />
              <span>{formatTimer(elapsedSeconds)}</span>
            </div>

            {isCounting ? (
              <button
                onClick={() => setIsCounting(false)}
                className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-600"
                title="Pause timer"
              >
                <Pause className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setIsCounting(true)}
                className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-600"
                title="Resume timer"
              >
                <Play className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={handleResetKickSession}
              className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-600"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Kick Tap Hero Button */}
        <div className="py-6 flex flex-col items-center justify-center">
          <button
            onClick={handleKickTap}
            className="w-36 h-36 rounded-full bg-rose-50 border-4 border-rose-300 hover:border-rose-400 active:scale-95 transition-all flex flex-col items-center justify-center shadow-sm select-none cursor-pointer group"
          >
            <HeartPulse className="w-8 h-8 text-rose-600 group-hover:scale-110 transition-transform" />
            <span className="text-2xl font-black text-rose-900 mt-1">{kickCount}/10</span>
            <span className="text-[10px] font-semibold text-rose-700 uppercase tracking-wider">
              Tap for Kick
            </span>
          </button>
          <span className="text-xs text-stone-500 mt-3">
            {kickCount === 0
              ? 'Tap button when baby moves or kicks'
              : `${10 - kickCount} kicks remaining to reach target of 10`}
          </span>
        </div>

        {/* Kick Session History Table */}
        {activeKickSessions.length > 0 && (
          <div className="mt-4 pt-4 border-t border-stone-100">
            <h4 className="text-xs font-semibold text-stone-700 mb-2">Recent Kick Sessions</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-stone-100 text-stone-400 text-[11px]">
                    <th className="py-2">Date</th>
                    <th className="py-2">Start Time</th>
                    <th className="py-2">Duration</th>
                    <th className="py-2">Kicks</th>
                    <th className="py-2">Notes</th>
                    <th className="py-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-mono text-[11px] text-stone-700">
                  {activeKickSessions.map((k) => (
                    <tr key={k.id}>
                      <td className="py-2">{k.date}</td>
                      <td className="py-2">{k.startTime}</td>
                      <td className="py-2">{formatTimer(k.durationSeconds)}</td>
                      <td className="py-2 font-semibold text-emerald-800">{k.kicksCount} kicks</td>
                      <td className="py-2 font-sans text-stone-500">{k.notes || '—'}</td>
                      <td className="py-2 text-right">
                        <button
                          onClick={() => deleteKickSession(k.id)}
                          className="text-stone-400 hover:text-rose-600 underline font-sans text-[11px]"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Pop-up detail modal for pointers & protocols */}
      <CardDetailPopupModal
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        type={popupType}
        profile={activeProfile}
        unitSystem={unitSystem}
        data={{
          gestationalWeeks: ga.weeks || 28,
          gestationalDays: ga.days || 0,
          fruitEmoji: weekData.fruitEmoji || '🍆',
          fruitName: weekData.fruitComparison || 'Eggplant',
          fruitLength: weekData.avgLengthCm ? `${weekData.avgLengthCm} cm (${weekData.avgLengthInches} in)` : '~37.6 cm',
          kicksCount: kickCount,
        }}
      />
    </div>
  );
};
