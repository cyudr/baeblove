import { MilestoneItem, MilestoneCategory } from '../types';

export interface AgeBracketInfo {
  months: number;
  label: string;
  summary: string;
  warningSigns: string[];
}

export const AGE_BRACKETS: AgeBracketInfo[] = [
  {
    months: 2,
    label: '2 Months',
    summary: 'Smiling at caregivers, briefly lifting head, and cooing in response to sounds.',
    warningSigns: [
      "Doesn't react to loud sounds",
      "Doesn't watch things as they move",
      "Doesn't smile at people",
      "Doesn't bring hands to mouth",
      "Can't hold head up when pushing up when on tummy",
    ],
  },
  {
    months: 4,
    label: '4 Months',
    summary: 'Chuckle and giggles, reaching for toys with two hands, steady head control.',
    warningSigns: [
      "Doesn't watch things as they move",
      "Doesn't smile at people",
      "Can't hold head steady",
      "Doesn't coo or make sounds",
      "Doesn't bring things to mouth",
      "Doesn't push down with legs when feet are placed on a hard surface",
    ],
  },
  {
    months: 6,
    label: '6 Months',
    summary: 'Rolling over in both directions, sitting with support, babbling consonant sounds.',
    warningSigns: [
      "Doesn't try to get things that are in reach",
      "Shows no affection for caregivers",
      "Doesn't respond to sounds around him/her",
      "Has difficulty getting things to mouth",
      "Doesn't make vowel sounds ('ah', 'eh', 'oh')",
      "Doesn't roll over in either direction",
      "Seems very stiff or very floppy",
    ],
  },
  {
    months: 9,
    label: '9 Months',
    summary: 'Sitting without support, object permanence (peek-a-boo), stranger awareness.',
    warningSigns: [
      "Doesn't bear weight on legs with support",
      "Doesn't sit with help",
      "Doesn't babble ('mama', 'baba', 'dada')",
      "Doesn't play any games involving back-and-forth play",
      "Doesn't respond to own name",
      "Doesn't seem to recognize familiar people",
      "Doesn't look where you point",
    ],
  },
  {
    months: 12,
    label: '12 Months',
    summary: 'First steps or cruising, pincer grasp, waving goodbye, responding to simple requests.',
    warningSigns: [
      "Doesn't crawl",
      "Can't stand when supported",
      "Doesn't search for things that he sees you hide",
      "Doesn't say single words like 'mama' or 'dada'",
      "Doesn't learn gestures like waving or shaking head",
      "Doesn't point to things",
      "Loses skills he/she once had",
    ],
  },
  {
    months: 15,
    label: '15 Months',
    summary: 'Walking independently, stacking two blocks, pointing to show interest, imitating chores.',
    warningSigns: [
      "Doesn't point to show things to others",
      "Can't walk",
      "Doesn't know what familiar things are for",
      "Doesn't copy others",
      "Doesn't gain new words",
      "Doesn't have at least 1-2 words besides mama/dada",
    ],
  },
  {
    months: 18,
    label: '18 Months',
    summary: 'Vocabulary expanding to 10+ words, climbing stairs with help, drinking from cup.',
    warningSigns: [
      "Doesn't point to show things to others",
      "Can't walk",
      "Doesn't know what familiar things are for",
      "Doesn't copy others",
      "Doesn't have at least 6 words",
      "Doesn't notice or mind when a caregiver leaves or returns",
    ],
  },
  {
    months: 24,
    label: '24 Months (2 Years)',
    summary: 'Two-word phrases, running, kicking a ball, sorting shapes and colors.',
    warningSigns: [
      "Doesn't use 2-word phrases (for example, 'drink milk')",
      "Doesn't know what to do with common things, like a brush, phone, fork, spoon",
      "Doesn't copy actions and words",
      "Doesn't follow simple instructions",
      "Doesn't walk steadily",
      "Loses skills once had",
    ],
  },
  {
    months: 30,
    label: '30 Months (2.5 Years)',
    summary: 'Using actions with toys (feeding a doll), jumping with both feet, naming pictures.',
    warningSigns: [
      "Doesn't say at least 50 words",
      "Doesn't use 2 or more words together",
      "Doesn't imitate actions or words",
      "Doesn't follow simple 2-step directions",
      "Doesn't engage in pretend play",
    ],
  },
  {
    months: 36,
    label: '36 Months (3 Years)',
    summary: 'Calms down within 10 minutes of separation, asks questions, pedals a tricycle.',
    warningSigns: [
      "Falls down a lot or has trouble with stairs",
      "Drools or has very unclear speech",
      "Can't work simple toys (such as peg boards, simple puzzles, turning handle)",
      "Doesn't speak in sentences",
      "Doesn't understand simple instructions",
      "Doesn't make eye contact",
    ],
  },
];

