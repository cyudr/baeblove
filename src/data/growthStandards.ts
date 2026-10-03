/**
 * WHO Child Growth Standards (0 to 36 months)
 * Based on the WHO Multicentre Growth Reference Study (MGRS).
 * Reference percentiles: 3rd, 15th, 50th, 85th, 97th
 */

export interface WHODataPoint {
  month: number;
  p3: number;
  p15: number;
  p50: number;
  p85: number;
  p97: number;
  // LMS parameters for exact z-score calculation
  L: number;
  M: number;
  S: number;
}

export type MetricType = 'weight' | 'length' | 'headCircumference';

// WHO Weight-for-age (kg) - BOYS (0-36 months)
export const WHO_BOYS_WEIGHT: WHODataPoint[] = [
  { month: 0, p3: 2.5, p15: 2.9, p50: 3.3, p85: 3.9, p97: 4.4, L: 0.3487, M: 3.3464, S: 0.14602 },
  { month: 1, p3: 3.4, p15: 3.9, p50: 4.5, p85: 5.1, p97: 5.8, L: -0.0628, M: 4.4697, S: 0.13395 },
  { month: 2, p3: 4.3, p15: 4.9, p50: 5.6, p85: 6.3, p97: 7.1, L: -0.1166, M: 5.5898, S: 0.12595 },
  { month: 3, p3: 5.0, p15: 5.7, p50: 6.4, p85: 7.2, p97: 8.0, L: -0.1585, M: 6.4382, S: 0.11956 },
  { month: 4, p3: 5.6, p15: 6.2, p50: 7.0, p85: 7.8, p97: 8.7, L: -0.1884, M: 7.0270, S: 0.11478 },
  { month: 5, p3: 6.0, p15: 6.7, p50: 7.5, p85: 8.4, p97: 9.3, L: -0.2104, M: 7.5130, S: 0.11119 },
  { month: 6, p3: 6.4, p15: 7.1, p50: 7.9, p85: 8.8, p97: 9.8, L: -0.2269, M: 7.9272, S: 0.10848 },
  { month: 7, p3: 6.7, p15: 7.4, p50: 8.3, p85: 9.2, p97: 10.3, L: -0.2396, M: 8.2917, S: 0.10642 },
  { month: 8, p3: 6.9, p15: 7.7, p50: 8.6, p85: 9.6, p97: 10.7, L: -0.2494, M: 8.6214, S: 0.10486 },
  { month: 9, p3: 7.1, p15: 7.9, p50: 8.9, p85: 9.9, p97: 11.0, L: -0.2570, M: 8.9242, S: 0.10368 },
  { month: 10, p3: 7.4, p15: 8.2, p50: 9.2, p85: 10.2, p97: 11.4, L: -0.2630, M: 9.2064, S: 0.10279 },
  { month: 11, p3: 7.6, p15: 8.4, p50: 9.4, p85: 10.5, p97: 11.7, L: -0.2676, M: 9.4735, S: 0.10214 },
  { month: 12, p3: 7.7, p15: 8.6, p50: 9.6, p85: 10.8, p97: 12.0, L: -0.2713, M: 9.7297, S: 0.10168 },
  { month: 15, p3: 8.3, p15: 9.1, p50: 10.3, p85: 11.5, p97: 12.8, L: -0.2787, M: 10.4578, S: 0.10115 },
  { month: 18, p3: 8.8, p15: 9.7, p50: 10.9, p85: 12.2, p97: 13.7, L: -0.2829, M: 11.1448, S: 0.10166 },
  { month: 21, p3: 9.2, p15: 10.2, p50: 11.5, p85: 12.9, p97: 14.5, L: -0.2852, M: 11.7997, S: 0.10291 },
  { month: 24, p3: 9.7, p15: 10.8, p50: 12.2, p85: 13.6, p97: 15.3, L: -0.2863, M: 12.4332, S: 0.10471 },
  { month: 30, p3: 10.5, p15: 11.8, p50: 13.3, p85: 15.0, p97: 16.9, L: -0.2858, M: 13.6331, S: 0.10912 },
  { month: 36, p3: 11.3, p15: 12.7, p50: 14.3, p85: 16.2, p97: 18.3, L: -0.2831, M: 14.7327, S: 0.11413 },
];

