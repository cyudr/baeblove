import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { calculatePercentile, UnitConverter } from '../../data/growthStandards';
import {
  ClipboardList,
  Plus,
  Trash2,
  Calendar,
  Scale,
  Ruler,
  Brain,
  FileText,
  Stethoscope,
} from 'lucide-react';

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
    deleteBabyMeasurement,
    deleteFetalMeasurement,
    unitSystem,
  } = useApp();

  if (!activeProfile) return null;

  const isBaby = activeProfile.type === 'baby';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl border border-stone-200 p-5 md:p-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-stone-700" />
            <h2 className="text-xl font-bold text-stone-900">
              Measurement Logs & History
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Complete record of clinical checkups, ultrasound scans, and observations for {activeProfile.name}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenExportModal}
            className="px-3.5 py-2 text-xs font-medium text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <FileText className="w-4 h-4 text-stone-500" />
            <span>Generate Report</span>
          </button>
          <button
            onClick={onOpenLogModal}
            className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Entry</span>
          </button>
        </div>
      </div>

      {/* Main Table or Card List */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        {isBaby ? (
          activeBabyMeasurements.length === 0 ? (
            <div className="p-8 text-center text-xs text-stone-500">
              No baby measurements recorded yet. Click "Add New Entry" to log Liam's checkup.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-stone-50/70 border-b border-stone-200 text-stone-500 text-[11px] font-semibold">
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
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  {activeBabyMeasurements.map((m) => {
                    const weightPct = m.weightKg
                      ? calculatePercentile(m.weightKg, m.ageInMonths, 'weight', activeProfile.gender)
                      : null;

                    return (
                      <tr key={m.id} className="hover:bg-stone-50/50 transition-colors">
                        <td className="py-3.5 px-4 font-medium text-stone-900 whitespace-nowrap">
                          {m.date}
                          {m.pediatricianVisit && (
                            <span className="block text-[10px] text-emerald-800 font-normal">
                              Well-child check
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap font-mono">
                          {m.ageInMonths} mo
                        </td>
                        <td className="py-3.5 px-4 font-mono whitespace-nowrap">
                          {m.weightKg ? UnitConverter.formatWeight(m.weightKg, unitSystem) : '—'}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {weightPct ? (
                            <span className="font-semibold text-emerald-800">
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
                        <td className="py-3.5 px-4 max-w-xs truncate text-stone-500">
                          {m.notes || '—'}
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <button
                            onClick={() => {
                              if (confirm('Delete this measurement?')) {
                                deleteBabyMeasurement(m.id);
                              }
                            }}
                            className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg transition-colors"
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
        ) : activeFetalMeasurements.length === 0 ? (
          <div className="p-8 text-center text-xs text-stone-500">
            No ultrasound scans logged yet. Click "Add New Entry" to log a scan.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-stone-50/70 border-b border-stone-200 text-stone-500 text-[11px] font-semibold">
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
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {activeFetalMeasurements.map((m) => (
                  <tr key={m.id} className="hover:bg-stone-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-stone-900 whitespace-nowrap">
                      {m.date}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap font-mono font-semibold text-amber-900">
                      {m.gestationalWeeks}w {m.gestationalDays}d
                    </td>
                    <td className="py-3.5 px-4 font-mono whitespace-nowrap font-semibold">
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
                    <td className="py-3.5 px-4 max-w-xs truncate text-stone-500">
                      {m.notes || m.scanLocation || '—'}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => {
                          if (confirm('Delete this ultrasound record?')) {
                            deleteFetalMeasurement(m.id);
                          }
                        }}
                        className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg transition-colors"
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
    </div>
  );
};
