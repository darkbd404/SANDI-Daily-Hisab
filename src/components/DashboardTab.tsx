import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  PlusCircle, 
  MinusCircle, 
  Receipt, 
  Calendar,
  Fuel,
  Wrench,
  Clock,
  ArrowRight,
  ShieldCheck,
  MapPin
} from 'lucide-react';
import { 
  IncomeItem, 
  ExpenseItem, 
  OwnerProfile, 
  VehicleProfile 
} from '../types';
import { 
  translations, 
  Language, 
  formatCurrency, 
  formatNumber 
} from '../utils/translations';
import { getTodayDate } from '../utils/storage';

interface DashboardTabProps {
  incomes: IncomeItem[];
  expenses: ExpenseItem[];
  owner: OwnerProfile;
  vehicle: VehicleProfile;
  lang: Language;
  onOpenAddIncome: () => void;
  onOpenAddExpense: () => void;
  onSelectVoucherTransaction: (transaction: IncomeItem | ExpenseItem, type: 'INCOME' | 'EXPENSE') => void;
  onNavigateToTab: (tab: any) => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  incomes,
  expenses,
  owner,
  vehicle,
  lang,
  onOpenAddIncome,
  onOpenAddExpense,
  onSelectVoucherTransaction,
  onNavigateToTab,
}) => {
  const t = translations[lang];
  const today = getTodayDate();
  const currentMonthPrefix = today.substring(0, 7); // YYYY-MM

  // Precise calculations in integer Poisha
  const todayIncomes = incomes.filter((i) => i.date === today);
  const todayExpenses = expenses.filter((e) => e.date === today);
  const todayIncomePoisha = todayIncomes.reduce((acc, curr) => acc + curr.amountPoisha, 0);
  const todayExpensePoisha = todayExpenses.reduce((acc, curr) => acc + curr.amountPoisha, 0);
  const todayProfitPoisha = todayIncomePoisha - todayExpensePoisha;

  const monthIncomes = incomes.filter((i) => i.date.startsWith(currentMonthPrefix));
  const monthExpenses = expenses.filter((e) => e.date.startsWith(currentMonthPrefix));
  const monthIncomePoisha = monthIncomes.reduce((acc, curr) => acc + curr.amountPoisha, 0);
  const monthExpensePoisha = monthExpenses.reduce((acc, curr) => acc + curr.amountPoisha, 0);
  const monthProfitPoisha = monthIncomePoisha - monthExpensePoisha;

  const totalIncomePoisha = incomes.reduce((acc, curr) => acc + curr.amountPoisha, 0);
  const totalExpensePoisha = expenses.reduce((acc, curr) => acc + curr.amountPoisha, 0);
  const totalNetProfitPoisha = totalIncomePoisha - totalExpensePoisha;

  // Recent 5 transactions combined
  const combinedRecent = [
    ...incomes.map((i) => ({ ...i, txType: 'INCOME' as const })),
    ...expenses.map((e) => ({ ...e, txType: 'EXPENSE' as const })),
  ].sort((a, b) => b.createdAt - a.createdAt).slice(0, 5);

  // Last 7 days data for chart
  const last7Days: { date: string; label: string; income: number; expense: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayLabel = d.toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US', { weekday: 'short' });
    
    const dayInc = incomes.filter((item) => item.date === dateStr).reduce((a, b) => a + b.amountPoisha, 0);
    const dayExp = expenses.filter((item) => item.date === dateStr).reduce((a, b) => a + b.amountPoisha, 0);

    last7Days.push({
      date: dateStr,
      label: dayLabel,
      income: dayInc,
      expense: dayExp,
    });
  }

  const maxChartVal = Math.max(...last7Days.map((d) => Math.max(d.income, d.expense)), 100000);

  return (
    <div className="space-y-6 pb-24">
      {/* Vehicle & Owner Profile Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 rounded-2xl p-4 border border-amber-500/25 shadow-lg relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          {/* Vehicle Image Avatar */}
          <div className="relative group shrink-0">
            <img
              src={vehicle.photoUrl}
              alt={vehicle.name}
              referrerPolicy="no-referrer"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover border-2 border-amber-400/50 shadow-md bg-slate-800"
            />
            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full border-2 border-slate-900 overflow-hidden shadow-lg bg-slate-800">
              <img
                src={owner.photoUrl}
                alt={owner.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="text-center sm:text-left flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-sans">
                {vehicle.name} · {vehicle.manufacturer}
              </h1>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                {lang === 'bn' ? 'সক্রিয় গাড়ি' : 'Active Bike'}
              </span>
            </div>
            
            <p className="text-xs text-slate-300 mt-1 flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="font-semibold text-amber-300">{owner.name}</span>
              <span>·</span>
              <span className="flex items-center gap-1 text-slate-400">
                <MapPin className="w-3 h-3 text-amber-400" />
                {owner.village}, {owner.postOffice}, {owner.policeStation}
              </span>
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-3 text-xs text-slate-400">
              <span className="bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/60 font-mono">
                {vehicle.registrationNumber}
              </span>
              <span className="bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/60 font-mono">
                {vehicle.batteryVoltage}
              </span>
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                ১০০% অফলাইন লোকাল হিসাব
              </span>
            </div>
          </div>
        </div>

        {/* Quick Action Bar */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-2">
          <button
            onClick={onOpenAddIncome}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-emerald-900/30 active:scale-95 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t.addIncome}</span>
          </button>
          <button
            onClick={onOpenAddExpense}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-rose-900/30 active:scale-95 transition-all"
          >
            <MinusCircle className="w-4 h-4" />
            <span>{t.addExpense}</span>
          </button>
          <button
            onClick={() => onNavigateToTab('voucher')}
            className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 font-semibold text-xs sm:text-sm shadow-md active:scale-95 transition-all"
          >
            <Receipt className="w-4 h-4 text-amber-400" />
            <span>{t.generateVoucher}</span>
          </button>
        </div>
      </div>

      {/* TODAY'S METRIC SUMMARY (Prominent natural cards) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>{lang === 'bn' ? 'আজকের সার্বিক হিসাব' : "Today's Ledger"}</span>
            <span className="text-xs text-slate-500 font-normal">({today})</span>
          </h2>
          <span className="text-xs text-slate-400">
            {formatNumber(todayIncomes.length, lang)} {lang === 'bn' ? 'টি ট্রিপ' : 'trips'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Today Income */}
          <div className="bg-slate-900/90 rounded-xl p-3.5 border border-emerald-500/20 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">{t.todayIncome}</span>
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-bold text-emerald-400 font-mono tracking-tight tabular-nums">
              {formatCurrency(todayIncomePoisha, lang)}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              {formatNumber(todayIncomes.length, lang)} {lang === 'bn' ? 'টি এন্ট্রি' : 'entries'}
            </div>
          </div>

          {/* Today Expense */}
          <div className="bg-slate-900/90 rounded-xl p-3.5 border border-rose-500/20 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">{t.todayExpense}</span>
              <div className="w-7 h-7 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400">
                <TrendingDown className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-bold text-rose-400 font-mono tracking-tight tabular-nums">
              {formatCurrency(todayExpensePoisha, lang)}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              {formatNumber(todayExpenses.length, lang)} {lang === 'bn' ? 'টি এন্ট্রি' : 'entries'}
            </div>
          </div>

          {/* Today Profit */}
          <div className={`bg-slate-900/90 rounded-xl p-3.5 border relative overflow-hidden ${
            todayProfitPoisha >= 0 ? 'border-sky-500/30' : 'border-amber-500/30'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">{t.todayProfit}</span>
              <div className="w-7 h-7 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400">
                <Wallet className="w-4 h-4" />
              </div>
            </div>
            <div className={`mt-2 text-2xl font-bold font-mono tracking-tight tabular-nums ${
              todayProfitPoisha >= 0 ? 'text-sky-400' : 'text-amber-400'
            }`}>
              {formatCurrency(todayProfitPoisha, lang)}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              {todayProfitPoisha >= 0 ? (lang === 'bn' ? 'পজিটিভ ব্যালেন্স' : 'Net Surplus') : (lang === 'bn' ? 'ঘাটতি' : 'Deficit')}
            </div>
          </div>
        </div>
      </div>

      {/* MONTHLY & OVERALL KPI TILES */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Monthly Income */}
        <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-800">
          <div className="text-xs text-slate-400">{t.monthlyIncome}</div>
          <div className="text-lg font-bold text-slate-200 mt-1 font-mono tabular-nums">
            {formatCurrency(monthIncomePoisha, lang)}
          </div>
        </div>

        {/* Monthly Expense */}
        <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-800">
          <div className="text-xs text-slate-400">{t.monthlyExpense}</div>
          <div className="text-lg font-bold text-slate-200 mt-1 font-mono tabular-nums">
            {formatCurrency(monthExpensePoisha, lang)}
          </div>
        </div>

        {/* Monthly Profit */}
        <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-800">
          <div className="text-xs text-slate-400">{t.monthlyProfit}</div>
          <div className="text-lg font-bold text-amber-400 mt-1 font-mono tabular-nums">
            {formatCurrency(monthProfitPoisha, lang)}
          </div>
        </div>

        {/* Total Net Profit */}
        <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-800">
          <div className="text-xs text-slate-400">{t.totalNetProfit}</div>
          <div className="text-lg font-bold text-emerald-400 mt-1 font-mono tabular-nums">
            {formatCurrency(totalNetProfitPoisha, lang)}
          </div>
        </div>
      </div>

      {/* 7-DAY INCOME VS EXPENSE VISUAL COMPARISON BAR CHART */}
      <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-200">
              {lang === 'bn' ? 'গত ৭ দিনের আয় ও ব্যয় তুলনা' : '7-Day Income vs Expense Trend'}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {lang === 'bn' ? 'সবুজ = আয়, লাল = ব্যয়' : 'Green = Income, Red = Expense'}
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block"></span>
              {t.income}
            </span>
            <span className="flex items-center gap-1.5 text-rose-400 font-medium">
              <span className="w-2.5 h-2.5 rounded-sm bg-rose-500 inline-block"></span>
              {t.expense}
            </span>
          </div>
        </div>

        {/* Chart Bars */}
        <div className="h-44 flex items-end justify-between gap-2 pt-6 pb-2 border-b border-slate-800 px-2">
          {last7Days.map((day, idx) => {
            const incHeight = Math.max(Math.round((day.income / maxChartVal) * 100), 4);
            const expHeight = Math.max(Math.round((day.expense / maxChartVal) * 100), 4);

            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                <div className="w-full flex items-end justify-center gap-1 h-32">
                  {/* Income bar */}
                  <div
                    style={{ height: `${incHeight}%` }}
                    className="w-3 sm:w-4 rounded-t bg-emerald-500 group-hover:bg-emerald-400 transition-all relative"
                    title={`Income: ${formatCurrency(day.income, lang)}`}
                  ></div>
                  {/* Expense bar */}
                  <div
                    style={{ height: `${expHeight}%` }}
                    className="w-3 sm:w-4 rounded-t bg-rose-500 group-hover:bg-rose-400 transition-all relative"
                    title={`Expense: ${formatCurrency(day.expense, lang)}`}
                  ></div>
                </div>
                <span className="text-[11px] font-medium text-slate-400 tracking-tight">
                  {day.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* RECENT TRANSACTIONS */}
      <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>{t.recentTransactions}</span>
          </h3>
          <button
            onClick={() => onNavigateToTab('income')}
            className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1"
          >
            <span>{t.viewAll}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {combinedRecent.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-xs">
            {t.noData}
          </div>
        ) : (
          <div className="divide-y divide-slate-800/80">
            {combinedRecent.map((tx) => {
              const isIncome = tx.txType === 'INCOME';
              const title = isIncome 
                ? (tx as IncomeItem).tripDescription 
                : (tx as ExpenseItem).description;
              const sub = isIncome 
                ? `${(tx as IncomeItem).startLocation} ➔ ${(tx as IncomeItem).destination}`
                : `${(tx as ExpenseItem).vendorName}`;

              return (
                <div
                  key={tx.id}
                  className="py-3 flex items-center justify-between gap-3 group hover:bg-slate-800/30 px-2 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isIncome 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      {isIncome ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-slate-200 truncate">
                        {title}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {sub} · <span className="font-mono">{tx.date}</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p className={`text-xs sm:text-sm font-bold font-mono tabular-nums ${
                      isIncome ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {isIncome ? '+' : '-'}{formatCurrency(tx.amountPoisha, lang)}
                    </p>
                    <button
                      onClick={() => onSelectVoucherTransaction(tx as any, tx.txType)}
                      className="text-[10px] text-amber-400 hover:text-amber-300 font-medium mt-1 flex items-center gap-0.5 justify-end"
                    >
                      <Receipt className="w-3 h-3" />
                      <span>{t.voucher}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
