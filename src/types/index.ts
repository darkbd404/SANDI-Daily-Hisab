export type TransactionType = 'INCOME' | 'EXPENSE';

export type IncomeCategory = 
  | 'PASSENGER_FARE' 
  | 'SPECIAL_TRIP' 
  | 'RESERVED_TRIP' 
  | 'DELIVERY_INCOME' 
  | 'OTHER_INCOME';

export type ExpenseCategory = 
  | 'BATTERY_CHARGING' 
  | 'ELECTRICITY' 
  | 'VEHICLE_REPAIR' 
  | 'BATTERY_REPLACEMENT' 
  | 'MOTOR_REPAIR' 
  | 'SPARE_PARTS' 
  | 'TIRE_TUBE' 
  | 'MAINTENANCE' 
  | 'PARKING' 
  | 'PERSONAL_EXPENSE' 
  | 'OTHER_EXPENSE';

export type PaymentMethod = 'CASH' | 'BKASH' | 'NAGAD' | 'BANK' | 'OTHER';

export interface IncomeItem {
  id: string;
  amountPoisha: number; // Stored in poisha (1 BDT = 100 poisha)
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  category: IncomeCategory;
  tripDescription: string;
  customerName?: string;
  startLocation: string;
  destination: string;
  distanceKm?: number;
  paymentMethod: PaymentMethod;
  notes?: string;
  createdAt: number;
}

export interface ExpenseItem {
  id: string;
  amountPoisha: number; // Stored in poisha
  date: string;
  time: string;
  category: ExpenseCategory;
  description: string;
  vendorName: string;
  paymentMethod: PaymentMethod;
  notes?: string;
  location?: string;
  createdAt: number;
}

export interface VoucherItem {
  id: string;
  voucherNumber: string; // e.g. SDI-2026-000001
  type: TransactionType;
  transactionId: string;
  amountPoisha: number;
  date: string;
  time: string;
  category: string;
  description: string;
  paymentMethod: PaymentMethod;
  location: string;
  ownerSnapshot: OwnerProfile;
  vehicleSnapshot: VehicleProfile;
  createdAt: number;
}

export interface BatteryRecord {
  id: string;
  date: string;
  time: string;
  chargingUnits?: number;
  costPoisha: number;
  chargingDurationHours?: number;
  batteryHealthPercent?: number;
  notes?: string;
  createdAt: number;
}

export interface MaintenanceRecord {
  id: string;
  date: string;
  workshopName: string;
  partsReplaced: string;
  serviceDescription: string;
  costPoisha: number;
  nextServiceDueDate?: string;
  notes?: string;
  createdAt: number;
}

export interface OwnerProfile {
  name: string;
  village: string;
  postOffice: string;
  policeStation: string;
  district: string;
  mobile1: string;
  mobile2: string;
  email: string;
  photoUrl: string;
  signatureUrl: string;
}

export interface VehicleProfile {
  name: string;
  manufacturer: string;
  model: string;
  registrationNumber: string;
  purchaseDate: string;
  purchasePricePoisha: number;
  batteryType: string;
  batteryVoltage: string;
  motorSpecs: string;
  photoUrl: string;
  notes: string;
}

export interface AppSettings {
  language: 'bn' | 'en';
  currencySymbol: string;
  theme: 'dark' | 'light' | 'system';
  isPinEnabled: boolean;
  pinHash?: string; // Salted hash
  pinSalt?: string;
  autoLockMinutes: number;
  enableDailyReminder: boolean;
  enableBatteryReminder: boolean;
  enableBackupReminder: boolean;
}

export interface BackupData {
  version: number;
  exportDate: string;
  ownerProfile: OwnerProfile;
  vehicleProfile: VehicleProfile;
  incomes: IncomeItem[];
  expenses: ExpenseItem[];
  vouchers: VoucherItem[];
  batteryRecords: BatteryRecord[];
  maintenanceRecords: MaintenanceRecord[];
  settings: AppSettings;
}
