import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ChildProfile,
  BabyMeasurement,
  FetalMeasurement,
  CompletedMilestone,
  KickSession,
  UnitSystem,
  LoveNote,
  FormulaSettings,
  ThemeMode,
} from '../types';
import { DEFAULT_FORMULA_SETTINGS } from '../data/formulaSources';

export function getSystemOrTimeTheme(): ThemeMode {
  const hour = new Date().getHours();
  // Daytime is 6:00 AM (06:00) to 6:59 PM (18:59). Nighttime is 7:00 PM (19:00) to 5:59 AM.
  return hour >= 6 && hour < 19 ? 'light' : 'dark';
}

interface AppContextType {
  profiles: ChildProfile[];
  activeProfileId: string;
  activeProfile: ChildProfile | undefined;
  setActiveProfileId: (id: string) => void;
  addProfile: (profile: Omit<ChildProfile, 'id'>) => string;
  updateProfile: (id: string, updates: Partial<ChildProfile>) => void;
  deleteProfile: (id: string) => void;

  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  systemOrTimeTheme: ThemeMode;

  unitSystem: UnitSystem;
  setUnitSystem: (system: UnitSystem) => void;

  formulaSettings: FormulaSettings;
  updateFormulaSettings: (updates: Partial<FormulaSettings>) => void;

  babyMeasurements: BabyMeasurement[];
  activeBabyMeasurements: BabyMeasurement[];
  addBabyMeasurement: (measurement: Omit<BabyMeasurement, 'id' | 'profileId'>) => void;
  updateBabyMeasurement: (id: string, updates: Partial<BabyMeasurement>) => void;
  deleteBabyMeasurement: (id: string) => void;

  fetalMeasurements: FetalMeasurement[];
  activeFetalMeasurements: FetalMeasurement[];
  addFetalMeasurement: (measurement: Omit<FetalMeasurement, 'id' | 'profileId'>) => void;
  updateFetalMeasurement: (id: string, updates: Partial<FetalMeasurement>) => void;
  deleteFetalMeasurement: (id: string) => void;

  completedMilestones: CompletedMilestone[];
  activeCompletedMilestones: CompletedMilestone[];
  toggleMilestone: (milestoneId: string, notes?: string, photoUrl?: string) => void;
  addCustomMilestone: (milestone: {
    title: string;
    category: CompletedMilestone['customCategory'];
    dateAchieved: string;
    notes?: string;
  }) => void;
  removeCompletedMilestone: (milestoneId: string) => void;

  kickSessions: KickSession[];
  activeKickSessions: KickSession[];
  addKickSession: (session: Omit<KickSession, 'id' | 'profileId'>) => void;
  deleteKickSession: (id: string) => void;

  loveNotes: LoveNote[];
  activeLoveNotes: LoveNote[];
  addLoveNote: (note: Omit<LoveNote, 'id' | 'profileId'>) => void;
  deleteLoveNote: (id: string) => void;

  resetToSampleData: () => void;
  exportDataJSON: () => string;
  importDataJSON: (jsonStr: string) => boolean;
}

const STORAGE_KEYS = {
  PROFILES: 'sprout_profiles_v1',
  ACTIVE_PROFILE: 'sprout_active_profile_v1',
  THEME: 'sprout_theme_v1',
  UNITS: 'sprout_units_v1',
  FORMULA_SETTINGS: 'sprout_formula_settings_v1',
  BABY_MEASUREMENTS: 'sprout_baby_measurements_v1',
  FETAL_MEASUREMENTS: 'sprout_fetal_measurements_v1',
  MILESTONES: 'sprout_milestones_v1',
  KICK_SESSIONS: 'sprout_kicks_v1',
  LOVE_NOTES: 'sprout_love_notes_v1',
};

