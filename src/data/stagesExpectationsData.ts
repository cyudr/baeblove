export interface FetalWeekStage {
  week: number;
  stageTitle: string;
  themeColor: string;
  fruitComparison: string;
  fruitEmoji: string;
  babyLength: string;
  babyWeight: string;
  biologicalWonder: string;
  whatToExpect: {
    forBaby: string[];
    forParent: string[];
    careTip: string;
  };
  lovingGrowthNote: string;
  wishPrompt: string;
}

export interface BabyMonthStage {
  month: number;
  stageTitle: string;
  subtitle: string;
  themeColor: string;
  symbolEmoji: string;
  typicalWeight: string;
  typicalLength: string;
  biologicalWonder: string;
  whatToExpect: {
    sleepAndRhythms: string;
    feedingAndTastes: string;
    curiousBehaviors: string[];
    sensoryPlayIdea: string;
  };
  lovingGrowthNote: string;
  parentPepTalk: string;
  wishPrompt: string;
}

export const FETAL_STAGES_DATA: FetalWeekStage[] = [
  {
    week: 6,
    stageTitle: 'The First Spark of Life',
    themeColor: 'from-amber-100 to-rose-100',
    fruitComparison: 'Sweet Pea',
    fruitEmoji: '🫛',
    babyLength: '0.6 cm (1/4 in)',
    babyWeight: '< 1 gram',
    biologicalWonder: 'A rhythmic heartbeat has begun beating at 110 beats per minute—twice the speed of your own heart!',
    whatToExpect: {
      forBaby: ['Neural tube is folding into brain and spinal cord', 'Tiny paddle buds form for arms and legs', 'Lenses of the eyes begin to shape'],
      forParent: ['Heightened sense of smell and unexpected food aversions', 'Wave of early pregnancy tiredness as your body builds the placenta', 'Mild joyful butterflies or tender nesting instincts'],
      careTip: 'Sip ginger tea, take your folate-rich prenatal vitamins, and honor your need for naps.',
    },
    lovingGrowthNote: 'Deep within, a constellation of brand-new cells is sparking to life with unique DNA and limitless possibility.',
    wishPrompt: 'What was the very first feeling you had when you knew they were on their way?',
  },
  {
    week: 8,
    stageTitle: 'The Miniature Marvel',
    themeColor: 'from-rose-100 to-amber-100',
    fruitComparison: 'Wild Raspberry',
    fruitEmoji: '🫐',
    babyLength: '1.6 cm (5/8 in)',
    babyWeight: '1 gram',
    biologicalWonder: 'Fingers and toes are distinguishing from webbed mittens, and tiny taste buds are beginning to form.',
    whatToExpect: {
      forBaby: ['Facial features take shape with a button nose and upper lip', 'Tiny elbows now bend', 'Baby begins making spontaneous involuntary twitches'],
      forParent: ['Uterus has grown to the size of a large orange', 'Morning sickness may peak—stay gentle with yourself', 'Extra warmth in hands and feet from increased blood circulation'],
      careTip: 'Small, frequent snacks like crackers or chilled fruit keep blood sugar balanced.',
    },
    lovingGrowthNote: 'Though still as light as a hummingbird feather, every single major organ is now in place and practicing.',
    wishPrompt: 'What song or lullaby do you find yourself quietly humming for them?',
  },
  {
    week: 10,
    stageTitle: 'From Embryo to Fetus',
    themeColor: 'from-orange-100 to-amber-100',
    fruitComparison: 'Golden Kumquat',
    fruitEmoji: '🍊',
    babyLength: '3.1 cm (1.2 in)',
    babyWeight: '4 grams',
    biologicalWonder: 'Official milestone: Embryonic period is complete! Baby is now clinically termed a fetus—meaning "young one" or "offspring".',
    whatToExpect: {
      forBaby: ['Tooth buds form under the gums', 'Kidneys are producing and cycling amniotic fluid', 'Tiny fingernails begin developing'],
      forParent: ['Veins across chest and belly may become visible as blood volume surges', 'Mood shifts as hormone levels plateau before second trimester', 'Gentle cravings for fresh, crisp flavors'],
      careTip: 'Stay well-hydrated; your body is generating extra blood and protective amniotic fluid.',
    },
    lovingGrowthNote: 'The critical foundation is built. Now comes the magical season of growth, refinement, and strength.',
    wishPrompt: 'What is a family tradition or loving habit you cannot wait to share with them?',
  },
  {
    week: 12,
    stageTitle: 'The Fluttering Horizon',
    themeColor: 'from-emerald-100 to-teal-100',
    fruitComparison: 'Juicy Plum',
    fruitEmoji: '🍑',
    babyLength: '5.4 cm (2.1 in)',
    babyWeight: '14 grams',
    biologicalWonder: 'Reflexes are awakening! If your tummy is gently touched during an ultrasound, baby may wiggle or kick back.',
    whatToExpect: {
      forBaby: ['Vocal cords are fully formed', 'Hands can curl into tiny fists and curl toes', 'Bone marrow is beginning to make white blood cells'],
      forParent: ['Energy starts returning as first trimester draws to a close', 'Placenta takes over primary hormone production', 'A gentle bump may begin peeking above the pubic bone'],
      careTip: 'Schedule your first trimester screening or NT ultrasound to see their profile.',
    },
    lovingGrowthNote: 'You have navigated the delicate first trimester. Take a deep breath of pride and hope.',
    wishPrompt: 'What do you hope they inherit from the people who love them most?',
  },
  {
    week: 16,
    stageTitle: 'The Golden Glow',
    themeColor: 'from-amber-100 to-emerald-100',
    fruitComparison: 'Ripe Avocado',
    fruitEmoji: '🥑',
    babyLength: '11.6 cm (4.6 in)',
    babyWeight: '100 grams',
    biologicalWonder: 'Baby’s eyes are sensitive to light filtered through the belly wall, and they are practicing swallowing amniotic fluid.',
    whatToExpect: {
      forBaby: ['Scalp hair pattern is beginning to form', 'Heart pumps roughly 28 liters of blood each day', 'Backbone and tiny muscles grow strong enough to straighten head'],
      forParent: ['"Pregnancy glow" emerges with increased cardiac output', 'May feel early "quickening"—tiny fluttery bubbles like butterfly wings', 'Appetite returns with renewed vitality'],
      careTip: 'Lie down in a quiet room with hands on your lower abdomen to catch subtle first flutterings.',
    },
    lovingGrowthNote: 'They are doing gymnastics in a warm, buoyant world, completely safe and loved.',
    wishPrompt: 'Write down what you imagined they were dreaming about today.',
  },
  {
    week: 20,
    stageTitle: 'The Halfway Milestone',
    themeColor: 'from-sky-100 to-indigo-100',
    fruitComparison: 'Sweet Banana',
    fruitEmoji: '🍌',
    babyLength: '25.6 cm (10 in)',
    babyWeight: '300 grams',
    biologicalWonder: 'You are at the exact midpoint! Baby is covered in vernix caseosa—a silky, nourishing cream that protects delicate skin in fluid.',
    whatToExpect: {
      forBaby: ['Anatomy scan week: 4-chamber heart, kidneys, spine, and brain ventricles imaged', 'Baby develops distinct sleep and wake rhythms', 'Hearing is sharp: your heartbeat is their favorite song'],
      forParent: ['Uterus reaches the height of your belly button', 'Kicks become unmistakable thumps and rolls', 'Partners can often feel movements with palm pressed flat'],
      careTip: 'Celebrate this midpoint milestone with a photo or a special cozy dinner.',
    },
    lovingGrowthNote: '20 weeks of shared heartbeats. Halfway to holding your little one in your arms.',
    wishPrompt: 'What words of love would you whisper to them through your belly tonight?',
  },
  {
    week: 24,
    stageTitle: 'The Listener & Dreamer',
    themeColor: 'from-indigo-100 to-rose-100',
    fruitComparison: 'Golden Ear of Corn',
    fruitEmoji: '🌽',
    babyLength: '30.0 cm (11.8 in)',
    babyWeight: '600 grams',
    biologicalWonder: 'Baby can hear conversations, laughter, and music outside the womb, and will startle at sudden sounds!',
    whatToExpect: {
      forBaby: ['Taste buds can perceive subtle sweet or savory flavors from what you eat', 'Lungs begin manufacturing surfactant, essential for breathing air', 'Rapid eye movement (REM) sleep begins—baby is dreaming!'],
      forParent: ['Viability milestone reached—a major reassuring step', 'Glucose screening test usually done between weeks 24–28', 'Mild back arches or rib stretches as baby expands their room'],
      careTip: 'Talk and read aloud to your belly. Baby recognizes your unique voice cadence.',
    },
    lovingGrowthNote: 'Every time you laugh, baby rocks gently in a pool of warmth. You are their entire world.',
    wishPrompt: 'What is a book or story you can’t wait to read to them under a cozy blanket?',
  },
  {
    week: 28,
    stageTitle: 'Welcome to the Third Trimester',
    themeColor: 'from-purple-100 to-pink-100',
    fruitComparison: 'Large Purple Eggplant',
    fruitEmoji: '🍆',
    babyLength: '37.6 cm (14.8 in)',
    babyWeight: '1,000 grams (2.2 lbs)',
    biologicalWonder: 'Baby’s eyes open for the first time! Eyelashes are fully grown, and baby can blink and turn towards light sources.',
    whatToExpect: {
      forBaby: ['Brain tissue expands rapidly, developing complex wrinkles and folds', 'Baby weighs over 1 kg (over 2 pounds)', 'Rhythmic hiccups may feel like gentle repeating twitches'],
      forParent: ['Welcome to the home stretch! Appointments increase to every 2 weeks', 'Daily kick counting becomes a joyful ritual', 'Nesting instincts may spark—washing baby clothes and organizing the crib'],
      careTip: 'Pick a calm evening hour each day for kick counting when baby is most active.',
    },
    lovingGrowthNote: 'You have entered the final stretch. Soon, the kicks inside will become soft hands wrapped around your fingers.',
    wishPrompt: 'What does your dream first morning with them look like?',
  },
  {
    week: 32,
    stageTitle: 'The Cozy Nest',
    themeColor: 'from-rose-100 to-amber-100',
    fruitComparison: 'Butternut Squash',
    fruitEmoji: '🥥',
    babyLength: '42.4 cm (16.7 in)',
    babyWeight: '1,700 grams (3.7 lbs)',
    biologicalWonder: 'Practicing rhythmic breathing movements with diaphragm and rib muscles, preparing for their very first outside breath.',
    whatToExpect: {
      forBaby: ['Toenails and fingernails are fully formed', 'Fat accumulates under the skin, turning red skin to lovely smooth pink', 'Bones are hardening, though skull bones remain soft to ease birth'],
      forParent: ['Braxton Hicks warm-up contractions may occur', 'Shortness of breath as uterus presses upward', 'Dreaming vividly about baby and parenthood'],
      careTip: 'Rest with feet elevated and use a cozy pillow between your knees when sleeping.',
    },
    lovingGrowthNote: 'Space is getting snug in their first little home because they are growing strong, healthy, and plump.',
    wishPrompt: 'What are you most proud of in yourself as you prepare to bring them into the world?',
  },
  {
    week: 36,
    stageTitle: 'Head Down & Ready',
    themeColor: 'from-amber-100 to-emerald-100',
    fruitComparison: 'Honeydew Melon',
    fruitEmoji: '🍈',
    babyLength: '47.4 cm (18.7 in)',
    babyWeight: '2,620 grams (5.8 lbs)',
    biologicalWonder: 'Most babies have rotated into the cephalic (head-down) position, settling comfortably into the pelvic cradle.',
    whatToExpect: {
      forBaby: ['Gaining roughly half a pound (200-250 grams) each week', 'Placenta continues transmitting antibodies for natural immunity', 'Digestive system is fully primed for breast milk or formula'],
      forParent: ['Baby may "drop" lower (lightening), easing breathing but increasing bathroom trips', 'Weekly checkups with midwife or doctor begin', 'Hospital bag packed and nursery essentials in place'],
      careTip: 'Finalize your birth plan preferences and make sure the infant car seat is securely inspected.',
    },
    lovingGrowthNote: 'Almost full term. Every day from here adds strength, lung maturity, and readiness for life.',
    wishPrompt: 'What is the very first thing you want to tell them when they are placed on your chest?',
  },
  {
    week: 40,
    stageTitle: 'The Birthday Horizon',
    themeColor: 'from-emerald-100 to-teal-100',
    fruitComparison: 'Sweet Watermelon',
    fruitEmoji: '🍉',
    babyLength: '51.2 cm (20.2 in)',
    babyWeight: '3,460 grams (7.6 lbs)',
    biologicalWonder: 'Full-term miracle! Baby is 100% prepared to meet the outside world with working reflexes, firm grasp, and warm cheeks.',
    whatToExpect: {
      forBaby: ['Lungs produce full surfactant for the first miraculous cry', 'Vernix has mostly absorbed into skin, leaving baby silky soft', 'Firm grip reflex ready to hold your hand'],
      forParent: ['Any day now! Remember only 5% arrive on exact due date—38-41 weeks is completely normal', 'Cervix effaces and dilates gently', 'Anticipation and love reaching their highest peak'],
      careTip: 'Rest, hydrate, and trust your body. You are ready. Baby is ready.',
    },
    lovingGrowthNote: 'From two microscopic cells to a fully formed human with beating heart, unique eyes, and boundless destiny. What a wonder.',
    wishPrompt: 'Write a love letter for baby’s arrival day. A treasure to keep forever.',
  },
];