export const CDC_MILESTONES: MilestoneItem[] = [
  // 2 MONTHS
  {
    id: 'm2_soc_1',
    category: 'social',
    ageMonthBracket: 2,
    title: 'Calms when spoken to or picked up',
    description: 'Looks at your face and calms down when you hold or speak to them softly.',
    tips: 'Hold your baby close and speak gently in a soothing singsong tone.',
  },
  {
    id: 'm2_soc_2',
    category: 'social',
    ageMonthBracket: 2,
    title: 'Smiles when you talk or smile',
    description: 'Responds with genuine social smiles when you smile or talk to them.',
    tips: 'Get down face-to-face and smile brightly when your baby is alert and calm.',
  },
  {
    id: 'm2_lang_1',
    category: 'language',
    ageMonthBracket: 2,
    title: 'Makes sounds other than crying',
    description: 'Produces cooing and gurgling sounds (e.g. "ooh", "aah").',
    tips: 'Talk back when your baby coos. Pause to let them respond.',
  },
  {
    id: 'm2_lang_2',
    category: 'language',
    ageMonthBracket: 2,
    title: 'Reacts to loud noises',
    description: 'Blinks, startles, or turns toward unexpected sounds.',
    tips: 'Notice how your baby reacts to everyday sounds like doorbells or laughter.',
  },
  {
    id: 'm2_cog_1',
    category: 'cognitive',
    ageMonthBracket: 2,
    title: 'Watches you as you move',
    description: 'Tracks your movement across the room with their eyes.',
    tips: 'Move slowly across your baby’s field of vision while talking softly.',
  },
  {
    id: 'm2_mov_1',
    category: 'movement',
    ageMonthBracket: 2,
    title: 'Holds head up when on tummy',
    description: 'Lifts head briefly off the mat during supervised tummy time.',
    tips: 'Offer 3-5 minutes of tummy time 2-3 times daily on a comfortable mat.',
  },
  {
    id: 'm2_mov_2',
    category: 'movement',
    ageMonthBracket: 2,
    title: 'Opens hands briefly',
    description: 'Hands are no longer held in tight fists all the time.',
    tips: 'Gently stroke your baby’s palms and fingers during feeding or cuddles.',
  },

  // 4 MONTHS
  {
    id: 'm4_soc_1',
    category: 'social',
    ageMonthBracket: 4,
    title: 'Smiles spontaneously to get attention',
    description: 'Smiles on their own to draw you in and prompt an interaction.',
  },
  {
    id: 'm4_soc_2',
    category: 'social',
    ageMonthBracket: 4,
    title: 'Chuckles or laughs out loud',
    description: 'Giggles or laughs when you tickle gently or make funny sounds.',
  },
  {
    id: 'm4_lang_1',
    category: 'language',
    ageMonthBracket: 4,
    title: 'Makes squealing & cooing sounds',
    description: 'Experimenting with vocal pitch, making squeals and prolonged vowel sounds.',
  },
  {
    id: 'm4_lang_2',
    category: 'language',
    ageMonthBracket: 4,
    title: 'Turns head toward voice',
    description: 'Turns head in the direction of a parent speaking or a rattle sounding.',
  },
  {
    id: 'm4_cog_1',
    category: 'cognitive',
    ageMonthBracket: 4,
    title: 'Reaches for toy with one or both hands',
    description: 'Reaches out deliberately when a colorful toy is held near them.',
  },
  {
    id: 'm4_cog_2',
    category: 'cognitive',
    ageMonthBracket: 4,
    title: 'Opens mouth for breast or bottle',
    description: 'Opens mouth when seeing breast, bottle, or bib.',
  },
  {
    id: 'm4_mov_1',
    category: 'movement',
    ageMonthBracket: 4,
    title: 'Holds head steady without support',
    description: 'Holds head upright without wobbling when being held in an upright seated position.',
  },
  {
    id: 'm4_mov_2',
    category: 'movement',
    ageMonthBracket: 4,
    title: 'Pushes up on forearms on tummy',
    description: 'Pushes chest up onto elbows or forearms while lying on tummy.',
  },

  // 6 MONTHS
  {
    id: 'm6_soc_1',
    category: 'social',
    ageMonthBracket: 6,
    title: 'Knows familiar faces',
    description: 'Recognizes parents and familiar caregivers; begins to notice strangers.',
  },
  {
    id: 'm6_soc_2',
    category: 'social',
    ageMonthBracket: 6,
    title: 'Likes looking at self in mirror',
    description: 'Smiles, babbles, or reaches toward their reflection in an unbreakable mirror.',
  },
  {
    id: 'm6_lang_1',
    category: 'language',
    ageMonthBracket: 6,
    title: 'Takes turns making sounds',
    description: 'Pauses when you speak and babbles back as if participating in conversation.',
  },
  {
    id: 'm6_lang_2',
    category: 'language',
    ageMonthBracket: 6,
    title: 'Blows raspberries & makes consonants',
    description: 'Makes consonant sounds like "m", "b", "p" and blows "raspberries" with lips.',
  },
  {
    id: 'm6_cog_1',
    category: 'cognitive',
    ageMonthBracket: 6,
    title: 'Puts things in mouth to explore',
    description: 'Transfers toys to mouth as primary sensory exploration method.',
  },
  {
    id: 'm6_cog_2',
    category: 'cognitive',
    ageMonthBracket: 6,
    title: 'Reaches to grab things they want',
    description: 'Intentional reach and grasp for objects slightly out of immediate reach.',
  },
  {
    id: 'm6_mov_1',
    category: 'movement',
    ageMonthBracket: 6,
    title: 'Rolls over in both directions',
    description: 'Rolls tummy to back and back to tummy smoothly.',
  },
  {
    id: 'm6_mov_2',
    category: 'movement',
    ageMonthBracket: 6,
    title: 'Sits with brief support or tripod',
    description: 'Sits propped on hands (tripod sit) or sits supported in high chair.',
  },

  // 9 MONTHS
  {
    id: 'm9_soc_1',
    category: 'social',
    ageMonthBracket: 9,
    title: 'Shy or clingy with strangers',
    description: 'Shows healthy stranger anxiety; prefers clinging to primary caregivers.',
  },
  {
    id: 'm9_soc_2',
    category: 'social',
    ageMonthBracket: 9,
    title: 'Shows multiple facial expressions',
    description: 'Expresses happy, sad, angry, and surprised expressions clearly.',
  },
  {
    id: 'm9_lang_1',
    category: 'language',
    ageMonthBracket: 9,
    title: 'Babbles strings of syllables',
    description: 'Strings sounds together like "mamama", "bababa", "dadada".',
  },
  {
    id: 'm9_lang_2',
    category: 'language',
    ageMonthBracket: 9,
    title: 'Responds to own name',
    description: 'Stops and turns around promptly when their name is called.',
  },
  {
    id: 'm9_cog_1',
    category: 'cognitive',
    ageMonthBracket: 9,
    title: 'Plays peek-a-boo and looks for hidden items',
    description: 'Understands object permanence: looks for a toy dropped out of sight.',
  },
  {
    id: 'm9_cog_2',
    category: 'cognitive',
    ageMonthBracket: 9,
    title: 'Bangs two items together',
    description: 'Holds a toy in each hand and claps or bangs them together.',
  },
  {
    id: 'm9_mov_1',
    category: 'movement',
    ageMonthBracket: 9,
    title: 'Sits without support',
    description: 'Sits upright independently with hands free to play with toys.',
  },
  {
    id: 'm9_mov_2',
    category: 'movement',
    ageMonthBracket: 9,
    title: 'Pulls up to standing position',
    description: 'Pulls up to a stand holding onto furniture or crib rails.',
  },

  // 12 MONTHS
  {
    id: 'm12_soc_1',
    category: 'social',
    ageMonthBracket: 12,
    title: 'Plays games like pat-a-cake',
    description: 'Claps hands or plays interactive social games with caregiver.',
  },
  {
    id: 'm12_lang_1',
    category: 'language',
    ageMonthBracket: 12,
    title: 'Waves "bye-bye"',
    description: 'Waves hands appropriately when someone arrives or leaves.',
  },
  {
    id: 'm12_lang_2',
    category: 'language',
    ageMonthBracket: 12,
    title: 'Calls parent "mama" or "dada"',
    description: 'Uses mama or dada specifically to refer to the correct parent.',
  },
  {
    id: 'm12_lang_3',
    category: 'language',
    ageMonthBracket: 12,
    title: 'Understands "no"',
    description: 'Briefly pauses or looks at you when you say "no".',
  },
  {
    id: 'm12_cog_1',
    category: 'cognitive',
    ageMonthBracket: 12,
    title: 'Puts objects into containers',
    description: 'Drops small blocks into a cup or bucket and takes them out.',
  },
  {
    id: 'm12_mov_1',
    category: 'movement',
    ageMonthBracket: 12,
    title: 'Pincer grasp with thumb & index',
    description: 'Picks up small foods (like Cheerios or peas) using thumb and pointer finger.',
  },
  {
    id: 'm12_mov_2',
    category: 'movement',
    ageMonthBracket: 12,
    title: 'Cruises along furniture or takes steps',
    description: 'Walks holding onto coffee table/couches or takes independent steps.',
  },

  // 18 MONTHS
  {
    id: 'm18_soc_1',
    category: 'social',
    ageMonthBracket: 18,
    title: 'Moves away from you to explore, but checks in',
    description: 'Walks into another part of the room to explore while looking back to ensure you are there.',
  },
  {
    id: 'm18_lang_1',
    category: 'language',
    ageMonthBracket: 18,
    title: 'Uses at least 3-10 distinct words',
    description: 'Says several real words consistently beyond mama and dada.',
  },
  {
    id: 'm18_lang_2',
    category: 'language',
    ageMonthBracket: 18,
    title: 'Points to show interest',
    description: 'Points at an airplane, dog, or truck to get you to look too.',
  },
  {
    id: 'm18_cog_1',
    category: 'cognitive',
    ageMonthBracket: 18,
    title: 'Imitates everyday actions',
    description: 'Tries sweeping with a broom, talking on a toy phone, or feeding a stuffed animal.',
  },
  {
    id: 'm18_mov_1',
    category: 'movement',
    ageMonthBracket: 18,
    title: 'Walks without holding on',
    description: 'Walks across the room steadily without holding onto hands or furniture.',
  },
  {
    id: 'm18_mov_2',
    category: 'movement',
    ageMonthBracket: 18,
    title: 'Drinks from an open cup',
    description: 'Holds a small open cup and drinks (may have minor spills).',
  },

  // 24 MONTHS (2 YEARS)
  {
    id: 'm24_soc_1',
    category: 'social',
    ageMonthBracket: 24,
    title: 'Notices when others are hurt or upset',
    description: 'Pauses or looks concerned when another child cries; offers comfort.',
  },
  {
    id: 'm24_lang_1',
    category: 'language',
    ageMonthBracket: 24,
    title: 'Says at least two words together',
    description: 'Combines two words like "more milk", "big ball", or "go car".',
  },
  {
    id: 'm24_lang_2',
    category: 'language',
    ageMonthBracket: 24,
    title: 'Points to at least two body parts',
    description: 'Points accurately when asked "Where is your nose?" or "Where are your toes?".',
  },
  {
    id: 'm24_cog_1',
    category: 'cognitive',
    ageMonthBracket: 24,
    title: 'Stacks 4 or more small blocks',
    description: 'Balances a tower of 4+ blocks without knocking it over.',
  },
  {
    id: 'm24_mov_1',
    category: 'movement',
    ageMonthBracket: 24,
    title: 'Runs with balance',
    description: 'Runs across the room without frequent stumbling.',
  },
  {
    id: 'm24_mov_2',
    category: 'movement',
    ageMonthBracket: 24,
    title: 'Kicks a ball forward',
    description: 'Steps forward and swings foot to kick a stationary ball.',
  },

  // 36 MONTHS (3 YEARS)
  {
    id: 'm36_soc_1',
    category: 'social',
    ageMonthBracket: 36,
    title: 'Notices other children and joins in play',
    description: 'Plays alongside or begins interactive cooperative play with peers.',
  },
  {
    id: 'm36_lang_1',
    category: 'language',
    ageMonthBracket: 36,
    title: 'Talks with you in conversation',
    description: 'Carries on back-and-forth exchange with at least two turns.',
  },
  {
    id: 'm36_lang_2',
    category: 'language',
    ageMonthBracket: 36,
    title: 'Asks "who", "what", "where", or "why"',
    description: 'Curious inquiries using question words.',
  },
  {
    id: 'm36_cog_1',
    category: 'cognitive',
    ageMonthBracket: 36,
    title: 'Draws a circle when you show how',
    description: 'Copies a circular shape using a crayon or marker.',
  },
  {
    id: 'm36_mov_1',
    category: 'movement',
    ageMonthBracket: 36,
    title: 'Pedals a tricycle',
    description: 'Puts feet on pedals and pedals forward independently.',
  },
  {
    id: 'm36_mov_2',
    category: 'movement',
    ageMonthBracket: 36,
    title: 'Walks up stairs one foot per step',
    description: 'Alternates feet climbing up stairs, perhaps holding handrail.',
  },
];

