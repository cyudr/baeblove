import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ChildProfile, ProfileType, Gender } from '../../types';
import { X, Baby, HeartPulse, User } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingProfile?: ChildProfile;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  editingProfile,
}) => {
  const { addProfile, updateProfile } = useApp();

  const [type, setType] = useState<ProfileType>(editingProfile?.type || 'baby');
  const [name, setName] = useState(editingProfile?.name || '');
  const [gender, setGender] = useState<Gender>(editingProfile?.gender || 'boy');
  const [dateOfEvent, setDateOfEvent] = useState(
    editingProfile?.dateOfEvent || new Date().toISOString().split('T')[0]
  );
  const [birthWeightKg, setBirthWeightKg] = useState(
    editingProfile?.birthWeightKg ? editingProfile.birthWeightKg.toString() : ''
  );
  const [birthLengthCm, setBirthLengthCm] = useState(
    editingProfile?.birthLengthCm ? editingProfile.birthLengthCm.toString() : ''
  );
  const [prePregnancyWeightKg, setPrePregnancyWeightKg] = useState(
    editingProfile?.prePregnancyWeightKg ? editingProfile.prePregnancyWeightKg.toString() : ''
  );
  const [notes, setNotes] = useState(editingProfile?.notes || '');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const profileData: Omit<ChildProfile, 'id'> = {
      name: name.trim(),
      type,
      gender,
      dateOfEvent,
      birthWeightKg: birthWeightKg ? parseFloat(birthWeightKg) : undefined,
      birthLengthCm: birthLengthCm ? parseFloat(birthLengthCm) : undefined,
      prePregnancyWeightKg: prePregnancyWeightKg ? parseFloat(prePregnancyWeightKg) : undefined,
      avatarColor: type === 'baby' ? (gender === 'girl' ? 'bg-rose-600' : 'bg-emerald-600') : 'bg-amber-600',
      avatarIcon: type === 'baby' ? 'Baby' : 'HeartPulse',
      notes: notes.trim() || undefined,
    };

    if (editingProfile) {
      updateProfile(editingProfile.id, profileData);
    } else {
      addProfile(profileData);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 dark:bg-black/75 backdrop-blur-xs">
      <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 dark:border-stone-800 relative transition-colors">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
          <h3 className="text-lg font-bold text-stone-900 dark:text-white">
            {editingProfile ? 'Edit Profile' : 'Add Child or Pregnancy'}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Type selector */}
          {!editingProfile && (
            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                Journey Stage
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setType('baby')}
                  className={`p-3 rounded-2xl border text-left flex items-start gap-2.5 transition-all ${
                    type === 'baby'
                      ? 'border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/40 text-stone-900 dark:text-white font-semibold'
                      : 'border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600 text-stone-600 dark:text-stone-300 bg-white dark:bg-stone-800'
                  }`}
                >
                  <Baby className="w-5 h-5 text-emerald-700 dark:text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-semibold">Baby / Toddler</div>
                    <div className="text-[11px] text-stone-500 dark:text-stone-400">Track 0–36+ months</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setType('fetal')}
                  className={`p-3 rounded-2xl border text-left flex items-start gap-2.5 transition-all ${
                    type === 'fetal'
                      ? 'border-amber-600 bg-amber-50/70 dark:bg-amber-950/40 text-stone-900 dark:text-white font-semibold'
                      : 'border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600 text-stone-600 dark:text-stone-300 bg-white dark:bg-stone-800'
                  }`}
                >
                  <HeartPulse className="w-5 h-5 text-amber-700 dark:text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-semibold">Pregnancy</div>
                    <div className="text-[11px] text-stone-500 dark:text-stone-400">Track 4–40 weeks</div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
              {type === 'baby' ? "Baby's Name" : "Baby's Nickname or Label"}
            </label>
            <input
              type="text"
              required
              placeholder={type === 'baby' ? 'e.g. Liam, Maya' : 'e.g. Little Peanut, Baby #2'}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white rounded-xl focus:outline-hidden focus:border-stone-400"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">Gender</label>
            <div className="grid grid-cols-3 gap-2">
              {(['boy', 'girl', 'undisclosed'] as Gender[]).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGender(g)}
                  className={`py-1.5 text-xs font-medium rounded-xl border capitalize transition-colors ${
                    gender === g
                      ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 border-stone-900 dark:border-stone-100 font-semibold'
                      : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600'
                  }`}
                >
                  {g === 'undisclosed' ? 'Surprise' : g}
                </button>
              ))}
            </div>
          </div>

          {/* Date of Event */}
          <div>
            <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
              {type === 'baby' ? 'Date of Birth' : 'Estimated Due Date (EDD)'}
            </label>
            <input
              type="date"
              required
              value={dateOfEvent}
              onChange={(e) => setDateOfEvent(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white rounded-xl focus:outline-hidden focus:border-stone-400"
            />
          </div>

          {/* Optional birth or pregnancy baseline stats */}
          {type === 'baby' ? (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                  Birth Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="e.g. 3.4"
                  value={birthWeightKg}
                  onChange={(e) => setBirthWeightKg(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white rounded-xl focus:outline-hidden focus:border-stone-400 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                  Birth Length (cm)
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="e.g. 50.0"
                  value={birthLengthCm}
                  onChange={(e) => setBirthLengthCm(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white rounded-xl focus:outline-hidden focus:border-stone-400 font-mono"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                Pre-pregnancy Weight (kg)
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="e.g. 60.5"
                value={prePregnancyWeightKg}
                onChange={(e) => setPrePregnancyWeightKg(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white rounded-xl focus:outline-hidden focus:border-stone-400 font-mono"
              />
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">Notes</label>
            <input
              type="text"
              placeholder="e.g. Born at 39w2d; pediatrician name..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white rounded-xl focus:outline-hidden focus:border-stone-400"
            />
          </div>

          {/* Browser Cookie Storage Indicator */}
          <div className="p-3 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs text-stone-700 dark:text-stone-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base">🍪</span>
              <div>
                <span className="font-bold text-emerald-950 dark:text-emerald-200 block text-[11px]">
                  Browser Cookie Storage Active
                </span>
                <span className="text-[10px] text-stone-500 dark:text-stone-400">
                  Child profiles are persistently saved in your browser's secure cookies.
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold shrink-0">
              Synced ✓
            </span>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100 dark:border-stone-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white dark:text-stone-900 rounded-xl shadow-xs transition-colors"
            >
              {editingProfile ? 'Save Changes' : 'Create Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