export const BABY_MONTH_STAGES: BabyMonthStage[] = [
  {
    month: 0,
    stageTitle: 'Welcome, Sweet Little Miracle',
    subtitle: 'The Golden Newborn Wonder',
    themeColor: 'from-amber-50 to-rose-50',
    symbolEmoji: '🌟',
    typicalWeight: '3.0 – 3.8 kg (6.6 – 8.4 lbs)',
    typicalLength: '48 – 52 cm (19 – 20.5 in)',
    biologicalWonder: 'Baby’s senses are tuned to find you! They can focus best at 8–12 inches away—the exact distance to your eyes while feeding.',
    whatToExpect: {
      sleepAndRhythms: 'Sleeps 16–18 hours across small 2–3 hour cycles; day and night confusion is completely normal.',
      feedingAndTastes: 'Eats 8–12 times every 24 hours. Tiny stomach starts the size of a cherry and grows to a walnut.',
      curiousBehaviors: [
        'Moro startle reflex when hearing sudden noise',
        'Strong grasp reflex—will grip your pinky finger tightly',
        'Turns towards your voice with calm, wide-eyed gaze',
      ],
      sensoryPlayIdea: 'Skin-to-skin kangaroo care: rest baby chest-to-chest to steady their heart rate and breathing.',
    },
    lovingGrowthNote: 'You do not have to have everything figured out. Feeding, cuddling, and resting are your only jobs right now.',
    parentPepTalk: 'Give yourself deep grace. You are learning a new human, and they are learning the whole universe.',
    wishPrompt: 'What was the exact thought that crossed your mind the moment you saw their eyes?',
  },
  {
    month: 1,
    stageTitle: 'Awakening to the Light',
    subtitle: 'Alert Gaps & Early Coos',
    themeColor: 'from-rose-50 to-orange-50',
    symbolEmoji: '🌱',
    typicalWeight: '4.0 – 4.8 kg (8.8 – 10.5 lbs)',
    typicalLength: '53 – 56 cm (21 – 22 in)',
    biologicalWonder: 'Brain neural synapses are multiplying faster than at any other period in the human lifespan!',
    whatToExpect: {
      sleepAndRhythms: 'Longer awake periods during daylight; subtle circadian rhythms begin establishing.',
      feedingAndTastes: 'Feedings become more rhythmic; baby learns to suckle with greater coordination.',
      curiousBehaviors: [
        'First gentle vowel sounds: soft "oohs" and "aahs"',
        'Briefly lifts chin off chest during tummy time',
        'Tracks high-contrast black-and-white patterns with intent curiosity',
      ],
      sensoryPlayIdea: 'High-contrast cards: hold bold black-and-white shapes 10 inches away and move slowly side to side.',
    },
    lovingGrowthNote: 'They recognize the unique scent of your skin and calm faster with your gentle rhythm than anyone else.',
    parentPepTalk: 'Those quiet 10-minute alert windows are little windows into their emerging personality.',
    wishPrompt: 'What little quirk or expression have you already fallen in love with?',
  },
  {
    month: 2,
    stageTitle: 'The Dawn of Social Smiles',
    subtitle: 'Connecting Face to Face',
    themeColor: 'from-emerald-50 to-teal-50',
    symbolEmoji: '😊',
    typicalWeight: '5.0 – 6.0 kg (11 – 13.2 lbs)',
    typicalLength: '56 – 60 cm (22 – 23.5 in)',
    biologicalWonder: 'The first real social smiles ignite! These aren’t gas reflexes—they are intentional, heartfelt responses to your smile and voice.',
    whatToExpect: {
      sleepAndRhythms: 'May give you one longer stretch of 4–5 hours at night; naps average 3–4 across the day.',
      feedingAndTastes: 'Weight gain is at its most rapid clip: roughly 25–30 grams every single day.',
      curiousBehaviors: [
        'Smiles brightly when you make eye contact and talk in motherese',
        'Discovers their own hands, bringing knuckles up to inspect',
        'Coos musically in back-and-forth "conversations" with pauses',
      ],
      sensoryPlayIdea: 'Mirror play: look together into an unbreakable mirror and smile, watching their eyes light up.',
    },
    lovingGrowthNote: 'When baby smiles back at you, they are saying: "I know you, I trust you, and you make me feel safe."',
    parentPepTalk: 'The sleepless nights begin to pay emotional dividends the moment that gummy grin beams at you.',
    wishPrompt: 'Describe the feeling when you got their first deliberate smile.',
  },
  {
    month: 4,
    stageTitle: 'The Giggle Discovery',
    subtitle: 'Rolling, Reaching & Two-Handed Joy',
    themeColor: 'from-sky-50 to-indigo-50',
    symbolEmoji: '🎈',
    typicalWeight: '6.2 – 7.5 kg (13.7 – 16.5 lbs)',
    typicalLength: '62 – 66 cm (24.5 – 26 in)',
    biologicalWonder: 'Full color vision has unlocked! Baby can now perceive greens, reds, and deep blues with rich depth perception.',
    whatToExpect: {
      sleepAndRhythms: 'The classic 4-month sleep leap: adult-like sleep cycles form. Night wakings can temporarily rise.',
      feedingAndTastes: 'Very efficient nursing or bottle sessions (often 5–10 mins). Drooling increases as saliva glands activate.',
      curiousBehaviors: [
        'First real belly laughs when tickled gently or when you blow raspberries',
        'Reaches out deliberately with both hands to grasp colorful rings',
        'Pushes up on elbows with sturdy, wobble-free head control',
      ],
      sensoryPlayIdea: 'Peek-a-boo with a lightweight muslin blanket over your face: drop it with a joyous "BOO!".',
    },
    lovingGrowthNote: 'Their laugh is the sweetest music on earth. You are teaching them that the world is a joyful playground.',
    parentPepTalk: 'If sleep feels bumpy right now, remember it is a sign of enormous brain rewiring. This stage passes.',
    wishPrompt: 'What makes your little one giggle the hardest right now?',
  },
  {
    month: 6,
    stageTitle: 'Sitting Tall & First Tastes',
    subtitle: 'The Halfway-to-One Milestone',
    themeColor: 'from-amber-50 to-emerald-50',
    symbolEmoji: '🥑',
    typicalWeight: '7.2 – 8.8 kg (15.8 – 19.4 lbs)',
    typicalLength: '65 – 70 cm (25.5 – 27.5 in)',
    biologicalWonder: 'Birth weight has typically doubled! The digestive tract has matured, producing enzymes ready for solid food wonders.',
    whatToExpect: {
      sleepAndRhythms: 'Usually settles into 2–3 predictable daytime naps; night sleep can stretch 6–8 hours.',
      feedingAndTastes: 'Exciting milestone: starting solid foods! Mashed avocado, sweet potato, banana, or baby cereal.',
      curiousBehaviors: [
        'Rolls in both directions like an energetic rolling pin',
        'Sits propped up or independently for brief joyful moments',
        'Babbles repetitive syllable chains: "ba-ba", "ma-ma", "da-da"',
      ],
      sensoryPlayIdea: 'Messy food sensory exploration: let baby squish avocado or sweet potato between their fingers in the high chair.',
    },
    lovingGrowthNote: 'Watching their eyes widen at their very first taste of food is a memory you will cherish forever.',
    parentPepTalk: 'Half a year of loving them. Look back at newborn photos and marvel at how far you both have traveled.',
    wishPrompt: 'What food did they make the funniest face trying for the first time?',
  },
  {
    month: 9,
    stageTitle: 'The Little Explorer',
    subtitle: 'Object Permanence & Crawling Wonder',
    themeColor: 'from-purple-50 to-pink-50',
    symbolEmoji: '🧸',
    typicalWeight: '8.2 – 10.0 kg (18.0 – 22.0 lbs)',
    typicalLength: '70 – 75 cm (27.5 – 29.5 in)',
    biologicalWonder: 'Object permanence has unlocked! Baby now understands that when you leave the room, you still exist and will return.',
    whatToExpect: {
      sleepAndRhythms: 'Most babies thrive on 2 solid daily naps (morning and afternoon).',
      feedingAndTastes: 'Eats 3 small finger-food meals a day plus breastmilk or formula; practicing pincer grasp with peas and puffs.',
      curiousBehaviors: [
        'Crawling, scooting, or army-crawling across living room rugs',
        'Pulls up to a stand against coffee tables and crib rails',
        'Turns around promptly when their name is called with bright recognition',
      ],
      sensoryPlayIdea: 'Cushion obstacle course: pile sofa pillows on the rug and cheer as they clamber over them.',
    },
    lovingGrowthNote: 'Their world has suddenly expanded from being carried to discovering things with their own two hands and knees.',
    parentPepTalk: 'Baby-proof thoroughly and let them explore. Curiosity is the foundation of lifelong learning.',
    wishPrompt: 'What is their favorite corner of the home to crawl towards right now?',
  },
  {
    month: 12,
    stageTitle: 'One Whole Orbit Around the Sun',
    subtitle: 'The First Birthday Wonder',
    themeColor: 'from-rose-50 to-amber-50',
    symbolEmoji: '🎂',
    typicalWeight: '9.0 – 11.2 kg (19.8 – 24.6 lbs)',
    typicalLength: '74 – 79 cm (29 – 31 in)',
    biologicalWonder: 'Birth weight has tripled, and brain volume has expanded by 100% since the day they were born!',
    whatToExpect: {
      sleepAndRhythms: 'Around 11–12 hours at night plus 1–2 daytime naps.',
      feedingAndTastes: 'Transitioning to whole cow’s milk or fortified plant milk; eating what the family eats at the dinner table.',
      curiousBehaviors: [
        'Cruising swiftly along furniture or taking courageous first independent steps',
        'Waves "bye-bye" and claps along to pat-a-cake',
        'Speaks 1–3 meaningful words like "mama", "dada", "ball", or "bye"',
      ],
      sensoryPlayIdea: 'Smash cake celebration & stackable wooden rings: cheering their accomplishments with family.',
    },
    lovingGrowthNote: '365 days of holding, comforting, feeding, and witnessing a miracle bloom. You did it.',
    parentPepTalk: 'Take a quiet moment on their birthday to hug your partner or yourself. You raised a baby into a toddler.',
    wishPrompt: 'A letter to my 1-year-old: what I wish for your upcoming year of steps and words.',
  },
  {
    month: 18,
    stageTitle: 'The Walking Dynamo',
    subtitle: 'Words, Autonomy & Pure Energy',
    themeColor: 'from-emerald-50 to-sky-50',
    symbolEmoji: '🚀',
    typicalWeight: '10.2 – 12.5 kg (22.5 – 27.5 lbs)',
    typicalLength: '80 – 86 cm (31.5 – 34 in)',
    biologicalWonder: 'Vocabulary explosion begins! A child at 18 months learns an average of 1 new word every single waking day.',
    whatToExpect: {
      sleepAndRhythms: 'Usually transitions to a single long afternoon nap (1.5–2.5 hours).',
      feedingAndTastes: 'Feeding themselves with spoon and open cup; toddler food preferences become spirited.',
      curiousBehaviors: [
        'Walks steadily, climbs steps holding hands, and bends down to pick up toys',
        'Points excitedly at airplanes, dogs, and trucks to share interest with you',
        'Pretend play begins: feeding a teddy bear or talking on a toy phone',
      ],
      sensoryPlayIdea: 'Outdoor nature walk: collecting pinecones, stepping on crunchy autumn leaves, and spotting birds.',
    },
    lovingGrowthNote: 'They are building their independent will while still needing your warm lap as their safe home base.',
    parentPepTalk: 'Big toddler feelings are just small people experiencing giant emotions for the first time. Connection over correction.',
    wishPrompt: 'What is their favorite word to say repeatedly with so much enthusiasm?',
  },
  {
    month: 24,
    stageTitle: 'Two Years of Magic',
    subtitle: 'Phrases, Running & Big Imagination',
    themeColor: 'from-amber-50 to-indigo-50',
    symbolEmoji: '🌈',
    typicalWeight: '11.5 – 14.0 kg (25.3 – 30.8 lbs)',
    typicalLength: '85 – 92 cm (33.5 – 36 in)',
    biologicalWonder: 'Grammar circuits activate! Combining 2–3 words together into mini-sentences ("More juice please", "Big doggie run").',
    whatToExpect: {
      sleepAndRhythms: 'Consistent night sleep of 10–12 hours; afternoon nap remains important.',
      feedingAndTastes: 'Enjoys participating in snack prep: washing grapes or stirring batter with a wooden spoon.',
      curiousBehaviors: [
        'Runs with balance, kicks a ball forward, and jumps with both feet off the floor',
        'Sorts shapes, colors, and builds towers of 6+ blocks with glee',
        'Shows gentle empathy: pats another child on the back when they cry',
      ],
      sensoryPlayIdea: 'Playdough creation & singing nursery rhymes with hand motions: itsy-bitsy spider and wheels on the bus.',
    },
    lovingGrowthNote: 'Two years in, they are not just your baby—they are your funny, loving, conversational little best friend.',
    parentPepTalk: 'The "terrible twos" are actually the "terrific twos"—a glorious season of humor, hugs, and wondrous discoveries.',
    wishPrompt: 'What is a funny phrase or story that made the whole room laugh this week?',
  },
  {
    month: 36,
    stageTitle: 'The Storyteller & Dreamer',
    subtitle: 'Three Years of Boundless Wonder',
    themeColor: 'from-purple-50 to-rose-50',
    symbolEmoji: '✨',
    typicalWeight: '13.0 – 16.5 kg (28.6 – 36.3 lbs)',
    typicalLength: '92 – 100 cm (36 – 39.5 in)',
    biologicalWonder: 'Rich episodic memory forms! They will begin to remember special trips, bedtime stories, and family celebrations.',
    whatToExpect: {
      sleepAndRhythms: 'May begin dropping afternoon nap or resting quietly; bedtime routines become sweet story sessions.',
      feedingAndTastes: 'Eats independently with fork and spoon, enjoys family dinner conversation.',
      curiousBehaviors: [
        'Carries on full back-and-forth conversations asking "Why?" and "What’s that?"',
        'Dresses with minimal help; pedals a tricycle swiftly',
        'Creates elaborate pretend worlds with stuffed animals and figurines',
      ],
      sensoryPlayIdea: 'Finger painting and imaginative fort building with blankets and cushions in the living room.',
    },
    lovingGrowthNote: 'Your little sprout has blossomed into a full little person with opinions, laughter, dreams, and immense heart.',
    parentPepTalk: 'Look at this remarkable child you have nurtured from day one. You did that with your love and presence.',
    wishPrompt: 'What is your biggest wish for their future as they step into early childhood?',
  },
];