// Realistic sample data
const INITIAL_PROFILES: ChildProfile[] = [
  {
    id: 'baby-liam',
    name: 'Liam Alexander',
    type: 'baby',
    gender: 'boy',
    dateOfEvent: '2026-01-08', // born ~9 months ago
    birthWeightKg: 3.42,
    birthLengthCm: 50.2,
    birthHeadCircumferenceCm: 34.6,
    avatarColor: 'bg-emerald-600',
    avatarIcon: 'Baby',
    notes: 'Born healthy at 39 weeks. Pediatrician: Dr. Sarah Chen.',
  },
  {
    id: 'fetal-sprout',
    name: 'Baby #2 (Sprout)',
    type: 'fetal',
    gender: 'girl',
    dateOfEvent: '2026-12-10', // Due in ~10 weeks, currently ~30 weeks
    prePregnancyWeightKg: 61.5,
    maternalHeightCm: 168,
    avatarColor: 'bg-amber-600',
    avatarIcon: 'HeartPulse',
    notes: 'Second pregnancy. Low-risk screening. Due mid-December.',
  },
];

const INITIAL_BABY_MEASUREMENTS: BabyMeasurement[] = [
  {
    id: 'm-birth',
    profileId: 'baby-liam',
    date: '2026-01-08',
    ageInMonths: 0,
    ageInWeeks: 0,
    weightKg: 3.42,
    lengthCm: 50.2,
    headCircumferenceCm: 34.6,
    pediatricianVisit: true,
    notes: 'Birth checkup. Apgar 9/10.',
  },
  {
    id: 'm-1m',
    profileId: 'baby-liam',
    date: '2026-02-09',
    ageInMonths: 1,
    ageInWeeks: 4,
    weightKg: 4.45,
    lengthCm: 54.8,
    headCircumferenceCm: 37.1,
    pediatricianVisit: true,
    notes: '1-month well-child visit. Nursing well.',
  },
  {
    id: 'm-2m',
    profileId: 'baby-liam',
    date: '2026-03-10',
    ageInMonths: 2,
    ageInWeeks: 9,
    weightKg: 5.62,
    lengthCm: 58.5,
    headCircumferenceCm: 39.2,
    pediatricianVisit: true,
    notes: '2-month vaccines given. Smiling frequently!',
  },
  {
    id: 'm-4m',
    profileId: 'baby-liam',
    date: '2026-05-11',
    ageInMonths: 4,
    ageInWeeks: 17,
    weightKg: 7.15,
    lengthCm: 64.0,
    headCircumferenceCm: 41.9,
    pediatricianVisit: true,
    notes: '4-month checkup. Great head control, rolling belly to back.',
  },
  {
    id: 'm-6m',
    profileId: 'baby-liam',
    date: '2026-07-09',
    ageInMonths: 6,
    ageInWeeks: 26,
    weightKg: 8.05,
    lengthCm: 67.8,
    headCircumferenceCm: 43.7,
    pediatricianVisit: true,
    notes: '6-month visit. Started puree solids (avocado & sweet potato).',
  },
  {
    id: 'm-9m',
    profileId: 'baby-liam',
    date: '2026-09-28',
    ageInMonths: 8.7,
    ageInWeeks: 38,
    weightKg: 9.12,
    lengthCm: 72.4,
    headCircumferenceCm: 45.4,
    pediatricianVisit: true,
    notes: 'Sitting solidly, pulling up on living room sofa.',
  },
];

