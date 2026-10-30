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

export const INITIAL_INCOMES: IncomeItem[] = [];

export const INITIAL_EXPENSES: ExpenseItem[] = [];

export const INITIAL_BATTERY_RECORDS: BatteryRecord[] = [];

export const INITIAL_MAINTENANCE_RECORDS: MaintenanceRecord[] = [];

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

export const INITIAL_VOUCHERS: DailyVoucherItem[] = [];

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
      if (!data) return [];
      const parsed: IncomeItem[] = JSON.parse(data);
      // Strip any residual demo mock items
      const filtered = parsed.filter((i) => !i.id.startsWith('inc-00'));
      if (filtered.length !== parsed.length) {
        this.saveIncomes(filtered);
      }
      return filtered;
    } catch {
      return [];
    }
  }

  static saveIncomes(incomes: IncomeItem[]): void {
    localStorage.setItem(STORAGE_KEYS.INCOMES, JSON.stringify(incomes));
  }

  static getExpenses(): ExpenseItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.EXPENSES);
      if (!data) return [];
      const parsed: ExpenseItem[] = JSON.parse(data);
      // Strip any residual demo mock items
      const filtered = parsed.filter((e) => !e.id.startsWith('exp-00'));
      if (filtered.length !== parsed.length) {
        this.saveExpenses(filtered);
      }
      return filtered;
    } catch {
      return [];
    }
  }

  static saveExpenses(expenses: ExpenseItem[]): void {
    localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
  }

  static getBatteryRecords(): BatteryRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BATTERY);
      if (!data) return [];
      const parsed: BatteryRecord[] = JSON.parse(data);
      const filtered = parsed.filter((b) => !b.id.startsWith('bat-00'));
      if (filtered.length !== parsed.length) {
        this.saveBatteryRecords(filtered);
      }
      return filtered;
    } catch {
      return [];
    }
  }

  static saveBatteryRecords(records: BatteryRecord[]): void {
    localStorage.setItem(STORAGE_KEYS.BATTERY, JSON.stringify(records));
  }

  static getMaintenanceRecords(): MaintenanceRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MAINTENANCE);
      if (!data) return [];
      const parsed: MaintenanceRecord[] = JSON.parse(data);
      const filtered = parsed.filter((m) => !m.id.startsWith('maint-00'));
      if (filtered.length !== parsed.length) {
        this.saveMaintenanceRecords(filtered);
      }
      return filtered;
    } catch {
      return [];
    }
  }

  static saveMaintenanceRecords(records: MaintenanceRecord[]): void {
    localStorage.setItem(STORAGE_KEYS.MAINTENANCE, JSON.stringify(records));
  }

  static getVouchers(): DailyVoucherItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.VOUCHERS);
      if (!data) return [];
      const parsed: DailyVoucherItem[] = JSON.parse(data);
      // Strip demo vouchers
      const filtered = parsed.filter(
        (v) =>
          !v.incomes?.some((i) => i.id.startsWith('inc-00')) &&
          !v.expenses?.some((e) => e.id.startsWith('exp-00')) &&
          (v.incomes?.length > 0 || v.expenses?.length > 0)
      );
      if (filtered.length !== parsed.length) {
        this.saveVouchers(filtered);
      }
      return filtered;
    } catch {
      return [];
    }
  }

  static saveVouchers(vouchers: DailyVoucherItem[]): void {
    localStorage.setItem(STORAGE_KEYS.VOUCHERS, JSON.stringify(vouchers));
  }

  // Clear all transaction data to start completely fresh
  static clearAllTransactions(): void {
    localStorage.removeItem(STORAGE_KEYS.INCOMES);
    localStorage.removeItem(STORAGE_KEYS.EXPENSES);
    localStorage.removeItem(STORAGE_KEYS.BATTERY);
    localStorage.removeItem(STORAGE_KEYS.MAINTENANCE);
    localStorage.removeItem(STORAGE_KEYS.VOUCHERS);
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