export interface BabyWeekStage {
  week: number;
  monthEquivalent: number;
  stageTitle: string;
  themeColor: string;
  symbolEmoji: string;
  developmentLeap: string;
  biologicalWonder: string;
  whatToExpect: {
    sleepAndSoothe: string;
    feedingNotes: string;
    milestoneFocus: string[];
    interactionIdea: string;
  };
  growthNote: string;
  wishPrompt: string;
}

export const BABY_WEEK_STAGES: BabyWeekStage[] = [
  {
    week: 1,
    monthEquivalent: 0,
    stageTitle: 'Week 1 · The Golden Arrival',
    themeColor: 'from-amber-100 to-rose-100',
    symbolEmoji: '🌟',
    developmentLeap: 'Post-birth transition & adaptation to sensory atmosphere',
    biologicalWonder: 'Baby’s cardiovascular system makes a miraculous instant shift, closing the ductus arteriosus as lungs take their first outside breaths.',
    whatToExpect: {
      sleepAndSoothe: 'Sleeps 16-18 hours; startles easily; loves swaddling and skin-to-skin snuggle.',
      feedingNotes: 'Colostrum transitions into mature milk; feeding 8–12 times per 24 hours on demand.',
      milestoneFocus: ['Turns head toward breast/bottle', 'Moro and rooting reflexes strong', 'Calms to parental heartbeat'],
      interactionIdea: 'Rest baby chest-to-chest in a dim, quiet room and speak in soft whispers.',
    },
    growthNote: 'The fourth trimester has begun. You are their safe harbor in a bright new world.',
    wishPrompt: 'What was your very first thought when you held them in your arms?',
  },
  {
    week: 2,
    monthEquivalent: 0,
    stageTitle: 'Week 2 · Regaining Birth Weight',
    themeColor: 'from-rose-100 to-amber-100',
    symbolEmoji: '🌱',
    developmentLeap: 'Weight rebound & digestive awakening',
    biologicalWonder: 'Umbilical cord stump typically dries and separates, leaving their tiny, perfect belly button.',
    whatToExpect: {
      sleepAndSoothe: 'Day/night confusion is common; expose baby to gentle natural morning sunlight.',
      feedingNotes: 'Most babies regain their initial birth weight around day 10–14.',
      milestoneFocus: ['Focuses eyes on faces 8-12 inches away', 'Strong palmar grasp on your pinky finger', 'Lifts head momentarily during tummy time'],
      interactionIdea: 'Tummy time on your chest for 2-3 minutes while singing softly.',
    },
    growthNote: 'Every ounce gained is proof of your loving dedication. Celebrate the small victories.',
    wishPrompt: 'What little facial expression of theirs melted your heart this week?',
  },
  {
    week: 3,
    monthEquivalent: 0.7,
    stageTitle: 'Week 3 · The Growth Surge',
    themeColor: 'from-orange-100 to-amber-100',
    symbolEmoji: '📈',
    developmentLeap: 'First major growth spurt & cluster feeding',
    biologicalWonder: 'Brain synapses expand dramatically; appetite increases to fuel rapid cellular division.',
    whatToExpect: {
      sleepAndSoothe: 'Fussier evening periods (the "witching hour") as baby processes daylight stimuli.',
      feedingNotes: 'Cluster feeding: wanting to feed every hour in the late afternoon or evening.',
      milestoneFocus: ['Tracks bold shapes briefly', 'Makes soft sighing sounds', 'Relaxes limbs during warm baths'],
      interactionIdea: 'A warm, soothing bath followed by gentle coconut or baby oil leg massage.',
    },
    growthNote: 'Cluster feeding is nature’s clever way of calibrating milk supply. Settle in with a favorite podcast.',
    wishPrompt: 'What peaceful moment brought you comfort amid the sleepless nights?',
  },
  {
    week: 4,
    monthEquivalent: 1,
    stageTitle: 'Week 4 · One Month of Loving You',
    themeColor: 'from-emerald-100 to-teal-100',
    symbolEmoji: '🎂',
    developmentLeap: 'Alert state expansion & visual tracking',
    biologicalWonder: 'Melanin in the eyes settles into place; baby can now track gentle horizontal movements across a 90-degree arc.',
    whatToExpect: {
      sleepAndSoothe: 'Alert periods stretch to 45–60 minutes between naps.',
      feedingNotes: 'Digestive rhythms steady; wet and dirty diapers follow a predictable pattern.',
      milestoneFocus: ['Briefly holds head up at 45 degrees', 'Reacts to parent’s voice with steady gaze', 'Soft coos begin replacing cries'],
      interactionIdea: 'Hold a black-and-white card 10 inches from their face and move it slowly across their vision.',
    },
    growthNote: 'One full month of parenthood. You are already an expert on your baby’s unique cues.',
    wishPrompt: 'What have you learned about your own strength in this first month?',
  },
  {
    week: 6,
    monthEquivalent: 1.5,
    stageTitle: 'Week 6 · The First Social Smiles',
    themeColor: 'from-amber-100 to-rose-100',
    symbolEmoji: '😊',
    developmentLeap: 'Leap 1: Changing sensations & intentional smiling',
    biologicalWonder: 'The brain’s limbic emotional circuitry connects to facial motor nerves, unleashing genuine, deliberate social smiles!',
    whatToExpect: {
      sleepAndSoothe: 'Fussiness often peaks around week 6 before steadily calming down in coming weeks.',
      feedingNotes: 'Baby may pause during feeds to look up at your face and smile.',
      milestoneFocus: ['Smiles in response to your smile', 'Vocalizes musical cooing sounds ("ooh", "aah")', 'Smooth arm and leg bicycle movements'],
      interactionIdea: 'Get close, smile warmly, and pause for 5 seconds to give baby time to beam back.',
    },
    growthNote: 'That first real smile erases 1,000 sleepless hours. You are their absolute favorite person.',
    wishPrompt: 'Describe the exact room and moment they first smiled at you.',
  },
  {
    week: 8,
    monthEquivalent: 2,
    stageTitle: 'Week 8 · The Curious Conversationalist',
    themeColor: 'from-sky-100 to-indigo-100',
    symbolEmoji: '💬',
    developmentLeap: 'Vocal turn-taking & hand discovery',
    biologicalWonder: 'Cerebral cortex myelinates rapidly; baby discovers they have hands and will stare at their fingers in awe.',
    whatToExpect: {
      sleepAndSoothe: 'Nighttime stretches may lengthen to 4–6 consecutive hours.',
      feedingNotes: 'Efficient feeding sessions with strong, steady suckling.',
      milestoneFocus: ['Brings hands together over chest', 'Opens fists into relaxed open palms', 'Turns head directly toward speaking voices'],
      interactionIdea: 'Talk in a melodious singsong voice, pause, and wait for baby to coo back in conversation.',
    },
    growthNote: 'Your back-and-forth cooing is laying the foundational wiring for human language and empathy.',
    wishPrompt: 'What kind of conversations do you imagine having with them in 10 years?',
  },
  {
    week: 12,
    monthEquivalent: 3,
    stageTitle: 'Week 12 · The Joyful 3-Month Mark',
    themeColor: 'from-purple-100 to-pink-100',
    symbolEmoji: '🌸',
    developmentLeap: 'Leap 3: Smooth transitions & steady head control',
    biologicalWonder: 'Neck muscles achieve solid balance; baby can hold their head steady without any wobbling when upright.',
    whatToExpect: {
      sleepAndSoothe: 'Consistent bedtime routine (bath, book, lullaby) begins to establish deep sleep associations.',
      feedingNotes: 'Feeding intervals space out to every 3–4 hours during the day.',
      milestoneFocus: ['Pushes chest up onto forearms in tummy time', 'Reaches toward dangling toys with intent', 'Chuckles and giggles when playfully tickled'],
      interactionIdea: 'Lay baby under a baby gym and watch them swipe their hands purposefully at hanging rings.',
    },
    growthNote: 'The fourth trimester draws to an end. Baby is now interactive, cheerful, and thriving.',
    wishPrompt: 'What is your favorite part of your daily routine together?',
  },
  {
    week: 16,
    monthEquivalent: 4,
    stageTitle: 'Week 16 · The Laugh & Roll Explorer',
    themeColor: 'from-amber-100 to-emerald-100',
    symbolEmoji: '🎈',
    developmentLeap: 'Leap 4: Events, full color vision & rolling over',
    biologicalWonder: 'Adult-like 90-minute circadian sleep architecture matures, creating the famous 4-month sleep reorganization.',
    whatToExpect: {
      sleepAndSoothe: 'Night wakings may temporarily increase as brain undergoes massive synaptic pruning.',
      feedingNotes: 'Easily distracted while feeding—prefers a quiet room away from screens and dogs.',
      milestoneFocus: ['Rolls from tummy to back', 'First belly laughs', 'Brings objects straight to mouth for tactile exploration'],
      interactionIdea: 'Play peek-a-boo with a soft cloth over your face, dropping it with an exuberant "BOO!".',
    },
    growthNote: 'Sleep challenges at this stage are not a regression; they are a sign of tremendous mental expansion.',
    wishPrompt: 'What makes your baby laugh from the bottom of their belly?',
  },
  {
    week: 20,
    monthEquivalent: 5,
    stageTitle: 'Week 20 · Sitting Support & Babble Songs',
    themeColor: 'from-rose-100 to-amber-100',
    symbolEmoji: '🧸',
    developmentLeap: 'Two-handed grasp & consonant bubbling',
    biologicalWonder: 'Depth perception reaches adult acuity; baby can judge distance and grab moving objects with precision.',
    whatToExpect: {
      sleepAndSoothe: 'Naps settle into 3 predictable daily blocks (morning, noon, late afternoon).',
      feedingNotes: 'Shows deep fascination watching adults chew food at the dinner table.',
      milestoneFocus: ['Passes a toy from left hand to right hand', 'Babbles consonants like "da-da" and "ba-ba"', 'Pivots on tummy in a 360-degree circle'],
      interactionIdea: 'Sit baby propped between your legs and blow soap bubbles for them to track and pop.',
    },
    growthNote: 'Their unique personality is blooming: their favorite toys, their funny grumpy faces, their gentle cuddles.',
    wishPrompt: 'What trait of theirs reminds you most of yourself or your partner?',
  },
  {
    week: 24,
    monthEquivalent: 6,
    stageTitle: 'Week 24 · Halfway to One & First Tastes',
    themeColor: 'from-emerald-100 to-sky-100',
    symbolEmoji: '🥑',
    developmentLeap: 'Leap 5: Relationships & independent sitting',
    biologicalWonder: 'First primary teeth (lower central incisors) may begin to erupt through the gums.',
    whatToExpect: {
      sleepAndSoothe: 'May sleep 6–8 continuous hours at night; self-soothing with thumb or favorite sleep sack.',
      feedingNotes: 'Starting solids! Introducing rich avocado, sweet potato, oat cereal, and steamed broccoli.',
      milestoneFocus: ['Sits steadily without hand support (tripod sit)', 'Transfers objects between hands smoothly', 'Responds directly to their own name'],
      interactionIdea: 'High chair sensory tasting: let them explore steamed carrot sticks with their bare hands.',
    },
    growthNote: 'Six whole months of wonder. Look at this sturdy, laughing little person you have raised.',
    wishPrompt: 'What is a hope you have for their journey with food, flavors, and joy?',
  },
  {
    week: 28,
    monthEquivalent: 7,
    stageTitle: 'Week 28 · The Eager Explorer',
    themeColor: 'from-amber-100 to-rose-100',
    symbolEmoji: '🦊',
    developmentLeap: 'Rocking on all fours & vocal imitation',
    biologicalWonder: 'Myelination of peripheral nerves allows baby to push up on all fours and rock forward and backward in anticipation of crawling.',
    whatToExpect: {
      sleepAndSoothe: 'Wake windows stretch to 2.5–3 hours. Two reliable naps per day become the rhythm.',
      feedingNotes: 'Enjoys thicker textures, soft mashed bananas, avocado wedges, and holding a sippy cup.',
      milestoneFocus: ['Rocks on hands and knees', 'Imitates sounds like clicking tongue or coughing playfully', 'Bangs two blocks together to make noise'],
      interactionIdea: 'Place a coveted toy just 6 inches out of reach during floor time to encourage moving forward.',
    },
    growthNote: 'Watch their determination. When baby falls over from sitting, they dust themselves off and try again.',
    wishPrompt: 'What small victory of theirs brought the biggest round of applause this week?',
  },
  {
    week: 32,
    monthEquivalent: 8,
    stageTitle: 'Week 32 · Peek-a-Boo Champion',
    themeColor: 'from-sky-100 to-teal-100',
    symbolEmoji: '🙈',
    developmentLeap: 'Leap 6: Object permanence & emotional bonding',
    biologicalWonder: 'The hippocampus matures, cementing the awareness that Mama and Papa still exist even when stepping into the next room.',
    whatToExpect: {
      sleepAndSoothe: 'Separation anxiety may peak; offer a calm, predictable goodbye routine rather than sneaking away.',
      feedingNotes: 'Finger feeding blossoms; baby loves picking up small soft steamed carrot pieces.',
      milestoneFocus: ['Uncovers a toy hidden under a blanket', 'Claps hands when hearing singing', 'Crawls or scoots across rooms with purpose'],
      interactionIdea: 'Play hide-and-seek behind a door: pop out with a gentle singing voice.',
    },
    growthNote: 'Their clinginess is not a step backward; it is proof of how deeply and safely they love you.',
    wishPrompt: 'What brings your baby the greatest sense of calm when they feel overwhelmed?',
  },
  {
    week: 36,
    monthEquivalent: 9,
    stageTitle: 'Week 36 · The Crawling Detective',
    themeColor: 'from-purple-100 to-pink-100',
    symbolEmoji: '🔍',
    developmentLeap: 'Leap 6: Categories & object permanence',
    biologicalWonder: 'Object permanence is complete: baby understands that hidden toys and leaving parents still exist in the world.',
    whatToExpect: {
      sleepAndSoothe: 'Separation anxiety is a normal, healthy indicator of strong parental attachment.',
      feedingNotes: 'Pincer grasp allows baby to pick up single peas and cereal puffs between thumb and index finger.',
      milestoneFocus: ['Crawls or scoots across the room', 'Pulls up to standing on coffee tables', 'Claps hands when excited'],
      interactionIdea: 'Build cushion tunnels on the carpet and cheer as baby crawls through them.',
    },
    growthNote: 'The world is now their interactive laboratory. Every drawer and dust bunny is fascinating.',
    wishPrompt: 'What is their favorite corner of your home to explore right now?',
  },
  {
    week: 40,
    monthEquivalent: 10,
    stageTitle: 'Week 40 · Cruising the Living Room',
    themeColor: 'from-teal-100 to-emerald-100',
    symbolEmoji: '⛵',
    developmentLeap: 'Leap 7: Sequences & cruising along furniture',
    biologicalWonder: 'Vestibular balance system in the inner ear coordinates with foot arch muscles to support lateral cruising along furniture.',
    whatToExpect: {
      sleepAndSoothe: 'Often sleeps 11–12 hours at night with two 1–1.5 hour restorative daytime naps.',
      feedingNotes: 'Eats three family-style meals with small snacks. Loves drinking water from an open cup with assistance.',
      milestoneFocus: ['Cruises along sofas holding on with one hand', 'Points with index finger at birds, lamps, and dogs', 'Shakes head to indicate "no"'],
      interactionIdea: 'Line up safe cushions along the sofa so baby can cruise around obstacles.',
    },
    growthNote: 'The horizon has opened up. From lying on their back 40 weeks ago to standing tall on two feet today.',
    wishPrompt: 'What part of their everyday routine feels like absolute magic?',
  },
  {
    week: 44,
    monthEquivalent: 11,
    stageTitle: 'Week 44 · First Words & Pointing',
    themeColor: 'from-rose-100 to-amber-100',
    symbolEmoji: '🗣️',
    developmentLeap: 'Intentional vocalization & receptive language explosion',
    biologicalWonder: 'Wernicke’s language area in the temporal lobe connects with motor speech circuits: baby understands dozens of everyday words.',
    whatToExpect: {
      sleepAndSoothe: 'May resist naptime because playing is simply too exciting! Stick to calm wind-down rituals.',
      feedingNotes: 'Mastering the neat pincer grasp; uses spoons with messy, enthusiastic determination.',
      milestoneFocus: ['Says first clear word ("mama", "dada", "baba", "hi")', 'Understands simple requests ("Give to Mama")', 'Lowers from standing back to sitting with control'],
      interactionIdea: 'Read picture books together, asking "Where is the doggie?" and watching their little finger point.',
    },
    growthNote: 'They are speaking their first words in the language of love you’ve showered on them since birth.',
    wishPrompt: 'What is a word or phrase you hope they always remember hearing from you?',
  },
  {
    week: 48,
    monthEquivalent: 11.5,
    stageTitle: 'Week 48 · The Independent Stander',
    themeColor: 'from-indigo-100 to-sky-100',
    symbolEmoji: '🧍',
    developmentLeap: 'Balancing unsupported & cause-and-effect toys',
    biologicalWonder: 'Cerebellar coordination enables baby to let go of furniture and balance completely unsupported for several seconds.',
    whatToExpect: {
      sleepAndSoothe: 'Solid nighttime sleep with deep REM phases processing new gross-motor milestones.',
      feedingNotes: 'Enjoys chewing small soft bites of chicken, avocado, pasta, and steamed berries.',
      milestoneFocus: ['Stands unsupported for 5–10 seconds', 'Stacks one block on top of another', 'Imitates daily chores (wiping high chair, brushing hair)'],
      interactionIdea: 'Place a light balloon in the air for baby to bat at while standing balanced.',
    },
    growthNote: 'Their little hands let go, and they stand on their own two feet. A proud, breathtaking glimpse of independence.',
    wishPrompt: 'What adventure do you look forward to embarking on together in their second year?',
  },
  {
    week: 52,
    monthEquivalent: 12,
    stageTitle: 'Week 52 · The First Birthday Wonder',
    themeColor: 'from-amber-100 to-rose-100',
    symbolEmoji: '🎂',
    developmentLeap: 'Leap 8: Programs, first words & first independent steps',
    biologicalWonder: 'Brain volume has doubled since birth; upright balance centers in the cerebellum align for independent bipedal walking.',
    whatToExpect: {
      sleepAndSoothe: 'Usually transitions toward 1 or 2 daytime naps with 11-12 hours of peaceful night rest.',
      feedingNotes: 'Joining the family table for regular meals; transitioning to whole milk or plant alternatives.',
      milestoneFocus: ['Takes courageous first steps', 'Says 1-3 clear words like "mama", "dada", "ball"', 'Waves "bye-bye" and points with index finger'],
      interactionIdea: 'Smash cake celebration and stacking colorful wooden cups into high towers.',
    },
    growthNote: '365 days of unconditional love. One whole orbit around the sun together.',
    wishPrompt: 'A letter to your one-year-old child: words they will treasure for the rest of their life.',
  },
];

