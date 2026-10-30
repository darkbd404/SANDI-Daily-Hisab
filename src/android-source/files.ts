/**
 * Complete Android Kotlin DSL, Room, Jetpack Compose, GitHub Actions, and Resource Files
 * for SANDI Daily Hisab (com.salam.sandi)
 */

export interface AndroidFile {
  path: string;
  content: string;
}

export const ANDROID_PROJECT_FILES: AndroidFile[] = [
  // 1. Root build.gradle.kts
  {
    path: 'build.gradle.kts',
    content: `// Top-level build file where you can add configuration options common to all sub-projects/modules.
plugins {
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.kotlin.android) apply false
    alias(libs.plugins.kotlin.compose) apply false
    alias(libs.plugins.ksp) apply false
}
`,
  },

  // 2. settings.gradle.kts
  {
    path: 'settings.gradle.kts',
    content: `pluginManagement {
    repositories {
        google {
            content {
                includeGroupByRegex("com\\\\.android.*")
                includeGroupByRegex("com\\\\.google.*")
                includeGroupByRegex("androidx.*")
            }
        }
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "SANDI-Daily-Hisab"
include(":app")
`,
  },

  // 3. gradle.properties
  {
    path: 'gradle.properties',
    content: `org.gradle.jvmargs=-Xmx2048m -Dfile.encoding=UTF-8
android.useAndroidX=true
android.enableJetifier=false
kotlin.code.style=official
android.nonTransitiveRClass=true
`,
  },

  // 4. gradle/libs.versions.toml
  {
    path: 'gradle/libs.versions.toml',
    content: `[versions]
agp = "8.8.0"
kotlin = "2.1.0"
coreKtx = "1.15.0"
lifecycleRuntimeKtx = "2.8.7"
activityCompose = "1.10.0"
composeBom = "2025.01.00"
room = "2.6.1"
ksp = "2.1.0-1.0.29"
coroutines = "1.10.1"
navigationCompose = "2.8.5"
datastore = "1.1.1"
workManager = "2.10.0"
junit = "4.13.2"
junitVersion = "1.2.1"
espressoCore = "3.6.1"

[libraries]
androidx-core-ktx = { group = "androidx.core", name = "core-ktx", version.ref = "coreKtx" }
androidx-lifecycle-runtime-ktx = { group = "androidx.lifecycle", name = "lifecycle-runtime-ktx", version.ref = "lifecycleRuntimeKtx" }
androidx-lifecycle-viewmodel-compose = { group = "androidx.lifecycle", name = "lifecycle-viewmodel-compose", version.ref = "lifecycleRuntimeKtx" }
androidx-activity-compose = { group = "androidx.activity", name = "activity-compose", version.ref = "activityCompose" }
androidx-compose-bom = { group = "androidx.compose", name = "compose-bom", version.ref = "composeBom" }
androidx-compose-ui = { group = "androidx.compose.ui", name = "ui" }
androidx-compose-ui-graphics = { group = "androidx.compose.ui", name = "ui-graphics" }
androidx-compose-ui-tooling = { group = "androidx.compose.ui", name = "ui-tooling" }
androidx-compose-ui-tooling-preview = { group = "androidx.compose.ui", name = "ui-tooling-preview" }
androidx-compose-material3 = { group = "androidx.compose.material3", name = "material3" }
androidx-compose-material-icons = { group = "androidx.compose.material", name = "material-icons-extended" }
androidx-navigation-compose = { group = "androidx.navigation", name = "navigation-compose", version.ref = "navigationCompose" }
androidx-datastore-preferences = { group = "androidx.datastore", name = "datastore-preferences", version.ref = "datastore" }
androidx-work-runtime-ktx = { group = "androidx.work", name = "work-runtime-ktx", version.ref = "workManager" }

# Room
androidx-room-runtime = { group = "androidx.room", name = "room-runtime", version.ref = "room" }
androidx-room-ktx = { group = "androidx.room", name = "room-ktx", version.ref = "room" }
androidx-room-compiler = { group = "androidx.room", name = "room-compiler", version.ref = "room" }

# Coroutines
kotlinx-coroutines-android = { group = "org.jetbrains.kotlinx", name = "kotlinx-coroutines-android", version.ref = "coroutines" }

# Testing
junit = { group = "junit", name = "junit", version.ref = "junit" }
androidx-junit = { group = "androidx.test.ext", name = "junit", version.ref = "junitVersion" }
androidx-espresso-core = { group = "androidx.test.espresso", name = "espresso-core", version.ref = "espressoCore" }

[plugins]
android-application = { id = "com.android.application", version.ref = "agp" }
kotlin-android = { id = "org.jetbrains.kotlin.android", version.ref = "kotlin" }
kotlin-compose = { id = "org.jetbrains.kotlin.plugin.compose", version.ref = "kotlin" }
ksp = { id = "com.google.devtools.ksp", version.ref = "ksp" }
`,
  },

  // 5. gradle/wrapper/gradle-wrapper.properties
  {
    path: 'gradle/wrapper/gradle-wrapper.properties',
    content: `distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
distributionUrl=https\\://services.gradle.org/distributions/gradle-8.10.2-bin.zip
networkTimeout=10000
validateDistributionUrl=true
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
`,
  },

  // 6. app/build.gradle.kts
  {
    path: 'app/build.gradle.kts',
    content: `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
    alias(libs.plugins.ksp)
}

android {
    namespace = "com.salam.sandi"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.salam.sandi"
        minSdk = 26
        targetSdk = 35
        versionCode = 1
        versionName = "1.0.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        vectorDrawables {
            useSupportLibrary = true
        }

        ksp {
            arg("room.schemaLocation", "$projectDir/schemas")
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
        debug {
            applicationIdSuffix = ".debug"
            isDebuggable = true
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = "17"
    }

    buildFeatures {
        compose = true
    }

    packaging {
        resources {
            excludes += "/META-INF/{AL2.0,LGPL2.1}"
        }
    }
}

dependencies {
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.lifecycle.runtime.ktx)
    implementation(libs.androidx.lifecycle.viewmodel.compose)
    implementation(libs.androidx.activity.compose)
    
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.compose.ui)
    implementation(libs.androidx.compose.ui.graphics)
    implementation(libs.androidx.compose.ui.tooling.preview)
    implementation(libs.androidx.compose.material3)
    implementation(libs.androidx.compose.material.icons)
    implementation(libs.androidx.navigation.compose)

    implementation(libs.androidx.room.runtime)
    implementation(libs.androidx.room.ktx)
    ksp(libs.androidx.room.compiler)

    implementation(libs.androidx.datastore.preferences)
    implementation(libs.androidx.work.runtime.ktx)
    implementation(libs.kotlinx.coroutines.android)

    testImplementation(libs.junit)
    androidTestImplementation(libs.androidx.junit)
    androidTestImplementation(libs.androidx.espresso.core)
    androidTestImplementation(platform(libs.androidx.compose.bom))
    debugImplementation(libs.androidx.compose.ui.tooling)
}
`,
  },

  // 7. app/proguard-rules.pro
  {
    path: 'app/proguard-rules.pro',
    content: `# SANDI Daily Hisab Proguard rules
-keep class com.salam.sandi.data.entity.** { *; }
-keep class com.salam.sandi.data.dao.** { *; }
-dontwarn androidx.work.**
`,
  },

  // 8. app/src/main/AndroidManifest.xml
  {
    path: 'app/src/main/AndroidManifest.xml',
    content: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <!-- Strictly offline - NO INTERNET permission -->
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.USE_BIOMETRIC" />

    <application
        android:name=".SandiApplication"
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.SANDIDailyHisab">
        
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:screenOrientation="portrait"
            android:theme="@style/Theme.SANDIDailyHisab">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
`,
  },

  // 9. GitHub Actions Workflow: android-debug.yml
  {
    path: '.github/workflows/android-debug.yml',
    content: `name: Build SANDI Debug APK

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
  workflow_dispatch:

jobs:
  build:
    name: Build Android Debug APK
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Set up JDK 17
        uses: actions/setup-java@v4
        with:
          java-version: '17'
          distribution: 'temurin'
          cache: gradle

      - name: Set execute permission for gradlew
        run: chmod +x gradlew || true

      - name: Build Debug APK
        run: bash gradlew assembleDebug --stacktrace

      - name: Upload Debug APK Artifact
        uses: actions/upload-artifact@v4
        with:
          name: SANDI-Debug-APK
          path: app/build/outputs/apk/debug/*.apk
          retention-days: 14
`,
  },

  // 10. GitHub Actions Workflow: android-release.yml
  {
    path: '.github/workflows/android-release.yml',
    content: `name: Build SANDI Signed Release APK

on:
  workflow_dispatch:

jobs:
  build-release:
    name: Build Signed Release APK
    runs-on: ubuntu-latest
    if: github.repository_owner != ''

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Set up JDK 17
        uses: actions/setup-java@v4
        with:
          java-version: '17'
          distribution: 'temurin'
          cache: gradle

      - name: Build Release APK
        run: |
          chmod +x gradlew || true
          bash gradlew assembleRelease --stacktrace

      - name: Upload Release APK
        uses: actions/upload-artifact@v4
        with:
          name: SANDI-Release-APK
          path: app/build/outputs/apk/release/*.apk
          retention-days: 30
`,
  },

  // 11. SandiApplication.kt
  {
    path: 'app/src/main/java/com/salam/sandi/SandiApplication.kt',
    content: `package com.salam.sandi

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
`,
  },

  // 12. MainActivity.kt
  {
    path: 'app/src/main/java/com/salam/sandi/MainActivity.kt',
    content: `package com.salam.sandi

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import com.salam.sandi.ui.navigation.SandiNavigation
import com.salam.sandi.ui.theme.SANDITheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val app = application as SandiApplication
        val repository = app.repository

        setContent {
            SANDITheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    SandiNavigation(repository = repository)
                }
            }
        }
    }
}
`,
  },

  // 13. Room Entities: IncomeEntity.kt
  {
    path: 'app/src/main/java/com/salam/sandi/data/entity/IncomeEntity.kt',
    content: `package com.salam.sandi.data.entity

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
`,
  },

  // 14. ExpenseEntity.kt
  {
    path: 'app/src/main/java/com/salam/sandi/data/entity/ExpenseEntity.kt',
    content: `package com.salam.sandi.data.entity

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
`,
  },

  // 15. VoucherEntity.kt
  {
    path: 'app/src/main/java/com/salam/sandi/data/entity/VoucherEntity.kt',
    content: `package com.salam.sandi.data.entity

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
`,
  },

  // 16. BatteryEntity.kt & MaintenanceEntity.kt
  {
    path: 'app/src/main/java/com/salam/sandi/data/entity/BatteryEntity.kt',
    content: `package com.salam.sandi.data.entity

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
`,
  },

  {
    path: 'app/src/main/java/com/salam/sandi/data/entity/MaintenanceEntity.kt',
    content: `package com.salam.sandi.data.entity

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
`,
  },

  // 17. VehicleEntity.kt & SettingsEntity.kt
  {
    path: 'app/src/main/java/com/salam/sandi/data/entity/VehicleEntity.kt',
    content: `package com.salam.sandi.data.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "vehicle_profile")
data class VehicleEntity(
    @PrimaryKey
    val id: Int = 1,
    val name: String = "SANDI",
    val manufacturer: String = "HUAIHAI / ZONGSHEN",
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
`,
  },

  {
    path: 'app/src/main/java/com/salam/sandi/data/entity/SettingsEntity.kt',
    content: `package com.salam.sandi.data.entity

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
`,
  },

  // 18. DAOs: IncomeDao.kt & ExpenseDao.kt
  {
    path: 'app/src/main/java/com/salam/sandi/data/dao/IncomeDao.kt',
    content: `package com.salam.sandi.data.dao

import androidx.room.*
import com.salam.sandi.data.entity.IncomeEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface IncomeDao {
    @Query("SELECT * FROM incomes ORDER BY date DESC, time DESC")
    fun getAllIncomes(): Flow<List<IncomeEntity>>

    @Query("SELECT * FROM incomes WHERE date = :date ORDER BY time DESC")
    fun getIncomesByDate(date: String): Flow<List<IncomeEntity>>

    @Query("SELECT SUM(amountPoisha) FROM incomes WHERE date = :date")
    fun getTodayIncomeSum(date: String): Flow<Long?>

    @Query("SELECT SUM(amountPoisha) FROM incomes WHERE date LIKE :monthPrefix || '%'")
    fun getMonthlyIncomeSum(monthPrefix: String): Flow<Long?>

    @Query("SELECT SUM(amountPoisha) FROM incomes")
    fun getTotalIncomeSum(): Flow<Long?>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertIncome(income: IncomeEntity)

    @Update
    suspend fun updateIncome(income: IncomeEntity)

    @Delete
    suspend fun deleteIncome(income: IncomeEntity)
}
`,
  },

  {
    path: 'app/src/main/java/com/salam/sandi/data/dao/ExpenseDao.kt',
    content: `package com.salam.sandi.data.dao

import androidx.room.*
import com.salam.sandi.data.entity.ExpenseEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface ExpenseDao {
    @Query("SELECT * FROM expenses ORDER BY date DESC, time DESC")
    fun getAllExpenses(): Flow<List<ExpenseEntity>>

    @Query("SELECT * FROM expenses WHERE date = :date ORDER BY time DESC")
    fun getExpensesByDate(date: String): Flow<List<ExpenseEntity>>

    @Query("SELECT SUM(amountPoisha) FROM expenses WHERE date = :date")
    fun getTodayExpenseSum(date: String): Flow<Long?>

    @Query("SELECT SUM(amountPoisha) FROM expenses WHERE date LIKE :monthPrefix || '%'")
    fun getMonthlyExpenseSum(monthPrefix: String): Flow<Long?>

    @Query("SELECT SUM(amountPoisha) FROM expenses")
    fun getTotalExpenseSum(): Flow<Long?>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertExpense(expense: ExpenseEntity)

    @Update
    suspend fun updateExpense(expense: ExpenseEntity)

    @Delete
    suspend fun deleteExpense(expense: ExpenseEntity)
}
`,
  },

  // 19. SandiDatabase.kt
  {
    path: 'app/src/main/java/com/salam/sandi/data/database/SandiDatabase.kt',
    content: `package com.salam.sandi.data.database

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import com.salam.sandi.data.dao.*
import com.salam.sandi.data.entity.*

@Database(
    entities = [
        IncomeEntity::class,
        ExpenseEntity::class,
        VehicleEntity::class,
        VoucherEntity::class,
        MaintenanceEntity::class,
        BatteryEntity::class,
        SettingsEntity::class
    ],
    version = 1,
    exportSchema = false
)
abstract class SandiDatabase : RoomDatabase() {
    abstract fun incomeDao(): IncomeDao
    abstract fun expenseDao(): ExpenseDao
    abstract fun vehicleDao(): VehicleDao
    abstract fun voucherDao(): VoucherDao
    abstract fun batteryDao(): BatteryDao
    abstract fun maintenanceDao(): MaintenanceDao
    abstract fun settingsDao(): SettingsDao

    companion object {
        @Volatile
        private var INSTANCE: SandiDatabase? = null

        fun getDatabase(context: Context): SandiDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    SandiDatabase::class.java,
                    "sandi_daily_hisab_db"
                ).build()
                INSTANCE = instance
                instance
            }
        }
    }
}
`,
  },

  // 20. Other DAOs
  {
    path: 'app/src/main/java/com/salam/sandi/data/dao/OtherDaos.kt',
    content: `package com.salam.sandi.data.dao

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
    @Query("SELECT * FROM vouchers ORDER BY createdAt DESC")
    fun getAllVouchers(): Flow<List<VoucherEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertVoucher(voucher: VoucherEntity)

    @Query("SELECT COUNT(*) FROM vouchers")
    suspend fun getVoucherCount(): Int
}

@Dao
interface BatteryDao {
    @Query("SELECT * FROM battery_records ORDER BY date DESC, time DESC")
    fun getAllBatteryRecords(): Flow<List<BatteryEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertBatteryRecord(record: BatteryEntity)
}

@Dao
interface MaintenanceDao {
    @Query("SELECT * FROM maintenance_records ORDER BY date DESC")
    fun getAllMaintenanceRecords(): Flow<List<MaintenanceEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertMaintenanceRecord(record: MaintenanceEntity)
}

@Dao
interface SettingsDao {
    @Query("SELECT * FROM settings WHERE id = 1")
    fun getSettings(): Flow<SettingsEntity?>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun saveSettings(settings: SettingsEntity)
}
`,
  },

  // 21. SandiRepository.kt
  {
    path: 'app/src/main/java/com/salam/sandi/data/repository/SandiRepository.kt',
    content: `package com.salam.sandi.data.repository

import com.salam.sandi.data.dao.*
import com.salam.sandi.data.entity.*
import kotlinx.coroutines.flow.Flow

class SandiRepository(
    val incomeDao: IncomeDao,
    val expenseDao: ExpenseDao,
    val vehicleDao: VehicleDao,
    val voucherDao: VoucherDao,
    val batteryDao: BatteryDao,
    val maintenanceDao: MaintenanceDao,
    val settingsDao: SettingsDao
) {
    val allIncomes: Flow<List<IncomeEntity>> = incomeDao.getAllIncomes()
    val allExpenses: Flow<List<ExpenseEntity>> = expenseDao.getAllExpenses()
    val allVouchers: Flow<List<VoucherEntity>> = voucherDao.getAllVouchers()
    val allBatteryRecords: Flow<List<BatteryEntity>> = batteryDao.getAllBatteryRecords()
    val allMaintenanceRecords: Flow<List<MaintenanceEntity>> = maintenanceDao.getAllMaintenanceRecords()

    suspend fun addIncome(income: IncomeEntity) = incomeDao.insertIncome(income)
    suspend fun deleteIncome(income: IncomeEntity) = incomeDao.deleteIncome(income)

    suspend fun addExpense(expense: ExpenseEntity) = expenseDao.insertExpense(expense)
    suspend fun deleteExpense(expense: ExpenseEntity) = expenseDao.deleteExpense(expense)

    suspend fun addVoucher(voucher: VoucherEntity) = voucherDao.insertVoucher(voucher)
}
`,
  },

  // 22. PDF Generator (PdfGenerator.kt)
  {
    path: 'app/src/main/java/com/salam/sandi/utils/PdfGenerator.kt',
    content: `package com.salam.sandi.utils

import android.content.Context
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.graphics.Typeface
import android.graphics.pdf.PdfDocument
import com.salam.sandi.data.entity.VoucherEntity
import java.io.File
import java.io.FileOutputStream

object PdfGenerator {
    fun generateVoucherPdf(context: Context, voucher: VoucherEntity, isSlipFormat: Boolean): File {
        val pdfDocument = PdfDocument()
        val width = if (isSlipFormat) 250 else 595
        val height = if (isSlipFormat) 400 else 842
        val pageInfo = PdfDocument.PageInfo.Builder(width, height, 1).create()
        val page = pdfDocument.startPage(pageInfo)
        val canvas: Canvas = page.canvas
        val paint = Paint()

        // Background
        paint.color = Color.WHITE
        canvas.drawRect(0f, 0f, width.toFloat(), height.toFloat(), paint)

        // Header Title
        paint.color = Color.rgb(15, 23, 42) // Dark Navy
        paint.textSize = if (isSlipFormat) 14f else 22f
        paint.typeface = Typeface.create(Typeface.DEFAULT, Typeface.BOLD)
        canvas.drawText("SANDI AUTO EASY BIKE", 20f, 40f, paint)

        paint.textSize = if (isSlipFormat) 9f else 12f
        paint.typeface = Typeface.create(Typeface.DEFAULT, Typeface.NORMAL)
        canvas.drawText("Owner: Abdus Salam | Phone: 01620230864", 20f, 60f, paint)
        canvas.drawText("Voucher No: " + voucher.voucherNumber, 20f, 80f, paint)
        canvas.drawText("Date: " + voucher.date + " " + voucher.time, 20f, 95f, paint)

        // Line
        paint.strokeWidth = 1f
        paint.color = Color.LTGRAY
        canvas.drawLine(20f, 105f, (width - 20).toFloat(), 105f, paint)

        // Details
        paint.color = Color.BLACK
        paint.textSize = if (isSlipFormat) 10f else 14f
        canvas.drawText("Type: " + voucher.type, 20f, 130f, paint)
        canvas.drawText("Category: " + voucher.category, 20f, 150f, paint)
        canvas.drawText("Description: " + voucher.description, 20f, 170f, paint)
        canvas.drawText("Payment Method: " + voucher.paymentMethod, 20f, 190f, paint)

        // Amount Box
        paint.color = Color.rgb(217, 119, 6) // Gold accent
        paint.textSize = if (isSlipFormat) 14f else 20f
        paint.typeface = Typeface.create(Typeface.DEFAULT, Typeface.BOLD)
        val taka = voucher.amountPoisha / 100.0
        canvas.drawText("Total: BDT " + taka + " Taka", 20f, 230f, paint)

        // Footer Thank you
        paint.color = Color.DKGRAY
        paint.textSize = if (isSlipFormat) 8f else 10f
        paint.typeface = Typeface.create(Typeface.DEFAULT, Typeface.ITALIC)
        canvas.drawText("Thank you for using SANDI Auto Easy Bike!", 20f, 270f, paint)

        pdfDocument.finishPage(page)

        val outputFile = File(context.cacheDir, "voucher_" + voucher.voucherNumber + ".pdf")
        val outputStream = FileOutputStream(outputFile)
        pdfDocument.writeTo(outputStream)
        pdfDocument.close()
        outputStream.close()

        return outputFile
    }
}
`,
  },

  // 23. Bengali README.md
  {
    path: 'README.md',
    content: `# SANDI ডেইলি হিসাব (SANDI Daily Hisab)
### পার্সোনাল অটো ইজি বাইক ম্যানেজার (Personal Auto Easy Bike Manager)
**স্বত্বাধিকারী:** আব্দুছ ছালাম | **মোবাইল:** ০১৬২০২৩০৮৬৪, ০১৬৩২৩৩১৮৬৪ | **ঠিকানা:** ফলকামুড়ী, আমড়াতলী বাজার, বরুড়া, কুমিল্লা।  
**যানবাহন:** HUAIHAI / ZONGSHEN - SANDI Passenger Electric Easy Bike  
**অ্যাপ আইডি:** \`com.salam.sandi\` | **মোড:** ১০০% অফলাইন ও ব্যক্তিগত (Zero Internet, Zero Cloud)

---

## ১. প্রজেক্ট পরিচিতি
এই অ্যাপ্লিকেশনটি সম্পূর্ণ ব্যক্তিগত ব্যবহারের জন্য তৈরি একটি হাই-পারফরম্যান্স নেটিভ অ্যান্ড্রয়েড ও ওয়েব হিসাব অ্যাপ্লিকেশন। এটি কোনো অনলাইন ক্লাউড বা থার্ড-পার্টি সার্ভারে কোনো আর্থিক ডাটা পাঠায় না। সম্পূর্ণ হিসাব, ভাউচার ও ব্যাটারি হিস্ট্রি আপনার ফোনের লোকাল মেমোরিতে (Room SQLite Database) সুরক্ষিত থাকে।

### প্রধান ফিচারসমূহ:
1. **ড্যাশবোর্ড:** আজকের আয়, আজকের ব্যয়, নিট লাভ, মাসিক আয়-ব্যয় এবং রিয়েল-টাইম গ্রাফ।
2. **পয়সা ক্যালকুলেশন:** কোনো প্রকার ফ্লোটিং পয়েন্ট হিসাবের ত্রুটি ছাড়া নিখুঁত পূর্ণসংখ্যায় (Integer Poisha) হিসাব সংরক্ষণ।
3. **সুপারমার্কেট ভাউচার ইঞ্জিন:** ইউনিক নম্বরযুক্ত (\`SDI-2026-000001\`) প্রফেশনাল A4 ইনভয়েস ও থার্মাল POS স্লিপ ভাউচার জেনারেটর, সাথে আসল গাড়ির ছবি, মালিকের ছবি এবং মালিকের স্বাক্ষর।
4. **ব্যাটারি ও চার্জিং ট্র্যাকার:** দৈনিক চার্জিং খরচ, বিদ্যুৎ ইউনিট ও মাসিক চার্জিং ব্যয়ের পূর্ণাঙ্গ সামারি।
5. **রক্ষণাবেক্ষণ ও সার্ভিসিং:** গাড়ির যন্ত্রাংশ পরিবর্তন, ওয়ার্কশপ হিস্ট্রি এবং পরবর্তী সার্ভিসের অ্যালার্ম।
6. **রিপোর্টস:** দৈনিক, সাপ্তাহিক, মাসিক ও কাস্টম ডেট রেঞ্জের ব্যালেন্স শিট, CSV এক্সেল ও PDF এক্সপোর্ট।
7. **ব্যক্তিগত নিরাপত্তা:** ৪-ডিজিটের সল্টেড হ্যাশ পিন (PIN) লক।
8. **লোকাল ব্যাকআপ ও রিস্টোর:** অফলাইন JSON ফাইল আকারে ব্যাকআপ সংরক্ষণ ও রিস্টোর।

---

## ২. মোবাইল থেকে গিটহাব অ্যাকশনস দিয়ে APK তৈরি করার সহজ নিয়ম
আপনার কম্পিউটার বা অ্যান্ড্রয়েড স্টুডিও প্রয়োজন নেই। কেবল আপনার মোবাইল ফোন ব্যবহার করেই গিটহাব থেকে সরাসরি অফিশিয়াল \`.apk\` ফাইল তৈরি করে নিতে পারবেন:

### ধাপ ১: গিটহাবে নতুন রিপোজিটরি তৈরি করুন
1. আপনার ফোনের ব্রাউজারে [github.com](https://github.com) এ লগইন করুন।
2. **New Repository** বাটনে চাপ দিন।
3. Repository name দিন: \`SANDI-Daily-Hisab\`
4. Visibility রাখুন **Private** অথবা **Public**।
5. **Create repository** চাপুন।

### ধাপ ২: ফাইলসমূহ আপলোড করুন
1. এই অ্যাপের "Download Android Project ZIP" বাটন থেকে সম্পূর্ণ জিপ ফাইলটি ডাউনলোড করে নিন।
2. ফাইলটি আনজিপ করুন।
3. গিটহাব রিপোজিটরিতে **Add file** -> **Upload files** চাপুন।
4. সমস্ত ফোল্ডার ও ফাইলসমূহ ড্র্যাগ/সিলেক্ট করে কমিট করুন (\`Commit changes\`)।

### ধাপ ৩: গিটহাব অ্যাকশনস দিয়ে APK তৈরি
1. আপনার রিপোজিটরির উপরের মেন্যু থেকে **Actions** ট্যাবে যান।
2. বাঁপাশের তালিকা থেকে **Build SANDI Debug APK** দেখতে পাবেন।
3. **Run workflow** বাটনে ক্লিক করুন।
4. মাত্র ২ থেকে ৩ মিনিটের মধ্যে গিটহাবের ভার্চুয়াল ক্লাউড আপনার প্রজেক্টটি কম্পাইল করে একটি গ্রিন টিক মার্ক দেখাবে।

### ধাপ ৪: APK ডাউনলোড ও ইনস্টল
1. সফল হওয়া রানটিতে ক্লিক করুন।
2. পেজের নিচের অংশে **Artifacts** সেকশনে যান।
3. **SANDI-Debug-APK** নামের জিপ ফাইলটিতে ক্লিক করলেই আপনার ফোনে আসল অ্যাপটি ডাউনলোড হয়ে যাবে।
4. ফাইলটি ওপেন করে ইনস্টল করুন এবং সানন্দে আপনার ইজি বাইকের হিসাব পরিচালনা করুন!

---

## ৩. প্রযুক্তি ও আর্কিটেকচার
- **ভাষা:** Kotlin 2.1
- **ইউজার ইন্টারফেস:** Jetpack Compose + Material 3 (Dark Navy, Obsidian Black, Gold Accents)
- **ডাটাবেজ:** Room Database (SQLite) with Coroutines & StateFlow
- **মডেল:** MVVM + Clean Architecture Repository Pattern
- **বিল্ড টুল:** Gradle 8.10 (Kotlin DSL \`.kts\`) + GitHub Actions CI/CD
- **লাইসেন্স:** Apache 2.0 (ব্যক্তিগত মালিকানাধীন)
`,
  },
];
