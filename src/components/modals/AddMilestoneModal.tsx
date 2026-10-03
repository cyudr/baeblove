import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MilestoneCategory } from '../../types';
import { CATEGORY_METADATA } from '../../data/milestonesData';
import { X, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AddMilestoneModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddMilestoneModal: React.FC<AddMilestoneModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { addCustomMilestone } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<MilestoneCategory>('movement');
  const [dateAchieved, setDateAchieved] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addCustomMilestone({
      title: title.trim(),
      category,
      dateAchieved,
      notes: notes.trim() || undefined,
    });

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 dark:bg-black/75 backdrop-blur-xs">
      <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 dark:border-stone-800 relative transition-colors">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-bold text-stone-900 dark:text-white">
              Record Custom Milestone
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
              Milestone Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. First tooth cut through, Slept 8 hours straight!"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white rounded-xl focus:outline-hidden focus:border-stone-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">Category</label>
            <div className="grid grid-cols-2 gap-2">
              {(['movement', 'language', 'cognitive', 'social'] as MilestoneCategory[]).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-colors ${
                    category === cat
                      ? 'border-stone-900 dark:border-stone-100 bg-stone-100 dark:bg-stone-800 font-bold text-stone-900 dark:text-white shadow-2xs'
                      : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-stone-300 dark:hover:border-stone-600 bg-white dark:bg-stone-900'
                  }`}
                >
                  {CATEGORY_METADATA[cat].label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
              Date Achieved
            </label>
            <input
              type="date"
              required
              value={dateAchieved}
              onChange={(e) => setDateAchieved(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white rounded-xl focus:outline-hidden focus:border-stone-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
              Memories & Details (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="How did they do it? Who was there? Any funny reaction?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white rounded-xl focus:outline-hidden focus:border-stone-400"
            ></textarea>
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
              Celebrate & Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
