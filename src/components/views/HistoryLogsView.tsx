import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { calculatePercentile, UnitConverter } from '../../data/growthStandards';
import {
  ClipboardList,
  Plus,
  Trash2,
  FileText,
  History,
  HeartPulse,
  Baby,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { AttachedPrenatalHistoryModal } from '../modals/AttachedPrenatalHistoryModal';

interface HistoryLogsViewProps {
  onOpenLogModal: () => void;
  onOpenExportModal: () => void;
}

export const HistoryLogsView: React.FC<HistoryLogsViewProps> = ({
  onOpenLogModal,
  onOpenExportModal,
}) => {
  const {
    activeProfile,
    activeBabyMeasurements,
    activeFetalMeasurements,
    getAttachedFetalProfile,
    getAttachedFetalMeasurements,
    getAttachedKickSessions,
    deleteBabyMeasurement,
    deleteFetalMeasurement,
    unitSystem,
  } = useApp();

  const [babyLogTab, setBabyLogTab] = useState<'baby' | 'fetal-history'>('baby');
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  if (!activeProfile) return null;

  const isBaby = activeProfile.type === 'baby';
  const hasAttachedFetal = isBaby && Boolean(activeProfile.attachedFetalProfileId);
  const attachedFetalProfile = hasAttachedFetal ? getAttachedFetalProfile(activeProfile.id) : undefined;
  const attachedFetalScans = hasAttachedFetal ? getAttachedFetalMeasurements(activeProfile.id) : [];

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-5 md:p-6 shadow-xs transition-colors">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 flex items-center justify-center shadow-2xs">
              <ClipboardList className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-bold text-stone-900 dark:text-white">
              Measurement Logs & History
            </h2>
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Complete record of clinical checkups, ultrasound scans, and observations for {activeProfile.name}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {hasAttachedFetal && (
            <button
              onClick={() => setIsHistoryModalOpen(true)}
              className="px-3.5 py-2 text-xs font-semibold text-amber-900 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 dark:hover:bg-amber-900 border border-amber-200 dark:border-amber-800 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <History className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>In-Womb Keepsake</span>
            </button>
          )}

          <button
            onClick={onOpenExportModal}
            className="px-3.5 py-2 text-xs font-semibold text-stone-700 dark:text-stone-200 hover:text-stone-900 dark:hover:text-white bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 border border-stone-200/60 dark:border-stone-700/60 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <FileText className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" />
            <span>Generate Report</span>
          </button>
          <button
            onClick={onOpenLogModal}
            className="px-4 py-2 text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white dark:text-stone-900 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Entry</span>
          </button>
        </div>
      </div>

      {/* Sub-view switcher for babies with attached fetal records */}
      {hasAttachedFetal && (
        <div className="flex items-center justify-between gap-3 p-1.5 bg-stone-100 dark:bg-stone-850 rounded-2xl border border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setBabyLogTab('baby')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                babyLogTab === 'baby'
                  ? 'bg-white dark:bg-stone-750 text-stone-900 dark:text-white shadow-xs font-bold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <Baby className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Pediatric Checkups ({activeBabyMeasurements.length})</span>
            </button>
            <button
              onClick={() => setBabyLogTab('fetal-history')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                babyLogTab === 'fetal-history'
                  ? 'bg-white dark:bg-stone-750 text-amber-900 dark:text-amber-200 shadow-xs font-bold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <HeartPulse className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Attached Ultrasound Scans ({attachedFetalScans.length})</span>
            </button>
          </div>

          <button
            onClick={() => setIsHistoryModalOpen(true)}
            className="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1 px-3 py-1 cursor-pointer"
          >
            <span>Review Full Prenatal Journey</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Main Table or Card List */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-xs overflow-hidden transition-colors">
        {isBaby && babyLogTab === 'baby' ? (
          activeBabyMeasurements.length === 0 ? (
            <div className="p-12 text-center text-xs text-stone-500 dark:text-stone-400">
              No baby measurements recorded yet. Click &quot;Add New Entry&quot; to log a checkup.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-stone-50/80 dark:bg-stone-850/80 border-b border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400 text-[11px] font-semibold">
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Age</th>
                    <th className="py-3 px-4">Weight</th>
                    <th className="py-3 px-4">Weight %ile</th>
                    <th className="py-3 px-4">Length</th>
                    <th className="py-3 px-4">Head Circ.</th>
                    <th className="py-3 px-4">Notes & Observations</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800 text-stone-700 dark:text-stone-300">
                  {activeBabyMeasurements.map((m) => {
                    const weightPct = m.weightKg
                      ? calculatePercentile(m.weightKg, m.ageInMonths, 'weight', activeProfile.gender)
                      : null;

                    return (
                      <tr key={m.id} className="hover:bg-stone-50/70 dark:hover:bg-stone-800/40 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-stone-900 dark:text-white whitespace-nowrap">
                          {m.date}
                          {m.pediatricianVisit && (
                            <span className="block text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">
                              Well-child check
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap font-mono">
                          {m.ageInMonths} mo
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold whitespace-nowrap">
                          {m.weightKg ? UnitConverter.formatWeight(m.weightKg, unitSystem) : '—'}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {weightPct ? (
                            <span className="font-bold text-emerald-800 dark:text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-100/70 dark:bg-emerald-950/70 border border-emerald-200/60 dark:border-emerald-800/60">
                              {weightPct.percentile}th %ile
                            </span>
                          ) : (
                            '—'
                          )}
                        </td>
                        <td className="py-3.5 px-4 font-mono whitespace-nowrap">
                          {m.lengthCm ? UnitConverter.formatLength(m.lengthCm, unitSystem) : '—'}
                        </td>
                        <td className="py-3.5 px-4 font-mono whitespace-nowrap">
                          {m.headCircumferenceCm
                            ? UnitConverter.formatLength(m.headCircumferenceCm, unitSystem)
                            : '—'}
                        </td>
                        <td className="py-3.5 px-4 max-w-xs truncate text-stone-500 dark:text-stone-400">
                          {m.notes || '—'}
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <button
                            onClick={() => {
                              if (confirm('Delete this measurement?')) {
                                deleteBabyMeasurement(m.id);
                              }
                            }}
                            className="p-1.5 text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )
        ) : isBaby && babyLogTab === 'fetal-history' ? (
          attachedFetalScans.length === 0 ? (
            <div className="p-12 text-center text-xs text-stone-500 dark:text-stone-400">
              No attached ultrasound scans found for this baby profile.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-amber-50/60 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-900 text-stone-600 dark:text-stone-300 text-[11px] font-semibold">
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Gestational Age</th>
                    <th className="py-3 px-4">EFW (Est. Weight)</th>
                    <th className="py-3 px-4">BPD (Head)</th>
                    <th className="py-3 px-4">HC</th>
                    <th className="py-3 px-4">AC</th>
                    <th className="py-3 px-4">FL (Femur)</th>
                    <th className="py-3 px-4">Fundal Ht.</th>
                    <th className="py-3 px-4">Clinic / Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800 text-stone-700 dark:text-stone-300 font-mono">
                  {attachedFetalScans.map((m) => (
                    <tr key={m.id} className="hover:bg-stone-50/70 dark:hover:bg-stone-800/40 transition-colors">
                      <td className="py-3.5 px-4 font-sans font-bold text-stone-900 dark:text-white whitespace-nowrap">
                        {m.date}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap font-bold text-amber-900 dark:text-amber-400">
                        {m.gestationalWeeks}w {m.gestationalDays}d
                      </td>
                      <td className="py-3.5 px-4 font-bold text-emerald-800 dark:text-emerald-400 whitespace-nowrap">
                        {m.efwGrams ? UnitConverter.formatFetalWeight(m.efwGrams, unitSystem) : '—'}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {m.bpdMm ? `${m.bpdMm} mm` : '—'}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {m.hcMm ? `${m.hcMm} mm` : '—'}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {m.acMm ? `${m.acMm} mm` : '—'}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {m.flMm ? `${m.flMm} mm` : '—'}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {m.fundalHeightCm ? `${m.fundalHeightCm} cm` : '—'}
                      </td>
                      <td className="py-3.5 px-4 font-sans max-w-xs truncate text-stone-500 dark:text-stone-400">
                        {m.notes || m.scanLocation || '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : activeFetalMeasurements.length === 0 ? (
          <div className="p-12 text-center text-xs text-stone-500 dark:text-stone-400">
            No ultrasound scans logged yet. Click &quot;Add New Entry&quot; to log a scan.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-stone-50/80 dark:bg-stone-850/80 border-b border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400 text-[11px] font-semibold">
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Gestational Age</th>
                  <th className="py-3 px-4">EFW (Weight)</th>
                  <th className="py-3 px-4">BPD (Head)</th>
                  <th className="py-3 px-4">HC</th>
                  <th className="py-3 px-4">AC</th>
                  <th className="py-3 px-4">FL (Femur)</th>
                  <th className="py-3 px-4">Fundal Ht.</th>
                  <th className="py-3 px-4">Maternal Wt.</th>
                  <th className="py-3 px-4">Clinic / Notes</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800 text-stone-700 dark:text-stone-300">
                {activeFetalMeasurements.map((m) => (
                  <tr key={m.id} className="hover:bg-stone-50/70 dark:hover:bg-stone-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-stone-900 dark:text-white whitespace-nowrap">
                      {m.date}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap font-mono font-bold text-amber-900 dark:text-amber-400">
                      {m.gestationalWeeks}w {m.gestationalDays}d
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-800 dark:text-emerald-400 whitespace-nowrap">
                      {m.efwGrams ? UnitConverter.formatFetalWeight(m.efwGrams, unitSystem) : '—'}
                    </td>
                    <td className="py-3.5 px-4 font-mono whitespace-nowrap">
                      {m.bpdMm ? `${m.bpdMm} mm` : '—'}
                    </td>
                    <td className="py-3.5 px-4 font-mono whitespace-nowrap">
                      {m.hcMm ? `${m.hcMm} mm` : '—'}
                    </td>
                    <td className="py-3.5 px-4 font-mono whitespace-nowrap">
                      {m.acMm ? `${m.acMm} mm` : '—'}
                    </td>
                    <td className="py-3.5 px-4 font-mono whitespace-nowrap">
                      {m.flMm ? `${m.flMm} mm` : '—'}
                    </td>
                    <td className="py-3.5 px-4 font-mono whitespace-nowrap">
                      {m.fundalHeightCm ? `${m.fundalHeightCm} cm` : '—'}
                    </td>
                    <td className="py-3.5 px-4 font-mono whitespace-nowrap">
                      {m.maternalWeightKg
                        ? unitSystem === 'metric'
                          ? `${m.maternalWeightKg} kg`
                          : `${(m.maternalWeightKg * 2.20462).toFixed(1)} lb`
                        : '—'}
                    </td>
                    <td className="py-3.5 px-4 max-w-xs truncate text-stone-500 dark:text-stone-400">
                      {m.notes || m.scanLocation || '—'}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => {
                          if (confirm('Delete this ultrasound record?')) {
                            deleteFetalMeasurement(m.id);
                          }
                        }}
                        className="p-1.5 text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Attached Prenatal History Modal */}
      {hasAttachedFetal && (
        <AttachedPrenatalHistoryModal
          isOpen={isHistoryModalOpen}
          onClose={() => setIsHistoryModalOpen(false)}
          babyProfile={activeProfile}
        />
      )}
    </div>
  );
};
