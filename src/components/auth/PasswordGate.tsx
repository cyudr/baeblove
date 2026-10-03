import React, { useState } from 'react';
import { Lock, KeyRound, Eye, EyeOff, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { validatePassword, authenticateUser } from '../../utils/authConfig';
import confetti from 'canvas-confetti';

interface PasswordGateProps {
  onAuthenticated: () => void;
}

export const PasswordGate: React.FC<PasswordGateProps> = ({ onAuthenticated }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const isValid = validatePassword(password);
    if (isValid) {
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      } catch (err) {
        // Confetti is purely decorative; ignore errors if canvas unavailable
        console.warn('Canvas confetti error:', err);
      }
      authenticateUser();
      setTimeout(() => {
        onAuthenticated();
      }, 180);
    } else {
      setIsSubmitting(false);
      setError('Incorrect access password. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50/70 via-stone-100 to-emerald-50/40 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950 flex flex-col items-center justify-center p-4 sm:p-6 text-stone-900 dark:text-stone-100 select-none">
      <div className="w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden transition-all animate-in fade-in zoom-in-95 duration-200">
        {/* Subtle decorative background glow */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-amber-400/15 dark:bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-emerald-400/15 dark:bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Header with App Branding */}
        <div className="text-center space-y-2 relative">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-tr from-amber-500 via-rose-500 to-emerald-500 text-white shadow-md mx-auto mb-1">
            <Lock className="w-7 h-7" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 text-[11px] font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>Protected Access Portal</span>
          </div>
          <h1 className="text-2xl font-black text-stone-900 dark:text-white tracking-tight">
            BaeLove Portal
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xs mx-auto leading-relaxed">
            This private growth tracker and maternal health journal is protected by a site access key.
          </p>
        </div>

        {/* Password Form */}
        <form onSubmit={handleUnlock} className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="site-password"
              className="block text-xs font-bold text-stone-700 dark:text-stone-300"
            >
              Enter Site Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                id="site-password"
                type={showPassword ? 'text' : 'password'}
                autoFocus
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Enter password..."
                className={`w-full pl-9 pr-10 py-2.5 rounded-xl border text-sm transition-all outline-hidden ${
                  error
                    ? 'border-rose-400 bg-rose-50/50 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200 focus:ring-2 focus:ring-rose-500'
                    : 'border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-xs text-rose-800 dark:text-rose-300 flex items-start gap-2 animate-in fade-in slide-in-from-top-1 duration-150">
              <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !password.trim()}
            className="w-full py-3 px-4 rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isSubmitting ? 'Verifying...' : 'Unlock Portal'}</span>
          </button>
        </form>

        {/* Footer Info & Cookie Storage Indicator */}
        <div className="pt-4 border-t border-stone-100 dark:border-stone-800 text-center space-y-1.5 text-[11px] text-stone-500 dark:text-stone-400">
          <div className="flex items-center justify-center gap-1.5 text-stone-600 dark:text-stone-300 font-semibold">
            <span>🍪 Browser Cookie Session Enabled</span>
          </div>
          <p className="text-[10px] text-stone-400 leading-tight">
            Activated via environment variable <code className="px-1 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-mono">baepass_Key</code> & password key <code className="px-1 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-mono">bae_Key*</code>.
          </p>
        </div>
      </div>
    </div>
  );
};
