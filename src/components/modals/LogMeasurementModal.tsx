import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { calculatePercentile, UnitConverter } from '../../data/growthStandards';
import { calculateGestationalAge } from '../../data/fetalStandards';
import { calculateDynamicEFW, FORMULA_CATALOG } from '../../data/formulaSources';
import { X, Calendar, Scale, Ruler, Sparkles, Stethoscope, AlertCircle, BookOpen } from 'lucide-react';

interface LogMeasurementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenFormulaModal?: () => void;
}

export const LogMeasurementModal: React.FC<LogMeasurementModalProps> = ({
  isOpen,
  onClose,
  onOpenFormulaModal,
}) => {
  const {
    activeProfile,
    unitSystem,
    formulaSettings,
    addBabyMeasurement,
    addFetalMeasurement,
  } = useApp();

  const todayStr = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(todayStr);

  // Baby fields - both Months and Weeks supported
  const [ageMonths, setAgeMonths] = useState<number>(0);
  const [ageWeeks, setAgeWeeks] = useState<number>(0);
  const [weightInput, setWeightInput] = useState<string>(''); // kg or lbs
  const [weightOzInput, setWeightOzInput] = useState<string>('0'); // for imperial oz
  const [lengthInput, setLengthInput] = useState<string>(''); // cm or inches
  const [hcInput, setHcInput] = useState<string>(''); // cm or inches
  const [pediatricianVisit, setPediatricianVisit] = useState(true);
  const [notes, setNotes] = useState('');

  // Fetal fields
  const [gestationalWeeks, setGestationalWeeks] = useState<number>(20);
  const [gestationalDays, setGestationalDays] = useState<number>(0);
  const [efwInput, setEfwInput] = useState<string>(''); // grams or oz
  const [crlInput, setCrlInput] = useState<string>(''); // mm
  const [bpdInput, setBpdInput] = useState<string>(''); // mm
  const [hcUltrasoundInput, setHcUltrasoundInput] = useState<string>(''); // mm
  const [acInput, setAcInput] = useState<string>(''); // mm
  const [flInput, setFlInput] = useState<string>(''); // mm
  const [fundalHeightInput, setFundalHeightInput] = useState<string>(''); // cm
  const [maternalWeightInput, setMaternalWeightInput] = useState<string>(''); // kg or lbs
  const [scanLocation, setScanLocation] = useState('');

  // Auto-calculate age in months and weeks or gestational age based on date
  useEffect(() => {
    if (!activeProfile) return;
    if (activeProfile.type === 'baby') {
      const birth = new Date(activeProfile.dateOfEvent);
      const current = new Date(date);
      const diffMs = current.getTime() - birth.getTime();
      const totalDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
      const months = Math.round((totalDays / 30.4375) * 10) / 10;
      const weeks = Math.round((totalDays / 7) * 10) / 10;
      setAgeMonths(months);
      setAgeWeeks(weeks);
    } else {
      const ga = calculateGestationalAge(activeProfile.dateOfEvent);
      setGestationalWeeks(ga.weeks);
      setGestationalDays(ga.days);
    }
  }, [activeProfile, date]);

  if (!isOpen || !activeProfile) return null;

  const handleMonthsChange = (val: number) => {
    setAgeMonths(val);
    setAgeWeeks(Math.round(val * 4.345 * 10) / 10);
  };

  const handleWeeksChange = (val: number) => {
    setAgeWeeks(val);
    setAgeMonths(Math.round((val / 4.345) * 10) / 10);
  };

  // Live percentile preview for baby
  const currentWeightKg =
    unitSystem === 'metric'
      ? parseFloat(weightInput) || 0
      : (parseFloat(weightInput) || 0) / 2.20462 + (parseFloat(weightOzInput) || 0) / (2.20462 * 16);

  const weightPercentilePreview =
    activeProfile.type === 'baby' && currentWeightKg > 0
      ? calculatePercentile(currentWeightKg, ageMonths, 'weight', activeProfile.gender)
      : null;

  // Dynamic EFW calculation based on active formula source
  const autoEfwFromActiveFormula = () => {
    const bpd = parseFloat(bpdInput) || undefined;
    const hc = parseFloat(hcUltrasoundInput) || undefined;
    const ac = parseFloat(acInput) || undefined;
    const fl = parseFloat(flInput) || undefined;

    const result = calculateDynamicEFW(
      { bpdMm: bpd, hcMm: hc, acMm: ac, flMm: fl },
      formulaSettings
    );

    if (result) {
      if (unitSystem === 'metric') {
        setEfwInput(result.efwGrams.toString());
      } else {
        const oz = Math.round(result.efwGrams * 0.035274);
        setEfwInput(oz.toString());
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeProfile.type === 'baby') {
      let weightKg: number | undefined;
      if (weightInput) {
        if (unitSystem === 'metric') {
          weightKg = parseFloat(weightInput);
        } else {
          const lbs = parseFloat(weightInput) || 0;
          const oz = parseFloat(weightOzInput) || 0;
          weightKg = UnitConverter.lbsToKg(lbs + oz / 16);
        }
      }

      let lengthCm: number | undefined;
      if (lengthInput) {
        lengthCm = unitSystem === 'metric' ? parseFloat(lengthInput) : UnitConverter.inchesToCm(parseFloat(lengthInput));
      }

      let headCircumferenceCm: number | undefined;
      if (hcInput) {
        headCircumferenceCm = unitSystem === 'metric' ? parseFloat(hcInput) : UnitConverter.inchesToCm(parseFloat(hcInput));
      }

      addBabyMeasurement({
        date,
        ageInMonths: ageMonths,
        ageInWeeks: ageWeeks,
        weightKg,
        lengthCm,
        headCircumferenceCm,
        pediatricianVisit,
        notes: notes.trim() || undefined,
      });
    } else {
      let efwGrams: number | undefined;
      if (efwInput) {
        efwGrams = unitSystem === 'metric' ? parseFloat(efwInput) : UnitConverter.ozToGrams(parseFloat(efwInput));
      }

      let maternalWeightKg: number | undefined;
      if (maternalWeightInput) {
        maternalWeightKg =
          unitSystem === 'metric'
            ? parseFloat(maternalWeightInput)
            : UnitConverter.lbsToKg(parseFloat(maternalWeightInput));
      }

      addFetalMeasurement({
        date,
        gestationalWeeks,
        gestationalDays,
        efwGrams,
        crlMm: crlInput ? parseFloat(crlInput) : undefined,
        bpdMm: bpdInput ? parseFloat(bpdInput) : undefined,
        hcMm: hcUltrasoundInput ? parseFloat(hcUltrasoundInput) : undefined,
        acMm: acInput ? parseFloat(acInput) : undefined,
        flMm: flInput ? parseFloat(flInput) : undefined,
        fundalHeightCm: fundalHeightInput ? parseFloat(fundalHeightInput) : undefined,
        maternalWeightKg,
        notes: notes.trim() || undefined,
        scanLocation: scanLocation.trim() || undefined,
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-stone-200 relative my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div>
            <h3 className="text-lg font-semibold text-stone-900">
              {activeProfile.type === 'baby' ? 'Log Pediatric Checkup' : 'Log Ultrasound & Biometrics'}
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Recording measurements for <span className="font-medium text-stone-700">{activeProfile.name}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Date & Calculated Age / Gestational Age */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Date of Visit / Scan
              </label>
              <div className="relative">
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg focus:outline-hidden focus:border-stone-400"
                />
              </div>
            </div>

            {activeProfile.type === 'baby' ? (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Age (Weeks)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={ageWeeks}
                    onChange={(e) => handleWeeksChange(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg focus:outline-hidden focus:border-stone-400 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Age (Months)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={ageMonths}
                    onChange={(e) => handleMonthsChange(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg focus:outline-hidden focus:border-stone-400 font-mono"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Weeks</label>
                  <input
                    type="number"
                    min="4"
                    max="43"
                    value={gestationalWeeks}
                    onChange={(e) => setGestationalWeeks(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg focus:outline-hidden focus:border-stone-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Days</label>
                  <input
                    type="number"
                    min="0"
                    max="6"
                    value={gestationalDays}
                    onChange={(e) => setGestationalDays(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg focus:outline-hidden focus:border-stone-400"
                  />
                </div>
              </div>
            )}
          </div>

          {/* BABY SPECIFIC FIELDS */}
          {activeProfile.type === 'baby' && (
            <>
              {/* Weight */}
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Weight ({unitSystem === 'metric' ? 'kg' : 'lb & oz'})
                </label>
                {unitSystem === 'metric' ? (
                  <input
                    type="number"
                    step="0.01"
                    placeholder="e.g. 7.25"
                    value={weightInput}
                    onChange={(e) => setWeightInput(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg focus:outline-hidden focus:border-stone-400"
                  />
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <input
                        type="number"
                        step="1"
                        placeholder="Pounds (lbs)"
                        value={weightInput}
                        onChange={(e) => setWeightInput(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg focus:outline-hidden focus:border-stone-400"
                      />
                      <span className="absolute right-3 top-2.5 text-xs text-stone-400">lbs</span>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        max="15.9"
                        placeholder="Ounces (oz)"
                        value={weightOzInput}
                        onChange={(e) => setWeightOzInput(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg focus:outline-hidden focus:border-stone-400"
                      />
                      <span className="absolute right-3 top-2.5 text-xs text-stone-400">oz</span>
                    </div>
                  </div>
                )}

                {/* Instant Percentile Badge */}
                {weightPercentilePreview && (
                  <div className="mt-1.5 flex items-center gap-1.5 text-xs text-emerald-800">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>
                      Approx. <strong>{weightPercentilePreview.percentile}th percentile</strong> (WHO median:{' '}
                      {UnitConverter.formatWeight(weightPercentilePreview.p50, unitSystem)})
                    </span>
                  </div>
                )}
              </div>

              {/* Length & Head Circumference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Length / Height ({unitSystem === 'metric' ? 'cm' : 'inches'})
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder={unitSystem === 'metric' ? 'e.g. 65.5' : 'e.g. 25.8'}
                    value={lengthInput}
                    onChange={(e) => setLengthInput(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg focus:outline-hidden focus:border-stone-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Head Circumference ({unitSystem === 'metric' ? 'cm' : 'inches'})
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder={unitSystem === 'metric' ? 'e.g. 42.0' : 'e.g. 16.5'}
                    value={hcInput}
                    onChange={(e) => setHcInput(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg focus:outline-hidden focus:border-stone-400"
                  />
                </div>
              </div>

              {/* Checkup flag */}
              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={pediatricianVisit}
                  onChange={(e) => setPediatricianVisit(e.target.checked)}
                  className="rounded text-emerald-700 focus:ring-emerald-600"
                />
                <span className="text-xs text-stone-700">Official Pediatrician Well-Child Checkup</span>
              </label>
            </>
          )}

          {/* FETAL ULTRASOUND FIELDS */}
          {activeProfile.type === 'fetal' && (
            <div className="space-y-3">
              {/* Formula Source Banner */}
              <div className="p-2.5 bg-amber-50/70 border border-amber-200/80 rounded-xl flex items-center justify-between text-xs text-amber-950">
                <div className="flex items-center gap-1.5 truncate">
                  <BookOpen className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span className="truncate">Active Formula: <strong>{formulaSettings.fetalEfwFormula.toUpperCase()}</strong></span>
                </div>
                {onOpenFormulaModal && (
                  <button
                    type="button"
                    onClick={onOpenFormulaModal}
                    className="text-[11px] font-semibold text-amber-800 hover:text-amber-950 underline shrink-0"
                  >
                    Change Source →
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">BPD (mm)</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Head diam."
                    value={bpdInput}
                    onChange={(e) => setBpdInput(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs border border-stone-200 rounded-lg focus:outline-hidden focus:border-stone-400 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">HC (mm)</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Head circ."
                    value={hcUltrasoundInput}
                    onChange={(e) => setHcUltrasoundInput(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs border border-stone-200 rounded-lg focus:outline-hidden focus:border-stone-400 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">AC (mm)</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Abdomen"
                    value={acInput}
                    onChange={(e) => setAcInput(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs border border-stone-200 rounded-lg focus:outline-hidden focus:border-stone-400 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">FL (mm)</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Femur"
                    value={flInput}
                    onChange={(e) => setFlInput(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs border border-stone-200 rounded-lg focus:outline-hidden focus:border-stone-400 font-mono"
                  />
                </div>
              </div>

              {/* Dynamic auto-calc button */}
              {(acInput && flInput) && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={autoEfwFromActiveFormula}
                    className="text-xs text-amber-800 hover:text-amber-900 font-medium underline flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Calculate EFW with {formulaSettings.fetalEfwFormula.toUpperCase()}
                  </button>
                </div>
              )}

              {/* EFW & Fundal Height */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Fetal Weight ({unitSystem === 'metric' ? 'g' : 'oz'})
                  </label>
                  <input
                    type="number"
                    placeholder={unitSystem === 'metric' ? 'e.g. 350' : 'e.g. 12'}
                    value={efwInput}
                    onChange={(e) => setEfwInput(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg focus:outline-hidden focus:border-stone-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Fundal Height (cm)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    placeholder="e.g. 24"
                    value={fundalHeightInput}
                    onChange={(e) => setFundalHeightInput(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg focus:outline-hidden focus:border-stone-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Mother's Weight ({unitSystem === 'metric' ? 'kg' : 'lbs'})
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder={unitSystem === 'metric' ? 'e.g. 64.5' : 'e.g. 142'}
                    value={maternalWeightInput}
                    onChange={(e) => setMaternalWeightInput(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg focus:outline-hidden focus:border-stone-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Scan Clinic / Facility
                </label>
                <input
                  type="text"
                  placeholder="e.g. St. Jude Ultrasound Center"
                  value={scanLocation}
                  onChange={(e) => setScanLocation(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg focus:outline-hidden focus:border-stone-400"
                />
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Visit Notes & Observations
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Doctor mentioned baby is meeting milestones well; feeding solids smoothly..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg focus:outline-hidden focus:border-stone-400"
            ></textarea>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg shadow-xs transition-colors"
            >
              Save Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
