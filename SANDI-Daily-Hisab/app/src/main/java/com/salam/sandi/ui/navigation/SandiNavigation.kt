package com.salam.sandi.ui.navigation

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
