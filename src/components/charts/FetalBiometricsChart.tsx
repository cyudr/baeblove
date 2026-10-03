import React, { useState, useMemo } from 'react';
import {
  FETAL_BIOMETRIC_STANDARDS,
  FetalBiometricRef,
  getFetalBiometricRef,
} from '../../data/fetalStandards';
import { UnitConverter } from '../../data/growthStandards';
import { FetalMeasurement, ChildProfile, UnitSystem } from '../../types';
import { useApp } from '../../context/AppContext';
import { Sparkles, Info, BookOpen } from 'lucide-react';

interface FetalBiometricsChartProps {
  profile: ChildProfile;
  measurements: FetalMeasurement[];
  unitSystem: UnitSystem;
  onOpenFormulaModal?: () => void;
}

type FetalMetricKey = 'efw' | 'bpd' | 'hc' | 'ac' | 'fl';

export const FetalBiometricsChart: React.FC<FetalBiometricsChartProps> = ({
  profile,
  measurements,
  unitSystem,
  onOpenFormulaModal,
}) => {
  const { formulaSettings } = useApp();
  const [selectedMetric, setSelectedMetric] = useState<FetalMetricKey>('efw');
  const [hoveredPoint, setHoveredPoint] = useState<{
    week: number;
    value: number;
    date: string;
    notes?: string;
    x: number;
    y: number;
    ref5: number;
    ref50: number;
    ref95: number;
  } | null>(null);

  // Scrubber tracking state across gestation weeks 12-40
  const [scrubberState, setScrubberState] = useState<{
    week: number;
    svgX: number;
    ref5: number;
    ref50: number;
    ref95: number;
    nearestMeasurement?: {
      week: number;
      val: number;
      date: string;
      notes?: string;
      x: number;
      y: number;
    };
  } | null>(null);

  const metricConfig = {
    efw: {
      name: 'Estimated Fetal Weight (EFW)',
      unit: unitSystem === 'imperial' ? 'oz / lb' : 'g',
      keyP5: 'efwP5' as const,
      keyP50: 'efwP50' as const,
      keyP95: 'efwP95' as const,
      formatVal: (val: number) => UnitConverter.formatFetalWeight(val, unitSystem),
      getMeasurementVal: (m: FetalMeasurement) => m.efwGrams,
    },
    bpd: {
      name: 'Biparietal Diameter (BPD)',
      unit: unitSystem === 'imperial' ? 'in' : 'mm',
      keyP5: 'bpdP5' as const,
      keyP50: 'bpdP50' as const,
      keyP95: 'bpdP95' as const,
      formatVal: (val: number) => (unitSystem === 'imperial' ? `${(val / 25.4).toFixed(2)} in` : `${val} mm`),
      getMeasurementVal: (m: FetalMeasurement) => m.bpdMm,
    },
    hc: {
      name: 'Head Circumference (HC)',
      unit: unitSystem === 'imperial' ? 'in' : 'mm',
      keyP5: 'hcP5' as const,
      keyP50: 'hcP50' as const,
      keyP95: 'hcP95' as const,
      formatVal: (val: number) => (unitSystem === 'imperial' ? `${(val / 25.4).toFixed(2)} in` : `${val} mm`),
      getMeasurementVal: (m: FetalMeasurement) => m.hcMm,
    },
    ac: {
      name: 'Abdominal Circumference (AC)',
      unit: unitSystem === 'imperial' ? 'in' : 'mm',
      keyP5: 'acP5' as const,
      keyP50: 'acP50' as const,
      keyP95: 'acP95' as const,
      formatVal: (val: number) => (unitSystem === 'imperial' ? `${(val / 25.4).toFixed(2)} in` : `${val} mm`),
      getMeasurementVal: (m: FetalMeasurement) => m.acMm,
    },
    fl: {
      name: 'Femur Length (FL)',
      unit: unitSystem === 'imperial' ? 'in' : 'mm',
      keyP5: 'flP5' as const,
      keyP50: 'flP50' as const,
      keyP95: 'flP95' as const,
      formatVal: (val: number) => (unitSystem === 'imperial' ? `${(val / 25.4).toFixed(2)} in` : `${val} mm`),
      getMeasurementVal: (m: FetalMeasurement) => m.flMm,
    },
  };

  const currentCfg = metricConfig[selectedMetric];

  // SVG dimensions
  const width = 800;
  const height = 420;
  const padding = { top: 35, right: 35, bottom: 45, left: 60 };

  const minWeek = 12;
  const maxWeek = 40;

  // Compute Y range
  const { yMin, yMax } = useMemo(() => {
    const minVal = Math.min(...FETAL_BIOMETRIC_STANDARDS.map((s) => s[currentCfg.keyP5]));
    let maxVal = Math.max(...FETAL_BIOMETRIC_STANDARDS.map((s) => s[currentCfg.keyP95]));

    measurements.forEach((m) => {
      const val = currentCfg.getMeasurementVal(m);
      if (val && val > maxVal) maxVal = val;
    });

    return {
      yMin: Math.max(0, Math.floor(minVal * 0.8)),
      yMax: Math.ceil(maxVal * 1.08),
    };
  }, [currentCfg, measurements]);

  const scaleX = (week: number) => {
    const usableW = width - padding.left - padding.right;
    return padding.left + ((week - minWeek) / (maxWeek - minWeek)) * usableW;
  };

  const scaleY = (val: number) => {
    const usableH = height - padding.top - padding.bottom;
    const norm = (val - yMin) / (yMax - yMin);
    return height - padding.bottom - norm * usableH;
  };

  const updateScrubberBySvgX = (svgX: number) => {
    const usableW = width - padding.left - padding.right;
    if (svgX < padding.left || svgX > width - padding.right) {
      setScrubberState(null);
      return;
    }
    const ratio = (svgX - padding.left) / usableW;
    const scrubbedWeek = Math.max(minWeek, Math.min(maxWeek, Math.round(minWeek + ratio * (maxWeek - minWeek))));
    const ref = getFetalBiometricRef(scrubbedWeek);
    if (!ref) return;

    const nearest = validMeasurements.find(
      (m) => Math.abs(m.gestationalWeeks - scrubbedWeek) <= 1
    );

    setScrubberState({
      week: scrubbedWeek,
      svgX: scaleX(scrubbedWeek),
      ref5: ref[currentCfg.keyP5],
      ref50: ref[currentCfg.keyP50],
      ref95: ref[currentCfg.keyP95],
      nearestMeasurement: nearest ? {
        week: nearest.gestationalWeeks,
        val: nearest.val,
        date: nearest.date,
        notes: nearest.notes,
        x: nearest.x,
        y: nearest.y,
      } : undefined,
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

  // Build SVG path
  const makeRefPath = (key: 'efwP5' | 'efwP50' | 'efwP95' | 'bpdP5' | 'bpdP50' | 'bpdP95' | 'hcP5' | 'hcP50' | 'hcP95' | 'acP5' | 'acP50' | 'acP95' | 'flP5' | 'flP50' | 'flP95') => {
    return FETAL_BIOMETRIC_STANDARDS.map((pt, i) => {
      const x = scaleX(pt.week);
      const y = scaleY(pt[key]);
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(' ');
  };

  const makeAreaBand = () => {
    const topPts = FETAL_BIOMETRIC_STANDARDS.map(
      (pt) => `${scaleX(pt.week).toFixed(1)},${scaleY(pt[currentCfg.keyP95]).toFixed(1)}`
    );
    const bottomPts = [...FETAL_BIOMETRIC_STANDARDS]
      .reverse()
      .map(
        (pt) => `${scaleX(pt.week).toFixed(1)},${scaleY(pt[currentCfg.keyP5]).toFixed(1)}`
      );
    return `M ${topPts.join(' L ')} L ${bottomPts.join(' L ')} Z`;
  };

  // Valid measurements with coordinates
  const validMeasurements = useMemo(() => {
    return measurements
      .filter((m) => {
        const val = currentCfg.getMeasurementVal(m);
        return val !== undefined && val > 0 && m.gestationalWeeks >= minWeek && m.gestationalWeeks <= maxWeek;
      })
      .map((m) => {
        const val = currentCfg.getMeasurementVal(m)!;
        const totalWeeks = m.gestationalWeeks + (m.gestationalDays || 0) / 7;
        const ref = getFetalBiometricRef(Math.round(totalWeeks));
        return {
          ...m,
          val,
          totalWeeks,
          x: scaleX(totalWeeks),
          y: scaleY(val),
          ref5: ref[currentCfg.keyP5],
          ref50: ref[currentCfg.keyP50],
          ref95: ref[currentCfg.keyP95],
        };
      });
  }, [measurements, currentCfg, scaleX, scaleY]);

  const userPath = useMemo(() => {
    if (validMeasurements.length < 2) return '';
    return validMeasurements
      .map((m, i) => `${i === 0 ? 'M' : 'L'} ${m.x.toFixed(1)} ${m.y.toFixed(1)}`)
      .join(' ');
  }, [validMeasurements]);

  const latest = validMeasurements[validMeasurements.length - 1];

  const weekTicks = [12, 16, 20, 24, 28, 32, 36, 40];
  const yTicks = useMemo(() => {
    const count = 5;
    const step = (yMax - yMin) / count;
    const ticks = [];
    for (let i = 0; i <= count; i++) {
      ticks.push(yMin + step * i);
    }
    return ticks;
  }, [yMin, yMax]);

  return (
    <div className="bg-white rounded-xl border border-stone-200 p-4 md:p-6 shadow-xs">
      {/* Header & Metric Picker */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-stone-100">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-stone-900">
              Ultrasound Biometrics & Fetal Growth
            </h3>
            {onOpenFormulaModal ? (
              <button
                onClick={onOpenFormulaModal}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-100 hover:bg-amber-200 text-amber-900 text-[11px] font-semibold transition-colors"
                title="View / change clinical formula"
              >
                <BookOpen className="w-3 h-3 text-amber-700" />
                <span>Formula: {formulaSettings.fetalEfwFormula.toUpperCase()}</span>
              </button>
            ) : (
              <span className="text-xs text-amber-900 font-semibold bg-amber-100 px-2 py-0.5 rounded">
                Formula: {formulaSettings.fetalEfwFormula.toUpperCase()}
              </span>
            )}
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Reference bands (5th–95th percentile) for fetal anatomical dimensions across gestational weeks.
          </p>
        </div>

        {/* Metric Segmented Control */}
        <div className="inline-flex flex-wrap p-1 bg-stone-100 rounded-lg">
          <button
            onClick={() => setSelectedMetric('efw')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              selectedMetric === 'efw'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Weight (EFW)
          </button>
          <button
            onClick={() => setSelectedMetric('bpd')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              selectedMetric === 'bpd'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            BPD (Head)
          </button>
          <button
            onClick={() => setSelectedMetric('hc')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              selectedMetric === 'hc'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            HC (Circumference)
          </button>
          <button
            onClick={() => setSelectedMetric('ac')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              selectedMetric === 'ac'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            AC (Abdomen)
          </button>
          <button
            onClick={() => setSelectedMetric('fl')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              selectedMetric === 'fl'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            FL (Femur)
          </button>
        </div>
      </div>

      {/* Dynamic Scrubber / Latest measurement summary strip */}
      {scrubberState ? (
        <div className="mt-3 py-2 px-3 bg-amber-50/90 dark:bg-amber-950/40 rounded-xl flex flex-wrap items-center justify-between text-xs text-stone-800 dark:text-stone-200 gap-2 border border-amber-300 dark:border-amber-800 animate-in fade-in duration-150">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-amber-950 dark:text-amber-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              Scrubbing Week: <strong>Week {scrubberState.week}</strong>
            </span>
            <span aria-hidden="true" className="text-stone-300 dark:text-stone-600">|</span>
            <span>Hadlock 50th %: <strong>{currentCfg.formatVal(scrubberState.ref50)}</strong></span>
            <span aria-hidden="true" className="text-stone-300 dark:text-stone-600">|</span>
            <span className="text-stone-600 dark:text-stone-400">
              Normal 5th–95th: {currentCfg.formatVal(scrubberState.ref5)} – {currentCfg.formatVal(scrubberState.ref95)}
            </span>
          </div>
          {scrubberState.nearestMeasurement ? (
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-amber-700 text-white font-bold text-[10px]">
                Scan Logged: {currentCfg.formatVal(scrubberState.nearestMeasurement.val)}
              </span>
              <span className="text-[11px] text-stone-500 dark:text-stone-400">
                {scrubberState.nearestMeasurement.date}
              </span>
            </div>
          ) : (
            <span className="text-[10px] text-stone-400 italic">
              Move cursor along curve to inspect gestational biometrics
            </span>
          )}
        </div>
      ) : latest ? (
        <div className="mt-3 py-2 px-3 bg-amber-50/60 rounded-lg flex flex-wrap items-center justify-between text-xs text-amber-900 gap-2 border border-amber-200/60">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-stone-900">Latest Ultrasound Scan:</span>
            <span className="font-bold text-amber-950">{currentCfg.formatVal(latest.val)}</span>
            <span aria-hidden="true" className="text-stone-400">·</span>
            <span>Week {latest.gestationalWeeks}d{latest.gestationalDays}</span>
            <span aria-hidden="true" className="text-stone-400">·</span>
            <span>Date: {latest.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-stone-600">
              50th % Median for Week: {currentCfg.formatVal(latest.ref50)}
            </span>
          </div>
        </div>
      ) : null}

      {/* SVG Canvas */}
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
            <linearGradient id="fetalBandGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#fef3c7" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {yTicks.map((tickVal, i) => {
            const y = scaleY(tickVal);
            return (
              <g key={`y-${i}`}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="#f0f0ef"
                  strokeDasharray="3 3"
                  strokeWidth="1"
                />
                <text
                  x={padding.left - 8}
                  y={y + 3.5}
                  textAnchor="end"
                  className="text-[10px] fill-stone-400 font-sans"
                >
                  {selectedMetric === 'efw'
                    ? unitSystem === 'imperial'
                      ? `${Math.round(tickVal * 0.035274)} oz`
                      : `${Math.round(tickVal)} g`
                    : unitSystem === 'imperial'
                    ? `${(tickVal / 25.4).toFixed(1)} in`
                    : `${Math.round(tickVal)} mm`}
                </text>
              </g>
            );
          })}

          {weekTicks.map((wk) => {
            const x = scaleX(wk);
            return (
              <g key={`wk-${wk}`}>
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
                  {wk}w
                </text>
              </g>
            );
          })}

          {/* Reference Band (5th to 95th Percentile) */}
          <path d={makeAreaBand()} fill="url(#fetalBandGrad)" />

          <path
            d={makeRefPath(currentCfg.keyP95)}
            fill="none"
            stroke="#f59e0b"
            strokeWidth="1"
            strokeDasharray="2 3"
          />
          <path
            d={makeRefPath(currentCfg.keyP50)}
            fill="none"
            stroke="#d97706"
            strokeWidth="2"
          />
          <path
            d={makeRefPath(currentCfg.keyP5)}
            fill="none"
            stroke="#f59e0b"
            strokeWidth="1"
            strokeDasharray="2 3"
          />

          <text
            x={width - padding.right + 4}
            y={scaleY(FETAL_BIOMETRIC_STANDARDS[FETAL_BIOMETRIC_STANDARDS.length - 1][currentCfg.keyP95]) + 3}
            className="text-[9px] fill-amber-700 font-sans font-medium"
          >
            95th
          </text>
          <text
            x={width - padding.right + 4}
            y={scaleY(FETAL_BIOMETRIC_STANDARDS[FETAL_BIOMETRIC_STANDARDS.length - 1][currentCfg.keyP50]) + 3}
            className="text-[9px] fill-amber-900 font-sans font-semibold"
          >
            50th
          </text>
          <text
            x={width - padding.right + 4}
            y={scaleY(FETAL_BIOMETRIC_STANDARDS[FETAL_BIOMETRIC_STANDARDS.length - 1][currentCfg.keyP5]) + 3}
            className="text-[9px] fill-amber-700 font-sans font-medium"
          >
            5th
          </text>

          {/* User Logged Line */}
          {userPath && (
            <path
              d={userPath}
              fill="none"
              stroke="#b45309"
              strokeWidth="2.5"
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
                    week: m.gestationalWeeks,
                    value: m.val,
                    date: m.date,
                    notes: m.notes,
                    x: m.x,
                    y: m.y,
                    ref5: m.ref5,
                    ref50: m.ref50,
                    ref95: m.ref95,
                  })
                }
                onClick={() =>
                  setHoveredPoint({
                    week: m.gestationalWeeks,
                    value: m.val,
                    date: m.date,
                    notes: m.notes,
                    x: m.x,
                    y: m.y,
                    ref5: m.ref5,
                    ref50: m.ref50,
                    ref95: m.ref95,
                  })
                }
              >
                <circle
                  cx={m.x}
                  cy={m.y}
                  r={isHovered ? 9 : 6}
                  fill="#b45309"
                  opacity={isHovered ? 0.25 : 0.15}
                />
                <circle
                  cx={m.x}
                  cy={m.y}
                  r={isHovered ? 5.5 : 4}
                  fill="#b45309"
                  stroke="#ffffff"
                  strokeWidth="2"
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
                stroke="#d97706"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              {/* Highlight circle on Hadlock 50th line */}
              <circle
                cx={scrubberState.svgX}
                cy={scaleY(scrubberState.ref50)}
                r="4.5"
                fill="#b45309"
                stroke="#ffffff"
                strokeWidth="1.5"
              />
              {/* Highlight circle on Hadlock 95th line */}
              <circle
                cx={scrubberState.svgX}
                cy={scaleY(scrubberState.ref95)}
                r="3"
                fill="#f59e0b"
                stroke="#ffffff"
                strokeWidth="1"
              />
              {/* Highlight circle on Hadlock 5th line */}
              <circle
                cx={scrubberState.svgX}
                cy={scaleY(scrubberState.ref5)}
                r="3"
                fill="#f59e0b"
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
                  stroke="#d97706"
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
                  scaleY(scrubberState.ref50) < 110
                    ? scaleY(scrubberState.ref50) + 12
                    : scaleY(scrubberState.ref50) - 80
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
                  className="text-[10px] font-bold fill-amber-400 font-sans tracking-wide uppercase"
                >
                  Gestational Week {scrubberState.week}
                </text>
                <text
                  x="10"
                  y="30"
                  className="text-[11px] font-extrabold fill-white font-sans"
                >
                  Hadlock 50th: {currentCfg.formatVal(scrubberState.ref50)}
                </text>
                <text
                  x="10"
                  y="44"
                  className="text-[9px] fill-stone-300 font-sans"
                >
                  Normal 5th–95th: {currentCfg.formatVal(scrubberState.ref5)} – {currentCfg.formatVal(scrubberState.ref95)}
                </text>
                {scrubberState.nearestMeasurement && (
                  <>
                    <line x1="8" y1="50" x2="162" y2="50" stroke="#3f3f46" strokeWidth="0.75" />
                    <text
                      x="10"
                      y="62"
                      className="text-[10px] font-bold fill-amber-300 font-sans"
                    >
                      Measured: {currentCfg.formatVal(scrubberState.nearestMeasurement.val)}
                    </text>
                    <text
                      x="10"
                      y="72"
                      className="text-[8px] fill-stone-400 font-sans"
                    >
                      Scan: {scrubberState.nearestMeasurement.date}
                    </text>
                  </>
                )}
              </g>
            </g>
          )}

          {/* Tooltip */}
          {hoveredPoint && (
            <g
              transform={`translate(${
                hoveredPoint.x > width - 170
                  ? hoveredPoint.x - 165
                  : hoveredPoint.x + 12
              }, ${
                hoveredPoint.y < 80 ? hoveredPoint.y + 10 : hoveredPoint.y - 70
              })`}
              className="pointer-events-none drop-shadow-md"
            >
              <rect
                width="160"
                height="65"
                rx="8"
                fill="#1c1917"
                opacity="0.95"
              />
              <text
                x="10"
                y="18"
                className="text-[11px] font-semibold fill-white font-sans"
              >
                {currentCfg.formatVal(hoveredPoint.value)}
              </text>
              <text
                x="10"
                y="34"
                className="text-[10px] fill-amber-200 font-sans"
              >
                Normal Range: {currentCfg.formatVal(hoveredPoint.ref5)} - {currentCfg.formatVal(hoveredPoint.ref95)}
              </text>
              <text
                x="10"
                y="50"
                className="text-[9px] fill-stone-400 font-sans"
              >
                Week {hoveredPoint.week} · {hoveredPoint.date}
              </text>
            </g>
          )}

          {/* Axis label */}
          <text
            x={width / 2}
            y={height - 8}
            textAnchor="middle"
            className="text-[11px] fill-stone-500 font-sans font-medium"
          >
            Gestational Age (Weeks)
          </text>
        </svg>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between text-xs text-stone-500 gap-y-2">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-amber-700"></span>
            <span className="w-2 h-2 rounded-full bg-amber-700 border border-white"></span>
            <span className="text-stone-700 font-medium">{profile.name} Ultrasounds</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-amber-600"></span>
            <span>Hadlock 50th %</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-2 bg-amber-100 rounded-xs"></span>
            <span>5th – 95th % Normal Range</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[11px] text-stone-400">
          <Info className="w-3.5 h-3.5" />
          <span>Hadlock ultrasound regression curves</span>
        </div>
      </div>
    </div>
  );
};
