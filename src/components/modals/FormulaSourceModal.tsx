import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FORMULA_CATALOG,
  calculateDynamicEFW,
  FormulaDocumentation,
} from '../../data/formulaSources';
import {
  FetalFormulaId,
  GestationalMethodId,
  GrowthStandardId,
  CustomFormulaConfig,
} from '../../types';
import { X, BookOpen, Check, Calculator, Settings2, Sliders, Info, Sparkles } from 'lucide-react';

interface FormulaSourceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FormulaSourceModal: React.FC<FormulaSourceModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { formulaSettings, updateFormulaSettings, unitSystem } = useApp();

  const [activeTab, setActiveTab] = useState<'efw' | 'gestational' | 'who' | 'sandbox'>('efw');

  // Custom formula inputs
  const [customName, setCustomName] = useState(formulaSettings.customFormula.name);
  const [customIntercept, setCustomIntercept] = useState(formulaSettings.customFormula.baseIntercept.toString());
  const [customAc, setCustomAc] = useState(formulaSettings.customFormula.acCoeff.toString());
  const [customFl, setCustomFl] = useState(formulaSettings.customFormula.flCoeff.toString());
  const [customHc, setCustomHc] = useState(formulaSettings.customFormula.hcCoeff.toString());
  const [customBpd, setCustomBpd] = useState(formulaSettings.customFormula.bpdCoeff.toString());
  const [customAcFl, setCustomAcFl] = useState(formulaSettings.customFormula.acFlInteractionCoeff.toString());

  // Gestational settings
  const [gestationalMethod, setGestationalMethod] = useState<GestationalMethodId>(formulaSettings.gestationalMethod);
  const [customDays, setCustomDays] = useState(formulaSettings.customGestationalDays.toString());

  // Sandbox inputs
  const [sandboxBpd, setSandboxBpd] = useState('72');
  const [sandboxHc, setSandboxHc] = useState('265');
  const [sandboxAc, setSandboxAc] = useState('245');
  const [sandboxFl, setSandboxFl] = useState('54');

  if (!isOpen) return null;

  const handleSelectEfwFormula = (id: FetalFormulaId) => {
    updateFormulaSettings({ fetalEfwFormula: id });
  };

  const handleSaveCustomFormula = (e: React.FormEvent) => {
    e.preventDefault();
    const newConfig: CustomFormulaConfig = {
      name: customName.trim() || 'Custom Formula',
      equationDescription: 'User-calibrated biometric regression model',
      baseIntercept: parseFloat(customIntercept) || 1.35,
      acCoeff: parseFloat(customAc) || 0.042,
      flCoeff: parseFloat(customFl) || 0.174,
      hcCoeff: parseFloat(customHc) || 0.006,
      bpdCoeff: parseFloat(customBpd) || 0.0006,
      acFlInteractionCoeff: parseFloat(customAcFl) || -0.0038,
    };
    updateFormulaSettings({
      fetalEfwFormula: 'custom',
      customFormula: newConfig,
    });
  };

  const handleSaveGestationalMethod = () => {
    updateFormulaSettings({
      gestationalMethod,
      customGestationalDays: parseInt(customDays) || 280,
    });
  };

  // Sandbox computations
  const bpdNum = parseFloat(sandboxBpd) || undefined;
  const hcNum = parseFloat(sandboxHc) || undefined;
  const acNum = parseFloat(sandboxAc) || undefined;
  const flNum = parseFloat(sandboxFl) || undefined;

  const testHadlock4 = calculateDynamicEFW(
    { bpdMm: bpdNum, hcMm: hcNum, acMm: acNum, flMm: flNum },
    { ...formulaSettings, fetalEfwFormula: 'hadlock4' }
  );

  const testHadlock3 = calculateDynamicEFW(
    { bpdMm: bpdNum, hcMm: hcNum, acMm: acNum, flMm: flNum },
    { ...formulaSettings, fetalEfwFormula: 'hadlock3' }
  );

  const testShepard = calculateDynamicEFW(
    { bpdMm: bpdNum, hcMm: hcNum, acMm: acNum, flMm: flNum },
    { ...formulaSettings, fetalEfwFormula: 'shepard' }
  );

  const testIntergrowth = calculateDynamicEFW(
    { bpdMm: bpdNum, hcMm: hcNum, acMm: acNum, flMm: flNum },
    { ...formulaSettings, fetalEfwFormula: 'intergrowth21' }
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 md:p-8 shadow-2xl border border-stone-200 relative my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-900">
                Clinical Data Formulas & Scientific Sources
              </h3>
              <p className="text-xs text-stone-500">
                Transparent equations, peer-reviewed clinical citations, and custom formula configuration.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1.5 mt-4 pb-2 border-b border-stone-100 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('efw')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'efw'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 bg-stone-100'
            }`}
          >
            Fetal EFW Formulas ({formulaSettings.fetalEfwFormula.toUpperCase()})
          </button>
          <button
            onClick={() => setActiveTab('gestational')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'gestational'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 bg-stone-100'
            }`}
          >
            Gestational Age Methods
          </button>
          <button
            onClick={() => setActiveTab('who')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'who'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 bg-stone-100'
            }`}
          >
            WHO LMS Percentile Method
          </button>
          <button
            onClick={() => setActiveTab('sandbox')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'sandbox'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 bg-stone-100'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Formula Comparison Sandbox</span>
          </button>
        </div>

        {/* TAB 1: FETAL EFW FORMULAS */}
        {activeTab === 'efw' && (
          <div className="mt-4 space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            <p className="text-xs text-stone-600 leading-relaxed">
              Ultrasound estimation of fetal weight relies on multivariable regression models. Select your preferred clinical standard or calibrate custom coefficients for your clinic:
            </p>

            <div className="space-y-3">
              {FORMULA_CATALOG.filter((f) => f.id !== 'custom').map((f) => {
                const isSelected = formulaSettings.fetalEfwFormula === f.id;
                return (
                  <div
                    key={f.id}
                    onClick={() => handleSelectEfwFormula(f.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50/30 ring-1 ring-amber-400'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-stone-900">{f.name}</h4>
                          <span className="text-[11px] text-stone-400">({f.year})</span>
                        </div>
                        <span className="text-xs text-amber-900 font-medium block mt-0.5">
                          {f.source}
                        </span>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'border-amber-600 bg-amber-600 text-white'
                            : 'border-stone-300'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>

                    {/* Equation Formula Box */}
                    <div className="mt-2.5 p-2.5 bg-stone-50 rounded-xl font-mono text-[11px] text-stone-800 border border-stone-200/60 overflow-x-auto">
                      {f.equationDisplay}
                    </div>

                    <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                      {f.clinicalNotes}
                    </p>

                    <div className="mt-2 pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between text-[11px] text-stone-500 gap-1">
                      <span>Requires: <strong>{f.requiredParameters.join(', ')}</strong></span>
                      <span className="italic">{f.recommendedFor}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Custom Formula Builder Accordion */}
            <div className="border border-stone-200 rounded-2xl p-4 bg-stone-50/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-amber-700" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                    Configure Custom Formula Coefficients
                  </h4>
                </div>
                <span className="text-[11px] text-stone-500">Log10 Polynomial Model</span>
              </div>

              <form onSubmit={handleSaveCustomFormula} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    Formula Name / Clinic Protocol
                  </label>
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-stone-200 rounded-lg bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div>
                    <label className="block text-[10px] text-stone-500 mb-0.5">Base Intercept (a)</label>
                    <input
                      type="number"
                      step="0.0001"
                      value={customIntercept}
                      onChange={(e) => setCustomIntercept(e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-stone-200 rounded-lg bg-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-stone-500 mb-0.5">AC Coeff (b)</label>
                    <input
                      type="number"
                      step="0.0001"
                      value={customAc}
                      onChange={(e) => setCustomAc(e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-stone-200 rounded-lg bg-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-stone-500 mb-0.5">FL Coeff (c)</label>
                    <input
                      type="number"
                      step="0.0001"
                      value={customFl}
                      onChange={(e) => setCustomFl(e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-stone-200 rounded-lg bg-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-stone-500 mb-0.5">HC Coeff (d)</label>
                    <input
                      type="number"
                      step="0.0001"
                      value={customHc}
                      onChange={(e) => setCustomHc(e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-stone-200 rounded-lg bg-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-stone-500 mb-0.5">BPD Coeff (e)</label>
                    <input
                      type="number"
                      step="0.0001"
                      value={customBpd}
                      onChange={(e) => setCustomBpd(e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-stone-200 rounded-lg bg-white font-mono"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] text-stone-500 mb-0.5">AC · FL Interaction (f)</label>
                    <input
                      type="number"
                      step="0.00001"
                      value={customAcFl}
                      onChange={(e) => setCustomAcFl(e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-stone-200 rounded-lg bg-white font-mono"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-lg transition-colors shadow-xs"
                  >
                    Activate Custom Formula
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 2: GESTATIONAL AGE METHODS */}
        {activeTab === 'gestational' && (
          <div className="mt-4 space-y-4">
            <p className="text-xs text-stone-600 leading-relaxed">
              Standard clinical calculations establish estimated due dates and gestational age based on specific biological assumptions regarding follicular phases:
            </p>

            <div className="space-y-3">
              {/* Naegele's rule */}
              <div
                onClick={() => setGestationalMethod('naegele')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  gestationalMethod === 'naegele'
                    ? 'border-amber-500 bg-amber-50/30 ring-1 ring-amber-400'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-stone-900">
                    Naegele’s Rule (Standard 280 Days)
                  </h4>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${gestationalMethod === 'naegele' ? 'border-amber-600 bg-amber-600 text-white' : 'border-stone-300'}`}>
                    {gestationalMethod === 'naegele' && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
                <div className="mt-1.5 font-mono text-[11px] text-stone-700 bg-stone-50 p-2 rounded-lg border border-stone-200/60">
                  Gestational Age = Days since LMP = (Due Date - 280 Days)
                </div>
                <p className="text-xs text-stone-500 mt-1.5">
                  The universal standard used by ACOG and WHO assuming a standard 28-day cycle with ovulation on Day 14 (40 weeks total).
                </p>
              </div>

              {/* Mittendorf-Williams */}
              <div
                onClick={() => setGestationalMethod('mittendorf')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  gestationalMethod === 'mittendorf'
                    ? 'border-amber-500 bg-amber-50/30 ring-1 ring-amber-400'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-stone-900">
                    Mittendorf-Williams Rule (288 Days)
                  </h4>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${gestationalMethod === 'mittendorf' ? 'border-amber-600 bg-amber-600 text-white' : 'border-stone-300'}`}>
                    {gestationalMethod === 'mittendorf' && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
                <div className="mt-1.5 font-mono text-[11px] text-stone-700 bg-stone-50 p-2 rounded-lg border border-stone-200/60">
                  Primigravida Duration = LMP + 288 Days (41 weeks + 1 day)
                </div>
                <p className="text-xs text-stone-500 mt-1.5">
                  Published in Obstetrics & Gynecology (1990). Demonstrates that healthy first-time mothers naturally average 8 days longer than Naegele's model.
                </p>
              </div>

              {/* Custom Days */}
              <div
                onClick={() => setGestationalMethod('customDays')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  gestationalMethod === 'customDays'
                    ? 'border-amber-500 bg-amber-50/30 ring-1 ring-amber-400'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-stone-900">
                    Custom Cycle Length / IVF Calibrated Days
                  </h4>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${gestationalMethod === 'customDays' ? 'border-amber-600 bg-amber-600 text-white' : 'border-stone-300'}`}>
                    {gestationalMethod === 'customDays' && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  Adjust duration for longer/shorter menstrual cycles (e.g. 35-day cycle: 287 days) or exact IVF 5-day blastocyst embryo transfer (266 days from retrieval).
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <label className="text-xs font-semibold text-stone-700">Total Pregnancy Days:</label>
                  <input
                    type="number"
                    min="250"
                    max="310"
                    value={customDays}
                    onChange={(e) => setCustomDays(e.target.value)}
                    className="w-24 px-2 py-1 text-xs border border-stone-200 rounded-lg font-mono"
                  />
                  <span className="text-xs text-stone-400">days ({((parseInt(customDays) || 280) / 7).toFixed(1)} weeks)</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={handleSaveGestationalMethod}
                className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-colors shadow-xs"
              >
                Save Gestational Method
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: WHO LMS PERCENTILE METHOD */}
        {activeTab === 'who' && (
          <div className="mt-4 space-y-4 text-xs text-stone-700 leading-relaxed">
            <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200/80 space-y-2">
              <h4 className="text-sm font-bold text-emerald-950">
                World Health Organization (WHO) Child Growth Standards (2006)
              </h4>
              <p>
                The WHO Multicentre Growth Reference Study (MGRS) assessed 8,440 healthy breastfed children from six diverse countries (Brazil, Ghana, India, Norway, Oman, USA) raised in optimal socio-environmental conditions.
              </p>
              <div className="font-mono text-[11px] p-2 bg-white rounded-lg border border-emerald-200 text-emerald-950">
                Z-Score LMS Formula: Z = [ (X / M)^L - 1 ] / (L · S)  (if L ≠ 0)
              </div>
              <ul className="space-y-1 list-disc list-inside text-stone-600 pt-1">
                <li><strong>L (Lambda):</strong> Box-Cox power transformation parameter correcting for skewness.</li>
                <li><strong>M (Mu):</strong> Median value for exact age in months.</li>
                <li><strong>S (Sigma):</strong> Generalized coefficient of variation.</li>
              </ul>
            </div>

            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
              <h5 className="font-bold text-stone-900">Why WHO Standards vs. CDC 2000 Reference?</h5>
              <p>
                The AAP (American Academy of Pediatrics) and CDC officially recommend using <strong>WHO Growth Standards</strong> for all infants aged 0 to 24 months because they describe how children <em>should grow under optimal conditions</em> (prescriptive), rather than how children in a specific region happened to grow in the 1970s–1990s (descriptive).
              </p>
            </div>
          </div>
        )}

        {/* TAB 4: FORMULA SANDBOX */}
        {activeTab === 'sandbox' && (
          <div className="mt-4 space-y-4">
            <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/60 text-xs text-amber-950 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                <strong>Live Comparison Sandbox:</strong> Enter test ultrasound millimeter biometrics to observe how different clinical models compute fetal weight simultaneously.
              </span>
            </div>

            {/* Test Inputs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">BPD (mm)</label>
                <input
                  type="number"
                  value={sandboxBpd}
                  onChange={(e) => setSandboxBpd(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-stone-200 rounded-lg font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">HC (mm)</label>
                <input
                  type="number"
                  value={sandboxHc}
                  onChange={(e) => setSandboxHc(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-stone-200 rounded-lg font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">AC (mm)</label>
                <input
                  type="number"
                  value={sandboxAc}
                  onChange={(e) => setSandboxAc(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-stone-200 rounded-lg font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">FL (mm)</label>
                <input
                  type="number"
                  value={sandboxFl}
                  onChange={(e) => setSandboxFl(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-stone-200 rounded-lg font-mono"
                />
              </div>
            </div>

            {/* Comparison Results Table */}
            <div className="overflow-x-auto rounded-xl border border-stone-200">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold text-[11px]">
                    <th className="py-2.5 px-3">Formula Standard</th>
                    <th className="py-2.5 px-3">Estimated Weight</th>
                    <th className="py-2.5 px-3">Imperial Equivalent</th>
                    <th className="py-2.5 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-mono text-xs">
                  <tr className={formulaSettings.fetalEfwFormula === 'hadlock4' ? 'bg-amber-50/40 font-bold' : ''}>
                    <td className="py-2 px-3 font-sans">Hadlock 4-Parameter (1985)</td>
                    <td className="py-2 px-3 text-stone-900">{testHadlock4 ? `${testHadlock4.efwGrams} g` : '—'}</td>
                    <td className="py-2 px-3 text-stone-600">{testHadlock4 ? `${(testHadlock4.efwGrams * 0.035274).toFixed(1)} oz` : '—'}</td>
                    <td className="py-2 px-3 text-right font-sans text-[11px]">{formulaSettings.fetalEfwFormula === 'hadlock4' ? 'Active' : ''}</td>
                  </tr>
                  <tr className={formulaSettings.fetalEfwFormula === 'hadlock3' ? 'bg-amber-50/40 font-bold' : ''}>
                    <td className="py-2 px-3 font-sans">Hadlock 3-Parameter (1984)</td>
                    <td className="py-2 px-3 text-stone-900">{testHadlock3 ? `${testHadlock3.efwGrams} g` : '—'}</td>
                    <td className="py-2 px-3 text-stone-600">{testHadlock3 ? `${(testHadlock3.efwGrams * 0.035274).toFixed(1)} oz` : '—'}</td>
                    <td className="py-2 px-3 text-right font-sans text-[11px]">{formulaSettings.fetalEfwFormula === 'hadlock3' ? 'Active' : ''}</td>
                  </tr>
                  <tr className={formulaSettings.fetalEfwFormula === 'shepard' ? 'bg-amber-50/40 font-bold' : ''}>
                    <td className="py-2 px-3 font-sans">Shepard & Warsof (1982)</td>
                    <td className="py-2 px-3 text-stone-900">{testShepard ? `${testShepard.efwGrams} g` : '—'}</td>
                    <td className="py-2 px-3 text-stone-600">{testShepard ? `${(testShepard.efwGrams * 0.035274).toFixed(1)} oz` : '—'}</td>
                    <td className="py-2 px-3 text-right font-sans text-[11px]">{formulaSettings.fetalEfwFormula === 'shepard' ? 'Active' : ''}</td>
                  </tr>
                  <tr className={formulaSettings.fetalEfwFormula === 'intergrowth21' ? 'bg-amber-50/40 font-bold' : ''}>
                    <td className="py-2 px-3 font-sans">INTERGROWTH-21st (2014)</td>
                    <td className="py-2 px-3 text-stone-900">{testIntergrowth ? `${testIntergrowth.efwGrams} g` : '—'}</td>
                    <td className="py-2 px-3 text-stone-600">{testIntergrowth ? `${(testIntergrowth.efwGrams * 0.035274).toFixed(1)} oz` : '—'}</td>
                    <td className="py-2 px-3 text-right font-sans text-[11px]">{formulaSettings.fetalEfwFormula === 'intergrowth21' ? 'Active' : ''}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 mt-4 border-t border-stone-100 text-xs">
          <span className="text-stone-500">
            Active: <strong>{formulaSettings.fetalEfwFormula.toUpperCase()}</strong> · {formulaSettings.gestationalMethod}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