// WHO Weight-for-age (kg) - GIRLS (0-36 months)
export const WHO_GIRLS_WEIGHT: WHODataPoint[] = [
  { month: 0, p3: 2.4, p15: 2.8, p50: 3.2, p85: 3.7, p97: 4.2, L: 0.3809, M: 3.2322, S: 0.14171 },
  { month: 1, p3: 3.2, p15: 3.6, p50: 4.2, p85: 4.8, p97: 5.5, L: -0.0461, M: 4.1873, S: 0.13785 },
  { month: 2, p3: 3.9, p15: 4.5, p50: 5.1, p85: 5.8, p97: 6.6, L: -0.1165, M: 5.1282, S: 0.12933 },
  { month: 3, p3: 4.5, p15: 5.2, p50: 5.8, p85: 6.6, p97: 7.5, L: -0.1601, M: 5.8458, S: 0.12195 },
  { month: 4, p3: 5.0, p15: 5.7, p50: 6.4, p85: 7.3, p97: 8.2, L: -0.1912, M: 6.4237, S: 0.11659 },
  { month: 5, p3: 5.4, p15: 6.1, p50: 6.9, p85: 7.8, p97: 8.8, L: -0.2144, M: 6.9069, S: 0.11269 },
  { month: 6, p3: 5.7, p15: 6.5, p50: 7.3, p85: 8.2, p97: 9.3, L: -0.2319, M: 7.2970, S: 0.10986 },
  { month: 7, p3: 6.0, p15: 6.8, p50: 7.6, p85: 8.6, p97: 9.8, L: -0.2452, M: 7.6432, S: 0.10777 },
  { month: 8, p3: 6.3, p15: 7.0, p50: 7.9, p85: 9.0, p97: 10.2, L: -0.2555, M: 7.9620, S: 0.10620 },
  { month: 9, p3: 6.5, p15: 7.3, p50: 8.2, p85: 9.3, p97: 10.5, L: -0.2633, M: 8.2612, S: 0.10502 },
  { month: 10, p3: 6.7, p15: 7.5, p50: 8.5, p85: 9.6, p97: 10.9, L: -0.2693, M: 8.5447, S: 0.10414 },
  { month: 11, p3: 6.9, p15: 7.7, p50: 8.7, p85: 9.9, p97: 11.2, L: -0.2737, M: 8.8149, S: 0.10350 },
  { month: 12, p3: 7.0, p15: 7.9, p50: 8.9, p85: 10.1, p97: 11.5, L: -0.2768, M: 9.0734, S: 0.10306 },
  { month: 15, p3: 7.6, p15: 8.5, p50: 9.6, p85: 10.9, p97: 12.4, L: -0.2810, M: 9.8055, S: 0.10271 },
  { month: 18, p3: 8.1, p15: 9.1, p50: 10.2, p85: 11.6, p97: 13.2, L: -0.2809, M: 10.4851, S: 0.10375 },
  { month: 21, p3: 8.6, p15: 9.6, p50: 10.9, p85: 12.4, p97: 14.0, L: -0.2783, M: 11.1345, S: 0.10578 },
  { month: 24, p3: 9.0, p15: 10.2, p50: 11.5, p85: 13.1, p97: 14.8, L: -0.2741, M: 11.7658, S: 0.10854 },
  { month: 30, p3: 10.0, p15: 11.2, p50: 12.7, p85: 14.4, p97: 16.4, L: -0.2625, M: 12.9814, S: 0.11477 },
  { month: 36, p3: 10.8, p15: 12.2, p50: 13.9, p85: 15.8, p97: 18.1, L: -0.2482, M: 14.1246, S: 0.12159 },
];

