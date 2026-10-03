/**
 * Fetal Biometrics & Gestational Development Standards
 * Based on Hadlock et al. ultrasound biometric reference standards and WHO Fetal Growth Chart.
 */

export interface FetalWeekMilestone {
  week: number;
  fruitComparison: string;
  fruitEmoji: string;
  avgLengthCm: number;
  avgLengthInches: number;
  avgWeightGrams: number;
  avgWeightOz: number;
  anatomicalHighlights: string[];
  maternalBodyNotes: string;
  trimester: 1 | 2 | 3;
}

export interface FetalBiometricRef {
  week: number;
  // Estimated Fetal Weight (grams)
  efwP5: number;
  efwP50: number;
  efwP95: number;
  // Biparietal Diameter (mm)
  bpdP5: number;
  bpdP50: number;
  bpdP95: number;
  // Head Circumference (mm)
  hcP5: number;
  hcP50: number;
  hcP95: number;
  // Abdominal Circumference (mm)
  acP5: number;
  acP50: number;
  acP95: number;
  // Femur Length (mm)
  flP5: number;
  flP50: number;
  flP95: number;
}

export const FETAL_BIOMETRIC_STANDARDS: FetalBiometricRef[] = [
  { week: 12, efwP5: 12, efwP50: 14, efwP95: 18, bpdP5: 17, bpdP50: 20, bpdP95: 23, hcP5: 64, hcP50: 72, hcP95: 80, acP5: 50, acP50: 56, acP95: 63, flP5: 6, flP50: 8, flP95: 10 },
  { week: 14, efwP5: 35, efwP50: 43, efwP95: 53, bpdP5: 24, bpdP50: 27, bpdP95: 31, hcP5: 88, hcP50: 98, hcP95: 108, acP5: 68, acP50: 77, acP95: 87, flP5: 12, flP50: 15, flP95: 18 },
  { week: 16, efwP5: 85, efwP50: 100, efwP95: 125, bpdP5: 31, bpdP50: 35, bpdP95: 39, hcP5: 114, hcP50: 126, hcP95: 138, acP5: 90, acP50: 102, acP95: 114, flP5: 18, flP50: 21, flP95: 24 },
  { week: 18, efwP5: 165, efwP50: 190, efwP95: 230, bpdP5: 38, bpdP50: 42, bpdP95: 46, hcP5: 140, hcP50: 153, hcP95: 166, acP5: 114, acP50: 128, acP95: 142, flP5: 24, flP50: 27, flP95: 30 },
  { week: 20, efwP5: 260, efwP50: 300, efwP95: 360, bpdP5: 44, bpdP50: 48, bpdP95: 52, hcP5: 165, hcP50: 178, hcP95: 191, acP5: 138, acP50: 153, acP95: 168, flP5: 30, flP50: 33, flP95: 36 },
  { week: 22, efwP5: 380, efwP50: 430, efwP95: 510, bpdP5: 50, bpdP50: 54, bpdP95: 58, hcP5: 188, hcP50: 202, hcP95: 216, acP5: 161, acP50: 178, acP95: 195, flP5: 35, flP50: 39, flP95: 43 },
  { week: 24, efwP5: 510, efwP50: 600, efwP95: 710, bpdP5: 56, bpdP50: 60, bpdP95: 64, hcP5: 210, hcP50: 224, hcP95: 238, acP5: 183, acP50: 201, acP95: 219, flP5: 41, flP50: 44, flP95: 47 },
  { week: 26, efwP5: 680, efwP50: 760, efwP95: 920, bpdP5: 61, bpdP50: 66, bpdP95: 71, hcP5: 230, hcP50: 245, hcP95: 260, acP5: 204, acP50: 224, acP95: 244, flP5: 45, flP50: 49, flP95: 53 },
  { week: 28, efwP5: 880, efwP50: 1000, efwP95: 1210, bpdP5: 67, bpdP50: 72, bpdP95: 77, hcP5: 249, hcP50: 264, hcP95: 279, acP5: 225, acP50: 246, acP95: 267, flP5: 50, flP50: 54, flP95: 58 },
  { week: 30, efwP5: 1140, efwP50: 1320, efwP95: 1580, bpdP5: 72, bpdP50: 77, bpdP95: 82, hcP5: 266, hcP50: 282, hcP95: 298, acP5: 244, acP50: 266, acP95: 288, flP5: 54, flP50: 58, flP95: 62 },
  { week: 32, efwP5: 1440, efwP50: 1700, efwP95: 2020, bpdP5: 76, bpdP50: 82, bpdP95: 87, hcP5: 282, hcP50: 298, hcP95: 314, acP5: 263, acP50: 286, acP95: 309, flP5: 58, flP50: 62, flP95: 66 },
  { week: 34, efwP5: 1800, efwP50: 2150, efwP95: 2540, bpdP5: 81, bpdP50: 86, bpdP95: 91, hcP5: 296, hcP50: 312, hcP95: 328, acP5: 281, acP50: 305, acP95: 329, flP5: 62, flP50: 66, flP95: 70 },
  { week: 36, efwP5: 2220, efwP50: 2620, efwP95: 3100, bpdP5: 84, bpdP50: 90, bpdP95: 95, hcP5: 308, hcP50: 324, hcP95: 340, acP5: 298, acP50: 323, acP95: 348, flP5: 65, flP50: 70, flP95: 74 },
  { week: 38, efwP5: 2650, efwP50: 3080, efwP95: 3620, bpdP5: 87, bpdP50: 93, bpdP95: 98, hcP5: 317, hcP50: 334, hcP95: 350, acP5: 313, acP50: 339, acP95: 365, flP5: 68, flP50: 73, flP95: 77 },
  { week: 40, efwP5: 2920, efwP50: 3460, efwP95: 4050, bpdP5: 89, bpdP50: 95, bpdP95: 101, hcP5: 324, hcP50: 341, hcP95: 357, acP5: 326, acP50: 353, acP95: 380, flP5: 70, flP50: 75, flP95: 79 },
];