export const ALL_BABY_WEEKS: number[] = [
  1, 2, 3, 4, 6, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52
];

/**
 * Helper to get the best matching BabyWeekStage for any week number
 */
export function getBabyWeekStage(targetWeek: number): BabyWeekStage {
  const clamped = Math.max(1, Math.min(52, targetWeek));
  const exact = BABY_WEEK_STAGES.find((s) => s.week === clamped);
  if (exact) return exact;

  return BABY_WEEK_STAGES.reduce((prev, curr) =>
    Math.abs(curr.week - clamped) < Math.abs(prev.week - clamped) ? curr : prev
  );
}

/**
 * Helper to get the best matching FetalWeekStage for any pregnancy week number (4-42)
 */
export function getFetalWeekStage(targetWeek: number): FetalWeekStage {
  const clamped = Math.max(4, Math.min(42, targetWeek));
  const exact = FETAL_STAGES_DATA.find((s) => s.week === clamped);
  if (exact) return exact;

  return FETAL_STAGES_DATA.reduce((prev, curr) =>
    Math.abs(curr.week - clamped) < Math.abs(prev.week - clamped) ? curr : prev
  );
}

export interface StageRecommendationItem {
  title: string;
  desc: string;
  emoji: string;
  tag: string;
}

export interface StageRecommendationsGroup {
  pillar1: StageRecommendationItem;
  pillar2: StageRecommendationItem;
  pillar3: StageRecommendationItem;
  pillar4: StageRecommendationItem;
}

