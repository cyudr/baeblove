import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ChildProfile } from '../../types';
import {
  X,
  HeartPulse,
  Calendar,
  Activity,
  Heart,
  FileText,
  Printer,
  Sparkles,
  Baby,
  Scale,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { UnitConverter } from '../../data/growthStandards';

interface AttachedPrenatalHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  babyProfile: ChildProfile;
}

export const AttachedPrenatalHistoryModal: React.FC<AttachedPrenatalHistoryModalProps> = ({
  isOpen,
  onClose,
  babyProfile,
}) => {
  const {
    getAttachedFetalProfile,
    getAttachedFetalMeasurements,
    getAttachedKickSessions,
    getAttachedFetalLoveNotes,
    unitSystem,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'ultrasounds' | 'kicks' | 'letters' | 'summary'>('ultrasounds');

  if (!isOpen) return null;

  const fetalProfile = getAttachedFetalProfile(babyProfile.id);
  const fetalMeasurements = getAttachedFetalMeasurements(babyProfile.id);
  const kickSessions = getAttachedKickSessions(babyProfile.id);
  const loveNotes = getAttachedFetalLoveNotes(babyProfile.id);

  const snapshot = babyProfile.prenatalSnapshot;
  const fetalName = fetalProfile?.name || snapshot?.fetalName || 'In-Womb Baby';
  const dueDate = fetalProfile?.dateOfEvent || snapshot?.dueDate || '—';
  const totalKicks = kickSessions.reduce((acc, k) => acc + (k.kicksCount || 0), 0) || snapshot?.totalKicksLogged || 0;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 dark:bg-black/75 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl border border-stone-200 dark:border-stone-800 relative my-6 transition-colors max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-stone-100 dark:border-stone-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-white">
                  Prenatal & In-Womb Journey
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300">
                  Attached to {babyProfile.name}
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                Ultrasound biometrics, kick counting, and keepsake notes recorded as <span className="font-semibold text-stone-700 dark:text-stone-300">"{fetalName}"</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Highlights Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-3 shrink-0">
          <div className="p-2.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40">
            <span className="text-[10px] text-stone-500 dark:text-stone-400 block">Est. Due Date</span>
            <span className="text-xs font-bold text-stone-900 dark:text-white font-mono">{dueDate}</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40">
            <span className="text-[10px] text-stone-500 dark:text-stone-400 block">Actual Delivery</span>
            <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300 font-mono">{babyProfile.dateOfEvent}</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/60">
            <span className="text-[10px] text-stone-500 dark:text-stone-400 block">Ultrasound Scans</span>
            <span className="text-xs font-bold text-stone-900 dark:text-white font-mono">{fetalMeasurements.length} Scans</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/60">
            <span className="text-[10px] text-stone-500 dark:text-stone-400 block">In-Womb Kicks</span>
            <span className="text-xs font-bold text-stone-900 dark:text-white font-mono">{totalKicks} Kicks</span>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1.5 pb-2 border-b border-stone-100 dark:border-stone-800 overflow-x-auto scrollbar-none shrink-0">
          <button
            onClick={() => setActiveTab('ultrasounds')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'ultrasounds'
                ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white bg-stone-100 dark:bg-stone-800'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Ultrasound Scans ({fetalMeasurements.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('kicks')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'kicks'
                ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white bg-stone-100 dark:bg-stone-800'
            }`}
          >
            <span>👣 Kick Sessions ({kickSessions.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('letters')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'letters'
                ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white bg-stone-100 dark:bg-stone-800'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Prenatal Letters ({loveNotes.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('summary')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'summary'
                ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white bg-stone-100 dark:bg-stone-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Journey Overview</span>
          </button>
        </div>

        {/* Scrollable Tab Content */}
        <div className="flex-1 overflow-y-auto pr-1 py-3 space-y-3">
          {/* TAB 1: ULTRASOUND SCANS */}
          {activeTab === 'ultrasounds' && (
            <div className="space-y-3">
              {fetalMeasurements.length === 0 ? (
                <div className="p-8 text-center bg-stone-50 dark:bg-stone-800/40 rounded-2xl border border-dashed border-stone-200 dark:border-stone-800">
                  <Activity className="w-8 h-8 text-stone-400 mx-auto mb-2 opacity-50" />
                  <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                    No individual ultrasound biometric records were attached to this profile.
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <div className="overflow-x-auto rounded-2xl border border-stone-200 dark:border-stone-800">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="bg-stone-50 dark:bg-stone-800 border-b border-stone-200 dark:border-stone-700 text-stone-500 dark:text-stone-400 font-semibold text-[11px]">
                          <th className="py-2 px-3">Date</th>
                          <th className="py-2 px-3">Gestational Age</th>
                          <th className="py-2 px-3">Est. Weight (EFW)</th>
                          <th className="py-2 px-3">BPD / HC</th>
                          <th className="py-2 px-3">AC / FL</th>
                          <th className="py-2 px-3">Notes & Clinic</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100 dark:divide-stone-800 font-mono text-xs">
                        {fetalMeasurements.map((m) => (
                          <tr key={m.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/40">
                            <td className="py-2 px-3 font-sans text-stone-800 dark:text-stone-200 font-medium">
                              {m.date}
                            </td>
                            <td className="py-2 px-3 text-stone-900 dark:text-white font-semibold">
                              {m.gestationalWeeks}w{m.gestationalDays}d
                            </td>
                            <td className="py-2 px-3 text-emerald-800 dark:text-emerald-400 font-semibold">
                              {m.efwGrams ? UnitConverter.formatFetalWeight(m.efwGrams, unitSystem) : '—'}
                            </td>
                            <td className="py-2 px-3 text-stone-600 dark:text-stone-400 text-[11px]">
                              {m.bpdMm ? `${m.bpdMm} mm` : '—'} / {m.hcMm ? `${m.hcMm} mm` : '—'}
                            </td>
                            <td className="py-2 px-3 text-stone-600 dark:text-stone-400 text-[11px]">
                              {m.acMm ? `${m.acMm} mm` : '—'} / {m.flMm ? `${m.flMm} mm` : '—'}
                            </td>
                            <td className="py-2 px-3 font-sans text-stone-500 dark:text-stone-400 text-[11px] truncate max-w-[140px]">
                              {m.notes || m.scanLocation || 'Routine scan'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: KICK SESSIONS */}
          {activeTab === 'kicks' && (
            <div className="space-y-3">
              {kickSessions.length === 0 ? (
                <div className="p-8 text-center bg-stone-50 dark:bg-stone-800/40 rounded-2xl border border-dashed border-stone-200 dark:border-stone-800">
                  <span className="text-2xl block mb-2">👣</span>
                  <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                    No kick counting sessions were recorded during pregnancy.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {kickSessions.map((k) => (
                    <div
                      key={k.id}
                      className="p-3 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-800/40 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold">
                          {k.kicksCount}
                        </div>
                        <div>
                          <div className="font-semibold text-stone-900 dark:text-white flex items-center gap-1.5">
                            <span>{k.date}</span>
                            <span className="text-stone-400 text-[11px]">at {k.startTime}</span>
                          </div>
                          <div className="text-[11px] text-stone-500 dark:text-stone-400">
                            Duration: {Math.floor(k.durationSeconds / 60)}m {k.durationSeconds % 60}s · {k.notes || 'Active fetal movements'}
                          </div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">
                        10 Kicks Counted ✓
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PRENATAL LOVE LETTERS */}
          {activeTab === 'letters' && (
            <div className="space-y-3">
              {loveNotes.length === 0 ? (
                <div className="p-8 text-center bg-stone-50 dark:bg-stone-800/40 rounded-2xl border border-dashed border-stone-200 dark:border-stone-800">
                  <Heart className="w-8 h-8 text-rose-300 mx-auto mb-2 opacity-60" />
                  <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                    No letters were written during pregnancy for this profile.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {loveNotes.map((n) => (
                    <div
                      key={n.id}
                      className="p-4 rounded-2xl border border-amber-200/80 dark:border-amber-900/50 bg-amber-50/40 dark:bg-amber-950/20 text-xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{n.emoji || '💌'}</span>
                          <span className="font-bold text-stone-900 dark:text-white">{n.stageLabel}</span>
                          <span>· By {n.author}</span>
                        </div>
                        <span className="font-mono text-[10px]">{n.date}</span>
                      </div>
                      <p className="text-stone-800 dark:text-stone-200 font-serif italic text-xs leading-relaxed">
                        "{n.content}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SUMMARY & BASELINES */}
          {activeTab === 'summary' && (
            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 space-y-2">
                <h4 className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>The Story of {babyProfile.name}'s Arrival</span>
                </h4>
                <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                  During pregnancy, your baby was lovingly tracked under the nickname <span className="font-bold text-stone-900 dark:text-white">{fetalName}</span>.
                  Estimated due date was set for <span className="font-semibold text-stone-900 dark:text-white font-mono">{dueDate}</span>, and {babyProfile.name} made their grand arrival on <span className="font-semibold text-stone-900 dark:text-white font-mono">{babyProfile.dateOfEvent}</span>!
                </p>
                {fetalProfile?.prePregnancyWeightKg && (
                  <div className="pt-2 border-t border-stone-200 dark:border-stone-700 flex justify-between text-stone-500 dark:text-stone-400">
                    <span>Maternal Pre-Pregnancy Weight:</span>
                    <span className="font-bold text-stone-900 dark:text-white font-mono">
                      {UnitConverter.formatWeight(fetalProfile.prePregnancyWeightKg, unitSystem)}
                    </span>
                  </div>
                )}
                {babyProfile.birthWeightKg && (
                  <div className="flex justify-between text-stone-500 dark:text-stone-400">
                    <span>Birth Weight at Delivery:</span>
                    <span className="font-bold text-emerald-800 dark:text-emerald-400 font-mono">
                      {UnitConverter.formatWeight(babyProfile.birthWeightKg, unitSystem)}
                    </span>
                  </div>
                )}
                {babyProfile.notes && (
                  <div className="pt-2 border-t border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300">
                    <span className="font-semibold text-stone-900 dark:text-white">Delivery Notes: </span>
                    <span>{babyProfile.notes}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-3 border-t border-stone-100 dark:border-stone-800 shrink-0">
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Keepsake Summary</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white dark:text-stone-900 rounded-xl transition-colors shadow-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
