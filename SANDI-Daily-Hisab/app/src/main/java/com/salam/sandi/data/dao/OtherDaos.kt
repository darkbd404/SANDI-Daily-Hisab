package com.salam.sandi.data.dao

import androidx.room.*
import com.salam.sandi.data.entity.*
import kotlinx.coroutines.flow.Flow

@Dao
interface VehicleDao {
    @Query("SELECT * FROM vehicle_profile WHERE id = 1")
    fun getVehicle(): Flow<VehicleEntity?>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun saveVehicle(vehicle: VehicleEntity)
}

@Dao
interface VoucherDao {
    @Query("SELECT * FROM daily_vouchers ORDER BY date DESC")
    fun getAllVouchers(): Flow<List<VoucherEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertVoucher(voucher: VoucherEntity)

    @Query("DELETE FROM daily_vouchers")
    suspend fun clearAllVouchers()
}

@Dao
interface BatteryDao {
    @Query("SELECT * FROM battery_records ORDER BY date DESC, time DESC")
    fun getAllBatteryRecords(): Flow<List<BatteryEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertBatteryRecord(record: BatteryEntity)

    @Query("DELETE FROM battery_records")
    suspend fun clearAllBatteryRecords()
}

@Dao
interface MaintenanceDao {
    @Query("SELECT * FROM maintenance_records ORDER BY date DESC")
    fun getAllMaintenanceRecords(): Flow<List<MaintenanceEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertMaintenanceRecord(record: MaintenanceEntity)

    @Query("DELETE FROM maintenance_records")
    suspend fun clearAllMaintenanceRecords()
}

@Dao
interface SettingsDao {
    @Query("SELECT * FROM settings WHERE id = 1")
    fun getSettings(): Flow<SettingsEntity?>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun saveSettings(settings: SettingsEntity)
}
