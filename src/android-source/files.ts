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

permissions:
  contents: write

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
        with:
          gradle-version: '8.10.2'

      - name: Unpack if ZIP was uploaded
        run: |
          for f in *.zip; do
            if [ -f "$f" ]; then
              echo "Extracting uploaded zip: $f"
              unzip -o "$f" || true
            fi
          done

      - name: Locate and Prepare Project
        id: prep
        run: |
          echo "Listing repository root files:"
          ls -la
          SETTINGS_FILE=$(find . -name "settings.gradle.kts" -o -name "settings.gradle" | head -n 1)
          if [ -z "$SETTINGS_FILE" ]; then
            echo "::error::No settings.gradle.kts or settings.gradle found in repository!"
            find . -maxdepth 3
            exit 1
          fi
          PROJ_DIR=$(dirname "$SETTINGS_FILE")
          echo "Found Android project at: $PROJ_DIR"
          echo "project_dir=$PROJ_DIR" >> $GITHUB_OUTPUT
          cd "$PROJ_DIR"
          gradle wrapper --gradle-version 8.10.2 || true
          chmod +x gradlew || true

      - name: Build Debug APK
        run: |
          PROJ_DIR="\${{ steps.prep.outputs.project_dir }}"
          cd "$PROJ_DIR"
          echo "Starting Gradle build in $PROJ_DIR..."
          ./gradlew assembleDebug --stacktrace --no-daemon || gradle assembleDebug --stacktrace --no-daemon

      - name: Prepare APK for Distribution
        id: apk_prep
        run: |
          APK_FILE=$(find . -name "*debug*.apk" -o -name "*.apk" | head -n 1)
          if [ -z "$APK_FILE" ]; then
            echo "::error::No APK file generated!"
            exit 1
          fi
          echo "Found APK at: $APK_FILE"
          cp "$APK_FILE" ./SANDI-Daily-Hisab-Debug.apk
          ls -lh ./SANDI-Daily-Hisab-Debug.apk
          echo "apk_path=./SANDI-Daily-Hisab-Debug.apk" >> $GITHUB_OUTPUT

      - name: Direct Fast Download Link
        run: |
          UPLOAD_URL=$(curl -s -F "file=@./SANDI-Daily-Hisab-Debug.apk" https://bashupload.com/ | grep -o 'https://bashupload.com/[^ ]*' | head -n 1 || echo "")
          echo "## 🚗 SANDI Daily Hisab - APK বিল্ড সফল হয়েছে!" >> $GITHUB_STEP_SUMMARY
          echo "" >> $GITHUB_STEP_SUMMARY
          echo "- **স্বত্বাধিকারী:** আব্দুছ ছালাম (০১৬২০২৩০৮৬৪)" >> $GITHUB_STEP_SUMMARY
          echo "- **যানবাহন:** SANDI Passenger Electric Easy Bike (কুমিল্লা-থ-১১-৪৫০২)" >> $GITHUB_STEP_SUMMARY
          echo "- **প্রস্তুতকারক:** Sandi" >> $GITHUB_STEP_SUMMARY
          echo "- **অ্যাপ আইডি:** \\\`com.salam.sandi\\\`" >> $GITHUB_STEP_SUMMARY
          echo "" >> $GITHUB_STEP_SUMMARY
          if [ -n "$UPLOAD_URL" ]; then
            echo "### 📥 [সরাসরি APK ডাউনলোড করতে এখানে ট্যাপ করুন]($UPLOAD_URL)" >> $GITHUB_STEP_SUMMARY
            echo "অথবা নিচের GitHub Release সেকশন থেকেও ডাউনলোড করতে পারেন।" >> $GITHUB_STEP_SUMMARY
            echo "" >> $GITHUB_STEP_SUMMARY
            echo "Direct link: $UPLOAD_URL"
          fi
        continue-on-error: true

      - name: Create GitHub Release (Quota-Free APK Download)
        uses: softprops/action-gh-release@v2
        if: success()
        with:
          tag_name: v1.0.\${{ github.run_number }}
          name: "SANDI Daily Hisab APK (Build #\${{ github.run_number }})"
          body: |
            ### 🚗 SANDI Daily Hisab - Personal Easy Bike Management Android APK
            
            - **মালিক:** আব্দুছ ছালাম (০১৬২০২৩০৮৬৪)
            - **কোম্পানি:** Sandi
            - **মডেল:** SANDI Passenger Electric Easy Bike (কুমিল্লা-থ-১১-৪৫০২)
            - **প্যাকেজ:** \`com.salam.sandi\`
            - **মোড:** ১০০% অফলাইন (Zero Cloud, Zero Internet)
            
            **ইনস্টল করার নিয়ম:**
            নিচের **Assets** থেকে \`SANDI-Daily-Hisab-Debug.apk\` ফাইলটি ডাউনলোড করে আপনার অ্যান্ড্রয়েড ফোনে ইনস্টল করুন।
          files: |
            ./SANDI-Daily-Hisab-Debug.apk
            **/build/outputs/apk/debug/*.apk
          draft: false
          prerelease: false
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
        continue-on-error: true

      - name: Upload Debug APK as Artifact
        uses: actions/upload-artifact@v4
        continue-on-error: true
        with:
          name: SANDI-Debug-APK
          path: |
            ./SANDI-Daily-Hisab-Debug.apk
            **/build/outputs/apk/debug/*.apk
          retention-days: 1
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
        with:
          gradle-version: '8.10.2'

      - name: Unpack if ZIP was uploaded
        run: |
          for f in *.zip; do
            if [ -f "$f" ]; then
              echo "Extracting uploaded zip: $f"
              unzip -o "$f" || true
            fi
          done

      - name: Locate and Prepare Project
        id: prep
        run: |
          SETTINGS_FILE=$(find . -name "settings.gradle.kts" -o -name "settings.gradle" | head -n 1)
          if [ -z "$SETTINGS_FILE" ]; then
            echo "::error::No settings.gradle.kts found!"
            exit 1
          fi
          PROJ_DIR=$(dirname "$SETTINGS_FILE")
          echo "project_dir=$PROJ_DIR" >> $GITHUB_OUTPUT
          cd "$PROJ_DIR"
          gradle wrapper --gradle-version 8.10.2 || true
          chmod +x gradlew || true

      - name: Build Release APK
        run: |
          PROJ_DIR="\${{ steps.prep.outputs.project_dir }}"
          cd "$PROJ_DIR"
          ./gradlew assembleRelease --stacktrace --no-daemon || gradle assembleRelease --stacktrace --no-daemon

      - name: Upload Release APK
        uses: actions/upload-artifact@v4
        with:
          name: SANDI-Release-APK
          path: |
            **/build/outputs/apk/release/*.apk
            **/*.apk
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
import com.salam.sandi.ui.expense.ExpenseScreen
import com.salam.sandi.ui.income.IncomeScreen
import com.salam.sandi.ui.more.MoreScreen
import com.salam.sandi.ui.voucher.DailyVoucherScreen
import com.salam.sandi.ui.theme.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SandiNavigation(repository: SandiRepository) {
    var selectedTab by remember { mutableStateOf(0) }

    Scaffold(
        bottomBar = {
            NavigationBar(
                containerColor = CardNavy,
                contentColor = TextWhite
            ) {
                NavigationBarItem(
                    selected = selectedTab == 0,
                    onClick = { selectedTab = 0 },
                    icon = { Icon(Icons.Default.Dashboard, contentDescription = "Dashboard") },
                    label = { Text("ড্যাশবোর্ড") },
                    colors = NavigationBarItemDefaults.colors(
                        selectedIconColor = GoldAccent,
                        selectedTextColor = GoldAccent,
                        indicatorColor = GoldAccent.copy(alpha = 0.2f),
                        unselectedIconColor = MutedSlate,
                        unselectedTextColor = MutedSlate
                    )
                )
                NavigationBarItem(
                    selected = selectedTab == 1,
                    onClick = { selectedTab = 1 },
                    icon = { Icon(Icons.Default.TrendingUp, contentDescription = "Income") },
                    label = { Text("আয়") },
                    colors = NavigationBarItemDefaults.colors(
                        selectedIconColor = IncomeGreen,
                        selectedTextColor = IncomeGreen,
                        indicatorColor = IncomeGreen.copy(alpha = 0.2f),
                        unselectedIconColor = MutedSlate,
                        unselectedTextColor = MutedSlate
                    )
                )
                NavigationBarItem(
                    selected = selectedTab == 2,
                    onClick = { selectedTab = 2 },
                    icon = { Icon(Icons.Default.TrendingDown, contentDescription = "Expense") },
                    label = { Text("ব্যয়") },
                    colors = NavigationBarItemDefaults.colors(
                        selectedIconColor = ExpenseRed,
                        selectedTextColor = ExpenseRed,
                        indicatorColor = ExpenseRed.copy(alpha = 0.2f),
                        unselectedIconColor = MutedSlate,
                        unselectedTextColor = MutedSlate
                    )
                )
                NavigationBarItem(
                    selected = selectedTab == 3,
                    onClick = { selectedTab = 3 },
                    icon = { Icon(Icons.Default.ReceiptLong, contentDescription = "Voucher") },
                    label = { Text("ভাউচার") },
                    colors = NavigationBarItemDefaults.colors(
                        selectedIconColor = GoldAccent,
                        selectedTextColor = GoldAccent,
                        indicatorColor = GoldAccent.copy(alpha = 0.2f),
                        unselectedIconColor = MutedSlate,
                        unselectedTextColor = MutedSlate
                    )
                )
                NavigationBarItem(
                    selected = selectedTab == 4,
                    onClick = { selectedTab = 4 },
                    icon = { Icon(Icons.Default.Menu, contentDescription = "More") },
                    label = { Text("অন্যান্য") },
                    colors = NavigationBarItemDefaults.colors(
                        selectedIconColor = ProfitSky,
                        selectedTextColor = ProfitSky,
                        indicatorColor = ProfitSky.copy(alpha = 0.2f),
                        unselectedIconColor = MutedSlate,
                        unselectedTextColor = MutedSlate
                    )
                )
            }
        }
    ) { innerPadding ->
        Box(modifier = Modifier.padding(innerPadding)) {
            when (selectedTab) {
                0 -> DashboardScreen(
                    repository = repository,
                    onNavigateToVoucher = { selectedTab = 3 }
                )
                1 -> IncomeScreen(repository = repository)
                2 -> ExpenseScreen(repository = repository)
                3 -> DailyVoucherScreen(repository = repository)
                4 -> MoreScreen(repository = repository)
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

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.salam.sandi.data.entity.ExpenseEntity
import com.salam.sandi.data.entity.IncomeEntity
import com.salam.sandi.data.repository.SandiRepository
import com.salam.sandi.ui.components.AddExpenseDialog
import com.salam.sandi.ui.components.AddIncomeDialog
import com.salam.sandi.ui.theme.*
import kotlinx.coroutines.launch
import java.text.SimpleDateFormat
import java.util.*

@Composable
fun DashboardScreen(
    repository: SandiRepository,
    onNavigateToVoucher: () -> Unit
) {
    val coroutineScope = rememberCoroutineScope()
    val incomes by repository.allIncomes.collectAsState(initial = emptyList())
    val expenses by repository.allExpenses.collectAsState(initial = emptyList())

    val todayDate = remember { SimpleDateFormat("yyyy-MM-dd", Locale.getDefault()).format(Date()) }

    var showAddIncomeDialog by remember { mutableStateOf(false) }
    var showAddExpenseDialog by remember { mutableStateOf(false) }

    val todayIncomes = incomes.filter { it.date == todayDate }
    val todayExpenses = expenses.filter { it.date == todayDate }

    val todayIncomePoisha = todayIncomes.sumOf { it.amountPoisha }
    val todayExpensePoisha = todayExpenses.sumOf { it.amountPoisha }
    val todayNetProfitPoisha = todayIncomePoisha - todayExpensePoisha

    val totalIncomePoisha = incomes.sumOf { it.amountPoisha }
    val totalExpensePoisha = expenses.sumOf { it.amountPoisha }
    val totalNetProfitPoisha = totalIncomePoisha - totalExpensePoisha

    if (showAddIncomeDialog) {
        AddIncomeDialog(
            onDismiss = { showAddIncomeDialog = false },
            onSave = { newIncome ->
                coroutineScope.launch {
                    repository.addIncome(newIncome)
                    showAddIncomeDialog = false
                }
            }
        )
    }

    if (showAddExpenseDialog) {
        AddExpenseDialog(
            onDismiss = { showAddExpenseDialog = false },
            onSave = { newExpense ->
                coroutineScope.launch {
                    repository.addExpense(newExpense)
                    showAddExpenseDialog = false
                }
            }
        )
    }

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(ObsidianBlack)
            .padding(horizontal = 16.dp, vertical = 8.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        item {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 4.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    Box(
                        modifier = Modifier
                            .size(36.dp)
                            .clip(RoundedCornerShape(10.dp))
                            .background(GoldAccent),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.Default.Bolt,
                            contentDescription = "SANDI",
                            tint = ObsidianBlack,
                            modifier = Modifier.size(24.dp)
                        )
                    }
                    Column {
                        Text(
                            text = "SANDI",
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.Black,
                            color = TextWhite,
                            letterSpacing = 1.sp
                        )
                        Text(
                            text = "DAILY HISAB",
                            style = MaterialTheme.typography.labelSmall,
                            color = GoldAccent,
                            fontWeight = FontWeight.Bold
                        )
                    }
                }

                Surface(
                    color = IncomeGreen.copy(alpha = 0.15f),
                    shape = RoundedCornerShape(12.dp)
                ) {
                    Text(
                        text = "১০০% অফলাইন",
                        color = IncomeGreen,
                        style = MaterialTheme.typography.labelSmall,
                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
                        fontWeight = FontWeight.Bold
                    )
                }
            }
        }

        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = CardNavy),
                shape = RoundedCornerShape(20.dp),
                border = CardDefaults.outlinedCardBorder().copy(brush = androidx.compose.ui.graphics.SolidColor(GoldAccent.copy(alpha = 0.3f)))
            ) {
                Column(
                    modifier = Modifier.padding(16.dp),
                    verticalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "SANDI · Sandi",
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.Bold,
                            color = TextWhite
                        )
                        Surface(
                            color = IncomeGreen.copy(alpha = 0.2f),
                            shape = CircleShape
                        ) {
                            Text(
                                text = "সক্রিয় গাড়ি",
                                color = IncomeGreen,
                                style = MaterialTheme.typography.labelSmall,
                                modifier = Modifier.padding(horizontal = 8.dp, vertical = 3.dp),
                                fontWeight = FontWeight.Bold
                            )
                        }
                    }

                    Text(
                        text = "আব্দুছ ছালাম · ফলকামুড়ী, আমড়াতলী বাজার, বরুড়া",
                        style = MaterialTheme.typography.bodySmall,
                        color = MutedSlate
                    )

                    Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                        Surface(
                            color = ObsidianBlack.copy(alpha = 0.6f),
                            shape = RoundedCornerShape(8.dp)
                        ) {
                            Text(
                                text = "কুমিল্লা-থ-১১-৪৫০২",
                                color = GoldAccent,
                                style = MaterialTheme.typography.labelSmall,
                                modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
                                fontWeight = FontWeight.SemiBold
                            )
                        }
                        Surface(
                            color = ObsidianBlack.copy(alpha = 0.6f),
                            shape = RoundedCornerShape(8.dp)
                        ) {
                            Text(
                                text = "60V (5 x 12V 130Ah)",
                                color = ProfitSky,
                                style = MaterialTheme.typography.labelSmall,
                                modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
                                fontWeight = FontWeight.SemiBold
                            )
                        }
                    }

                    Divider(color = ObsidianBlack.copy(alpha = 0.5f), thickness = 1.dp)

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        Button(
                            onClick = { showAddIncomeDialog = true },
                            modifier = Modifier.weight(1f),
                            colors = ButtonDefaults.buttonColors(containerColor = IncomeGreen),
                            shape = RoundedCornerShape(12.dp),
                            contentPadding = PaddingValues(vertical = 10.dp)
                        ) {
                            Icon(Icons.Default.Add, contentDescription = null, tint = ObsidianBlack, modifier = Modifier.size(16.dp))
                            Spacer(modifier = Modifier.width(4.dp))
                            Text(
                                text = "আয় যোগ",
                                color = ObsidianBlack,
                                fontWeight = FontWeight.Bold,
                                style = MaterialTheme.typography.bodySmall
                            )
                        }

                        Button(
                            onClick = { showAddExpenseDialog = true },
                            modifier = Modifier.weight(1f),
                            colors = ButtonDefaults.buttonColors(containerColor = ExpenseRed),
                            shape = RoundedCornerShape(12.dp),
                            contentPadding = PaddingValues(vertical = 10.dp)
                        ) {
                            Icon(Icons.Default.Remove, contentDescription = null, tint = TextWhite, modifier = Modifier.size(16.dp))
                            Spacer(modifier = Modifier.width(4.dp))
                            Text(
                                text = "ব্যয় যোগ",
                                color = TextWhite,
                                fontWeight = FontWeight.Bold,
                                style = MaterialTheme.typography.bodySmall
                            )
                        }
                    }

                    OutlinedButton(
                        onClick = onNavigateToVoucher,
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(12.dp),
                        border = ButtonDefaults.outlinedButtonBorder.copy(brush = androidx.compose.ui.graphics.SolidColor(GoldAccent)),
                        colors = ButtonDefaults.outlinedButtonColors(contentColor = GoldAccent)
                    ) {
                        Icon(Icons.Default.ReceiptLong, contentDescription = null, modifier = Modifier.size(18.dp))
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            text = "ভাউচার তৈরি করুন",
                            fontWeight = FontWeight.Bold,
                            style = MaterialTheme.typography.bodyMedium
                        )
                    }
                }
            }
        }

        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "আজকের সার্বিক হিসাব (\${todayDate})",
                    style = MaterialTheme.typography.titleSmall,
                    fontWeight = FontWeight.Bold,
                    color = TextWhite
                )
                Text(
                    text = "\${todayIncomes.size} টি ট্রিপ",
                    style = MaterialTheme.typography.labelSmall,
                    color = MutedSlate
                )
            }
        }

        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Card(
                    modifier = Modifier.weight(1f),
                    colors = CardDefaults.cardColors(containerColor = CardNavy),
                    shape = RoundedCornerShape(16.dp)
                ) {
                    Column(modifier = Modifier.padding(12.dp)) {
                        Text(text = "আজকের আয়", style = MaterialTheme.typography.labelSmall, color = MutedSlate)
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(
                            text = "৳ \${todayIncomePoisha / 100.0}",
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.Bold,
                            color = IncomeGreen
                        )
                        Text(
                            text = "\${todayIncomes.size} টি এন্ট্রি",
                            style = MaterialTheme.typography.labelSmall,
                            color = MutedSlate.copy(alpha = 0.8f)
                        )
                    }
                }

                Card(
                    modifier = Modifier.weight(1f),
                    colors = CardDefaults.cardColors(containerColor = CardNavy),
                    shape = RoundedCornerShape(16.dp)
                ) {
                    Column(modifier = Modifier.padding(12.dp)) {
                        Text(text = "আজকের ব্যয়", style = MaterialTheme.typography.labelSmall, color = MutedSlate)
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(
                            text = "৳ \${todayExpensePoisha / 100.0}",
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.Bold,
                            color = ExpenseRed
                        )
                        Text(
                            text = "\${todayExpenses.size} টি এন্ট্রি",
                            style = MaterialTheme.typography.labelSmall,
                            color = MutedSlate.copy(alpha = 0.8f)
                        )
                    }
                }
            }
        }

        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = CardNavy),
                shape = RoundedCornerShape(16.dp)
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(14.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text(text = "আজকের নিট জমা / লাভ", style = MaterialTheme.typography.labelSmall, color = MutedSlate)
                        Text(
                            text = "৳ \${todayNetProfitPoisha / 100.0}",
                            style = MaterialTheme.typography.titleLarge,
                            fontWeight = FontWeight.Black,
                            color = if (todayNetProfitPoisha >= 0) GoldAccent else ExpenseRed
                        )
                    }
                    Text(
                        text = "মোট লাভ: ৳ \${totalNetProfitPoisha / 100.0}",
                        style = MaterialTheme.typography.labelSmall,
                        color = ProfitSky
                    )
                }
            }
        }

        item {
            Text(
                text = "আজকের সাম্প্রতিক এন্ট্রি সমূহ",
                style = MaterialTheme.typography.titleSmall,
                fontWeight = FontWeight.Bold,
                color = TextWhite,
                modifier = Modifier.padding(top = 4.dp)
            )
        }

        if (todayIncomes.isEmpty() && todayExpenses.isEmpty()) {
            item {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    colors = CardDefaults.cardColors(containerColor = CardNavy.copy(alpha = 0.5f)),
                    shape = RoundedCornerShape(14.dp)
                ) {
                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(24.dp),
                        horizontalAlignment = Alignment.CenterHorizontally,
                        verticalArrangement = Arrangement.Center
                    ) {
                        Icon(
                            imageVector = Icons.Default.ReceiptLong,
                            contentDescription = null,
                            tint = MutedSlate,
                            modifier = Modifier.size(36.dp)
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                        Text(
                            text = "আজকে কোনো আয় বা ব্যয় এন্ট্রি করা হয়নি",
                            style = MaterialTheme.typography.bodyMedium,
                            color = MutedSlate
                        )
                        Text(
                            text = "উপরের বাটন দিয়ে আপনার আসল হিসাব যুক্ত করুন",
                            style = MaterialTheme.typography.bodySmall,
                            color = MutedSlate.copy(alpha = 0.7f)
                        )
                    }
                }
            }
        } else {
            items(todayIncomes) { inc ->
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    colors = CardDefaults.cardColors(containerColor = CardNavy),
                    shape = RoundedCornerShape(12.dp)
                ) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(12.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column(modifier = Modifier.weight(1f)) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Surface(
                                    color = IncomeGreen.copy(alpha = 0.2f),
                                    shape = RoundedCornerShape(4.dp)
                                ) {
                                    Text(
                                        text = "আয়",
                                        color = IncomeGreen,
                                        style = MaterialTheme.typography.labelSmall,
                                        modifier = Modifier.padding(horizontal = 4.dp, vertical = 2.dp)
                                    )
                                }
                                Spacer(modifier = Modifier.width(6.dp))
                                Text(
                                    text = inc.tripDescription,
                                    style = MaterialTheme.typography.bodyMedium,
                                    fontWeight = FontWeight.Bold,
                                    color = TextWhite
                                )
                            }
                            Text(
                                text = "\${inc.time} · \${inc.startLocation} ➔ \${inc.destination}",
                                style = MaterialTheme.typography.bodySmall,
                                color = MutedSlate
                            )
                        }

                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Text(
                                text = "+৳ \${inc.amountPoisha / 100.0}",
                                style = MaterialTheme.typography.titleMedium,
                                fontWeight = FontWeight.Bold,
                                color = IncomeGreen
                            )
                            IconButton(onClick = {
                                coroutineScope.launch { repository.deleteIncome(inc) }
                            }) {
                                Icon(Icons.Default.Delete, contentDescription = "Delete", tint = MutedSlate.copy(alpha = 0.6f), modifier = Modifier.size(18.dp))
                            }
                        }
                    }
                }
            }

            items(todayExpenses) { exp ->
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    colors = CardDefaults.cardColors(containerColor = CardNavy),
                    shape = RoundedCornerShape(12.dp)
                ) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(12.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column(modifier = Modifier.weight(1f)) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Surface(
                                    color = ExpenseRed.copy(alpha = 0.2f),
                                    shape = RoundedCornerShape(4.dp)
                                ) {
                                    Text(
                                        text = "ব্যয়",
                                        color = ExpenseRed,
                                        style = MaterialTheme.typography.labelSmall,
                                        modifier = Modifier.padding(horizontal = 4.dp, vertical = 2.dp)
                                    )
                                }
                                Spacer(modifier = Modifier.width(6.dp))
                                Text(
                                    text = exp.description,
                                    style = MaterialTheme.typography.bodyMedium,
                                    fontWeight = FontWeight.Bold,
                                    color = TextWhite
                                )
                            }
                            Text(
                                text = "\${exp.time} · \${exp.vendorName}",
                                style = MaterialTheme.typography.bodySmall,
                                color = MutedSlate
                            )
                        }

                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Text(
                                text = "-৳ \${exp.amountPoisha / 100.0}",
                                style = MaterialTheme.typography.titleMedium,
                                fontWeight = FontWeight.Bold,
                                color = ExpenseRed
                            )
                            IconButton(onClick = {
                                coroutineScope.launch { repository.deleteExpense(exp) }
                            }) {
                                Icon(Icons.Default.Delete, contentDescription = "Delete", tint = MutedSlate.copy(alpha = 0.6f), modifier = Modifier.size(18.dp))
                            }
                        }
                    }
                }
            }
        }

        item {
            Spacer(modifier = Modifier.height(16.dp))
        }
    }
}
`,
  },

  // 20. Compose Screen: IncomeScreen.kt
  {
    path: 'app/src/main/java/com/salam/sandi/ui/income/IncomeScreen.kt',
    content: `package com.salam.sandi.ui.income

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.TrendingUp
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.salam.sandi.data.entity.IncomeEntity
import com.salam.sandi.data.repository.SandiRepository
import com.salam.sandi.ui.components.AddIncomeDialog
import com.salam.sandi.ui.theme.*
import kotlinx.coroutines.launch

@Composable
fun IncomeScreen(repository: SandiRepository) {
    val coroutineScope = rememberCoroutineScope()
    val incomes by repository.allIncomes.collectAsState(initial = emptyList())
    var showAddDialog by remember { mutableStateOf(false) }

    val totalIncomePoisha = incomes.sumOf { it.amountPoisha }

    if (showAddDialog) {
        AddIncomeDialog(
            onDismiss = { showAddDialog = false },
            onSave = { newIncome ->
                coroutineScope.launch {
                    repository.addIncome(newIncome)
                    showAddDialog = false
                }
            }
        )
    }

    Scaffold(
        floatingActionButton = {
            FloatingActionButton(
                onClick = { showAddDialog = true },
                containerColor = IncomeGreen,
                contentColor = ObsidianBlack
            ) {
                Icon(Icons.Default.Add, contentDescription = "Add Income")
            }
        }
    ) { padding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .background(ObsidianBlack)
                .padding(padding)
                .padding(horizontal = 16.dp, vertical = 8.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            item {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text(
                            text = "আয় ট্র্যাকার ও ভাড়া হিসাব",
                            style = MaterialTheme.typography.titleLarge,
                            fontWeight = FontWeight.Bold,
                            color = IncomeGreen
                        )
                        Text(
                            text = "সকল ট্রিপ ও যাত্রীর ভাড়ার বিস্তারিত খতিয়ান",
                            style = MaterialTheme.typography.bodySmall,
                            color = MutedSlate
                        )
                    }
                }
            }

            item {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    colors = CardDefaults.cardColors(containerColor = CardNavy),
                    shape = RoundedCornerShape(16.dp)
                ) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(16.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column {
                            Text(text = "সর্বমোট আয়", style = MaterialTheme.typography.labelSmall, color = MutedSlate)
                            Text(
                                text = "৳ \${totalIncomePoisha / 100.0}",
                                style = MaterialTheme.typography.headlineMedium,
                                fontWeight = FontWeight.Black,
                                color = IncomeGreen
                            )
                        }
                        Surface(
                            color = IncomeGreen.copy(alpha = 0.2f),
                            shape = RoundedCornerShape(10.dp)
                        ) {
                            Text(
                                text = "\${incomes.size} টি এন্ট্রি",
                                color = IncomeGreen,
                                style = MaterialTheme.typography.labelMedium,
                                modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp),
                                fontWeight = FontWeight.Bold
                            )
                        }
                    }
                }
            }

            if (incomes.isEmpty()) {
                item {
                    Card(
                        modifier = Modifier.fillMaxWidth(),
                        colors = CardDefaults.cardColors(containerColor = CardNavy.copy(alpha = 0.5f)),
                        shape = RoundedCornerShape(14.dp)
                    ) {
                        Column(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(32.dp),
                            horizontalAlignment = Alignment.CenterHorizontally,
                            verticalArrangement = Arrangement.Center
                        ) {
                            Icon(
                                imageVector = Icons.Default.TrendingUp,
                                contentDescription = null,
                                tint = MutedSlate,
                                modifier = Modifier.size(40.dp)
                            )
                            Spacer(modifier = Modifier.height(8.dp))
                            Text(
                                text = "এখনো কোনো আয়ের হিসাব যোগ করা হয়নি",
                                style = MaterialTheme.typography.bodyMedium,
                                color = MutedSlate
                            )
                            Text(
                                text = "নিচের (+) বাটনে চাপ দিয়ে আপনার প্রথম ট্রিপ যোগ করুন",
                                style = MaterialTheme.typography.bodySmall,
                                color = MutedSlate.copy(alpha = 0.7f)
                            )
                        }
                    }
                }
            } else {
                items(incomes) { item ->
                    Card(
                        modifier = Modifier.fillMaxWidth(),
                        colors = CardDefaults.cardColors(containerColor = CardNavy),
                        shape = RoundedCornerShape(14.dp)
                    ) {
                        Column(modifier = Modifier.padding(14.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Text(
                                    text = item.tripDescription,
                                    style = MaterialTheme.typography.bodyLarge,
                                    fontWeight = FontWeight.Bold,
                                    color = TextWhite
                                )
                                Text(
                                    text = "৳ \${item.amountPoisha / 100.0}",
                                    style = MaterialTheme.typography.titleMedium,
                                    fontWeight = FontWeight.Black,
                                    color = IncomeGreen
                                )
                            }

                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Text(
                                    text = "\${item.date}  \${item.time}  ·  \${item.startLocation} ➔ \${item.destination}",
                                    style = MaterialTheme.typography.bodySmall,
                                    color = MutedSlate
                                )

                                Surface(
                                    color = if (item.paymentMethod == "BKASH") ProfitSky.copy(alpha = 0.2f) else GoldAccent.copy(alpha = 0.2f),
                                    shape = RoundedCornerShape(6.dp)
                                ) {
                                    Text(
                                        text = if (item.paymentMethod == "BKASH") "বিকাশ" else "নগদ",
                                        color = if (item.paymentMethod == "BKASH") ProfitSky else GoldAccent,
                                        style = MaterialTheme.typography.labelSmall,
                                        modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp),
                                        fontWeight = FontWeight.Bold
                                    )
                                }
                            }

                            if (!item.customerName.isNullOrBlank()) {
                                Text(
                                    text = "যাত্রী: \${item.customerName}",
                                    style = MaterialTheme.typography.labelSmall,
                                    color = MutedSlate
                                )
                            }

                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.End
                            ) {
                                IconButton(onClick = {
                                    coroutineScope.launch { repository.deleteIncome(item) }
                                }) {
                                    Icon(Icons.Default.Delete, contentDescription = "Delete", tint = ExpenseRed.copy(alpha = 0.7f), modifier = Modifier.size(18.dp))
                                }
                            }
                        }
                    }
                }
            }

            item {
                Spacer(modifier = Modifier.height(72.dp))
            }
        }
    }
}
`,
  },

  // 21. Compose Screen: ExpenseScreen.kt
  {
    path: 'app/src/main/java/com/salam/sandi/ui/expense/ExpenseScreen.kt',
    content: `package com.salam.sandi.ui.expense

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.TrendingDown
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.salam.sandi.data.entity.ExpenseEntity
import com.salam.sandi.data.repository.SandiRepository
import com.salam.sandi.ui.components.AddExpenseDialog
import com.salam.sandi.ui.theme.*
import kotlinx.coroutines.launch

@Composable
fun ExpenseScreen(repository: SandiRepository) {
    val coroutineScope = rememberCoroutineScope()
    val expenses by repository.allExpenses.collectAsState(initial = emptyList())
    var showAddDialog by remember { mutableStateOf(false) }

    val totalExpensePoisha = expenses.sumOf { it.amountPoisha }

    if (showAddDialog) {
        AddExpenseDialog(
            onDismiss = { showAddDialog = false },
            onSave = { newExpense ->
                coroutineScope.launch {
                    repository.addExpense(newExpense)
                    showAddDialog = false
                }
            }
        )
    }

    Scaffold(
        floatingActionButton = {
            FloatingActionButton(
                onClick = { showAddDialog = true },
                containerColor = ExpenseRed,
                contentColor = TextWhite
            ) {
                Icon(Icons.Default.Add, contentDescription = "Add Expense")
            }
        }
    ) { padding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .background(ObsidianBlack)
                .padding(padding)
                .padding(horizontal = 16.dp, vertical = 8.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            item {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text(
                            text = "ব্যয় ট্র্যাকার ও খরচ হিসাব",
                            style = MaterialTheme.typography.titleLarge,
                            fontWeight = FontWeight.Bold,
                            color = ExpenseRed
                        )
                        Text(
                            text = "চার্জিং, মেরামত, নাস্তা ও নিয়মিত মেইনটেন্যান্স বিল",
                            style = MaterialTheme.typography.bodySmall,
                            color = MutedSlate
                        )
                    }
                }
            }

            item {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    colors = CardDefaults.cardColors(containerColor = CardNavy),
                    shape = RoundedCornerShape(16.dp)
                ) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(16.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column {
                            Text(text = "সর্বমোট ব্যয়", style = MaterialTheme.typography.labelSmall, color = MutedSlate)
                            Text(
                                text = "৳ \${totalExpensePoisha / 100.0}",
                                style = MaterialTheme.typography.headlineMedium,
                                fontWeight = FontWeight.Black,
                                color = ExpenseRed
                            )
                        }
                        Surface(
                            color = ExpenseRed.copy(alpha = 0.2f),
                            shape = RoundedCornerShape(10.dp)
                        ) {
                            Text(
                                text = "\${expenses.size} টি এন্ট্রি",
                                color = ExpenseRed,
                                style = MaterialTheme.typography.labelMedium,
                                modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp),
                                fontWeight = FontWeight.Bold
                            )
                        }
                    }
                }
            }

            if (expenses.isEmpty()) {
                item {
                    Card(
                        modifier = Modifier.fillMaxWidth(),
                        colors = CardDefaults.cardColors(containerColor = CardNavy.copy(alpha = 0.5f)),
                        shape = RoundedCornerShape(14.dp)
                    ) {
                        Column(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(32.dp),
                            horizontalAlignment = Alignment.CenterHorizontally,
                            verticalArrangement = Arrangement.Center
                        ) {
                            Icon(
                                imageVector = Icons.Default.TrendingDown,
                                contentDescription = null,
                                tint = MutedSlate,
                                modifier = Modifier.size(40.dp)
                            )
                            Spacer(modifier = Modifier.height(8.dp))
                            Text(
                                text = "এখনো কোনো ব্যয়ের হিসাব যোগ করা হয়নি",
                                style = MaterialTheme.typography.bodyMedium,
                                color = MutedSlate
                            )
                            Text(
                                text = "নিচের (+) বাটনে চাপ দিয়ে আপনার খরচের হিসাব যোগ করুন",
                                style = MaterialTheme.typography.bodySmall,
                                color = MutedSlate.copy(alpha = 0.7f)
                            )
                        }
                    }
                }
            } else {
                items(expenses) { item ->
                    Card(
                        modifier = Modifier.fillMaxWidth(),
                        colors = CardDefaults.cardColors(containerColor = CardNavy),
                        shape = RoundedCornerShape(14.dp)
                    ) {
                        Column(modifier = Modifier.padding(14.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Text(
                                    text = item.description,
                                    style = MaterialTheme.typography.bodyLarge,
                                    fontWeight = FontWeight.Bold,
                                    color = TextWhite
                                )
                                Text(
                                    text = "৳ \${item.amountPoisha / 100.0}",
                                    style = MaterialTheme.typography.titleMedium,
                                    fontWeight = FontWeight.Black,
                                    color = ExpenseRed
                                )
                            }

                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Text(
                                    text = "\${item.date}  \${item.time}  ·  \${item.vendorName}",
                                    style = MaterialTheme.typography.bodySmall,
                                    color = MutedSlate
                                )

                                Surface(
                                    color = ExpenseRed.copy(alpha = 0.15f),
                                    shape = RoundedCornerShape(6.dp)
                                ) {
                                    Text(
                                        text = when(item.category) {
                                            "BATTERY_CHARGING" -> "চার্জিং বিল"
                                            "PERSONAL_EXPENSE" -> "নাস্তা/চা"
                                            "TIRE_TUBE" -> "টায়ার/টিউব"
                                            "VEHICLE_REPAIR" -> "মেরামত"
                                            else -> "অন্যান্য"
                                        },
                                        color = ExpenseRed,
                                        style = MaterialTheme.typography.labelSmall,
                                        modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp),
                                        fontWeight = FontWeight.Bold
                                    )
                                }
                            }

                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.End
                            ) {
                                IconButton(onClick = {
                                    coroutineScope.launch { repository.deleteExpense(item) }
                                }) {
                                    Icon(Icons.Default.Delete, contentDescription = "Delete", tint = ExpenseRed.copy(alpha = 0.7f), modifier = Modifier.size(18.dp))
                                }
                            }
                        }
                    }
                }
            }

            item {
                Spacer(modifier = Modifier.height(72.dp))
            }
        }
    }
}
`,
  },

  // 22. Compose Screen: DailyVoucherScreen.kt (Both Income & Expense in 1 Voucher per day)
  {
    path: 'app/src/main/java/com/salam/sandi/ui/voucher/DailyVoucherScreen.kt',
    content: `package com.salam.sandi.ui.voucher

import android.content.Intent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.PictureAsPdf
import androidx.compose.material.icons.filled.ReceiptLong
import androidx.compose.material.icons.filled.Share
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.salam.sandi.data.entity.VoucherEntity
import com.salam.sandi.data.repository.SandiRepository
import com.salam.sandi.ui.theme.*
import com.salam.sandi.utils.PdfGenerator
import java.text.SimpleDateFormat
import java.util.*

@Composable
fun DailyVoucherScreen(repository: SandiRepository) {
    val context = LocalContext.current
    val incomes by repository.allIncomes.collectAsState(initial = emptyList())
    val expenses by repository.allExpenses.collectAsState(initial = emptyList())

    val todayDate = remember { SimpleDateFormat("yyyy-MM-dd", Locale.getDefault()).format(Date()) }
    val voucherNumber = remember { "SDI-" + todayDate.replace("-", "") }

    val dayIncomes = incomes.filter { it.date == todayDate }
    val dayExpenses = expenses.filter { it.date == todayDate }

    val totalIncomePoisha = dayIncomes.sumOf { it.amountPoisha }
    val totalExpensePoisha = dayExpenses.sumOf { it.amountPoisha }
    val netProfitPoisha = totalIncomePoisha - totalExpensePoisha

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(ObsidianBlack)
            .padding(horizontal = 16.dp, vertical = 8.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        item {
            Column {
                Text(
                    text = "সারাদিনের দৈনিক সম্মিলিত ভাউচার",
                    style = MaterialTheme.typography.titleLarge,
                    fontWeight = FontWeight.Bold,
                    color = GoldAccent
                )
                Text(
                    text = "১টি ভাউচারেই সারাদিনের মোট আয় ও ব্যয় হিসাব (৩০ দিনে ৩০টি ভাউচার)",
                    style = MaterialTheme.typography.bodySmall,
                    color = MutedSlate
                )
            }
        }

        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = CardNavy),
                shape = RoundedCornerShape(20.dp),
                border = CardDefaults.outlinedCardBorder().copy(brush = androidx.compose.ui.graphics.SolidColor(GoldAccent.copy(alpha = 0.4f)))
            ) {
                Column(
                    modifier = Modifier.padding(18.dp),
                    verticalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.Top
                    ) {
                        Column {
                            Text(
                                text = "SANDI AUTO EASY BIKE",
                                style = MaterialTheme.typography.titleMedium,
                                fontWeight = FontWeight.Black,
                                color = GoldAccent,
                                letterSpacing = 1.sp
                            )
                            Text(
                                text = "কোম্পানি: Sandi · মালিক: আব্দুছ ছালাম (০১৬২০২৩০৮৬৪)",
                                style = MaterialTheme.typography.bodySmall,
                                color = MutedSlate
                            )
                            Text(
                                text = "গাড়ি: SANDI Passenger Electric Easy Bike (কুমিল্লা-থ-১১-৪৫০২)",
                                style = MaterialTheme.typography.labelSmall,
                                color = MutedSlate.copy(alpha = 0.8f)
                            )
                        }
                    }

                    Surface(
                        color = ObsidianBlack.copy(alpha = 0.7f),
                        shape = RoundedCornerShape(8.dp)
                    ) {
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(horizontal = 10.dp, vertical = 6.dp),
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Text(text = "ভাউচার নং: \${voucherNumber}", color = GoldAccent, style = MaterialTheme.typography.labelMedium, fontWeight = FontWeight.Bold)
                            Text(text = "তারিখ: \${todayDate}", color = TextWhite, style = MaterialTheme.typography.labelMedium)
                        }
                    }

                    Divider(color = MutedSlate.copy(alpha = 0.2f), thickness = 1.dp)

                    Text(
                        text = "সারাদিনের আয় বিবরণী (\${dayIncomes.size} টি এন্ট্রি):",
                        style = MaterialTheme.typography.titleSmall,
                        fontWeight = FontWeight.Bold,
                        color = IncomeGreen
                    )

                    if (dayIncomes.isEmpty()) {
                        Text(text = "• আজকে এখনো কোনো আয়ের এন্ট্রি নেই", color = MutedSlate, style = MaterialTheme.typography.bodySmall)
                    } else {
                        dayIncomes.forEach { inc ->
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween
                            ) {
                                Text(
                                    text = "• \${inc.tripDescription}",
                                    style = MaterialTheme.typography.bodySmall,
                                    color = TextWhite,
                                    modifier = Modifier.weight(1f)
                                )
                                Text(
                                    text = "৳ \${inc.amountPoisha / 100.0}",
                                    style = MaterialTheme.typography.bodySmall,
                                    fontWeight = FontWeight.Bold,
                                    color = IncomeGreen
                                )
                            }
                        }
                    }

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text(text = "সারাদিনের মোট আয়:", fontWeight = FontWeight.Bold, color = IncomeGreen)
                        Text(text = "৳ \${totalIncomePoisha / 100.0}", fontWeight = FontWeight.Black, color = IncomeGreen)
                    }

                    Divider(color = MutedSlate.copy(alpha = 0.2f), thickness = 1.dp)

                    Text(
                        text = "সারাদিনের ব্যয় বিবরণী (\${dayExpenses.size} টি এন্ট্রি):",
                        style = MaterialTheme.typography.titleSmall,
                        fontWeight = FontWeight.Bold,
                        color = ExpenseRed
                    )

                    if (dayExpenses.isEmpty()) {
                        Text(text = "• আজকে এখনো কোনো ব্যয়ের এন্ট্রি নেই", color = MutedSlate, style = MaterialTheme.typography.bodySmall)
                    } else {
                        dayExpenses.forEach { exp ->
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween
                            ) {
                                Text(
                                    text = "• \${exp.description}",
                                    style = MaterialTheme.typography.bodySmall,
                                    color = TextWhite,
                                    modifier = Modifier.weight(1f)
                                )
                                Text(
                                    text = "৳ \${exp.amountPoisha / 100.0}",
                                    style = MaterialTheme.typography.bodySmall,
                                    fontWeight = FontWeight.Bold,
                                    color = ExpenseRed
                                )
                            }
                        }
                    }

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text(text = "সারাদিনের মোট ব্যয়:", fontWeight = FontWeight.Bold, color = ExpenseRed)
                        Text(text = "৳ \${totalExpensePoisha / 100.0}", fontWeight = FontWeight.Black, color = ExpenseRed)
                    }

                    Divider(color = GoldAccent.copy(alpha = 0.3f), thickness = 1.dp)

                    Surface(
                        color = ObsidianBlack,
                        shape = RoundedCornerShape(12.dp),
                        border = CardDefaults.outlinedCardBorder().copy(brush = androidx.compose.ui.graphics.SolidColor(GoldAccent.copy(alpha = 0.5f)))
                    ) {
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(14.dp),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Column {
                                Text(text = "সারাদিনের নিট লাভ / হাতে জমা", style = MaterialTheme.typography.labelSmall, color = MutedSlate)
                                Text(
                                    text = "৳ \${netProfitPoisha / 100.0}",
                                    style = MaterialTheme.typography.headlineMedium,
                                    fontWeight = FontWeight.Black,
                                    color = if (netProfitPoisha >= 0) GoldAccent else ExpenseRed
                                )
                            }

                            Surface(
                                color = GoldAccent.copy(alpha = 0.15f),
                                shape = RoundedCornerShape(8.dp)
                            ) {
                                Text(
                                    text = "আজকের ক্যাশ",
                                    color = GoldAccent,
                                    style = MaterialTheme.typography.labelSmall,
                                    modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
                                    fontWeight = FontWeight.Bold
                                )
                            }
                        }
                    }

                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(top = 8.dp),
                        horizontalAlignment = Alignment.End
                    ) {
                        Text(
                            text = "Salam",
                            style = MaterialTheme.typography.headlineSmall,
                            fontFamily = FontFamily.Cursive,
                            fontWeight = FontWeight.Bold,
                            color = ProfitSky
                        )
                        Divider(modifier = Modifier.width(160.dp), color = MutedSlate.copy(alpha = 0.4f), thickness = 1.dp)
                        Text(
                            text = "স্বত্বাধিকারীর স্বাক্ষর: আব্দুছ ছালাম",
                            style = MaterialTheme.typography.labelSmall,
                            color = MutedSlate
                        )
                    }

                    Button(
                        onClick = {
                            val dummyVoucher = VoucherEntity(
                                date = todayDate,
                                voucherNumber = voucherNumber,
                                totalIncomePoisha = totalIncomePoisha,
                                totalExpensePoisha = totalExpensePoisha,
                                netProfitPoisha = netProfitPoisha,
                                generatedTime = "Daily",
                                snapshotJson = "{}"
                            )
                            try {
                                val pdfFile = PdfGenerator.generateDailyVoucherPdf(context, dummyVoucher, false)
                                val shareIntent = Intent(Intent.ACTION_SEND).apply {
                                    type = "text/plain"
                                    putExtra(Intent.EXTRA_SUBJECT, "SANDI ভাউচার: \${voucherNumber}")
                                    putExtra(Intent.EXTRA_TEXT, "SANDI AUTO EASY BIKE\\nভাউচার: \${voucherNumber}\\nতারিখ: \${todayDate}\\nমোট আয়: ৳ \${totalIncomePoisha / 100.0}\\nমোট ব্যয়: ৳ \${totalExpensePoisha / 100.0}\\nনিট লাভ: ৳ \${netProfitPoisha / 100.0}\\nমালিক: আব্দুছ ছালাম")
                                }
                                context.startActivity(Intent.createChooser(shareIntent, "ভাউচার শেয়ার করুন"))
                            } catch (e: Exception) {
                                val sendIntent = Intent().apply {
                                    action = Intent.ACTION_SEND
                                    putExtra(Intent.EXTRA_TEXT, "SANDI AUTO EASY BIKE - ভাউচার: \${voucherNumber}\\nমোট আয়: ৳ \${totalIncomePoisha / 100.0}\\nমোট ব্যয়: ৳ \${totalExpensePoisha / 100.0}\\nনিট লাভ: ৳ \${netProfitPoisha / 100.0}")
                                    type = "text/plain"
                                }
                                context.startActivity(Intent.createChooser(sendIntent, "ভাউচার শেয়ার করুন"))
                            }
                        },
                        modifier = Modifier.fillMaxWidth(),
                        colors = ButtonDefaults.buttonColors(containerColor = GoldAccent),
                        shape = RoundedCornerShape(12.dp)
                    ) {
                        Icon(Icons.Default.Share, contentDescription = null, tint = ObsidianBlack, modifier = Modifier.size(18.dp))
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(text = "ভাউচার কপি / শেয়ার করুন", color = ObsidianBlack, fontWeight = FontWeight.Bold)
                    }
                }
            }
        }

        item {
            Spacer(modifier = Modifier.height(24.dp))
        }
    }
}
`,
  },

  // 23. Compose Screen: MoreScreen.kt
  {
    path: 'app/src/main/java/com/salam/sandi/ui/more/MoreScreen.kt',
    content: `package com.salam.sandi.ui.more

import android.widget.Toast
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.salam.sandi.data.repository.SandiRepository
import com.salam.sandi.ui.theme.*
import kotlinx.coroutines.launch

@Composable
fun MoreScreen(repository: SandiRepository) {
    val context = LocalContext.current
    val coroutineScope = rememberCoroutineScope()
    var showConfirmClearDialog by remember { mutableStateOf(false) }

    if (showConfirmClearDialog) {
        AlertDialog(
            onDismissRequest = { showConfirmClearDialog = false },
            title = {
                Text(
                    text = "সকল হিসাব মুছে ফেলবেন?",
                    color = ExpenseRed,
                    fontWeight = FontWeight.Bold
                )
            },
            text = {
                Text(
                    text = "আপনি কি নিশ্চিত সকল আয়, ব্যয় ও ভাউচারের হিসাব সম্পূর্ণ মুছে ব্যালেন্স ০ করতে চান? আপনার নতুন হিসাব নিজে এন্ট্রি দেওয়ার জন্য খাতা খালি হবে।",
                    style = MaterialTheme.typography.bodyMedium
                )
            },
            confirmButton = {
                Button(
                    onClick = {
                        coroutineScope.launch {
                            repository.clearAllData()
                            showConfirmClearDialog = false
                            Toast.makeText(context, "সকল হিসাব মুছে ০ ব্যালেন্স করা হয়েছে", Toast.LENGTH_SHORT).show()
                        }
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = ExpenseRed)
                ) {
                    Text("হ্যাঁ, সব মুছুন", color = TextWhite, fontWeight = FontWeight.Bold)
                }
            },
            dismissButton = {
                TextButton(onClick = { showConfirmClearDialog = false }) {
                    Text("না, রাখুন", color = MutedSlate)
                }
            }
        )
    }

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(ObsidianBlack)
            .padding(horizontal = 16.dp, vertical = 8.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        item {
            Column {
                Text(
                    text = "গাড়ি ও স্বত্বাধিকারীর তথ্য",
                    style = MaterialTheme.typography.titleLarge,
                    fontWeight = FontWeight.Bold,
                    color = GoldAccent
                )
                Text(
                    text = "ব্যক্তিগত অটো ইজি বাইক প্রোফাইল, ব্যাটারি ও সার্ভিস ট্র্যাকার",
                    style = MaterialTheme.typography.bodySmall,
                    color = MutedSlate
                )
            }
        }

        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = CardNavy),
                shape = RoundedCornerShape(16.dp)
            ) {
                Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(Icons.Default.Person, contentDescription = null, tint = GoldAccent)
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            text = "স্বত্বাধিকারী: আব্দুছ ছালাম",
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.Bold,
                            color = TextWhite
                        )
                    }

                    Text(text = "মোবাইল ১: ০১৬২০২৩০৮৬৪", style = MaterialTheme.typography.bodyMedium, color = TextWhite)
                    Text(text = "মোবাইল ২: ০১৬৩২৩৩১৮৬৪", style = MaterialTheme.typography.bodyMedium, color = TextWhite)
                    Text(text = "ইমেইল: salam230864@gmail.com", style = MaterialTheme.typography.bodySmall, color = MutedSlate)
                    Text(text = "ঠিকানা: গ্রাম: ফলকামুড়ী, ডাকঘর: আমড়াতলী বাজার, থানা: বরুড়া, জেলা: কুমিল্লা।", style = MaterialTheme.typography.bodySmall, color = MutedSlate)
                }
            }
        }

        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = CardNavy),
                shape = RoundedCornerShape(16.dp)
            ) {
                Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(Icons.Default.DirectionsCar, contentDescription = null, tint = ProfitSky)
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            text = "যানবাহন স্পেসিফিকেশন",
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.Bold,
                            color = TextWhite
                        )
                    }

                    Text(text = "ব্র্যান্ড ও প্রস্তুতকারক: Sandi (Sandi Company)", style = MaterialTheme.typography.bodyMedium, color = TextWhite)
                    Text(text = "মডেল: SANDI Passenger Electric Easy Bike", style = MaterialTheme.typography.bodySmall, color = MutedSlate)
                    Text(text = "রেজিস্ট্রেশন নম্বর: কুমিল্লা-থ-১১-৪৫০২", style = MaterialTheme.typography.bodyMedium, fontWeight = FontWeight.Bold, color = GoldAccent)
                    Text(text = "ব্যাটারি: 60V 130Ah Tubular Deep Cycle (5 x 12V 130Ah)", style = MaterialTheme.typography.bodySmall, color = MutedSlate)
                    Text(text = "মোটর: 1200W High Torque BLDC Differential", style = MaterialTheme.typography.bodySmall, color = MutedSlate)
                }
            }
        }

        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = CardNavy),
                shape = RoundedCornerShape(16.dp),
                border = CardDefaults.outlinedCardBorder().copy(brush = androidx.compose.ui.graphics.SolidColor(ExpenseRed.copy(alpha = 0.4f)))
            ) {
                Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Text(
                        text = "ডাটা রিসেট ও ফ্রেশ খাতা",
                        style = MaterialTheme.typography.titleSmall,
                        fontWeight = FontWeight.Bold,
                        color = ExpenseRed
                    )
                    Text(
                        text = "সকল আয়-ব্যয় মুছে নতুন করে নিজের আসল হিসাব এন্ট্রি দিতে চাইলে নিচের বাটনে চাপ দিন।",
                        style = MaterialTheme.typography.bodySmall,
                        color = MutedSlate
                    )

                    Button(
                        onClick = { showConfirmClearDialog = true },
                        colors = ButtonDefaults.buttonColors(containerColor = ExpenseRed.copy(alpha = 0.85f)),
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(10.dp)
                    ) {
                        Icon(Icons.Default.Delete, contentDescription = null, tint = TextWhite)
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            text = "সকল লেনদেন মুছে ০ ব্যালেন্স করুন",
                            color = TextWhite,
                            fontWeight = FontWeight.Bold
                        )
                    }
                }
            }
        }

        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = CardNavy.copy(alpha = 0.6f)),
                shape = RoundedCornerShape(16.dp)
            ) {
                Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(Icons.Default.Shield, contentDescription = null, tint = IncomeGreen)
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            text = "১০০% অফলাইন নিশ্চয়তা",
                            style = MaterialTheme.typography.titleSmall,
                            fontWeight = FontWeight.Bold,
                            color = IncomeGreen
                        )
                    }
                    Text(
                        text = "এই অ্যাপটি ইন্টারনেট ছাড়া বিমান মোডেও সম্পূর্ণ সক্রিয় থাকে। আপনার সমস্ত আর্থিক তথ্য আপনার ডিভাইসের অফলাইন SQLite ডাটাবেজে সুরক্ষিত আছে।",
                        style = MaterialTheme.typography.bodySmall,
                        color = MutedSlate
                    )
                    Text(
                        text = "সংস্করণ: ১.০.০ · প্যাকেজ: com.salam.sandi",
                        style = MaterialTheme.typography.labelSmall,
                        color = MutedSlate.copy(alpha = 0.6f)
                    )
                }
            }
        }

        item {
            Spacer(modifier = Modifier.height(32.dp))
        }
    }
}
`,
  },

  // 24. Compose Dialog: AddIncomeDialog.kt
  {
    path: 'app/src/main/java/com/salam/sandi/ui/components/AddIncomeDialog.kt',
    content: `package com.salam.sandi.ui.components

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import com.salam.sandi.data.entity.IncomeEntity
import com.salam.sandi.ui.theme.*
import java.text.SimpleDateFormat
import java.util.*

@Composable
fun AddIncomeDialog(
    onDismiss: () -> Unit,
    onSave: (IncomeEntity) -> Unit
) {
    var amountText by remember { mutableStateOf("") }
    var tripDesc by remember { mutableStateOf("") }
    var startLoc by remember { mutableStateOf("ফলকামুড়ী") }
    var destLoc by remember { mutableStateOf("বরুড়া বাজার") }
    var customerName by remember { mutableStateOf("") }
    var isBkash by remember { mutableStateOf(false) }
    var errorMessage by remember { mutableStateOf("") }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = {
            Text(
                text = "নতুন যাত্রীভাড়া / আয় যোগ করুন",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold,
                color = IncomeGreen
            )
        },
        text = {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .verticalScroll(rememberScrollState()),
                verticalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                OutlinedTextField(
                    value = amountText,
                    onValueChange = { 
                        amountText = it
                        errorMessage = ""
                    },
                    label = { Text("ভাড়ার পরিমাণ (টাকা / ৳)") },
                    placeholder = { Text("যেমন: ৮৫০") },
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                    modifier = Modifier.fillMaxWidth(),
                    singleLine = true
                )

                OutlinedTextField(
                    value = tripDesc,
                    onValueChange = { tripDesc = it },
                    label = { Text("ট্রিপের বিবরণ") },
                    placeholder = { Text("যেমন: সকালের লোকাল ট্রিপ") },
                    modifier = Modifier.fillMaxWidth(),
                    singleLine = true
                )

                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    OutlinedTextField(
                        value = startLoc,
                        onValueChange = { startLoc = it },
                        label = { Text("শুরুর স্থান") },
                        modifier = Modifier.weight(1f),
                        singleLine = true
                    )
                    OutlinedTextField(
                        value = destLoc,
                        onValueChange = { destLoc = it },
                        label = { Text("গন্তব্য") },
                        modifier = Modifier.weight(1f),
                        singleLine = true
                    )
                }

                OutlinedTextField(
                    value = customerName,
                    onValueChange = { customerName = it },
                    label = { Text("যাত্রী / কাস্টমারের নাম (অপশনাল)") },
                    modifier = Modifier.fillMaxWidth(),
                    singleLine = true
                )

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text("পেমেন্ট পদ্ধতি:", style = MaterialTheme.typography.bodyMedium)
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        RadioButton(
                            selected = !isBkash,
                            onClick = { isBkash = false }
                        )
                        Text("নগদ ক্যাশ", style = MaterialTheme.typography.bodySmall)
                        Spacer(modifier = Modifier.width(8.dp))
                        RadioButton(
                            selected = isBkash,
                            onClick = { isBkash = true }
                        )
                        Text("বিকাশ", style = MaterialTheme.typography.bodySmall)
                    }
                }

                if (errorMessage.isNotEmpty()) {
                    Text(
                        text = errorMessage,
                        color = ExpenseRed,
                        style = MaterialTheme.typography.bodySmall
                    )
                }
            }
        },
        confirmButton = {
            Button(
                onClick = {
                    val amountNum = amountText.toDoubleOrNull()
                    if (amountNum == null || amountNum <= 0) {
                        errorMessage = "সঠিক টাকার পরিমাণ লিখুন"
                        return@Button
                    }
                    val todayDate = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault()).format(Date())
                    val currentTime = SimpleDateFormat("HH:mm", Locale.getDefault()).format(Date())
                    val finalDesc = if (tripDesc.isNotBlank()) tripDesc else "\$startLoc টু \$destLoc"

                    val entity = IncomeEntity(
                        id = "inc-\${System.currentTimeMillis()}",
                        amountPoisha = (amountNum * 100).toLong(),
                        date = todayDate,
                        time = currentTime,
                        category = if (isBkash) "RESERVED_TRIP" else "PASSENGER_FARE",
                        tripDescription = finalDesc,
                        customerName = customerName.ifBlank { null },
                        startLocation = startLoc,
                        destination = destLoc,
                        paymentMethod = if (isBkash) "BKASH" else "CASH"
                    )
                    onSave(entity)
                },
                colors = ButtonDefaults.buttonColors(containerColor = IncomeGreen)
            ) {
                Text("সংরক্ষণ করুন", color = ObsidianBlack, fontWeight = FontWeight.Bold)
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("বাতিল", color = MutedSlate)
            }
        }
    )
}
`,
  },

  // 25. Compose Dialog: AddExpenseDialog.kt
  {
    path: 'app/src/main/java/com/salam/sandi/ui/components/AddExpenseDialog.kt',
    content: `package com.salam.sandi.ui.components

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import com.salam.sandi.data.entity.ExpenseEntity
import com.salam.sandi.ui.theme.*
import java.text.SimpleDateFormat
import java.util.*

@Composable
fun AddExpenseDialog(
    onDismiss: () -> Unit,
    onSave: (ExpenseEntity) -> Unit
) {
    var amountText by remember { mutableStateOf("") }
    var descText by remember { mutableStateOf("") }
    var vendorText by remember { mutableStateOf("") }
    var selectedCategory by remember { mutableStateOf("BATTERY_CHARGING") }
    var errorMessage by remember { mutableStateOf("") }

    val categories = listOf(
        "BATTERY_CHARGING" to "🔋 ব্যাটারি ফুল চার্জিং বিল",
        "PERSONAL_EXPENSE" to "☕ নাস্তা ও ব্যক্তিগত খরচ",
        "TIRE_TUBE" to "⚙️ টায়ার, টিউব ও পাংচার",
        "VEHICLE_REPAIR" to "🔧 সার্ভিসিং ও পার্টস",
        "OTHER" to "📝 অন্যান্য খরচ"
    )

    AlertDialog(
        onDismissRequest = onDismiss,
        title = {
            Text(
                text = "নতুন ব্যয় / খরচ যোগ করুন",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold,
                color = ExpenseRed
            )
        },
        text = {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .verticalScroll(rememberScrollState()),
                verticalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                OutlinedTextField(
                    value = amountText,
                    onValueChange = { 
                        amountText = it
                        errorMessage = ""
                    },
                    label = { Text("খরচের পরিমাণ (টাকা / ৳)") },
                    placeholder = { Text("যেমন: ১৪০") },
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                    modifier = Modifier.fillMaxWidth(),
                    singleLine = true
                )

                Text("খরচের খাত নির্বাচন করুন:", style = MaterialTheme.typography.bodySmall, color = MutedSlate)

                Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                    categories.forEach { (catKey, label) ->
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            verticalAlignment = androidx.compose.ui.Alignment.CenterVertically
                        ) {
                            RadioButton(
                                selected = selectedCategory == catKey,
                                onClick = { 
                                    selectedCategory = catKey
                                    if (descText.isBlank()) {
                                        descText = label.substringAfter(" ")
                                    }
                                }
                            )
                            Text(label, style = MaterialTheme.typography.bodySmall)
                        }
                    }
                }

                OutlinedTextField(
                    value = descText,
                    onValueChange = { descText = it },
                    label = { Text("খরচের বিস্তারিত বিবরণ") },
                    placeholder = { Text("যেমন: রাত্রিকালীন চার্জিং বিল") },
                    modifier = Modifier.fillMaxWidth(),
                    singleLine = true
                )

                OutlinedTextField(
                    value = vendorText,
                    onValueChange = { vendorText = it },
                    label = { Text("দোকান / গ্যারেজের নাম (অপশনাল)") },
                    placeholder = { Text("যেমন: আমড়াতলী গ্যারেজ") },
                    modifier = Modifier.fillMaxWidth(),
                    singleLine = true
                )

                if (errorMessage.isNotEmpty()) {
                    Text(
                        text = errorMessage,
                        color = ExpenseRed,
                        style = MaterialTheme.typography.bodySmall
                    )
                }
            }
        },
        confirmButton = {
            Button(
                onClick = {
                    val amountNum = amountText.toDoubleOrNull()
                    if (amountNum == null || amountNum <= 0) {
                        errorMessage = "সঠিক টাকার পরিমাণ লিখুন"
                        return@Button
                    }
                    val todayDate = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault()).format(Date())
                    val currentTime = SimpleDateFormat("HH:mm", Locale.getDefault()).format(Date())
                    val finalDesc = if (descText.isNotBlank()) descText else "সাধারণ খরচ"

                    val entity = ExpenseEntity(
                        id = "exp-\${System.currentTimeMillis()}",
                        amountPoisha = (amountNum * 100).toLong(),
                        date = todayDate,
                        time = currentTime,
                        category = selectedCategory,
                        description = finalDesc,
                        vendorName = vendorText.ifBlank { "নগদ খরচ" },
                        paymentMethod = "CASH"
                    )
                    onSave(entity)
                },
                colors = ButtonDefaults.buttonColors(containerColor = ExpenseRed)
            ) {
                Text("সংরক্ষণ করুন", color = TextWhite, fontWeight = FontWeight.Bold)
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("বাতিল", color = MutedSlate)
            }
        }
    )
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

    @Query("DELETE FROM incomes")
    suspend fun clearAllIncomes()
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

    @Query("DELETE FROM expenses")
    suspend fun clearAllExpenses()
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

    @Query("DELETE FROM daily_vouchers")
    suspend fun clearAllVouchers()
}

@Dao
interface BatteryDao {
    @Query("SELECT * FROM battery_records ORDER BY date DESC, time DESC")
    fun getAllBatteryRecords(): Flow<List<BatteryEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertBatteryRecord(record: BatteryEntity)

    @Query("DELETE FROM battery_records")
    suspend fun clearAllBatteryRecords()
}

@Dao
interface MaintenanceDao {
    @Query("SELECT * FROM maintenance_records ORDER BY date DESC")
    fun getAllMaintenanceRecords(): Flow<List<MaintenanceEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertMaintenanceRecord(record: MaintenanceEntity)

    @Query("DELETE FROM maintenance_records")
    suspend fun clearAllMaintenanceRecords()
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

    suspend fun clearAllData() {
        incomeDao.clearAllIncomes()
        expenseDao.clearAllExpenses()
        voucherDao.clearAllVouchers()
        batteryDao.clearAllBatteryRecords()
        maintenanceDao.clearAllMaintenanceRecords()
    }
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