// WHO Length-for-age (cm) - BOYS (0-36 months)
export const WHO_BOYS_LENGTH: WHODataPoint[] = [
  { month: 0, p3: 46.3, p15: 48.0, p50: 49.9, p85: 51.8, p97: 53.4, L: 1, M: 49.8842, S: 0.03795 },
  { month: 1, p3: 51.1, p15: 52.8, p50: 54.7, p85: 56.7, p97: 58.4, L: 1, M: 54.7244, S: 0.03562 },
  { month: 2, p3: 54.7, p15: 56.4, p50: 58.4, p85: 60.4, p97: 62.2, L: 1, M: 58.4249, S: 0.03473 },
  { month: 3, p3: 57.6, p15: 59.4, p50: 61.4, p85: 63.5, p97: 65.3, L: 1, M: 61.4450, S: 0.03417 },
  { month: 4, p3: 60.0, p15: 61.8, p50: 63.9, p85: 66.0, p97: 67.8, L: 1, M: 63.8860, S: 0.03387 },
  { month: 5, p3: 61.9, p15: 63.8, p50: 65.9, p85: 68.0, p97: 69.9, L: 1, M: 65.9026, S: 0.03373 },
  { month: 6, p3: 63.6, p15: 65.5, p50: 67.6, p85: 69.8, p97: 71.6, L: 1, M: 67.6236, S: 0.03371 },
  { month: 7, p3: 65.1, p15: 67.0, p50: 69.2, p85: 71.3, p97: 73.2, L: 1, M: 69.1601, S: 0.03377 },
  { month: 8, p3: 66.5, p15: 68.4, p50: 70.6, p85: 72.8, p97: 74.7, L: 1, M: 70.5704, S: 0.03389 },
  { month: 9, p3: 67.7, p15: 69.7, p50: 72.0, p85: 74.2, p97: 76.2, L: 1, M: 71.9744, S: 0.03407 },
  { month: 10, p3: 69.0, p15: 71.0, p50: 73.3, p85: 75.6, p97: 77.6, L: 1, M: 73.3005, S: 0.03429 },
  { month: 11, p3: 70.2, p15: 72.2, p50: 74.5, p85: 76.9, p97: 78.9, L: 1, M: 74.5458, S: 0.03454 },
  { month: 12, p3: 71.3, p15: 73.4, p50: 75.7, p85: 78.1, p97: 80.2, L: 1, M: 75.7485, S: 0.03481 },
  { month: 15, p3: 74.4, p15: 76.6, p50: 79.1, p85: 81.7, p97: 83.9, L: 1, M: 79.1309, S: 0.03572 },
  { month: 18, p3: 77.2, p15: 79.6, p50: 82.3, p85: 85.0, p97: 87.3, L: 1, M: 82.3168, S: 0.03666 },
  { month: 21, p3: 79.9, p15: 82.3, p50: 85.1, p85: 88.0, p97: 90.4, L: 1, M: 85.1275, S: 0.03758 },
  { month: 24, p3: 82.5, p15: 85.0, p50: 87.8, p85: 90.9, p97: 93.3, L: 1, M: 87.8188, S: 0.03844 },
  { month: 30, p3: 87.0, p15: 89.8, p50: 92.8, p85: 96.0, p97: 98.7, L: 1, M: 92.8123, S: 0.03998 },
  { month: 36, p3: 91.2, p15: 94.1, p50: 97.3, p85: 100.8, p97: 103.6, L: 1, M: 97.3338, S: 0.04130 },
];

