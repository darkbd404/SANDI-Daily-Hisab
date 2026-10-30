package com.salam.sandi.data.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "incomes")
data class IncomeEntity(
    @PrimaryKey
    val id: String,
    val amountPoisha: Long, // 1 BDT = 100 Poisha
    val date: String,       // YYYY-MM-DD
    val time: String,       // HH:mm
    val category: String,   // PASSENGER_FARE, SPECIAL_TRIP, etc.
    val tripDescription: String,
    val customerName: String? = null,
    val startLocation: String,
    val destination: String,
    val distanceKm: Double? = null,
    val paymentMethod: String, // CASH, BKASH, NAGAD, etc.
    val notes: String? = null,
    val createdAt: Long = System.currentTimeMillis()
)
