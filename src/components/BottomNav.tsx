import React from 'react';
import { 
  LayoutDashboard, 
  ArrowUpRight, 
  ArrowDownLeft, 
  ReceiptText, 
  Layers 
} from 'lucide-react';
import { translations, Language } from '../utils/translations';

export type TabKey = 'dashboard' | 'income' | 'expense' | 'voucher' | 'more';

interface BottomNavProps {
  currentTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
  lang: Language;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab, lang }) => {
  const t = translations[lang];

  const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    {
      key: 'dashboard',
      label: t.dashboard,
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      key: 'income',
      label: t.income,
      icon: <ArrowUpRight className="w-5 h-5" />,
    },
    {
      key: 'expense',
      label: t.expense,
      icon: <ArrowDownLeft className="w-5 h-5" />,
    },
    {
      key: 'voucher',
      label: t.voucher,
      icon: <ReceiptText className="w-5 h-5" />,
    },
    {
      key: 'more',
      label: t.more,
      icon: <Layers className="w-5 h-5" />,
    },
  ];

  return (
    <nav className="no-print fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 border-t border-slate-800/80 backdrop-blur-lg">
      <div className="max-w-md mx-auto grid grid-cols-5 h-16 items-center px-1">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => onSelectTab(tab.key)}
              className={`min-h-[48px] min-w-[48px] flex flex-col items-center justify-center transition-all ${
                isActive
                  ? 'text-amber-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div
                className={`p-1 rounded-xl transition-all ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-400 shadow-sm shadow-amber-500/10'
                    : 'text-slate-400'
                }`}
              >
                {tab.icon}
              </div>
              <span className="text-[11px] leading-tight tracking-tight mt-0.5 whitespace-nowrap">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