// WHO Length-for-age (cm) - GIRLS (0-36 months)
export const WHO_GIRLS_LENGTH: WHODataPoint[] = [
  { month: 0, p3: 45.6, p15: 47.3, p50: 49.1, p85: 51.0, p97: 52.7, L: 1, M: 49.1477, S: 0.03790 },
  { month: 1, p3: 50.0, p15: 51.7, p50: 53.7, p85: 55.6, p97: 57.4, L: 1, M: 53.6872, S: 0.03612 },
  { month: 2, p3: 53.2, p15: 55.0, p50: 57.1, p85: 59.1, p97: 60.9, L: 1, M: 57.0673, S: 0.03531 },
  { month: 3, p3: 55.8, p15: 57.7, p50: 59.8, p85: 61.9, p97: 63.8, L: 1, M: 59.8029, S: 0.03487 },
  { month: 4, p3: 58.0, p15: 60.0, p50: 62.1, p85: 64.3, p97: 66.2, L: 1, M: 62.0899, S: 0.03468 },
  { month: 5, p3: 59.9, p15: 61.9, p50: 64.0, p85: 66.2, p97: 68.2, L: 1, M: 64.0497, S: 0.03463 },
  { month: 6, p3: 61.5, p15: 63.5, p50: 65.7, p85: 68.0, p97: 70.0, L: 1, M: 65.7311, S: 0.03468 },
  { month: 7, p3: 62.9, p15: 65.0, p50: 67.3, p85: 69.6, p97: 71.6, L: 1, M: 67.3197, S: 0.03480 },
  { month: 8, p3: 64.3, p15: 66.4, p50: 68.7, p85: 71.1, p97: 73.1, L: 1, M: 68.7498, S: 0.03498 },
  { month: 9, p3: 65.6, p15: 67.7, p50: 70.1, p85: 72.6, p97: 74.7, L: 1, M: 70.1444, S: 0.03520 },
  { month: 10, p3: 66.8, p15: 69.0, p50: 71.5, p85: 74.0, p97: 76.1, L: 1, M: 71.4984, S: 0.03546 },
  { month: 11, p3: 68.0, p15: 70.3, p50: 72.8, p85: 75.3, p97: 77.5, L: 1, M: 72.8123, S: 0.03575 },
  { month: 12, p3: 69.2, p15: 71.4, p50: 74.0, p85: 76.6, p97: 78.9, L: 1, M: 74.0152, S: 0.03606 },
  { month: 15, p3: 72.4, p15: 74.8, p50: 77.5, p85: 80.2, p97: 82.6, L: 1, M: 77.4912, S: 0.03704 },
  { month: 18, p3: 75.3, p15: 77.8, p50: 80.7, p85: 83.6, p97: 86.1, L: 1, M: 80.7095, S: 0.03803 },
  { month: 21, p3: 78.1, p15: 80.7, p50: 83.7, p85: 86.7, p97: 89.4, L: 1, M: 83.6841, S: 0.03901 },
  { month: 24, p3: 80.8, p15: 83.5, p50: 86.6, p85: 89.6, p97: 92.4, L: 1, M: 86.4485, S: 0.03995 },
  { month: 30, p3: 85.5, p15: 88.4, p50: 91.8, p85: 95.1, p97: 98.1, L: 1, M: 91.7589, S: 0.04169 },
  { month: 36, p3: 89.8, p15: 92.8, p50: 96.3, p85: 100.0, p97: 103.1, L: 1, M: 96.3458, S: 0.04323 },
];

