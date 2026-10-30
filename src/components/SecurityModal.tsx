import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Unlock, 
  KeyRound, 
  X, 
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { AppSettings } from '../types';
import { translations, Language } from '../utils/translations';
import { hashPin, generateSalt } from '../utils/storage';

interface SecurityModalProps {
  settings: AppSettings;
  onUpdateSettings: (settings: AppSettings) => void;
  onClose: () => void;
  isUnlocked: boolean;
  setIsUnlocked: (unlocked: boolean) => void;
}

export const SecurityModal: React.FC<SecurityModalProps> = ({
  settings,
  onUpdateSettings,
  onClose,
  isUnlocked,
  setIsUnlocked,
}) => {
  const t = translations[settings.language];
  const [pinInput, setPinInput] = useState('');
  const [confirmPinInput, setConfirmPinInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSettingNewPin, setIsSettingNewPin] = useState(!settings.isPinEnabled);

  const handleVerifyCurrentPin = () => {
    if (!settings.pinHash || !settings.pinSalt) {
      setIsUnlocked(true);
      return;
    }

    const testHash = hashPin(pinInput, settings.pinSalt);
    if (testHash === settings.pinHash) {
      setIsUnlocked(true);
      setErrorMessage('');
      setSuccessMessage('সফলভাবে আনলক করা হয়েছে');
      setPinInput('');
      setTimeout(() => setSuccessMessage(''), 2000);
    } else {
      setErrorMessage(t.wrongPin);
    }
  };

  const handleSaveNewPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.length !== 4) {
      setErrorMessage('পিন অবশ্যই ৪ সংখ্যার হতে হবে');
      return;
    }
    if (pinInput !== confirmPinInput) {
      setErrorMessage('উভয় পিন এক নয়! আবার চেক করুন');
      return;
    }

    const salt = generateSalt();
    const hash = hashPin(pinInput, salt);

    const updated: AppSettings = {
      ...settings,
      isPinEnabled: true,
      pinSalt: salt,
      pinHash: hash,
    };

    onUpdateSettings(updated);
    setIsUnlocked(true);
    setSuccessMessage(t.pinSuccess);
    setPinInput('');
    setConfirmPinInput('');
    setIsSettingNewPin(false);
    setTimeout(() => {
      setSuccessMessage('');
      onClose();
    }, 1500);
  };

  const handleDisablePin = () => {
    if (window.confirm('আপনি কি নিশ্চিত পিন সুরক্ষা বন্ধ করতে চান?')) {
      const updated: AppSettings = {
        ...settings,
        isPinEnabled: false,
        pinSalt: undefined,
        pinHash: undefined,
      };
      onUpdateSettings(updated);
      setIsUnlocked(true);
      setSuccessMessage('পিন নিরাপত্তা বন্ধ করা হয়েছে');
      setTimeout(() => {
        setSuccessMessage('');
        onClose();
      }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-sm p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 mx-auto flex items-center justify-center mb-2 shadow-lg shadow-amber-500/10">
            <KeyRound className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">
            {settings.isPinEnabled ? t.securityTitle : t.setPin}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            ব্যক্তিগত আর্থিক হিসাব সুরক্ষিত রাখতে ৪ ডিজিট পিন
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-medium flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* If PIN is enabled and locked, show enter PIN screen */}
        {settings.isPinEnabled && !isUnlocked && !isSettingNewPin ? (
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-slate-400 text-center mb-2 font-medium">
                {t.enterPin}
              </label>
              <input
                type="password"
                maxLength={4}
                autoFocus
                value={pinInput}
                onChange={(e) => {
                  setErrorMessage('');
                  setPinInput(e.target.value.replace(/[^0-9]/g, ''));
                }}
                className="w-full text-center tracking-[1em] text-2xl font-mono font-bold bg-slate-950 border border-slate-700 rounded-xl py-3 text-white focus:outline-none focus:border-amber-500"
                placeholder="••••"
              />
            </div>

            <button
              onClick={handleVerifyCurrentPin}
              disabled={pinInput.length !== 4}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all disabled:opacity-40"
            >
              আনলক করুন
            </button>

            <div className="pt-2 text-center">
              <span className="text-[11px] text-slate-500 block">
                সল্টেড ক্রিপ্টোগ্রাফিক হ্যাশ সুরক্ষিত
              </span>
            </div>
          </div>
        ) : (
          /* Set / Change PIN Form */
          <form onSubmit={handleSaveNewPin} className="space-y-3.5">
            <div>
              <label className="block text-xs text-slate-400 mb-1">
                নতুন ৪ ডিজিট পিন লিখুন *
              </label>
              <input
                type="password"
                maxLength={4}
                required
                value={pinInput}
                onChange={(e) => {
                  setErrorMessage('');
                  setPinInput(e.target.value.replace(/[^0-9]/g, ''));
                }}
                className="w-full text-center tracking-[0.8em] text-xl font-mono font-bold bg-slate-950 border border-slate-700 rounded-xl py-2.5 text-white focus:outline-none focus:border-amber-500"
                placeholder="••••"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">
                পুনরায় পিন নিশ্চিত করুন *
              </label>
              <input
                type="password"
                maxLength={4}
                required
                value={confirmPinInput}
                onChange={(e) => {
                  setErrorMessage('');
                  setConfirmPinInput(e.target.value.replace(/[^0-9]/g, ''));
                }}
                className="w-full text-center tracking-[0.8em] text-xl font-mono font-bold bg-slate-950 border border-slate-700 rounded-xl py-2.5 text-white focus:outline-none focus:border-amber-500"
                placeholder="••••"
              />
            </div>

            <button
              type="submit"
              disabled={pinInput.length !== 4 || confirmPinInput.length !== 4}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-md disabled:opacity-40"
            >
              পিন সেট ও সক্রিয় করুন
            </button>

            {settings.isPinEnabled && (
              <button
                type="button"
                onClick={handleDisablePin}
                className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-400 font-medium text-xs transition-colors"
              >
                পিন সুরক্ষা বন্ধ করুন
              </button>
            )}
          </form>
        )}
      </div>
    </div>
  );
};
