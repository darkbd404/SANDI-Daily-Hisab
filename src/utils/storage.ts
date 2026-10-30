import {
  IncomeItem,
  ExpenseItem,
  DailyVoucherItem,
  BatteryRecord,
  MaintenanceRecord,
  OwnerProfile,
  VehicleProfile,
  AppSettings,
  BackupData,
} from '../types';

export const INITIAL_OWNER_PROFILE: OwnerProfile = {
  name: 'আব্দুছ ছালাম',
  village: 'ফলকামুড়ী',
  postOffice: 'আমড়াতলী বাজার',
  policeStation: 'বরুড়া',
  district: 'কুমিল্লা',
  mobile1: '০১৬২০২৩০৮৬৪',
  mobile2: '০১৬৩২৩৩১৮৬৪',
  email: 'salam230864@gmail.com',
  photoUrl: '/public/assets/aistudio/abdus_salam_968dd59e.jpg',
  // Clean transparent background signature
  signatureUrl: '/public/assets/aistudio/salam_signature_clean.png',
};

export const INITIAL_VEHICLE_PROFILE: VehicleProfile = {
  name: 'SANDI',
  manufacturer: 'Sandi', // Strictly Sandi Company
  model: 'SANDI Passenger Electric Easy Bike',
  registrationNumber: 'কুমিল্লা-থ-১১-৪৫০২',
  purchaseDate: '2025-03-15',
  purchasePricePoisha: 28500000, // 2,85,000 BDT
  batteryType: '60V 130Ah Deep Cycle Tubular Lead-Acid',
  batteryVoltage: '60V (5 x 12V 130Ah)',
  motorSpecs: '1200W Differential High Torque Brushless DC (BLDC)',
  photoUrl: '/public/assets/aistudio/sandi_vehicle_d117164c.jpg',
  notes: 'Sandi Company-র ব্যক্তিগত যাত্রীবাহী অটো ইজি বাইক। রেগুলার রুট: বরুড়া বাজার - আমড়াতলী - ফলকামুড়ী।',
};

export const INITIAL_SETTINGS: AppSettings = {
  language: 'bn',
  currencySymbol: '৳',
  theme: 'dark',
  isPinEnabled: false,
  autoLockMinutes: 5,
  enableDailyReminder: true,
  enableBatteryReminder: true,
  enableBackupReminder: true,
};

