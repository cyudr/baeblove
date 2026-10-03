import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ChildProfile } from '../../types';
import { X, AlertTriangle, Lock, ShieldAlert, Trash2 } from 'lucide-react';
import { verifyDeletionPassword, getConfiguredPasswords } from '../../utils/authConfig';

interface DeleteProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileToDelete: ChildProfile;
  onDeleted?: () => void;
}

export const DeleteProfileModal: React.FC<DeleteProfileModalProps> = ({
  isOpen,
  onClose,
  profileToDelete,
  onDeleted,
}) => {
  const { deleteProfile, profiles } = useApp();
  const [password, setPassword] = useState('');
  const [nameConfirmation, setNameConfirmation] = useState('');
  const [acknowledged, setAcknowledged] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen) return null;

  const hasConfiguredPasswords = getConfiguredPasswords().length > 0;
  const isOnlyProfile = profiles.length <= 1;

  const handleConfirmDelete = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // 1. Check additional deletion acknowledgement
    if (!acknowledged) {
      setErrorMsg('Please check the deletion acknowledgement checkbox.');
      return;
    }

    // 2. Check child name or DELETE confirmation text
    const cleanConfirm = nameConfirmation.trim();
    if (
      cleanConfirm.toLowerCase() !== profileToDelete.name.trim().toLowerCase() &&
      cleanConfirm.toUpperCase() !== 'DELETE'
    ) {
      setErrorMsg(`Please type "${profileToDelete.name}" or "DELETE" to confirm.`);
      return;
    }

    // 3. Re-enter & verify password
    const verification = verifyDeletionPassword(password);
    if (!verification.isValid) {
      setErrorMsg(verification.error || 'Incorrect security password.');
      return;
    }

    setIsDeleting(true);

    try {
      deleteProfile(profileToDelete.id);
      setIsDeleting(false);
      onClose();
      if (onDeleted) onDeleted();
    } catch (err) {
      setIsDeleting(false);
      setErrorMsg('An error occurred while deleting the profile. Please try again.');
    }
  };

  const isFormReady =
    acknowledged &&
    password.trim().length > 0 &&
    (nameConfirmation.trim().toLowerCase() === profileToDelete.name.trim().toLowerCase() ||
      nameConfirmation.trim().toUpperCase() === 'DELETE');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 dark:bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-rose-200 dark:border-rose-900/60 relative transition-all">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-rose-100 dark:border-rose-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-white">
                Delete Child Profile
              </h3>
              <p className="text-xs text-rose-600 dark:text-rose-400 font-medium">
                Irreversible Permanent Action
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Card Summary */}
        <div className="mt-4 p-3.5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/70 dark:border-rose-900/50 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
              <span>{profileToDelete.name}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-stone-200/60 dark:bg-stone-800 text-stone-600 dark:text-stone-300 capitalize">
                {profileToDelete.type === 'baby' ? 'Baby' : 'Pregnancy'}
              </span>
            </div>
            <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
              {profileToDelete.type === 'baby' ? 'Born' : 'Due'}: {profileToDelete.dateOfEvent}
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-rose-200 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 flex items-center justify-center text-xs font-bold">
            {profileToDelete.name.charAt(0)}
          </div>
        </div>

        {isOnlyProfile && (
          <div className="mt-3 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-[11px] text-amber-800 dark:text-amber-300 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              This is currently your only profile. Deleting it will create a fresh blank starter profile so you can start anew.
            </span>
          </div>
        )}

        <form onSubmit={handleConfirmDelete} className="mt-4 space-y-3.5">
          {/* Step 1: Re-enter Password */}
          <div>
            <label className="block text-xs font-semibold text-stone-800 dark:text-stone-200 mb-1 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-stone-500" />
              <span>Step 1: Re-enter Security Password</span>
            </label>
            <input
              type="password"
              required
              autoFocus
              placeholder={hasConfiguredPasswords ? "Enter your security passkey" : "Enter password or type 'DELETE'"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white rounded-xl focus:outline-hidden focus:border-rose-400"
            />
            <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-1">
              {hasConfiguredPasswords
                ? 'Authorized passkey required to guard against unauthorized or accidental deletions.'
                : 'Enter your site password (or type DELETE if no env passkey is active).'}
            </p>
          </div>

          {/* Step 2: Name Confirmation */}
          <div>
            <label className="block text-xs font-semibold text-stone-800 dark:text-stone-200 mb-1">
              Step 2: Type <span className="font-bold text-rose-600 dark:text-rose-400 font-mono">"{profileToDelete.name}"</span> to confirm
            </label>
            <input
              type="text"
              required
              placeholder={`Type "${profileToDelete.name}" or "DELETE"`}
              value={nameConfirmation}
              onChange={(e) => setNameConfirmation(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white rounded-xl focus:outline-hidden focus:border-rose-400 font-mono"
            />
          </div>

          {/* Step 3: Explicit Additional Acknowledgement */}
          <div className="pt-1">
            <label className="flex items-start gap-2.5 cursor-pointer p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/60 transition-colors">
              <input
                type="checkbox"
                checked={acknowledged}
                onChange={(e) => setAcknowledged(e.target.checked)}
                className="mt-0.5 rounded-md border-stone-300 dark:border-stone-600 text-rose-600 focus:ring-rose-500"
              />
              <span className="text-xs text-stone-700 dark:text-stone-300 leading-snug">
                I explicitly acknowledge that deleting this profile will permanently erase all associated checkups, growth curves, milestone records, kick counters, and love notes from my browser cookies.
              </span>
            </label>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-2.5 rounded-xl bg-rose-100/80 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-xs font-semibold text-rose-700 dark:text-rose-300">
              {errorMsg}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100 dark:border-stone-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormReady || isDeleting}
              className={`px-4 py-2 text-xs font-bold text-white rounded-xl shadow-xs flex items-center gap-1.5 transition-all ${
                isFormReady && !isDeleting
                  ? 'bg-rose-600 hover:bg-rose-700 cursor-pointer shadow-rose-600/20'
                  : 'bg-stone-300 dark:bg-stone-800 text-stone-500 dark:text-stone-500 cursor-not-allowed'
              }`}
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{isDeleting ? 'Deleting...' : 'Permanently Delete Profile'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
