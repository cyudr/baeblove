export interface RecipeSuggestion {
  id: string;
  title: string;
  emoji: string;
  targetCategory: 'baby' | 'fetal';
  stageBracket: string; // e.g., '6–8 Months', '8–10 Months', '10–12+ Months', 'Trimester 2 & 3'
  prepTime: string;
  cookTime: string;
  texture: string;
  tags: string[];
  ingredients: string[];
  instructions: string[];
  clinicalBenefit: string;
  safetyTip: string;
  storage: string;
}

export const BABY_RECIPES: RecipeSuggestion[] = [
  {
    id: 'baby-rec-1',
    title: 'Velvety Sweet Potato, Pear & Breastmilk Mash',
    emoji: '🍠',
    targetCategory: 'baby',
    stageBracket: '6–8 Months (Stage 1 / Smooth Mash)',
    prepTime: '5 mins',
    cookTime: '12 mins',
    texture: 'Smooth, creamy silk mash',
    tags: ['Digestive Comfort', 'Beta-Carotene', 'Gentle Starter'],
    ingredients: [
      '1/2 medium organic sweet potato, peeled and cubed',
      '1/2 ripe Bartlett or Bosc pear, peeled and cored',
      '2–3 tbsp expressed breastmilk or prepared infant formula',
      '1/4 tsp extra virgin olive oil (healthy fats for brain development)',
    ],
    instructions: [
      'Steam sweet potato cubes for 8 minutes until fork-soft.',
      'Add pear cubes to the steamer basket and steam for an additional 4 minutes.',
      'Transfer warm sweet potato and pear to a blender or small bowl.',
      'Blend with breastmilk/formula and olive oil until smooth and lukewarm before serving.',
    ],
    clinicalBenefit:
      'Sweet potatoes are exceptionally rich in beta-carotene (provitamin A) for retinal and mucosal immunity. Pear provides soluble pectin fiber to prevent constipation.',
    safetyTip: 'Always test temperature on the inside of your wrist before serving.',
    storage: 'Refrigerate in a sealed glass container for up to 48 hours, or freeze in silicone cubes for 2 months.',
  },
  {
    id: 'baby-rec-2',
    title: 'Iron-Power Red Lentil, Squash & Spinach Puree',
    emoji: '🥣',
    targetCategory: 'baby',
    stageBracket: '6–9 Months (Stage 2 / Thicker Mash)',
    prepTime: '10 mins',
    cookTime: '15 mins',
    texture: 'Thick, spoonable soft puree',
    tags: ['High Iron', 'Zinc Boost', 'Plant Protein'],
    ingredients: [
      '3 tbsp split red lentils (rinsed thoroughly)',
      '1/2 cup butternut squash, peeled and diced',
      '1/2 cup fresh baby spinach leaves (chopped)',
      '1 cup low-sodium vegetable or bone broth (or water)',
      '1/2 tsp cold-pressed avocado oil',
      'A drop of fresh lemon juice (Vitamin C to triple iron absorption)',
    ],
    instructions: [
      'Simmer red lentils and butternut squash in broth/water over medium-low heat for 12 minutes until tender.',
      'Stir in spinach during the final 2 minutes until wilted.',
      'Remove from heat, drizzle with avocado oil and a splash of lemon juice.',
      'Blend lightly or fork-mash to leave a gentle, stimulating texture for tongue coordination.',
    ],
    clinicalBenefit:
      'Natural maternal iron stores deplete between 4 and 6 months. Red lentils provide bioavailable non-heme iron and zinc, paired with Vitamin C from squash and lemon to maximize absorption.',
    safetyTip: 'Red lentils cook down softer and cause less gas than whole brown lentils for tender infant bellies.',
    storage: 'Keeps 3 days refrigerated in airtight jars.',
  },
  {
    id: 'baby-rec-3',
    title: 'Wild Salmon, Sweet Pea & Quinoa Soft Flakes',
    emoji: '🐟',
    targetCategory: 'baby',
    stageBracket: '8–11 Months (Stage 3 / Finger Food & Pincer)',
    prepTime: '8 mins',
    cookTime: '10 mins',
    texture: 'Tender flakes & crushable soft peas',
    tags: ['Brain DHA', 'Pincer Practice', 'Omega-3'],
    ingredients: [
      '50g wild Alaskan salmon fillet (skinless, rigorously deboned)',
      '1/4 cup sweet green peas (fresh or thawed frozen)',
      '2 tbsp cooked fluffy quinoa (soft and well-cooked)',
      'Pinch of fresh dill (palate spice awakening)',
    ],
    instructions: [
      'Inspect salmon fillet thoroughly under bright light to verify absence of any pin bones.',
      'Steam salmon and peas together for 8–10 minutes until fish flakes easily with a fork.',
      'Lightly flatten peas between fingers so they cannot roll as a choking hazard.',
      'Gently toss flaked salmon with peas, cooked quinoa, and fresh dill. Place on baby’s highchair tray for self-feeding.',
    ],
    clinicalBenefit:
      'Wild salmon provides abundant DHA & EPA Omega-3 fatty acids required for rapid retinal photoreceptor and cerebral cortex myelin sheath insulation. Flattened peas stimulate the index-thumb pincer grasp.',
    safetyTip: 'Salmon is a common allergen (finfish). Introduce during morning hours and monitor for 2 hours.',
    storage: 'Best served freshly prepared; refrigerate leftovers for up to 24 hours.',
  },
  {
    id: 'baby-rec-4',
    title: 'Cheesy Broccoli & Golden Egg Yolk Steamed Bites',
    emoji: '🥦',
    targetCategory: 'baby',
    stageBracket: '9–12+ Months (Table Foods / Self-Feeding)',
    prepTime: '10 mins',
    cookTime: '12 mins',
    texture: 'Soft, spongy chewable finger strips',
    tags: ['Choline Rich', 'Calcium', 'Table Transition'],
    ingredients: [
      '1 whole pastured egg + 1 additional egg yolk (whisked)',
      '1/4 cup finely chopped steamed broccoli florets',
      '2 tbsp grated pasteurized mild cheddar or parmesan cheese',
      '1 tbsp rolled oat flour or fine baby oatmeal',
    ],
    instructions: [
      'Whisk eggs, steamed chopped broccoli, cheese, and oat flour in a small bowl.',
      'Pour mixture into greased mini silicone muffin molds or a small heat-safe ramekin.',
      'Steam in a covered skillet with 1 inch of water for 10–12 minutes until set and firm to the touch.',
      'Allow to cool, then slice into finger-length batons (approx. 2 inches long) for baby to grasp easily.',
    ],
    clinicalBenefit:
      'Egg yolks are the richest dietary source of choline, vital for hippocampal neurotransmitter synthesis and long-term memory. Broccoli provides calcium, fiber, and Vitamin K.',
    safetyTip: 'Egg is a major allergen; ensure baby has tolerated plain cooked egg before combining.',
    storage: 'Store in an airtight container for up to 4 days, or freeze for 1 month.',
  },
];