export function getFetalWeekRecommendations(week: number): StageRecommendationsGroup {
  if (week <= 13) {
    return {
      pillar1: {
        title: 'NIPT & First Trimester Scan',
        desc: 'Nuchal translucency (NT) ultrasound & cell-free DNA genetic screening.',
        emoji: '🩺',
        tag: 'Clinical Check',
      },
      pillar2: {
        title: 'Folate & Hydration Baseline',
        desc: '600–800 mcg methylfolate daily + chilled ginger water for mild nausea.',
        emoji: '🥗',
        tag: 'Nutrition',
      },
      pillar3: {
        title: 'First Trimester Fatigue Rest',
        desc: 'Take restorative 20-min afternoon naps as your placenta actively vascularizes.',
        emoji: '🛌',
        tag: 'Maternal Care',
      },
      pillar4: {
        title: 'Early Ultrasound Journal',
        desc: 'Save your first flutter heartbeat printout and write a welcome note.',
        emoji: '✨',
        tag: 'Bonding',
      },
    };
  }

  if (week <= 26) {
    return {
      pillar1: {
        title: 'Level II Anatomy Ultrasound',
        desc: 'Comprehensive check of heart 4 chambers, brain ventricles, kidneys, and spine.',
        emoji: '🩺',
        tag: 'Clinical Check',
      },
      pillar2: {
        title: 'Calcium & Choline Intake',
        desc: '1,000 mg Calcium + 450 mg Choline for fetal skeleton and brain memory centers.',
        emoji: '🥗',
        tag: 'Nutrition',
      },
      pillar3: {
        title: 'Pelvic Floor & Side Sleeping',
        desc: 'Begin sleeping on left side with support pillow; gentle prenatal yoga stretches.',
        emoji: '🧘',
        tag: 'Comfort',
      },
      pillar4: {
        title: 'Voice & Music Recognition',
        desc: 'Baby’s auditory bones are hardened. Talk, hum, or play favorite calm tunes.',
        emoji: '🎵',
        tag: 'Bonding',
      },
    };
  }

  if (week <= 34) {
    return {
      pillar1: {
        title: '1-Hour Glucose Challenge & Tdap',
        desc: 'Screening for gestational diabetes, maternal anemia, and protective Tdap vaccine.',
        emoji: '🩺',
        tag: 'Clinical Check',
      },
      pillar2: {
        title: 'Omega-3 DHA for Brain Growth',
        desc: '300 mg DHA daily supporting explosive synaptic and retinal lipid layer formation.',
        emoji: '🥑',
        tag: 'Nutrition',
      },
      pillar3: {
        title: 'ACOG Kick Counting Routine',
        desc: 'Count 10 distinct kicks in 2 hours during evening rest. Note peak activity rhythm.',
        emoji: '🦶',
        tag: 'Movement Check',
      },
      pillar4: {
        title: 'Birth Preferences & Nursery Prep',
        desc: 'Draft your birth preferences with your care team and assemble baby safe sleep area.',
        emoji: '🍼',
        tag: 'Preparation',
      },
    };
  }

  // 35+ weeks
  return {
    pillar1: {
      title: 'Group B Strep (GBS) Swab',
      desc: 'Routine 36-week culture and clinical confirmation of cephalic (head-down) position.',
      emoji: '🩺',
      tag: 'Clinical Check',
    },
    pillar2: {
      title: 'Dense Energy & Dates Routine',
      desc: 'Frequent smaller protein snacks; 6 deglet noor dates daily shown to soften cervix.',
      emoji: '🍯',
      tag: 'Labor Fuel',
    },
    pillar3: {
      title: 'Perineal Massage & Rest',
      desc: 'Nightly perineal massage with almond oil; keep feet elevated to relieve swelling.',
      emoji: '🛌',
      tag: 'Labor Prep',
    },
    pillar4: {
      title: 'Hospital Bag & Pediatrician Pick',
      desc: 'Pack car seat base, comfortable postpartum clothes, and select baby’s pediatrician.',
      emoji: '🧳',
      tag: 'Final Steps',
    },
  };
}

