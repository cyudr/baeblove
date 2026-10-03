import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { calculatePercentile, UnitConverter } from '../../data/growthStandards';
import { X, Printer, Download, Upload, Check, Copy } from 'lucide-react';

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportReportModal: React.FC<ExportReportModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    activeProfile,
    activeBabyMeasurements,
    activeFetalMeasurements,
    activeCompletedMilestones,
    unitSystem,
    exportDataJSON,
    importDataJSON,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'report' | 'backup'>('report');
  const [copied, setCopied] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  if (!isOpen || !activeProfile) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyJSON = () => {
    const json = exportDataJSON();
    navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJSON = () => {
    const json = exportDataJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sprout_growth_data_${activeProfile.name.toLowerCase().replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importDataJSON(content);
      if (success) {
        setImportStatus('Data restored successfully!');
        setTimeout(() => setImportStatus(null), 3000);
      } else {
        setImportStatus('Failed to import file. Please check format.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-xl border border-stone-200 relative my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-stone-900">
              Clinical Growth Summary & Data Export
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-2 mt-4 pb-2 border-b border-stone-100">
          <button
            onClick={() => setActiveTab('report')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'report'
                ? 'bg-stone-900 text-white'
                : 'text-stone-600 hover:text-stone-900 bg-stone-100'
            }`}
          >
            Pediatrician Visit Summary
          </button>
          <button
            onClick={() => setActiveTab('backup')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'backup'
                ? 'bg-stone-900 text-white'
                : 'text-stone-600 hover:text-stone-900 bg-stone-100'
            }`}
          >
            Data Backup & JSON
          </button>
        </div>

        {/* REPORT TAB */}
        {activeTab === 'report' && (
          <div className="mt-4 space-y-4">
            <div id="printable-report" className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-stone-800 text-xs space-y-3">
              <div className="flex justify-between items-start border-b border-stone-200 pb-2">
                <div>
                  <h4 className="font-bold text-sm text-stone-900">{activeProfile.name}</h4>
                  <div className="text-stone-500 mt-0.5">
                    {activeProfile.type === 'baby' ? 'Birth Date' : 'Estimated Due Date'}: {activeProfile.dateOfEvent} ·{' '}
                    {activeProfile.gender}
                  </div>
                </div>
                <div className="text-right text-stone-500 font-mono text-[11px]">
                  Generated: {new Date().toLocaleDateString()}
                </div>
              </div>

              {/* Baby Measurements Table */}
              {activeProfile.type === 'baby' ? (
                <div>
                  <div className="font-semibold text-stone-900 mb-1">Growth Log History:</div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-stone-200 text-[11px] text-stone-500 font-semibold">
                          <th className="py-1">Date</th>
                          <th className="py-1">Age</th>
                          <th className="py-1">Weight</th>
                          <th className="py-1">Weight %ile</th>
                          <th className="py-1">Length</th>
                          <th className="py-1">Head Circ.</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-200/60 font-mono text-[11px]">
                        {activeBabyMeasurements.map((m) => {
                          const wPct = m.weightKg
                            ? calculatePercentile(m.weightKg, m.ageInMonths, 'weight', activeProfile.gender).percentile
                            : null;
                          return (
                            <tr key={m.id} className="py-1">
                              <td className="py-1">{m.date}</td>
                              <td className="py-1">{m.ageInMonths} mo</td>
                              <td className="py-1">{m.weightKg ? UnitConverter.formatWeight(m.weightKg, unitSystem) : '—'}</td>
                              <td className="py-1">{wPct ? `${wPct}th` : '—'}</td>
                              <td className="py-1">{m.lengthCm ? UnitConverter.formatLength(m.lengthCm, unitSystem) : '—'}</td>
                              <td className="py-1">{m.headCircumferenceCm ? UnitConverter.formatLength(m.headCircumferenceCm, unitSystem) : '—'}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="font-semibold text-stone-900 mb-1">Ultrasound Biometrics Log:</div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-stone-200 text-[11px] text-stone-500 font-semibold">
                          <th className="py-1">Date</th>
                          <th className="py-1">GA</th>
                          <th className="py-1">EFW</th>
                          <th className="py-1">BPD</th>
                          <th className="py-1">HC</th>
                          <th className="py-1">AC</th>
                          <th className="py-1">FL</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-200/60 font-mono text-[11px]">
                        {activeFetalMeasurements.map((m) => (
                          <tr key={m.id} className="py-1">
                            <td className="py-1">{m.date}</td>
                            <td className="py-1">{m.gestationalWeeks}w{m.gestationalDays}d</td>
                            <td className="py-1">{m.efwGrams ? UnitConverter.formatFetalWeight(m.efwGrams, unitSystem) : '—'}</td>
                            <td className="py-1">{m.bpdMm ? `${m.bpdMm} mm` : '—'}</td>
                            <td className="py-1">{m.hcMm ? `${m.hcMm} mm` : '—'}</td>
                            <td className="py-1">{m.acMm ? `${m.acMm} mm` : '—'}</td>
                            <td className="py-1">{m.flMm ? `${m.flMm} mm` : '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Milestones count */}
              <div className="pt-2 border-t border-stone-200 text-stone-600">
                <span className="font-semibold text-stone-900">Recorded Milestones: </span>
                <span>{activeCompletedMilestones.length} milestones successfully marked as achieved.</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-4 h-4" />
                Print / Save PDF
              </button>
            </div>
          </div>
        )}

        {/* BACKUP TAB */}
        {activeTab === 'backup' && (
          <div className="mt-4 space-y-4">
            <p className="text-xs text-stone-600 leading-relaxed">
              Export your full growth tracking history as a local JSON file or copy it to your clipboard. You can restore your data anytime on any device.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleDownloadJSON}
                className="p-3 border border-stone-200 hover:border-stone-300 rounded-xl text-left flex items-center gap-3 transition-colors bg-stone-50/50"
              >
                <Download className="w-5 h-5 text-emerald-700 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-stone-900">Download JSON Backup</div>
                  <div className="text-[11px] text-stone-500">Save complete file to disk</div>
                </div>
              </button>

              <button
                onClick={handleCopyJSON}
                className="p-3 border border-stone-200 hover:border-stone-300 rounded-xl text-left flex items-center gap-3 transition-colors bg-stone-50/50"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <Copy className="w-5 h-5 text-stone-600 shrink-0" />
                )}
                <div>
                  <div className="text-xs font-semibold text-stone-900">
                    {copied ? 'Copied to Clipboard!' : 'Copy JSON to Clipboard'}
                  </div>
                  <div className="text-[11px] text-stone-500">Paste into notes or text file</div>
                </div>
              </button>
            </div>

            {/* Restore area */}
            <div className="pt-4 border-t border-stone-100">
              <label className="block text-xs font-semibold text-stone-900 mb-1">
                Restore from Backup JSON File
              </label>
              <label className="border-2 border-dashed border-stone-200 hover:border-stone-400 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors bg-stone-50/30">
                <Upload className="w-5 h-5 text-stone-400 mb-1" />
                <span className="text-xs font-medium text-stone-700">Click to choose JSON file</span>
                <span className="text-[11px] text-stone-400">Supports Sprout & Bloom exports</span>
                <input
                  type="file"
                  accept=".json,application/json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {importStatus && (
                <div className="mt-2 text-xs font-medium text-emerald-800 text-center">
                  {importStatus}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