export const FETAL_MATERNAL_RECIPES: RecipeSuggestion[] = [
  {
    id: 'fetal-rec-1',
    title: 'Wild Salmon & Quinoa Rainbow Folate Bowl',
    emoji: '🥗',
    targetCategory: 'fetal',
    stageBracket: 'All Trimesters (Crucial 2nd & 3rd Trimester Brain Surge)',
    prepTime: '10 mins',
    cookTime: '15 mins',
    texture: 'Hearty, satisfying warm grain bowl',
    tags: ['DHA Omega-3', 'Folate Rich', 'Lean Protein'],
    ingredients: [
      '120g wild Alaskan sockeye salmon fillet (baked or pan-seared with olive oil)',
      '1/2 cup cooked organic tri-color quinoa',
      '1.5 cups baby spinach or steamed Tuscan kale',
      '1/4 ripe avocado, sliced',
      '2 tbsp steamed shelled edamame',
      'Lemon-tahini dressing: 1 tbsp sesame tahini + 1 tbsp fresh lemon juice + 1 tbsp warm water',
    ],
    instructions: [
      'Season salmon with sea salt, olive oil, and herbs; bake at 400°F (200°C) for 12–14 minutes until center reaches 145°F.',
      'Warm quinoa and arrange over a bed of fresh baby spinach (the warm grains will gently wilt the leaves).',
      'Top with sliced avocado, steamed edamame, and flaked salmon.',
      'Drizzle with rich lemon-tahini dressing (adds calcium and healthy fats).',
    ],
    clinicalBenefit:
      'Provides >450mg DHA Omega-3s to support the exponential growth of fetal cerebral gray matter, alongside 180mcg dietary folate and calcium for embryonic bone mineralization.',
    safetyTip: 'Always ensure seafood is cooked through to an internal temperature of 145°F (63°C).',
    storage: 'Quinoa and dressing can be prepped 3 days in advance.',
  },
  {
    id: 'fetal-rec-2',
    title: 'Iron-Max Golden Lentil, Turmeric & Citrus Stew',
    emoji: '🍋',
    targetCategory: 'fetal',
    stageBracket: 'Trimester 2 & 3 (Combats Maternal Anemia & Fatigue)',
    prepTime: '10 mins',
    cookTime: '20 mins',
    texture: 'Warm, fragrant comforting stew',
    tags: ['Iron Bioavailability', 'Anti-Inflammatory', 'Digestion'],
    ingredients: [
      '1 cup red lentils (rinsed thoroughly)',
      '1 small yellow bell pepper, finely diced',
      '2 cups baby spinach (stirred in at the very end)',
      '1/2 tsp ground turmeric + pinch of black pepper',
      '3 cups vegetable broth or bone broth',
      'Juice of 1 whole fresh lemon',
      '1 tbsp extra virgin olive oil',
    ],
    instructions: [
      'In a medium saucepan, sauté diced yellow pepper in olive oil with turmeric for 3 minutes.',
      'Add red lentils and broth; bring to a gentle boil, then simmer covered for 15 minutes until creamy.',
      'Remove from heat, immediately fold in baby spinach until bright green and tender.',
      'Stir in fresh lemon juice right before serving to preserve heat-sensitive Vitamin C.',
    ],
    clinicalBenefit:
      'Maternal blood volume expands by nearly 50% by week 32. This meal delivers 6.5mg non-heme plant iron. The high Vitamin C from lemon and yellow bell pepper triples iron absorption across the duodenal mucosa.',
    safetyTip: 'Avoid drinking tea or coffee within 1 hour of this meal, as polyphenols inhibit iron uptake.',
    storage: 'Delicious reheated; keeps up to 4 days refrigerated.',
  },
  {
    id: 'fetal-rec-3',
    title: 'Choline-Power Avocado & Poached Pastured Egg Toast',
    emoji: '🥑',
    targetCategory: 'fetal',
    stageBracket: 'Trimester 1, 2 & 3 (Fetal Brain & Neural Maturation)',
    prepTime: '5 mins',
    cookTime: '4 mins',
    texture: 'Crispy sourdough with velvety topping',
    tags: ['Choline 290mg', 'Neural Tube', 'Lutein'],
    ingredients: [
      '2 large pastured eggs (poached or cooked firm)',
      '1 thick slice whole grain sourdough bread (toasted)',
      '1/2 ripe avocado, mashed with a pinch of sea salt and lemon',
      '1 tsp black chia seeds or ground flaxseed (ALA Omega-3s)',
      'Handful of microgreens or arugula',
    ],
    instructions: [
      'Toast sourdough slice until golden and sturdy.',
      'Spread mashed lemon-avocado evenly across toast.',
      'Poach or pan-cook 2 eggs until whites are fully set and yolks are warm and safe.',
      'Layer eggs over avocado, top with microgreens, and dust with chia seeds.',
    ],
    clinicalBenefit:
      'Two egg yolks provide 290mg choline (over 60% of daily pregnancy RDA). Choline works synergistically with folate in DNA methylation, placenta development, and prevention of neural tube defects.',
    safetyTip: 'ACOG recommends consuming eggs with cooked firm yolks during pregnancy to prevent salmonella risk.',
    storage: 'Best enjoyed fresh and warm.',
  },
];