// Generate today's date in YYYY-MM-DD
export const getTodayDate = (): string => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getCurrentTime = (): string => {
  const d = new Date();
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

const today = getTodayDate();

export const INITIAL_INCOMES: IncomeItem[] = [
  {
    id: 'inc-001',
    amountPoisha: 85000, // 850 BDT
    date: today,
    time: '08:30',
    category: 'PASSENGER_FARE',
    tripDescription: 'সকালের ট্রিপ: ফলকামুড়ী টু বরুড়া বাজার (লোকাল যাত্রী)',
    startLocation: 'ফলকামুড়ী',
    destination: 'বরুড়া বাজার',
    distanceKm: 8.5,
    paymentMethod: 'CASH',
    notes: 'সকালে যাত্রী চাপ ভালো ছিল',
    createdAt: Date.now() - 1000 * 60 * 240,
  },
  {
    id: 'inc-002',
    amountPoisha: 60000, // 600 BDT
    date: today,
    time: '11:15',
    category: 'RESERVED_TRIP',
    tripDescription: 'আমড়াতলী বাজার থেকে বরুড়া উপজেলা স্বাস্থ্য কমপ্লেক্স রোগী রিজার্ভ',
    customerName: 'মাওলানা আব্দুল হক',
    startLocation: 'আমড়াতলী বাজার',
    destination: 'উপজেলা স্বাস্থ্য কমপ্লেক্স',
    distanceKm: 12.0,
    paymentMethod: 'BKASH',
    notes: 'যাওয়ার ও আসার রিজার্ভ ভাড়া',
    createdAt: Date.now() - 1000 * 60 * 180,
  },
  {
    id: 'inc-003',
    amountPoisha: 45000, // 450 BDT
    date: today,
    time: '14:20',
    category: 'PASSENGER_FARE',
    tripDescription: 'দুপুরের ট্রিপ: বরুড়া বাজার টু আমড়াতলী স্ট্যান্ড',
    startLocation: 'বরুড়া বাজার',
    destination: 'আমড়াতলী স্ট্যান্ড',
    distanceKm: 7.0,
    paymentMethod: 'CASH',
    createdAt: Date.now() - 1000 * 60 * 60,
  },
  {
    id: 'inc-004',
    amountPoisha: 120000, // 1200 BDT
    date: '2026-10-29',
    time: '18:45',
    category: 'SPECIAL_TRIP',
    tripDescription: 'কুমিল্লা পদুয়ার বাজার বিশ্বরোড স্পেশাল ট্রিপ',
    customerName: 'জনাব রফিকুল ইসলাম',
    startLocation: 'বরুড়া',
    destination: 'বিশ্বরোড',
    distanceKm: 22.0,
    paymentMethod: 'CASH',
    notes: 'সন্ধ্যায় যাত্রী নিয়ে বিশ্বরোড পৌঁছানো',
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
  },
  {
    id: 'inc-005',
    amountPoisha: 95000, // 950 BDT
    date: '2026-10-28',
    time: '19:30',
    category: 'PASSENGER_FARE',
    tripDescription: 'সারাদিনের সাধারণ ট্রিপ সমূহ',
    startLocation: 'বরুড়া',
    destination: 'ফলকামুড়ী ও আশপাশ',
    paymentMethod: 'CASH',
    createdAt: Date.now() - 1000 * 60 * 60 * 48,
  },
];

export const INITIAL_EXPENSES: ExpenseItem[] = [
  {
    id: 'exp-001',
    amountPoisha: 14000, // 140 BDT
    date: today,
    time: '06:00',
    category: 'BATTERY_CHARGING',
    description: 'রাত্রিকালীন ফুল চার্জিং গ্যারেজ বিল',
    vendorName: 'সৌরভ গ্যারেজ ও চার্জিং পয়েন্ট',
    paymentMethod: 'CASH',
    location: 'আমড়াতলী বাজার',
    notes: '৮ ঘণ্টা ফুল নাইট চার্জ',
    createdAt: Date.now() - 1000 * 60 * 360,
  },
  {
    id: 'exp-002',
    amountPoisha: 8000, // 80 BDT
    date: today,
    time: '13:00',
    category: 'PERSONAL_EXPENSE',
    description: 'দুপুরের নাস্তা ও চা-পানি খরচ',
    vendorName: 'মালেক টি স্টল',
    paymentMethod: 'CASH',
    location: 'বরুড়া বাস স্ট্যান্ড',
    createdAt: Date.now() - 1000 * 60 * 120,
  },
  {
    id: 'exp-003',
    amountPoisha: 35000, // 350 BDT
    date: '2026-10-27',
    time: '16:00',
    category: 'TIRE_TUBE',
    description: 'পেছনের বাম চাকার টিউব পাংচার মেরামত ও নতুন ভাল্ব',
    vendorName: 'আল-মদিনা টায়ার সার্ভিস',
    paymentMethod: 'CASH',
    location: 'বরুড়া বাজার',
    createdAt: Date.now() - 1000 * 60 * 60 * 72,
  },
];

export const INITIAL_BATTERY_RECORDS: BatteryRecord[] = [
  {
    id: 'bat-001',
    date: today,
    time: '06:00',
    chargingUnits: 6.5,
    costPoisha: 14000,
    chargingDurationHours: 7.5,
    batteryHealthPercent: 92,
    notes: 'ফুল চার্জ ভোল্টেজ ৬৮.৪V, প্রতিটি সেল পানির লেভেল নরমাল',
    createdAt: Date.now() - 1000 * 60 * 360,
  },
  {
    id: 'bat-002',
    date: '2026-10-29',
    time: '06:15',
    chargingUnits: 6.8,
    costPoisha: 14000,
    chargingDurationHours: 8.0,
    batteryHealthPercent: 92,
    notes: 'চার্জ ভালো ধরে রাখছে, মাইলেজ প্রায় ৬০ কিমি প্রতি ফুল চার্জে',
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
  },
  {
    id: 'bat-003',
    date: '2026-10-28',
    time: '06:00',
    chargingUnits: 7.0,
    costPoisha: 14000,
    chargingDurationHours: 8.0,
    batteryHealthPercent: 93,
    createdAt: Date.now() - 1000 * 60 * 60 * 48,
  },
];

export const INITIAL_MAINTENANCE_RECORDS: MaintenanceRecord[] = [
  {
    id: 'maint-001',
    date: '2026-10-15',
    workshopName: 'ভাই ভাই ইজি বাইক ওয়ার্কশপ',
    partsReplaced: 'ফ্রন্ট ব্রেক শু, ডিফারেনশিয়াল গিয়ার ওয়েল পরিবর্তন',
    serviceDescription: 'সামনের চাকার ব্রেক সার্ভিসিং এবং নতুন গিয়ার অয়েল দেওয়া হয়েছে',
    costPoisha: 85000, // 850 BDT
    nextServiceDueDate: '2026-12-15',
    notes: 'মেকানিক মিলন মিয়া কাজটি করেছেন। বাইকের রান স্মুথ হয়েছে।',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 15,
  },
];

// Helper to compute a single consolidated daily voucher for any given date
export const buildDailyConsolidatedVoucher = (
  date: string,
  incomes: IncomeItem[],
  expenses: ExpenseItem[],
  owner: OwnerProfile,
  vehicle: VehicleProfile
): DailyVoucherItem => {
  const dayIncomes = incomes.filter((i) => i.date === date);
  const dayExpenses = expenses.filter((e) => e.date === date);

  const totalIncomePoisha = dayIncomes.reduce((sum, item) => sum + item.amountPoisha, 0);
  const totalExpensePoisha = dayExpenses.reduce((sum, item) => sum + item.amountPoisha, 0);
  const netProfitPoisha = totalIncomePoisha - totalExpensePoisha;

  return {
    id: `voucher-${date}`,
    voucherNumber: `SDI-${date.replace(/-/g, '')}`,
    date,
    generatedTime: getCurrentTime(),
    totalIncomePoisha,
    totalExpensePoisha,
    netProfitPoisha,
    incomes: dayIncomes,
    expenses: dayExpenses,
    ownerSnapshot: { ...owner },
    vehicleSnapshot: { ...vehicle, manufacturer: 'Sandi' },
    createdAt: Date.now(),
  };
};

export const INITIAL_VOUCHERS: DailyVoucherItem[] = [
  buildDailyConsolidatedVoucher(
    today,
    INITIAL_INCOMES,
    INITIAL_EXPENSES,
    INITIAL_OWNER_PROFILE,
    INITIAL_VEHICLE_PROFILE
  ),
  buildDailyConsolidatedVoucher(
    '2026-10-29',
    INITIAL_INCOMES,
    INITIAL_EXPENSES,
    INITIAL_OWNER_PROFILE,
    INITIAL_VEHICLE_PROFILE
  ),
];

// LocalStorage Keys
const STORAGE_KEYS = {
  OWNER: 'sandi_owner_profile',
  VEHICLE: 'sandi_vehicle_profile',
  SETTINGS: 'sandi_settings',
  INCOMES: 'sandi_incomes',
  EXPENSES: 'sandi_expenses',
  BATTERY: 'sandi_battery_records',
  MAINTENANCE: 'sandi_maintenance_records',
  VOUCHERS: 'sandi_daily_vouchers',
};

// PIN hash helper with salt
export const hashPin = (pin: string, salt: string): string => {
  let hash = 0;
  const combined = `${salt}-${pin}-${salt}`;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return hash.toString(16);
};

export const generateSalt = (): string => {
  return Math.random().toString(36).substring(2, 10);
};

export class SandiStorage {
  static getOwnerProfile(): OwnerProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.OWNER);
      if (data) {
        const p = JSON.parse(data);
        // Ensure signature points to clean transparent signature
        p.signatureUrl = '/public/assets/aistudio/salam_signature_clean.png';
        return p;
      }
      return INITIAL_OWNER_PROFILE;
    } catch {
      return INITIAL_OWNER_PROFILE;
    }
  }

  static saveOwnerProfile(profile: OwnerProfile): void {
    localStorage.setItem(STORAGE_KEYS.OWNER, JSON.stringify(profile));
  }

  static getVehicleProfile(): VehicleProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.VEHICLE);
      if (data) {
        const v = JSON.parse(data);
        v.manufacturer = 'Sandi'; // Strictly Sandi
        return v;
      }
      return INITIAL_VEHICLE_PROFILE;
    } catch {
      return INITIAL_VEHICLE_PROFILE;
    }
  }

  static saveVehicleProfile(profile: VehicleProfile): void {
    profile.manufacturer = 'Sandi';
    localStorage.setItem(STORAGE_KEYS.VEHICLE, JSON.stringify(profile));
  }

  static getSettings(): AppSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? JSON.parse(data) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  }

  static saveSettings(settings: AppSettings): void {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }

  static getIncomes(): IncomeItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.INCOMES);
      return data ? JSON.parse(data) : INITIAL_INCOMES;
    } catch {
      return INITIAL_INCOMES;
    }
  }

  static saveIncomes(incomes: IncomeItem[]): void {
    localStorage.setItem(STORAGE_KEYS.INCOMES, JSON.stringify(incomes));
  }

  static getExpenses(): ExpenseItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.EXPENSES);
      return data ? JSON.parse(data) : INITIAL_EXPENSES;
    } catch {
      return INITIAL_EXPENSES;
    }
  }

  static saveExpenses(expenses: ExpenseItem[]): void {
    localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
  }

  static getBatteryRecords(): BatteryRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BATTERY);
      return data ? JSON.parse(data) : INITIAL_BATTERY_RECORDS;
    } catch {
      return INITIAL_BATTERY_RECORDS;
    }
  }

  static saveBatteryRecords(records: BatteryRecord[]): void {
    localStorage.setItem(STORAGE_KEYS.BATTERY, JSON.stringify(records));
  }

  static getMaintenanceRecords(): MaintenanceRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MAINTENANCE);
      return data ? JSON.parse(data) : INITIAL_MAINTENANCE_RECORDS;
    } catch {
      return INITIAL_MAINTENANCE_RECORDS;
    }
  }

  static saveMaintenanceRecords(records: MaintenanceRecord[]): void {
    localStorage.setItem(STORAGE_KEYS.MAINTENANCE, JSON.stringify(records));
  }

  static getVouchers(): DailyVoucherItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.VOUCHERS);
      return data ? JSON.parse(data) : INITIAL_VOUCHERS;
    } catch {
      return INITIAL_VOUCHERS;
    }
  }

  static saveVouchers(vouchers: DailyVoucherItem[]): void {
    localStorage.setItem(STORAGE_KEYS.VOUCHERS, JSON.stringify(vouchers));
  }

  // Get or generate the single Daily Master Voucher for a date
  static getDailyVoucherForDate(
    date: string,
    incomes: IncomeItem[],
    expenses: ExpenseItem[],
    owner: OwnerProfile,
    vehicle: VehicleProfile
  ): DailyVoucherItem {
    const vouchers = this.getVouchers();
    const existing = vouchers.find((v) => v.date === date);
    if (existing) {
      // Re-sync with latest incomes & expenses for that day
      const dayIncomes = incomes.filter((i) => i.date === date);
      const dayExpenses = expenses.filter((e) => e.date === date);
      const totalIncomePoisha = dayIncomes.reduce((s, i) => s + i.amountPoisha, 0);
      const totalExpensePoisha = dayExpenses.reduce((s, e) => s + e.amountPoisha, 0);
      return {
        ...existing,
        incomes: dayIncomes,
        expenses: dayExpenses,
        totalIncomePoisha,
        totalExpensePoisha,
        netProfitPoisha: totalIncomePoisha - totalExpensePoisha,
        ownerSnapshot: { ...owner, signatureUrl: '/public/assets/aistudio/salam_signature_clean.png' },
        vehicleSnapshot: { ...vehicle, manufacturer: 'Sandi' },
      };
    }
    return buildDailyConsolidatedVoucher(date, incomes, expenses, owner, vehicle);
  }

  // Get all unique dates in the past 30 days that have transactions
  static getRecentTransactionDates(incomes: IncomeItem[], expenses: ExpenseItem[]): string[] {
    const datesSet = new Set<string>();
    incomes.forEach((i) => datesSet.add(i.date));
    expenses.forEach((e) => datesSet.add(e.date));
    datesSet.add(getTodayDate());
    return Array.from(datesSet).sort((a, b) => b.localeCompare(a));
  }

  static createFullBackup(): BackupData {
    return {
      version: 1,
      exportDate: new Date().toISOString(),
      ownerProfile: this.getOwnerProfile(),
      vehicleProfile: this.getVehicleProfile(),
      incomes: this.getIncomes(),
      expenses: this.getExpenses(),
      vouchers: this.getVouchers(),
      batteryRecords: this.getBatteryRecords(),
      maintenanceRecords: this.getMaintenanceRecords(),
      settings: this.getSettings(),
    };
  }

  static restoreFullBackup(backup: BackupData): { success: boolean; message: string } {
    try {
      if (!backup || !backup.version || !backup.incomes || !backup.expenses) {
        return { success: false, message: 'অকার্যকর ব্যাকআপ ফাইল ফরম্যাট' };
      }

      if (backup.ownerProfile) this.saveOwnerProfile(backup.ownerProfile);
      if (backup.vehicleProfile) this.saveVehicleProfile(backup.vehicleProfile);
      if (backup.incomes) this.saveIncomes(backup.incomes);
      if (backup.expenses) this.saveExpenses(backup.expenses);
      if (backup.vouchers) this.saveVouchers(backup.vouchers);
      if (backup.batteryRecords) this.saveBatteryRecords(backup.batteryRecords);
      if (backup.maintenanceRecords) this.saveMaintenanceRecords(backup.maintenanceRecords);
      if (backup.settings) this.saveSettings(backup.settings);

      return { success: true, message: 'সফলভাবে সকল ডাটা রিস্টোর করা হয়েছে' };
    } catch (e: any) {
      return { success: false, message: e.message || 'রিস্টোর করতে সমস্যা হয়েছে' };
    }
  }

  static exportTransactionsToCsv(incomes: IncomeItem[], expenses: ExpenseItem[]): string {
    const headers = ['Type', 'ID', 'Date', 'Time', 'Category', 'Description', 'Amount_BDT', 'Payment_Method', 'Location_Notes'];
    const rows: string[] = [headers.join(',')];

    incomes.forEach((inc) => {
      rows.push([
        'INCOME',
        `"${inc.id}"`,
        `"${inc.date}"`,
        `"${inc.time}"`,
        `"${inc.category}"`,
        `"${inc.tripDescription.replace(/"/g, '""')}"`,
        (inc.amountPoisha / 100).toFixed(2),
        `"${inc.paymentMethod}"`,
        `"${(inc.startLocation + ' -> ' + inc.destination).replace(/"/g, '""')}"`,
      ].join(','));
    });

    expenses.forEach((exp) => {
      rows.push([
        'EXPENSE',
        `"${exp.id}"`,
        `"${exp.date}"`,
        `"${exp.time}"`,
        `"${exp.category}"`,
        `"${exp.description.replace(/"/g, '""')}"`,
        (exp.amountPoisha / 100).toFixed(2),
        `"${exp.paymentMethod}"`,
        `"${(exp.vendorName + (exp.location ? ' - ' + exp.location : '')).replace(/"/g, '""')}"`,
      ].join(','));
    });

    return rows.join('\n');
  }
}
