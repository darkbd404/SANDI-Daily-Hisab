import React, { useState, useEffect } from 'react';
import { 
  IncomeItem, 
  ExpenseItem, 
  VoucherItem, 
  BatteryRecord, 
  MaintenanceRecord, 
  OwnerProfile, 
  VehicleProfile, 
  AppSettings 
} from './types';
import { SandiStorage, getTodayDate } from './utils/storage';
import { translations } from './utils/translations';
import { Header } from './components/Header';
import { BottomNav, TabKey } from './components/BottomNav';
import { DashboardTab } from './components/DashboardTab';
import { IncomeTab } from './components/IncomeTab';
import { ExpenseTab } from './components/ExpenseTab';
import { VoucherTab } from './components/VoucherTab';
import { BatteryTab } from './components/BatteryTab';
import { MaintenanceTab } from './components/MaintenanceTab';
import { ReportsTab } from './components/ReportsTab';
import { MoreTab } from './components/MoreTab';
import { SplashScreen } from './components/SplashScreen';
import { ProfileModal } from './components/ProfileModal';
import { SecurityModal } from './components/SecurityModal';
import { BackupModal } from './components/BackupModal';
import { AndroidHubModal } from './components/AndroidHubModal';
import { Lock, KeyRound } from 'lucide-react';

