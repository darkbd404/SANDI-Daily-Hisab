package com.salam.sandi.data.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "vehicle_profile")
data class VehicleEntity(
    @PrimaryKey
    val id: Int = 1,
    val name: String = "SANDI",
    val manufacturer: String = "Sandi", // Strictly Sandi Company
    val model: String = "SANDI Passenger Electric Easy Bike",
    val registrationNumber: String = "কুমিল্লা-থ-১১-৪৫০২",
    val purchaseDate: String = "2025-03-15",
    val purchasePricePoisha: Long = 28500000,
    val batteryType: String = "60V 130Ah Tubular Deep Cycle",
    val batteryVoltage: String = "60V",
    val motorSpecs: String = "1200W BLDC Differential",
    val photoUri: String? = null,
    val notes: String = ""
)
