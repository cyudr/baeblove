export type ProfileType = 'fetal' | 'baby';
export type Gender = 'boy' | 'girl' | 'undisclosed';
export type UnitSystem = 'metric' | 'imperial';
export type ThemeMode = 'light' | 'dark';

export interface ChildProfile {
  id: string;
  name: string;
  type: ProfileType;
  gender: Gender;
  // For baby: birthDate; for fetal: dueDate
  dateOfEvent: string; 
  prePregnancyWeightKg?: number;
  maternalHeightCm?: number;
  birthWeightKg?: number;
  birthLengthCm?: number;
  birthHeadCircumferenceCm?: number;
  notes?: string;
  avatarColor: string;
  avatarIcon: string;
}

export interface BabyMeasurement {
  id: string;
  profileId: string;
  date: string;
  ageInMonths: number;
  ageInWeeks?: number;
  weightKg?: number;
  lengthCm?: number;
  headCircumferenceCm?: number;
  pediatricianVisit?: boolean;
  notes?: string;
}

export type FetalFormulaId = 'hadlock4' | 'hadlock3' | 'shepard' | 'intergrowth21' | 'custom';
export type GestationalMethodId = 'naegele' | 'mittendorf' | 'customDays';
export type GrowthStandardId = 'who' | 'cdc';

export interface CustomFormulaConfig {
  name: string;
  equationDescription: string;
  baseIntercept: number;
  acCoeff: number;
  flCoeff: number;
  hcCoeff: number;
  bpdCoeff: number;
  acFlInteractionCoeff: number;
}

export interface FormulaSettings {
  fetalEfwFormula: FetalFormulaId;
  gestationalMethod: GestationalMethodId;
  customGestationalDays: number;
  growthStandard: GrowthStandardId;
  customFormula: CustomFormulaConfig;
}

export interface FetalMeasurement {
  id: string;
  profileId: string;
  date: string;
  gestationalWeeks: number;
  gestationalDays: number;
  efwGrams?: number; // Estimated Fetal Weight
  crlMm?: number; // Crown-Rump Length
  bpdMm?: number; // Biparietal Diameter
  hcMm?: number;  // Head Circumference
  acMm?: number;  // Abdominal Circumference
  flMm?: number;  // Femur Length
  fundalHeightCm?: number;
  maternalWeightKg?: number;
  notes?: string;
  scanLocation?: string;
}

export type MilestoneCategory = 'social' | 'language' | 'cognitive' | 'movement';

export interface MilestoneItem {
  id: string;
  category: MilestoneCategory;
  ageMonthBracket: number; // 2, 4, 6, 9, 12, 15, 18, 24, 30, 36
  title: string;
  description: string;
  tips?: string;
  recommendation?: string;
  whenToConsult?: string;
}

export interface CompletedMilestone {
  milestoneId: string;
  profileId: string;
  dateAchieved: string;
  notes?: string;
  photoUrl?: string;
  isCustom?: boolean;
  customTitle?: string;
  customCategory?: MilestoneCategory;
}

export interface KickSession {
  id: string;
  profileId: string;
  date: string;
  startTime: string;
  durationSeconds: number;
  kicksCount: number;
  targetReached: boolean;
  notes?: string;
}

export interface GrowthPercentiles {
  p3: number;
  p15: number;
  p50: number;
  p85: number;
  p97: number;
}

export interface LoveNote {
  id: string;
  profileId: string;
  date: string;
  stageLabel: string; // e.g. "Week 28", "Month 6", "Birth Day"
  author: string; // e.g. "Mama & Papa"
  content: string;
  emoji?: string;
}
