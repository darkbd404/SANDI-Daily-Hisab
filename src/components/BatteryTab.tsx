import React, { useState } from 'react';
import { 
  BatteryCharging, 
  Plus, 
  Zap, 
  Clock, 
  Calendar, 
  Activity, 
  Trash2, 
  X,
  Gauge,
  Sparkles
} from 'lucide-react';
import { BatteryRecord, VehicleProfile } from '../types';
import { 
  translations, 
  Language, 
  formatCurrency, 
  formatNumber 
} from '../utils/translations';
import { getTodayDate, getCurrentTime } from '../utils/storage';

interface BatteryTabProps {
  batteryRecords: BatteryRecord[];
  vehicle: VehicleProfile;
  lang: Language;
  onAddBatteryRecord: (record: BatteryRecord) => void;
  onDeleteBatteryRecord: (id: string) => void;
}

export const BatteryTab: React.FC<BatteryTabProps> = ({
  batteryRecords,
  vehicle,
  lang,
  onAddBatteryRecord,
  onDeleteBatteryRecord,
}) => {
  const t = translations[lang];
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [costTaka, setCostTaka] = useState('140');
  const [date, setDate] = useState(getTodayDate());
  const [time, setTime] = useState(getCurrentTime());
  const [chargingUnits, setChargingUnits] = useState('6.5');
  const [chargingDurationHours, setChargingDurationHours] = useState('7.5');
  const [batteryHealthPercent, setBatteryHealthPercent] = useState('92');
  const [notes, setNotes] = useState('ফুল চার্জ ভোল্টেজ ৬৮V, অ্যাসিড পানির লেভেল ঠিক আছে');

  const todayStr = getTodayDate();
  const currentMonthStr = todayStr.substring(0, 7);

  // Calculate monthly charging total in Poisha
  const monthlyRecords = batteryRecords.filter((r) => r.date.startsWith(currentMonthStr));
  const monthlyChargingPoisha = monthlyRecords.reduce((acc, curr) => acc + curr.costPoisha, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cost = parseFloat(costTaka);
    if (isNaN(cost) || cost <= 0) return;

    const newRecord: BatteryRecord = {
      id: `bat-${Date.now()}`,
      date,
      time,
      costPoisha: Math.round(cost * 100),
      chargingUnits: chargingUnits ? parseFloat(chargingUnits) : undefined,
      chargingDurationHours: chargingDurationHours ? parseFloat(chargingDurationHours) : undefined,
      batteryHealthPercent: batteryHealthPercent ? parseInt(batteryHealthPercent, 10) : undefined,
      notes: notes || undefined,
      createdAt: Date.now(),
    };

    onAddBatteryRecord(newRecord);
    setIsModalOpen(false);
  };

  const latestRecord = batteryRecords[0];

  return (
    <div className="space-y-4 pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <BatteryCharging className="w-5 h-5 text-amber-400" />
            <span>{t.batteryTitle}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            ব্যাটারি চার্জিং খরচ ও লাইফসাইকেল ট্র্যাকিং
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{t.addChargingRecord}</span>
        </button>
      </div>

      {/* Battery Hardware Specs & Health Card */}
      <div className="bg-gradient-to-br from-slate-900 to-amber-950/30 rounded-2xl p-4 border border-amber-500/20 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Metric 1: Monthly Charging Cost */}
        <div className="bg-slate-950/70 rounded-xl p-3 border border-slate-800">
          <div className="text-xs text-slate-400 font-medium">{t.monthlyChargingTotal}</div>
          <div className="text-xl font-black text-amber-400 mt-1 font-mono tabular-nums">
            {formatCurrency(monthlyChargingPoisha, lang)}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {formatNumber(monthlyRecords.length, lang)} {lang === 'bn' ? 'টি চার্জিং সাইকেল' : 'cycles logged'}
          </div>
        </div>

        {/* Metric 2: Estimated Health */}
        <div className="bg-slate-950/70 rounded-xl p-3 border border-slate-800">
          <div className="text-xs text-slate-400 font-medium flex items-center justify-between">
            <span>{t.batteryHealth}</span>
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-xl font-black text-emerald-400 mt-1 font-mono tabular-nums">
            {latestRecord?.batteryHealthPercent || 92}%
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {lang === 'bn' ? 'চমৎকার কন্ডিশনে আছে' : 'Good operating condition'}
          </div>
        </div>

        {/* Metric 3: Battery Hardware Config */}
        <div className="bg-slate-950/70 rounded-xl p-3 border border-slate-800">
          <div className="text-xs text-slate-400 font-medium flex items-center justify-between">
            <span>{t.batterySpecs}</span>
            <Gauge className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-sm font-bold text-slate-200 mt-1">
            {vehicle.batteryVoltage} · 130Ah
          </div>
          <div className="text-[11px] text-slate-500 mt-1 truncate">
            {vehicle.batteryType}
          </div>
        </div>
      </div>

      {/* Charging Records List */}
      <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800 space-y-3">
        <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-400" />
          <span>চার্জিং ইতিহাস ও লগ ({batteryRecords.length})</span>
        </h3>

        {batteryRecords.length === 0 ? (
          <p className="text-xs text-slate-500 py-6 text-center">{t.noData}</p>
        ) : (
          <div className="divide-y divide-slate-800/80">
            {batteryRecords.map((item) => (
              <div
                key={item.id}
                className="py-3 flex items-center justify-between gap-3 hover:bg-slate-800/30 px-2 rounded-lg transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {formatCurrency(item.costPoisha, lang)}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {item.date} · {item.time}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-slate-400">
                    {item.chargingUnits && (
                      <span className="flex items-center gap-1 font-mono text-slate-300">
                        <Zap className="w-3 h-3 text-amber-400" />
                        {formatNumber(item.chargingUnits, lang)} {lang === 'bn' ? 'ইউনিট' : 'kWh'}
                      </span>
                    )}
                    {item.chargingDurationHours && (
                      <span className="flex items-center gap-1 font-mono text-slate-400">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {formatNumber(item.chargingDurationHours, lang)} {lang === 'bn' ? 'ঘণ্টা' : 'hrs'}
                      </span>
                    )}
                    {item.batteryHealthPercent && (
                      <span className="text-emerald-400 font-mono">
                        হেলথ: {item.batteryHealthPercent}%
                      </span>
                    )}
                  </div>

                  {item.notes && (
                    <p className="text-[11px] text-slate-500 mt-1 italic">
                      "{item.notes}"
                    </p>
                  )}
                </div>

                <button
                  onClick={() => {
                    if (window.confirm(t.deleteConfirm)) {
                      onDeleteBatteryRecord(item.id);
                    }
                  }}
                  className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
                  title={t.delete}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Charging Log Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-5 shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <BatteryCharging className="w-4 h-4 text-amber-400" />
              <span>{t.addChargingRecord}</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block text-slate-400 font-medium mb-1">
                  {t.chargingCost} (৳ BDT) *
                </label>
                <input
                  type="number"
                  step="any"
                  required
                  value={costTaka}
                  onChange={(e) => setCostTaka(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono text-base focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">{t.date} *</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">{t.time} *</label>
                  <input
                    type="time"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">
                    {t.chargingUnits}
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={chargingUnits}
                    onChange={(e) => setChargingUnits(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">
                    {t.chargingHours}
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={chargingDurationHours}
                    onChange={(e) => setChargingDurationHours(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">
                  ব্যাটারি হেলথ রিডিং (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={batteryHealthPercent}
                  onChange={(e) => setBatteryHealthPercent(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">{t.notes}</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-medium"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
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
