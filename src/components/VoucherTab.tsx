import React, { useState } from 'react';
import { 
  Printer, 
  Share2, 
  BookmarkCheck, 
  RefreshCw, 
  Receipt, 
  FileText, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Clock, 
  CreditCard,
  QrCode,
  CheckCircle2,
  Sliders,
  History
} from 'lucide-react';
import { 
  VoucherItem, 
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
  vouchers: VoucherItem[];
  incomes: IncomeItem[];
  expenses: ExpenseItem[];
  owner: OwnerProfile;
  vehicle: VehicleProfile;
  lang: Language;
  onSaveVoucher: (voucher: VoucherItem) => void;
  activeDraftTx: { tx: IncomeItem | ExpenseItem; type: 'INCOME' | 'EXPENSE' } | null;
  onClearActiveDraftTx: () => void;
}

export const VoucherTab: React.FC<VoucherTabProps> = ({
  vouchers,
  incomes,
  expenses,
  owner,
  vehicle,
  lang,
  onSaveVoucher,
  activeDraftTx,
  onClearActiveDraftTx,
}) => {
  const t = translations[lang];
  const [voucherStyle, setVoucherStyle] = useState<'A4' | 'POS'>('POS'); // POS supermarket style or A4 invoice
  const [selectedTxType, setSelectedTxType] = useState<'INCOME' | 'EXPENSE'>('INCOME');
  const [selectedTxId, setSelectedTxId] = useState<string>('');
  const [activeVoucher, setActiveVoucher] = useState<VoucherItem | null>(null);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  // If active draft passed from Income/Expense tab, load it
  React.useEffect(() => {
    if (activeDraftTx) {
      setSelectedTxType(activeDraftTx.type);
      setSelectedTxId(activeDraftTx.tx.id);
      generateDraftVoucher(activeDraftTx.tx, activeDraftTx.type);
      onClearActiveDraftTx();
    } else if (!activeVoucher) {
      // Default to latest income or first voucher
      if (vouchers.length > 0) {
        setActiveVoucher(vouchers[0]);
      } else if (incomes.length > 0) {
        generateDraftVoucher(incomes[0], 'INCOME');
      }
    }
  }, [activeDraftTx]);

  const generateDraftVoucher = (
    tx: IncomeItem | ExpenseItem,
    type: 'INCOME' | 'EXPENSE'
  ) => {
    const isInc = type === 'INCOME';
    const inc = isInc ? (tx as IncomeItem) : null;
    const exp = !isInc ? (tx as ExpenseItem) : null;

    const voucherNumber = SandiStorage.getNextVoucherNumber();

    const newVoucher: VoucherItem = {
      id: `vouc-${Date.now()}`,
      voucherNumber,
      type,
      transactionId: tx.id,
      amountPoisha: tx.amountPoisha,
      date: tx.date || getTodayDate(),
      time: tx.time || getCurrentTime(),
      category: isInc ? inc!.category : exp!.category,
      description: isInc ? inc!.tripDescription : exp!.description,
      paymentMethod: tx.paymentMethod,
      location: isInc 
        ? `${inc!.startLocation} ➔ ${inc!.destination}`
        : (exp!.location || exp!.vendorName),
      ownerSnapshot: { ...owner },
      vehicleSnapshot: { ...vehicle },
      createdAt: Date.now(),
    };

    setActiveVoucher(newVoucher);
  };

  const handleSelectExistingTransaction = (id: string, type: 'INCOME' | 'EXPENSE') => {
    setSelectedTxId(id);
    const tx = type === 'INCOME' 
      ? incomes.find((i) => i.id === id) 
      : expenses.find((e) => e.id === id);
    if (tx) {
      generateDraftVoucher(tx, type);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSaveToHistory = () => {
    if (!activeVoucher) return;
    onSaveVoucher(activeVoucher);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  const handleShare = () => {
    if (!activeVoucher) return;
    const taka = activeVoucher.amountPoisha / 100;
    const shareText = `SANDI AUTO EASY BIKE - ভাউচার #${activeVoucher.voucherNumber}\nতারিখ: ${activeVoucher.date} ${activeVoucher.time}\nমালিক: ${activeVoucher.ownerSnapshot.name}\nগাড়ি: ${activeVoucher.vehicleSnapshot.name} (${activeVoucher.vehicleSnapshot.registrationNumber})\nধরণ: ${activeVoucher.type}\nবিবরণ: ${activeVoucher.description}\nমোট টাকা: ৳ ${taka}\nকথায়: ${numberToWordsBn(taka)}`;

    if (navigator.share) {
      navigator.share({
        title: `SANDI Voucher ${activeVoucher.voucherNumber}`,
        text: shareText,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareText);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2500);
    }
  };

  const getCategoryLabel = (cat: string) => (t as Record<string, string>)[cat] || cat;
  const getPaymentLabel = (pm: string) => (t as Record<string, string>)[pm] || pm;

  const amountInWords = activeVoucher 
    ? (lang === 'bn' 
        ? numberToWordsBn(activeVoucher.amountPoisha / 100) 
        : numberToWordsEn(activeVoucher.amountPoisha / 100))
    : '';

  return (
    <div className="space-y-6 pb-24">
      {/* Top Controls & Mode Switcher */}
      <div className="no-print bg-slate-900/90 rounded-2xl p-4 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
              <Receipt className="w-5 h-5 text-amber-400" />
              <span>{t.voucherTitle}</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              ইউনিক নম্বর ও আসল স্বাক্ষরসহ সুপারমার্কেট পিওএস ও A4 ইনভয়েস জেনারেটর
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                showHistory 
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' 
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>{t.voucherHistory} ({vouchers.length})</span>
            </button>
          </div>
        </div>

        {/* Transaction Selection Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-800">
          {/* Income vs Expense Selection */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800">
            <button
              onClick={() => {
                setSelectedTxType('INCOME');
                if (incomes.length > 0) handleSelectExistingTransaction(incomes[0].id, 'INCOME');
              }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                selectedTxType === 'INCOME'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.income}
            </button>
            <button
              onClick={() => {
                setSelectedTxType('EXPENSE');
                if (expenses.length > 0) handleSelectExistingTransaction(expenses[0].id, 'EXPENSE');
              }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                selectedTxType === 'EXPENSE'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.expense}
            </button>
          </div>

          {/* Select Specific Transaction Dropdown */}
          <div className="sm:col-span-2">
            <select
              value={selectedTxId}
              onChange={(e) => handleSelectExistingTransaction(e.target.value, selectedTxType)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="">-- লেনদেন নির্বাচন করুন --</option>
              {selectedTxType === 'INCOME'
                ? incomes.map((i) => (
                    <option key={i.id} value={i.id}>
                      {i.date} | {i.tripDescription} ({formatCurrency(i.amountPoisha, lang)})
                    </option>
                  ))
                : expenses.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.date} | {e.description} ({formatCurrency(e.amountPoisha, lang)})
                    </option>
                  ))}
            </select>
          </div>
        </div>

        {/* Format Selector: POS Thermal Slip vs A4 Invoice */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800">
          <div className="flex items-center gap-1.5 text-xs">
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
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t.printVoucher}</span>
            </button>
            <button
              onClick={handleSaveToHistory}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition-all active:scale-95"
              title="Save snapshot to voucher history"
            >
              <BookmarkCheck className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">সংরক্ষণ</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition-all active:scale-95"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">শেয়ার</span>
            </button>
          </div>
        </div>

        {copiedNotification && (
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>ভাউচারটি সফলভাবে সেভ করা হয়েছে এবং টেক্সট কপি হয়েছে!</span>
          </div>
        )}
      </div>

      {/* Voucher History Modal / Drawer */}
      {showHistory && (
        <div className="no-print bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <History className="w-4 h-4 text-amber-400" />
              <span>{t.voucherHistory}</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              {vouchers.length} টি ভাউচার সংরক্ষিত
            </span>
          </div>

          {vouchers.length === 0 ? (
            <p className="text-xs text-slate-500 py-4 text-center">এখনো কোন ভাউচার সেভ করা হয়নি</p>
          ) : (
            <div className="max-h-60 overflow-y-auto divide-y divide-slate-800/80">
              {vouchers.map((vouc) => (
                <div
                  key={vouc.id}
                  onClick={() => {
                    setActiveVoucher(vouc);
                    setShowHistory(false);
                  }}
                  className="py-2.5 px-2 flex items-center justify-between gap-3 hover:bg-slate-800/50 rounded-lg cursor-pointer transition-colors"
                >
                  <div>
                    <span className="text-xs font-mono font-bold text-amber-400">
                      {vouc.voucherNumber}
                    </span>
                    <p className="text-xs text-slate-300 truncate mt-0.5">
                      {vouc.description}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {vouc.date} · {vouc.time}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono font-bold text-slate-100">
                      {formatCurrency(vouc.amountPoisha, lang)}
                    </span>
                    <span className="block text-[10px] text-amber-400 mt-1">
                      লোড করুন ➔
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          LIVE VOUCHER PREVIEW CONTAINER (Styled for on-screen & print rendering)
          ========================================================================= */}
      {activeVoucher ? (
        <div className="flex justify-center">
          {voucherStyle === 'POS' ? (
            /* ==========================================================
               1. POS SUPERMARKET / THERMAL RECEIPT STYLE (58mm/80mm POS)
               ========================================================== */
            <div className="w-full max-w-sm bg-white text-slate-900 font-mono p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-300 relative print:p-0 print:border-none print:shadow-none print:max-w-none print:w-full">
              {/* Receipt Serrated Top Accent */}
              <div className="text-center pb-3 border-b-2 border-dashed border-slate-400">
                {/* Vehicle Thumbnail */}
                <div className="flex justify-center mb-2">
                  <img
                    src={activeVoucher.vehicleSnapshot.photoUrl}
                    alt={activeVoucher.vehicleSnapshot.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-xl object-cover border border-slate-400 shadow-sm"
                  />
                </div>

                <h1 className="text-lg font-black tracking-wider uppercase text-slate-950 font-sans">
                  SANDI AUTO EASY BIKE
                </h1>
                <p className="text-[11px] text-slate-700 font-sans font-medium mt-0.5">
                  HUAIHAI / ZONGSHEN · Passenger Electric Bike
                </p>
                <p className="text-[10px] text-slate-600 mt-0.5">
                  রেজিস্ট্রেশন: {activeVoucher.vehicleSnapshot.registrationNumber}
                </p>

                {/* Owner info */}
                <div className="mt-2 text-[11px] leading-tight text-slate-800 font-sans">
                  <p className="font-bold text-slate-900">{activeVoucher.ownerSnapshot.name}</p>
                  <p>{activeVoucher.ownerSnapshot.village}, {activeVoucher.ownerSnapshot.postOffice}</p>
                  <p>{activeVoucher.ownerSnapshot.policeStation}, {activeVoucher.ownerSnapshot.district}</p>
                  <p className="font-semibold text-slate-900 mt-0.5">
                    মোবাইল: {activeVoucher.ownerSnapshot.mobile1}
                  </p>
                </div>
              </div>

              {/* Voucher Meta Info */}
              <div className="py-2.5 border-b border-dashed border-slate-400 text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-600">ভাউচার নম্বর:</span>
                  <span className="font-bold text-slate-950 tracking-wider">
                    {activeVoucher.voucherNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">তারিখ ও সময়:</span>
                  <span>{activeVoucher.date} | {activeVoucher.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">লেনদেনের ধরণ:</span>
                  <span className="font-bold">
                    {activeVoucher.type === 'INCOME' ? 'আয় (ভাড়া / ট্রিপ)' : 'ব্যয় / খরচ'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">পেমেন্ট মাধ্যম:</span>
                  <span>{getPaymentLabel(activeVoucher.paymentMethod)}</span>
                </div>
              </div>

              {/* Transaction Description & Amount Details */}
              <div className="py-3 border-b-2 border-dashed border-slate-400 space-y-2 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
                    ক্যাটাগরি ও বিবরণ:
                  </span>
                  <span className="font-semibold text-slate-900 font-sans block mt-0.5">
                    {getCategoryLabel(activeVoucher.category)}
                  </span>
                  <p className="text-[11px] text-slate-700 font-sans mt-0.5">
                    {activeVoucher.description}
                  </p>
                  {activeVoucher.location && (
                    <p className="text-[10px] text-slate-600 font-sans mt-0.5">
                      স্থান: {activeVoucher.location}
                    </p>
                  )}
                </div>

                {/* Amount Box */}
                <div className="bg-slate-100 p-2.5 rounded-lg border border-slate-300 mt-2">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-800">মোট টাকা:</span>
                    <span className="text-xl font-black text-slate-950 tracking-tight">
                      {formatCurrency(activeVoucher.amountPoisha, lang)}
                    </span>
                  </div>
                  <div className="text-[11px] font-sans text-slate-700 mt-1 pt-1 border-t border-slate-200">
                    <span className="font-semibold">কথায়: </span>
                    <span>{amountInWords}</span>
                  </div>
                </div>
              </div>

              {/* Signature & Barcode Simulation */}
              <div className="pt-3 pb-2 text-center space-y-3">
                {/* Actual Signature Image */}
                <div className="flex flex-col items-center justify-center">
                  <div className="h-12 w-32 flex items-center justify-center mb-1">
                    <img
                      src={activeVoucher.ownerSnapshot.signatureUrl}
                      alt="মালিকের স্বাক্ষর"
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain filter contrast-125"
                    />
                  </div>
                  <div className="w-36 border-t border-slate-400"></div>
                  <span className="text-[10px] text-slate-600 font-sans mt-0.5">
                    স্বত্বাধিকারীর স্বাক্ষর ({activeVoucher.ownerSnapshot.name})
                  </span>
                </div>

                {/* Barcode representation */}
                <div className="flex justify-center items-center gap-0.5 h-7 py-1 px-4 bg-slate-50 rounded">
                  {[4,2,6,1,3,5,2,4,1,6,2,3,5,1,4,2,3,6,1,4,2,5,3,1,4,2,6,1,3].map((w, idx) => (
                    <div
                      key={idx}
                      style={{ width: `${w}px` }}
                      className="h-full bg-slate-900"
                    ></div>
                  ))}
                </div>
                <div className="text-[9px] text-slate-500 font-mono tracking-widest">
                  *{activeVoucher.voucherNumber}*
                </div>

                <p className="text-[10px] text-slate-700 font-sans italic">
                  {t.thankYou}
                </p>
                <p className="text-[9px] text-slate-500">
                  সিস্টেম জেনারেটেড ডিজিটাল ভাউচার · {new Date().toLocaleTimeString()}
                </p>
              </div>
            </div>
          ) : (
            /* ==========================================================
               2. A4 PROFESSIONAL INVOICE FORMAT
               ========================================================== */
            <div className="w-full max-w-2xl bg-white text-slate-900 p-8 rounded-2xl shadow-2xl border border-slate-300 font-sans print:p-0 print:border-none print:shadow-none print:max-w-none print:w-full">
              {/* A4 Header */}
              <div className="flex items-start justify-between border-b-2 border-slate-900 pb-5">
                <div className="flex items-center gap-4">
                  <img
                    src={activeVoucher.vehicleSnapshot.photoUrl}
                    alt={activeVoucher.vehicleSnapshot.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 rounded-xl object-cover border-2 border-slate-900 shadow-sm"
                  />
                  <div>
                    <h1 className="text-2xl font-black tracking-tight text-slate-950 font-sans">
                      SANDI AUTO EASY BIKE
                    </h1>
                    <p className="text-xs text-slate-700 font-medium mt-0.5">
                      HUAIHAI / ZONGSHEN · Passenger Electric Auto
                    </p>
                    <p className="text-xs text-slate-600 font-mono mt-0.5">
                      রেজিস্ট্রেশন: {activeVoucher.vehicleSnapshot.registrationNumber}
                    </p>
                    <p className="text-xs text-slate-600">
                      ব্যাটারি: {activeVoucher.vehicleSnapshot.batteryVoltage} ({activeVoucher.vehicleSnapshot.batteryType})
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="inline-block px-3 py-1 bg-slate-900 text-white text-xs font-bold font-mono rounded">
                    {activeVoucher.type === 'INCOME' ? 'ইনকাম ভাউচার' : 'এক্সপেন্স ভাউচার'}
                  </div>
                  <p className="text-sm font-bold font-mono text-slate-950 mt-2">
                    নং: {activeVoucher.voucherNumber}
                  </p>
                  <p className="text-xs text-slate-600 font-mono mt-0.5">
                    তারিখ: {activeVoucher.date}
                  </p>
                  <p className="text-xs text-slate-600 font-mono">
                    সময়: {activeVoucher.time}
                  </p>
                </div>
              </div>

              {/* Owner Profile Banner */}
              <div className="grid grid-cols-2 gap-4 my-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <div>
                  <p className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1">
                    মালিক / প্রতিষ্ঠান তথ্য:
                  </p>
                  <p className="font-bold text-slate-950 text-sm">{activeVoucher.ownerSnapshot.name}</p>
                  <p className="text-slate-700 mt-0.5">
                    গ্রাম: {activeVoucher.ownerSnapshot.village}, ডাকঘর: {activeVoucher.ownerSnapshot.postOffice}
                  </p>
                  <p className="text-slate-700">
                    থানা: {activeVoucher.ownerSnapshot.policeStation}, জেলা: {activeVoucher.ownerSnapshot.district}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1">
                    যোগাযোগের মাধ্যম:
                  </p>
                  <p className="text-slate-800 font-mono">মোবাইল ১: {activeVoucher.ownerSnapshot.mobile1}</p>
                  <p className="text-slate-800 font-mono">মোবাইল ২: {activeVoucher.ownerSnapshot.mobile2}</p>
                  <p className="text-slate-600 font-mono">{activeVoucher.ownerSnapshot.email}</p>
                </div>
              </div>

              {/* Transaction Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden my-6">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">ক্রমিক</th>
                      <th className="py-2.5 px-3">বিবরণ / রুট</th>
                      <th className="py-2.5 px-3">ক্যাটাগরি</th>
                      <th className="py-2.5 px-3">পেমেন্ট</th>
                      <th className="py-2.5 px-3 text-right">পরিমাণ (BDT)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="py-3 px-3 font-mono">০১</td>
                      <td className="py-3 px-3">
                        <span className="font-bold text-slate-900 block">
                          {activeVoucher.description}
                        </span>
                        {activeVoucher.location && (
                          <span className="text-[11px] text-slate-500 block mt-0.5">
                            রুট / স্থান: {activeVoucher.location}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-slate-700">
                        {getCategoryLabel(activeVoucher.category)}
                      </td>
                      <td className="py-3 px-3 text-slate-700 font-mono">
                        {getPaymentLabel(activeVoucher.paymentMethod)}
                      </td>
                      <td className="py-3 px-3 text-right font-bold font-mono text-sm text-slate-950">
                        {formatCurrency(activeVoucher.amountPoisha, lang)}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot className="bg-slate-50 font-bold border-t-2 border-slate-300">
                    <tr>
                      <td colSpan={4} className="py-2.5 px-3 text-right text-slate-800">
                        সর্বমোট বিল:
                      </td>
                      <td className="py-2.5 px-3 text-right text-base text-slate-950 font-mono">
                        {formatCurrency(activeVoucher.amountPoisha, lang)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Amount in words */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs mb-8">
                <span className="font-bold text-amber-900">কথায়: </span>
                <span className="text-amber-950 font-medium">{amountInWords}</span>
              </div>

              {/* Signatures & Footer */}
              <div className="flex items-end justify-between pt-6 border-t border-slate-300">
                <div className="text-xs text-slate-600">
                  <p className="font-bold text-slate-900">{t.thankYou}</p>
                  <p className="text-[11px] mt-0.5">
                    SANDI অটো ইজি বাইক ব্যক্তিগত হিসাব ব্যবস্থাপনা সিস্টেম।
                  </p>
                </div>

                <div className="text-center">
                  <div className="h-16 w-36 flex items-center justify-center mb-1">
                    <img
                      src={activeVoucher.ownerSnapshot.signatureUrl}
                      alt="মালিকের স্বাক্ষর"
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain filter contrast-125"
                    />
                  </div>
                  <div className="w-40 border-t border-slate-900"></div>
                  <span className="text-xs font-bold text-slate-900 block mt-1">
                    {activeVoucher.ownerSnapshot.name}
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    স্বত্বাধিকারী, SANDI অটো
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-slate-900/50 rounded-2xl p-12 text-center border border-slate-800">
          <Receipt className="w-8 h-8 text-slate-600 mx-auto mb-2" />
          <p className="text-slate-400 text-sm">কোন ভাউচার নির্বাচিত নেই</p>
        </div>
      )}
    </div>
  );
};
