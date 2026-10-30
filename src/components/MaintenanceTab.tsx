import React, { useState } from 'react';
import { 
  Wrench, 
  Plus, 
  Calendar, 
  Clock, 
  Trash2, 
  X, 
  AlertCircle,
  CheckCircle2,
  BellRing
} from 'lucide-react';
import { MaintenanceRecord } from '../types';
import { 
  translations, 
  Language, 
  formatCurrency, 
  formatNumber 
} from '../utils/translations';
import { getTodayDate } from '../utils/storage';

interface MaintenanceTabProps {
  maintenanceRecords: MaintenanceRecord[];
  lang: Language;
  onAddMaintenanceRecord: (record: MaintenanceRecord) => void;
  onDeleteMaintenanceRecord: (id: string) => void;
}

export const MaintenanceTab: React.FC<MaintenanceTabProps> = ({
  maintenanceRecords,
  lang,
  onAddMaintenanceRecord,
  onDeleteMaintenanceRecord,
}) => {
  const t = translations[lang];
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [date, setDate] = useState(getTodayDate());
  const [workshopName, setWorkshopName] = useState('ভাই ভাই ইজি বাইক ওয়ার্কশপ');
  const [partsReplaced, setPartsReplaced] = useState('ফ্রন্ট ব্রেক শু, গিয়ার অয়েল');
  const [serviceDescription, setServiceDescription] = useState('সামনের চাকার ব্রেক সার্ভিসিং ও নতুন গিয়ার অয়েল');
  const [costTaka, setCostTaka] = useState('850');
  const [nextServiceDueDate, setNextServiceDueDate] = useState('2026-12-15');
  const [notes, setNotes] = useState('মেকানিক মিলন মিয়া কাজ করেছেন');

  const totalMaintenancePoisha = maintenanceRecords.reduce((acc, curr) => acc + curr.costPoisha, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cost = parseFloat(costTaka);
    if (isNaN(cost) || cost <= 0) return;

    const newRecord: MaintenanceRecord = {
      id: `maint-${Date.now()}`,
      date,
      workshopName,
      partsReplaced,
      serviceDescription,
      costPoisha: Math.round(cost * 100),
      nextServiceDueDate: nextServiceDueDate || undefined,
      notes: notes || undefined,
      createdAt: Date.now(),
    };

    onAddMaintenanceRecord(newRecord);
    setIsModalOpen(false);
  };

  const nextReminder = maintenanceRecords.find((r) => r.nextServiceDueDate);

  return (
    <div className="space-y-4 pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-amber-400" />
            <span>{t.maintenanceTitle}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            গাড়ির সার্ভিসিং, যন্ত্রাংশ পরিবর্তন ও ওয়ার্কশপ লগ
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{t.addMaintenance}</span>
        </button>
      </div>

      {/* Reminder Banner */}
      {nextReminder && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-start gap-3 text-slate-200">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
            <BellRing className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">
              {t.nextReminder}
            </span>
            <p className="text-sm font-bold text-slate-100 mt-0.5 font-mono">
              {nextReminder.nextServiceDueDate}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              পূর্ববর্তী সার্ভিস: {nextReminder.serviceDescription} ({nextReminder.workshopName})
            </p>
          </div>
        </div>
      )}

      {/* Total Maintenance Expense Summary */}
      <div className="bg-slate-900/60 rounded-xl p-3.5 border border-slate-800 flex items-center justify-between">
        <span className="text-xs text-slate-400 font-medium">
          মোট সার্ভিসিং ও মেরামত ব্যয়
        </span>
        <span className="text-lg font-bold font-mono text-rose-400 tabular-nums">
          {formatCurrency(totalMaintenancePoisha, lang)}
        </span>
      </div>

      {/* Maintenance List */}
      <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800 space-y-3">
        <h3 className="text-sm font-semibold text-slate-200">
          সার্ভিসিং ও পার্টস পরিবর্তনের ইতিহাস ({maintenanceRecords.length})
        </h3>

        {maintenanceRecords.length === 0 ? (
          <p className="text-xs text-slate-500 py-6 text-center">{t.noData}</p>
        ) : (
          <div className="divide-y divide-slate-800/80">
            {maintenanceRecords.map((item) => (
              <div
                key={item.id}
                className="py-3 flex items-start justify-between gap-3 hover:bg-slate-800/30 px-2 rounded-lg transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold font-mono text-rose-400">
                      {formatCurrency(item.costPoisha, lang)}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {item.date}
                    </span>
                  </div>

                  <h4 className="text-sm font-semibold text-slate-100 mt-1">
                    {item.serviceDescription}
                  </h4>

                  <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-slate-400">
                    <span className="text-amber-400 font-medium">
                      ওয়ার্কশপ: {item.workshopName}
                    </span>
                    <span className="text-slate-300">
                      যন্ত্রাংশ: {item.partsReplaced}
                    </span>
                    {item.nextServiceDueDate && (
                      <span className="text-sky-400 font-mono">
                        পরবর্তী সার্ভিস: {item.nextServiceDueDate}
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
                      onDeleteMaintenanceRecord(item.id);
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

      {/* Add Maintenance Modal */}
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
              <Wrench className="w-4 h-4 text-amber-400" />
              <span>{t.addMaintenance}</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block text-slate-400 font-medium mb-1">
                  {t.serviceCost} (৳ BDT) *
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
                <label className="block text-slate-400 font-medium mb-1">{t.workshop} *</label>
                <input
                  type="text"
                  required
                  placeholder="ওয়ার্কশপের নাম"
                  value={workshopName}
                  onChange={(e) => setWorkshopName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">সার্ভিস বিবরণ *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: ডিফারেনশিয়াল অয়েল ও ব্রেক সার্ভিস"
                  value={serviceDescription}
                  onChange={(e) => setServiceDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">{t.partsReplaced}</label>
                <input
                  type="text"
                  placeholder="যেমন: সামনের ব্রেক শু, নতুন টিউব"
                  value={partsReplaced}
                  onChange={(e) => setPartsReplaced(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">{t.nextReminder}</label>
                <input
                  type="date"
                  value={nextServiceDueDate}
                  onChange={(e) => setNextServiceDueDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">{t.notes}</label>
                <input
                  type="text"
                  placeholder="মেকানিক বা যন্ত্রাংশের গ্যারান্টি তথ্য"
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