export function getBabyStageRecommendations(
  weekOrMonth: number,
  isWeek: boolean
): StageRecommendationsGroup {
  const approximateMonth = isWeek ? Math.max(1, Math.floor(weekOrMonth / 4.345)) : weekOrMonth;

  if (approximateMonth <= 2) {
    return {
      pillar1: {
        title: '8–12 Daily Milk Feedings',
        desc: 'Feed on demand (breast or bottle). Watch for hand-to-mouth hunger cues.',
        emoji: '🍼',
        tag: 'Feeding',
      },
      pillar2: {
        title: '60–90 Min Awake Windows',
        desc: 'Watch for drowsy yawns; put down drowsy but awake on a flat, bare crib.',
        emoji: '😴',
        tag: 'Sleep',
      },
      pillar3: {
        title: 'High-Contrast Floor Tummy Time',
        desc: '3–5 mins, 3x daily. Strengthens neck extensors for steady head lifting.',
        emoji: '🧸',
        tag: 'Motor Play',
      },
      pillar4: {
        title: '2-Month Pediatric Well-Check',
        desc: 'First infant immunizations; pediatrician checks fontanelle, hips, and reflexes.',
        emoji: '🩺',
        tag: 'Doctor Visit',
      },
    };
  }

  if (approximateMonth <= 5) {
    return {
      pillar1: {
        title: 'Exclusive Milk + Readiness Watch',
        desc: 'Watch for sitting balance, fading tongue-thrust reflex, and interest in your food.',
        emoji: '🍼',
        tag: 'Feeding',
      },
      pillar2: {
        title: '1.5–2 Hour Awake Windows',
        desc: '3–4 naps. Consistent 4-step sleep ritual (bath, book, lullaby, dark room).',
        emoji: '🌙',
        tag: 'Sleep Routine',
      },
      pillar3: {
        title: 'Rolling Mat & Grasping Play',
        desc: 'Encourage reaching for lightweight rings and rolling tummy-to-back.',
        emoji: '🪇',
        tag: 'Motor Skill',
      },
      pillar4: {
        title: '4-Month Vaccine Checkup',
        desc: 'Weight and head circumference tracking on WHO growth percentiles.',
        emoji: '🩺',
        tag: 'Doctor Visit',
      },
    };
  }

  if (approximateMonth <= 8) {
    return {
      pillar1: {
        title: 'Single-Ingredient Purees & Allergen',
        desc: 'Sweet potato, avocado, oatmeal + early peanut and egg introduction.',
        emoji: '🥑',
        tag: 'First Solids',
      },
      pillar2: {
        title: '2–2.5 Hour Awake Windows',
        desc: 'Consolidating to 2–3 naps; practice falling asleep independently in crib.',
        emoji: '😴',
        tag: 'Sleep Window',
      },
      pillar3: {
        title: 'Unsupported Sitting & Object Play',
        desc: 'Place toys just out of reach; encourage passing toys from left to right hand.',
        emoji: '🧸',
        tag: 'Sensory Play',
      },
      pillar4: {
        title: '6-Month Teething & Oral Health',
        desc: 'Wipe gums with clean damp cloth; introduce small sips of water in an open cup.',
        emoji: '🦷',
        tag: 'Dental & Safety',
      },
    };
  }

  if (approximateMonth <= 11) {
    return {
      pillar1: {
        title: 'Finger Foods & Soft Table Bites',
        desc: 'Soft carrot coins, shredded chicken, banana pieces for thumb pincer grasp.',
        emoji: '🥕',
        tag: 'Self-Feeding',
      },
      pillar2: {
        title: '2.75–3.25 Hour Awake Windows',
        desc: '2 regular naps (morning & afternoon). Night wakings often linked to motor leaps.',
        emoji: '🌙',
        tag: 'Sleep Schedule',
      },
      pillar3: {
        title: 'Cruising & Peek-a-Boo Games',
        desc: 'Create obstacle courses with cushions; practice hide-and-seek with blankets.',
        emoji: '🧩',
        tag: 'Active Floor Play',
      },
      pillar4: {
        title: 'Complete Home Babyproofing',
        desc: 'Anchor tall bookcases, gate stairwells, lock cleaning cabinets, cover cords.',
        emoji: '🛡️',
        tag: 'Babyproofing',
      },
    };
  }

  // 12+ months
  return {
    pillar1: {
      title: 'Family Table Foods & Whole Milk',
      desc: '3 balanced meals + 2 snacks; transition from bottle to open or straw cups.',
      emoji: '🥣',
      tag: 'Toddler Table',
    },
    pillar2: {
      title: '3–4 Hour Awake Windows',
      desc: 'Usually 1–2 naps (11–13 hours total). Maintain calming, predictable bedtime.',
      emoji: '😴',
      tag: 'Sleep Schedule',
    },
    pillar3: {
      title: 'First Independent Steps & Words',
      desc: 'Push toys, sorting shapes, pointing and naming animals in sturdy board books.',
      emoji: '🚶',
      tag: 'First Steps',
    },
    pillar4: {
      title: '1-Year Pediatric & Dental Visit',
      desc: '12-Month well-child checkup, routine vaccinations, and first pediatric dentist.',
      emoji: '🩺',
      tag: 'Milestone Visit',
    },
  };
}


