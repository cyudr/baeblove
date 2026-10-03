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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-stone-200 relative">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <h3 className="text-lg font-semibold text-stone-900">
            {editingProfile ? 'Edit Profile' : 'Add Child or Pregnancy'}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Type selector */}
          {!editingProfile && (
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1.5">
                Journey Stage
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setType('baby')}
                  className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                    type === 'baby'
                      ? 'border-emerald-600 bg-emerald-50/50 text-stone-900'
                      : 'border-stone-200 hover:border-stone-300 text-stone-600'
                  }`}
                >
                  <Baby className="w-5 h-5 text-emerald-700 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-semibold">Baby / Toddler</div>
                    <div className="text-[11px] text-stone-500">Track 0–36+ months</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setType('fetal')}
                  className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                    type === 'fetal'
                      ? 'border-amber-600 bg-amber-50/50 text-stone-900'
                      : 'border-stone-200 hover:border-stone-300 text-stone-600'
                  }`}
                >
                  <HeartPulse className="w-5 h-5 text-amber-700 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-semibold">Pregnancy</div>
                    <div className="text-[11px] text-stone-500">Track 4–40 weeks</div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              {type === 'baby' ? "Baby's Name" : "Baby's Nickname or Label"}
            </label>
            <input
              type="text"
              required
              placeholder={type === 'baby' ? 'e.g. Liam, Maya' : 'e.g. Little Peanut, Baby #2'}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg focus:outline-hidden focus:border-stone-400"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">Gender</label>
            <div className="grid grid-cols-3 gap-2">
              {(['boy', 'girl', 'undisclosed'] as Gender[]).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGender(g)}
                  className={`py-1.5 text-xs font-medium rounded-lg border capitalize transition-colors ${
                    gender === g
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'
                  }`}
                >
                  {g === 'undisclosed' ? 'Surprise' : g}
                </button>
              ))}
            </div>
          </div>

          {/* Date of Event */}
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              {type === 'baby' ? 'Date of Birth' : 'Estimated Due Date (EDD)'}
            </label>
            <input
              type="date"
              required
              value={dateOfEvent}
              onChange={(e) => setDateOfEvent(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg focus:outline-hidden focus:border-stone-400"
            />
          </div>

          {/* Optional birth or pregnancy baseline stats */}
          {type === 'baby' ? (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Birth Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="e.g. 3.4"
                  value={birthWeightKg}
                  onChange={(e) => setBirthWeightKg(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg focus:outline-hidden focus:border-stone-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Birth Length (cm)
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="e.g. 50.0"
                  value={birthLengthCm}
                  onChange={(e) => setBirthLengthCm(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg focus:outline-hidden focus:border-stone-400"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Pre-pregnancy Weight (kg)
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="e.g. 60.5"
                value={prePregnancyWeightKg}
                onChange={(e) => setPrePregnancyWeightKg(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg focus:outline-hidden focus:border-stone-400"
              />
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">Notes</label>
            <input
              type="text"
              placeholder="e.g. Born at 39w2d; pediatrician name..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg focus:outline-hidden focus:border-stone-400"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg shadow-xs"
            >
              {editingProfile ? 'Save Changes' : 'Create Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
