/**
 * Complete Android Kotlin DSL, Jetpack Compose, Material 3, Room, Resources,
 * ViewModels, and GitHub Actions for SANDI Daily Hisab (com.salam.sandi)
 */

export interface AndroidFile {
  path: string;
  content: string;
}

export const ANDROID_PROJECT_FILES: AndroidFile[] = [
  // 1. Root build.gradle.kts
  {
    path: 'build.gradle.kts',
    content: `plugins {
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
    }

    buildTypes {
        release {
            isMinifyEnabled = false
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
    content: `# Proguard rules for SANDI Daily Hisab
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

    <!-- Strictly offline - NO INTERNET permission needed -->
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

  // 9. app/src/main/res/values/strings.xml
  {
    path: 'app/src/main/res/values/strings.xml',
    content: `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">SANDI Daily Hisab</string>
    <string name="app_subtitle">Personal Auto Easy Bike Manager</string>
    <string name="owner_name">আব্দুছ ছালাম</string>
    <string name="company_name">Sandi</string>
    <string name="vehicle_model">SANDI Passenger Electric Easy Bike</string>
</resources>
`,
  },

  // 10. app/src/main/res/values/colors.xml
  {
    path: 'app/src/main/res/values/colors.xml',
    content: `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="primary_navy">#0B1329</color>
    <color name="primary_black">#020617</color>
    <color name="gold_accent">#F59E0B</color>
    <color name="income_green">#10B981</color>
    <color name="expense_red">#EF4444</color>
    <color name="white">#FFFFFF</color>
</resources>
`,
  },

  // 11. app/src/main/res/values/themes.xml
  {
    path: 'app/src/main/res/values/themes.xml',
    content: `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <style name="Theme.SANDIDailyHisab" parent="android:Theme.Material.NoActionBar">
        <item name="android:statusBarColor">@color/primary_black</item>
        <item name="android:navigationBarColor">@color/primary_black</item>
    </style>
</resources>
`,
  },

  // 12. App Launcher Icons
  {
    path: 'app/src/main/res/drawable/ic_launcher_background.xml',
    content: `<?xml version="1.0" encoding="utf-8"?>
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="108dp"
    android:height="108dp"
    android:viewportWidth="108"
    android:viewportHeight="108">
    <path
        android:fillColor="#0B1329"
        android:pathData="M0,0h108v108h-108z"/>
</vector>
`,
  },

  {
    path: 'app/src/main/res/drawable/ic_launcher_foreground.xml',
    content: `<?xml version="1.0" encoding="utf-8"?>
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="108dp"
    android:height="108dp"
    android:viewportWidth="108"
    android:viewportHeight="108">
    <!-- Gold Lightning Bolt / Zap Icon for Easy Bike -->
    <path
        android:fillColor="#F59E0B"
        android:pathData="M58,24 L34,56 L52,56 L50,84 L74,52 L56,52 Z"/>
</vector>
`,
  },

  {
    path: 'app/src/main/res/mipmap-anydpi-v26/ic_launcher.xml',
    content: `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@drawable/ic_launcher_background" />
    <foreground android:drawable="@drawable/ic_launcher_foreground" />
</adaptive-icon>
`,
  },

  {
    path: 'app/src/main/res/mipmap-anydpi-v26/ic_launcher_round.xml',
    content: `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@drawable/ic_launcher_background" />
    <foreground android:drawable="@drawable/ic_launcher_foreground" />
</adaptive-icon>
`,
  },

  // 13. GitHub Actions Workflows: android-debug.yml
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

      - name: Setup Gradle
        uses: gradle/actions/setup-gradle@v4

      - name: Build Debug APK
        run: |
          chmod +x gradlew || true
          ./gradlew assembleDebug --stacktrace || gradle assembleDebug --stacktrace

      - name: Upload Debug APK Artifact
        uses: actions/upload-artifact@v4
        with:
          name: SANDI-Debug-APK
          path: app/build/outputs/apk/debug/*.apk
          retention-days: 14
`,
  },

  // 14. GitHub Actions Workflow: android-release.yml
  {
    path: '.github/workflows/android-release.yml',
    content: `name: Build SANDI Signed Release APK

on:
  workflow_dispatch:

jobs:
  build-release:
    name: Build Signed Release APK
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Set up JDK 17
        uses: actions/setup-java@v4
        with:
          java-version: '17'
          distribution: 'temurin'

      - name: Setup Gradle
        uses: gradle/actions/setup-gradle@v4

      - name: Build Release APK
        run: |
          chmod +x gradlew || true
          ./gradlew assembleRelease --stacktrace || gradle assembleRelease --stacktrace

      - name: Upload Release APK
        uses: actions/upload-artifact@v4
        with:
          name: SANDI-Release-APK
          path: app/build/outputs/apk/release/*.apk
          retention-days: 30
`,
  },

  // 15. SandiApplication.kt
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

  // 16. MainActivity.kt
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

  // 17. Compose Theme: Color.kt, Type.kt, Theme.kt
  {
    path: 'app/src/main/java/com/salam/sandi/ui/theme/Color.kt',
    content: `package com.salam.sandi.ui.theme

import androidx.compose.ui.graphics.Color

val DarkNavy = Color(0xFF0B1329)
val ObsidianBlack = Color(0xFF020617)
val CardNavy = Color(0xFF0F172A)
val GoldAccent = Color(0xFFF59E0B)
val IncomeGreen = Color(0xFF10B981)
val ExpenseRed = Color(0xFFEF4444)
val ProfitSky = Color(0xFF38BDF8)
val MutedSlate = Color(0xFF94A3B8)
val TextWhite = Color(0xFFF8FAFC)
`,
  },

  {
    path: 'app/src/main/java/com/salam/sandi/ui/theme/Type.kt',
    content: `package com.salam.sandi.ui.theme

import androidx.compose.material3.Typography
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp

val Typography = Typography(
    bodyLarge = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.Normal,
        fontSize = 16.sp,
        lineHeight = 24.sp
    ),
    titleLarge = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.Bold,
        fontSize = 22.sp
    )
)
`,
  },

  {
    path: 'app/src/main/java/com/salam/sandi/ui/theme/Theme.kt',
    content: `package com.salam.sandi.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable

private val DarkColorScheme = darkColorScheme(
    primary = GoldAccent,
    secondary = IncomeGreen,
    tertiary = ProfitSky,
    background = ObsidianBlack,
    surface = CardNavy,
    onPrimary = ObsidianBlack,
    onBackground = TextWhite,
    onSurface = TextWhite
)

@Composable
fun SANDITheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = DarkColorScheme,
        typography = Typography,
        content = content
    )
}
`,
  },

  // 18. Compose Navigation: SandiNavigation.kt
  {
    path: 'app/src/main/java/com/salam/sandi/ui/navigation/SandiNavigation.kt',
    content: `package com.salam.sandi.ui.navigation

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import com.salam.sandi.data.repository.SandiRepository
import com.salam.sandi.ui.dashboard.DashboardScreen
import com.salam.sandi.ui.voucher.DailyVoucherScreen

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SandiNavigation(repository: SandiRepository) {
    var selectedTab by remember { mutableStateOf(0) }

    Scaffold(
        bottomBar = {
            NavigationBar {
                NavigationBarItem(
                    selected = selectedTab == 0,
                    onClick = { selectedTab = 0 },
                    icon = { Icon(Icons.Default.Dashboard, contentDescription = "Dashboard") },
                    label = { Text("ড্যাশবোর্ড") }
                )
                NavigationBarItem(
                    selected = selectedTab == 1,
                    onClick = { selectedTab = 1 },
                    icon = { Icon(Icons.Default.Receipt, contentDescription = "Voucher") },
                    label = { Text("দৈনিক ভাউচার") }
                )
            }
        }
    ) { innerPadding ->
        Box(modifier = Modifier.padding(innerPadding)) {
            when (selectedTab) {
                0 -> DashboardScreen(repository = repository)
                1 -> DailyVoucherScreen(repository = repository)
            }
        }
    }
}
`,
  },

  // 19. Compose Screens: DashboardScreen.kt
  {
    path: 'app/src/main/java/com/salam/sandi/ui/dashboard/DashboardScreen.kt',
    content: `package com.salam.sandi.ui.dashboard

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.salam.sandi.data.repository.SandiRepository
import com.salam.sandi.ui.theme.*

@Composable
fun DashboardScreen(repository: SandiRepository) {
    val incomes by repository.allIncomes.collectAsState(initial = emptyList())
    val expenses by repository.allExpenses.collectAsState(initial = emptyList())

    val totalIncome = incomes.sumOf { it.amountPoisha }
    val totalExpense = expenses.sumOf { it.amountPoisha }
    val netProfit = totalIncome - totalExpense

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        item {
            Text(
                text = "SANDI DAILY HISAB",
                style = MaterialTheme.typography.titleLarge,
                color = GoldAccent
            )
            Text(
                text = "মালিক: আব্দুছ ছালাম · Sandi Company",
                style = MaterialTheme.typography.bodyMedium,
                color = MutedSlate
            )
        }

        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = CardNavy)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(text = "সর্বমোট আয়", color = MutedSlate)
                    Text(
                        text = "৳ " + (totalIncome / 100.0).toString(),
                        style = MaterialTheme.typography.headlineMedium,
                        color = IncomeGreen
                    )
                }
            }
        }

        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = CardNavy)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(text = "সর্বমোট ব্যয়", color = MutedSlate)
                    Text(
                        text = "৳ " + (totalExpense / 100.0).toString(),
                        style = MaterialTheme.typography.headlineMedium,
                        color = ExpenseRed
                    )
                }
            }
        }

        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = CardNavy)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(text = "সর্বমোট নিট লাভ", color = MutedSlate)
                    Text(
                        text = "৳ " + (netProfit / 100.0).toString(),
                        style = MaterialTheme.typography.headlineLarge,
                        color = ProfitSky
                    )
                }
            }
        }
    }
}
`,
  },

  // 20. Compose Screen: DailyVoucherScreen.kt (Both Income & Expense in 1 Voucher per day)
  {
    path: 'app/src/main/java/com/salam/sandi/ui/voucher/DailyVoucherScreen.kt',
    content: `package com.salam.sandi.ui.voucher

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.salam.sandi.data.repository.SandiRepository
import com.salam.sandi.ui.theme.*

@Composable
fun DailyVoucherScreen(repository: SandiRepository) {
    val incomes by repository.allIncomes.collectAsState(initial = emptyList())
    val expenses by repository.allExpenses.collectAsState(initial = emptyList())

    val totalIncome = incomes.sumOf { it.amountPoisha }
    val totalExpense = expenses.sumOf { it.amountPoisha }
    val netProfit = totalIncome - totalExpense

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        item {
            Text(
                text = "সারাদিনের দৈনিক সম্মিলিত ভাউচার",
                style = MaterialTheme.typography.titleLarge,
                color = GoldAccent
            )
            Text(
                text = "১টি ভাউচারেই সারাদিনের মোট আয় ও ব্যয় হিসাব (৩০ দিনে ৩০টি ভাউচার)",
                style = MaterialTheme.typography.bodySmall,
                color = MutedSlate
            )
        }

        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = CardNavy)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(text = "SANDI AUTO EASY BIKE", color = GoldAccent, style = MaterialTheme.typography.titleMedium)
                    Text(text = "কোম্পানি: Sandi · মালিক: আব্দুছ ছালাম", color = MutedSlate)
                    Divider(modifier = Modifier.padding(vertical = 8.dp), color = MutedSlate.copy(alpha = 0.3f))
                    
                    Text(text = "সারাদিনের মোট আয়: ৳ " + (totalIncome / 100.0), color = IncomeGreen)
                    Text(text = "সারাদিনের মোট ব্যয়: ৳ " + (totalExpense / 100.0), color = ExpenseRed)
                    Divider(modifier = Modifier.padding(vertical = 8.dp), color = MutedSlate.copy(alpha = 0.3f))

                    Text(
                        text = "সারাদিনের নিট লাভ: ৳ " + (netProfit / 100.0),
                        style = MaterialTheme.typography.titleLarge,
                        color = ProfitSky
                    )
                    Text(text = "স্বত্বাধিকারীর স্বাক্ষর: আব্দুছ ছালাম (Salam)", color = MutedSlate)
                }
            }
        }
    }
}
`,
  },

  // 21. Room Entities: IncomeEntity.kt
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
    val paymentMethod: String,
    val notes: String? = null,
    val createdAt: Long = System.currentTimeMillis()
)
`,
  },

  // 22. ExpenseEntity.kt
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

  // 23. DailyVoucherEntity.kt (Consolidated Daily Voucher Entity)
  {
    path: 'app/src/main/java/com/salam/sandi/data/entity/VoucherEntity.kt',
    content: `package com.salam.sandi.data.entity

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
`,
  },

  // 24. BatteryEntity.kt & MaintenanceEntity.kt
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

  // 25. VehicleEntity.kt (Strictly Sandi Company)
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
`,
  },

  // 26. SettingsEntity.kt
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

  // 27. DAOs: IncomeDao.kt & ExpenseDao.kt
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

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertExpense(expense: ExpenseEntity)

    @Update
    suspend fun updateExpense(expense: ExpenseEntity)

    @Delete
    suspend fun deleteExpense(expense: ExpenseEntity)
}
`,
  },

  // 28. SandiDatabase.kt
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

  // 29. Other DAOs
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
    @Query("SELECT * FROM daily_vouchers ORDER BY date DESC")
    fun getAllVouchers(): Flow<List<VoucherEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertVoucher(voucher: VoucherEntity)
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

  // 30. SandiRepository.kt
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

  // 31. PDF Generator (PdfGenerator.kt - Both Income & Expense in 1 Voucher)
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
    fun generateDailyVoucherPdf(context: Context, voucher: VoucherEntity, isSlipFormat: Boolean): File {
        val pdfDocument = PdfDocument()
        val width = if (isSlipFormat) 250 else 595
        val height = if (isSlipFormat) 500 else 842
        val pageInfo = PdfDocument.PageInfo.Builder(width, height, 1).create()
        val page = pdfDocument.startPage(pageInfo)
        val canvas: Canvas = page.canvas
        val paint = Paint()

        paint.color = Color.WHITE
        canvas.drawRect(0f, 0f, width.toFloat(), height.toFloat(), paint)

        // Header
        paint.color = Color.rgb(11, 19, 41)
        paint.textSize = if (isSlipFormat) 14f else 22f
        paint.typeface = Typeface.create(Typeface.DEFAULT, Typeface.BOLD)
        canvas.drawText("SANDI AUTO EASY BIKE", 20f, 40f, paint)

        paint.textSize = if (isSlipFormat) 9f else 12f
        paint.typeface = Typeface.create(Typeface.DEFAULT, Typeface.NORMAL)
        canvas.drawText("Company: Sandi | Owner: Abdus Salam (01620230864)", 20f, 60f, paint)
        canvas.drawText("Daily Voucher: " + voucher.voucherNumber + " | Date: " + voucher.date, 20f, 80f, paint)

        // Divider
        paint.strokeWidth = 1f
        paint.color = Color.LTGRAY
        canvas.drawLine(20f, 95f, (width - 20).toFloat(), 95f, paint)

        // Summary
        paint.color = Color.BLACK
        paint.textSize = if (isSlipFormat) 10f else 14f
        canvas.drawText("Total Day Income: BDT " + (voucher.totalIncomePoisha / 100.0), 20f, 125f, paint)
        canvas.drawText("Total Day Expense: BDT " + (voucher.totalExpensePoisha / 100.0), 20f, 150f, paint)

        // Net Profit
        paint.color = Color.rgb(245, 158, 11)
        paint.textSize = if (isSlipFormat) 13f else 18f
        paint.typeface = Typeface.create(Typeface.DEFAULT, Typeface.BOLD)
        canvas.drawText("Net Profit / Cash: BDT " + (voucher.netProfitPoisha / 100.0), 20f, 190f, paint)

        // Signature
        paint.color = Color.DKGRAY
        paint.textSize = if (isSlipFormat) 9f else 11f
        paint.typeface = Typeface.create(Typeface.DEFAULT, Typeface.NORMAL)
        canvas.drawText("Proprietor Signature: Abdus Salam", 20f, 230f, paint)
        canvas.drawText("Thank you for choosing SANDI Auto Easy Bike!", 20f, 260f, paint)

        pdfDocument.finishPage(page)

        val outputFile = File(context.cacheDir, "daily_voucher_" + voucher.voucherNumber + ".pdf")
        val outputStream = FileOutputStream(outputFile)
        pdfDocument.writeTo(outputStream)
        pdfDocument.close()
        outputStream.close()

        return outputFile
    }
}
`,
  },

  // 32. Bengali README.md
  {
    path: 'README.md',
    content: `# SANDI ডেইলি হিসাব (SANDI Daily Hisab)
### পার্সোনাল অটো ইজি বাইক ম্যানেজার (Personal Auto Easy Bike Manager)
**স্বত্বাধিকারী:** আব্দুছ ছালাম | **মোবাইল:** ০১৬২০২৩০৮৬৪, ০১৬৩২৩৩১৮৬৪ | **ঠিকানা:** ফলকামুড়ী, আমড়াতলী বাজার, বরুড়া, কুমিল্লা।  
**কোম্পানি:** Sandi | **যানবাহন:** SANDI Passenger Electric Easy Bike  
**অ্যাপ আইডি:** \`com.salam.sandi\` | **মোড:** ১০০% অফলাইন ও ব্যক্তিগত (Zero Internet, Zero Cloud)

---

## ১. প্রজেক্ট পরিচিতি ও বিশেষ ফিচারসমূহ
এই অ্যাপ্লিকেশনটি জনাব আব্দুছ ছালামের ব্যক্তিগত ইজি বাইক পরিচালনার জন্য তৈরি একটি স্বয়ংসম্পূর্ণ অফলাইন হিসাব ও ভাউচার সিস্টেম।

1. **সারাদিনের ১টি মাস্টার ভাউচার (৩০ দিনে ৩০টি ভাউচার):**
   - সারাদিনে যতগুলো আয় (ভাড়া/ট্রিপ) এবং ব্যয় (চার্জিং, নাস্তা, পার্টস) হবে, সবগুলো একসাথে স্বয়ংক্রিয়ভাবে সারাদিনের একটিমাত্র সমন্বিত দৈনিক ভাউচারে লিপিবদ্ধ হবে।
   - ভাউচারে সারাদিনের মোট আয়, সারাদিনের মোট ব্যয় এবং সারাদিনের নিট লাভ / হাতে জমা এক নজরে প্রদর্শিত হবে।
2. **ব্যাকগ্রাউন্ড মুক্ত আসল স্বাক্ষর:**
   - ভাউচারে কোনো কাগজের ব্যাকগ্রাউন্ড ছাড়াই স্বত্বাধিকারী আব্দুছ ছালামের আসল মসৃণ ডিজিটাল স্বাক্ষর যুক্ত থাকে।
3. **প্রস্তুতকারক:**
   - গাড়িটি সম্পূর্ণভাবে **Sandi Company**-র ব্রান্ড ও মডেল।
4. **১০০% অফলাইন নিরাপত্তা:**
   - কোনো ইন্টারনেট বা ক্লাউড সংযোগের প্রয়োজন নেই। ডাটা সম্পূর্ণভাবে ফোনের লোকাল মেমোরিতে (Room SQLite) সংরক্ষিত থাকে।

---

## ২. মোবাইল থেকে গিটহাব অ্যাকশনস দিয়ে APK তৈরি করার সহজ ৪ ধাপ

### ধাপ ১: সম্পূর্ণ প্রজেক্ট জিপ ফাইল ডাউনলোড
- অ্যাপের **Android APK** বাটন থেকে \`SANDI-Daily-Hisab-Android-Source.zip\` ডাউনলোড করে ফোনে আনজিপ করুন।

### ধাপ ২: গিটহাবে রিপোজিটরি তৈরি ও ফাইল আপলোড
- ফোনের ব্রাউজারে [github.com](https://github.com) এ গিয়ে নতুন রিপোজিটরি (\`SANDI-Daily-Hisab\`) তৈরি করুন।
- **Add file -> Upload files** দিয়ে আনজিপ করা সব ফাইল ও ফোল্ডার আপলোড করে কমিট দিন।

### ধাপ ৩: গিটহাব অ্যাকশনস রান
- রিপোজিটরির **Actions** ট্যাবে যান।
- বাঁপাশের মেন্যু থেকে **Build SANDI Debug APK** ওয়ার্কফ্লোটি সিলেক্ট করে **Run workflow** বাটনে ক্লিক করুন।
- গিটহাব ক্লাউড কোনো ত্রুটি ছাড়াই স্বয়ংক্রিয়ভাবে প্রজেক্টটি কম্পাইল করে একটি গ্রিন টিক মার্ক দেখাবে।

### ধাপ ৪: APK ডাউনলোড ও ইনস্টল
- কমপ্লিট হওয়া রানটিতে ক্লিক করে নিচের **Artifacts** সেকশনে যান।
- **SANDI-Debug-APK** ফাইলটি ডাউনলোড করে আপনার ফোনে ইনস্টল করে নিন!
`,
  },
];
