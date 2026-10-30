import React, { useState, useEffect } from 'react';
import { 
  Printer, 
  Share2, 
  BookmarkCheck, 
  Receipt, 
  FileText, 
  Calendar, 
  CreditCard,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Wallet,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { 
  DailyVoucherItem, 
  IncomeItem, 
  ExpenseItem, 
  OwnerProfile, 
  VehicleProfile 
} from '../types';
import { 
  translations, 
  Language, 
  formatCurrency, 
  numberToWordsBn, 
  numberToWordsEn,
  formatNumber 
} from '../utils/translations';
import { SandiStorage, getTodayDate, getCurrentTime } from '../utils/storage';

interface VoucherTabProps {
  vouchers: DailyVoucherItem[];
  incomes: IncomeItem[];
  expenses: ExpenseItem[];
  owner: OwnerProfile;
  vehicle: VehicleProfile;
  lang: Language;
  onSaveVoucher: (voucher: DailyVoucherItem) => void;
  selectedDate?: string;
}

export const VoucherTab: React.FC<VoucherTabProps> = ({
  vouchers,
  incomes,
  expenses,
  owner,
  vehicle,
  lang,
  onSaveVoucher,
  selectedDate: initialSelectedDate,
}) => {
  const t = translations[lang];
  const today = getTodayDate();
  const [currentDate, setCurrentDate] = useState<string>(initialSelectedDate || today);
  const [voucherStyle, setVoucherStyle] = useState<'POS' | 'A4'>('POS');
  const [copiedNotification, setCopiedNotification] = useState(false);

  // When incomes/expenses/date changes, generate or sync the single Daily Master Voucher for that day
  const activeDailyVoucher: DailyVoucherItem = React.useMemo(() => {
    return SandiStorage.getDailyVoucherForDate(
      currentDate,
      incomes,
      expenses,
      owner,
      vehicle
    );
  }, [currentDate, incomes, expenses, owner, vehicle]);

  // List of all active dates in the last 30 days
  const activeDates = React.useMemo(() => {
    return SandiStorage.getRecentTransactionDates(incomes, expenses);
  }, [incomes, expenses]);

  const handlePrint = () => {
    window.print();
  };

  const handleSaveToHistory = () => {
    onSaveVoucher(activeDailyVoucher);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  const handleShare = () => {
    const netTaka = activeDailyVoucher.netProfitPoisha / 100;
    const shareText = `SANDI AUTO EASY BIKE - দৈনিক হিসাব ভাউচার #${activeDailyVoucher.voucherNumber}
তারিখ: ${activeDailyVoucher.date}
মালিক: ${owner.name} (${owner.mobile1})
গাড়ি: ${vehicle.name} (রেজি: ${vehicle.registrationNumber})
সারাদিনের মোট আয়: ${formatCurrency(activeDailyVoucher.totalIncomePoisha, lang)}
সারাদিনের মোট ব্যয়: ${formatCurrency(activeDailyVoucher.totalExpensePoisha, lang)}
সারাদিনের নিট লাভ / জমা: ${formatCurrency(activeDailyVoucher.netProfitPoisha, lang)}
কথায়: ${numberToWordsBn(netTaka)}`;

    if (navigator.share) {
      navigator.share({
        title: `SANDI Daily Voucher ${activeDailyVoucher.voucherNumber}`,
        text: shareText,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareText);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2500);
    }
  };

  const netTaka = Math.abs(activeDailyVoucher.netProfitPoisha / 100);
  const amountInWords = lang === 'bn' ? numberToWordsBn(netTaka) : numberToWordsEn(netTaka);

  const getCategoryLabel = (cat: string) => (t as Record<string, string>)[cat] || cat;
  const getPaymentLabel = (pm: string) => (t as Record<string, string>)[pm] || pm;

  return (
    <div className="space-y-6 pb-24">
      {/* Top Header & Day Selector */}
      <div className="no-print bg-slate-900/90 rounded-2xl p-4 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
                <Receipt className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-100">
                  সারাদিনের দৈনিক সম্মিলিত ভাউচার
                </h2>
                <p className="text-xs text-slate-400">
                  ১টি ভাউচারেই সারাদিনের মোট আয় ও ব্যয় হিসাব · ৩০ দিনে ৩০টি ভাউচার
                </p>
              </div>
            </div>
          </div>

          {/* Quick Date Switcher Controls */}
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={currentDate}
              onChange={(e) => e.target.value && setCurrentDate(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500 font-mono"
            />
            {currentDate !== today && (
              <button
                onClick={() => setCurrentDate(today)}
                className="px-2.5 py-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-semibold"
              >
                আজ
              </button>
            )}
          </div>
        </div>

        {/* 30 Days Date Carousel / Tabs */}
        <div className="pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>তারিখ নির্বাচন করুন (মাসের ভাউচার সমূহ):</span>
            </span>
            <span className="text-[11px] font-mono text-amber-400">
              ভাউচার নং: {activeDailyVoucher.voucherNumber}
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {activeDates.map((dateStr) => {
              const isSelected = currentDate === dateStr;
              const isToday = dateStr === today;
              const d = new Date(dateStr);
              const label = `${d.getDate()} ${d.toLocaleString(lang === 'bn' ? 'bn-BD' : 'en-US', { month: 'short' })}`;

              return (
                <button
                  key={dateStr}
                  onClick={() => setCurrentDate(dateStr)}
                  className={`px-3 py-1.5 rounded-xl border whitespace-nowrap font-medium transition-all flex flex-col items-center ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold shadow-md shadow-amber-500/20'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <span className="text-xs">{label}</span>
                  <span className="text-[10px] font-mono opacity-80">
                    {isToday ? (lang === 'bn' ? 'আজ' : 'Today') : dateStr.substring(5)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Format Selector: POS Thermal Slip vs A4 Invoice */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">ভাউচার স্টাইল:</span>
            <div className="flex items-center gap-1 p-0.5 bg-slate-950 rounded-lg border border-slate-800">
              <button
                onClick={() => setVoucherStyle('POS')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors flex items-center gap-1 ${
                  voucherStyle === 'POS'
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Receipt className="w-3.5 h-3.5" />
                <span>{t.receiptStyle}</span>
              </button>
              <button
                onClick={() => setVoucherStyle('A4')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors flex items-center gap-1 ${
                  voucherStyle === 'A4'
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{t.a4Style}</span>
              </button>
            </div>
          </div>

          {/* Action Buttons: Print, Save, Share */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>{t.printVoucher}</span>
            </button>
            <button
              onClick={handleSaveToHistory}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition-all active:scale-95"
              title="Save snapshot to voucher history"
            >
              <BookmarkCheck className="w-4 h-4 text-amber-400" />
              <span>সংরক্ষণ</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition-all active:scale-95"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">শেয়ার</span>
            </button>
          </div>
        </div>

        {copiedNotification && (
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>ভাউচারটি সফলভাবে সেভ হয়েছে এবং সারাদিনের হিসাব কপি হয়েছে!</span>
          </div>
        )}
      </div>

      {/* =========================================================================
          LIVE VOUCHER PREVIEW CONTAINER (POS SLIP vs A4 INVOICE)
          ========================================================================= */}
      <div className="flex justify-center">
        {voucherStyle === 'POS' ? (
          /* =====================================================================
             1. POS SUPERMARKET / THERMAL RECEIPT STYLE (Both Income + Expense)
             ===================================================================== */
          <div className="w-full max-w-md bg-white text-slate-900 font-mono p-5 sm:p-6 rounded-3xl shadow-2xl border border-slate-300 relative print:p-0 print:border-none print:shadow-none print:max-w-none print:w-full">
            {/* Header */}
            <div className="text-center pb-3 border-b-2 border-dashed border-slate-400">
              <div className="flex justify-center mb-2">
                <img
                  src={vehicle.photoUrl}
                  alt={vehicle.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-xl object-cover border border-slate-400 shadow-sm"
                />
              </div>

              <h1 className="text-xl font-black tracking-wider uppercase text-slate-950 font-sans">
                SANDI AUTO EASY BIKE
              </h1>
              <p className="text-[11px] text-slate-700 font-sans font-medium mt-0.5">
                Sandi Company · Passenger Electric Easy Bike
              </p>
              <p className="text-[10px] text-slate-600 mt-0.5">
                রেজিস্ট্রেশন: {vehicle.registrationNumber}
              </p>

              {/* Owner Info */}
              <div className="mt-2 text-[11px] leading-tight text-slate-800 font-sans">
                <p className="font-bold text-slate-950 text-xs">{owner.name}</p>
                <p>{owner.village}, {owner.postOffice}, {owner.policeStation}, {owner.district}</p>
                <p className="font-semibold text-slate-950 mt-0.5">
                  মোবাইল: {owner.mobile1} {owner.mobile2 ? `· ${owner.mobile2}` : ''}
                </p>
              </div>
            </div>

            {/* Voucher Meta */}
            <div className="py-2.5 border-b border-dashed border-slate-400 text-[11px] space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-600">ভাউচার নম্বর:</span>
                <span className="font-bold text-slate-950 tracking-wider">
                  {activeDailyVoucher.voucherNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">হিসাবের তারিখ:</span>
                <span className="font-bold text-slate-900">{activeDailyVoucher.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">ভাউচার টাইপ:</span>
                <span className="font-bold text-slate-900">সারাদিনের দৈনিক হিসাব</span>
              </div>
            </div>

            {/* SECTION 1: INCOMES (সারাদিনের মোট আয়) */}
            <div className="py-3 border-b border-dashed border-slate-400">
              <div className="flex items-center justify-between font-sans font-bold text-xs text-emerald-800 mb-2">
                <span className="flex items-center gap-1">
                  <span>● সারাদিনের আয় (INCOME):</span>
                </span>
                <span>{activeDailyVoucher.incomes.length} টি ট্রিপ</span>
              </div>

              {activeDailyVoucher.incomes.length === 0 ? (
                <p className="text-[11px] text-slate-500 italic py-1">এই দিনে কোনো আয় রেকর্ড নেই</p>
              ) : (
                <div className="space-y-1.5 text-xs">
                  {activeDailyVoucher.incomes.map((inc, i) => (
                    <div key={inc.id || i} className="flex justify-between items-start gap-2">
                      <div className="min-w-0 flex-1">
                        <span className="font-medium text-slate-900 font-sans block text-[11px] leading-tight">
                          {inc.tripDescription}
                        </span>
                        <span className="text-[10px] text-slate-600 font-sans block">
                          {inc.time} · {getPaymentLabel(inc.paymentMethod)}
                        </span>
                      </div>
                      <span className="font-bold text-slate-950 font-mono text-[11px] shrink-0">
                        +{formatCurrency(inc.amountPoisha, lang)}
                      </span>
                    </div>
                  ))}

                  {/* Subtotal Income */}
                  <div className="pt-2 mt-1 border-t border-dotted border-slate-300 flex justify-between font-bold text-xs text-emerald-900">
                    <span>সারাদিনের মোট আয়:</span>
                    <span className="text-sm">
                      {formatCurrency(activeDailyVoucher.totalIncomePoisha, lang)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* SECTION 2: EXPENSES (সারাদিনের মোট ব্যয়) */}
            <div className="py-3 border-b-2 border-dashed border-slate-400">
              <div className="flex items-center justify-between font-sans font-bold text-xs text-rose-800 mb-2">
                <span>● সারাদিনের ব্যয় (EXPENSE):</span>
                <span>{activeDailyVoucher.expenses.length} টি খরচ</span>
              </div>

              {activeDailyVoucher.expenses.length === 0 ? (
                <p className="text-[11px] text-slate-500 italic py-1">এই দিনে কোনো খরচ রেকর্ড নেই</p>
              ) : (
                <div className="space-y-1.5 text-xs">
                  {activeDailyVoucher.expenses.map((exp, i) => (
                    <div key={exp.id || i} className="flex justify-between items-start gap-2">
                      <div className="min-w-0 flex-1">
                        <span className="font-medium text-slate-900 font-sans block text-[11px] leading-tight">
                          {exp.description}
                        </span>
                        <span className="text-[10px] text-slate-600 font-sans block">
                          {exp.vendorName} · {getPaymentLabel(exp.paymentMethod)}
                        </span>
                      </div>
                      <span className="font-bold text-rose-800 font-mono text-[11px] shrink-0">
                        -{formatCurrency(exp.amountPoisha, lang)}
                      </span>
                    </div>
                  ))}

                  {/* Subtotal Expense */}
                  <div className="pt-2 mt-1 border-t border-dotted border-slate-300 flex justify-between font-bold text-xs text-rose-900">
                    <span>সারাদিনের মোট ব্যয়:</span>
                    <span className="text-sm">
                      {formatCurrency(activeDailyVoucher.totalExpensePoisha, lang)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* SECTION 3: DAILY NET CASH / PROFIT (সারাদিনের নিট লাভ / হাতে জমা) */}
            <div className="py-3 bg-slate-100 p-3 rounded-xl border border-slate-300 my-3">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-slate-800 text-xs font-sans">
                  সারাদিনের নিট লাভ / জমা:
                </span>
                <span className={`text-xl font-black font-mono tracking-tight ${
                  activeDailyVoucher.netProfitPoisha >= 0 ? 'text-slate-950' : 'text-rose-700'
                }`}>
                  {formatCurrency(activeDailyVoucher.netProfitPoisha, lang)}
                </span>
              </div>
              <div className="text-[11px] font-sans text-slate-700 mt-1.5 pt-1.5 border-t border-slate-200">
                <span className="font-semibold">কথায়: </span>
                <span>{amountInWords}</span>
              </div>
            </div>

            {/* SECTION 4: CLEAN SIGNATURE & FOOTER */}
            <div className="pt-2 text-center space-y-2">
              <div className="flex flex-col items-center justify-center">
                {/* Transparent Clean Signature with NO paper background */}
                <div className="h-14 w-44 flex items-center justify-center mb-1">
                  <img
                    src="/public/assets/aistudio/salam_signature_clean.png"
                    alt="মালিকের স্বাক্ষর"
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="w-40 border-t border-slate-400"></div>
                <span className="text-[11px] text-slate-700 font-sans font-bold mt-0.5">
                  {owner.name} (স্বত্বাধিকারী)
                </span>
              </div>

              {/* Barcode representation */}
              <div className="flex justify-center items-center gap-0.5 h-6 py-1 px-4 bg-slate-50 rounded">
                {[3,1,4,2,5,1,3,4,2,5,1,3,2,4,1,5,3,2,4,1,5,2,4,1,3,2,5,1,4,2].map((w, idx) => (
                  <div key={idx} style={{ width: `${w}px` }} className="h-full bg-slate-900"></div>
                ))}
              </div>
              <div className="text-[9px] text-slate-500 font-mono tracking-widest">
                *{activeDailyVoucher.voucherNumber}*
              </div>

              <p className="text-[10px] text-slate-700 font-sans italic">
                {t.thankYou}
              </p>
              <p className="text-[9px] text-slate-500">
                Sandi Company · ১০০% অফলাইন দৈনিক হিসাব ভাউচার · {getCurrentTime()}
              </p>
            </div>
          </div>
        ) : (
          /* =====================================================================
             2. A4 PROFESSIONAL INVOICE FORMAT (Both Income + Expense)
             ===================================================================== */
          <div className="w-full max-w-3xl bg-white text-slate-900 p-8 rounded-2xl shadow-2xl border border-slate-300 font-sans print:p-0 print:border-none print:shadow-none print:max-w-none print:w-full">
            {/* A4 Header */}
            <div className="flex items-start justify-between border-b-2 border-slate-900 pb-5">
              <div className="flex items-center gap-4">
                <img
                  src={vehicle.photoUrl}
                  alt={vehicle.name}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-xl object-cover border-2 border-slate-900 shadow-sm"
                />
                <div>
                  <h1 className="text-2xl font-black tracking-tight text-slate-950 font-sans">
                    SANDI AUTO EASY BIKE
                  </h1>
                  <p className="text-xs text-slate-700 font-semibold mt-0.5">
                    Sandi Company · Passenger Electric Auto Easy Bike
                  </p>
                  <p className="text-xs text-slate-600 font-mono mt-0.5">
                    রেজিস্ট্রেশন: {vehicle.registrationNumber}
                  </p>
                  <p className="text-xs text-slate-600">
                    ব্যাটারি: {vehicle.batteryVoltage} ({vehicle.batteryType})
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="inline-block px-3 py-1 bg-slate-900 text-white text-xs font-bold font-mono rounded">
                  সারাদিনের দৈনিক হিসাব ভাউচার
                </div>
                <p className="text-sm font-bold font-mono text-slate-950 mt-2">
                  নং: {activeDailyVoucher.voucherNumber}
                </p>
                <p className="text-xs text-slate-600 font-mono mt-0.5">
                  তারিখ: {activeDailyVoucher.date}
                </p>
                <p className="text-xs text-slate-600 font-mono">
                  সময়: {getCurrentTime()}
                </p>
              </div>
            </div>

            {/* Owner & Vehicle Profile Banner */}
            <div className="grid grid-cols-2 gap-4 my-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <div>
                <p className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1">
                  স্বত্বাধিকারী তথ্য:
                </p>
                <p className="font-bold text-slate-950 text-sm">{owner.name}</p>
                <p className="text-slate-700 mt-0.5">
                  গ্রাম: {owner.village}, ডাকঘর: {owner.postOffice}
                </p>
                <p className="text-slate-700">
                  থানা: {owner.policeStation}, জেলা: {owner.district}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1">
                  যোগাযোগ:
                </p>
                <p className="text-slate-800 font-mono">মোবাইল ১: {owner.mobile1}</p>
                <p className="text-slate-800 font-mono">মোবাইল ২: {owner.mobile2}</p>
                <p className="text-slate-600 font-mono">{owner.email}</p>
              </div>
            </div>

            {/* INCOMES & EXPENSES TWO-COLUMN SPLIT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
              {/* Left Column: Incomes */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-emerald-50 px-3 py-2 border-b border-emerald-200 flex justify-between items-center text-xs font-bold text-emerald-900">
                  <span>সারাদিনের আয় বিবরণ</span>
                  <span>{activeDailyVoucher.incomes.length} এন্ট্রি</span>
                </div>
                <div className="p-3 space-y-2 text-xs min-h-[140px]">
                  {activeDailyVoucher.incomes.length === 0 ? (
                    <p className="text-slate-400 italic text-center py-4">কোনো আয় এন্ট্রি নেই</p>
                  ) : (
                    activeDailyVoucher.incomes.map((inc) => (
                      <div key={inc.id} className="flex justify-between items-start border-b border-slate-100 pb-1.5">
                        <div className="min-w-0 pr-2">
                          <p className="font-medium text-slate-900 truncate">{inc.tripDescription}</p>
                          <p className="text-[10px] text-slate-500">{inc.time} · {getPaymentLabel(inc.paymentMethod)}</p>
                        </div>
                        <span className="font-bold text-emerald-700 font-mono">
                          +{formatCurrency(inc.amountPoisha, lang)}
                        </span>
                      </div>
                    ))
                  )}
                </div>
                <div className="bg-emerald-100/60 px-3 py-2 border-t border-emerald-200 flex justify-between text-xs font-bold text-emerald-950 font-mono">
                  <span>মোট আয়:</span>
                  <span>{formatCurrency(activeDailyVoucher.totalIncomePoisha, lang)}</span>
                </div>
              </div>

              {/* Right Column: Expenses */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-rose-50 px-3 py-2 border-b border-rose-200 flex justify-between items-center text-xs font-bold text-rose-900">
                  <span>সারাদিনের ব্যয় বিবরণ</span>
                  <span>{activeDailyVoucher.expenses.length} এন্ট্রি</span>
                </div>
                <div className="p-3 space-y-2 text-xs min-h-[140px]">
                  {activeDailyVoucher.expenses.length === 0 ? (
                    <p className="text-slate-400 italic text-center py-4">কোনো ব্যয় এন্ট্রি নেই</p>
                  ) : (
                    activeDailyVoucher.expenses.map((exp) => (
                      <div key={exp.id} className="flex justify-between items-start border-b border-slate-100 pb-1.5">
                        <div className="min-w-0 pr-2">
                          <p className="font-medium text-slate-900 truncate">{exp.description}</p>
                          <p className="text-[10px] text-slate-500">{exp.vendorName} · {getPaymentLabel(exp.paymentMethod)}</p>
                        </div>
                        <span className="font-bold text-rose-700 font-mono">
                          -{formatCurrency(exp.amountPoisha, lang)}
                        </span>
                      </div>
                    ))
                  )}
                </div>
                <div className="bg-rose-100/60 px-3 py-2 border-t border-rose-200 flex justify-between text-xs font-bold text-rose-950 font-mono">
                  <span>মোট ব্যয়:</span>
                  <span>{formatCurrency(activeDailyVoucher.totalExpensePoisha, lang)}</span>
                </div>
              </div>
            </div>

            {/* Total Balance Sheet Tile */}
            <div className="p-4 bg-slate-100 rounded-xl border border-slate-300 flex items-center justify-between text-xs mb-4">
              <div>
                <span className="text-slate-600 block">সারাদিনের চূড়ান্ত হিসাব:</span>
                <span className="text-sm font-bold text-slate-950 block mt-0.5">
                  মোট আয় ({formatCurrency(activeDailyVoucher.totalIncomePoisha, lang)}) - মোট ব্যয় ({formatCurrency(activeDailyVoucher.totalExpensePoisha, lang)})
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-500 block">সারাদিনের নিট লাভ / হাতে নগদ:</span>
                <span className={`text-2xl font-black font-mono tabular-nums ${
                  activeDailyVoucher.netProfitPoisha >= 0 ? 'text-slate-950' : 'text-rose-700'
                }`}>
                  {formatCurrency(activeDailyVoucher.netProfitPoisha, lang)}
                </span>
              </div>
            </div>

            {/* Amount in words */}
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs mb-8">
              <span className="font-bold text-amber-900">কথায় (নিট লাভ): </span>
              <span className="text-amber-950 font-medium">{amountInWords}</span>
            </div>

            {/* Footer & Clean Signature */}
            <div className="flex items-end justify-between pt-6 border-t border-slate-300">
              <div className="text-xs text-slate-600">
                <p className="font-bold text-slate-900">{t.thankYou}</p>
                <p className="text-[11px] mt-0.5">
                  Sandi Company · SANDI অটো ইজি বাইক ব্যক্তিগত হিসাব ব্যবস্থাপনা।
                </p>
              </div>

              <div className="text-center">
                {/* Clean signature without background */}
                <div className="h-16 w-44 flex items-center justify-center mb-1">
                  <img
                    src="/public/assets/aistudio/salam_signature_clean.png"
                    alt="মালিকের স্বাক্ষর"
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="w-44 border-t border-slate-900"></div>
                <span className="text-xs font-bold text-slate-900 block mt-1">
                  {owner.name}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  স্বত্বাধিকারী, SANDI অটো
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