const INITIAL_FETAL_MEASUREMENTS: FetalMeasurement[] = [
  {
    id: 'fm-12w',
    profileId: 'fetal-sprout',
    date: '2026-03-27',
    gestationalWeeks: 12,
    gestationalDays: 2,
    crlMm: 56,
    efwGrams: 16,
    maternalWeightKg: 62.0,
    scanLocation: 'City Women’s Clinic',
    notes: 'Nuchal translucency scan normal (1.2mm). Nasal bone present.',
  },
  {
    id: 'fm-20w',
    profileId: 'fetal-sprout',
    date: '2026-05-22',
    gestationalWeeks: 20,
    gestationalDays: 1,
    bpdMm: 48,
    hcMm: 177,
    acMm: 154,
    flMm: 33,
    efwGrams: 320,
    fundalHeightCm: 20,
    maternalWeightKg: 65.5,
    scanLocation: 'University Maternal Hospital',
    notes: 'Anatomy scan: 4-chamber heart view clear, kidneys and spine normal.',
  },
  {
    id: 'fm-28w',
    profileId: 'fetal-sprout',
    date: '2026-07-17',
    gestationalWeeks: 28,
    gestationalDays: 0,
    bpdMm: 72,
    hcMm: 263,
    acMm: 245,
    flMm: 54,
    efwGrams: 1040,
    fundalHeightCm: 28,
    maternalWeightKg: 69.8,
    scanLocation: 'University Maternal Hospital',
    notes: 'Growth check. Amniotic fluid index AFI 14. Cephalic presentation.',
  },
];

const INITIAL_COMPLETED_MILESTONES: CompletedMilestone[] = [
  {
    milestoneId: 'm2_soc_1',
    profileId: 'baby-liam',
    dateAchieved: '2026-02-15',
    notes: 'Calmed right away with papa humming.',
  },
  {
    milestoneId: 'm2_soc_2',
    profileId: 'baby-liam',
    dateAchieved: '2026-02-20',
    notes: 'First real social smile in response to grandma!',
  },
  {
    milestoneId: 'm2_lang_1',
    profileId: 'baby-liam',
    dateAchieved: '2026-02-28',
    notes: 'Little "aah" and "coo" sounds in the morning.',
  },
  {
    milestoneId: 'm2_mov_1',
    profileId: 'baby-liam',
    dateAchieved: '2026-03-05',
    notes: 'Held head up strong during tummy time on the sheepskin rug.',
  },
  {
    milestoneId: 'm4_soc_2',
    profileId: 'baby-liam',
    dateAchieved: '2026-04-18',
    notes: 'First real belly laugh when mama made tickle sounds.',
  },
  {
    milestoneId: 'm4_mov_1',
    profileId: 'baby-liam',
    dateAchieved: '2026-05-02',
    notes: 'Very sturdy head control.',
  },
  {
    milestoneId: 'm6_mov_1',
    profileId: 'baby-liam',
    dateAchieved: '2026-06-25',
    notes: 'Rolled from back to tummy repeatedly.',
  },
  {
    milestoneId: 'm6_lang_1',
    profileId: 'baby-liam',
    dateAchieved: '2026-07-04',
    notes: 'Blowing hilarious raspberries and taking conversational pauses.',
  },
  {
    milestoneId: 'm9_lang_2',
    profileId: 'baby-liam',
    dateAchieved: '2026-08-30',
    notes: 'Turns head immediately when we say "Liam!".',
  },
  {
    milestoneId: 'm9_mov_1',
    profileId: 'baby-liam',
    dateAchieved: '2026-09-12',
    notes: 'Sitting up independently with both hands free for building blocks.',
  },
  {
    milestoneId: 'custom-tooth-1',
    profileId: 'baby-liam',
    dateAchieved: '2026-07-22',
    isCustom: true,
    customTitle: 'First tooth broke through!',
    customCategory: 'movement',
    notes: 'Lower central incisor popped out. Lots of teething rings used.',
  },
];

const INITIAL_KICK_SESSIONS: KickSession[] = [
  {
    id: 'kick-1',
    profileId: 'fetal-sprout',
    date: '2026-09-30',
    startTime: '20:15',
    durationSeconds: 1140, // 19 mins
    kicksCount: 10,
    targetReached: true,
    notes: 'Active after warm lemon tea.',
  },
  {
    id: 'kick-2',
    profileId: 'fetal-sprout',
    date: '2026-10-01',
    startTime: '21:00',
    durationSeconds: 920, // ~15 mins
    kicksCount: 10,
    targetReached: true,
    notes: 'Strong rhythmic kicks on right side.',
  },
];