export default function App() {
  // Persistence state
  const [owner, setOwner] = useState<OwnerProfile>(() => SandiStorage.getOwnerProfile());
  const [vehicle, setVehicle] = useState<VehicleProfile>(() => SandiStorage.getVehicleProfile());
  const [settings, setSettings] = useState<AppSettings>(() => SandiStorage.getSettings());
  const [incomes, setIncomes] = useState<IncomeItem[]>(() => SandiStorage.getIncomes());
  const [expenses, setExpenses] = useState<ExpenseItem[]>(() => SandiStorage.getExpenses());
  const [vouchers, setVouchers] = useState<VoucherItem[]>(() => SandiStorage.getVouchers());
  const [batteryRecords, setBatteryRecords] = useState<BatteryRecord[]>(() => SandiStorage.getBatteryRecords());
  const [maintenanceRecords, setMaintenanceRecords] = useState<MaintenanceRecord[]>(() => SandiStorage.getMaintenanceRecords());

  // UI state
  const [showSplash, setShowSplash] = useState(true);
  const [currentTab, setCurrentTab] = useState<TabKey>('dashboard');
  const [subTab, setSubTab] = useState<'battery' | 'maintenance' | 'reports' | null>(null);

  // Security Lock
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => !settings.isPinEnabled);

  // Modals
  const [isAddIncomeModalOpen, setIsAddIncomeModalOpen] = useState(false);
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const [isAndroidHubModalOpen, setIsAndroidHubModalOpen] = useState(false);

  // Active transaction sent to voucher tab
  const [activeDraftTx, setActiveDraftTx] = useState<{
    tx: IncomeItem | ExpenseItem;
    type: 'INCOME' | 'EXPENSE';
  } | null>(null);

  // Sync theme
  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  // Handler: Save Settings
  const handleUpdateSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    SandiStorage.saveSettings(newSettings);
    if (!newSettings.isPinEnabled) {
      setIsUnlocked(true);
    }
  };

  // Handler: Income Actions
  const handleAddIncome = (income: IncomeItem) => {
    const updated = [income, ...incomes];
    setIncomes(updated);
    SandiStorage.saveIncomes(updated);
  };

  const handleUpdateIncome = (income: IncomeItem) => {
    const updated = incomes.map((i) => (i.id === income.id ? income : i));
    setIncomes(updated);
    SandiStorage.saveIncomes(updated);
  };

  const handleDeleteIncome = (id: string) => {
    const updated = incomes.filter((i) => i.id !== id);
    setIncomes(updated);
    SandiStorage.saveIncomes(updated);
  };

  // Handler: Expense Actions
  const handleAddExpense = (expense: ExpenseItem) => {
    const updated = [expense, ...expenses];
    setExpenses(updated);
    SandiStorage.saveExpenses(updated);
  };

  const handleUpdateExpense = (expense: ExpenseItem) => {
    const updated = expenses.map((e) => (e.id === expense.id ? expense : e));
    setExpenses(updated);
    SandiStorage.saveExpenses(updated);
  };

  const handleDeleteExpense = (id: string) => {
    const updated = expenses.filter((e) => e.id !== id);
    setExpenses(updated);
    SandiStorage.saveExpenses(updated);
  };

  // Handler: Voucher Actions
  const handleSaveVoucher = (voucher: VoucherItem) => {
    const exists = vouchers.some((v) => v.voucherNumber === voucher.voucherNumber);
    const updated = exists
      ? vouchers.map((v) => (v.voucherNumber === voucher.voucherNumber ? voucher : v))
      : [voucher, ...vouchers];
    setVouchers(updated);
    SandiStorage.saveVouchers(updated);
  };

  // Handler: Battery Actions
  const handleAddBatteryRecord = (record: BatteryRecord) => {
    const updated = [record, ...batteryRecords];
    setBatteryRecords(updated);
    SandiStorage.saveBatteryRecords(updated);
  };

  const handleDeleteBatteryRecord = (id: string) => {
    const updated = batteryRecords.filter((b) => b.id !== id);
    setBatteryRecords(updated);
    SandiStorage.saveBatteryRecords(updated);
  };

  // Handler: Maintenance Actions
  const handleAddMaintenanceRecord = (record: MaintenanceRecord) => {
    const updated = [record, ...maintenanceRecords];
    setMaintenanceRecords(updated);
    SandiStorage.saveMaintenanceRecords(updated);
  };

  const handleDeleteMaintenanceRecord = (id: string) => {
    const updated = maintenanceRecords.filter((m) => m.id !== id);
    setMaintenanceRecords(updated);
    SandiStorage.saveMaintenanceRecords(updated);
  };

  // Handler: Profiles
  const handleSaveProfiles = (newOwner: OwnerProfile, newVehicle: VehicleProfile) => {
    setOwner(newOwner);
    setVehicle(newVehicle);
    SandiStorage.saveOwnerProfile(newOwner);
    SandiStorage.saveVehicleProfile(newVehicle);
  };

  // Handler: Reload after full backup restore
  const handleRestoreCompleted = () => {
    setOwner(SandiStorage.getOwnerProfile());
    setVehicle(SandiStorage.getVehicleProfile());
    setSettings(SandiStorage.getSettings());
    setIncomes(SandiStorage.getIncomes());
    setExpenses(SandiStorage.getExpenses());
    setVouchers(SandiStorage.getVouchers());
    setBatteryRecords(SandiStorage.getBatteryRecords());
    setMaintenanceRecords(SandiStorage.getMaintenanceRecords());
  };

  // Active selected date for daily consolidated voucher
  const [selectedVoucherDate, setSelectedVoucherDate] = useState<string>(getTodayDate());

  const handleSelectVoucherTransaction = (
    tx: IncomeItem | ExpenseItem,
    type: 'INCOME' | 'EXPENSE'
  ) => {
    setSelectedVoucherDate(tx.date);
    setCurrentTab('voucher');
    setSubTab(null);
  };

  // If splash screen is active
  if (showSplash) {
    return (
      <SplashScreen
        owner={owner}
        vehicle={vehicle}
        onFinish={() => setShowSplash(false)}
      />
    );
  }

  // If PIN lock is enabled and locked
  if (settings.isPinEnabled && !isUnlocked) {
    return (
      <SecurityModal
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        onClose={() => {}}
        isUnlocked={isUnlocked}
        setIsUnlocked={setIsUnlocked}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        onOpenAndroidHub={() => setIsAndroidHubModalOpen(true)}
        onOpenSecurity={() => setIsSecurityModalOpen(true)}
        isLocked={!isUnlocked}
      />

      {/* Main Responsive Body Container */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-6 pt-4 sm:pt-6">
        {/* Render Tab Content */}
        {currentTab === 'dashboard' && (
          <DashboardTab
            incomes={incomes}
            expenses={expenses}
            owner={owner}
            vehicle={vehicle}
            lang={settings.language}
            onOpenAddIncome={() => {
              setCurrentTab('income');
              setIsAddIncomeModalOpen(true);
            }}
            onOpenAddExpense={() => {
              setCurrentTab('expense');
              setIsAddExpenseModalOpen(true);
            }}
            onSelectVoucherTransaction={handleSelectVoucherTransaction}
            onNavigateToTab={(tab) => {
              setCurrentTab(tab);
              setSubTab(null);
            }}
          />
        )}

        {currentTab === 'income' && (
          <IncomeTab
            incomes={incomes}
            lang={settings.language}
            onAddIncome={handleAddIncome}
            onUpdateIncome={handleUpdateIncome}
            onDeleteIncome={handleDeleteIncome}
            onGenerateVoucher={(inc) => handleSelectVoucherTransaction(inc, 'INCOME')}
            isAddModalOpen={isAddIncomeModalOpen}
            setIsAddModalOpen={setIsAddIncomeModalOpen}
          />
        )}

        {currentTab === 'expense' && (
          <ExpenseTab
            expenses={expenses}
            lang={settings.language}
            onAddExpense={handleAddExpense}
            onUpdateExpense={handleUpdateExpense}
            onDeleteExpense={handleDeleteExpense}
            onGenerateVoucher={(exp) => handleSelectVoucherTransaction(exp, 'EXPENSE')}
            isAddModalOpen={isAddExpenseModalOpen}
            setIsAddModalOpen={setIsAddExpenseModalOpen}
          />
        )}

        {currentTab === 'voucher' && (
          <VoucherTab
            vouchers={vouchers}
            incomes={incomes}
            expenses={expenses}
            owner={owner}
            vehicle={vehicle}
            lang={settings.language}
            onSaveVoucher={handleSaveVoucher}
            selectedDate={selectedVoucherDate}
          />
        )}

        {currentTab === 'more' && !subTab && (
          <MoreTab
            settings={settings}
            owner={owner}
            vehicle={vehicle}
            lang={settings.language}
            onOpenProfile={() => setIsProfileModalOpen(true)}
            onNavigateToSubTab={(sub) => setSubTab(sub)}
            onOpenBackup={() => setIsBackupModalOpen(true)}
            onOpenSecurity={() => setIsSecurityModalOpen(true)}
            onOpenAndroidHub={() => setIsAndroidHubModalOpen(true)}
            onUpdateSettings={handleUpdateSettings}
          />
        )}

        {/* Sub-tabs reachable via More menu */}
        {currentTab === 'more' && subTab === 'battery' && (
          <div className="space-y-4">
            <button
              onClick={() => setSubTab(null)}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 mb-2"
            >
              ← মেন্যুতে ফিরে যান
            </button>
            <BatteryTab
              batteryRecords={batteryRecords}
              vehicle={vehicle}
              lang={settings.language}
              onAddBatteryRecord={handleAddBatteryRecord}
              onDeleteBatteryRecord={handleDeleteBatteryRecord}
            />
          </div>
        )}

        {currentTab === 'more' && subTab === 'maintenance' && (
          <div className="space-y-4">
            <button
              onClick={() => setSubTab(null)}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 mb-2"
            >
              ← মেন্যুতে ফিরে যান
            </button>
            <MaintenanceTab
              maintenanceRecords={maintenanceRecords}
              lang={settings.language}
              onAddMaintenanceRecord={handleAddMaintenanceRecord}
              onDeleteMaintenanceRecord={handleDeleteMaintenanceRecord}
            />
          </div>
        )}

        {currentTab === 'more' && subTab === 'reports' && (
          <div className="space-y-4">
            <button
              onClick={() => setSubTab(null)}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 mb-2"
            >
              ← মেন্যুতে ফিরে যান
            </button>
            <ReportsTab
              incomes={incomes}
              expenses={expenses}
              batteryRecords={batteryRecords}
              maintenanceRecords={maintenanceRecords}
              owner={owner}
              vehicle={vehicle}
              lang={settings.language}
            />
          </div>
        )}
      </main>

      {/* Bottom Thumb Navigation Bar */}
      <BottomNav
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          setSubTab(null);
        }}
        lang={settings.language}
      />

      {/* Modals */}
      {isProfileModalOpen && (
        <ProfileModal
          owner={owner}
          vehicle={vehicle}
          lang={settings.language}
          onSaveProfiles={handleSaveProfiles}
          onClose={() => setIsProfileModalOpen(false)}
        />
      )}

      {isSecurityModalOpen && (
        <SecurityModal
          settings={settings}
          onUpdateSettings={handleUpdateSettings}
          onClose={() => setIsSecurityModalOpen(false)}
          isUnlocked={isUnlocked}
          setIsUnlocked={setIsUnlocked}
        />
      )}

      {isBackupModalOpen && (
        <BackupModal
          lang={settings.language}
          onRestoreCompleted={handleRestoreCompleted}
          onClose={() => setIsBackupModalOpen(false)}
        />
      )}

      {isAndroidHubModalOpen && (
        <AndroidHubModal
          lang={settings.language}
          onClose={() => setIsAndroidHubModalOpen(false)}
        />
      )}
    </div>
  );
}
