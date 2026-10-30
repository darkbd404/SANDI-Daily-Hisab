package com.salam.sandi.data.repository

import com.salam.sandi.data.dao.*
import com.salam.sandi.data.entity.*
import kotlinx.coroutines.flow.Flow

class SandiRepository(
    val incomeDao: IncomeDao,
    val expenseDao: ExpenseDao,
    val vehicleDao: VehicleDao,
    val voucherDao: VoucherDao,
    val batteryDao: BatteryDao,
    val maintenanceDao: MaintenanceDao,
    val settingsDao: SettingsDao
) {
    val allIncomes: Flow<List<IncomeEntity>> = incomeDao.getAllIncomes()
    val allExpenses: Flow<List<ExpenseEntity>> = expenseDao.getAllExpenses()
    val allVouchers: Flow<List<VoucherEntity>> = voucherDao.getAllVouchers()
    val allBatteryRecords: Flow<List<BatteryEntity>> = batteryDao.getAllBatteryRecords()
    val allMaintenanceRecords: Flow<List<MaintenanceEntity>> = maintenanceDao.getAllMaintenanceRecords()

    suspend fun addIncome(income: IncomeEntity) = incomeDao.insertIncome(income)
    suspend fun deleteIncome(income: IncomeEntity) = incomeDao.deleteIncome(income)

    suspend fun addExpense(expense: ExpenseEntity) = expenseDao.insertExpense(expense)
    suspend fun deleteExpense(expense: ExpenseEntity) = expenseDao.deleteExpense(expense)

    suspend fun addVoucher(voucher: VoucherEntity) = voucherDao.insertVoucher(voucher)

    suspend fun clearAllData() {
        incomeDao.clearAllIncomes()
        expenseDao.clearAllExpenses()
        voucherDao.clearAllVouchers()
        batteryDao.clearAllBatteryRecords()
        maintenanceDao.clearAllMaintenanceRecords()
    }
}
