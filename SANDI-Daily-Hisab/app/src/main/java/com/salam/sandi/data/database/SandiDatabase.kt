package com.salam.sandi.data.database

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import com.salam.sandi.data.dao.*
import com.salam.sandi.data.entity.*

@Database(
    entities = [
        IncomeEntity::class,
        ExpenseEntity::class,
        VehicleEntity::class,
        VoucherEntity::class,
        MaintenanceEntity::class,
        BatteryEntity::class,
        SettingsEntity::class
    ],
    version = 1,
    exportSchema = false
)
abstract class SandiDatabase : RoomDatabase() {
    abstract fun incomeDao(): IncomeDao
    abstract fun expenseDao(): ExpenseDao
    abstract fun vehicleDao(): VehicleDao
    abstract fun voucherDao(): VoucherDao
    abstract fun batteryDao(): BatteryDao
    abstract fun maintenanceDao(): MaintenanceDao
    abstract fun settingsDao(): SettingsDao

    companion object {
        @Volatile
        private var INSTANCE: SandiDatabase? = null

        fun getDatabase(context: Context): SandiDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    SandiDatabase::class.java,
                    "sandi_daily_hisab_db"
                ).build()
                INSTANCE = instance
                instance
            }
        }
    }
}
