package com.salam.sandi.data.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "expenses")
data class ExpenseEntity(
    @PrimaryKey
    val id: String,
    val amountPoisha: Long,
    val date: String,
    val time: String,
    val category: String, // BATTERY_CHARGING, VEHICLE_REPAIR, etc.
    val description: String,
    val vendorName: String,
    val paymentMethod: String,
    val notes: String? = null,
    val location: String? = null,
    val createdAt: Long = System.currentTimeMillis()
)
