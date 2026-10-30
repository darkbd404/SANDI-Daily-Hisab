package com.salam.sandi.data.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "battery_records")
data class BatteryEntity(
    @PrimaryKey
    val id: String,
    val date: String,
    val time: String,
    val chargingUnits: Double? = null,
    val costPoisha: Long,
    val chargingDurationHours: Double? = null,
    val batteryHealthPercent: Int? = null,
    val notes: String? = null,
    val createdAt: Long = System.currentTimeMillis()
)
