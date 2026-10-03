import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ChildProfile, Gender } from '../../types';
import { X, Sparkles, Baby, Heart, ShieldCheck, Calendar, ArrowRight } from 'lucide-react';
import { UnitConverter } from '../../data/growthStandards';

interface GraduateFetalModalProps {
  isOpen: boolean;
  onClose: () => void;
  fetalProfile: ChildProfile;
  onGraduated?: (newBabyId: string) => void;
}

export const GraduateFetalModal: React.FC<GraduateFetalModalProps> = ({
  isOpen,
  onClose,
  fetalProfile,
  onGraduated,
}) => {
  const { progressFetusToBaby, fetalMeasurements, kickSessions, unitSystem } = useApp();

  const [babyName, setBabyName] = useState(fetalProfile.name || '');
  const [gender, setGender] = useState<Gender>(fetalProfile.gender || 'boy');
  const [birthDate, setBirthDate] = useState(new Date().toISOString().split('T')[0]);
  const [birthWeight, setBirthWeight] = useState('');
  const [birthLength, setBirthLength] = useState('');
  const [birthHeadCircumference, setBirthHeadCircumference] = useState('');
  const [notes, setNotes] = useState('');
  const [attachFetalHistory, setAttachFetalHistory] = useState(true);

  if (!isOpen) return null;

  const relevantScans = fetalMeasurements.filter((m) => m.profileId === fetalProfile.id);
  const relevantKicks = kickSessions.filter((k) => k.profileId === fetalProfile.id);
  const totalKicks = relevantKicks.reduce((acc, k) => acc + (k.kicksCount || 0), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!babyName.trim()) return;

    // Convert input values to metric kg / cm for storage
    let weightKg: number | undefined;
    if (birthWeight.trim()) {
      const val = parseFloat(birthWeight);
      if (!isNaN(val)) {
        weightKg = unitSystem === 'imperial' ? val * 0.45359237 : val;
      }
    }

    let lengthCm: number | undefined;
    if (birthLength.trim()) {
      const val = parseFloat(birthLength);
      if (!isNaN(val)) {
        lengthCm = unitSystem === 'imperial' ? val * 2.54 : val;
      }
    }

    let headCm: number | undefined;
    if (birthHeadCircumference.trim()) {
      const val = parseFloat(birthHeadCircumference);
      if (!isNaN(val)) {
        headCm = unitSystem === 'imperial' ? val * 2.54 : val;
      }
    }

    const newBabyId = progressFetusToBaby({
      fetalProfileId: fetalProfile.id,
      babyName: babyName.trim(),
      gender,
      birthDate,
      birthWeightKg: weightKg,
      birthLengthCm: lengthCm,
      birthHeadCircumferenceCm: headCm,
      notes: notes.trim() || undefined,
      attachFetalHistory,
    });

    onClose();
    if (onGraduated) onGraduated(newBabyId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 dark:bg-black/75 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-emerald-200 dark:border-emerald-900/60 relative my-8 transition-colors">
        {/* Header with celebration banner */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-amber-400 via-rose-400 to-emerald-500 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                <span>Celebrate Birth & Graduate to Baby</span>
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Welcome to the world! Natural transition from pregnancy to newborn.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* In-womb journey summary pill */}
        <div className="mt-4 p-3.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤰</span>
              <div>
                <div className="text-xs font-bold text-stone-900 dark:text-white">
                  Preserving In-Womb Journey: {fetalProfile.name}
                </div>
                <div className="text-[11px] text-stone-600 dark:text-stone-400">
                  Est. Due Date: {fetalProfile.dateOfEvent} · {relevantScans.length} Ultrasound Scans · {relevantKicks.length} Kick Sessions ({totalKicks} kicks)
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Baby Name */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
              Baby's Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Liam Alexander"
              value={babyName}
              onChange={(e) => setBabyName(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white rounded-xl focus:outline-hidden focus:border-emerald-400"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
              Gender
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['boy', 'girl', 'undisclosed'] as Gender[]).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGender(g)}
                  className={`py-1.5 text-xs font-medium rounded-xl border capitalize transition-colors ${
                    gender === g
                      ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 border-stone-900 dark:border-stone-100 font-bold'
                      : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600'
                  }`}
                >
                  {g === 'undisclosed' ? 'Surprise' : g}
                </button>
              ))}
            </div>
          </div>

          {/* Birth Date */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Official Date of Birth</span>
            </label>
            <input
              type="date"
              required
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white rounded-xl focus:outline-hidden focus:border-emerald-400"
            />
          </div>

          {/* Newborn Baseline Biometrics */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
              Newborn Measurements at Delivery (Optional)
            </label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[10px] text-stone-500 dark:text-stone-400 mb-0.5">
                  Weight ({unitSystem === 'metric' ? 'kg' : 'lbs'})
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder={unitSystem === 'metric' ? 'e.g. 3.4' : 'e.g. 7.5'}
                  value={birthWeight}
                  onChange={(e) => setBirthWeight(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white rounded-xl font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] text-stone-500 dark:text-stone-400 mb-0.5">
                  Length ({unitSystem === 'metric' ? 'cm' : 'in'})
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder={unitSystem === 'metric' ? 'e.g. 50.0' : 'e.g. 19.8'}
                  value={birthLength}
                  onChange={(e) => setBirthLength(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white rounded-xl font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] text-stone-500 dark:text-stone-400 mb-0.5">
                  Head ({unitSystem === 'metric' ? 'cm' : 'in'})
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder={unitSystem === 'metric' ? 'e.g. 34.5' : 'e.g. 13.6'}
                  value={birthHeadCircumference}
                  onChange={(e) => setBirthHeadCircumference(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white rounded-xl font-mono"
                />
              </div>
            </div>
          </div>

          {/* Delivery Story / Notes */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
              Birth Story & Hospital Notes (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Born at City Hospital, 39w4d, healthy and strong!"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white rounded-xl focus:outline-hidden focus:border-emerald-400"
            />
          </div>

          {/* Requirement 3: Attach Fetus History Checkbox */}
          <div className="p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={attachFetalHistory}
                onChange={(e) => setAttachFetalHistory(e.target.checked)}
                className="mt-0.5 rounded-md border-emerald-400 text-emerald-600 focus:ring-emerald-500"
              />
              <div>
                <span className="text-xs font-bold text-emerald-950 dark:text-emerald-200 block">
                  Attach In-Womb History to Baby Profile (Recommended)
                </span>
                <span className="text-[11px] text-stone-600 dark:text-stone-400 block mt-0.5 leading-snug">
                  Preserves all {relevantScans.length} ultrasound records, fetal kick logs, and pregnancy love letters so you can review the full in-womb history anytime from this baby's dashboard.
                </span>
              </div>
            </label>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100 dark:border-stone-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold text-white bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Baby className="w-4 h-4" />
              <span>Graduate to Baby Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