export const FETAL_WEEK_DATA: FetalWeekMilestone[] = [
  {
    week: 4,
    fruitComparison: 'Poppy Seed',
    fruitEmoji: '🌱',
    avgLengthCm: 0.1,
    avgLengthInches: 0.04,
    avgWeightGrams: 0.01,
    avgWeightOz: 0.001,
    anatomicalHighlights: ['Blastocyst implants securely into the uterine lining', 'Amniotic sac and yolk sac begin nourishing embryo', 'Primitive streak forms'],
    maternalBodyNotes: 'Home pregnancy test becomes positive! First missed period and early hormonal shifts.',
    trimester: 1,
  },
  {
    week: 6,
    fruitComparison: 'Sweet Pea',
    fruitEmoji: '🫛',
    avgLengthCm: 0.6,
    avgLengthInches: 0.25,
    avgWeightGrams: 0.2,
    avgWeightOz: 0.01,
    anatomicalHighlights: ['Heart tube beats rhythmically at ~100-160 bpm', 'Neural tube is closing', 'Limb buds for arms and legs begin sprouting'],
    maternalBodyNotes: 'HCG levels surge; mild morning fatigue or nausea often begins.',
    trimester: 1,
  },
  {
    week: 8,
    fruitComparison: 'Wild Raspberry',
    fruitEmoji: '🫐',
    avgLengthCm: 1.6,
    avgLengthInches: 0.6,
    avgWeightGrams: 1.0,
    avgWeightOz: 0.04,
    anatomicalHighlights: ['Fingers and toes are webbed but distinguishing', 'Eyelids form and cover eyes', 'Tiny nostrils and upper lip are visible on 2D scan'],
    maternalBodyNotes: 'Uterus expands to about the size of a grapefruit. Increased olfactory sensitivity.',
    trimester: 1,
  },
  {
    week: 10,
    fruitComparison: 'Prune / Kumquat',
    fruitEmoji: '🍊',
    avgLengthCm: 3.1,
    avgLengthInches: 1.2,
    avgWeightGrams: 4.0,
    avgWeightOz: 0.14,
    anatomicalHighlights: ['Officially transitions from embryo to fetus', 'All vital organs have formed and begin functioning', 'Tiny tooth buds form under gums'],
    maternalBodyNotes: 'Blood volume expands by 40-50% across pregnancy; veins may look more visible.',
    trimester: 1,
  },
  {
    week: 12,
    fruitComparison: 'Plum / Lime',
    fruitEmoji: '🍋',
    avgLengthCm: 5.4,
    avgLengthInches: 2.1,
    avgWeightGrams: 14.0,
    avgWeightOz: 0.5,
    anatomicalHighlights: ['Vocal cords begin to form', 'Intestines move from umbilical cord into abdomen', 'Reflexes begin: hands can open and close fingers'],
    maternalBodyNotes: 'First trimester screening (NT scan) often done this week. Nausea often begins subsiding.',
    trimester: 1,
  },
  {
    week: 14,
    fruitComparison: 'Meyer Lemon',
    fruitEmoji: '🍋',
    avgLengthCm: 8.7,
    avgLengthInches: 3.4,
    avgWeightGrams: 43.0,
    avgWeightOz: 1.5,
    anatomicalHighlights: ['Welcome to the 2nd trimester!', 'Baby can squint, frown, and grimace', 'Thyroid gland begins producing hormones'],
    maternalBodyNotes: 'Surge in energy and appetite. Second trimester glow starts to appear.',
    trimester: 2,
  },
  {
    week: 16,
    fruitComparison: 'Avocado',
    fruitEmoji: '🥑',
    avgLengthCm: 11.6,
    avgLengthInches: 4.6,
    avgWeightGrams: 100.0,
    avgWeightOz: 3.5,
    anatomicalHighlights: ['Eyes make subtle side-to-side movements and can perceive light', 'Skeleton hardening from rubbery cartilage into bone', 'Scalp patterning begins'],
    maternalBodyNotes: 'Second trimester energy boost. "Quickening" (fluttery first kicks) may be felt soon.',
    trimester: 2,
  },
  {
    week: 18,
    fruitComparison: 'Bell Pepper',
    fruitEmoji: '🫑',
    avgLengthCm: 14.2,
    avgLengthInches: 5.6,
    avgWeightGrams: 190.0,
    avgWeightOz: 6.7,
    anatomicalHighlights: ['Myelin coating begins insulating nerves', 'Baby can hear blood rushing and mother’s voice', 'Frequent stretching and yawning'],
    maternalBodyNotes: 'Heart working 40–50% harder; remember to rest and hydrate.',
    trimester: 2,
  },
  {
    week: 20,
    fruitComparison: 'Banana',
    fruitEmoji: '🍌',
    avgLengthCm: 25.6,
    avgLengthInches: 10.1,
    avgWeightGrams: 300.0,
    avgWeightOz: 10.6,
    anatomicalHighlights: ['Midpoint of pregnancy! Anatomy scan week.', 'Baby swallows amniotic fluid practicing digestion', 'Vernix caseosa and lanugo protect delicate skin'],
    maternalBodyNotes: 'Fundal height usually reaches level of navel (~20 cm). Kicks are distinctly felt.',
    trimester: 2,
  },
  {
    week: 22,
    fruitComparison: 'Papaya',
    fruitEmoji: '🥭',
    avgLengthCm: 27.8,
    avgLengthInches: 10.9,
    avgWeightGrams: 430.0,
    avgWeightOz: 15.2,
    anatomicalHighlights: ['Lips and eyebrows become distinct', 'Eyes have formed though irises still lack pigment', 'Grasp reflex is strong enough to hold umbilical cord'],
    maternalBodyNotes: 'Feet and ankles may hold mild water; elevate legs in the evening.',
    trimester: 2,
  },
  {
    week: 24,
    fruitComparison: 'Ear of Corn',
    fruitEmoji: '🌽',
    avgLengthCm: 30.0,
    avgLengthInches: 11.8,
    avgWeightGrams: 600.0,
    avgWeightOz: 21.2,
    anatomicalHighlights: ['Surfactant production begins in developing lungs', 'Auditory system functional: baby hears mother’s heartbeat & voice', 'Distinct sleep and wake cycles emerge'],
    maternalBodyNotes: 'Gestational diabetes glucose challenge test usually scheduled between weeks 24–28.',
    trimester: 2,
  },
  {
    week: 26,
    fruitComparison: 'Acorn Squash',
    fruitEmoji: '🧅',
    avgLengthCm: 35.6,
    avgLengthInches: 14.0,
    avgWeightGrams: 760.0,
    avgWeightOz: 26.8,
    anatomicalHighlights: ['Air sacs in lungs inflate and deflate in practice breaths', 'Spine grows stronger and more flexible', 'Brain-wave activity shows response to sounds'],
    maternalBodyNotes: 'Back muscles adjust to belly center of gravity; gentle prenatal stretches help.',
    trimester: 2,
  },
  {
    week: 28,
    fruitComparison: 'Large Eggplant',
    fruitEmoji: '🍆',
    avgLengthCm: 37.6,
    avgLengthInches: 14.8,
    avgWeightGrams: 1000.0,
    avgWeightOz: 35.3,
    anatomicalHighlights: ['Baby can blink eyes with eyelashes developed', 'Brain tissue develops complex convolutions (sulci & gyri)', 'Active dreaming (REM sleep) begins'],
    maternalBodyNotes: 'Welcome to the 3rd trimester! Kick counting sessions become a recommended daily habit.',
    trimester: 3,
  },
  {
    week: 30,
    fruitComparison: 'Cabbage',
    fruitEmoji: '🥬',
    avgLengthCm: 39.9,
    avgLengthInches: 15.7,
    avgWeightGrams: 1320.0,
    avgWeightOz: 46.5,
    anatomicalHighlights: ['Bone marrow fully takes over red blood cell production', 'Amniotic fluid volume peaks around this week', 'Baby regulates own body temperature more effectively'],
    maternalBodyNotes: 'Heartburn or rib pressure may occur as uterus pushes upward.',
    trimester: 3,
  },
  {
    week: 32,
    fruitComparison: 'Butternut Squash',
    fruitEmoji: '🥥',
    avgLengthCm: 42.4,
    avgLengthInches: 16.7,
    avgWeightGrams: 1700.0,
    avgWeightOz: 60.0,
    anatomicalHighlights: ['Toenails and fingernails have grown to fingertips', 'Bones are fully developed, though skull sutures remain pliable', 'Practices breathing movements rhythmically'],
    maternalBodyNotes: 'Braxton Hicks contractions may occur as uterus tones. Appointments become bi-weekly.',
    trimester: 3,
  },
  {
    week: 34,
    fruitComparison: 'Cantaloupe',
    fruitEmoji: '🍈',
    avgLengthCm: 45.0,
    avgLengthInches: 17.7,
    avgWeightGrams: 2150.0,
    avgWeightOz: 75.8,
    anatomicalHighlights: ['Central nervous system mature; lungs near full maturity', 'Fat pads on cheeks give baby their cute chubby appearance', 'Pupils dilate and constrict in response to light'],
    maternalBodyNotes: 'Pelvic pressure increases as baby settles lower into pelvis.',
    trimester: 3,
  },
  {
    week: 36,
    fruitComparison: 'Honeydew Melon',
    fruitEmoji: '🍈',
    avgLengthCm: 47.4,
    avgLengthInches: 18.7,
    avgWeightGrams: 2620.0,
    avgWeightOz: 92.4,
    anatomicalHighlights: ['Gaining ~200-250 grams per week of adipose fat', 'Immune system receiving antibodies through placenta', 'Most babies rotate into cephalic (head-down) position'],
    maternalBodyNotes: 'Baby may "drop" or lighten lower into pelvis. Weekly OB/Midwife visits begin.',
    trimester: 3,
  },
  {
    week: 38,
    fruitComparison: 'Winter Squash',
    fruitEmoji: '🎃',
    avgLengthCm: 49.8,
    avgLengthInches: 19.6,
    avgWeightGrams: 3080.0,
    avgWeightOz: 108.6,
    anatomicalHighlights: ['Early term milestone! Organs are completely functional', 'Grasp is firm and strong', 'Lanugo hair has mostly shed'],
    maternalBodyNotes: 'Nesting urges peak; body produces oxytocin preparing for labor.',
    trimester: 3,
  },
  {
    week: 40,
    fruitComparison: 'Watermelon / Pumpkin',
    fruitEmoji: '🍉',
    avgLengthCm: 51.2,
    avgLengthInches: 20.2,
    avgWeightGrams: 3460.0,
    avgWeightOz: 122.0,
    anatomicalHighlights: ['Full-term milestone achieved!', 'Lungs and reflexes fully prepared for birth', 'Firm grasp reflex present'],
    maternalBodyNotes: 'Due date arrival! Only ~5% of babies arrive exactly on due date; 38-41 weeks is typical.',
    trimester: 3,
  },
  {
    week: 41,
    fruitComparison: 'Jackfruit',
    fruitEmoji: '🍈',
    avgLengthCm: 51.8,
    avgLengthInches: 20.4,
    avgWeightGrams: 3600.0,
    avgWeightOz: 127.0,
    anatomicalHighlights: ['Extra layer of fat gives extra warmth for post-birth world', 'Long fingernails and alert expressions', 'Placental monitoring ensures continued healthy flow'],
    maternalBodyNotes: 'Late-term patience; practice gentle walking, resting, and birth visualizations.',
    trimester: 3,
  },
];

