import React from 'react';
import { 
  Zap, 
  Lock, 
  Unlock, 
  Download, 
  Languages, 
  Sun, 
  Moon,
  Smartphone
} from 'lucide-react';
import { translations, Language } from '../utils/translations';
import { AppSettings } from '../types';

interface HeaderProps {
  settings: AppSettings;
  onUpdateSettings: (newSettings: AppSettings) => void;
  onOpenAndroidHub: () => void;
  onOpenSecurity: () => void;
  isLocked: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  onUpdateSettings,
  onOpenAndroidHub,
  onOpenSecurity,
  isLocked,
}) => {
  const t = translations[settings.language];

  const toggleLanguage = () => {
    const nextLang: Language = settings.language === 'bn' ? 'en' : 'bn';
    onUpdateSettings({ ...settings, language: nextLang });
  };

  const toggleTheme = () => {
    const nextTheme = settings.theme === 'dark' ? 'light' : 'dark';
    onUpdateSettings({ ...settings, theme: nextTheme });
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <header className="no-print sticky top-0 z-30 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-amber-500/20 px-4 py-3 text-slate-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/20 font-black">
            <Zap className="w-5 h-5 fill-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-bold tracking-tight text-white font-sans">
                SANDI
              </span>
              <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30">
                DAILY HISAB
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-normal hidden sm:block">
              {t.appSubtitle} · আব্দুছ ছালাম
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Android APK Hub Button */}
          <button
            onClick={onOpenAndroidHub}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-xs transition-all shadow-sm shadow-amber-500/20 active:scale-95"
            title="Download Android Source / APK Guide"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Android APK</span>
            <Download className="w-3.5 h-3.5" />
          </button>

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/60 text-xs font-medium transition-colors"
            title="Switch Language (বাংলা / English)"
          >
            <Languages className="w-3.5 h-3.5 text-amber-400" />
            <span>{settings.language === 'bn' ? 'বাং' : 'EN'}</span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/60 transition-colors"
            title="Toggle Dark / Light Theme"
          >
            {settings.theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-300" />
            )}
          </button>

          {/* PIN Lock Trigger */}
          <button
            onClick={onOpenSecurity}
            className={`p-1.5 rounded-lg border transition-colors ${
              settings.isPinEnabled
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                : 'bg-slate-800/80 border-slate-700/60 text-slate-400 hover:text-slate-200'
            }`}
            title="Security PIN Settings"
          >
            {isLocked ? (
              <Lock className="w-4 h-4 text-amber-400" />
            ) : (
              <Unlock className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