const INITIAL_LOVE_NOTES: LoveNote[] = [
  {
    id: 'note-1',
    profileId: 'baby-liam',
    date: '2026-03-10',
    stageLabel: 'Month 2',
    author: 'Mama',
    emoji: '💖',
    content: 'The very first time you looked right into my eyes and gave us that huge gummy smile, the whole room filled with warm sunshine. We love you so much, sweet boy.',
  },
  {
    id: 'note-2',
    profileId: 'baby-liam',
    date: '2026-07-09',
    stageLabel: 'Month 6',
    author: 'Papa',
    emoji: '🥑',
    content: 'You tried sweet potato puree today and your eyes went as round as saucers! You are growing so strong, brave, and full of wonder.',
  },
  {
    id: 'note-3',
    profileId: 'fetal-sprout',
    date: '2026-05-22',
    stageLabel: 'Week 20',
    author: 'Mama & Papa',
    emoji: '✨',
    content: 'We saw your tiny fingers open and curl today at the ultrasound. Halfway to holding you in our arms. You are already our whole world.',
  },
  {
    id: 'note-4',
    profileId: 'fetal-sprout',
    date: '2026-07-17',
    stageLabel: 'Week 28',
    author: 'Mama',
    emoji: '🌙',
    content: 'Every evening when your papa reads near my belly, you give the happiest little kicks! You recognize our voices already.',
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profiles, setProfiles] = useState<ChildProfile[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROFILES);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_PROFILES;
  });

  const [activeProfileId, setActiveProfileId] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_PROFILE);
    if (saved && profiles.some((p) => p.id === saved)) return saved;
    return profiles[0]?.id || '';
  });

  // Theme detection: daytime (6am-7pm) = light, night (7pm-6am) = dark
  const systemOrTimeTheme = getSystemOrTimeTheme();
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME) as ThemeMode | null;
    if (saved === 'light' || saved === 'dark') return saved;
    return getSystemOrTimeTheme();
  });

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const [unitSystem, setUnitSystemState] = useState<UnitSystem>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.UNITS);
    return saved === 'imperial' ? 'imperial' : 'metric';
  });

  const [formulaSettings, setFormulaSettings] = useState<FormulaSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FORMULA_SETTINGS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return DEFAULT_FORMULA_SETTINGS;
  });

  const [babyMeasurements, setBabyMeasurements] = useState<BabyMeasurement[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BABY_MEASUREMENTS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_BABY_MEASUREMENTS;
  });

  const [fetalMeasurements, setFetalMeasurements] = useState<FetalMeasurement[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FETAL_MEASUREMENTS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_FETAL_MEASUREMENTS;
  });

  const [completedMilestones, setCompletedMilestones] = useState<CompletedMilestone[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MILESTONES);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_COMPLETED_MILESTONES;
  });

  const [kickSessions, setKickSessions] = useState<KickSession[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.KICK_SESSIONS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_KICK_SESSIONS;
  });

  const [loveNotes, setLoveNotes] = useState<LoveNote[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LOVE_NOTES);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_LOVE_NOTES;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(profiles));
  }, [profiles]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_PROFILE, activeProfileId);
  }, [activeProfileId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.UNITS, unitSystem);
  }, [unitSystem]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BABY_MEASUREMENTS, JSON.stringify(babyMeasurements));
  }, [babyMeasurements]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FETAL_MEASUREMENTS, JSON.stringify(fetalMeasurements));
  }, [fetalMeasurements]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MILESTONES, JSON.stringify(completedMilestones));
  }, [completedMilestones]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.KICK_SESSIONS, JSON.stringify(kickSessions));
  }, [kickSessions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LOVE_NOTES, JSON.stringify(loveNotes));
  }, [loveNotes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FORMULA_SETTINGS, JSON.stringify(formulaSettings));
  }, [formulaSettings]);

  const activeProfile = profiles.find((p) => p.id === activeProfileId) || profiles[0];

  const activeBabyMeasurements = babyMeasurements
    .filter((m) => m.profileId === activeProfileId)
    .sort((a, b) => a.ageInMonths - b.ageInMonths);

  const activeFetalMeasurements = fetalMeasurements
    .filter((m) => m.profileId === activeProfileId)
    .sort((a, b) => a.gestationalWeeks * 7 + a.gestationalDays - (b.gestationalWeeks * 7 + b.gestationalDays));

  const activeCompletedMilestones = completedMilestones.filter((m) => m.profileId === activeProfileId);
  const activeKickSessions = kickSessions.filter((k) => k.profileId === activeProfileId);
  const activeLoveNotes = loveNotes.filter((n) => n.profileId === activeProfileId);

  const setUnitSystem = (system: UnitSystem) => {
    setUnitSystemState(system);
  };

  const updateFormulaSettings = (updates: Partial<FormulaSettings>) => {
    setFormulaSettings((prev) => ({ ...prev, ...updates }));
  };

  const addProfile = (profileData: Omit<ChildProfile, 'id'>): string => {
    const newId = `profile-${Date.now()}`;
    const newProfile: ChildProfile = { ...profileData, id: newId };
    setProfiles((prev) => [...prev, newProfile]);
    setActiveProfileId(newId);
    return newId;
  };

  const updateProfile = (id: string, updates: Partial<ChildProfile>) => {
    setProfiles((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const deleteProfile = (id: string) => {
    setProfiles((prev) => {
      const remaining = prev.filter((p) => p.id !== id);
      if (activeProfileId === id && remaining.length > 0) {
        setActiveProfileId(remaining[0].id);
      }
      return remaining;
    });
  };

  const addBabyMeasurement = (measurement: Omit<BabyMeasurement, 'id' | 'profileId'>) => {
    const newM: BabyMeasurement = {
      ...measurement,
      id: `bm-${Date.now()}`,
      profileId: activeProfileId,
    };
    setBabyMeasurements((prev) => [...prev, newM]);
  };

  const updateBabyMeasurement = (id: string, updates: Partial<BabyMeasurement>) => {
    setBabyMeasurements((prev) => prev.map((m) => (m.id === id ? { ...m, ...updates } : m)));
  };

  const deleteBabyMeasurement = (id: string) => {
    setBabyMeasurements((prev) => prev.filter((m) => m.id !== id));
  };

  const addFetalMeasurement = (measurement: Omit<FetalMeasurement, 'id' | 'profileId'>) => {
    const newM: FetalMeasurement = {
      ...measurement,
      id: `fm-${Date.now()}`,
      profileId: activeProfileId,
    };
    setFetalMeasurements((prev) => [...prev, newM]);
  };

  const updateFetalMeasurement = (id: string, updates: Partial<FetalMeasurement>) => {
    setFetalMeasurements((prev) => prev.map((m) => (m.id === id ? { ...m, ...updates } : m)));
  };

  const deleteFetalMeasurement = (id: string) => {
    setFetalMeasurements((prev) => prev.filter((m) => m.id !== id));
  };

  const toggleMilestone = (milestoneId: string, notes?: string, photoUrl?: string) => {
    setCompletedMilestones((prev) => {
      const exists = prev.find((m) => m.profileId === activeProfileId && m.milestoneId === milestoneId);
      if (exists) {
        return prev.filter((m) => !(m.profileId === activeProfileId && m.milestoneId === milestoneId));
      } else {
        const todayStr = new Date().toISOString().split('T')[0];
        return [
          ...prev,
          {
            milestoneId,
            profileId: activeProfileId,
            dateAchieved: todayStr,
            notes,
            photoUrl,
          },
        ];
      }
    });
  };

  const addCustomMilestone = (milestone: {
    title: string;
    category: CompletedMilestone['customCategory'];
    dateAchieved: string;
    notes?: string;
  }) => {
    const customId = `custom-${Date.now()}`;
    const newMilestone: CompletedMilestone = {
      milestoneId: customId,
      profileId: activeProfileId,
      dateAchieved: milestone.dateAchieved,
      isCustom: true,
      customTitle: milestone.title,
      customCategory: milestone.category,
      notes: milestone.notes,
    };
    setCompletedMilestones((prev) => [...prev, newMilestone]);
  };

  const removeCompletedMilestone = (milestoneId: string) => {
    setCompletedMilestones((prev) =>
      prev.filter((m) => !(m.profileId === activeProfileId && m.milestoneId === milestoneId))
    );
  };

  const addKickSession = (session: Omit<KickSession, 'id' | 'profileId'>) => {
    const newSession: KickSession = {
      ...session,
      id: `kick-${Date.now()}`,
      profileId: activeProfileId,
    };
    setKickSessions((prev) => [newSession, ...prev]);
  };

  const deleteKickSession = (id: string) => {
    setKickSessions((prev) => prev.filter((k) => k.id !== id));
  };

  const addLoveNote = (note: Omit<LoveNote, 'id' | 'profileId'>) => {
    const newNote: LoveNote = {
      ...note,
      id: `note-${Date.now()}`,
      profileId: activeProfileId,
    };
    setLoveNotes((prev) => [newNote, ...prev]);
  };

  const deleteLoveNote = (id: string) => {
    setLoveNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const resetToSampleData = () => {
    setProfiles(INITIAL_PROFILES);
    setActiveProfileId(INITIAL_PROFILES[0].id);
    setBabyMeasurements(INITIAL_BABY_MEASUREMENTS);
    setFetalMeasurements(INITIAL_FETAL_MEASUREMENTS);
    setCompletedMilestones(INITIAL_COMPLETED_MILESTONES);
    setKickSessions(INITIAL_KICK_SESSIONS);
    setLoveNotes(INITIAL_LOVE_NOTES);
  };

  const exportDataJSON = (): string => {
    const fullData = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      profiles,
      babyMeasurements,
      fetalMeasurements,
      completedMilestones,
      kickSessions,
      loveNotes,
      unitSystem,
    };
    return JSON.stringify(fullData, null, 2);
  };

  const importDataJSON = (jsonStr: string): boolean => {
    try {
      const data = JSON.parse(jsonStr);
      if (Array.isArray(data.profiles)) setProfiles(data.profiles);
      if (Array.isArray(data.babyMeasurements)) setBabyMeasurements(data.babyMeasurements);
      if (Array.isArray(data.fetalMeasurements)) setFetalMeasurements(data.fetalMeasurements);
      if (Array.isArray(data.completedMilestones)) setCompletedMilestones(data.completedMilestones);
      if (Array.isArray(data.kickSessions)) setKickSessions(data.kickSessions);
      if (Array.isArray(data.loveNotes)) setLoveNotes(data.loveNotes);
      if (data.unitSystem) setUnitSystemState(data.unitSystem);
      if (data.profiles?.[0]?.id) setActiveProfileId(data.profiles[0].id);
      return true;
    } catch (e) {
      console.error('Import failed', e);
      return false;
    }
  };

  return (
    <AppContext.Provider
      value={{
        profiles,
        activeProfileId,
        activeProfile,
        setActiveProfileId,
        addProfile,
        updateProfile,
        deleteProfile,
        theme,
        setTheme,
        toggleTheme,
        systemOrTimeTheme,
        unitSystem,
        setUnitSystem,
        formulaSettings,
        updateFormulaSettings,
        babyMeasurements,
        activeBabyMeasurements,
        addBabyMeasurement,
        updateBabyMeasurement,
        deleteBabyMeasurement,
        fetalMeasurements,
        activeFetalMeasurements,
        addFetalMeasurement,
        updateFetalMeasurement,
        deleteFetalMeasurement,
        completedMilestones,
        activeCompletedMilestones,
        toggleMilestone,
        addCustomMilestone,
        removeCompletedMilestone,
        kickSessions,
        activeKickSessions,
        addKickSession,
        deleteKickSession,
        loveNotes,
        activeLoveNotes,
        addLoveNote,
        deleteLoveNote,
        resetToSampleData,
        exportDataJSON,
        importDataJSON,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