/**
 * Hadlock 4-parameter formula for Estimated Fetal Weight (EFW) in grams:
 * Log10(EFW) = 1.3596 - 0.00386(AC * FL) + 0.0064(HC) + 0.00061(BPD * AC) + 0.0424(AC) + 0.174(FL)
 * (Inputs in centimeters)
 */
export function calculateHadlockEFW(params: {
  bpdMm?: number;
  hcMm?: number;
  acMm?: number;
  flMm?: number;
}): number | null {
  const { bpdMm, hcMm, acMm, flMm } = params;
  if (!acMm || !flMm) return null;

  const ac = acMm / 10;
  const fl = flMm / 10;
  const bpd = bpdMm ? bpdMm / 10 : undefined;
  const hc = hcMm ? hcMm / 10 : undefined;

  // Hadlock 4: BPD, HC, AC, FL
  if (bpd && hc) {
    const log10Weight =
      1.3596 -
      0.00386 * (ac * fl) +
      0.0064 * hc +
      0.00061 * (bpd * ac) +
      0.0424 * ac +
      0.174 * fl;
    return Math.round(Math.pow(10, log10Weight));
  }

  // Hadlock 3: HC, AC, FL
  if (hc) {
    const log10Weight = 1.326 - 0.00326 * (ac * fl) + 0.0107 * hc + 0.0438 * ac + 0.158 * fl;
    return Math.round(Math.pow(10, log10Weight));
  }

  // Hadlock 2: AC, FL
  const log10Weight = 1.304 + 0.05281 * ac + 0.1938 * fl - 0.004 * (ac * fl);
  return Math.round(Math.pow(10, log10Weight));
}

