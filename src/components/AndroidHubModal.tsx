import React, { useState } from 'react';
import { 
  Smartphone, 
  Download, 
  GitBranch, 
  CheckCircle2, 
  FileCode, 
  ExternalLink, 
  Copy, 
  Layers, 
  Terminal, 
  X,
  Sparkles,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { translations, Language } from '../utils/translations';
import { generateAndDownloadAndroidZip } from '../utils/zipGenerator';
import { ANDROID_PROJECT_FILES } from '../android-source/files';

interface AndroidHubModalProps {
  lang: Language;
  onClose: () => void;
}

export const AndroidHubModal: React.FC<AndroidHubModalProps> = ({ lang, onClose }) => {
  const t = translations[lang];
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [selectedFileIdx, setSelectedFileIdx] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleDownloadZip = async () => {
    setIsDownloading(true);
    const success = await generateAndDownloadAndroidZip();
    setIsDownloading(false);
    if (success) {
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 5000);
    }
  };

  const currentFile = ANDROID_PROJECT_FILES[selectedFileIdx];

  const handleCopyCode = () => {
    if (!currentFile) return;
    navigator.clipboard.writeText(currentFile.content);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl p-5 sm:p-6 shadow-2xl relative my-6 max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-slate-950 font-bold shadow-md shadow-amber-500/20">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span>{t.androidHubTitle}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30">
                  com.salam.sandi
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                কম্পিউটার ছাড়াই মোবাইল ও গিটহাব অ্যাকশনস দিয়ে নেটিভ APK তৈরির ১০০% কমপ্লিট সোর্স
              </p>
            </div>
          </div>

          {/* 1-Click ZIP Download Button */}
          <button
            onClick={handleDownloadZip}
            disabled={isDownloading}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/25 transition-all active:scale-95 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>
              {isDownloading ? 'জিপ তৈরি হচ্ছে...' : t.downloadAndroidZip}
            </span>
          </button>
        </div>

        {downloadSuccess && (
          <div className="mt-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium flex items-center gap-2 animate-fade-in shrink-0">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>
              'SANDI-Daily-Hisab-Android-Source.zip' ফাইলটি আপনার ফোনে ডাউনলোড শুরু হয়েছে!
            </span>
          </div>
        )}

        {/* Main Body: 2 Columns on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-4 overflow-y-auto flex-1 pr-1">
          {/* Left Column: Step-by-Step GitHub Actions Guide (5 cols) */}
          <div className="lg:col-span-5 space-y-3 text-xs">
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-amber-400" />
                <span>মোবাইল থেকেই APK বিল্ড করার ৪ ধাপ:</span>
              </h3>

              <div className="space-y-3">
                <div className="flex gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0 font-mono text-[11px]">
                    ১
                  </span>
                  <div>
                    <strong className="text-slate-200 block">জিপ ফাইল ডাউনলোড করুন</strong>
                    <span className="text-slate-400 text-[11px] block mt-0.5">
                      উপরের হলুদ বাটনে চাপ দিয়ে সম্পূর্ণ অ্যান্ড্রয়েড সোর্স কোড ডাউনলোড করুন।
                    </span>
                  </div>
                </div>

                <div className="flex gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0 font-mono text-[11px]">
                    ২
                  </span>
                  <div>
                    <strong className="text-slate-200 block">গিটহাবে রিপোজিটরি তৈরি করুন</strong>
                    <span className="text-slate-400 text-[11px] block mt-0.5">
                      ফোনের ব্রাউজারে github.com এ গিয়ে নতুন রিপোজিটরি খুলুন এবং ডাউনলোডকৃত জিপের ফাইলগুলো আপলোড করুন।
                    </span>
                  </div>
                </div>

                <div className="flex gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0 font-mono text-[11px]">
                    ৩
                  </span>
                  <div>
                    <strong className="text-slate-200 block">Actions থেকে রান দিন</strong>
                    <span className="text-slate-400 text-[11px] block mt-0.5">
                      রিপোজিটরির 'Actions' ট্যাবে গিয়ে "Build SANDI Debug APK" ওয়ার্কফ্লোটিতে 'Run workflow' চাপুন।
                    </span>
                  </div>
                </div>

                <div className="flex gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0 font-mono text-[11px]">
                    ৪
                  </span>
                  <div>
                    <strong className="text-slate-200 block">APK ডাউনলোড ও ইনস্টল</strong>
                    <span className="text-slate-400 text-[11px] block mt-0.5">
                      বিল্ড সফল হলে রিপোজিটরির <strong>Releases</strong> সেকশন অথবা অ্যাকশনস সামারির ডিরেক্ট লিংক থেকে <strong className="text-amber-400">SANDI-Daily-Hisab-Debug.apk</strong> সরাসরি ফোনে ডাউনলোড করে ইনস্টল করে নিন (স্টোরেজ কোটার কোনো ঝামেলা নেই!)।
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Architecture Highlights */}
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                অ্যান্ড্রয়েড আর্কিটেকচার স্পেকস:
              </h4>
              <ul className="space-y-1.5 text-slate-400 text-[11px]">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span><strong>Room Database:</strong> অফলাইন SQLite লোকাল ডাটাবেজ</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span><strong>Jetpack Compose:</strong> মেটেরিয়াল ৩ আধুনিক ইউআই</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span><strong>Android PDF API:</strong> A4 ও POS ভাউচার তৈরির ইঞ্জিন</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span><strong>Zero Internet:</strong> কোনো ক্লাউড পারমিশন প্রয়োজন নেই</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Code File Browser (7 cols) */}
          <div className="lg:col-span-7 bg-slate-950 rounded-xl border border-slate-800 flex flex-col overflow-hidden">
            {/* File Selector Tabs */}
            <div className="flex items-center justify-between p-2.5 bg-slate-900 border-b border-slate-800">
              <div className="flex items-center gap-1 overflow-x-auto text-xs py-0.5">
                {ANDROID_PROJECT_FILES.map((file, idx) => {
                  const shortName = file.path.split('/').pop();
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedFileIdx(idx)}
                      className={`px-2.5 py-1 rounded-lg font-mono text-[11px] whitespace-nowrap transition-colors ${
                        selectedFileIdx === idx
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'text-slate-400 hover:text-slate-200 bg-slate-800/60'
                      }`}
                    >
                      {shortName}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleCopyCode}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors shrink-0 ml-2"
                title="Copy file content"
              >
                {copiedCode ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* File Path Label */}
            <div className="px-3 py-1.5 bg-slate-900/50 border-b border-slate-800/80 text-[11px] font-mono text-amber-400/90 truncate">
              {currentFile?.path}
            </div>

            {/* Code Content Box */}
            <pre className="p-3 text-[11px] font-mono text-slate-300 overflow-x-auto overflow-y-auto max-h-80 leading-relaxed select-all">
              {currentFile?.content}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
