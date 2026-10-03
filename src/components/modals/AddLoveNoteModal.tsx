import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Heart, Sparkles, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AddLoveNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultStageLabel?: string;
}

const EMOJI_OPTIONS = ['💖', '🌟', '✨', '🌱', '🧸', '🌈', '🥑', '🌙', '☀️', '🦋'];

export const AddLoveNoteModal: React.FC<AddLoveNoteModalProps> = ({
  isOpen,
  onClose,
  defaultStageLabel = 'Today',
}) => {
  const { activeProfile, addLoveNote } = useApp();

  const [author, setAuthor] = useState('Mama');
  const [stageLabel, setStageLabel] = useState(defaultStageLabel);
  const [selectedEmoji, setSelectedEmoji] = useState('💖');
  const [content, setContent] = useState('');

  if (!isOpen || !activeProfile) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    addLoveNote({
      date: new Date().toISOString().split('T')[0],
      stageLabel: stageLabel.trim(),
      author: author.trim(),
      emoji: selectedEmoji,
      content: content.trim(),
    });

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
    });

    setContent('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 dark:bg-black/75 backdrop-blur-xs">
      <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-amber-200/80 dark:border-amber-900/50 relative transition-colors">
        <div className="flex items-center justify-between pb-4 border-b border-amber-100 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <span className="text-xl">💌</span>
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-white">
                A Love Letter & Wish for {activeProfile.name}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                A keepsake memory for your child to read when they grow up.
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

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Written by
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Mama, Papa, Grandma..."
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white rounded-xl focus:outline-hidden focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Stage / Milestone
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Week 28, Month 6, First Steps"
                value={stageLabel}
                onChange={(e) => setStageLabel(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white rounded-xl focus:outline-hidden focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
              Choose an emoji seal
            </label>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {EMOJI_OPTIONS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setSelectedEmoji(emoji)}
                  className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center transition-all ${
                    selectedEmoji === emoji
                      ? 'bg-amber-100 dark:bg-amber-950/80 ring-2 ring-amber-400 dark:ring-amber-600 scale-110 shadow-xs'
                      : 'hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
              Your words, hopes & memories
            </label>
            <textarea
              rows={4}
              required
              placeholder="What made your heart swell today? What do you wish for them as they grow? Write from the heart..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white rounded-xl focus:outline-hidden focus:border-amber-400 leading-relaxed font-serif italic"
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
              className="px-4 py-2 text-xs font-semibold text-white bg-amber-800 hover:bg-amber-900 dark:bg-amber-700 dark:hover:bg-amber-600 rounded-xl shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <Heart className="w-3.5 h-3.5 fill-white" />
              <span>Save to Keepsake Capsule</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
