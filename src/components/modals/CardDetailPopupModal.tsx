import React from 'react';
import {
  X,
  Scale,
  Ruler,
  Brain,
  Sparkles,
  TrendingUp,
  HeartPulse,
  Heart,
  Calendar,
  AlertCircle,
  Apple,
  Footprints,
  Baby,
  Stethoscope,
  Info,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Utensils,
  Clock,
  BookOpen,
} from 'lucide-react';
import { ChildProfile, UnitSystem } from '../../types';
import { UnitConverter } from '../../data/growthStandards';
import {
  BABY_RECIPES,
  FETAL_MATERNAL_RECIPES,
} from '../../data/recipeData';

export type PopupCardType =
  | 'baby-weight'
  | 'baby-length'
  | 'baby-head'
  | 'baby-milestones'
  | 'baby-stage'
  | 'baby-rec-nutrition'
  | 'baby-rec-sleep'
  | 'baby-rec-play'
  | 'baby-rec-safety'
  | 'fetal-gestational-age'
  | 'fetal-efw'
  | 'fetal-size'
  | 'fetal-kicks'
  | 'fetal-stage'
  | 'fetal-rec-screening'
  | 'fetal-rec-comfort'
  | 'fetal-rec-nutrition'
  | 'fetal-rec-bonding'
  | 'milestone-detail'
  | 'pointer-detail'
  | 'fetal-heartbeat'
  | 'fontanelle-detail'
  | 'awake-window-detail'
  | 'recipe-suggestions';

interface CardDetailPopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: PopupCardType | null;
  profile: ChildProfile;
  unitSystem: UnitSystem;
  data?: {
    weightKg?: number;
    weightPct?: number;
    lengthCm?: number;
    lengthPct?: number;
    headCircumferenceCm?: number;
    hcPct?: number;
    completedMilestonesCount?: number;
    totalMilestonesCount?: number;
    currentBabyWeeks?: number;
    currentBabyMonth?: number;
    gestationalWeeks?: number;
    gestationalDays?: number;
    efwGrams?: number;
    fruitEmoji?: string;
    fruitName?: string;
    fruitLength?: string;
    kicksCount?: number;
    milestoneItem?: {
      id: string;
      title: string;
      description: string;
      category: string;
      tips?: string;
      recommendation?: string;
      whenToConsult?: string;
    };
    pointerTitle?: string;
    pointerCategory?: string;
    pointerBadge?: string;
    pointerDesc?: string;
    pointerEvidence?: string;
    pointerActionSteps?: string[];
    pointerWhenToConsult?: string;
  };
}