/**
 * Get fetal biometrics reference for a given week
 */
export function getFetalBiometricRef(week: number): FetalBiometricRef {
  const clampedWeek = Math.max(12, Math.min(40, week));
  // Find closest or interpolate
  const exact = FETAL_BIOMETRIC_STANDARDS.find((s) => s.week === clampedWeek);
  if (exact) return exact;

  let prev = FETAL_BIOMETRIC_STANDARDS[0];
  let next = FETAL_BIOMETRIC_STANDARDS[FETAL_BIOMETRIC_STANDARDS.length - 1];
  for (let i = 0; i < FETAL_BIOMETRIC_STANDARDS.length - 1; i++) {
    if (clampedWeek >= FETAL_BIOMETRIC_STANDARDS[i].week && clampedWeek <= FETAL_BIOMETRIC_STANDARDS[i + 1].week) {
      prev = FETAL_BIOMETRIC_STANDARDS[i];
      next = FETAL_BIOMETRIC_STANDARDS[i + 1];
      break;
    }
  }

  const factor = (clampedWeek - prev.week) / (next.week - prev.week);
  const lerp = (a: number, b: number) => Math.round(a + (b - a) * factor);

  return {
    week: clampedWeek,
    efwP5: lerp(prev.efwP5, next.efwP5),
    efwP50: lerp(prev.efwP50, next.efwP50),
    efwP95: lerp(prev.efwP95, next.efwP95),
    bpdP5: lerp(prev.bpdP5, next.bpdP5),
    bpdP50: lerp(prev.bpdP50, next.bpdP50),
    bpdP95: lerp(prev.bpdP95, next.bpdP95),
    hcP5: lerp(prev.hcP5, next.hcP5),
    hcP50: lerp(prev.hcP50, next.hcP50),
    hcP95: lerp(prev.hcP95, next.hcP95),
    acP5: lerp(prev.acP5, next.acP5),
    acP50: lerp(prev.acP50, next.acP50),
    acP95: lerp(prev.acP95, next.acP95),
    flP5: lerp(prev.flP5, next.flP5),
    flP50: lerp(prev.flP50, next.flP50),
    flP95: lerp(prev.flP95, next.flP95),
  };
}

/**
 * Calculate gestational age from LMP (Last Menstrual Period) or Due Date
 */
export function calculateGestationalAge(dueDateStr: string): { weeks: number; days: number; totalDays: number } {
  const dueDate = new Date(dueDateStr);
  const today = new Date();
  
  // A standard pregnancy is 280 days from LMP
  const lmpDate = new Date(dueDate.getTime() - 280 * 24 * 60 * 60 * 1000);
  const diffMs = today.getTime() - lmpDate.getTime();
  const totalDays = Math.max(0, Math.floor(diffMs / (24 * 60 * 60 * 1000)));

  const weeks = Math.floor(totalDays / 7);
  const days = totalDays % 7;
  return { weeks, days, totalDays };
}
