import React, { useState, useRef } from 'react';
import { 
  Download, 
  Upload, 
  Database, 
  ShieldCheck, 
  X, 
  AlertTriangle, 
  CheckCircle2, 
  FileText 
} from 'lucide-react';
import { BackupData } from '../types';
import { translations, Language, formatNumber } from '../utils/translations';
import { SandiStorage, getTodayDate } from '../utils/storage';

interface BackupModalProps {
  lang: Language;
  onRestoreCompleted: () => void;
  onClose: () => void;
}

export const BackupModal: React.FC<BackupModalProps> = ({
  lang,
  onRestoreCompleted,
  onClose,
}) => {
  const t = translations[lang];
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [previewBackup, setPreviewBackup] = useState<BackupData | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleExportBackup = () => {
    const backup = SandiStorage.createFullBackup();
    const jsonStr = JSON.stringify(backup, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SANDI_Daily_Hisab_Backup_${getTodayDate()}.json`;
    link.click();
    URL.revokeObjectURL(url);

    setSuccessMessage('ব্যাকআপ ফাইল সফলভাবে ডাউনলোড হয়েছে');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('');
    setSuccessMessage('');
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (!parsed.version || !parsed.incomes || !parsed.expenses) {
          throw new Error('অকার্যকর ব্যাকআপ ফাইল');
        }
        setPreviewBackup(parsed);
      } catch (err) {
        setErrorMessage('ফাইলটি সঠিক SANDI ব্যাকআপ JSON ফরম্যাটে নেই');
        setPreviewBackup(null);
      }
    };
    reader.readAsText(file);
  };

  const handleConfirmRestore = () => {
    if (!previewBackup) return;
    if (window.confirm('আপনি কি নিশ্চিত এই ব্যাকআপ ফাইলটি থেকে সকল ডাটা রিস্টোর করতে চান?')) {
      const res = SandiStorage.restoreFullBackup(previewBackup);
      if (res.success) {
        setSuccessMessage(res.message);
        setTimeout(() => {
          onRestoreCompleted();
          onClose();
        }, 1500);
      } else {
        setErrorMessage(res.message);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              {t.backupTitle}
            </h3>
            <p className="text-xs text-slate-400">
              ১০০% অফলাইন ব্যক্তিগত ব্যাকআপ · নো ক্লাউড · সম্পূর্ণ সুরক্ষিত
            </p>
          </div>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-medium flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        <div className="space-y-4 text-xs sm:text-sm">
          {/* Export Section */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <h4 className="font-bold text-slate-200 flex items-center gap-2">
              <Download className="w-4 h-4 text-emerald-400" />
              <span>{t.exportBackup}</span>
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              আপনার সমস্ত আয়, ব্যয়, ভাউচার, ব্যাটারি ও সার্ভিসিং হিস্ট্রি একটি একক JSON ফাইলে ডাউনলোড করে সংরক্ষণ করুন।
            </p>
            <button
              onClick={handleExportBackup}
              className="mt-3 flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-md active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>ব্যাকআপ ফাইল ডাউনলোড করুন (.json)</span>
            </button>
          </div>

          {/* Import / Restore Section */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <h4 className="font-bold text-slate-200 flex items-center gap-2">
              <Upload className="w-4 h-4 text-amber-400" />
              <span>{t.importBackup}</span>
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              পূর্বে সেভ করা SANDI ব্যাকআপ JSON ফাইল সিলেক্ট করে ডাটা রিস্টোর করুন।
            </p>

            <input
              type="file"
              ref={fileInputRef}
              accept=".json,application/json"
              onChange={handleFileChange}
              className="hidden"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="mt-3 flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition-colors"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>ব্যাকআপ ফাইল নির্বাচন করুন</span>
            </button>

            {/* Preview Selected File */}
            {previewBackup && (
              <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs space-y-2">
                <div className="font-bold text-amber-400">
                  ব্যাকআপ ফাইল প্রিভিউ (ভার্সন {previewBackup.version}):
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-300 font-mono">
                  <div>আয় রেকর্ড: {formatNumber(previewBackup.incomes?.length || 0, lang)} টি</div>
                  <div>ব্যয় রেকর্ড: {formatNumber(previewBackup.expenses?.length || 0, lang)} টি</div>
                  <div>ভাউচার: {formatNumber(previewBackup.vouchers?.length || 0, lang)} টি</div>
                  <div>ব্যাটারি লগ: {formatNumber(previewBackup.batteryRecords?.length || 0, lang)} টি</div>
                </div>
                <div className="text-[11px] text-slate-400">
                  রপ্তানি তারিখ: {previewBackup.exportDate?.split('T')[0]} · মালিক: {previewBackup.ownerProfile?.name}
                </div>

                <button
                  onClick={handleConfirmRestore}
                  className="w-full mt-2 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all"
                >
                  ডাটাবেজে রিস্টোর সম্পন্ন করুন
                </button>
              </div>
            )}
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
            <span className="font-bold text-amber-400 block mb-0.5">গুরুত্বপূর্ণ সতর্কতা:</span>
            {t.backupNote} কোনো কারণে ফোন পরিবর্তন বা রিসেট করার আগে অবশ্যই ব্যাকআপ ফাইলটি আপনার অন্য ফোনে বা পেনড্রাইভে কপি করে রাখুন।
          </div>
        </div>
      </div>
    </div>
  );
};