export const CardDetailPopupModal: React.FC<CardDetailPopupModalProps> = ({
  isOpen,
  onClose,
  type,
  profile,
  unitSystem,
  data = {},
}) => {
  if (!isOpen || !type) return null;

  const isBaby = profile.type === 'baby';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 dark:bg-black/75 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with profile-based tint */}
        <div
          className={`p-4 sm:p-5 flex items-center justify-between border-b ${
            isBaby
              ? 'bg-linear-to-r from-emerald-500/10 via-teal-500/10 to-transparent border-emerald-100 dark:border-stone-800'
              : 'bg-linear-to-r from-rose-500/10 via-amber-500/10 to-transparent border-rose-100 dark:border-stone-800'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-2xl flex items-center justify-center text-white shadow-xs ${
                isBaby ? 'bg-emerald-700 dark:bg-emerald-600' : 'bg-rose-700 dark:bg-rose-600'
              }`}
            >
              {type === 'baby-weight' && <Scale className="w-4 h-4" />}
              {type === 'baby-length' && <Ruler className="w-4 h-4" />}
              {type === 'baby-head' && <Brain className="w-4 h-4" />}
              {type === 'baby-milestones' && <Sparkles className="w-4 h-4" />}
              {type === 'baby-stage' && <Baby className="w-4 h-4" />}
              {type === 'baby-rec-nutrition' && <Apple className="w-4 h-4" />}
              {type === 'baby-rec-sleep' && <Sparkles className="w-4 h-4" />}
              {type === 'baby-rec-play' && <Baby className="w-4 h-4" />}
              {type === 'baby-rec-safety' && <ShieldCheck className="w-4 h-4" />}
              {type === 'fetal-gestational-age' && <Calendar className="w-4 h-4" />}
              {type === 'fetal-efw' && <Scale className="w-4 h-4" />}
              {type === 'fetal-size' && <Apple className="w-4 h-4" />}
              {type === 'fetal-kicks' && <HeartPulse className="w-4 h-4" />}
              {type === 'fetal-stage' && <Footprints className="w-4 h-4" />}
              {type === 'fetal-rec-screening' && <Stethoscope className="w-4 h-4" />}
              {type === 'fetal-rec-comfort' && <Heart className="w-4 h-4" />}
              {type === 'fetal-rec-nutrition' && <Apple className="w-4 h-4" />}
              {type === 'fetal-rec-bonding' && <HeartPulse className="w-4 h-4" />}
              {type === 'milestone-detail' && <CheckCircle2 className="w-4 h-4" />}
              {type === 'pointer-detail' && <Info className="w-4 h-4" />}
              {type === 'fetal-heartbeat' && <HeartPulse className="w-4 h-4 text-rose-300 animate-pulse" />}
              {type === 'fontanelle-detail' && <Brain className="w-4 h-4" />}
              {type === 'awake-window-detail' && <Sparkles className="w-4 h-4" />}
              {type === 'recipe-suggestions' && <Utensils className="w-4 h-4 text-emerald-600" />}
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-stone-900 dark:text-white">
                {type === 'baby-weight' && 'Weight & Growth Velocity'}
                {type === 'baby-length' && 'Length & Skeletal Stature'}
                {type === 'baby-head' && 'Head Circumference & Brain Growth'}
                {type === 'baby-milestones' && 'CDC Developmental Milestones'}
                {type === 'baby-stage' && `Week ${data.currentBabyWeeks || 1} Growth & Leaps`}
                {type === 'baby-rec-nutrition' && 'Infant Nutrition & Feeding Plan'}
                {type === 'baby-rec-sleep' && 'Sleep Architecture & Wake Windows'}
                {type === 'baby-rec-play' && 'Developmental & Sensory Play Guide'}
                {type === 'baby-rec-safety' && 'Pediatric Care & Safety Protocols'}
                {type === 'fetal-gestational-age' && `Gestational Week ${data.gestationalWeeks || 28}`}
                {type === 'fetal-efw' && 'Estimated Fetal Weight (Hadlock)'}
                {type === 'fetal-size' && 'Botanical Size & Anatomy'}
                {type === 'fetal-kicks' && 'ACOG Fetal Kick Count Protocol'}
                {type === 'fetal-stage' && `Week ${data.gestationalWeeks || 28} Womb Wonder`}
                {type === 'fetal-rec-screening' && 'Clinical Screenings & Tests Checklist'}
                {type === 'fetal-rec-comfort' && 'Maternal Comfort & Side Sleeping'}
                {type === 'fetal-rec-nutrition' && 'Maternal Nutrition & Brain DHA'}
                {type === 'fetal-rec-bonding' && 'Fetal Bonding & Movement Rhythm'}
                {type === 'milestone-detail' && (data.milestoneItem?.title || 'Developmental Milestone Detail')}
                {type === 'pointer-detail' && (data.pointerTitle || 'Clinical Detail & Guidance')}
                {type === 'fetal-heartbeat' && 'Fetal Cardiac Rhythm & Physiology'}
                {type === 'fontanelle-detail' && 'Cranial Sutures & Fontanelle Assessment'}
                {type === 'awake-window-detail' && 'Age-Appropriate Awake Windows & Sleep'}
                {type === 'recipe-suggestions' &&
                  (isBaby
                    ? 'Pediatric Recipe & Meal Suggestions'
                    : 'Maternal-Fetal Nourishment Recipes')}
              </h3>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                {profile.name} · {data.pointerCategory || 'Evidence-based pediatric & clinical guidance'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto">
          {/* ===================== BABY WEIGHT ===================== */}
          {type === 'baby-weight' && (
            <>
              {/* Visual Metric & Percentile Meter */}
              <div className="bg-emerald-50/60 dark:bg-emerald-950/30 rounded-2xl p-4 border border-emerald-200/70 dark:border-emerald-900/40">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-900 dark:text-emerald-300">
                    Current Weight
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                    WHO Standard
                  </span>
                </div>
                <div className="text-2xl font-bold text-stone-900 dark:text-white mt-1">
                  {data.weightKg ? UnitConverter.formatWeight(data.weightKg, unitSystem) : '9.12 kg'}
                </div>

                {/* Percentile visual track */}
                <div className="mt-3">
                  <div className="flex justify-between text-[10px] text-stone-500 dark:text-stone-400 mb-1 font-medium">
                    <span>3rd pct</span>
                    <span className="text-emerald-800 dark:text-emerald-300 font-bold">
                      {data.weightPct ?? 54}th Percentile (Ideal Median)
                    </span>
                    <span>97th pct</span>
                  </div>
                  <div className="w-full h-2.5 bg-stone-200 dark:bg-stone-700 rounded-full relative overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-emerald-500 to-teal-400 rounded-full"
                      style={{ width: `${Math.min(100, Math.max(5, data.weightPct ?? 54))}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Visual Insights Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/60">
                  <div className="flex items-center gap-1.5 text-stone-500 dark:text-stone-400 text-[10px] font-semibold uppercase">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    Gain Velocity
                  </div>
                  <div className="font-bold text-stone-900 dark:text-white mt-1 text-sm">
                    +110g to 160g / wk
                  </div>
                  <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-0.5">Healthy steady curve</p>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/60">
                  <div className="flex items-center gap-1.5 text-stone-500 dark:text-stone-400 text-[10px] font-semibold uppercase">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                    Z-Score
                  </div>
                  <div className="font-bold text-stone-900 dark:text-white mt-1 text-sm">
                    +0.12 SD
                  </div>
                  <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-0.5">Optimal growth trajectory</p>
                </div>
              </div>

              {/* Actionable Recommendations */}
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300">
                  Pediatric Recommendations
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-2.5">
                    <span className="text-base">🥑</span>
                    <div>
                      <div className="font-semibold text-emerald-950 dark:text-emerald-200">
                        Nutritional Balance
                      </div>
                      <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                        Pair breastmilk/formula with iron-rich foods (purees, soft avocado, scrambled egg yolk, shredded meats) 2–3 times daily.
                      </p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2.5">
                    <span className="text-base">🩺</span>
                    <div>
                      <div className="font-semibold text-amber-950 dark:text-amber-200">
                        When to Consult Doctor
                      </div>
                      <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                        Weight crossing 2 major percentile curves downward or refusal of liquids/solids for consecutive days warrant pediatric checkup.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ===================== BABY LENGTH ===================== */}
          {type === 'baby-length' && (
            <>
              <div className="bg-teal-50/60 dark:bg-teal-950/30 rounded-2xl p-4 border border-teal-200/70 dark:border-teal-900/40">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-teal-900 dark:text-teal-300">
                    Recumbent Length
                  </span>
                  <span className="text-[11px] font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider">
                    Crown to Heel
                  </span>
                </div>
                <div className="text-2xl font-bold text-stone-900 dark:text-white mt-1">
                  {data.lengthCm ? UnitConverter.formatLength(data.lengthCm, unitSystem) : '72.4 cm'}
                </div>

                <div className="mt-3">
                  <div className="flex justify-between text-[10px] text-stone-500 dark:text-stone-400 mb-1 font-medium">
                    <span>3rd pct</span>
                    <span className="text-teal-800 dark:text-teal-300 font-bold">
                      {data.lengthPct ?? 61}th Percentile (Slightly Above Average)
                    </span>
                    <span>97th pct</span>
                  </div>
                  <div className="w-full h-2.5 bg-stone-200 dark:bg-stone-700 rounded-full relative overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-teal-500 to-sky-400 rounded-full"
                      style={{ width: `${Math.min(100, Math.max(5, data.lengthPct ?? 61))}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/60">
                  <div className="text-stone-500 dark:text-stone-400 text-[10px] font-semibold uppercase">
                    Growth Pattern
                  </div>
                  <div className="font-bold text-stone-900 dark:text-white mt-1 text-sm">
                    Saltatory Spurts
                  </div>
                  <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-0.5">Lengthens in surges during deep sleep</p>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/60">
                  <div className="text-stone-500 dark:text-stone-400 text-[10px] font-semibold uppercase">
                    Monthly Velocity
                  </div>
                  <div className="font-bold text-stone-900 dark:text-white mt-1 text-sm">
                    ~1.2 cm / month
                  </div>
                  <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-0.5">Normal second-half infancy rate</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300">
                  Recommendations for Stature
                </div>
                <div className="p-2.5 rounded-xl bg-teal-500/10 border border-teal-500/20 text-xs space-y-1">
                  <div className="font-semibold text-teal-950 dark:text-teal-200">
                    🦴 Bone & Spinal Alignment
                  </div>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                    Ensure 400 IU Vitamin D daily. Floor freedom to stretch legs, kick, and roll strengthens hip joints and long bones.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* ===================== BABY HEAD CIRCUMFERENCE ===================== */}
          {type === 'baby-head' && (
            <>
              <div className="bg-amber-50/60 dark:bg-amber-950/30 rounded-2xl p-4 border border-amber-200/70 dark:border-amber-900/40">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-amber-900 dark:text-amber-300">
                    Cranial Development
                  </span>
                  <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                    Neuro Marker
                  </span>
                </div>
                <div className="text-2xl font-bold text-stone-900 dark:text-white mt-1">
                  {data.headCircumferenceCm
                    ? UnitConverter.formatLength(data.headCircumferenceCm, unitSystem)
                    : '45.4 cm'}
                </div>

                <div className="mt-3">
                  <div className="flex justify-between text-[10px] text-stone-500 dark:text-stone-400 mb-1 font-medium">
                    <span>3rd pct</span>
                    <span className="text-amber-800 dark:text-amber-300 font-bold">
                      {data.hcPct ?? 58}th Percentile (Ideal Neuro Growth)
                    </span>
                    <span>97th pct</span>
                  </div>
                  <div className="w-full h-2.5 bg-stone-200 dark:bg-stone-700 rounded-full relative overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-amber-500 to-orange-400 rounded-full"
                      style={{ width: `${Math.min(100, Math.max(5, data.hcPct ?? 58))}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/60 text-xs">
                <div className="flex items-center justify-between font-semibold text-stone-900 dark:text-white">
                  <span>Anterior Fontanelle Status</span>
                  <span className="text-emerald-700 dark:text-emerald-400 text-[11px]">Open & Pulsatile (Normal)</span>
                </div>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
                  The soft spot on the crown naturally closes between 9 and 18 months, accommodating dramatic brain volume expansion.
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300">
                  Brain Development Activities
                </div>
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1">
                  <div className="font-semibold text-amber-950 dark:text-amber-200">
                    🧠 Cognitive & Synaptic Play
                  </div>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                    Point and name everyday objects; play peek-a-boo to solidify object permanence; respond to every babble to foster language maps.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* ===================== BABY MILESTONES ===================== */}
          {type === 'baby-milestones' && (
            <>
              <div className="bg-rose-50/60 dark:bg-rose-950/30 rounded-2xl p-4 border border-rose-200/70 dark:border-rose-900/40">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-rose-900 dark:text-rose-300">
                    CDC Developmental Milestones
                  </span>
                  <span className="text-[11px] font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider">
                    AAP Surveillance
                  </span>
                </div>
                <div className="text-2xl font-bold text-stone-900 dark:text-white mt-1">
                  {data.completedMilestonesCount ?? 8} / {data.totalMilestonesCount ?? 8} Markers Achieved
                </div>
                <div className="text-[11px] text-rose-800 dark:text-rose-300 mt-1 font-medium">
                  Fully on track for Month 9 cognitive, social, and motor development!
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300">
                  Key Skills to Nurture This Month
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
                    <span className="font-semibold text-stone-900 dark:text-white">🧸 Gross Motor</span>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">Cruising furniture & sturdy sitting</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
                    <span className="font-semibold text-stone-900 dark:text-white">🤏 Fine Motor</span>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">Thumb & index pincer grasp practice</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
                    <span className="font-semibold text-stone-900 dark:text-white">🗣️ Language</span>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">Consonant chains (mamama, dadada)</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
                    <span className="font-semibold text-stone-900 dark:text-white">💖 Social</span>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">Stranger awareness & peek-a-boo</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ===================== BABY STAGE WONDER ===================== */}
          {type === 'baby-stage' && (
            <>
              <div className="bg-linear-to-r from-amber-500/15 via-rose-500/10 to-teal-500/10 rounded-2xl p-4 border border-amber-200/80 dark:border-amber-900/40">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🥑</span>
                  <div>
                    <h4 className="font-bold text-stone-900 dark:text-white text-sm">
                      Week {data.currentBabyWeeks || 38} · Wonder of Categories
                    </h4>
                    <span className="text-[11px] text-amber-800 dark:text-amber-300 font-medium">
                      Developmental Leap 6
                    </span>
                  </div>
                </div>
                <p className="text-xs text-stone-700 dark:text-stone-300 mt-2 leading-relaxed">
                  Baby realizes that the world is organized into categories: horses and dogs are animals; bananas and carrots are foods.
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300">
                  Four Pillars Recommendation
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <span className="font-semibold text-emerald-950 dark:text-emerald-200">🥗 Feeding</span>
                    <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-0.5">Soft table finger foods + sip cups</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                    <span className="font-semibold text-indigo-950 dark:text-indigo-200">😴 Sleep</span>
                    <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-0.5">2.75–3.25h awake window, 2 naps</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <span className="font-semibold text-amber-950 dark:text-amber-200">🧸 Activities</span>
                    <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-0.5">Dropping balls into containers</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20">
                    <span className="font-semibold text-rose-950 dark:text-rose-200">🩺 Safety</span>
                    <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-0.5">Anchor heavy bookshelves and TVs</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ===================== FETAL GESTATIONAL AGE ===================== */}
          {type === 'fetal-gestational-age' && (
            <>
              <div className="bg-amber-50/60 dark:bg-amber-950/30 rounded-2xl p-4 border border-amber-200/70 dark:border-amber-900/40">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-amber-900 dark:text-amber-300">
                    Gestational Progress
                  </span>
                  <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                    Trimester 3
                  </span>
                </div>
                <div className="text-2xl font-bold text-stone-900 dark:text-white mt-1">
                  Week {data.gestationalWeeks || 28}, Day {data.gestationalDays || 0}
                </div>

                {/* Trimester visual progress */}
                <div className="mt-3 grid grid-cols-3 gap-1.5 text-center text-[10px] font-semibold">
                  <div className="py-1 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                    Tri 1 (Weeks 1-13) ✓
                  </div>
                  <div className="py-1 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                    Tri 2 (Weeks 14-26) ✓
                  </div>
                  <div className="py-1 rounded-md bg-amber-500 text-white font-bold shadow-xs">
                    Tri 3 (Active)
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/60 text-xs space-y-1">
                <div className="font-semibold text-stone-900 dark:text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Lung Surfactant Milestone
                </div>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed">
                  Type II cells in the fetal lungs begin producing surfactant to keep air sacs inflated; viability exceeds 95% with specialized neonatal care.
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300">
                  Week 28 Clinical Recommendations
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-2">
                    <span className="text-base">🩺</span>
                    <div>
                      <span className="font-semibold text-rose-950 dark:text-rose-200">
                        1-Hour Glucose Challenge & Tdap
                      </span>
                      <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-0.5">
                        Routine screening for gestational diabetes and Tdap vaccine to pass whooping cough antibodies to baby.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ===================== FETAL EFW ===================== */}
          {type === 'fetal-efw' && (
            <>
              <div className="bg-emerald-50/60 dark:bg-emerald-950/30 rounded-2xl p-4 border border-emerald-200/70 dark:border-emerald-900/40">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-900 dark:text-emerald-300">
                    Estimated Fetal Weight (EFW)
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                    Hadlock 4 Formula
                  </span>
                </div>
                <div className="text-2xl font-bold text-stone-900 dark:text-white mt-1">
                  {data.efwGrams ? UnitConverter.formatFetalWeight(data.efwGrams, unitSystem) : '1,040 g'}
                </div>
                <p className="text-[11px] text-emerald-800 dark:text-emerald-300 mt-1">
                  Plotted at the 50th percentile for 28 weeks (+/- 10% ultrasound standard error).
                </p>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/60 text-xs">
                <div className="font-semibold text-stone-900 dark:text-white mb-1.5">
                  Ultrasound Biometrics Parameters:
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-600 dark:text-stone-300">
                  <div><strong>BPD:</strong> 72 mm (Biparietal Diameter)</div>
                  <div><strong>HC:</strong> 263 mm (Head Circumference)</div>
                  <div><strong>AC:</strong> 245 mm (Abdominal Circ.)</div>
                  <div><strong>FL:</strong> 54 mm (Femur Length)</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300">
                  Nutritional Recommendation
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
                  <div className="font-semibold text-emerald-950 dark:text-emerald-200">
                    🥗 Fetal Adiposity & Brain DHA
                  </div>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-0.5 leading-relaxed">
                    Baby gains ~180g to 220g per week from now on. Focus on dietary protein (eggs, lentils, chicken) and 300mg Omega-3 DHA for brain myelin sheath development.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* ===================== FETAL SIZE ===================== */}
          {type === 'fetal-size' && (
            <>
              <div className="bg-rose-50/60 dark:bg-rose-950/30 rounded-2xl p-4 border border-rose-200/70 dark:border-rose-900/40 text-center">
                <div className="text-4xl mb-1">{data.fruitEmoji || '🍆'}</div>
                <h4 className="text-lg font-bold text-stone-900 dark:text-white">
                  Size of an {data.fruitName || 'Eggplant'}
                </h4>
                <p className="text-xs text-rose-800 dark:text-rose-300 mt-1 font-medium">
                  Length: {data.fruitLength || '~37.6 cm (14.8 in)'} · Weight: ~1,040 g
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300">
                  Sensory Awakening This Week
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
                    <span className="font-semibold text-stone-900 dark:text-white">👁️ Blinking Eyes</span>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">Opens eyes and turns toward bright light</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
                    <span className="font-semibold text-stone-900 dark:text-white">👂 Hearing Voices</span>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">Recognizes parent voice pitch and rhythm</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ===================== FETAL KICKS ===================== */}
          {type === 'fetal-kicks' && (
            <>
              <div className="bg-rose-50/60 dark:bg-rose-950/30 rounded-2xl p-4 border border-rose-200/70 dark:border-rose-900/40">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-rose-900 dark:text-rose-300">
                    ACOG Count-to-10 Protocol
                  </span>
                  <span className="text-[11px] font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider">
                    Fetal Well-Being
                  </span>
                </div>
                <div className="text-2xl font-bold text-stone-900 dark:text-white mt-1">
                  Target: 10 Movements in 2 Hours
                </div>
                <p className="text-[11px] text-rose-800 dark:text-rose-300 mt-1">
                  Most babies achieve 10 distinct kicks/swishes in 15 to 30 minutes during active evening hours.
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300">
                  Best Kick Counting Protocol
                </div>
                <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-xs space-y-1">
                  <div className="font-semibold text-stone-900 dark:text-white">
                    🛌 Left Lateral Recumbent Position
                  </div>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed">
                    Lie comfortably on your left side after dinner. This maximizes blood flow from the inferior vena cava directly to the placenta.
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1">
                  <div className="font-semibold text-amber-950 dark:text-amber-200 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
                    When to Call Labor & Delivery
                  </div>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                    If fewer than 10 kicks occur within 2 hours of quiet monitoring, or if there is a dramatic deviation from their habitual rhythm, contact triage immediately.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* ===================== FETAL STAGE WONDER ===================== */}
          {type === 'fetal-stage' && (
            <>
              <div className="bg-linear-to-r from-amber-500/15 via-rose-500/10 to-indigo-500/10 rounded-2xl p-4 border border-amber-200/80 dark:border-amber-900/40">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🍆</span>
                  <div>
                    <h4 className="font-bold text-stone-900 dark:text-white text-sm">
                      Week {data.gestationalWeeks || 28} · The Third Trimester Gateway
                    </h4>
                    <span className="text-[11px] text-amber-800 dark:text-amber-300 font-medium">
                      Brain Waves & REM Sleep
                    </span>
                  </div>
                </div>
                <p className="text-xs text-stone-700 dark:text-stone-300 mt-2 leading-relaxed">
                  Brain surface develops characteristic grooves and ridges (sulci and gyri), preparing memory and sensory recognition systems.
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300">
                  Four Pillars for Week 28
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20">
                    <span className="font-semibold text-rose-950 dark:text-rose-200">🩺 Clinical</span>
                    <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-0.5">Glucose challenge & Tdap shot</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <span className="font-semibold text-amber-950 dark:text-amber-200">🤰 Comfort</span>
                    <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-0.5">Wedge pillow for side sleeping</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <span className="font-semibold text-emerald-950 dark:text-emerald-200">🥗 Nutrition</span>
                    <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-0.5">Iron + Vitamin C for absorption</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                    <span className="font-semibold text-indigo-950 dark:text-indigo-200">👶 Bonding</span>
                    <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-0.5">Read evening stories aloud</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ===================== BABY REC: NUTRITION ===================== */}
          {type === 'baby-rec-nutrition' && (
            <>
              <div className="bg-emerald-50/70 dark:bg-emerald-950/30 rounded-2xl p-4 border border-emerald-200/80 dark:border-emerald-900/40">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🥑</span>
                  <div>
                    <h4 className="font-bold text-emerald-950 dark:text-emerald-100 text-sm">
                      Infant Nutrition & Allergen Progression Plan
                    </h4>
                    <span className="text-[11px] text-emerald-800 dark:text-emerald-300 font-semibold uppercase">
                      WHO & AAP Guidelines
                    </span>
                  </div>
                </div>
                <p className="text-xs text-stone-700 dark:text-stone-300 mt-2 leading-relaxed">
                  Solid food introduction complements rather than replaces breastmilk or formula through the first 12 months.
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 space-y-1">
                  <span className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                    🥩 1. Iron & Zinc Priority
                  </span>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                    Infant natural iron reserves deplete around 6 months. Prioritize iron-fortified oatmeal, pureed beef, lentils, and egg yolks alongside Vitamin C (papaya, steamed berries).
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 space-y-1">
                  <span className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                    🥜 2. Early Allergen Introduction (LEAP Protocol)
                  </span>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                    Introduce smooth peanut butter (thinned with breastmilk) and cooked eggs one by one in the morning, observing for 2 hours. Early introduction significantly reduces allergy risk.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 space-y-1">
                  <span className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                    🥤 3. Open Cup & Water Sips
                  </span>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                    Offer 1–2 ounces of water in a small open cup or straw cup during meals. Avoid honey before age 1 (infant botulism risk) and limit added sodium/sugars.
                  </p>
                </div>
              </div>

              {/* Recipe Suggestions Block for Babies */}
              <div className="pt-2 border-t border-stone-100 dark:border-stone-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Utensils className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider">
                      Pediatrician-Approved Recipe Suggestions
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full">
                    Stage-by-Stage
                  </span>
                </div>

                <div className="space-y-3">
                  {BABY_RECIPES.map((recipe) => (
                    <div
                      key={recipe.id}
                      className="p-3.5 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{recipe.emoji}</span>
                          <div>
                            <h5 className="text-xs font-black text-stone-900 dark:text-white">
                              {recipe.title}
                            </h5>
                            <span className="text-[10px] text-emerald-800 dark:text-emerald-400 font-semibold">
                              {recipe.stageBracket} · {recipe.texture}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] text-stone-500 font-mono shrink-0">
                          ⏱️ {recipe.prepTime}
                        </span>
                      </div>

                      <div className="text-[11px] space-y-1.5 pt-1">
                        <div>
                          <span className="font-bold text-stone-700 dark:text-stone-300">Ingredients: </span>
                          <span className="text-stone-600 dark:text-stone-400">
                            {recipe.ingredients.join(', ')}
                          </span>
                        </div>
                        <div>
                          <span className="font-bold text-stone-700 dark:text-stone-300">Method: </span>
                          <span className="text-stone-600 dark:text-stone-400">
                            {recipe.instructions.join(' ')}
                          </span>
                        </div>
                        <div className="p-2 rounded-xl bg-white/80 dark:bg-stone-800/80 border border-emerald-100 dark:border-emerald-900/40 text-[10px]">
                          <span className="font-bold text-emerald-900 dark:text-emerald-300">Nutritional Benefit: </span>
                          <span className="text-stone-600 dark:text-stone-300">{recipe.clinicalBenefit}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ===================== BABY REC: SLEEP ===================== */}
          {type === 'baby-rec-sleep' && (
            <>
              <div className="bg-indigo-50/70 dark:bg-indigo-950/30 rounded-2xl p-4 border border-indigo-200/80 dark:border-indigo-900/40">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">😴</span>
                  <div>
                    <h4 className="font-bold text-indigo-950 dark:text-indigo-100 text-sm">
                      Sleep Architecture & Wake Windows
                    </h4>
                    <span className="text-[11px] text-indigo-800 dark:text-indigo-300 font-semibold uppercase">
                      Age-Calibrated Timetable
                    </span>
                  </div>
                </div>
                <p className="text-xs text-stone-700 dark:text-stone-300 mt-2 leading-relaxed">
                  Preventing overtiredness is the foundation of calm daytime naps and consolidated nighttime sleep.
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 space-y-1">
                  <span className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                    ⏱️ 1. Optimal Awake Windows
                  </span>
                  <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] mt-1">
                    <div className="p-1.5 bg-white dark:bg-stone-700 rounded-lg">
                      <div className="text-stone-400">0–3 Mo</div>
                      <div className="font-bold text-stone-800 dark:text-stone-200">60–90 min</div>
                    </div>
                    <div className="p-1.5 bg-white dark:bg-stone-700 rounded-lg">
                      <div className="text-stone-400">4–7 Mo</div>
                      <div className="font-bold text-stone-800 dark:text-stone-200">1.75–2.5 hr</div>
                    </div>
                    <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/60 rounded-lg">
                      <div className="text-indigo-700 dark:text-indigo-300 font-bold">8–12 Mo</div>
                      <div className="font-bold text-indigo-950 dark:text-indigo-100">2.75–3.5 hr</div>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 space-y-1">
                  <span className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                    🌙 2. Predictable 4-Step Bedtime Routine
                  </span>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                    Warm bath → diaper and cozy sleep sack → gentle board book with cuddle → dim room with white noise machine set below 60 dB.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 space-y-1">
                  <span className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                    🛡️ 3. AAP Safe Sleep Environment
                  </span>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                    Always place baby on their back on a firm, flat mattress in a bare crib or bassinet. Never use positioners, pillows, or loose blankets.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* ===================== BABY REC: PLAY ===================== */}
          {type === 'baby-rec-play' && (
            <>
              <div className="bg-amber-50/70 dark:bg-amber-950/30 rounded-2xl p-4 border border-amber-200/80 dark:border-amber-900/40">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🧸</span>
                  <div>
                    <h4 className="font-bold text-amber-950 dark:text-amber-100 text-sm">
                      Developmental & Sensory Play Exercises
                    </h4>
                    <span className="text-[11px] text-amber-800 dark:text-amber-300 font-semibold uppercase">
                      Motor & Cognitive Fuel
                    </span>
                  </div>
                </div>
                <p className="text-xs text-stone-700 dark:text-stone-300 mt-2 leading-relaxed">
                  Interactive parent-child play stimulates neural synaptogenesis and gross-motor strength.
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 space-y-1">
                  <span className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                    🧩 1. Object Permanence & Peek-a-Boo
                  </span>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                    Hide a favorite rattle partially under a lightweight blanket. Celebrate excitedly when baby pulls the cloth away to find it!
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 space-y-1">
                  <span className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                    🪇 2. Container & Stacking Play
                  </span>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                    Babies love putting plastic balls into bowls, emptying laundry baskets, and knocking down towers of soft wooden blocks.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 space-y-1">
                  <span className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                    🗣️ 3. Reciprocal "Serve & Return" Babbling
                  </span>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                    When baby makes a sound like "ba-ba", look them right in the eyes, pause, repeat "Ba-ba! Yes, that's your ball!", and wait for their response.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* ===================== BABY REC: SAFETY ===================== */}
          {type === 'baby-rec-safety' && (
            <>
              <div className="bg-rose-50/70 dark:bg-rose-950/30 rounded-2xl p-4 border border-rose-200/80 dark:border-rose-900/40">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🛡️</span>
                  <div>
                    <h4 className="font-bold text-rose-950 dark:text-rose-100 text-sm">
                      Home Babyproofing & Pediatric Health
                    </h4>
                    <span className="text-[11px] text-rose-800 dark:text-rose-300 font-semibold uppercase">
                      Clinical Safety Protocol
                    </span>
                  </div>
                </div>
                <p className="text-xs text-stone-700 dark:text-stone-300 mt-2 leading-relaxed">
                  As mobility increases with crawling, pulling up, and cruising, preventative home safety is essential.
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 space-y-1">
                  <span className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                    ⚓ 1. Anchor All Heavy Furniture & TVs
                  </span>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                    Babies use drawer handles as climbing ladders. Anchor all dressers, bookshelves, and televisions firmly into wall studs with anti-tip straps.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 space-y-1">
                  <span className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                    🚪 2. Stair Gates & Window Cords
                  </span>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                    Install hardware-mounted safety gates at the top and bottom of staircases. Cut or tie all window blind cords out of reach.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 space-y-1">
                  <span className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                    🩺 3. Well-Child Immunization Schedule
                  </span>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                    Keep appointments for 9-month and 12-month checkups. Routine vaccines safeguard against measles, mumps, rubella, varicella, and pneumococcal disease.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* ===================== FETAL REC: SCREENING ===================== */}
          {type === 'fetal-rec-screening' && (
            <>
              <div className="bg-rose-50/70 dark:bg-rose-950/30 rounded-2xl p-4 border border-rose-200/80 dark:border-rose-900/40">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🩺</span>
                  <div>
                    <h4 className="font-bold text-rose-950 dark:text-rose-100 text-sm">
                      Clinical Screenings & Tests Checklist
                    </h4>
                    <span className="text-[11px] text-rose-800 dark:text-rose-300 font-semibold uppercase">
                      ACOG Prenatal Protocols
                    </span>
                  </div>
                </div>
                <p className="text-xs text-stone-700 dark:text-stone-300 mt-2 leading-relaxed">
                  Key prenatal screenings identify and manage maternal health factors to safeguard both parent and baby.
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 space-y-1">
                  <span className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                    🧪 1. 1-Hour Glucose Screening (Weeks 24–28)
                  </span>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                    Evaluates gestational diabetes risk. Normal standard threshold is &lt; 140 mg/dL (or &lt; 130 mg/dL depending on clinic standards).
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 space-y-1">
                  <span className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                    💉 2. Tdap Vaccine & Rh Antibody Check
                  </span>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                    Given between weeks 27 and 36 to pass whooping cough antibodies to baby. Rh-negative mothers receive RhoGAM injection at week 28.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 space-y-1">
                  <span className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                    🧫 3. Group B Strep Culture (Weeks 36–37)
                  </span>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                    Routine vagino-rectal swab. If positive, simple prophylactic IV antibiotics are given during labor to safeguard newborn airways.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* ===================== FETAL REC: COMFORT ===================== */}
          {type === 'fetal-rec-comfort' && (
            <>
              <div className="bg-amber-50/70 dark:bg-amber-950/30 rounded-2xl p-4 border border-amber-200/80 dark:border-amber-900/40">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🛌</span>
                  <div>
                    <h4 className="font-bold text-amber-950 dark:text-amber-100 text-sm">
                      Maternal Comfort & Left-Side Sleep
                    </h4>
                    <span className="text-[11px] text-amber-800 dark:text-amber-300 font-semibold uppercase">
                      Anatomical Rest Protocol
                    </span>
                  </div>
                </div>
                <p className="text-xs text-stone-700 dark:text-stone-300 mt-2 leading-relaxed">
                  Supportive physical positioning relieves pressure on major blood vessels and eases pelvic strain.
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 space-y-1">
                  <span className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                    🌙 1. Left Lateral Sleeping Position
                  </span>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                    Sleeping on your left side prevents the heavy uterus from compressing the inferior vena cava, ensuring maximum blood flow to the placenta and kidneys.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 space-y-1">
                  <span className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                    🧘 2. Pelvic Tilts & Wedge Pillows
                  </span>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                    Place a wedge pillow under your bump and a pillow between your knees to keep your pelvis aligned and relieve sciatica and lower back ache.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 space-y-1">
                  <span className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                    🧦 3. Leg Cramps & Swelling Management
                  </span>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                    Elevate feet in the evenings, wear gentle compression socks if standing, and maintain magnesium-rich snacks (pumpkin seeds, almonds) to reduce nocturnal calf cramps.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* ===================== FETAL REC: NUTRITION ===================== */}
          {type === 'fetal-rec-nutrition' && (
            <>
              <div className="bg-emerald-50/70 dark:bg-emerald-950/30 rounded-2xl p-4 border border-emerald-200/80 dark:border-emerald-900/40">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🥗</span>
                  <div>
                    <h4 className="font-bold text-emerald-950 dark:text-emerald-100 text-sm">
                      Maternal Nutrition & Brain DHA Intake
                    </h4>
                    <span className="text-[11px] text-emerald-800 dark:text-emerald-300 font-semibold uppercase">
                      Third Trimester Adiposity
                    </span>
                  </div>
                </div>
                <p className="text-xs text-stone-700 dark:text-stone-300 mt-2 leading-relaxed">
                  During late pregnancy, baby gains ~200 grams weekly and builds trillions of neural brain synapses.
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 space-y-1">
                  <span className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                    🧠 1. 300 mg Omega-3 DHA Daily
                  </span>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                    Essential fatty acid needed for the rapid myelin sheath insulation of fetal brain neurons and retinal photoreceptors (low-mercury salmon, walnuts, algal oil).
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 space-y-1">
                  <span className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                    🥩 2. Iron + Vitamin C Combination
                  </span>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                    27 mg elemental iron daily supports surging maternal blood volume. Pair spinach, lentils, or lean meats with citrus or bell peppers to double non-heme iron absorption.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 space-y-1">
                  <span className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                    💧 3. Hydration & Electrolytes (2.5–3 Liters)
                  </span>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                    Maintains amniotic fluid turnover (baby cycles amniotic fluid every 3 hours) and prevents dehydration-triggered Braxton Hicks contractions.
                  </p>
                </div>
              </div>

              {/* Recipe Suggestions Block for Pregnancy */}
              <div className="pt-2 border-t border-stone-100 dark:border-stone-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Utensils className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider">
                      Maternal-Fetal Nourishment Recipes
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full">
                    Brain DHA & Iron
                  </span>
                </div>

                <div className="space-y-3">
                  {FETAL_MATERNAL_RECIPES.map((recipe) => (
                    <div
                      key={recipe.id}
                      className="p-3.5 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{recipe.emoji}</span>
                          <div>
                            <h5 className="text-xs font-black text-stone-900 dark:text-white">
                              {recipe.title}
                            </h5>
                            <span className="text-[10px] text-emerald-800 dark:text-emerald-400 font-semibold">
                              {recipe.stageBracket}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] text-stone-500 font-mono shrink-0">
                          ⏱️ {recipe.prepTime}
                        </span>
                      </div>

                      <div className="text-[11px] space-y-1.5 pt-1">
                        <div>
                          <span className="font-bold text-stone-700 dark:text-stone-300">Ingredients: </span>
                          <span className="text-stone-600 dark:text-stone-400">
                            {recipe.ingredients.join(', ')}
                          </span>
                        </div>
                        <div>
                          <span className="font-bold text-stone-700 dark:text-stone-300">Method: </span>
                          <span className="text-stone-600 dark:text-stone-400">
                            {recipe.instructions.join(' ')}
                          </span>
                        </div>
                        <div className="p-2 rounded-xl bg-white/80 dark:bg-stone-800/80 border border-emerald-100 dark:border-emerald-900/40 text-[10px]">
                          <span className="font-bold text-emerald-900 dark:text-emerald-300">Nutritional Benefit: </span>
                          <span className="text-stone-600 dark:text-stone-300">{recipe.clinicalBenefit}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ===================== FETAL REC: BONDING ===================== */}
          {type === 'fetal-rec-bonding' && (
            <>
              <div className="bg-indigo-50/70 dark:bg-indigo-950/30 rounded-2xl p-4 border border-indigo-200/80 dark:border-indigo-900/40">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📖</span>
                  <div>
                    <h4 className="font-bold text-indigo-950 dark:text-indigo-100 text-sm">
                      Fetal Voice Recognition & Bonding
                    </h4>
                    <span className="text-[11px] text-indigo-800 dark:text-indigo-300 font-semibold uppercase">
                      Auditory Cortex Awakening
                    </span>
                  </div>
                </div>
                <p className="text-xs text-stone-700 dark:text-stone-300 mt-2 leading-relaxed">
                  Fetal auditory bones are fully ossified. Baby listens continuously to the maternal heartbeat and voices.
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 space-y-1">
                  <span className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                    🗣️ 1. Reading Bedtime Stories Aloud
                  </span>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                    Research shows newborns recognize rhythmic stories read repeatedly during the third trimester. Have both parents take turns reading bedtime books to the bump.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 space-y-1">
                  <span className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                    🦶 2. Interactive Gentle Tapping
                  </span>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                    When you feel a kick, gently press your hand on that spot or tap twice. Babies often respond by rolling or nudging back against your hand.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 space-y-1">
                  <span className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                    📝 3. Preparing a Family Birth Vision
                  </span>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                    Discuss preferences for labor comfort, skin-to-skin golden hour, delayed cord clamping, and partner roles in the delivery suite.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* ===================== MILESTONE DETAIL ===================== */}
          {type === 'milestone-detail' && data.milestoneItem && (
            <>
              <div className="bg-emerald-50/70 dark:bg-emerald-950/30 rounded-2xl p-4 border border-emerald-200/80 dark:border-emerald-900/40">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                    CDC Surveillance Standard · {data.milestoneItem.category}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-200 font-bold">
                    Age-Calibrated
                  </span>
                </div>
                <h4 className="text-base font-bold text-stone-900 dark:text-white mt-1.5">
                  {data.milestoneItem.title}
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-300 mt-1 leading-relaxed">
                  {data.milestoneItem.description}
                </p>
              </div>

              <div className="space-y-2.5 text-xs">
                {data.milestoneItem.recommendation && (
                  <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 space-y-1">
                    <span className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                      💡 Pediatric Recommendation & Home Practice
                    </span>
                    <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                      {data.milestoneItem.recommendation}
                    </p>
                  </div>
                )}

                {data.milestoneItem.tips && (
                  <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 space-y-1">
                    <span className="font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5">
                      🧸 Engaging Play Idea
                    </span>
                    <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                      {data.milestoneItem.tips}
                    </p>
                  </div>
                )}

                {data.milestoneItem.whenToConsult && (
                  <div className="p-3.5 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/30 space-y-1">
                    <span className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                      ⚠️ When to Consult Pediatrician
                    </span>
                    <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                      {data.milestoneItem.whenToConsult}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* ===================== POINTER DETAIL (GENERIC) ===================== */}
          {type === 'pointer-detail' && (
            <>
              <div className="bg-amber-50/70 dark:bg-amber-950/30 rounded-2xl p-4 border border-amber-200/80 dark:border-amber-900/40">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                    {data.pointerBadge || 'Clinical Evidence Guide'}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 font-bold">
                    Official Guidance
                  </span>
                </div>
                <h4 className="text-base font-bold text-stone-900 dark:text-white mt-1.5">
                  {data.pointerTitle}
                </h4>
                <p className="text-xs text-stone-700 dark:text-stone-300 mt-1 leading-relaxed">
                  {data.pointerDesc}
                </p>
              </div>

              <div className="space-y-2.5 text-xs">
                {data.pointerEvidence && (
                  <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 space-y-1">
                    <span className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                      🔬 Biological & Clinical Rationale
                    </span>
                    <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                      {data.pointerEvidence}
                    </p>
                  </div>
                )}

                {data.pointerActionSteps && data.pointerActionSteps.length > 0 && (
                  <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 space-y-2">
                    <span className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                      📋 Recommended Action Steps
                    </span>
                    <ul className="space-y-1.5 pl-1">
                      {data.pointerActionSteps.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-[11px] text-stone-600 dark:text-stone-400">
                          <span className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {data.pointerWhenToConsult && (
                  <div className="p-3.5 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/30 space-y-1">
                    <span className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                      ⚠️ When to Consult Care Provider
                    </span>
                    <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                      {data.pointerWhenToConsult}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* ===================== FETAL HEARTBEAT ===================== */}
          {type === 'fetal-heartbeat' && (
            <>
              <div className="bg-rose-50/70 dark:bg-rose-950/30 rounded-2xl p-4 border border-rose-200/80 dark:border-rose-900/40">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center text-lg animate-pulse">
                    ♥
                  </div>
                  <div>
                    <h4 className="font-bold text-rose-950 dark:text-rose-100 text-sm">
                      Fetal Cardiac Physiology & Heart Rate
                    </h4>
                    <span className="text-[11px] text-rose-800 dark:text-rose-300 font-semibold">
                      Normal Range: 110–160 beats per minute
                    </span>
                  </div>
                </div>
                <p className="text-xs text-stone-700 dark:text-stone-300 mt-2.5 leading-relaxed">
                  The fetal heart beats roughly twice as fast as an adult heart. Its rapid rhythm is essential to perfuse growing organs through the unique fetal circulatory shunt (ductus arteriosus and foramen ovale).
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 space-y-1">
                  <span className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                    📈 Accelerations & Reactivity
                  </span>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                    When baby moves, healthy heart rates temporarily accelerate by 15+ bpm for at least 15 seconds. This is the cornerstone of non-stress tests (NST) in the 3rd trimester.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 space-y-1">
                  <span className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                    🩺 Routine Doppler Assessment
                  </span>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                    At every prenatal appointment, your OB/midwife checks the baseline rate and rhythm to confirm placental oxygenation and fetal autonomic tone.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* ===================== FONTANELLE DETAIL ===================== */}
          {type === 'fontanelle-detail' && (
            <>
              <div className="bg-amber-50/70 dark:bg-amber-950/30 rounded-2xl p-4 border border-amber-200/80 dark:border-amber-900/40">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-lg">
                    🧠
                  </div>
                  <div>
                    <h4 className="font-bold text-amber-950 dark:text-amber-100 text-sm">
                      Anterior & Posterior Fontanelles
                    </h4>
                    <span className="text-[11px] text-amber-800 dark:text-amber-300 font-semibold">
                      Soft Spots & Cranial Expansion
                    </span>
                  </div>
                </div>
                <p className="text-xs text-stone-700 dark:text-stone-300 mt-2.5 leading-relaxed">
                  The anterior (diamond-shaped) fontanelle on top of baby's head allows rapid brain expansion during the first 18 months, typically closing between 9 and 18 months of age.
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 space-y-1">
                  <span className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                    ✨ Normal Presentation
                  </span>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                    Should feel soft and level with the scalp, with a gentle visible pulse matching baby's heartbeat. Pulsing is completely normal!
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/30 space-y-1">
                  <span className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                    ⚠️ Red Flags to Report
                  </span>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                    A sunken fontanelle may indicate dehydration (insufficient wet diapers). A persistently tense or bulging fontanelle when baby is quiet and upright requires immediate medical evaluation.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* ===================== AWAKE WINDOW DETAIL ===================== */}
          {type === 'awake-window-detail' && (
            <>
              <div className="bg-indigo-50/70 dark:bg-indigo-950/30 rounded-2xl p-4 border border-indigo-200/80 dark:border-indigo-900/40">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-lg">
                    ⏰
                  </div>
                  <div>
                    <h4 className="font-bold text-indigo-950 dark:text-indigo-100 text-sm">
                      Awake Window Science & Sleep Pressure
                    </h4>
                    <span className="text-[11px] text-indigo-800 dark:text-indigo-300 font-semibold">
                      Preventing Overtiredness & Cortisol Surges
                    </span>
                  </div>
                </div>
                <p className="text-xs text-stone-700 dark:text-stone-300 mt-2.5 leading-relaxed">
                  An "awake window" is the maximum duration your baby can comfortably stay awake between naps before adenosine sleep pressure triggers stress hormones.
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 space-y-1">
                  <span className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                    🥱 Early Tired Cues
                  </span>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                    Gazing into the distance, turning head away from toys, pinkish eyebrows, or slowing movements. Start the soothing bedtime routine as soon as you see these!
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 space-y-1">
                  <span className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                    ⚡ Late Cues (Overtired)
                  </span>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                    Ear tugging, frantic limb movements, back arching, or sudden inconsolable crying. If this occurs, dim the lights and use steady rhythmic rocking to settle the nervous system.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-stone-50 dark:bg-stone-800/50 border-t border-stone-200 dark:border-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 text-xs font-semibold shadow-xs transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