// WHO Head Circumference-for-age (cm) - BOYS (0-36 months)
export const WHO_BOYS_HC: WHODataPoint[] = [
  { month: 0, p3: 32.1, p15: 33.3, p50: 34.5, p85: 35.7, p97: 36.9, L: 1, M: 34.4604, S: 0.03603 },
  { month: 2, p3: 36.9, p15: 38.0, p50: 39.1, p85: 40.3, p97: 41.3, L: 1, M: 39.0967, S: 0.03261 },
  { month: 4, p3: 39.7, p15: 40.7, p50: 41.8, p85: 43.0, p97: 44.0, L: 1, M: 41.8480, S: 0.03063 },
  { month: 6, p3: 41.5, p15: 42.4, p50: 43.6, p85: 44.8, p97: 45.8, L: 1, M: 43.5939, S: 0.02980 },
  { month: 9, p3: 43.2, p15: 44.2, p50: 45.3, p85: 46.5, p97: 47.5, L: 1, M: 45.3355, S: 0.02934 },
  { month: 12, p3: 44.2, p15: 45.2, p50: 46.4, p85: 47.6, p97: 48.6, L: 1, M: 46.3986, S: 0.02925 },
  { month: 18, p3: 45.5, p15: 46.6, p50: 47.8, p85: 49.0, p97: 50.1, L: 1, M: 47.7816, S: 0.02929 },
  { month: 24, p3: 46.4, p15: 47.5, p50: 48.7, p85: 50.0, p97: 51.1, L: 1, M: 48.7360, S: 0.02941 },
  { month: 36, p3: 47.5, p15: 48.7, p50: 50.0, p85: 51.3, p97: 52.4, L: 1, M: 49.9749, S: 0.02980 },
];

// WHO Head Circumference-for-age (cm) - GIRLS (0-36 months)
export const WHO_GIRLS_HC: WHODataPoint[] = [
  { month: 0, p3: 31.5, p15: 32.7, p50: 33.9, p85: 35.1, p97: 36.2, L: 1, M: 33.8827, S: 0.03576 },
  { month: 2, p3: 35.8, p15: 36.9, p50: 38.0, p85: 39.2, p97: 40.3, L: 1, M: 38.0122, S: 0.03290 },
  { month: 4, p3: 38.5, p15: 39.6, p50: 40.7, p85: 41.8, p97: 42.9, L: 1, M: 40.6974, S: 0.03108 },
  { month: 6, p3: 40.3, p15: 41.3, p50: 42.5, p85: 43.6, p97: 44.8, L: 1, M: 42.4578, S: 0.03028 },
  { month: 9, p3: 41.9, p15: 43.0, p50: 44.1, p85: 45.3, p97: 46.4, L: 1, M: 44.1481, S: 0.02987 },
  { month: 12, p3: 43.0, p15: 44.0, p50: 45.2, p85: 46.4, p97: 47.6, L: 1, M: 45.2155, S: 0.02978 },
  { month: 18, p3: 44.3, p15: 45.4, p50: 46.6, p85: 47.8, p97: 49.0, L: 1, M: 46.6025, S: 0.02979 },
  { month: 24, p3: 45.2, p15: 46.3, p50: 47.6, p85: 48.9, p97: 50.1, L: 1, M: 47.6186, S: 0.02990 },
  { month: 36, p3: 46.5, p15: 47.6, p50: 48.9, p85: 50.2, p97: 51.5, L: 1, M: 48.9169, S: 0.03026 },
];

/**
 * Standard normal cumulative distribution function (approximation)
 */
function normalCDF(x: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989423 * Math.exp((-x * x) / 2);
  const prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return x > 0 ? 1 - prob : prob;
}

/**
 * Calculate Z-score using WHO LMS parameters:
 * If L !== 0: Z = ((value / M)^L - 1) / (L * S)
 * If L === 0: Z = ln(value / M) / S
 */
export function calculateZScore(value: number, L: number, M: number, S: number): number {
  if (Math.abs(L) < 0.001) {
    return Math.log(value / M) / S;
  }
  return (Math.pow(value / M, L) - 1) / (L * S);
}

/**
 * Get WHO curve array for metric and gender
 */
export function getWHOCurve(metric: MetricType, gender: 'boy' | 'girl' | 'undisclosed'): WHODataPoint[] {
  const isGirl = gender === 'girl';
  switch (metric) {
    case 'weight':
      return isGirl ? WHO_GIRLS_WEIGHT : WHO_BOYS_WEIGHT;
    case 'length':
      return isGirl ? WHO_GIRLS_LENGTH : WHO_BOYS_LENGTH;
    case 'headCircumference':
      return isGirl ? WHO_GIRLS_HC : WHO_BOYS_HC;
  }
}

