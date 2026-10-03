import React, { useState, useMemo } from 'react';
import {
  MetricType,
  WHODataPoint,
  getWHOCurve,
  calculatePercentile,
  UnitConverter,
} from '../../data/growthStandards';
import { BabyMeasurement, ChildProfile, UnitSystem } from '../../types';
import { Info, TrendingUp, Sliders, BookOpen, Calendar } from 'lucide-react';

interface InteractiveGrowthChartProps {
  profile: ChildProfile;
  measurements: BabyMeasurement[];
  unitSystem: UnitSystem;
  onOpenFormulaModal?: () => void;
}

export const InteractiveGrowthChart: React.FC<InteractiveGrowthChartProps> = ({
  profile,
  measurements,
  unitSystem,
  onOpenFormulaModal,
}) => {
  const [metric, setMetric] = useState<MetricType>('weight');
  const [maxAgeBracket, setMaxAgeBracket] = useState<number>(36); // 12, 24, 36
  const [timeScale, setTimeScale] = useState<'months' | 'weeks'>('months');
  const [showBands, setShowBands] = useState<boolean>(true);
  const [hoveredPoint, setHoveredPoint] = useState<{
    age: number;
    value: number;
    percentile: number;
    zScore: number;
    date: string;
    notes?: string;
    x: number;
    y: number;
  } | null>(null);

  // Interactive scrubber state for mouse/touch tracking across the entire curve
  const [scrubberState, setScrubberState] = useState<{
    month: number;
    svgX: number;
    p3: number;
    p15: number;
    p50: number;
    p85: number;
    p97: number;
    nearestMeasurement?: {
      ageInMonths: number;
      val: number;
      percentile: number;
      zScore: number;
      date: string;
      notes?: string;
      x: number;
      y: number;
    };
  } | null>(null);

  const rawCurve = useMemo(() => {
    return getWHOCurve(metric, profile.gender);
  }, [metric, profile.gender]);

  // Filter curve up to maxAgeBracket
  const curve = useMemo(() => {
    return rawCurve.filter((pt) => pt.month <= maxAgeBracket);
  }, [rawCurve, maxAgeBracket]);

  // SVG dimensions & coordinate scales
  const width = 800;
  const height = 450;
  const padding = { top: 35, right: 35, bottom: 45, left: 55 };

  // Calculate value ranges (Y axis)
  const yMin = useMemo(() => {
    const minP3 = Math.min(...curve.map((d) => d.p3));
    return Math.max(0, Math.floor(minP3 * 0.85));
  }, [curve]);

  const yMax = useMemo(() => {
    const maxP97 = Math.max(...curve.map((d) => d.p97));
    // Check if any measurements exceed max
    const maxLogged = measurements.reduce((max, m) => {
      const val =
        metric === 'weight'
          ? m.weightKg
          : metric === 'length'
          ? m.lengthCm
          : m.headCircumferenceCm;
      return val ? Math.max(max, val) : max;
    }, 0);
    return Math.ceil(Math.max(maxP97, maxLogged) * 1.08);
  }, [curve, measurements, metric]);

  const scaleX = (month: number) => {
    const usableW = width - padding.left - padding.right;
    return padding.left + (month / maxAgeBracket) * usableW;
  };

  const scaleY = (val: number) => {
    const usableH = height - padding.top - padding.bottom;
    const norm = (val - yMin) / (yMax - yMin);
    return height - padding.bottom - norm * usableH;
  };

  // Convert for imperial display if needed
  const displayValue = (metricVal: number) => {
    if (metric === 'weight') {
      return UnitConverter.formatWeight(metricVal, unitSystem);
    }
    return UnitConverter.formatLength(metricVal, unitSystem);
  };

  // Build SVG path strings for percentile curves
  const makePath = (key: keyof WHODataPoint) => {
    return curve
      .map((pt, i) => {
        const x = scaleX(pt.month);
        const y = scaleY(pt[key] as number);
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');
  };

  // Build area band between two percentile lines (e.g. p3 to p97)
  const makeAreaBand = (keyLow: keyof WHODataPoint, keyHigh: keyof WHODataPoint) => {
    const topPoints = curve.map((pt) => `${scaleX(pt.month).toFixed(1)},${scaleY(pt[keyHigh] as number).toFixed(1)}`);
    const bottomPoints = [...curve]
      .reverse()
      .map((pt) => `${scaleX(pt.month).toFixed(1)},${scaleY(pt[keyLow] as number).toFixed(1)}`);
    return `M ${topPoints.join(' L ')} L ${bottomPoints.join(' L ')} Z`;
  };

  // Filter user measurements
  const validMeasurements = useMemo(() => {
    return measurements
      .filter((m) => {
        if (m.ageInMonths > maxAgeBracket) return false;
        if (metric === 'weight') return m.weightKg !== undefined;
        if (metric === 'length') return m.lengthCm !== undefined;
        if (metric === 'headCircumference') return m.headCircumferenceCm !== undefined;
        return false;
      })
      .map((m) => {
        const rawVal =
          metric === 'weight'
            ? m.weightKg!
            : metric === 'length'
            ? m.lengthCm!
            : m.headCircumferenceCm!;
        const { percentile, zScore } = calculatePercentile(
          rawVal,
          m.ageInMonths,
          metric,
          profile.gender
        );
        return {
          ...m,
          val: rawVal,
          percentile,
          zScore,
          x: scaleX(m.ageInMonths),
          y: scaleY(rawVal),
        };
      });
  }, [measurements, maxAgeBracket, metric, profile.gender, scaleX, scaleY]);

  // Connect user measurement points with a line
  const userPath = useMemo(() => {
    if (validMeasurements.length < 2) return '';
    return validMeasurements
      .map((m, i) => `${i === 0 ? 'M' : 'L'} ${m.x.toFixed(1)} ${m.y.toFixed(1)}`)
      .join(' ');
  }, [validMeasurements]);

  // Latest measurement stats
  const latest = validMeasurements[validMeasurements.length - 1];

  // Grid tick marks
  const xTicks = useMemo(() => {
    if (timeScale === 'weeks') {
      if (maxAgeBracket === 12) return [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52];
      if (maxAgeBracket === 24) return [0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104];
      return [0, 12, 24, 36, 48, 60, 72, 84, 96, 108, 120, 132, 144, 156];
    }
    if (maxAgeBracket === 12) return [0, 2, 4, 6, 8, 10, 12];
    if (maxAgeBracket === 24) return [0, 3, 6, 9, 12, 18, 24];
    return [0, 3, 6, 9, 12, 18, 24, 30, 36];
  }, [maxAgeBracket, timeScale]);

  const yTicks = useMemo(() => {
    const count = 5;
    const step = (yMax - yMin) / count;
    const ticks = [];
    for (let i = 0; i <= count; i++) {
      ticks.push(yMin + step * i);
    }
    return ticks;
  }, [yMin, yMax]);

  const updateScrubberBySvgX = (svgX: number) => {
    const usableW = width - padding.left - padding.right;
    if (svgX < padding.left || svgX > width - padding.right) {
      setScrubberState(null);
      return;
    }
    const ratio = (svgX - padding.left) / usableW;
    const scrubbedMonth = Math.max(0, Math.min(maxAgeBracket, Math.round(ratio * maxAgeBracket)));
    const curvePt = curve.find((c) => c.month === scrubbedMonth) || curve[curve.length - 1];
    
    // Find closest measurement within 0.8 months
    const nearest = validMeasurements.find(
      (m) => Math.abs(m.ageInMonths - scrubbedMonth) <= 0.8
    );

    setScrubberState({
      month: scrubbedMonth,
      svgX: scaleX(scrubbedMonth),
      p3: curvePt.p3,
      p15: curvePt.p15,
      p50: curvePt.p50,
      p85: curvePt.p85,
      p97: curvePt.p97,
      nearestMeasurement: nearest,
    });
  };

  const handleSvgMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const svgX = (clientX / rect.width) * width;
    updateScrubberBySvgX(svgX);
  };

  const handleSvgTouchMove = (e: React.TouchEvent<SVGSVGElement>) => {
    if (e.touches.length === 0) return;
    const touch = e.touches[0];
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const clientX = touch.clientX - rect.left;
    const svgX = (clientX / rect.width) * width;
    updateScrubberBySvgX(svgX);
  };

  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl md:rounded-3xl border border-stone-200 dark:border-stone-800 p-4 md:p-6 shadow-xs transition-colors">
      {/* Header controls & segmented buttons */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-stone-100 dark:border-stone-800">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-bold text-stone-900 dark:text-white">
              WHO Growth Standards & Percentiles
            </h3>
            <span className="text-xs text-stone-500 dark:text-stone-400">
              {profile.gender === 'boy' ? 'Boys' : 'Girls'} · 0–{maxAgeBracket}m
            </span>
            {onOpenFormulaModal ? (
              <button
                onClick={onOpenFormulaModal}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950/80 dark:hover:bg-emerald-900 text-emerald-900 dark:text-emerald-300 text-[11px] font-semibold border border-emerald-200/60 dark:border-emerald-800/60 transition-colors"
                title="View mathematical LMS formula and peer-reviewed sources"
              >
                <BookOpen className="w-3 h-3 text-emerald-700 dark:text-emerald-400" />
                <span>WHO LMS Standard (2006)</span>
              </button>
            ) : (
              <span className="text-xs text-emerald-900 dark:text-emerald-300 font-semibold bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded-lg border border-emerald-200/60 dark:border-emerald-800/60">
                WHO LMS Standard
              </span>
            )}
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Compare measurements against World Health Organization Multicentre child growth references.
          </p>
        </div>

        {/* Metric Segmented Control & Time Scale */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Time scale toggle: Months vs Weeks */}
          <div className="inline-flex p-0.5 bg-stone-100 dark:bg-stone-800 rounded-xl border border-stone-200/60 dark:border-stone-700/60">
            <button
              onClick={() => setTimeScale('months')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                timeScale === 'months'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-2xs font-bold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              Months
            </button>
            <button
              onClick={() => setTimeScale('weeks')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 ${
                timeScale === 'weeks'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-2xs font-bold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <Calendar className="w-3 h-3" />
              <span>Weeks</span>
            </button>
          </div>

          <div className="inline-flex p-1 bg-stone-100 dark:bg-stone-800 rounded-xl border border-stone-200/60 dark:border-stone-700/60">
            <button
              onClick={() => setMetric('weight')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                metric === 'weight'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-2xs font-bold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              Weight
            </button>
            <button
              onClick={() => setMetric('length')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                metric === 'length'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-2xs font-bold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              Length / Height
            </button>
            <button
              onClick={() => setMetric('headCircumference')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                metric === 'headCircumference'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-2xs font-bold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              Head Circ.
            </button>
          </div>

          {/* Age range filter */}
          <div className="inline-flex p-1 bg-stone-100 dark:bg-stone-800 rounded-xl border border-stone-200/60 dark:border-stone-700/60">
            <button
              onClick={() => setMaxAgeBracket(12)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                maxAgeBracket === 12
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-2xs font-bold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              1 Year
            </button>
            <button
              onClick={() => setMaxAgeBracket(24)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                maxAgeBracket === 24
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-2xs font-bold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              2 Years
            </button>
            <button
              onClick={() => setMaxAgeBracket(36)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                maxAgeBracket === 36
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-2xs font-bold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              3 Years
            </button>
          </div>

          {/* Toggle percentile bands */}
          <button
            onClick={() => setShowBands(!showBands)}
            title="Toggle percentile zones"
            className={`p-1.5 text-xs rounded-xl border flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs ${
              showBands
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 font-semibold'
                : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-700 text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Bands</span>
          </button>
        </div>
      </div>

      {/* Dynamic Scrubber / Latest measurement summary strip */}
      {scrubberState ? (
        <div className="mt-3 py-2 px-3 bg-emerald-50/80 dark:bg-emerald-950/40 rounded-xl flex flex-wrap items-center justify-between text-xs text-stone-800 dark:text-stone-200 gap-2 border border-emerald-300 dark:border-emerald-800 animate-in fade-in duration-150">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-emerald-950 dark:text-emerald-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Scrubbing Age: {timeScale === 'weeks' ? `Week ${Math.round(scrubberState.month * 4.345)}` : `Month ${scrubberState.month}`}
            </span>
            <span aria-hidden="true" className="text-stone-300 dark:text-stone-600">|</span>
            <span>WHO 50th (Median): <strong>{displayValue(scrubberState.p50)}</strong></span>
            <span aria-hidden="true" className="text-stone-300 dark:text-stone-600">|</span>
            <span className="text-stone-600 dark:text-stone-400">
              Expected Band: {displayValue(scrubberState.p3)} – {displayValue(scrubberState.p97)}
            </span>
          </div>
          {scrubberState.nearestMeasurement ? (
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white font-bold text-[10px]">
                Logged: {displayValue(scrubberState.nearestMeasurement.val)} ({scrubberState.nearestMeasurement.percentile}th %)
              </span>
              <span className="text-[11px] text-stone-500 dark:text-stone-400">
                {scrubberState.nearestMeasurement.date}
              </span>
            </div>
          ) : (
            <span className="text-[10px] text-stone-400 italic">
              Move cursor or drag along curve to inspect WHO percentiles
            </span>
          )}
        </div>
      ) : latest ? (
        <div className="mt-3 py-2.5 px-3.5 bg-stone-50 dark:bg-stone-800/60 rounded-xl flex flex-wrap items-center justify-between text-xs text-stone-700 dark:text-stone-300 gap-2 border border-stone-200/60 dark:border-stone-700/60 transition-colors">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-stone-900 dark:text-white">Latest Recorded:</span>
            <span className="font-mono font-bold text-stone-900 dark:text-white">{displayValue(latest.val)}</span>
            <span aria-hidden="true" className="text-stone-300 dark:text-stone-600">·</span>
            <span>Age: {latest.ageInMonths} mo</span>
            <span aria-hidden="true" className="text-stone-300 dark:text-stone-600">·</span>
            <span>Date: {latest.date}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 font-bold text-emerald-800 dark:text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5" />
              {latest.percentile}th Percentile
            </span>
            <span className="text-stone-500 dark:text-stone-400 font-mono">Z-score: {latest.zScore > 0 ? `+${latest.zScore}` : latest.zScore}</span>
          </div>
        </div>
      ) : null}

      {/* SVG Interactive Canvas */}
      <div className="relative mt-4 w-full overflow-hidden select-none">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto cursor-crosshair"
          style={{ maxHeight: '420px' }}
          onMouseMove={handleSvgMouseMove}
          onMouseLeave={() => setScrubberState(null)}
          onTouchMove={handleSvgTouchMove}
          onTouchEnd={() => setScrubberState(null)}
        >
          <defs>
            {/* Soft gradient for 15th-85th percentile band */}
            <linearGradient id="bandInnerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#dcfce7" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#dcfce7" stopOpacity="0.35" />
            </linearGradient>
            {/* Softer outer gradient for 3rd-97th */}
            <linearGradient id="bandOuterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f4f4f5" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#f4f4f5" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Background Grid Lines */}
          {yTicks.map((tickVal, i) => {
            const y = scaleY(tickVal);
            return (
              <g key={`y-${i}`}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="#e7e5e4"
                  strokeDasharray="3 3"
                  strokeWidth="1"
                />
                <text
                  x={padding.left - 8}
                  y={y + 3.5}
                  textAnchor="end"
                  className="text-[10px] fill-stone-400 font-sans"
                >
                  {metric === 'weight'
                    ? unitSystem === 'imperial'
                      ? `${(tickVal * 2.20462).toFixed(0)} lb`
                      : `${tickVal.toFixed(1)} kg`
                    : unitSystem === 'imperial'
                    ? `${(tickVal / 2.54).toFixed(0)} in`
                    : `${tickVal.toFixed(0)} cm`}
                </text>
              </g>
            );
          })}

          {xTicks.map((val) => {
            const monthVal = timeScale === 'weeks' ? val / 4.345 : val;
            const x = scaleX(monthVal);
            return (
              <g key={`x-${val}`}>
                <line
                  x1={x}
                  y1={padding.top}
                  x2={x}
                  y2={height - padding.bottom}
                  stroke="#f5f5f4"
                  strokeWidth="1"
                />
                <text
                  x={x}
                  y={height - padding.bottom + 18}
                  textAnchor="middle"
                  className="text-[10px] fill-stone-500 font-sans"
                >
                  {timeScale === 'weeks' ? `W${val}` : `${val}m`}
                </text>
              </g>
            );
          })}

          {/* Percentile Bands (3rd-97th and 15th-85th) */}
          {showBands && (
            <>
              {/* Outer 3rd-97th band */}
              <path
                d={makeAreaBand('p3', 'p97')}
                fill="url(#bandOuterGrad)"
                opacity="0.8"
              />
              {/* Inner 15th-85th band */}
              <path
                d={makeAreaBand('p15', 'p85')}
                fill="url(#bandInnerGrad)"
              />

              {/* Individual percentile curve boundary lines */}
              <path
                d={makePath('p97')}
                fill="none"
                stroke="#a8a29e"
                strokeWidth="1"
                strokeDasharray="2 3"
              />
              <path
                d={makePath('p85')}
                fill="none"
                stroke="#86efac"
                strokeWidth="1"
              />
              <path
                d={makePath('p50')}
                fill="none"
                stroke="#15803d"
                strokeWidth="2"
              />
              <path
                d={makePath('p15')}
                fill="none"
                stroke="#86efac"
                strokeWidth="1"
              />
              <path
                d={makePath('p3')}
                fill="none"
                stroke="#a8a29e"
                strokeWidth="1"
                strokeDasharray="2 3"
              />

              {/* End of curve labels (97th, 50th, 3rd) */}
              <text
                x={width - padding.right + 4}
                y={scaleY(curve[curve.length - 1].p97) + 3}
                className="text-[9px] fill-stone-400 font-sans font-medium"
              >
                97th
              </text>
              <text
                x={width - padding.right + 4}
                y={scaleY(curve[curve.length - 1].p50) + 3}
                className="text-[9px] fill-emerald-800 font-sans font-semibold"
              >
                50th
              </text>
              <text
                x={width - padding.right + 4}
                y={scaleY(curve[curve.length - 1].p3) + 3}
                className="text-[9px] fill-stone-400 font-sans font-medium"
              >
                3rd
              </text>
            </>
          )}

          {/* User Logged Measurements Spline */}
          {userPath && (
            <path
              d={userPath}
              fill="none"
              stroke="#0f766e"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* User Data Points */}
          {validMeasurements.map((m) => {
            const isHovered = hoveredPoint?.date === m.date;
            return (
              <g
                key={m.id}
                className="cursor-pointer"
                onMouseEnter={() =>
                  setHoveredPoint({
                    age: m.ageInMonths,
                    value: m.val,
                    percentile: m.percentile,
                    zScore: m.zScore,
                    date: m.date,
                    notes: m.notes,
                    x: m.x,
                    y: m.y,
                  })
                }
                onClick={() =>
                  setHoveredPoint({
                    age: m.ageInMonths,
                    value: m.val,
                    percentile: m.percentile,
                    zScore: m.zScore,
                    date: m.date,
                    notes: m.notes,
                    x: m.x,
                    y: m.y,
                  })
                }
              >
                {/* Glow ring */}
                <circle
                  cx={m.x}
                  cy={m.y}
                  r={isHovered ? 9 : 6}
                  fill="#0f766e"
                  opacity={isHovered ? 0.25 : 0.15}
                  className="transition-all"
                />
                {/* Solid core */}
                <circle
                  cx={m.x}
                  cy={m.y}
                  r={isHovered ? 5.5 : 4}
                  fill="#0f766e"
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="transition-all"
                />
              </g>
            );
          })}

          {/* Real-time Vertical Guideline and Interactive Tooltip when scrubbing */}
          {scrubberState && !hoveredPoint && (
            <g className="pointer-events-none transition-all duration-75">
              <line
                x1={scrubberState.svgX}
                y1={padding.top}
                x2={scrubberState.svgX}
                y2={height - padding.bottom}
                stroke="#10b981"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              {/* Highlight circle on WHO 50th line */}
              <circle
                cx={scrubberState.svgX}
                cy={scaleY(scrubberState.p50)}
                r="4.5"
                fill="#15803d"
                stroke="#ffffff"
                strokeWidth="1.5"
              />
              {/* Highlight circle on WHO 97th line */}
              <circle
                cx={scrubberState.svgX}
                cy={scaleY(scrubberState.p97)}
                r="3"
                fill="#a8a29e"
                stroke="#ffffff"
                strokeWidth="1"
              />
              {/* Highlight circle on WHO 3rd line */}
              <circle
                cx={scrubberState.svgX}
                cy={scaleY(scrubberState.p3)}
                r="3"
                fill="#a8a29e"
                stroke="#ffffff"
                strokeWidth="1"
              />

              {/* If nearest logged measurement exists */}
              {scrubberState.nearestMeasurement && (
                <circle
                  cx={scrubberState.nearestMeasurement.x}
                  cy={scrubberState.nearestMeasurement.y}
                  r="7.5"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                  className="animate-ping"
                />
              )}

              {/* Floating Rich Tooltip */}
              <g
                transform={`translate(${
                  scrubberState.svgX > width - 185
                    ? scrubberState.svgX - 180
                    : scrubberState.svgX + 12
                }, ${
                  scaleY(scrubberState.p50) < 110
                    ? scaleY(scrubberState.p50) + 12
                    : scaleY(scrubberState.p50) - 80
                })`}
                className="drop-shadow-lg"
              >
                <rect
                  width="170"
                  height={scrubberState.nearestMeasurement ? 76 : 60}
                  rx="10"
                  fill="#18181b"
                  opacity="0.96"
                  stroke="#3f3f46"
                  strokeWidth="0.75"
                />
                <text
                  x="10"
                  y="16"
                  className="text-[10px] font-bold fill-emerald-400 font-sans tracking-wide uppercase"
                >
                  {timeScale === 'weeks'
                    ? `Week ${Math.round(scrubberState.month * 4.345)} · Month ${scrubberState.month}`
                    : `Age: Month ${scrubberState.month}`}
                </text>
                <text
                  x="10"
                  y="30"
                  className="text-[11px] font-extrabold fill-white font-sans"
                >
                  Median (50th): {displayValue(scrubberState.p50)}
                </text>
                <text
                  x="10"
                  y="44"
                  className="text-[9px] fill-stone-300 font-sans"
                >
                  Normal Range: {displayValue(scrubberState.p3)} – {displayValue(scrubberState.p97)}
                </text>
                {scrubberState.nearestMeasurement && (
                  <>
                    <line x1="8" y1="50" x2="162" y2="50" stroke="#3f3f46" strokeWidth="0.75" />
                    <text
                      x="10"
                      y="62"
                      className="text-[10px] font-bold fill-teal-300 font-sans"
                    >
                      Measured: {displayValue(scrubberState.nearestMeasurement.val)} ({scrubberState.nearestMeasurement.percentile}th %)
                    </text>
                    <text
                      x="10"
                      y="72"
                      className="text-[8px] fill-stone-400 font-sans"
                    >
                      {scrubberState.nearestMeasurement.date} · Z: {scrubberState.nearestMeasurement.zScore}
                    </text>
                  </>
                )}
              </g>
            </g>
          )}

          {/* Active Hover / Tap Tooltip in SVG */}
          {hoveredPoint && (
            <g
              transform={`translate(${
                hoveredPoint.x > width - 160
                  ? hoveredPoint.x - 150
                  : hoveredPoint.x + 12
              }, ${
                hoveredPoint.y < 80 ? hoveredPoint.y + 10 : hoveredPoint.y - 70
              })`}
              className="pointer-events-none drop-shadow-md"
            >
              <rect
                width="145"
                height="62"
                rx="8"
                fill="#1c1917"
                opacity="0.95"
              />
              <text
                x="10"
                y="18"
                className="text-[11px] font-semibold fill-white font-sans"
              >
                {displayValue(hoveredPoint.value)}
              </text>
              <text
                x="10"
                y="34"
                className="text-[10px] fill-stone-300 font-sans"
              >
                {hoveredPoint.percentile}th Percentile (Z: {hoveredPoint.zScore})
              </text>
              <text
                x="10"
                y="49"
                className="text-[9px] fill-stone-400 font-sans"
              >
                {hoveredPoint.date} · {hoveredPoint.age} mo
              </text>
            </g>
          )}

          {/* Axis Labels */}
          <text
            x={width / 2}
            y={height - 8}
            textAnchor="middle"
            className="text-[11px] fill-stone-500 font-sans font-medium"
          >
            Age (Months)
          </text>
        </svg>
      </div>

      {/* Legend & Guide footer */}
      <div className="mt-4 pt-3.5 border-t border-stone-100 dark:border-stone-800 flex flex-wrap items-center justify-between text-xs text-stone-500 dark:text-stone-400 gap-y-2">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-teal-600 dark:bg-teal-400 rounded-full"></span>
            <span className="w-2 h-2 rounded-full bg-teal-600 dark:bg-teal-400 border border-white dark:border-stone-900"></span>
            <span className="text-stone-700 dark:text-stone-200 font-semibold">{profile.name}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-emerald-600 dark:bg-emerald-400 rounded-full"></span>
            <span className="text-stone-600 dark:text-stone-300">WHO 50th % (Median)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-2 bg-emerald-100 dark:bg-emerald-950/80 rounded-xs border border-emerald-200/60 dark:border-emerald-800/60"></span>
            <span className="text-stone-600 dark:text-stone-300">15th – 85th % (Typical)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-2 bg-stone-100 dark:bg-stone-800 rounded-xs border border-stone-200 dark:border-stone-700"></span>
            <span className="text-stone-600 dark:text-stone-300">3rd – 97th %</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[11px] text-stone-400 dark:text-stone-500">
          <Info className="w-3.5 h-3.5" />
          <span>Tap any data point for exact percentile</span>
        </div>
      </div>
    </div>
  );
};
