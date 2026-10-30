package com.salam.sandi.data.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "daily_vouchers")
data class VoucherEntity(
    @PrimaryKey
    val date: String, // YYYY-MM-DD (1 voucher per day)
    val voucherNumber: String, // SDI-20261030
    val totalIncomePoisha: Long,
    val totalExpensePoisha: Long,
    val netProfitPoisha: Long,
    val generatedTime: String,
    val snapshotJson: String,
    val createdAt: Long = System.currentTimeMillis()
)