export const CATEGORY_METADATA: Record<
  MilestoneCategory,
  { label: string; description: string; color: string; bgLight: string; icon: string }
> = {
  movement: {
    label: 'Movement & Physical',
    description: 'Gross and fine motor coordination, balance, and physical agility',
    color: 'text-amber-800',
    bgLight: 'bg-amber-50',
    icon: 'Footprints',
  },
  language: {
    label: 'Language & Communication',
    description: 'Vocalizations, words, gestures, and conversational comprehension',
    color: 'text-sky-800',
    bgLight: 'bg-sky-50',
    icon: 'MessageCircle',
  },
  cognitive: {
    label: 'Cognitive & Learning',
    description: 'Curiosity, spatial reasoning, problem-solving, and pretend play',
    color: 'text-emerald-800',
    bgLight: 'bg-emerald-50',
    icon: 'Brain',
  },
  social: {
    label: 'Social & Emotional',
    description: 'Caregiver bonding, stranger awareness, empathy, and peer play',
    color: 'text-rose-800',
    bgLight: 'bg-rose-50',
    icon: 'Heart',
  },
};

export interface BracketRecommendationItem {
  title: string;
  desc: string;
  emoji: string;
  tag: string;
}

export interface BracketRecommendations {
  nutrition: BracketRecommendationItem;
  sleep: BracketRecommendationItem;
  playAndMovement: BracketRecommendationItem;
  pediatricSafety: BracketRecommendationItem;
}

