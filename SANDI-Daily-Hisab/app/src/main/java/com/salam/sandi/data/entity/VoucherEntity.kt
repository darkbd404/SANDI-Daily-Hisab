package com.salam.sandi.data.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "vouchers")
data class VoucherEntity(
    @PrimaryKey
    val voucherNumber: String, // SDI-2026-000001
    val type: String,          // INCOME or EXPENSE
    val transactionId: String,
    val amountPoisha: Long,
    val date: String,
    val time: String,
    val category: String,
    val description: String,
    val paymentMethod: String,
    val location: String,
    val ownerSnapshotJson: String,
    val vehicleSnapshotJson: String,
    val createdAt: Long = System.currentTimeMillis()
)