/**
 * Given age in months, find interpolated LMS and percentiles
 */
export function getInterpolatedWHOPoint(
  ageMonths: number,
  metric: MetricType,
  gender: 'boy' | 'girl' | 'undisclosed'
): WHODataPoint {
  const curve = getWHOCurve(metric, gender);
  if (ageMonths <= curve[0].month) return curve[0];
  if (ageMonths >= curve[curve.length - 1].month) return curve[curve.length - 1];

  let prev = curve[0];
  let next = curve[1];
  for (let i = 0; i < curve.length - 1; i++) {
    if (ageMonths >= curve[i].month && ageMonths <= curve[i + 1].month) {
      prev = curve[i];
      next = curve[i + 1];
      break;
    }
  }

  const factor = (ageMonths - prev.month) / (next.month - prev.month);
  const lerp = (a: number, b: number) => a + (b - a) * factor;

  return {
    month: ageMonths,
    p3: lerp(prev.p3, next.p3),
    p15: lerp(prev.p15, next.p15),
    p50: lerp(prev.p50, next.p50),
    p85: lerp(prev.p85, next.p85),
    p97: lerp(prev.p97, next.p97),
    L: lerp(prev.L, next.L),
    M: lerp(prev.M, next.M),
    S: lerp(prev.S, next.S),
  };
}

/**
 * Calculate percentile (0 to 100) for a given measurement
 */
export function calculatePercentile(
  value: number,
  ageMonths: number,
  metric: MetricType,
  gender: 'boy' | 'girl' | 'undisclosed'
): { percentile: number; zScore: number; p50: number } {
  const point = getInterpolatedWHOPoint(ageMonths, metric, gender);
  const zScore = calculateZScore(value, point.L, point.M, point.S);
  const cdf = normalCDF(zScore);
  const percentile = Math.min(99.9, Math.max(0.1, Math.round(cdf * 1000) / 10));

  return {
    percentile,
    zScore: Math.round(zScore * 100) / 100,
    p50: Math.round(point.p50 * 10) / 10,
  };
}

// Unit conversion helpers
export const UnitConverter = {
  kgToLbs: (kg: number): number => kg * 2.20462,
  lbsToKg: (lbs: number): number => lbs / 2.20462,
  cmToInches: (cm: number): number => cm / 2.54,
  inchesToCm: (inches: number): number => inches * 2.54,
  gramsToOz: (g: number): number => g * 0.035274,
  ozToGrams: (oz: number): number => oz / 0.035274,
  gramsToLbsOz: (g: number): { lbs: number; oz: number } => {
    const totalOz = g * 0.035274;
    const lbs = Math.floor(totalOz / 16);
    const oz = Math.round(totalOz % 16);
    return { lbs, oz };
  },
  formatWeight: (kg: number, system: 'metric' | 'imperial'): string => {
    if (system === 'metric') {
      return `${kg.toFixed(2)} kg`;
    }
    const totalLbs = kg * 2.20462;
    const lbs = Math.floor(totalLbs);
    const oz = Math.round((totalLbs - lbs) * 16);
    return `${lbs} lb ${oz} oz`;
  },
  formatLength: (cm: number, system: 'metric' | 'imperial'): string => {
    if (system === 'metric') {
      return `${cm.toFixed(1)} cm`;
    }
    const inches = cm / 2.54;
    return `${inches.toFixed(1)} in`;
  },
  formatFetalWeight: (grams: number, system: 'metric' | 'imperial'): string => {
    if (system === 'metric') {
      if (grams >= 1000) {
        return `${(grams / 1000).toFixed(2)} kg (${grams} g)`;
      }
      return `${Math.round(grams)} g`;
    }
    const totalOz = grams * 0.035274;
    const lbs = Math.floor(totalOz / 16);
    const oz = Math.round(totalOz % 16);
    if (lbs > 0) {
      return `${lbs} lb ${oz} oz`;
    }
    return `${Math.round(totalOz)} oz`;
  },
};
