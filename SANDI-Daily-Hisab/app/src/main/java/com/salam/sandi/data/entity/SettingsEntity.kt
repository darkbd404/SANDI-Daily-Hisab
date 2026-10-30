package com.salam.sandi.data.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "settings")
data class SettingsEntity(
    @PrimaryKey
    val id: Int = 1,
    val ownerName: String = "আব্দুছ ছালাম",
    val village: String = "ফলকামুড়ী",
    val postOffice: String = "আমড়াতলী বাজার",
    val policeStation: String = "বরুড়া",
    val district: String = "কুমিল্লা",
    val mobile1: String = "০১৬২০২৩০৮৬৪",
    val mobile2: String = "০১৬৩২৩৩১৮৬৪",
    val email: String = "salam230864@gmail.com",
    val language: String = "bn",
    val isPinEnabled: Boolean = false,
    val pinSalt: String? = null,
    val pinHash: String? = null
)
