package com.salam.sandi

import android.app.Application
import com.salam.sandi.data.database.SandiDatabase
import com.salam.sandi.data.repository.SandiRepository

class SandiApplication : Application() {
    val database by lazy { SandiDatabase.getDatabase(this) }
    val repository by lazy { 
        SandiRepository(
            database.incomeDao(),
            database.expenseDao(),
            database.vehicleDao(),
            database.voucherDao(),
            database.batteryDao(),
            database.maintenanceDao(),
            database.settingsDao()
        )
    }

    override fun onCreate() {
        super.onCreate()
    }
}
