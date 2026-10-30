package com.salam.sandi.ui.navigation

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
