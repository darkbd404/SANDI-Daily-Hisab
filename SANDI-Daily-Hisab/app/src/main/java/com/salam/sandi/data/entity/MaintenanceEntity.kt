package com.salam.sandi.data.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "maintenance_records")
data class MaintenanceEntity(
    @PrimaryKey
    val id: String,
    val date: String,
    val workshopName: String,
    val partsReplaced: String,
    val serviceDescription: String,
    val costPoisha: Long,
    val nextServiceDueDate: String? = null,
    val notes: String? = null,
    val createdAt: Long = System.currentTimeMillis()
)
