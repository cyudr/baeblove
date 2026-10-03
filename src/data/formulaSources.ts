import { FormulaSettings, FetalFormulaId, CustomFormulaConfig } from '../types';

export interface FormulaDocumentation {
  id: FetalFormulaId;
  name: string;
  source: string;
  year: number;
  citation: string;
  equationDisplay: string;
  requiredParameters: string[];
  clinicalNotes: string;
  recommendedFor: string;
}

export const FORMULA_CATALOG: FormulaDocumentation[] = [
  {
    id: 'hadlock4',
    name: 'Hadlock 4-Parameter Formula (Gold Standard)',
    source: 'American Journal of Obstetrics & Gynecology (AJOG)',
    year: 1985,
    citation:
      'Hadlock FP, Harrist RB, Sharman RS, Deter RL, Park SK. "Estimation of fetal weight with the use of head, body, and femur measurements—a prospective study." Am J Obstet Gynecol. 1985 Feb 1;151(3):333-7.',
    equationDisplay:
      'Log10(EFW) = 1.3596 - 0.00386(AC · FL) + 0.0064(HC) + 0.00061(BPD · AC) + 0.0424(AC) + 0.174(FL)',
    requiredParameters: ['BPD', 'HC', 'AC', 'FL'],
    clinicalNotes:
      'Considered the global gold standard in modern ultrasound machines (GE Voluson, Philips, Siemens). Lowest mean absolute error (6.8–7.5%) across gestational weeks 14 to 41.',
    recommendedFor: 'Comprehensive 2nd and 3rd trimester scans where all 4 anatomical biometrics are visible.',
  },
  {
    id: 'hadlock3',
    name: 'Hadlock 3-Parameter Formula',
    source: 'Radiology / Ultrasound in Obstetrics & Gynecology',
    year: 1984,
    citation:
      'Hadlock FP, Harrist RB, Carpenter RJ, Deter RL, Park SK. "Sonographic estimation of fetal weight. The value of head, body, and femur length." Radiology. 1984;150(2):535-40.',
    equationDisplay:
      'Log10(EFW) = 1.326 - 0.00326(AC · FL) + 0.0107(HC) + 0.0438(AC) + 0.158(FL)',
    requiredParameters: ['HC', 'AC', 'FL'],
    clinicalNotes:
      'Does not require Biparietal Diameter (BPD), making it especially accurate when the fetal head is low in the pelvis or dolichocephalic.',
    recommendedFor: 'Late 3rd trimester scans when head engagement obscures transverse BPD calipers.',
  },
  {
    id: 'shepard',
    name: 'Shepard & Warsof Formula',
    source: 'American Journal of Obstetrics & Gynecology',
    year: 1982,
    citation:
      'Shepard MJ, Richards VA, Berkowitz RL, Warsof SL, Hobbins JC. "An evaluation of two equations for predicting fetal weight by ultrasound." Am J Obstet Gynecol. 1982;142(1):47-54.',
    equationDisplay:
      'Log10(EFW) = -1.7492 + 0.166(BPD) + 0.046(AC) - 0.002646(AC · BPD)',
    requiredParameters: ['BPD', 'AC'],
    clinicalNotes:
      'Historic pioneering formula using head diameter and abdominal circumference. Slightly higher variance in macrosomic fetuses (>4000g).',
    recommendedFor: 'Rapid screening or limited 2D scans where femur length cannot be reliably imaged.',
  },
  {
    id: 'intergrowth21',
    name: 'INTERGROWTH-21st International Standard',
    source: 'The Lancet & Oxford University / WHO Collaborative',
    year: 2014,
    citation:
      'Papageorghiou AT, Ohuma EO, Altman DG, et al. "International standards for fetal growth based on serial ultrasound measurements for Fetal Growth Longitudinal Study of the INTERGROWTH-21st Project." Lancet. 2014;384(9946):869-79.',
    equationDisplay:
      'Ln(EFW) = 5.084820 - 54.06633(AC/100)^3 - 95.80076(FL/100)^3 + 3.13637(HC/10) + 0.2863(AC/10)',
    requiredParameters: ['HC', 'AC', 'FL'],
    clinicalNotes:
      'Developed from a diverse multinational cohort across 8 countries to represent optimal fetal growth in healthy, well-nourished mothers worldwide.',
    recommendedFor: 'Multi-ethnic global populations and contemporary international research standards.',
  },
  {
    id: 'custom',
    name: 'Custom Parameterized Formula',
    source: 'User-Defined Biometric Model',
    year: 2026,
    citation: 'Custom coefficients tailored for research, twin pregnancies, or specific clinic protocols.',
    equationDisplay:
      'Log10(EFW) = a + b(AC) + c(FL) + d(HC) + e(BPD) + f(AC · FL)',
    requiredParameters: ['AC', 'FL', '(Optional: HC, BPD)'],
    clinicalNotes:
      'Allows tuning intercept and scaling factors directly to match regional or maternal clinic equipment.',
    recommendedFor: 'Maternal-fetal medicine research, specialized clinical studies, or custom calibrated equipment.',
  },
];

