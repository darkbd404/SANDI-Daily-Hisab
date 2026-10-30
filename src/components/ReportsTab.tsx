import React, { useState } from 'react';
import { 
  BarChart3, 
  FileSpreadsheet, 
  Printer, 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  Wallet,
  Zap,
  Wrench,
  Download
} from 'lucide-react';
import { 
  IncomeItem, 
  ExpenseItem, 
  BatteryRecord, 
  MaintenanceRecord,
  OwnerProfile,
  VehicleProfile
} from '../types';
import { 
  translations, 
  Language, 
  formatCurrency, 
  formatNumber 
} from '../utils/translations';
import { SandiStorage, getTodayDate } from '../utils/storage';

interface ReportsTabProps {
  incomes: IncomeItem[];
  expenses: ExpenseItem[];
  batteryRecords: BatteryRecord[];
  maintenanceRecords: MaintenanceRecord[];
  owner: OwnerProfile;
  vehicle: VehicleProfile;
  lang: Language;
}

export const ReportsTab: React.FC<ReportsTabProps> = ({
  incomes,
  expenses,
  batteryRecords,
  maintenanceRecords,
  owner,
  vehicle,
  lang,
}) => {
  const t = translations[lang];
  const today = getTodayDate();

  const [dateRangeMode, setDateRangeMode] = useState<'TODAY' | 'WEEK' | 'MONTH' | 'YEAR' | 'ALL' | 'CUSTOM'>('MONTH');
  const [startDate, setStartDate] = useState(today.substring(0, 7) + '-01');
  const [endDate, setEndDate] = useState(today);

  // Filter transactions based on dateRangeMode
  const filterByRange = (itemDate: string): boolean => {
    if (dateRangeMode === 'ALL') return true;
    if (dateRangeMode === 'TODAY') return itemDate === today;
    if (dateRangeMode === 'MONTH') return itemDate.startsWith(today.substring(0, 7));
    if (dateRangeMode === 'YEAR') return itemDate.startsWith(today.substring(0, 4));
    if (dateRangeMode === 'WEEK') {
      const target = new Date(itemDate).getTime();
      const now = new Date(today).getTime();
      return target >= now - 7 * 86400000 && target <= now;
    }
    if (dateRangeMode === 'CUSTOM') {
      return itemDate >= startDate && itemDate <= endDate;
    }
    return true;
  };

  const filteredIncomes = incomes.filter((i) => filterByRange(i.date));
  const filteredExpenses = expenses.filter((e) => filterByRange(e.date));
  const filteredBattery = batteryRecords.filter((b) => filterByRange(b.date));
  const filteredMaintenance = maintenanceRecords.filter((m) => filterByRange(m.date));

  const totalIncomePoisha = filteredIncomes.reduce((a, b) => a + b.amountPoisha, 0);
  const totalExpensePoisha = filteredExpenses.reduce((a, b) => a + b.amountPoisha, 0);
  const totalNetProfitPoisha = totalIncomePoisha - totalExpensePoisha;
  const totalBatteryCostPoisha = filteredBattery.reduce((a, b) => a + b.costPoisha, 0);
  const totalMaintenanceCostPoisha = filteredMaintenance.reduce((a, b) => a + b.costPoisha, 0);

  const handleExportCsv = () => {
    const csvContent = SandiStorage.exportTransactionsToCsv(filteredIncomes, filteredExpenses);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SANDI_Financial_Report_${dateRangeMode}_${today}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Top Bar with Filter & Export */}
      <div className="no-print bg-slate-900/90 rounded-2xl p-4 border border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-amber-400" />
              <span>{t.reportsTitle}</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              ব্যক্তিগত আয়-ব্যয়, নিট লাভ ও ব্যাটারি-রক্ষণাবেক্ষণ ব্যালেন্স শিট
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCsv}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 font-semibold text-xs transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>{t.exportCsv}</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>{t.printReport}</span>
            </button>
          </div>
        </div>

        {/* Date Filter Segmented Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs pt-1">
          {[
            { key: 'MONTH', label: t.monthlyReport },
            { key: 'TODAY', label: t.dailyReport },
            { key: 'WEEK', label: t.weeklyReport },
            { key: 'YEAR', label: t.yearlyReport },
            { key: 'ALL', label: t.all },
            { key: 'CUSTOM', label: t.customRange },
          ].map((mode) => (
            <button
              key={mode.key}
              onClick={() => setDateRangeMode(mode.key as any)}
              className={`px-3 py-1.5 rounded-lg border font-medium whitespace-nowrap transition-colors ${
                dateRangeMode === mode.key
                  ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>

        {dateRangeMode === 'CUSTOM' && (
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">শুরুর তারিখ</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">শেষ তারিখ</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200"
              />
            </div>
          </div>
        )}
      </div>

      {/* PRINTABLE REPORT DOCUMENT */}
      <div className="bg-slate-900/90 rounded-2xl p-5 sm:p-6 border border-slate-800 space-y-6 print:bg-white print:text-black print:p-0 print:border-none">
        {/* Report Printable Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 print:border-black gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white print:text-black">
              SANDI DAILY HISAB - আর্থিক স্টেটমেন্ট
            </h1>
            <p className="text-xs text-slate-400 print:text-gray-700 mt-0.5">
              গাড়ি: {vehicle.name} ({vehicle.registrationNumber}) · স্বত্বাধিকারী: {owner.name} ({owner.mobile1})
            </p>
          </div>
          <div className="text-left sm:text-right text-xs text-slate-400 print:text-gray-600 font-mono">
            <div>ফিল্টার: {dateRangeMode}</div>
            <div>ইস্যু তারিখ: {today}</div>
          </div>
        </div>

        {/* Financial KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-slate-950/70 p-4 rounded-xl border border-emerald-500/20 print:border-gray-300 print:bg-gray-50">
            <span className="text-xs text-slate-400 print:text-gray-600 font-medium">{t.income}</span>
            <div className="text-2xl font-bold font-mono text-emerald-400 print:text-green-700 mt-1 tabular-nums">
              {formatCurrency(totalIncomePoisha, lang)}
            </div>
            <div className="text-[11px] text-slate-500 print:text-gray-500 mt-1">
              মোট {formatNumber(filteredIncomes.length, lang)} টি ট্রিপ
            </div>
          </div>

          <div className="bg-slate-950/70 p-4 rounded-xl border border-rose-500/20 print:border-gray-300 print:bg-gray-50">
            <span className="text-xs text-slate-400 print:text-gray-600 font-medium">{t.expense}</span>
            <div className="text-2xl font-bold font-mono text-rose-400 print:text-red-700 mt-1 tabular-nums">
              {formatCurrency(totalExpensePoisha, lang)}
            </div>
            <div className="text-[11px] text-slate-500 print:text-gray-500 mt-1">
              মোট {formatNumber(filteredExpenses.length, lang)} টি এন্ট্রি
            </div>
          </div>

          <div className={`bg-slate-950/70 p-4 rounded-xl border print:border-gray-300 print:bg-gray-50 ${
            totalNetProfitPoisha >= 0 ? 'border-sky-500/30' : 'border-amber-500/30'
          }`}>
            <span className="text-xs text-slate-400 print:text-gray-600 font-medium">{t.netProfit}</span>
            <div className={`text-2xl font-bold font-mono mt-1 tabular-nums ${
              totalNetProfitPoisha >= 0 ? 'text-sky-400 print:text-blue-800' : 'text-amber-400 print:text-amber-800'
            }`}>
              {formatCurrency(totalNetProfitPoisha, lang)}
            </div>
            <div className="text-[11px] text-slate-500 print:text-gray-500 mt-1">
              {totalNetProfitPoisha >= 0 ? 'নিট মুনাফা' : 'লোকসান / ঘাটতি'}
            </div>
          </div>
        </div>

        {/* Sub-breakdown: Battery & Maintenance */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-800 print:border-gray-200">
            <span className="text-slate-400 print:text-gray-600 font-medium flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              ব্যাটারি চার্জিং ব্যয়
            </span>
            <div className="text-base font-bold font-mono text-slate-200 print:text-black mt-1">
              {formatCurrency(totalBatteryCostPoisha, lang)}
            </div>
          </div>
          <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-800 print:border-gray-200">
            <span className="text-slate-400 print:text-gray-600 font-medium flex items-center gap-1">
              <Wrench className="w-3.5 h-3.5 text-amber-400" />
              গাড়ি মেরামত ও পার্টস খরচ
            </span>
            <div className="text-base font-bold font-mono text-slate-200 print:text-black mt-1">
              {formatCurrency(totalMaintenanceCostPoisha, lang)}
            </div>
          </div>
        </div>

        {/* Transaction History Breakdown Table */}
        <div>
          <h3 className="text-sm font-bold text-slate-200 print:text-black mb-3">
            লেনদেন বিস্তারিত তালিকা ({filteredIncomes.length + filteredExpenses.length})
          </h3>
          <div className="border border-slate-800 print:border-gray-300 rounded-xl overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 print:bg-gray-100 text-slate-400 print:text-gray-700 border-b border-slate-800 print:border-gray-300 font-semibold">
                <tr>
                  <th className="py-2 px-3">তারিখ</th>
                  <th className="py-2 px-3">ধরণ</th>
                  <th className="py-2 px-3">ক্যাটাগরি</th>
                  <th className="py-2 px-3">বিবরণ / রুট</th>
                  <th className="py-2 px-3 text-right">টাকা (BDT)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 print:divide-gray-200">
                {filteredIncomes.map((i) => (
                  <tr key={i.id} className="hover:bg-slate-800/30">
                    <td className="py-2 px-3 font-mono text-slate-400 print:text-gray-600">{i.date}</td>
                    <td className="py-2 px-3 text-emerald-400 font-semibold">আয়</td>
                    <td className="py-2 px-3 text-slate-300 print:text-gray-800">{t[i.category] || i.category}</td>
                    <td className="py-2 px-3 text-slate-300 print:text-gray-800">{i.tripDescription}</td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-emerald-400 print:text-green-700">
                      +{formatCurrency(i.amountPoisha, lang)}
                    </td>
                  </tr>
                ))}
                {filteredExpenses.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-800/30">
                    <td className="py-2 px-3 font-mono text-slate-400 print:text-gray-600">{e.date}</td>
                    <td className="py-2 px-3 text-rose-400 font-semibold">ব্যয়</td>
                    <td className="py-2 px-3 text-slate-300 print:text-gray-800">{t[e.category] || e.category}</td>
                    <td className="py-2 px-3 text-slate-300 print:text-gray-800">{e.description} ({e.vendorName})</td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-rose-400 print:text-red-700">
                      -{formatCurrency(e.amountPoisha, lang)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Report Footer / Signature */}
        <div className="pt-6 border-t border-slate-800 print:border-gray-300 flex items-end justify-between text-xs">
          <div>
            <p className="font-bold text-slate-300 print:text-gray-900">
              SANDI অটো ইজি বাইক ম্যানেজমেন্ট
            </p>
            <p className="text-[11px] text-slate-500 print:text-gray-500">
              ১০০% অফলাইন ভেরিফাইড ব্যক্তিগত আর্থিক হিসাব
            </p>
          </div>
          <div className="text-center">
            <div className="h-12 w-28 flex items-center justify-center mb-1">
              <img
                src={owner.signatureUrl}
                alt="স্বাক্ষর"
                referrerPolicy="no-referrer"
                className="max-h-full max-w-full object-contain filter contrast-125"
              />
            </div>
            <div className="w-32 border-t border-slate-700 print:border-black"></div>
            <span className="text-[11px] font-bold text-slate-300 print:text-black block mt-0.5">
              {owner.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