export function getAgeBracketRecommendations(months: number): BracketRecommendations {
  if (months <= 2) {
    return {
      nutrition: {
        title: 'Exclusive Milk Feedings',
        desc: 'Offer breastmilk or formula on demand (8–12 times/day). No water or juices needed.',
        emoji: '🍼',
        tag: 'Feeding',
      },
      sleep: {
        title: '60–90 Minute Awake Windows',
        desc: 'Place baby on back on a firm, flat mattress with no loose blankets or pillows.',
        emoji: '😴',
        tag: 'Safe Sleep',
      },
      playAndMovement: {
        title: 'High-Contrast Tummy Time',
        desc: '3–5 minutes of tummy time, 2–3 times daily; show black-and-white visual cards.',
        emoji: '🧸',
        tag: 'Development',
      },
      pediatricSafety: {
        title: '2-Month Well-Child Visit',
        desc: 'Schedule checkup and standard infant vaccines (DTaP, Hib, IPV, PCV, Rotavirus).',
        emoji: '🩺',
        tag: 'Clinical Care',
      },
    };
  }

  if (months <= 4) {
    return {
      nutrition: {
        title: 'Demand Feeding & Growth Spurts',
        desc: 'Watch for hunger cues; maintain exclusive milk feeding while head control steadies.',
        emoji: '🍼',
        tag: 'Feeding',
      },
      sleep: {
        title: '1.5–2 Hour Awake Windows',
        desc: '3–4 daytime naps. Begin establishing a gentle, predictable 4-step bedtime routine.',
        emoji: '🌙',
        tag: 'Sleep Rhythm',
      },
      playAndMovement: {
        title: 'Reaching & Grasping Play',
        desc: 'Hold soft rattles within reach; encourage rolling tummy-to-back on a play mat.',
        emoji: '🪇',
        tag: 'Motor Skills',
      },
      pediatricSafety: {
        title: '4-Month Vaccine Check',
        desc: 'Second round of infant immunizations. Monitor temperature and soothing.',
        emoji: '🩺',
        tag: 'Clinical Care',
      },
    };
  }

  if (months <= 6) {
    return {
      nutrition: {
        title: 'Introduction of Purees & Allergens',
        desc: 'Introduce single-ingredient purees (sweet potato, avocado) & early peanut/egg.',
        emoji: '🥑',
        tag: 'Solids Prep',
      },
      sleep: {
        title: '2–2.5 Hour Awake Windows',
        desc: 'Transitioning toward 3 naps (total 12–14h sleep). Day/night circadian rhythm set.',
        emoji: '😴',
        tag: 'Sleep Rhythm',
      },
      playAndMovement: {
        title: 'Supported Sitting & Passing Toys',
        desc: 'Practice sitting with cushion support; encourage transferring objects hand-to-hand.',
        emoji: '🧸',
        tag: 'Coordination',
      },
      pediatricSafety: {
        title: '6-Month Developmental Review',
        desc: 'Pediatric checkup, introduction of open cup water sips, lower crib mattress.',
        emoji: '🩺',
        tag: 'Safety Check',
      },
    };
  }

  if (months <= 9) {
    return {
      nutrition: {
        title: 'Finger Foods & Pincer Snacks',
        desc: 'Offer soft table finger foods (steamed carrot, banana, shredded egg) for pincer practice.',
        emoji: '🥕',
        tag: 'Self-Feeding',
      },
      sleep: {
        title: '2.75–3.25 Hour Awake Windows',
        desc: 'Consolidating into 2 daytime naps. Separation awareness may cause mild sleep resist.',
        emoji: '🌙',
        tag: 'Sleep Schedule',
      },
      playAndMovement: {
        title: 'Floor Exploration & Peek-a-Boo',
        desc: 'Create open floor space for crawling and pulling up; play peek-a-boo for object permanence.',
        emoji: '🧩',
        tag: 'Cognitive Play',
      },
      pediatricSafety: {
        title: 'Full Babyproofing & 9M Check',
        desc: 'Anchor furniture to walls, install baby gates, cover outlets, test for anemia if advised.',
        emoji: '🛡️',
        tag: 'Babyproofing',
      },
    };
  }

  if (months <= 12) {
    return {
      nutrition: {
        title: 'Transition to Family Table Foods',
        desc: 'Transition to whole cow’s milk or fortified plant alternative; 3 meals + 2 healthy snacks.',
        emoji: '🥣',
        tag: 'Nutrition',
      },
      sleep: {
        title: '3–4 Hour Awake Windows',
        desc: 'Usually 1–2 naps (11–13 total hours). Consistent bedtime reading and calm music.',
        emoji: '😴',
        tag: 'Sleep Schedule',
      },
      playAndMovement: {
        title: 'Cruising & Push-Toy Walking',
        desc: 'Encourage independent standing and cruising; point and name animals in board books.',
        emoji: '🚶',
        tag: 'First Steps',
      },
      pediatricSafety: {
        title: '1-Year Milestone & First Dentist',
        desc: 'Schedule 1-year well-visit (MMR, Varicella, HepA) and first infant pediatric dental exam.',
        emoji: '🩺',
        tag: 'Milestone Visit',
      },
    };
  }

  // 15 - 36 months
  return {
    nutrition: {
      title: 'Toddler Independence & Utensils',
      desc: 'Offer a variety of colorful foods with toddler forks & spoons; self-regulate portions.',
      emoji: '🥗',
      tag: 'Nutrition',
    },
    sleep: {
      title: 'Single Afternoon Nap (1.5–2h)',
      desc: '10–12 hours overnight sleep. Maintain strict bedtime boundaries with cozy wind-down.',
      emoji: '🌙',
      tag: 'Toddler Sleep',
    },
    playAndMovement: {
      title: 'Pretend Play & Vocabulary Burst',
      desc: 'Engage in pretend cooking or animal care; ask open-ended questions to expand vocabulary.',
      emoji: '🎨',
      tag: 'Language & Play',
    },
    pediatricSafety: {
      title: 'Toddler Screening & Social Play',
      desc: 'Screening for speech development, autism markers (M-CHAT), and water/traffic safety.',
      emoji: '🩺',
      tag: 'Pediatric Care',
    },
  };
}