export const DEFAULT_FORMULA_SETTINGS: FormulaSettings = {
  fetalEfwFormula: 'hadlock4',
  gestationalMethod: 'naegele',
  customGestationalDays: 280,
  growthStandard: 'who',
  customFormula: {
    name: 'Custom Clinic Fit',
    equationDescription: 'Custom polynomial fit for EFW',
    baseIntercept: 1.35,
    acCoeff: 0.042,
    flCoeff: 0.174,
    hcCoeff: 0.006,
    bpdCoeff: 0.0006,
    acFlInteractionCoeff: -0.0038,
  },
};

/**
 * Calculate Estimated Fetal Weight in grams using selected formula
 */
export function calculateDynamicEFW(
  params: {
    bpdMm?: number;
    hcMm?: number;
    acMm?: number;
    flMm?: number;
  },
  settings: FormulaSettings = DEFAULT_FORMULA_SETTINGS
): { efwGrams: number; formulaUsed: string } | null {
  const { bpdMm, hcMm, acMm, flMm } = params;
  if (!acMm || !flMm) return null;

  const acCm = acMm / 10;
  const flCm = flMm / 10;
  const bpdCm = bpdMm ? bpdMm / 10 : undefined;
  const hcCm = hcMm ? hcMm / 10 : undefined;

  const formulaId = settings.fetalEfwFormula;

  // Custom formula
  if (formulaId === 'custom') {
    const cf = settings.customFormula;
    let log10 = cf.baseIntercept + cf.acCoeff * acCm + cf.flCoeff * flCm;
    if (hcCm) log10 += cf.hcCoeff * hcCm;
    if (bpdCm) log10 += cf.bpdCoeff * bpdCm;
    log10 += cf.acFlInteractionCoeff * (acCm * flCm);
    return {
      efwGrams: Math.round(Math.pow(10, log10)),
      formulaUsed: `Custom Formula (${cf.name})`,
    };
  }

  // Shepard: requires BPD and AC
  if (formulaId === 'shepard' && bpdMm) {
    const log10 = -1.7492 + 0.166 * bpdCm! + 0.046 * acCm - 0.002646 * (acCm * bpdCm!);
    return {
      efwGrams: Math.round(Math.pow(10, log10)),
      formulaUsed: 'Shepard & Warsof (1982)',
    };
  }

  // INTERGROWTH-21st: requires HC, AC, FL
  if (formulaId === 'intergrowth21' && hcCm !== undefined) {
    // Ln(EFW) approximation based on INTERGROWTH-21st equation
    const lnEfw =
      5.084820 -
      54.06633 * Math.pow(acCm / 100, 3) -
      95.80076 * Math.pow(flCm / 100, 3) +
      0.0313637 * (hcCm * 10) +
      0.02863 * (acCm * 10);
    return {
      efwGrams: Math.round(Math.exp(lnEfw)),
      formulaUsed: 'INTERGROWTH-21st (2014)',
    };
  }

  // Hadlock 4: BPD, HC, AC, FL
  if ((formulaId === 'hadlock4' || !formulaId) && bpdCm && hcCm) {
    const log10 =
      1.3596 -
      0.00386 * (acCm * flCm) +
      0.0064 * hcCm +
      0.00061 * (bpdCm * acCm) +
      0.0424 * acCm +
      0.174 * flCm;
    return {
      efwGrams: Math.round(Math.pow(10, log10)),
      formulaUsed: 'Hadlock 4-Parameter (1985)',
    };
  }

  // Hadlock 3: HC, AC, FL
  if (hcCm) {
    const log10 = 1.326 - 0.00326 * (acCm * flCm) + 0.0107 * hcCm + 0.0438 * acCm + 0.158 * flCm;
    return {
      efwGrams: Math.round(Math.pow(10, log10)),
      formulaUsed: 'Hadlock 3-Parameter (1984)',
    };
  }

  // Hadlock 2-parameter fallback (AC, FL)
  const log10 = 1.304 + 0.05281 * acCm + 0.1938 * flCm - 0.004 * (acCm * flCm);
  return {
    efwGrams: Math.round(Math.pow(10, log10)),
    formulaUsed: 'Hadlock 2-Parameter (AC, FL)',
  };
}

/**
 * Gestational Age calculation based on active method
 */
export function calculateGestationalAgeWithSettings(
  dueDateStr: string,
  settings: FormulaSettings = DEFAULT_FORMULA_SETTINGS
): { weeks: number; days: number; totalDays: number; methodUsed: string } {
  const dueDate = new Date(dueDateStr);
  const today = new Date();

  let standardDays = 280; // Naegele's rule default
  let methodName = "Naegele's Rule (280 days)";

  if (settings.gestationalMethod === 'mittendorf') {
    standardDays = 288;
    methodName = 'Mittendorf-Williams (288 days for first-time mothers)';
  } else if (settings.gestationalMethod === 'customDays') {
    standardDays = settings.customGestationalDays || 280;
    methodName = `Custom Cycle (${standardDays} days)`;
  }

  const lmpDate = new Date(dueDate.getTime() - standardDays * 24 * 60 * 60 * 1000);
  const diffMs = today.getTime() - lmpDate.getTime();
  const totalDays = Math.max(0, Math.floor(diffMs / (24 * 60 * 60 * 1000)));

  const weeks = Math.floor(totalDays / 7);
  const days = totalDays % 7;
  return { weeks, days, totalDays, methodUsed: methodName };
}
