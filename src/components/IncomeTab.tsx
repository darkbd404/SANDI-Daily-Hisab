import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  MapPin, 
  Receipt, 
  Edit3, 
  Trash2, 
  Navigation, 
  X,
  CreditCard
} from 'lucide-react';
import { 
  IncomeItem, 
  IncomeCategory, 
  PaymentMethod 
} from '../types';
import { 
  translations, 
  Language, 
  formatCurrency, 
  formatNumber 
} from '../utils/translations';
import { getTodayDate, getCurrentTime } from '../utils/storage';

interface IncomeTabProps {
  incomes: IncomeItem[];
  lang: Language;
  onAddIncome: (income: IncomeItem) => void;
  onUpdateIncome: (income: IncomeItem) => void;
  onDeleteIncome: (id: string) => void;
  onGenerateVoucher: (income: IncomeItem) => void;
  isAddModalOpen: boolean;
  setIsAddModalOpen: (open: boolean) => void;
}

export const IncomeTab: React.FC<IncomeTabProps> = ({
  incomes,
  lang,
  onAddIncome,
  onUpdateIncome,
  onDeleteIncome,
  onGenerateVoucher,
  isAddModalOpen,
  setIsAddModalOpen,
}) => {
  const t = translations[lang];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<IncomeCategory | 'ALL'>('ALL');
  const [dateFilter, setDateFilter] = useState<'ALL' | 'TODAY' | 'MONTH'>('ALL');
  const [editingItem, setEditingItem] = useState<IncomeItem | null>(null);

  // Form State
  const [amountTaka, setAmountTaka] = useState('');
  const [date, setDate] = useState(getTodayDate());
  const [time, setTime] = useState(getCurrentTime());
  const [category, setCategory] = useState<IncomeCategory>('PASSENGER_FARE');
  const [tripDescription, setTripDescription] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [startLocation, setStartLocation] = useState('ফলকামুড়ী');
  const [destination, setDestination] = useState('বরুড়া বাজার');
  const [distanceKm, setDistanceKm] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('CASH');
  const [notes, setNotes] = useState('');

  const todayStr = getTodayDate();
  const monthStr = todayStr.substring(0, 7);

  // Filtered List
  const filteredIncomes = incomes.filter((item) => {
    if (selectedCategory !== 'ALL' && item.category !== selectedCategory) return false;
    if (dateFilter === 'TODAY' && item.date !== todayStr) return false;
    if (dateFilter === 'MONTH' && !item.date.startsWith(monthStr)) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        item.tripDescription.toLowerCase().includes(q) ||
        item.startLocation.toLowerCase().includes(q) ||
        item.destination.toLowerCase().includes(q) ||
        (item.customerName && item.customerName.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  const totalFilteredPoisha = filteredIncomes.reduce((acc, curr) => acc + curr.amountPoisha, 0);

  const resetForm = () => {
    setAmountTaka('');
    setDate(getTodayDate());
    setTime(getCurrentTime());
    setCategory('PASSENGER_FARE');
    setTripDescription('');
    setCustomerName('');
    setStartLocation('ফলকামুড়ী');
    setDestination('বরুড়া বাজার');
    setDistanceKm('');
    setPaymentMethod('CASH');
    setNotes('');
    setEditingItem(null);
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (item: IncomeItem) => {
    setEditingItem(item);
    setAmountTaka((item.amountPoisha / 100).toString());
    setDate(item.date);
    setTime(item.time);
    setCategory(item.category);
    setTripDescription(item.tripDescription);
    setCustomerName(item.customerName || '');
    setStartLocation(item.startLocation);
    setDestination(item.destination);
    setDistanceKm(item.distanceKm ? item.distanceKm.toString() : '');
    setPaymentMethod(item.paymentMethod);
    setNotes(item.notes || '');
    setIsAddModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amountTaka);
    if (isNaN(val) || val <= 0) return;

    const poisha = Math.round(val * 100);

    if (editingItem) {
      const updated: IncomeItem = {
        ...editingItem,
        amountPoisha: poisha,
        date,
        time,
        category,
        tripDescription: tripDescription || `${startLocation} - ${destination}`,
        customerName: customerName || undefined,
        startLocation,
        destination,
        distanceKm: distanceKm ? parseFloat(distanceKm) : undefined,
        paymentMethod,
        notes: notes || undefined,
      };
      onUpdateIncome(updated);
    } else {
      const newItem: IncomeItem = {
        id: `inc-${Date.now()}`,
        amountPoisha: poisha,
        date,
        time,
        category,
        tripDescription: tripDescription || `${startLocation} ➔ ${destination}`,
        customerName: customerName || undefined,
        startLocation,
        destination,
        distanceKm: distanceKm ? parseFloat(distanceKm) : undefined,
        paymentMethod,
        notes: notes || undefined,
        createdAt: Date.now(),
      };
      onAddIncome(newItem);
    }

    setIsAddModalOpen(false);
    resetForm();
  };

  const categories: { key: IncomeCategory; label: string }[] = [
    { key: 'PASSENGER_FARE', label: t.PASSENGER_FARE },
    { key: 'SPECIAL_TRIP', label: t.SPECIAL_TRIP },
    { key: 'RESERVED_TRIP', label: t.RESERVED_TRIP },
    { key: 'DELIVERY_INCOME', label: t.DELIVERY_INCOME },
    { key: 'OTHER_INCOME', label: t.OTHER_INCOME },
  ];

  return (
    <div className="space-y-4 pb-24">
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <span>{t.income}</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              {formatCurrency(totalFilteredPoisha, lang)}
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {formatNumber(filteredIncomes.length, lang)} {lang === 'bn' ? 'টি এন্ট্রি সংরক্ষিত' : 'entries recorded'}
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-emerald-900/30 active:scale-95 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{t.addIncome}</span>
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="space-y-2">
        <div className="flex flex-col sm:flex-row gap-2">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.search}
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          {/* Date Segmented Control */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl shrink-0">
            <button
              onClick={() => setDateFilter('ALL')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                dateFilter === 'ALL'
                  ? 'bg-slate-800 text-amber-400 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.all}
            </button>
            <button
              onClick={() => setDateFilter('TODAY')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                dateFilter === 'TODAY'
                  ? 'bg-slate-800 text-emerald-400 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {lang === 'bn' ? 'আজ' : 'Today'}
            </button>
            <button
              onClick={() => setDateFilter('MONTH')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                dateFilter === 'MONTH'
                  ? 'bg-slate-800 text-amber-400 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {lang === 'bn' ? 'চলতি মাস' : 'This Month'}
            </button>
          </div>
        </div>

        {/* Category Horizontal Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-2.5 py-1 rounded-lg border whitespace-nowrap font-medium transition-colors ${
              selectedCategory === 'ALL'
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            {t.all}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-2.5 py-1 rounded-lg border whitespace-nowrap font-medium transition-colors ${
                selectedCategory === cat.key
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Income List */}
      {filteredIncomes.length === 0 ? (
        <div className="bg-slate-900/50 rounded-2xl p-8 text-center border border-slate-800">
          <p className="text-slate-400 text-xs sm:text-sm">{t.noData}</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {filteredIncomes.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900/80 rounded-xl p-3.5 border border-slate-800 hover:border-emerald-500/30 transition-all shadow-sm group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {t[item.category] || item.category}
                    </span>
                    <span className="text-xs text-slate-400">
                      {item.date} · {item.time}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-slate-100 mt-1.5">
                    {item.tripDescription}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-400">
                    <span className="flex items-center gap-1 text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>{item.startLocation}</span>
                      <span>➔</span>
                      <span>{item.destination}</span>
                    </span>

                    {item.distanceKm && (
                      <span className="flex items-center gap-1 font-mono text-slate-400">
                        <Navigation className="w-3 h-3" />
                        {formatNumber(item.distanceKm, lang)} {lang === 'bn' ? 'কিমি' : 'km'}
                      </span>
                    )}

                    {item.customerName && (
                      <span className="text-amber-300/90 font-medium">
                        {item.customerName}
                      </span>
                    )}

                    <span className="flex items-center gap-1 font-mono text-slate-400">
                      <CreditCard className="w-3 h-3" />
                      {t[item.paymentMethod] || item.paymentMethod}
                    </span>
                  </div>

                  {item.notes && (
                    <p className="text-xs text-slate-500 mt-1 italic">
                      "{item.notes}"
                    </p>
                  )}
                </div>

                <div className="text-right shrink-0">
                  <div className="text-base sm:text-lg font-bold font-mono text-emerald-400 tabular-nums">
                    +{formatCurrency(item.amountPoisha, lang)}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-1 mt-3">
                    <button
                      onClick={() => onGenerateVoucher(item)}
                      className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition-colors"
                      title={t.generateVoucher}
                    >
                      <Receipt className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors"
                      title={t.editIncome}
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(t.deleteConfirm)) {
                          onDeleteIncome(item.id);
                        }
                      }}
                      className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
                      title={t.delete}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-5 shadow-2xl relative my-8">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base sm:text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
              <span>{editingItem ? t.editIncome : t.addIncome}</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs sm:text-sm">
              {/* Amount */}
              <div>
                <label className="block text-slate-400 font-medium mb-1">
                  {t.amount} (৳ BDT) *
                </label>
                <input
                  type="number"
                  step="any"
                  required
                  placeholder="যেমন: 500"
                  value={amountTaka}
                  onChange={(e) => setAmountTaka(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono text-base focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">{t.date} *</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">{t.time} *</label>
                  <input
                    type="time"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-slate-400 font-medium mb-1">{t.category} *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as IncomeCategory)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                >
                  {categories.map((c) => (
                    <option key={c.key} value={c.key}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Route: Start & Destination */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">{t.startLocation} *</label>
                  <input
                    type="text"
                    required
                    value={startLocation}
                    onChange={(e) => setStartLocation(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">{t.destination} *</label>
                  <input
                    type="text"
                    required
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Trip Description */}
              <div>
                <label className="block text-slate-400 font-medium mb-1">{t.description}</label>
                <input
                  type="text"
                  placeholder="যেমন: বরুড়া বাজার লোকাল যাত্রী ট্রিপ"
                  value={tripDescription}
                  onChange={(e) => setTripDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Customer Name & Distance */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">{t.customerName}</label>
                  <input
                    type="text"
                    placeholder="ঐচ্ছিক"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">{t.distance}</label>
                  <input
                    type="number"
                    step="any"
                    placeholder="যেমন: 8.5"
                    value={distanceKm}
                    onChange={(e) => setDistanceKm(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-slate-400 font-medium mb-1">{t.paymentMethod} *</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                >
                  <option value="CASH">{t.CASH}</option>
                  <option value="BKASH">{t.BKASH}</option>
                  <option value="NAGAD">{t.NAGAD}</option>
                  <option value="BANK">{t.BANK}</option>
                  <option value="OTHER">{t.OTHER}</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-slate-400 font-medium mb-1">{t.notes}</label>
                <input
                  type="text"
                  placeholder="অন্যান্য প্রাসঙ্গিক তথ্য"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Submit / Cancel Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-all shadow-md shadow-emerald-950/40"
                >
                  {t.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
