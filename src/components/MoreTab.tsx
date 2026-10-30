import React from 'react';
import { 
  User, 
  Truck, 
  BatteryCharging, 
  Wrench, 
  BarChart3, 
  Database, 
  Lock, 
  Smartphone, 
  Info, 
  ChevronRight, 
  Globe, 
  Moon, 
  Sun,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { translations, Language } from '../utils/translations';
import { AppSettings, OwnerProfile, VehicleProfile } from '../types';

interface MoreTabProps {
  settings: AppSettings;
  owner: OwnerProfile;
  vehicle: VehicleProfile;
  lang: Language;
  onOpenProfile: () => void;
  onNavigateToSubTab: (tab: 'battery' | 'maintenance' | 'reports') => void;
  onOpenBackup: () => void;
  onOpenSecurity: () => void;
  onOpenAndroidHub: () => void;
  onUpdateSettings: (settings: AppSettings) => void;
}

interface MenuItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  action: () => void;
  highlight?: boolean;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

export const MoreTab: React.FC<MoreTabProps> = ({
  settings,
  owner,
  vehicle,
  lang,
  onOpenProfile,
  onNavigateToSubTab,
  onOpenBackup,
  onOpenSecurity,
  onOpenAndroidHub,
  onUpdateSettings,
}) => {
  const t = translations[lang];

  const menuSections: MenuSection[] = [
    {
      title: lang === 'bn' ? 'গাড়ি ও স্বত্বাধিকারী' : 'Profiles',
      items: [
        {
          id: 'profile',
          icon: <User className="w-5 h-5 text-amber-400" />,
          title: t.ownerTitle + ' ও ' + t.vehicleTitle,
          subtitle: `${owner.name} · ${vehicle.name} (${vehicle.registrationNumber})`,
          action: onOpenProfile,
        },
      ],
    },
    {
      title: lang === 'bn' ? 'অটো রক্ষণাবেক্ষণ ও ট্র্যাকার' : 'Management & Trackers',
      items: [
        {
          id: 'battery',
          icon: <BatteryCharging className="w-5 h-5 text-amber-400" />,
          title: t.batteryTitle,
          subtitle: `${vehicle.batteryVoltage} · চার্জিং খরচ ও ব্যাটারি সাইকেল ট্র্যাকার`,
          action: () => onNavigateToSubTab('battery'),
        },
        {
          id: 'maintenance',
          icon: <Wrench className="w-5 h-5 text-amber-400" />,
          title: t.maintenanceTitle,
          subtitle: 'সার্ভিসিং হিস্ট্রি, যন্ত্রাংশ পরিবর্তন ও ওয়ার্কশপ লগ',
          action: () => onNavigateToSubTab('maintenance'),
        },
        {
          id: 'reports',
          icon: <BarChart3 className="w-5 h-5 text-amber-400" />,
          title: t.reportsTitle,
          subtitle: 'দৈনিক, সাপ্তাহিক, মাসিক ব্যালেন্স শিট ও CSV এক্সেল এক্সপোর্ট',
          action: () => onNavigateToSubTab('reports'),
        },
      ],
    },
    {
      title: lang === 'bn' ? 'নিরাপত্তা ও ব্যাকআপ' : 'Security & Backup',
      items: [
        {
          id: 'backup',
          icon: <Database className="w-5 h-5 text-emerald-400" />,
          title: t.backupTitle,
          subtitle: '১০০% লোকাল JSON ফাইল ব্যাকআপ ও রিস্টোর (নো ক্লাউড)',
          action: onOpenBackup,
        },
        {
          id: 'security',
          icon: <Lock className="w-5 h-5 text-amber-400" />,
          title: t.securityTitle,
          subtitle: settings.isPinEnabled ? '৪ ডিজিট পিন লক সক্রিয়' : 'পিন লক সেট করুন',
          action: onOpenSecurity,
        },
      ],
    },
    {
      title: lang === 'bn' ? 'অ্যান্ড্রয়েড প্রজেক্ট ও এপিকে' : 'Android Project & APK',
      items: [
        {
          id: 'android-hub',
          icon: <Smartphone className="w-5 h-5 text-amber-400" />,
          title: t.androidHubTitle,
          subtitle: 'সম্পূর্ণ Android Kotlin DSL সোর্স কোড (.ZIP) ও গিটহাব বিল্ড গাইড',
          action: onOpenAndroidHub,
          highlight: true,
        },
      ],
    },
  ];

  return (
    <div className="space-y-6 pb-24">
      {/* Mini Profile Card */}
      <div 
        onClick={onOpenProfile}
        className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 rounded-2xl p-4 border border-amber-500/20 shadow-md cursor-pointer hover:border-amber-500/40 transition-colors flex items-center justify-between gap-3"
      >
        <div className="flex items-center gap-3">
          <img
            src={owner.photoUrl}
            alt={owner.name}
            referrerPolicy="no-referrer"
            className="w-14 h-14 rounded-full object-cover border-2 border-amber-400/50 shadow-md bg-slate-800"
          />
          <div>
            <h3 className="text-base font-bold text-white">{owner.name}</h3>
            <p className="text-xs text-amber-300/90 font-medium">
              {vehicle.name} · {vehicle.manufacturer}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {owner.village}, {owner.postOffice}, {owner.policeStation}
            </p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-400" />
      </div>

      {/* Menu Sections */}
      {menuSections.map((section, idx) => (
        <div key={idx} className="space-y-2">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
            {section.title}
          </h4>
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 divide-y divide-slate-800/80 overflow-hidden shadow-sm">
            {section.items.map((item) => (
              <button
                key={item.id}
                onClick={item.action}
                className={`w-full p-3.5 flex items-center justify-between gap-3 text-left transition-colors hover:bg-slate-800/40 ${
                  item.highlight ? 'bg-amber-500/5' : ''
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 shrink-0">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs sm:text-sm font-semibold text-slate-200 block truncate">
                      {item.title}
                    </span>
                    <span className="text-[11px] text-slate-400 block truncate mt-0.5">
                      {item.subtitle}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* System Information & Guarantee */}
      <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-800/80 text-xs text-slate-400 space-y-2">
        <div className="flex items-center gap-2 text-slate-300 font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>১০০% অফলাইন ও ব্যক্তিগত অ্যাপ্লিকেশন নিশ্চয়তা</span>
        </div>
        <p className="text-[11px] leading-relaxed text-slate-400">
          এই অ্যাপটি সম্পূর্ণ ইন্টারনেট ছাড়া বিমান মোডেও (Airplane Mode) কাজ করে। আপনার কোনো আর্থিক হিসাব বা ব্যক্তিগত তথ্য সার্ভারে পাঠানো হয় না। সমস্ত তথ্য আপনার ডিভাইসে সুরক্ষিতভাবে সংরক্ষিত থাকে।
        </p>
        <div className="pt-2 border-t border-slate-800 flex justify-between text-[11px] text-slate-500 font-mono">
          <span>অ্যাপ সংস্করণ: ১.০.০ (কোটলিন + কম্পোজ)</span>
          <span>আইডি: com.salam.sandi</span>
        </div>
      </div>
    </div>
  );
};
